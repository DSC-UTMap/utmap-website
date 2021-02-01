from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

client = MongoClient('localhost', 27017)

mongo = client.get_database("UTMap")

class LocationController:
    def __init__(self, locations):
        self.locations = locations

@app.route('/location', methods=['GET'])
def getAllLocations():
    
    locations = mongo.get_collection('location')

    output = []

    for loc in locations.find():
        subDict = loc['subLocations']
        for sub in subDict:
            subDict[sub]['_id'] = str(subDict[sub]['_id'])
            evList = subDict[sub]['events']
            for ev in evList:
                ev['_id'] = str(ev['_id'])
        
        output.append({
            '_id' : str(loc['_id']),
            'name' : loc['name'], 
            'code' : loc['code'], 
            'coords' : loc['coords'],
            'subLocations' : loc['subLocations']
            })
    
    return jsonify({'result' : output})

@app.route('/location/<_id>', methods=['GET'])
def getLocationByID(_id):
    locations = mongo.get_collection('location')
    
    loc = locations.find_one({'_id' : ObjectId(_id)})

    if loc:
        subDict = loc['subLocations']
        for sub in subDict:
            subDict[sub]['_id'] = str(subDict[sub]['_id'])
            evList = subDict[sub]['events']
            for ev in evList:
                ev['_id'] = str(ev['_id'])
        output = {
            '_id' : str(loc["_id"]),
            'name' : loc['name'], 
            'code' : loc['code'], 
            'coords' : loc['coords'],
            'subLocations' : loc['subLocations']
            }
    else:
        output = 'no results found.'

    return jsonify({'result' : output})

@app.route('/location', methods=['POST'])
def addLocation():
    locations = mongo.get_collection('location')
    name = request.json['name']
    code = request.json['code']
    coords = request.json['coords']
    subLocations = request.json['subLocations']

    loc = locations.find_one({'name' : str(name)})

    if loc:
        output = 'location already exists.'
    else:
        location_id = locations.insert_one({
            'name' : name, 'code' : code, 'coords' : coords, 'subLocations' :subLocations
            })
        newLoc = locations.find_one({'_id' : location_id})
        subDict = newLoc['subLocations']
        for sub in subDict:
            subDict[sub]['_id'] = str(subDict[sub]['_id'])
            evList = subDict[sub]['events']
            for ev in evList:
                ev['_id'] = str(ev['_id'])
        output = {
            '_id' : str(newLoc["_id"]),
            'name' : newLoc['name'], 
            'code' : newLoc['code'], 
            'coords' : newLoc['coords'],
            'subLocations' : newLoc['subLocations']
            }

    return jsonify({'result' : output})

@app.route('/location/<_id>', methods=['PUT'])
def updateLocation(_id):
    locations = mongo.get_collection('location')

    loc = locations.find_one({'_id' : ObjectId(_id)})

    name = request.json['name']
    code = request.json['code']
    coords = request.json['coords']
    subLocations = request.json['subLocations']

    fields = ['name', 'code', 'coords', 'subLocations']
    fieldVals = [name, code, coords, subLocations]
    fieldBools = [len(str(name)) > 0, len(str(code)) == 2, len(list(coords)) == 2, True]

    if loc:
        for i in range(len(fields)):
            if fieldBools[i]:
                locations.update_one(loc, {'$set': {fields[i] : fieldVals[i]}})
                loc = locations.find_one({'_id' : ObjectId(_id)})    
        subDict = loc['subLocations']
        for sub in subDict:
            subDict[sub]['_id'] = str(subDict[sub]['_id'])
            evList = subDict[sub]['events']
            for ev in evList:
                ev['_id'] = str(ev['_id'])
        output = {
            '_id' : str(loc["_id"]),
            'name' : loc['name'], 
            'code' : loc['code'], 
            'coords' : loc['coords'],
            'subLocations' : loc['subLocations']
            }
    else:
        output = 'location does not exist.'

    return jsonify({'result' : output})

@app.route('/location/<_id>', methods=['DELETE'])
def deleteLocationByID(_id):
    locations = mongo.get_collection('location')

    if locations.find_one_and_delete({'_id' : ObjectId(_id)}):
        output = 'location deleted successfully'
    else:
        output = 'location not found.'

    return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(debug=True)
