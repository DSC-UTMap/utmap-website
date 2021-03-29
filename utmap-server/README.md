UTMap API
=========

This is a simple API that shows how UTMap will perform its operations

Version: 1.0.0

BasePath:/RobS9919/UTMap-API/1.0.0

Apache 2.0

http://www.apache.org/licenses/LICENSE-2.0.html

Access
------

Methods
-------

\[ Jump to [Models](#__Models) \]

### Table of Contents

#### [Buildings](#Buildings)

*   [`post /building`](#addBuilding)
*   [`delete /building/{_id}`](#deleteOneBuilding)
*   [`get /building`](#getAllBuildings)
*   [`get /building/{_id}`](#getOneBuilding)
*   [`put /building/{_id}`](#updateBuilding)

#### [Events](#Events)

*   [`post /event`](#addEvent)
*   [`delete /event/{_id}`](#deleteEvent)
*   [`get /event`](#getAllEvents)
*   [`get /event/{_id}`](#getEventByName)
*   [`put /event/{_id}`](#updateEvent)

Buildings
=========

[Up](#__Methods)

    post /building

Adds a building to UTMap (addBuilding)

A user can submit a json representation of a building to add to the list of existing buildings in the system

### Consumes

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

### Request body

body [Building](#Building) (required)

Body Parameter — Building object to add to the map

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 201

item created[](#)

#### 400

invalid input, object invalid[](#)

#### 409

an existing item already exists[](#)

* * *

[Up](#__Methods)

    delete /building/{_id}

Deletes a building with the specified unique ID (deleteOneBuilding)

By passing in a valid ID, a user can delete a specific building in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be deleted. format: uuid

### Return type

[Building](#Building)

### Example data

Content-Type: application/json

    {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

building deleted [Building](#Building)

#### 400

Invalid id supplied[](#)

#### 404

location not found[](#)

* * *

[Up](#__Methods)

    get /building

Retrieves all buildings on UTMap (getAllBuildings)

A user can retrieve a full list of existing buildings in the system

### Return type

array\[[Building](#Building)\]

### Example data

Content-Type: application/json

    [ {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }, {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    } ]

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

results found

#### 400

bad input parameter[](#)

* * *

[Up](#__Methods)

    get /building/{_id}

Finds one building from UTMap (getOneBuilding)

By passing in a valid ID building code, a user can search for a specific building in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be deleted. format: uuid

### Return type

[Building](#Building)

### Example data

Content-Type: application/json

    {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

building found [Building](#Building)

#### 400

Invalid id supplied[](#)

#### 404

building not found[](#)

* * *

[Up](#__Methods)

    put /building/{_id}

updates an existing building on UTMap (updateBuilding)

By passing in a valid ID, a user can submit a json representation of a building to replace an existing building in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be updated. format: uuid

### Consumes

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

### Request body

body [Building](#Building) (required)

Body Parameter — Building object to update

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 201

item updated[](#)

#### 400

invalid input, object invalid[](#)

#### 404

object not found[](#)

* * *

Events
======

[Up](#__Methods)

    post /event

Adds an event to UTMap (addEvent)

A user can submit a json representation of an event to add to the list of existing events in the system

### Consumes

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

### Request body

event [Event](#Event) (optional)

Body Parameter — Event to add

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 201

item created[](#)

#### 400

invalid input, object invalid[](#)

#### 409

an existing item already exists[](#)

* * *

[Up](#__Methods)

    delete /event/{_id}

Deletes an event with the specified unique ID (deleteEvent)

By passing in a valid ID, a user can delete a specific event in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be deleted. format: uuid

### Return type

[Event](#Event)

### Example data

Content-Type: application/json

    {
      "organizer" : "MCSS",
      "name" : "Game Night",
      "description" : "Come join us for Cards Against Humanity and Super Smash Bros.",
      "startTime" : "2021-09-20T17:00:00Z",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "endTime" : "2021-09-20T21:00:00Z",
      "building" : {
        "code" : "DH",
        "name" : "Deerfield Hall",
        "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
      },
      "room" : "DH2000"
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

event deleted [Event](#Event)

#### 400

Invalid id supplied[](#)

#### 404

event not found[](#)

* * *

[Up](#__Methods)

    get /event

Retrieves all events on UTMap (getAllEvents)

A user can retrieve a full list of existing events in the system

### Return type

array\[[Event](#Event)\]

### Example data

Content-Type: application/json

    [ {
      "organizer" : "MCSS",
      "name" : "Game Night",
      "description" : "Come join us for Cards Against Humanity and Super Smash Bros.",
      "startTime" : "2021-09-20T17:00:00Z",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "endTime" : "2021-09-20T21:00:00Z",
      "building" : {
        "code" : "DH",
        "name" : "Deerfield Hall",
        "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
      },
      "room" : "DH2000"
    }, {
      "organizer" : "MCSS",
      "name" : "Game Night",
      "description" : "Come join us for Cards Against Humanity and Super Smash Bros.",
      "startTime" : "2021-09-20T17:00:00Z",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "endTime" : "2021-09-20T21:00:00Z",
      "building" : {
        "code" : "DH",
        "name" : "Deerfield Hall",
        "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
      },
      "room" : "DH2000"
    } ]

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

results found

#### 400

bad input parameter[](#)

* * *

[Up](#__Methods)

    get /event/{_id}

Finds an event by its unique ID (getEventByName)

By passing in a valid ID, a user can search for a specific event in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be deleted. format: uuid

### Return type

[Event](#Event)

### Example data

Content-Type: application/json

    {
      "organizer" : "MCSS",
      "name" : "Game Night",
      "description" : "Come join us for Cards Against Humanity and Super Smash Bros.",
      "startTime" : "2021-09-20T17:00:00Z",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "endTime" : "2021-09-20T21:00:00Z",
      "building" : {
        "code" : "DH",
        "name" : "Deerfield Hall",
        "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
      },
      "room" : "DH2000"
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

event found [Event](#Event)

#### 400

Invalid id supplied[](#)

#### 404

event not found[](#)

* * *

[Up](#__Methods)

    put /event/{_id}

updates an existing event on UTMap (updateEvent)

By passing in a valid ID, a user can submit a json representation of an event to replace an existing event in the system

### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be updated. format: uuid

### Consumes

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

### Request body

body [Event](#Event) (required)

Body Parameter — Event object to update

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 201

item updated[](#)

#### 400

invalid input, object invalid[](#)

#### 404

object not found[](#)

* * *

Models
------

\[ Jump to [Methods](#__Methods) \]

### Table of Contents

1.  [`Building` -](#Building)
2.  [`Event` -](#Event)

### `Building` - [Up](#__Models)

\_id

[UUID](#UUID) format: uuid

example: d290f1ee-6c54-4b01-90e6-d701748f0851

name

[String](#string)

example: Deerfield Hall

code

[String](#string) format: buildingCode

example: DH

### `Event` - [Up](#__Models)

\_id

[UUID](#UUID) format: uuid

example: d290f1ee-6c54-4b01-90e6-d701748f0851

name

[String](#string)

example: Game Night

organizer

[String](#string) format: clubName

example: MCSS

startTime

[Date](#DateTime) format: date-time

example: 2021-09-20T17:00:00Z

endTime (optional)

[Date](#DateTime) format: date-time

example: 2021-09-20T21:00:00Z

building (optional)

[Building](#Building)

room

[String](#string) format: roomCode

example: DH2000

description

[String](#string) format: bio

example: Come join us for Cards Against Humanity and Super Smash Bros.