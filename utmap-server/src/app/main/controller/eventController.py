from flask import Flask, request
from flask_restx import Resource
from ..service.eventService import (
    getOneEvent, deleteOneEvent
    )

class EventController(Resource):    
    def addEvResources(self, api):
        api.add_resource(EventList, '/event')
        api.add_resource(EventById, '/event/<_id>')
        return api

class EventList(Resource):
    def get(self):
        pass
    
    def post(self):
        pass

class EventById(Resource):
    def get(self, _id):
        return getOneEvent(_id)

    def delete(self, _id):
        return deleteOneEvent(_id)

    def put(self, _id):
        pass