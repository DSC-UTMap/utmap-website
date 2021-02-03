import os
import unittest

from flask_script import Manager
from flask_restx import Api
from app.main import createApp, createClient
from app.main.controller import locationController as locCon, eventController as evCon #, subLocationController as subLocCon

app = createApp(os.getenv('UTMAP_ENV') or 'dev')
app.app_context().push()

db = createClient(os.getenv('UTMAP_ENV') or 'dev')

api = Api(app)
api = locCon.LocationController().addLocResources(api)
#api = subLocCon.SubLocationController().addSubLocResources(api)
api = evCon.EventController().addEvResources(api)

manager = Manager(app)

@manager.command
def run():
    app.run()

@manager.command
def test():
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()