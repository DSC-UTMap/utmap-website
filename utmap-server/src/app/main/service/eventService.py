from flask import jsonify

def getOneEvent(_id):
    responseObject = {
            'status': 'success',
            'message': 'GET _id successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})

def deleteOneEvent(_id):
    responseObject = {
            'status': 'success',
            'message': 'DELETE _id successfully tested'
    }
    return jsonify({'result' : responseObject, 'status' : 200})
