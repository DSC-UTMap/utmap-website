from flask import jsonify
#from app.main.model.event import event

def getOneEvent(_id):
    #event = Event()
    #events = event.connectToEvents()
    #ev = event.findEvById(_id, events)
    #if ev:
    #    responseBody = event.formatOneEv(ev)
    #    responseObject = {
    #    'status': 'success',
    #    'message': 'Found one event',
    #    'body' : responseBody
    #    }
    #    return jsonify({'result' : responseObject, 'status' : 200})
    #else:
    #    responseObject = {
    #    'status': 'fail',
    #    'message': 'Event not found'
    #    }
    #    return jsonify({'result' : responseObject, 'status' : 404})
    responseObject = {
            'status': 'success',
            'message': 'GET _id successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})

def deleteOneEvent(_id):
    #event = Event()
    #events = event.connectToEvents()
    #if event.deleteEvById(_id, events):
    #    responseObject = {
    #        'status': 'success',
    #        'message': 'Event successfully deleted'
    #    }
    #    return jsonify({'result' : responseObject, 'status' : 200})
    #else:
    #    responseObject = {
    #        'status': 'fail',
    #        'message': 'Event not found'
    #    }
    #    return jsonify({'result' : responseObject, 'status' : 404})
    responseObject = {
            'status': 'success',
            'message': 'DELETE _id successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})
