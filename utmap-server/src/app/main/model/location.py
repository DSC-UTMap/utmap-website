from .. import db
from .modelHelpers import findById, findByName, formatId, assignId
from bson import ObjectId

class Location:
    def __init__(self, _id=None, name='Dummy', code='NA', x=0, y=0, subLocations={}):
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

    def formatSublocations(self, location):
        #for sub in self.subLocations:
        pass

    def formatAsResponseBody(self):
        output = {
            '_id' : formatId(self._id),
            'name' : self.name, 
            'code' : self.code, 
            'coords' : self.coords,
            'subLocations' : self.subLocations
            }
        return output



    

    