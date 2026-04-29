import sqlite3

def init_db():
    conn = sqlite3.connect("database.db")
    with open("schema.sql") as f:
        conn.executescript(f.read())
    conn.close()


def get_db():
    connection = sqlite3.connect("database.db")
    return connection