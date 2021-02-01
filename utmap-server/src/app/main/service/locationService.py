from flask import jsonify
from app.main import db as utMap
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
        return jsonify(responseObject, 409)
    else:
        newLocation = Location(
            name=data['name'], code=data['code'],x=data['coords'][0], 
            y=data['coords'][1], subLocations=data['subLocations']
        )
        newId = newLocation.assignLocationId(locations)
        newLoc = location.findLocById(newId, locations)
        #newLocation.formatSublocations(newLoc)
        responseBody = newLocation.formatAsResponseBody(newLoc)
        
        responseObject = {
            'status': 'success',
            'message': 'Location successfully added',
            'body' : responseBody
        }
        return jsonify(responseObject, 201)

def updateLocation(data):
    pass

def getAllLocations():
    location = Location()
    locations = location.connectToLocations()
    responseBody = location.formatAllLocs(locations)

    responseObject = {
        'status': 'success',
        'message': 'Found all locations',
        'body' : responseBody
        }
    return jsonify(responseObject, 200)

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
        return jsonify(responseObject, 200)
    else:
        responseObject = {
        'status': 'fail',
        'message': 'Location not found',
        'body' : responseBody
        }
        return jsonify(responseObject, 404)

def deleteOneLocation(_id):
    location = Location()
    locations = location.connectToLocations()
    if location.deleteLocById(_id, locations):
        responseObject = {
            'status': 'success',
            'message': 'Location successfully deleted'
        }
        return jsonify(responseObject, 200)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Location not found'
        }
        return jsonify(responseObject, 404)
    
