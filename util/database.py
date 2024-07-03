from pymongo import MongoClient;
from pymongo.collection import Collection
from config import settings
# from functools import lru_cache

# @lru_cache()
connection_count = 0
def get_database():
    global connection_count 
    try:
        client = MongoClient(settings.DATABASE_URL,serverSelectionTimeoutMS=5000)
        conn = client.server_info()  # Check connection (optional)
        connection_count += 1
        # print(f'Connected to MongoDB {conn.get("version")}')
        print(f'Connected to MongoDB {conn.get("version")} (Connection: {connection_count})')
        db = client.get_database()
        return db # Return the client object
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        raise ConnectionError("Failed to connect to MongoDB") 
    # finally:
    #     connection_count -= 1
    #     print(f'(Connection: {connection_count})')
    #     client.close()  # Close the connection when done
