import os
import unittest

from flask_script import Manager
from app.main import createApp, createClient

app = createApp(os.getenv('UTMAP_ENV') or 'dev')
app.app_context().push()

db = createClient(os.getenv('UTMAP_ENV') or 'dev')

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