from .. import db
from .modelHelpers import (
    findAll, findById, deleteById, findByName, formatId, assignId, formatDocuments
    )
from bson import ObjectId

class Location:
    def __init__(self, _id=None, name='Connector', code='NA', x=0, y=0, subLocations={}):
        self._id = _id
        self.name = name
        self.code = code
        self.coords = [x, y]
        self.subLocations = subLocations
    
    def connectToLocations(self):
        locations = db.get_collection('location')
        return locations

    def findLocById(self, _id, locations):
        loc = findById(_id, locations)
        return loc

    def deleteLocById(self, _id, locations):
        loc = deleteById(_id, locations)
        return loc
    
    def findLocByName(self, name, locations):
        loc = findByName(name, locations)
        return loc

    def assignLocationId(self, locations):
        attributes = {
            'name' : self.name,
            'code' : self.code,
            'coords' : self.coords,
            'subLocations' : self.subLocations
        }
        self._id = assignId(attributes, locations)
        locId = self._id
        return locId

    def updateName(self, newName):
        self.name = newName
        return self.name

    def addSubLocations(self, subLocation):
        if subLocation.name in self.subLocations:
            print(self.name + " already has this sublocation.")
        else:
            self.subLocations[subLocation.name] = subLocation

    def formatAllLocs(self, locations):
        output = []
        for loc in findAll(locations):
            output.append(self.formatOneLoc(loc))
        return output

    def formatOneLoc(self, locObject):
        tempLoc = self.createTempLoc(locObject)
        output = (tempLoc.formatAsResponseBody(tempLoc))
        return output
    
    def createTempLoc(self, locObject):
        tempLoc = Location(
                _id=locObject['_id'], name=locObject['name'], code=locObject['code'],
                x=locObject['coords'][0], y=locObject['coords'][1], 
                subLocations=locObject['subLocations'])
        return tempLoc

    def formatSubLocations(self, locObject):
        self.subLocations = locObject['subLocations']
        for sub in self.subLocations:
            self.subLocations[sub]['_id'] = formatId(self.subLocations[sub]['id'])
            self.subLocations[sub]['events'] = formatDocuments(self.subLocations[sub]['events'])
        return self.subLocations

    def formatAsResponseBody(self, locObject):
        output = {
            '_id' : formatId(self._id),
            'name' : self.name, 
            'code' : self.code, 
            'coords' : self.coords,
            'subLocations' : self.formatSubLocations(locObject)
            }
        return output
