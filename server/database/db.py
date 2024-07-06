from fastapi import HTTPException
from pymongo import MongoClient
from pymongo.collection import Collection
from config import settings
from pymongo.errors import ConnectionFailure
class Database:
    client:MongoClient = None
    connection_count = 0
    @classmethod
    #here cls is class which is Database here
    def get_client(cls) ->  MongoClient:
       
        if cls.client is None:
            try:
                cls.client = MongoClient(settings.DATABASE_URL, 
                                         serverSelectionTimeoutMS=5000,
                                         maxPoolSize=10)
                cls.client.server_info()
                cls.connection_count += 1
                print(f"Connected to MongoDB {cls.client.server_info().get('version')} (Connection: {cls.connection_count})")
            except ConnectionFailure as e:
                print(f"Error connecting to MongoDB: {e}")
                raise HTTPException(status_code=500, detail="Database connection failed")
        return cls.client
    @classmethod
    def get_db(cls):
        return cls.get_client().get_database()
    @classmethod
    def close_connection(cls):
        if cls.client:
            cls.client.close()
            cls.client = None
            print("MongoDB connection closed")


db = Database()












# from functools import lru_cache

# @lru_cache()
# connection_count = 0
# def get_database():
#     global connection_count 
#     try:
#         client = MongoClient(settings.DATABASE_URL,serverSelectionTimeoutMS=5000)
#         conn = client.server_info()  # Check connection (optional)
#         connection_count += 1
#         # print(f'Connected to MongoDB {conn.get("version")}')
#         print(f'Connected to MongoDB {conn.get("version")} (Connection: {connection_count})')
#         db = client.get_database()
#         return db # Return the client object
#     except Exception as e:
#         print(f"Error connecting to MongoDB: {e}")
#         raise ConnectionError("Failed to connect to MongoDB") 
#     # finally:
#     #     connection_count -= 1
#     #     print(f'(Connection: {connection_count})')
#     #     client.close()  # Close the connection when done
