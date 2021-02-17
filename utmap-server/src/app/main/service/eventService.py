from flask import jsonify
from app.main.model.event import Event

def addEvent(data):
    event = Event()
    events = event.connectToEvents()
    ev = events.findEvById(data['_id'], event)

    if ev:
        responseObject = {
            'status': 'fail',
            'message': 'Item already exists'
        }
        return jsonify({'result' : responseObject, 'status' : 409})
    else:
        newEvent =  Event(
            name = data['name'],
            organizer = data['organizer'],
            startTime = data['startTime'],
            endTime = data['endTime'],
            building  = data['building'],
            room = data['room'],
            description = data['description']
        )
        newEvent.assignEventId(events)
        responseBody = newEvent.formatAsResponseBody(data)

        responseObject = {
            'status': 'success',
            'message': 'Event successfully added',
            'body': responseBody
        }
        return jsonify({'result': responseObject, 'status' : 201})

def updateEvent(_id, data):
    event = Event()
    events = event.connectToEvents()
    ev = events.findEvById(_id, event)

    if ev:
        eventToUpdate = Event(    
            _id = _id,        
            name = data['name'],
            organizer = data['organizer'],
            startTime = data['startTime'],
            endTime = data['endTime'],
            building  = data['building'],
            room = data['room'],
            description = data['description'])
        eventToUpdate.updateEvent(events, ev)
        responseBody = eventToUpdate.formatAsResponseBody(data)

        responseObject = {
            'status': 'success',
            'message': 'Event successfully updated',
            'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 201})
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Event not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})

def getAllEvents():
    event = Event()
    events = event.connectToEvents()
    responseBody = event.formatAllEvs(events)

    responseObject = {
        'status': 'success',
        'message': 'Found all events',
        'body' : responseBody
    }
    return jsonify({'result' : responseObject, 'status' : 200})

def getOneEvent(_id):
    event = Event()
    events = event.connectToEvents()
    ev = events.findEvById(_id, event)
    if ev:
        responseBody = event.formatOneEv(ev)
        responseObject = {
        'status': 'success',
        'message': 'Found one event',
        'body' : responseBody
        }
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
        'status': 'fail',
        'message': 'Event not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})

def deleteOneEvent(_id):
    event = Event()
    events = event.connectToEvents()
    if event.deleteEvById(_id, events):
        responseObject = {
            'status': 'success',
            'message': 'Event successfully deleted'
        }
        return jsonify({'result' : responseObject, 'status' : 200})
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Event not found'
        }
        return jsonify({'result' : responseObject, 'status' : 404})
