from .. import db
from .building import Building
from .modelHelpers import (
    findAll, findById, deleteById, findByName, formatId, assignId, updateDocument, formatDocuments
    )
from bson import ObjectId
from datetime import datetime

class Event:
    def __init__(
        self, _id=None, name='Connector', organizer='Unnamed', startTime=datetime.today(), endTime=datetime.today(), 
        building={'_id': None, 'name': None, 'code': None}, room='NA0000', description='No description available.'):
        self._id = _id
        self.name = name
        self.organizer = organizer
        self.startTime = startTime
        self.endTime = endTime
        self.building = Building(_id=building['_id'], name=building['name'], code=building['code'])
        self.room = room
        self.description = description

    def connectToEvents(self):
        events = db.get_collection('event')
        return events

    def findEvById(self, _id, events):
        ev = findById(_id, events)
        return ev

    def deleteEvById(self, _id, events):
        ev = deleteById(formatId(_id), events)
        return ev
    
    def findEvtByName(self, name, events):
        ev = findByName(name, events)
        return ev

    def assignEventId(self, events):
        fields = {
            'name' : self.name,
            'organizer' : self.organizer,
            'startTime' : self.startTime,
            'endTime' : self.endTime,
            'building' : {"_id": ObjectId(self.building._id), "name": self.building.name, "code": self.building.code},
            'room' : self.room,
            'description' : self.description
        }
        evId = assignId(fields, events).inserted_id
        self._id = formatId(evId)
        return self._id

    def updateEv(self, events, evToUpdate):
        fieldList = [
            'name', 'organizer', 'startTime', 'endTime', 'building', 'room', 'description'
            ]
        fieldVals = [
            self.name, self.organizer, self.startTime, self.endTime, 
            {"_id": ObjectId(self.building._id), "name": self.building.name, "code": self.building.code},
            self.room, self.description]
        updateDocument(evToUpdate, events, fieldList, fieldVals)

    def formatAllEvs(self, events):
        output = []
        for ev in findAll(events):
            output.append(self.formatOneEv(ev))
        return output

    def formatOneEv(self, evObject):
        tempEv = self.createTempEv(evObject)
        output = (tempEv.formatAsResponseBody())
        return output
    
    def createTempEv(self, evObject):
        tempEv = Event(
                _id=evObject['_id'], name=evObject['name'], organizer=evObject['organizer'],
                startTime=evObject['startTime'], endTime=evObject['endTime'], building=evObject['building'], 
                room=evObject['room'], description=evObject['description'])
        return tempEv

    def formatAsResponseBody(self):
        output = {
            '_id' : formatId(self._id),
            'name' : self.name, 
            'organizer' : self.organizer,
            'startTime' : str(self.startTime),
            'endTime' : str(self.endTime),
            'building' : self.building.formatAsResponseBody(),
            'room' : self.room,
            'description' : self.description
            }
        return output

    
