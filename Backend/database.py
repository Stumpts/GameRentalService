import sqlite3

def init_db():
    conn = sqlite3.connect("database.db", timeout=10)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys = ON;")
    with open("schema.sql") as f:
        conn.executescript(f.read())
    with open("schema_initialize.sql") as f:
        conn.executescript(f.read())
    conn.close()


def get_db():
    connection = sqlite3.connect("database.db", timeout=10, check_same_thread=False)
    
    # This prevents database locking issues
    connection.execute("PRAGMA journal_mode=WAL;")
    connection.execute("PRAGMA foreign_keys=ON;")
    
    return connection