from flask import jsonify
from app.main.model.building import Building

def addBuilding(data):
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
        newId = newBuilding.assignBuildingId(buildings)
        newBuild = building.findBuildById(newId, buildings)
        responseBody = newBuilding.formatAsResponseBody(newBuild)
        
        responseObject = {
            'status': 'success',
            'message': 'Building successfully added',
            'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 201})

def updateBuilding(_id, data):
    responseObject = {
            'status': 'success',
            'message': 'PUT successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})

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
    
