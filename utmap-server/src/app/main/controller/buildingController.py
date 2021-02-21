from flask import Flask, request
from flask_restx import Resource
from ..service.buildingService import (
    getAllBuildings, getOneBuilding, addBuilding, updateBuilding, deleteOneBuilding
    )

class BuildingController(Resource):    
    def addBuildResources(self, api):
        api.add_resource(BuildingList, '/building')
        api.add_resource(BuildingById, '/building/<_id>')
        return api

class BuildingList(Resource):
    def get(self):
        return getAllBuildings()
    
    def post(self):
        data = request.json
        return addBuilding(data=data)

class BuildingById(Resource):
    def get(self, _id):
        return getOneBuilding(_id)

    def delete(self, _id):
        return deleteOneBuilding(_id)

    def put(self, _id):
        data = request.json
        return updateBuilding(_id, data=data)
