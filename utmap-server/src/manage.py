import os
import unittest

from flask_script import Manager
from flask_restx import Api
from app.main import createApp, serverHost, serverPort, debugSetting
from app.main.controller import buildingController as buildCon, eventController as evCon

app = createApp(os.getenv('UTMAP_ENV') or 'dev')
app.app_context().push()

api = Api(app)
api = buildCon.BuildingController().addBuildResources(api)
api = evCon.EventController().addEvResources(api)

manager = Manager(app)

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
    manager.run()