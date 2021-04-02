from flask import Flask
from pymongo import MongoClient
from .config import configByName, dbHost, dbPort, dbUser, dbPassword, dbName, serverHost, serverPort, debugSetting, skipDBInit

db_connect_string = "mongodb+srv://{user}:{password}@cluster0.slrlz.mongodb.net/UTMap?retryWrites=true&w=majority".format(user=dbUser, password=dbPassword)

db = MongoClient(db_connect_string).get_database(dbName)

def createApp(configName):
    app = Flask(__name__)
    app.config.from_object(configByName[configName])

    return app