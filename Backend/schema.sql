CREATE TABLE IF NOT EXISTS Account (
    accountID INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20),
    password VARCHAR(20),
    name VARCHAR(20),
    email VARCHAR(20),
    phoneNumber CHAR(11)
);

CREATE TABLE IF NOT EXISTS Game (
    gameID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    publisher VARCHAR(20),
    ageRating VARCHAR(3),
    price DECIMAL(5, 2),
    averageStarRating DECIMAL (3,2),
    releaseDate DATE
);

CREATE TABLE IF NOT EXISTS Review (
    reviewID INTEGER PRIMARY KEY AUTOINCREMENT,
    gameID INTEGER,
    accountID INT,
    StarRating DECIMAL (2, 1),
    comment VARCHAR(1000),

    FOREIGN KEY (gameID) REFERENCES Game(gameID),
    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);

CREATE TABLE IF NOT EXISTS Rental (
    RentalID INTEGER PRIMARY KEY AUTOINCREMENT,
    accountID INTEGER,
    gameID INTEGER,
    rentDate DATE,
    returnDate DATE,

    FOREIGN KEY (accountID) REFERENCES Account(accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);


