from fastapi import FastAPI, HTTPException
from pydantic import *
from database import *
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

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
    name: str
    email: str
    phoneNumber: int

class AccountLogin(BaseModel):
    username: str
    password: str

class Review(BaseModel):
    accountID: int
    gameID: int
    starRating: float


class WishlistItem(BaseModel):
    accountID: int
    gameID: int

class UpdateUser(BaseModel):
    accountID: int
    username: Optional[str] = None
    password: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phoneNumber: Optional[str] = None

@app.get("/")
def test_landing():
    return {"message": "hello world"}

@app.post("/create-account")
def create_account(account: Account):
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
                   INSERT INTO Account (username, password, name, email, phoneNumber) 
                   VALUES (? , ?, ?, ?, ?)
                   """, (account.username, account.password, account.name, account.email, account.phoneNumber))
    
        connection.commit()
        accountID = cursor.lastrowid
        connection.close()
        return{"message": "Account successfully created","accountID": accountID}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/get-rental-history")
def get_rental_history(accountID: int):
    try:
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
            "gameName": row[0],"rentDate": row[1],"returnDate": row[2] }for row in rows]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/search-games")
def search_game(query: str):
    try: 
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
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/get-account-information")
def get_account_info(accountID: int):
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute ("""
                        SELECT * 
                        FROM Account 
                        WHERE accountID = ?""", 
                        (accountID,))

        row = cursor.fetchone()

        connection.close()
        if row is None:
            raise HTTPException(status_code=404, detail="Account not found")
        return (
            {
            "accountID": row[0], 
            "username": row[1], 
            "password": row[2],
            "name": row[3],
            "email": row[4],
            "phoneNumber": row[5]
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()
        
        

@app.post("/verify-login")
def verify_login(account: AccountLogin):
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""SELECT *
                   FROM Account
                   WHERE username = ? AND password = ?
                   """,
                   (account.username, account.password))
        row = cursor.fetchone()
        connection.close()

        if row is None:
            raise HTTPException(status_code=401, detail="Credentials incorrect")
        return {"accountID": row[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/available-games")
def get_available_games():
    """Get all games that are not currently rented out."""
    try:
        connection = get_db()
        cursor = connection.cursor()
        cursor.execute("""
                       SELECT * FROM Game
                       WHERE gameID NOT IN (
                           SELECT gameID FROM Rental WHERE returnDate IS NULL
                       )
                       """)
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
                "releaseDate": row[6],
            }
            for row in rows
        ]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.post("/rent-game")
def rent_game(accountID: int, gameID: int):
    """Rent a game for a user."""
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT 1
            FROM Game
            WHERE gameID = ?
              AND NOT EXISTS (
                  SELECT *
                  FROM Rental
                  WHERE gameID = ?
                    AND returnDate IS NULL
              )
        """, (gameID, gameID))
        
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail="Game is not available for rent")

        # Rent the game
        cursor.execute("""
                       INSERT INTO Rental (accountID, gameID, rentDate) 
                       VALUES (?, ?, DATE('now'))
                       """, (accountID, gameID))
        
        connection.commit()
        connection.close()
        return {"message": "Game rented successfully"}
    except HTTPException:
        if connection:
            connection.rollback()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.post("/add-to-wishlist")
def add_to_wishlist(item: WishlistItem):
    """Add a game to a user's wishlist."""
    try:
        connection = get_db()
        cursor = connection.cursor()
        cursor.execute("""
                       INSERT INTO Wishlist (accountID, gameID)
                       VALUES (?, ?)
                       """, (item.accountID, item.gameID))
        connection.commit()
        connection.close()
        return {"message": "Game added to wishlist"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()
 
 
@app.delete("/remove-from-wishlist")
def remove_from_wishlist(accountID: int, gameID: int):
    """Remove a game from a user's wishlist."""
    try:
        connection = get_db()
        cursor = connection.cursor()
 
        cursor.execute("""
                       SELECT * FROM Wishlist 
                       WHERE accountID = ? AND gameID = ?
                       """, (accountID, gameID))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Wishlist item not found")
 
        cursor.execute("""
                       DELETE FROM Wishlist 
                       WHERE accountID = ? AND gameID = ?
                       """, (accountID, gameID))
        connection.commit()
        connection.close()
        return {"message": "Game removed from wishlist"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()
 
 
@app.get("/get-wishlist")
def get_wishlist(accountID: int):
    """Get all games on a user's wishlist."""
    try:
        connection = get_db()
        cursor = connection.cursor()
        cursor.execute("""
                       SELECT Game.gameID, Game.name, Game.publisher, Game.price, Game.averageStarRating
                       FROM Wishlist
                       JOIN Game ON Wishlist.gameID = Game.gameID
                       WHERE Wishlist.accountID = ?
                       """, (accountID,))
        rows = cursor.fetchall()
        connection.close()
        return [
            {
                "gameID": row[0],
                "name": row[1],
                "publisher": row[2],
                "price": row[3],
                "averageStarRating": row[4]
            }
            for row in rows
        ]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()
 

@app.post("/make-review")
def make_review(review: Review):
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
                    INSERT INTO Review (accountID, gameID, starRating) 
                    Values (?, ?, ?)
                    
                    """, (review.accountID, review.gameID, review.starRating))
        connection.commit()
        connection.close()

        return {"message": "review successfully created"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/get-review-game")
def get_reviews_game(gameID: int):
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
                        SELECT Account.username, Review.starRating
                        FROM Review
                        JOIN Account ON Review.accountID = Account.accountID
                        WHERE Review.gameID = ?
                        """, (gameID,))

        rows = cursor.fetchall()
        connection.close()

        return [
            {
                "username": row[0],
                "starRating": row[1]
            }
            for row in rows
        ]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()

@app.get("/get-review-user")
def get_reviews_user(accountID: int):
    
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
                        SELECT Game.name, Game.publisher, Review.starRating
                        FROM Review
                        JOIN Game ON Review.gameID = Game.gameID
                        WHERE Review.accountID = ?
                        """, (accountID,))
        
        rows = cursor.fetchall()
        connection.close()

        return [
            {
                "gameName": row[0],
                "publisher": row[1],
                "starRating": row[2]
            }
            for row in rows
        ]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()


@app.put("/update-user-info")
def update_user_info(user: UpdateUser):
    
    try:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("""
            UPDATE Account
            SET username = ?,
                password = ?,
                name = ?,
                email = ?,
                phoneNumber = ?
            WHERE accountID = ?
        """, (user.username, user.password, user.name,
            user.email, user.phoneNumber, user.accountID))

        connection.commit()
        connection.close()

        return {"message": "User updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection:
            connection.close()   
            
        





