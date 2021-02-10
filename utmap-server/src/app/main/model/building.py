from .. import db
from .modelHelpers import (
    findAll, findById, deleteById, findByName, formatId, assignId, formatDocuments
    )
from bson import ObjectId

class Building:
    def __init__(self, _id=None, name='Connector', code='NA'):
        self._id = _id
        self.name = name
        self.code = code
    
    def connectToBuildings(self):
        buildings = db.get_collection('building')
        return buildings

    def findBuildById(self, _id, buildings):
        build = findById(_id, buildings)
        return build

    def deleteBuildById(self, _id, buildings):
        build = deleteById(formatId(_id), buildings)
        return build
    
    def findBuildByName(self, name, buildings):
        build = findByName(name, buildings)
        return build

    def assignBuildingId(self, buildings):
        fields = {
            'name' : self.name,
            'code' : self.code
        }
        buildId = assignId(fields, buildings).inserted_id
        self._id = formatId(buildId)
        return self._id

    def updateName(self, newName):
        self.name = newName
        return self.name

    def updateCode(self, newCode):
        self.code = newCode
        return self.code

    def formatAllBuilds(self, buildings):
        output = []
        for build in findAll(buildings):
            output.append(self.formatOneBuild(build))
        return output

    def formatOneBuild(self, buildObject):
        tempBuild = self.createTempBuild(buildObject)
        output = (tempBuild.formatAsResponseBody(buildObject))
        return output
    
    def createTempBuild(self, buildObject):
        tempBuild = Building(
                _id=buildObject['_id'], name=buildObject['name'], code=buildObject['code'])
        return tempBuild

    #def formatSubLocations(self, locObject):
    #    self.subLocations = locObject['subLocations']
    #    for sub in self.subLocations:
    #        self.subLocations[sub]['_id'] = formatId(self.subLocations[sub]['_id'])
    #        self.subLocations[sub]['events'] = formatDocuments(self.subLocations[sub]['events'])
    #    return self.subLocations

    def formatAsResponseBody(self, buildObject):
        output = {
            '_id' : formatId(self._id),
            'name' : self.name, 
            'code' : self.code
            }
        return output
