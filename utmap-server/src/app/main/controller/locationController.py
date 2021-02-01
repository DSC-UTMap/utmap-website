from flask import Flask, request
from manage import app
from .. import db
from ..service.locationService import (
    getAllLocations, getOneLocation, addLocation, updateLocation, deleteOneLocation
    )

@app.route('/location', methods=['GET'])
def GetAll():
    return getAllLocations()

@app.route('/location/<_id>', methods=['GET'])
def getOne(_id):
    return getOneLocation(_id)

@app.route('/location/<_id>', methods=['DELETE'])
def deleteOne(_id):
    return deleteOneLocation(_id)

@app.route('/location', methods=['POST'])
def post():
    data = request.json
    return addLocation(data=data)

@app.route('/location', methods=['PUT'])
def put():
    data = request.json
    return addLocation(data=data)
