from .. import db
from .modelHelpers import (
    findAll, findById, deleteById, findByName, formatId, assignId, updateDocument, formatDocuments,
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
        fields = {'name' : self.name, 'code' : self.code}
        buildId = assignId(fields, buildings).inserted_id
        self._id = formatId(buildId)
        return self._id

    def updateBuild(self, buildings, buildToUpdate):
        fieldList = ['name', 'code']
        fieldVals = [self.name, self.code]
        updateDocument(buildToUpdate, buildings, fieldList, fieldVals)

    def formatAllBuilds(self, buildings):
        output = []
        for build in findAll(buildings):
            output.append(self.formatOneBuild(build))
        return output

    def formatOneBuild(self, buildObject):
        tempBuild = self.createTempBuild(buildObject)
        output = (tempBuild.formatAsResponseBody())
        return output
    
    def createTempBuild(self, buildObject):
        tempBuild = Building(
                _id=buildObject['_id'], name=buildObject['name'], code=buildObject['code'])
        return tempBuild

    def formatAsResponseBody(self):
        output = {
            '_id' : formatId(self._id),
            'name' : self.name, 
            'code' : self.code
            }
        return output
