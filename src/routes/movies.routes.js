import { Router } from "express";
import { getConnection } from "../database/connection.js";
import express from "express";
import sql from "mssql";

const router = Router();

// Middleware para manejar cuerpos de solicitud en formato JSON
router.use(express.json());

// Obtener todas las películas
router.get("/movies", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM movies");
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener una película por ID
router.get("/movies/:id", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("SELECT * FROM movies WHERE MovieID = @id");
        
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Movie not found" });
        } else {
            res.json(result.recordset[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva película
router.post("/movies", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Title", sql.VarChar, req.body.Title)
            .input("Description", sql.Text, req.body.Description || null)
            .input("ReleaseDate", sql.Date, req.body.ReleaseDate || null)
            .input("Genre", sql.VarChar, req.body.Genre || null)
            .input("Director", sql.VarChar, req.body.Director || null)
            .input("ImageUrl", sql.VarChar, req.body.ImageUrl)
            .input("CreatedAt", sql.DateTime, req.body.CreatedAt || new Date())
            .input("UpdatedAt", sql.DateTime, req.body.UpdatedAt || null)
            .input("DeletedAt", sql.DateTime, req.body.DeletedAt || null)
            .query(`
                INSERT INTO movies 
                (Title, Description, ReleaseDate, Genre, Director, ImageUrl, CreatedAt, UpdatedAt) 
                VALUES 
                (@Title, @Description, @ReleaseDate, @Genre, @Director,@ImageUrl, @CreatedAt, @UpdatedAt);
                SELECT * FROM Movies WHERE MovieID = SCOPE_IDENTITY();
            `);

        console.log(result);
        res.json({
            movieID: result.recordset[0].MovieID,
            Title: req.body.Title,
            description: req.body.Description,
            releaseDate: req.body.ReleaseDate,
            genre: req.body.Genre,
            director: req.body.Director,
            imageUrl: req.body.ImageUrl,
            createdAt: req.body.CreatedAt || new Date(),
            updatedAt: req.body.UpdatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una película por ID
router.put("/movies/:id", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, req.params.id)
            .input("Title", sql.VarChar, req.body.Title)
            .input("Description", sql.Text, req.body.Description || null)
            .input("ReleaseDate", sql.Date, req.body.ReleaseDate || null)
            .input("Genre", sql.VarChar, req.body.Genre || null)
            .input("Director", sql.VarChar, req.body.Director || null)
            .input("ImageUrl", sql.VarChar, req.body.ImageUrl)
            .input("UpdatedAt", sql.DateTime, req.body.UpdatedAt || new Date())
            .query(`
                UPDATE movies 
                SET Title = @Title, Description = @Description, ReleaseDate = @ReleaseDate, Genre = @Genre, Director = @Director, ImageUrl = @ImageUrl,  UpdatedAt = @UpdatedAt 
                WHERE MovieID = @id;
                SELECT * FROM movies WHERE MovieID = @id;
            `);

        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Movie not found" });
        } else {
            res.json(result.recordset[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una película por ID
router.delete("/movies/:id", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("DELETE FROM movies WHERE MovieID = @id");

        if (result.rowsAffected[0] === 0) {
            res.status(404).json({ error: "Movie not found" });
        } else {
            res.json({ message: "Movie deleted successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
