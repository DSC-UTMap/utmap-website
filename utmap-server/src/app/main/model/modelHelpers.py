from bson import ObjectId

def findbyId(self, _id, collection):
    doc = collection.find_one({'id' : ObjectId(_id)})
    return doc