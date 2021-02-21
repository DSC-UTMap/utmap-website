from flask import jsonify
from app.main.model.building import Building

def addBuilding(data):
    try:
        keys = countBuildingKeys(data)
        if not isValidBuildingInput(keys):
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
            statusCode = 409
        else:
            newBuilding = Building(name=data['name'], code=data['code'])
            newBuilding.assignBuildingId(buildings)
            responseBody = newBuilding.formatAsResponseBody()
            
            responseObject = {
                'status': 'success',
                'message': 'Building successfully added',
                'body' : responseBody
            }
            statusCode = 201
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def updateBuilding(_id, data):
    try:
        keys = countBuildingKeys(data)
        if not isValidBuildingInput(keys):
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
            statusCode = 201
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

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
            statusCode = 404
        else:
            responseObject = {
                'status': 'success',
                'message': 'Found all buildings',
                'body' : responseBody
                }
            statusCode = 200
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

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
            statusCode = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def deleteOneBuilding(_id):
    try:
        building = Building()
        buildings = building.connectToBuildings()

        if building.deleteBuildById(_id, buildings):
            responseObject = {
                'status': 'success',
                'message': 'Building successfully deleted'
                }
            statusCode = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Building not found'
                }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode
    
def countBuildingKeys(data):
    keys = []
    for key in data:
        keys.append(key)
    return keys

def isValidBuildingInput(keyList):
    validity1 = len(keyList) == 2
    validity2 = ('name' and 'code') in keyList
    return validity1 and validity2