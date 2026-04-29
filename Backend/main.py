from fastapi import FastAPI
from pydantic import *
from database import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

class Account(BaseModel):
    username: str
    password: str

@app.get("/")
def test_landing():
    return {"message": "hello world"}

@app.post("/create-account")
def create_account(account: Account):
    
    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
                   INSERT INTO Account (username, password) 
                   VALUES (? , ?)
                   """, (account.username, account.password,))
    
    connection.commit()
    accountID = cursor.lastrowid
    connection.close()

    return{"message": "Account successfully created",
           "accountID": accountID
    }

@app.get("/get-rental-history")
def get_rental_history(accountID: int):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
                   SELECT Game.name, Rental.rentDate, Rental.returnDate
                    FROM Rental
                    JOIN Game ON Rental.gameID = Game.gameID
                    WHERE Rental.accountID = ?
                   """, (accountID,))
    
    rows = cursor.fetchall()
    connection.close()

    return [
        {
            "gameName": row[0],
            "rentDate": row[1],
            "returnDate": row[2]
        }
        for row in rows
    ]

@app.get("/search-games")
def search_game(query: str):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
                   SELECT * 
                   FROM Game 
                   WHERE name LIKE ?
                   """, (f"%{query}%",))
    
    rows = cursor.fetchall()
    connection.close()

    return [
        {
            "gameID": row[0], 
             "name": row[1], 
             "publisher": row[2], 
             "ageRating": row[3], 
             "price": row[4], 
             "averageStarRating": row[5], 
             "releaseDate": row[6]
        }
        for row in rows
    ]

@app.get("/get-account-information")
def get_account_info(accountID: int):
    connection = get_db()
    cursor = connection.cursor()

    cursor.execute ("""
                    SELECT * 
                    FROM Account 
                    WHERE accountID = ?""", 
                    (accountID,))

    row = cursor.fetchone()

    connection.close()
    return [
        {
            "accountID": row[0], 
            "username": row[1], 
            "password": row[2]
        }
    ]

@app.post("/verify-login")
def verify_login(account: Account):
    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""SELECT *
                   FROM Account
                   WHERE username = ? AND password = ?
                   """,
                   (account.username, account.password))
    row = cursor.fetchone()

    if row == None:
        return {"message": "Credentials incorrect"}


    connection.close()

    return {"accountID": row[0]}





