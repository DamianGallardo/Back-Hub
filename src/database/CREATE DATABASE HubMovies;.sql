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