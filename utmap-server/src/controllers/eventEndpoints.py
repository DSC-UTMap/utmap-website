from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

client = MongoClient('localhost', 27017)

mongo = client.get_database("UTMap")

@app.route('/event/<_id>', methods=['GET'])
def getEventByID(_id):
    events = mongo.get_collection('event')
    
    ev = events.find_one({'_id' : ObjectId(_id)})

    if events:
        output = {
            '_id' : str(ev["_id"]),
            'name' : ev['name'], 
            'organizer' : ev['organizer'],
            'startTime' : ev['startTime'],
            'endTime' : ev['endTime'], 
            'place' : ev['place'],
            'description' : ev['description'],
            'tags' : ev['tags']
            }
    else:
        output = 'no results found.'

    return jsonify({'result' : output})

@app.route('/event/<_id>', methods=['DELETE'])
def deleteLocationByID(_id):
    events = mongo.get_collection('event')

    if events.find_one_and_delete({'_id' : ObjectId(_id)}):
        output = 'event deleted successfully'
    else:
        output = 'event not found.'

    return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(debug=True)
