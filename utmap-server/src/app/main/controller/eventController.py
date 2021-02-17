from flask import Flask, request
from flask_restx import Resource
from ..service.eventService import (
    getAllEvents, addEvent, getOneEvent, deleteOneEvent, updateEvent
    )

class EventController(Resource):    
    def addEvResources(self, api):
        api.add_resource(EventList, '/event')
        api.add_resource(EventById, '/event/<_id>')
        return api

class EventList(Resource):
    def get(self):
        return getAllEvents()
    
    def post(self):
        data = request.json
        return addEvent(data=data)

class EventById(Resource):
    def get(self, _id):
        return getOneEvent(_id)

    def delete(self, _id):
        return deleteOneEvent(_id)

    def put(self, _id):
        data = request.json
        return updateEvent(_id, data=data)
