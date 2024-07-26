import { Router } from "express";
import { getConnection } from "../database/connection.js";
import express from "express";
import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Middleware para manejar cuerpos de solicitud en formato JSON
router.use(express.json());

// Registro de usuario
router.post("/register", async (req, res) => {
    try {
        const pool = await getConnection();
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const result = await pool
            .request()
            .input('Username', sql.VarChar(50), req.body.Username)
            .input('Email', sql.VarChar(100), req.body.Email)
            .input('Password', sql.VarChar(255), hashedPassword)
            .input('Role', sql.VarChar(50), req.body.Role || "regular")
            .query(`
                INSERT INTO users (Username, Email, Password, Role)
                VALUES (@Username, @Email, @Password, @Role);
                SELECT * FROM users WHERE UserID = SCOPE_IDENTITY();
            `);

        console.log(result);
        res.json({ 
            message: "User registered successfully",
            user: {
                UserID: result.recordset[0].UserID,
                Username: req.body.Username,
                Email: req.body.Email,
                Password: hashedPassword,
                Role: req.body.Role || "regular"
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('Email', sql.VarChar(100), req.body.Email)
            .query("SELECT * FROM Users WHERE Email = @Email");

        if (result.recordset.length === 0) {
            res.status(404).json({ error: "User not found" });
        } else {
            const user = result.recordset[0];
            const valid = await bcrypt.compare(req.body.Password, user.Password);
            if (valid) {
                const token = createToken(user);
                res.json({ token });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Crear el token JWT
function createToken(user) {
    const payload = {
        user_id: user.UserID,
        user_role: user.Role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export default router;
