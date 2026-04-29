import sqlite3

def get_db():
    connection = sqlite3.conncet("database.db")
    return connection