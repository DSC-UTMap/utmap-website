from bson import ObjectId

def findAll(collection):
    return collection.find()

def findById(_id, collection):
    doc = collection.find_one({'_id' : ObjectId(_id)})
    return doc

def deleteById(_id, collection):
    doc = collection.find_one_and_delete({'_id' : ObjectId(_id)})
    return doc

def findByName(name, collection):
    doc = collection.find_one({'name' : str(name)})
    return doc

def formatDocuments(documentList):
    for doc in documentList:
        doc['_id'] = formatId(doc['_id'])
    return documentList

def formatId(_id):
    return str(_id)

def assignId(document, collection):
    docId = insertDocument(document, collection)
    return docId
    
def insertDocument(document, collection):
    return collection.insert_one(document)