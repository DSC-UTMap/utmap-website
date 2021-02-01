class Location:

    def __init__(self, _id='0', name='none', code='NA', x=0, y=0, subLocations={}):
        self._id = _id
        self.name = name
        self.code = code
        self.coords = [x, y]
        self.subLocations = subLocations
        
    def addSubLocation(self, subLocation):
        if subLocation.name in self.subLocations:
            print(self.name + " already has this sublocation.")
        else:
            self.subLocations[subLocation.name] = subLocation