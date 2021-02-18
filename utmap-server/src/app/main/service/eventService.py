from flask import jsonify
from app.main.model.event import Event

def addEvent(data):
    try:
        keys = countKeys(data)
        if not isValidInput(keys):
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
            status = 409
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
            status = 201
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def updateEvent(_id, data):
    try:
        keys = countKeys(data)
        if not isValidInput(keys):
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
            status = 201
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
            }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

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
            status = 404
        else:
            responseObject = {
                'status': 'success',
                'message': 'Found all events',
                'body' : responseBody
                }
            status = 200
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

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
            status = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
                }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def deleteOneEvent(_id):
    try:
        event = Event()
        events = event.connectToEvents()
        if event.deleteEvById(_id, events):
            responseObject = {
                'status': 'success',
                'message': 'Event successfully deleted'
            }
            status = 200
        else:
            responseObject = {
                'status': 'failure',
                'message': 'Event not found'
            }
            status = 404
    except(Exception):
        responseObject = {
            'status': 'failure',
            'message': 'Internal server error'
            }
        status = 500
    return responseObject, status

def countKeys(data):
    keys = []
    for key in data:
        keys.append(key)
    return keys

def isValidInput(keyList):
    validity1 = len(keyList) == 7
    validity2 = ('name' and 'organizer' and 'startTime' and 'endTime' 
    and 'building' and 'room' and 'description') in keyList
    return validity1 and validity2