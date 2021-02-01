from bson import ObjectId

def findById(_id, collection):
    doc = collection.find_one({'id' : ObjectId(_id)})
    return doc

def findByName(name, collection):
    doc = collection.find_one({'name' : str(name)})
    return doc