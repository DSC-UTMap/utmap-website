from flask import Flask
from pymongo import MongoClient
from .config import configByName, dbHost, dbPort, dbName, serverHost, serverPort, debugSetting

db = MongoClient(dbHost, dbPort).get_database(dbName)

def createApp(configName):
    app = Flask(__name__)
    app.config.from_object(configByName[configName])

    return app