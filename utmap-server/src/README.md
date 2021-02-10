# UTMap Server

## Required Packages

The following packages must be installed for UTMap Server to function properly.

Flask-1.1.2,  
Flask-Script-2.0.6,  
flask-restx-0.2.0,  
flask-testing-0.8.1,  
pylint-2.6.0,  
pymongo-3.11.2,  

## Architecture

Utmap Server is organized into a hybrid of the Clean and Functional Architecture.  The files are organized into folders based on their purpose in running the app.  These files will be contained in the src folder in the early stages, but the actual structure begins with the app folder.

### app:

The app folder contains two folders: main and test.  The app folder also sits in the src folder alongside the file manage.py, which creates Flask app, sets up a MongoClient, and sets up an API.  The manage.py file can run the app with the terminal command "python manage.py run" and test the app with the terminal command "python manage.py test".

#### main:

The main folder contains all the files necessary to run the app which are organized further into folders named controller, model, service, and util.  The main folder also contains config.py, which contains three configuration settings, development, testing, and production, for a Flask app.  The main folder contains an initializer file which turns main into a usable module with functions that can create Flask apps and set up MongoClients.  The app folder's manage.py relies on this module.

##### controller:

The controller folder contains the endpoints for the API in manage.py.  It contains files that route the appropriate http requests calls to their corresponding services.  These files include the existing locationController.py and eventController.py.

###### locationController.py:

This file routes http requests related to locations to the locationService.py file.  The LocationController class adds these routes to the API as resources, making them accessible when the app runs.

###### eventController.py:

This file routes http requests related to events to the eventService.py file.  The EventController class adds these routes to the API as resources, making them accessible when the app runs.

##### services:

The services folder contains the services responsible for querying the database.  The eventService.py file queries the database's event collection using the event.py model's helper functions.  The locationService.py file queries the database's location collection using the location.py model's helper functions.

#### test:

The test folder contains all files necessary to unit-test the app.  Currently, this includes the file testConfig.py which performs unittests on the app's configurations: development, testing, and production. These tests make sure the app runs with the appropriate settings in each context.

## API

### Models

The following models represent the two types of objects stored in the UTMap database: locations and events.  Locations are stored in UTMap's "location" collection, while events are stored in UTMap's "event" collection.

#### Locations

Locations are JSON objects that represent a building or plot of land at which events are held.  A location object has the following format:  
  
'location' : {
    '_id' : UUID (Unique ID)
    'name' : String (The location's name)
    'code' : String (2-letter building code)
}

#### Events

Events are JSON objects that represent an event scheduled to happen at a location.  An event object has the following format:  
  
'event' : {
    '_id' : UUID (Unique ID)
    'name' : String (The event's name)
    'organizer' : String (The event organizer's name)
    'startTime' : DateTime (The date and time the event begins)
    'endTime' : DateTime (The date and time the event ends)
    'location' : location (see above)
    'room' : String (The room the event is held in)
    'description' : String (A short description of the event)
}

### HTTP Requests

#### GET /location

- Purpose: Retrieves a list of every location in the UTMap database. 
- Method: Routes to the method getAllLocations().
- Return Type: Returns a list of locations.
- Responses: Status 200 if a list is found, 404 if no list is found.

#### POST /location

- Purpose: Adds a new location to the UTMap database.
- Method: Routes to the method addLocation().
- Request Body: Requires a location object as the request body (_id not necessary).
- Produces: Produces a location as a JSON object in the response body.
- Responses: Status 201 if a location is posted successfully, 400 if the input data is invalid, 409 if the location already exists.

#### GET /location/{_id}

- Purpose: Retrieves a location with the specified _id from the UTMap database. 
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method getOneLocation().
- Return Type: Returns a single location.
- Responses: Status 200 if a location is found, 400 if the specified _id is invalid, 404 if no location is found.

#### PUT /location/{_id}

- Purpose: Updates an existing location in the UTMap database.
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method updateLocation().
- Request Body: Requires a location object as the request body (_id necessary).
- Produces: Produces the updated location as a JSON object in the response body.
- Responses: Status 201 if a location is updated successfully, 400 if the input data is invalid, 404 if no location is found.

#### DELETE /location/{_id}

- Purpose: Deletes a location with the specified _id from the UTMap database. 
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method deleteOneLocation().
- Return Type: Returns a single location.
- Responses: Status 200 if a location is deleted successfully, 400 if the specified _id is invalid, 404 if no location is found.

#### GET /event

- Purpose: Retrieves a list of every event in the UTMap database. 
- Method: Routes to the method getAllEvents().
- Return Type: Returns a list of events.
- Responses: Status 200 if a list is found, 404 if no list is found.

#### POST /event

- Purpose: Adds a new event to the UTMap database.
- Method: Routes to the method addEvent().
- Request Body: Requires an event object as the request body (_id not necessary).
- Produces: Produces an event as a JSON object in the response body.
- Responses: Status 201 if an event is posted successfully, 400 if the input data is invalid, 409 if the event already exists.

#### GET /event/{_id}

- Purpose: Retrieves an event with the specified _id from the UTMap database. 
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method getOneEvent().
- Return Type: Returns a single event.
- Responses: Status 200 if a event is found, 400 if the specified _id is invalid, 404 if no event is found.

#### PUT /event/{_id}

- Purpose: Updates an existing event in the UTMap database.
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method updateEvent().
- Request Body: Requires an event object as the request body (_id necessary).
- Produces: Produces the updated event as a JSON object in the response body.
- Responses: Status 201 if an event is updated successfully, 400 if the input data is invalid, 404 if no event is found.

#### DELETE /event/{_id}

- Purpose: Deletes an event with the specified _id from the UTMap database. 
- Path Parameters: Requires the specified _id in the HTTP request.
- Method: Routes to the method deleteOneEvent().
- Return Type: Returns a single event.
- Responses: Status 200 if an event is deleted successfully, 400 if the specified _id is invalid, 404 if no event is found.