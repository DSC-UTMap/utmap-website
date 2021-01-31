class listLocationsUseCase:

    def __init__(self, locations):
        self.locations = locations

    def listLocations(self):
        
        output = []

        for loc in self.locations.find():
            subDict = loc['subLocations']
            for sub in subDict:
                subDict[sub]['_id'] = str(subDict[sub]['_id'])
                evList = subDict[sub]['events']
                for ev in evList:
                    ev['_id'] = str(ev['_id'])
            
        output.append({
            '_id' : str(loc['_id']),
            'name' : loc['name'], 
            'code' : loc['code'], 
            'coords' : loc['coords'],
            'subLocations' : loc['subLocations']
            })

    def listOneLocation(self):
        pass