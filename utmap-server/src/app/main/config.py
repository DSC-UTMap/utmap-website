import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET KEY', 'skeleton_key_sans_undertale_haha')
    DEBUG = False


class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_HOST = os.getenv('MONGODB_HOST', 'localhost')
    MONGODB_PORT = os.getenv('MONGODB_PORT', 27017)
    SERVER_PORT = os.getenv('SERVER_PORT', 5000)
    MONGODB_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    MONGODB_HOST = os.getenv('MONGODB_HOST', 'localhost')
    MONGODB_PORT = os.getenv('MONGODB_PORT', 27017)
    SERVER_PORT = os.getenv('SERVER_PORT', 5001)
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    MONGODB_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    MONGODB_HOST = os.getenv('MONGODB_HOST', 'localhost')
    MONGODB_PORT = os.getenv('MONGODB_PORT', 27017)
    SERVER_PORT = os.getenv('SERVER_PORT', 5002)


configByName = dict(
    dev=DevelopmentConfig, 
    test=TestingConfig,
    prod=ProductionConfig
    )

key = Config.SECRET_KEY

dbName = 'UTMap'