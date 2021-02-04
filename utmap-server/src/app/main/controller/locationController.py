from flask import Flask, request
from flask_restx import Resource
from ..service.locationService import (
    getAllLocations, getOneLocation, addLocation, updateLocation, deleteOneLocation
    )

class LocationController(Resource):    
    def addLocResources(self, api):
        api.add_resource(LocationList, '/location')
        api.add_resource(LocationById, '/location/<_id>')
        return api

class LocationList(Resource):
    def get(self):
        return getAllLocations()
    
    def post(self):
        data = request.json
        return addLocation(data=data)

class LocationById(Resource):
    def get(self, _id):
        return getOneLocation(_id)

    def delete(self, _id):
        return deleteOneLocation(_id)

    def put(self, _id):
        data = request.json
        return updateLocation(_id, data=data)
