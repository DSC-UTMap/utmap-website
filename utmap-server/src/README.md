# UTMap Server

## Required Packages

The following packages must be installed for UTMap Server to function properly.

Flask-1.1.2,  
flask-cors-3.0.10,
Flask-Script-2.0.6,  
flask-restx-0.2.0,  
flask-testing-0.8.1,  
pylint-2.6.0,  
pymongo-3.11.2,

## Architecture

Utmap Server is organized into a hybrid of the Clean and Functional Architecture. The files are organized into folders based on their purpose in running the app. These files will be contained in the src folder in the early stages, but the actual structure begins with the app folder.

### app:

The app folder contains two folders: main and test. The app folder also sits in the src folder alongside the file manage.py, which creates Flask app, sets up a MongoClient, and sets up an API. The manage.py file can run the app with the terminal command "python manage.py run" and test the app with the terminal command "python manage.py test".

#### main:

The main folder contains all the files necessary to run the app which are organized further into folders named controller, model, service, and util. The main folder also contains config.py, which contains three configuration settings, development, testing, and production, for a Flask app. The main folder contains an initializer file which turns main into a usable module with functions that can create Flask apps and set up MongoClients. The app folder's manage.py relies on this module.

##### controller:

The controller folder contains the endpoints for the API in manage.py. It contains files that route the appropriate http requests calls to their corresponding services. These files include the existing buildingController.py and eventController.py.

###### buildingController.py:

This file routes http requests related to buildings to the buildingService.py file. The BuildingController class adds these routes to the API as resources, making them accessible when the app runs.

###### eventController.py:

This file routes http requests related to events to the eventService.py file. The EventController class adds these routes to the API as resources, making them accessible when the app runs.

##### services:

The services folder contains the services responsible for querying the database. The eventService.py file queries the database's event collection using the event.py model's helper functions. The buildingService.py file queries the database's building collection using the building.py model's helper functions.

#### test:

The test folder contains all files necessary to unit-test the app. Currently, this includes the file testConfig.py which performs unittests on the app's configurations: development, testing, and production. These tests make sure the app runs with the appropriate settings in each context.

## API

### Models

The following models represent the two types of objects stored in the UTMap database: buildings and events. Buildings are stored in UTMap's "building" collection, while events are stored in UTMap's "event" collection.

#### Buildings

Buildings are JSON objects that represent a building or plot of land at which events are held. A building object has the following format:

'building' : {
'\_id' : UUID (Unique ID)
'name' : String (The building's name)
'code' : String (2-letter building code)
}

#### Events

Events are JSON objects that represent an event scheduled to happen at a building. An event object has the following format:

'event' : {
'\_id' : UUID (Unique ID)
'name' : String (The event's name)
'organizer' : String (The event organizer's name)
'startTime' : DateTime (The date and time the event begins)
'endTime' : DateTime (The date and time the event ends)
'building' : building (see above)
'room' : String (The room the event is held in)
'description' : String (A short description of the event)
'tags' : [String] (A list of user-defined key words for searching purposes)
}

### HTTP Requests

#### GET /building

-   Purpose: Retrieves a list of every building in the UTMap database.
-   Method: Routes to the method getAllBuildings().
-   Return Type: Returns a list of buildings.
-   Responses: Status 200 if a list is found, 404 if no list is found, 500 in case of an internal server error.

#### POST /building

-   Purpose: Adds a new building to the UTMap database.
-   Method: Routes to the method addBuilding().
-   Request Body: Requires a building object as the request body (\_id not necessary).
-   Produces: Produces a building as a JSON object in the response body.
-   Responses: Status 201 if a building is posted successfully, 400 if the input data is invalid, 409 if building already exists, 500 in case of an internal server error.

#### GET /building/{\_id}

-   Purpose: Retrieves a building with the specified \_id from the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method getOneBuilding().
-   Return Type: Returns a single building.
-   Responses: Status 200 if a building is found, 400 if the specified \_id is invalid, 404 if no building is found, 500 in case of an internal server error.

#### PUT /building/{\_id}

-   Purpose: Updates an existing building in the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method updateBuilding().
-   Request Body: Requires a building object as the request body (\_id necessary).
-   Produces: Produces the updated building as a JSON object in the response body.
-   Responses: Status 201 if a building is updated successfully, 400 if the input data is invalid, 404 if no building is found, 500 in case of an internal server error.

#### DELETE /building/{\_id}

-   Purpose: Deletes a building with the specified \_id from the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method deleteOneBuilding().
-   Return Type: Returns a single building.
-   Responses: Status 200 if a building is deleted successfully, 400 if the specified \_id is invalid, 404 if no building is found, 500 in case of an internal server error.

#### GET /event

-   Purpose: Retrieves a list of every event in the UTMap database.
-   Method: Routes to the method getAllEvents().
-   Return Type: Returns a list of events.
-   Responses: Status 200 if a list is found, 404 if no list is found, 500 in case of an internal server error.

#### POST /event

-   Purpose: Adds a new event to the UTMap database.
-   Method: Routes to the method addEvent().
-   Request Body: Requires an event object as the request body (\_id not necessary).
-   Produces: Produces an event as a JSON object in the response body.
-   Responses: Status 201 if an event is posted successfully, 400 if the input data is invalid, 500 in case of an internal server error.

#### GET /event/{\_id}

-   Purpose: Retrieves an event with the specified \_id from the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method getOneEvent().
-   Return Type: Returns a single event.
-   Responses: Status 200 if a event is found, 400 if the specified \_id is invalid, 404 if no event is found, 500 in case of an internal server error.

#### PUT /event/{\_id}

-   Purpose: Updates an existing event in the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method updateEvent().
-   Request Body: Requires an event object as the request body (\_id necessary).
-   Produces: Produces the updated event as a JSON object in the response body.
-   Responses: Status 201 if an event is updated successfully, 400 if the input data is invalid, 404 if no event is found, 500 in case of an internal server error.

#### DELETE /event/{\_id}

-   Purpose: Deletes an event with the specified \_id from the UTMap database.
-   Path Parameters: Requires the specified \_id in the HTTP request.
-   Method: Routes to the method deleteOneEvent().
-   Return Type: Returns a single event.
-   Responses: Status 200 if an event is deleted successfully, 400 if the specified \_id is invalid, 404 if no event is found, 500 in case of an internal server error.
