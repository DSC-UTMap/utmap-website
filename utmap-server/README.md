# UTMap API

This is a simple API that shows how UTMap will perform its operations

Version: 1.0.0

BasePath:/RobS9919/UTMap-API/1.0.0

Apache 2.0

http://www.apache.org/licenses/LICENSE-2.0.html

## Access

## Methods

\[ Jump to [Models](#models) \]

### Table of Contents

#### [Buildings](#Buildings)

-   [`post /building`](#addBuilding)
-   [`delete /building/{_id}`](#deleteOneBuilding)
-   [`get /building`](#getAllBuildings)
-   [`get /building/{_id}`](#getOneBuilding)
-   [`put /building/{_id}`](#updateBuilding)

#### [Events](#Events)

-   [`post /event`](#addEvent)
-   [`delete /event/{_id}`](#deleteEvent)
-   [`get /event`](#getAllEvents)
-   [`get /event/{_id}`](#getOneEvent)
-   [`put /event/{_id}`](#updateEvent)

# Buildings

[Up](#methods)

### Add building

    post /building

Adds a building to UTMap (addBuilding)  
A user can submit a json representation of a building to add to the list of existing buildings in the system.

#### Consumes

This API call consumes the following media types via the Content-Type request header:

-   `application/json`

#### Request body

body [Building](#building---up) (required)

Body Parameter — Building object to add to the map

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 201

item created[](#)

#### 400

invalid input, object invalid[](#)

#### 409

an existing item already exists[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Delete one building

    delete /building/{_id}

Deletes a building with the specified unique ID (deleteOneBuilding)  
By passing in a valid ID, a user can delete a specific building in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be deleted. format: uuid

#### Return type

[Building](#building---up)

#### Example data

Content-Type: application/json

    {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

building deleted [Building](#building---up)

#### 400

Invalid id supplied[](#)

#### 404

location not found[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Get all buildings

    get /building

Retrieves all buildings on UTMap (getAllBuildings)  
A user can retrieve a full list of existing buildings in the system

#### Return type

array\[[Building](#building---up)\]

#### Example data

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

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

results found

#### 400

bad input parameter[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Get one building

    get /building/{_id}

Finds one building from UTMap (getOneBuilding)  
By passing in a valid ID building code, a user can search for a specific building in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be deleted. format: uuid

#### Return type

[Building](#building---up)

#### Example data

Content-Type: application/json

    {
      "code" : "DH",
      "name" : "Deerfield Hall",
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

building found [Building](#building---up)

#### 400

Invalid id supplied[](#)

#### 404

building not found[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Update building

    put /building/{_id}

updates an existing building on UTMap (updateBuilding)  
By passing in a valid ID, a user can submit a json representation of a building to replace an existing building in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the building that needs to be updated. format: uuid

#### Consumes

This API call consumes the following media types via the Content-Type request header:

-   `application/json`

#### Request body

body [Building](#building---up) (required)

Body Parameter — Building object to update

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 201

item updated[](#)

#### 400

invalid input, object invalid[](#)

#### 404

object not found[](#)

#### 500

internal server error[](#)

---

# Events

[Up](#methods)

### Add event

    post /event

Adds an event to UTMap (addEvent)  
A user can submit a json representation of an event to add to the list of existing events in the system

#### Consumes

This API call consumes the following media types via the Content-Type request header:

-   `application/json`

#### Request body

event [Event](#event---up) (optional)

Body Parameter — Event to add

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 201

item created[](#)

#### 400

invalid input, object invalid[](#)

#### 409

an existing item already exists[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Delete event

    delete /event/{_id}

Deletes an event with the specified unique ID (deleteEvent)  
By passing in a valid ID, a user can delete a specific event in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be deleted. format: uuid

#### Return type

[Event](#event---up)

#### Example data

Content-Type: application/json

    {
      "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "organizer" : "MCSS",
      "name" : "Game Night",
      "description" : "Come join us for Cards Against Humanity and Super Smash Bros.",
      "startTime" : "2021-09-20T17:00:00Z",
      "endTime" : "2021-09-20T21:00:00Z",
      "building" : {
        "code" : "DH",
        "name" : "Deerfield Hall",
        "_id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
      },
      "room" : "DH2000",
      "tags" : ["MCSS", "games", "open for everyone"]
    }

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

event deleted [Event](#event---up)

#### 400

Invalid id supplied[](#)

#### 404

event not found[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Get all events

    get /event

Retrieves all events on UTMap (getAllEvents)  
A user can retrieve a full list of existing events in the system

#### Return type

array\[[Event](#event---up)\]

#### Example data

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
      "room" : "DH2000",
      "tags" : ["MCSS", "open for everyone"]
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
      "room" : "DH2000",
      "tags" : ["MCSS", "open for everyone"]
    } ]

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

results found

#### 400

bad input parameter[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Get one event

    get /event/{_id}

Finds an event by its unique ID (getEventByName)  
By passing in a valid ID, a user can search for a specific event in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be deleted. format: uuid

#### Return type

[Event](#event---up)

#### Example data

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
      "room" : "DH2000",
      "tags" : ["MCSS"]
    }

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 200

event found [Event](#event---up)

#### 400

Invalid id supplied[](#)

#### 404

event not found[](#)

#### 500

internal server error[](#)

---

[Up](#methods)

### Update event

    put /event/{_id}

updates an existing event on UTMap (updateEvent)  
By passing in a valid ID, a user can submit a json representation of an event to replace an existing event in the system

#### Path parameters

\_id (required)

Path Parameter — ID unique to the event that needs to be updated. format: uuid

#### Consumes

This API call consumes the following media types via the Content-Type request header:

-   `application/json`

#### Request body

body [Event](#event---up) (required)

Body Parameter — Event object to update

#### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

-   `application/json`

### Responses

#### 201

item updated[](#)

#### 400

invalid input, object invalid[](#)

#### 404

object not found[](#)

#### 500

internal server error[](#)

---

## Models

\[ Jump to [Methods](#methods) \]

### Table of Contents

1.  [`Building`](#building---up)
2.  [`Event`](#event---up)

### `Building` - [Up](#models)

**\_id**  
[UUID](#UUID) format: uuid  
example: `d290f1ee-6c54-4b01-90e6-d701748f0851`

**name**  
[String](#string)  
example: `Deerfield Hall`

**code**  
[String](#string) format: buildingCode  
example: `DH`

### `Event` - [Up](#models)

**\_id**  
[UUID](#UUID) format: uuid  
example: `d290f1ee-6c54-4b01-90e6-d701748f0851`

**name**  
[String](#string)  
example: `Game Night`

**organizer**  
[String](#string) format: username  
example: `MCSS`

**startTime**  
[Date](#DateTime) format: date-time  
example: `2021-09-20T17:00:00Z`

**endTime**  
[Date](#DateTime) format: date-time  
example: `2021-09-20T21:00:00Z`

**building**  
[Building](#building---up)

**room (optional)**  
[String](#string) format: roomCode  
example: `DH2000`

**description**  
[String](#string) format: sentences  
example: `Come join us for Cards Against Humanity and Super Smash Bros.`

**tags**  
[Array(String)](#string)  
example: `['mcs', 'workshop', 'free pizza']`
