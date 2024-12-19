import mysql.connector
from mysql.connector import Error

class FinanceDBHandler:
    def __init__(self):
        try:
            self.connection = mysql.connector.connect(
                host='localhost',
                user='root',  # Replace with your MySQL username
                password='',  # Replace with your MySQL password
                database='finance'
            )
            if self.connection.is_connected():
                print("Connected to the database")
        except Error as e:
            print(f"Error: {e}")
            self.connection = None

    def login_check(self, name, password):
        """Check if a user with the given name and password exists."""
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = "SELECT id FROM users WHERE name = %s AND password = %s"
            cursor.execute(query, (name, password))
            user = cursor.fetchone()
            return user if user else None
        except Error as e:
            print(f"Error: {e}")
            return None

    def get_user_info_by_id(self, user_id):
        """Retrieve user information by ID."""
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = "SELECT * FROM users WHERE id = %s"
            cursor.execute(query, (user_id,))
            user_info = cursor.fetchone()
            return user_info
        except Error as e:
            print(f"Error: {e}")
            return None

    def get_walet_info(self, user_id):
        """Retrieve wallet information for a given user ID."""
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = "SELECT w.* FROM walet w JOIN users u ON w.id = u.walet WHERE u.id = %s"
            cursor.execute(query, (user_id,))
            walet_info = cursor.fetchone()
            return walet_info
        except Error as e:
            print(f"Error: {e}")
            return None

    def close_connection(self):
        """Close the database connection."""
        if self.connection.is_connected():
            self.connection.close()
            print("Database connection closed")

# Example usage
if __name__ == "__main__":
    db_handler = FinanceDBHandler()

    # Login check
    name = "example_user"
    password = "example_pass"
    user = db_handler.login_check(name, password)
    if user:
        print(f"User logged in: {user}")
    else:
        print("Invalid credentials")

    # Get user info by ID
    user_id = 1
    user_info = db_handler.get_user_info_by_id(user_id)
    if user_info:
        print(f"User info: {user_info}")
    else:
        print("User not found")

    # Get wallet info
    walet_info = db_handler.get_walet_info(user_id)
    if walet_info:
        print(f"Wallet info: {walet_info}")
    else:
        print("Wallet not found")

    db_handler.close_connection()
