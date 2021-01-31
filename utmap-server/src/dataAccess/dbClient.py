from pymongo import MongoClient
from bson import ObjectId

class DBClient:

    def __init__(self, host=None, port=None):
        self.host = host
        self.port = port
        self.client = self.connect()
        
    def connect(self):
        return MongoClient(self.host, self.port)

    def accessDatabase(self, databaseName):
        self.db = self.client.get_database(databaseName)
        mapDB = self.db
        return mapDB

    def accessCollection(self, database, collectionName):
        collection = database.get_collection(collectionName)
        return collection