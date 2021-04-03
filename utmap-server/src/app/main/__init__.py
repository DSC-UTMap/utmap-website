from flask import Flask
from pymongo import MongoClient
from .config import configByName, dbHost, dbPort, dbUser, dbPassword, dbName, serverHost, serverPort, debugSetting, skipDBInit

client = MongoClient(dbHost+'/'+dbName,
                 username=dbUser,
                 password=dbPassword)
db = client.get_database(dbName)

def createApp(configName):
    app = Flask(__name__)
    app.config.from_object(configByName[configName])

    return app