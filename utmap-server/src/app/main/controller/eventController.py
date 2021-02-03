from flask import Flask, request
from flask_restx import Resource
from ..service.locationService import (
    getAllLocations, getOneLocation, addLocation, updateLocation, deleteOneLocation
    )

class EventController(Resource):    
    def addEvResources(self, api):
        api.add_resource(EventList, '/event')
        api.add_resource(EventById, '/event/<_id>')
        return api

class EventList(Resource):
    def get(self):
        #return getAllLocations()
        pass
    
    def post(self):
        #data = request.json
        #return addLocation(data=data)
        pass

class EventById(Resource):
    def get(self, _id):
        #TODO: return getOneLocation(_id)
        pass

    def delete(self, _id):
        #TODO: return deleteOneEvent(_id)
        pass

    def put(self, _id):
        #data = request.json
        #return updateLocation(data=data)
        pass