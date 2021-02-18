from flask import jsonify
from app.main.model.building import Building

def addBuilding(data):
    try:
        keys = countKeys(data)
        if not isValidInput(keys):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input'
            }
            return responseObject, 400
        elif (len(str(data['code'])) != 2):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input for code field'
            }
            return responseObject, 400

        building = Building()
        buildings = building.connectToBuildings()
        build = building.findBuildByName(data['name'], buildings)
        
        if build:
            responseObject = {
                'status': 'failure',
                'message': 'Building already exists.'
            }
            status = 409
        else:
            newBuilding = Building(name=data['name'], code=data['code'])
            newBuilding.assignBuildingId(buildings)
            responseBody = newBuilding.formatAsResponseBody()
            
            responseObject = {
                'status': 'success',
                'message': 'Building successfully added',
                'body' : responseBody
            }
            status = 201
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def updateBuilding(_id, data):
    try:
        keys = countKeys(data)
        if not isValidInput(keys):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input'
            }
            return responseObject, 400
        elif (len(str(data['code'])) != 2):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input for code field'
                }
            return responseObject, 400

        building = Building()
        buildings = building.connectToBuildings()
        build = building.findBuildById(_id, buildings)
    
        if build:
            buildingToUpdate = Building(_id=_id, name=data['name'], code=data['code'])
            buildingToUpdate.updateBuild(buildings, build)
            responseBody = buildingToUpdate.formatAsResponseBody()
        
            responseObject = {
                'status': 'success',
                'message': 'Building successfully updated',
                'body' : responseBody
                }
            status = 201
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def getAllBuildings():
    try:
        building = Building()
        buildings = building.connectToBuildings()
        responseBody = building.formatAllBuilds(buildings)

        if responseBody == {}:
            responseObject = {
                'status': 'failure',
                'message': 'No buildings found',
                }
            status = 404
        else:
            responseObject = {
                'status': 'success',
                'message': 'Found all buildings',
                'body' : responseBody
                }
            status = 200
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def getOneBuilding(_id):
    try:
        building = Building()
        buildings = building.connectToBuildings()
        build = building.findBuildById(_id, buildings)

        if build:
            responseBody = building.formatOneBuild(build)
            responseObject = {
                'status': 'success',
                'message': 'Found one building',
                'body' : responseBody
                }
            status = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def deleteOneBuilding(_id):
    try:
        building = Building()
        buildings = building.connectToBuildings()

        if building.deleteBuildById(_id, buildings):
            responseObject = {
                'status': 'success',
                'message': 'Building successfully deleted'
                }
            status = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status
    
def countKeys(data):
    keys = []
    for key in data:
        keys.append(key)
    return keys

def isValidInput(keyList):
    validity1 = len(keyList) == 2
    validity2 = ('name' and 'code') in keyList
    return validity1 and validity2