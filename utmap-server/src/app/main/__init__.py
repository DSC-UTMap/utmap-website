from flask import Flask
from pymongo import MongoClient
from .config import configByName, dbName

db = MongoClient('localhost', 27017).get_database(dbName)

def createApp(configName):
    app = Flask(__name__)
    app.config.from_object(configByName[configName])

    return app

def createClient(configName):
    global db
    host = configByName[configName].MONGODB_HOST
    port = configByName[configName].MONGODB_PORT
    client = MongoClient(host, port)
    db = client.get_database(dbName)
    
    return db