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
    releaseDate DATE,
    isAvailable BOOLEAN
);

CREATE TABLE IF NOT EXISTS Review (
    gameID INTEGER,
    accountID INT,
    StarRating DECIMAL (2, 1),

    PRIMARY KEY (gameID, accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID),
    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);

CREATE TABLE IF NOT EXISTS Subscription (
    accountID INTEGER PRIMARY KEY,
    tier INT,
    vouchers INT,

    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);


CREATE TABLE IF NOT EXISTS Rental (
    accountID INTEGER,
    gameID INTEGER,
    rentDate DATE,
    returnDate DATE,

    PRIMARY KEY (accountID, gameID, rentDate),
    FOREIGN KEY (accountID) REFERENCES Account(accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);
CREATE TABLE IF NOT EXISTS Wishlist (
    accountID INTEGER,
    gameID INTEGER,
    PRIMARY KEY (accountID, gameID),
    FOREIGN KEY (accountID) REFERENCES Account(accountID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);

