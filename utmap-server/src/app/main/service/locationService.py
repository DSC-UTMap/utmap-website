from flask import jsonify
from app.main.model.location import Location

def addLocation(data):
    location = Location()
    locations = location.connectToLocations()
    loc = location.findLocByName(data['name'], locations)
    
    if loc:
        responseObject = {
            'status': 'fail',
            'message': 'Location already exists.'
        }
        return jsonify({'result' : responseObject, 'status' : 409})
    else:
        newLocation = Location(
            name=data['name'], code=data['code'],x=data['coords'][0], 
            y=data['coords'][1], subLocations=data['subLocations']
        )
        newId = newLocation.assignLocationId(locations)
        newLoc = location.findLocById(newId, locations)
        responseBody = newLocation.formatAsResponseBody(newLoc)
        
        responseObject = {
            'status': 'success',
            'message': 'Location successfully added',
            'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 201})

def updateLocation(_id, data):
    #location = Location()
    #locations = location.connectToLocations()
    #loc = location.findLocById(_id, locations)
    responseObject = {
            'status': 'success',
            'message': 'PUT successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})

def getAllLocations():
    location = Location()
    locations = location.connectToLocations()
    responseBody = location.formatAllLocs(locations)

    responseObject = {
        'status': 'success',
        'message': 'Found all locations',
        'body' : responseBody
        }
    return jsonify({'result' : responseObject, 'status' : 200})

def getOneLocation(_id):
    location = Location()
    locations = location.connectToLocations()
    loc = location.findLocById(_id, locations)
    if loc:
        responseBody = location.formatOneLoc(loc)
        responseObject = {
        'status': 'success',
        'message': 'Found one location',
        'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
        'status': 'fail',
        'message': 'Location not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})

def deleteOneLocation(_id):
    location = Location()
    locations = location.connectToLocations()
    if location.deleteLocById(_id, locations):
        responseObject = {
            'status': 'success',
            'message': 'Location successfully deleted'
        }
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Location not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})
    
