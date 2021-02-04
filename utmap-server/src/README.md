# UTMap Server

## Required Packages

The following packages must be installed for UTMap Server to function properly.

Flask-1.1.2
Flask-Script-2.0.6
flask-restx-0.2.0
flask-testing-0.8.1
pylint-2.6.0
pymongo-3.11.2

## Architecture

Utmap Server is organized into a hybrid of the Clean and Functional Architecture.  The files are organized into folders based on their purpose in running the app.  This structure begins with the app folder.

### app:

The app folder contains two folders: main and test.  The app folder also contains the file manage.py, which creates Flask app, sets up a MongoClient, and sets up an API.  The manage.py file can run the app with the terminal command "python manage.py run" and test the app with the terminal command "python manage.py test".

#### main:

The main folder contains all the files necessary to run the app which are organized further into folders named controller, model, service, and util.  The main folder also contains config.py, which contains three configuration settings, development, testing, and production, for a Flask app.  The main folder contains an initializer file which main into a usable module with functions that can create Flask apps and set up MongoClients.  The app folder's manage.py relies on this module.

##### controller:

The controller folder contains the endpoints for the API in manage.py.  It contains files that route the appropriate http requests calls to their corresponding services.  These files include the existing locationController.py and eventController.py.  A subLocationController.py is planned.

###### locationController.py:

This file routes http requests related to locations to the locationService.py file.  The LocationController class adds these routes to the API as resources, making them accessible when the app runs.

###### eventController.py:

This file routes http requests related to events to the eventService.py file.  The EventController class adds these routes to the API as resources, making them accessible when the app runs.

##### services:

The services folder contains the services responsible for querying the database.  The eventService.py file queries the database's event collection using the event.py model's helper functions.  The locationService.py file queries the database's location collection using the location.py model's helper functions.

#### test:

The test folder contains all files necessary to unit-test the app.  Currently, this includes the file testConfig.py which performs unittests on the app's configurations: development, testing, and production. These tests make sure the app runs with the appropriate settings in each context.

## API

### Locations

#### GET /location

#### POST /location

#### GET /location/{_id}

#### PUT /location/{_id}

#### DELETE /location/{_id}

### SubLocations

### Events

#### GET /event

#### POST /event

#### GET /event/{_id}

#### PUT /event/{_id}

#### DELETE /event/{_id}