import os
import unittest

from flask_cors import CORS
from flask_restx import Api
from flask_script import Manager
from flask import json
from app.main import createApp, serverHost, serverPort, debugSetting
from app.main.controller import buildingController as buildCon, eventController as evCon
from app.main.service.buildingService import addBuilding

app = createApp(os.getenv('UTMAP_ENV') or 'dev')
app.app_context().push()

cors = CORS(app)

api = Api(app)
api = buildCon.BuildingController().addBuildResources(api)
api = evCon.EventController().addEvResources(api)

manager = Manager(app)

def init_db():
    # load data from file
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    buildings_url = os.path.join(SITE_ROOT, 'app/static', app.config['BUILDINGS'])
    buildings = json.load(open(buildings_url))
    # send to db (addBuilding checks for repeats)
    for building in buildings:
        addBuilding(building)

@manager.command
def run():
    app.run(host=serverHost, port=serverPort, debug=debugSetting)

@manager.command
def test():
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    init_db()
    manager.run()