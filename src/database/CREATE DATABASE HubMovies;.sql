-- CREATE DATABASE HubMovies;
USE HubMovies;

-- CREATE TABLE movies (
--     MovieID INT PRIMARY KEY IDENTITY(1,1),
--     Title VARCHAR(100) NOT NULL,
--     Description TEXT NULL,
--     ReleaseDate DATE NULL,
--     Genre VARCHAR(50) NULL,
--     Director VARCHAR(50) NULL,
--     ImageUrl VARCHAR(255) NOT NULL;
--     CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
--     UpdatedAt DATETIME NULL
-- );
-- SELECT * FROM movies;

-- CREATE TABLE users (
--     UserID INT PRIMARY KEY IDENTITY(1,1),
--     Username VARCHAR(50) NOT NULL UNIQUE,
--     Email VARCHAR(100) NOT NULL UNIQUE,
--     Password VARCHAR(255) NOT NULL,
--     Role VARCHAR(50) NOT NULL DEFAULT 'regular',
--     CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
--     UpdatedAt DATETIME NULL
-- );

-- SELECT * FROM users;
-- SELECT * FROM movies;

-- SELECT * FROM FavoriteMovies;

-- CREATE TABLE FavoriteMovies (
--     FavoriteID INT PRIMARY KEY IDENTITY(1,1),
--     UserID INT NOT NULL,
--     MovieID INT NOT NULL,
--     AddedAt DATETIME NOT NULL DEFAULT GETDATE(),
--     FOREIGN KEY (UserID) REFERENCES users(UserID),
--     FOREIGN KEY (MovieID) REFERENCES movies(MovieID)
-- );


-- SELECT 
--     U.UserID,
--     U.Username,
--     P.MovieID,
--     P.Title,
--     P.Description,
--     P.ReleaseDate,
--     P.Genre,
--     P.Director,
--     P.ImageUrl,
--     F.AddedAt
-- FROM 
--     FavoriteMovies F
-- JOIN 
--     users U ON F.UserID = U.UserID
-- JOIN 
--     movies P ON F.MovieID = P.MovieID
-- WHERE 
--     U.UserID = 1;

-- Insertar la película con MovieID = 3 en los favoritos del usuario con UserID = 1
-- INSERT INTO FavoriteMovies (UserID, MovieID, AddedAt)
-- VALUES (1, 3, GETDATE());

