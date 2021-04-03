import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    MONGODB_USERNAME = os.getenv('MONGODB_USERNAME', '')
    MONGODB_PASSWORD = os.getenv('MONGODB_PASSWORD', '')
    MONGODB_HOST = os.getenv('MONGODB_HOST', 'mongodb://mongo')
    MONGODB_PORT = int(os.getenv('MONGODB_PORT', 27017))
    SKIP_DB_INIT = os.getenv('SKIP_DB_INIT', 'False') == 'True'
    SERVER_HOST = os.getenv('SERVER_HOST', '127.0.0.0')
    SERVER_PORT = int(os.getenv('SERVER_PORT', 5000))
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    BUILDINGS = os.getenv('BUILDINGS', 'building_config.json')


class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    MONGODB_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    

configByName = dict(
    dev=DevelopmentConfig, 
    test=TestingConfig,
    prod=ProductionConfig
    )

dbHost = Config.MONGODB_HOST
dbPort = Config.MONGODB_PORT
dbUser = Config.MONGODB_USERNAME
dbPassword = Config.MONGODB_PASSWORD
skipDBInit = Config.SKIP_DB_INIT
serverHost = Config.SERVER_HOST
serverPort = Config.SERVER_PORT
debugSetting = Config.DEBUG

dbName = 'UTMap'