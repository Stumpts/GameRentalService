CREATE TABLE Account (
    accountID INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20),
    password VARCHAR(20)
);

CREATE TABLE Customer (
    customerID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20),
    email VARCHAR(20),
    phoneNumber CHAR(11)
);

CREATE TABLE Game (
    gameID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    publisher VARCHAR(20),
    ageRating VARCHAR(3),
    price DECIMAL(5, 2),
    averageStarRating DECIMAL (3,2),
    releaseDate DATE

);

CREATE TABLE Review (
    gameID INTEGER,
    accountID INT,
    StarRating DECIMAL (2, 1),

    PRIMARY KEY (gameID, accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID),
    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);

CREATE TABLE Subscription (
    accountID INTEGER PRIMARY KEY,
    tier INT,
    vouchers INT,

    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);


CREATE TABLE Rental (
    accountID INTEGER,
    gameID INTEGER,
    rentDate DATE,
    returnDate DATE,

    PRIMARY KEY (accountID, gameID, rentDate),
    FOREIGN KEY (accountID) REFERENCES Account(accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);

