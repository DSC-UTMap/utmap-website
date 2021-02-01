from .. import db
from bson import ObjectId

class Location:

    def __init__(self, _id=None, name='Dummy', code='NA', x=0, y=0, subLocations={}):
        self._id = _id
        self.name = name
        self.code = code
        self.coords = [x, y]
        self.subLocation = subLocations
    
    def connectToLocations(self):
        locations = db.get_collection('location')
        return locations

    def findLocById(self, _id, locations):
        loc = locations.find_one({'id' : ObjectId(_id)})
        return loc

    def updateName(self, newName):
        self.name = newName


    

    