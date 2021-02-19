from flask import jsonify
from app.main.model.event import Event

def addEvent(data):
    try:
        keys = countEventKeys(data)
        if not isValidEventInput(keys):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input'
            }
            return responseObject, 400

        event = Event()
        events = event.connectToEvents()
        ev = events.findEvById(data['_id'], event)

        if ev:
            responseObject = {
                'status': 'failure',
                'message': 'Item already exists'
                }
            statusCode = 409
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
            responseBody = newEvent.formatAsResponseBody()

            responseObject = {
                'status': 'success',
                'message': 'Event successfully added',
                'body': responseBody
                }
            statusCode = 201
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def updateEvent(_id, data):
    try:
        keys = countEventKeys(data)
        if not isValidEventInput(keys):
            responseObject = {
                'status': 'failure',
                'message': 'Invalid input'
            }
            return responseObject, 400

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
            responseBody = eventToUpdate.formatAsResponseBody()

            responseObject = {
                'status': 'success',
                'message': 'Event successfully updated',
                'body' : responseBody
            }
            statusCode = 201
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
            }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def getAllEvents():
    try:
        event = Event()
        events = event.connectToEvents()
        responseBody = event.formatAllEvs(events)

        if responseBody == {}:
            responseObject = {
                'status': 'failure',
                'message': 'No buildings found',
                }
            statusCode = 404
        else:
            responseObject = {
                'status': 'success',
                'message': 'Found all events',
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

def getOneEvent(_id):
    try:
        event = Event()
        events = event.connectToEvents()
        ev = event.findEvById(_id, events)
        if ev:
            responseBody = event.formatOneEv(ev)
            responseObject = {
                'status': 'success',
                'message': 'Found one event',
                'body' : responseBody
                }
            statusCode = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
                }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def deleteOneEvent(_id):
    try:
        event = Event()
        events = event.connectToEvents()
        if event.deleteEvById(_id, events):
            responseObject = {
                'status': 'success',
                'message': 'Event successfully deleted'
            }
            statusCode = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
            }
            statusCode = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        statusCode = 500
    return responseObject, statusCode

def countEventKeys(data):
    keys = []
    for key in data:
        keys.append(key)
    return keys

def isValidEventInput(keyList):
    validity1 = len(keyList) == 7
    validity2 = ('name' and 'organizer' and 'startTime' and 'endTime' 
    and 'building' and 'room' and 'description') in keyList
    return validity1 and validity2