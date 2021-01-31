from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from dataAccess.connectionData import ConnectionDataSet
from dataAccess.dbClient import DBClient
from controllers import locationEndpoints

host = ConnectionDataSet.host
port = ConnectionDataSet.port
database = ConnectionDataSet.database
collections = ConnectionDataSet.collections

locations = collections[0]
#subLocations = collections[1]
#events = collections[2]

creds = DBClient(host, port)
utMap = creds.accessDatabase(database)
locationController = locationEndpoints.LocationController(creds.accessCollection(utMap, locations))

locationEndpoints.getAllLocations()


