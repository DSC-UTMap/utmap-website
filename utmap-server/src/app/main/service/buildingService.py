from flask import jsonify
from app.main.model.building import Building

def addBuilding(data):
    if len(str(data['code'])) != 2:
        responseObject = {
            'status': 'failure',
            'message': 'Invalid input for code field'
        }
        return jsonify({'result' : responseObject, 'status' : 400})

    building = Building()
    buildings = building.connectToBuildings()
    build = building.findBuildByName(data['name'], buildings)
    
    if build:
        responseObject = {
            'status': 'fail',
            'message': 'Building already exists.'
        }
        return jsonify({'result' : responseObject, 'status' : 409})
    else:
        newBuilding = Building(name=data['name'], code=data['code'])
        newBuilding.assignBuildingId(buildings)
        responseBody = newBuilding.formatAsResponseBody()
        
        responseObject = {
            'status': 'success',
            'message': 'Building successfully added',
            'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 201})

def updateBuilding(_id, data):
    if len(str(data['code'])) != 2:
        responseObject = {
            'status': 'failure',
            'message': 'Invalid input for code field'
        }
        return jsonify({'result' : responseObject, 'status' : 400})

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
        return jsonify({'result' : responseObject, 'status' : 201})
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Building not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})

def getAllBuildings():
    building = Building()
    buildings = building.connectToBuildings()
    responseBody = building.formatAllBuilds(buildings)

    if responseBody == {}:
        responseObject = {
        'status': 'failure',
        'message': 'No buildings found',
        }
        return jsonify({'result' : responseObject, 'status' : 404})
    else:
        responseObject = {
            'status': 'success',
            'message': 'Found all buildings',
            'body' : responseBody
            }
        return jsonify({'result' : responseObject, 'status' : 200})

def getOneBuilding(_id):
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
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
        'status': 'fail',
        'message': 'Building not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})

def deleteOneBuilding(_id):
    building = Building()
    buildings = building.connectToBuildings()
    if building.deleteBuildById(_id, buildings):
        responseObject = {
            'status': 'success',
            'message': 'Building successfully deleted'
        }
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Building not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})
    
