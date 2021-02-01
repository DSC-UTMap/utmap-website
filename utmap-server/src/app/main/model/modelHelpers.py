from bson import ObjectId

def findById(_id, collection):
    doc = collection.find_one({'id' : ObjectId(_id)})
    return doc

def findByName(name, collection):
    doc = collection.find_one({'name' : str(name)})
    return doc

def formatSubCollection(collection):
    #for document in
    pass

def formatId(_id):
    return str(_id)

def assignId(document, collection):
    docId = insertDocument(document, collection)
    return docId
    
def insertDocument(document, collection):
    return collection.insert_one(document)