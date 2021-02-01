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
            name=data['name'],
            code=data['code'],
            x=data['coords'][0],
            y=data['coords'][1],
            subLocations=data['subLocations']
        )
        newId = newLocation.assignLocationId(locations)
        newLoc = location.findLocById(newId, locations)
        responseBody = newLocation.formatAsResponseBody()
        
        responseObject = {
            'status': 'success',
            'message': 'Location successfully added',
            'body' : responseBody
        }
        return jsonify(responseObject, 201)

    
