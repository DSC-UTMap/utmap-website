swagger: '2.0'
info:
  description: This is a simple API that shows how UTMap will perform its operations
  version: 1.0.0
  title: UTMap API
  # put the contact info for your development or API team
  contact:
    email: you@your-company.com

  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html

# tags are used for organizing operations
tags:
- name: locations
  description: Operations related to the buildings displayed by UTMap
- name: subLocations
  description: Operations related to classrooms or subsections of locations displayed by UTMap
- name: events
  description: Operations related to events attached to sublocations

paths:
  /location:
    get:
      tags:
      - locations
      summary: Searches locations on UTMap
      operationId: searchLocations
      description: By passing in the appropriate options, a user can search for existing locations in the system
      produces:
      - application/json
      parameters:
      - in: query
        name: searchString
        description: passes an optional search string to look up locations
        required: false
        type: string
      responses:
        200:
          description: search results matching criteria
          schema:
            type: array
            items:
              $ref: '#/definitions/Location'
        400:
          description: bad input parameter
    post:
      tags:
      - locations
      summary: Adds a location to UTMap
      operationId: addLocation
      description: A user can submit a json representation of a location to add to the list of existing locations in the system
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Location object to add to the map
        required: true
        schema:
          $ref: '#/definitions/Location'
      responses:
        201:
          description: item created
        400:
          description: invalid input, object invalid
        409:
          description: an existing item already exists
    put:
      tags:
      - locations
      summary: updates an existing location on UTMap
      operationId: updateLocation
      description: A user can submit a json representation of a location to replace an existing location in the system
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Location object to update
        required: true
        schema:
          $ref: '#/definitions/Location'
      responses:
        201:
          description: item updated
        400:
          description: invalid input, object invalid
        404:
          description: object not found
  /location/{locationCode}:
    get:
      tags:
      - locations
      summary:  Finds a location by its 2-character building code
      operationId: getLocationByCode
      description: By passing in a valid 2-character building code, a user can search for a specific location in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: locationCode
        description: 2-character building code for location that needs to be found
        required: true
        type: string
        format: buildingCode
        minLength: 2
        maxLength: 2
      responses:
        200:
          description: location found
          schema:
            $ref: '#/definitions/Location'
        400:
          description: Invalid building code supplied
        404:
          description: location not found
    delete:
      tags:
      - locations
      summary:  Deletes a location by its 2-character building code
      operationId: deleteLocation
      description: By passing in a valid 2-character building code, a user can delete a specific location in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: locationCode
        description: 2-character building code for location that needs to be deleted
        required: true
        type: string
        format: buildingCode
        minLength: 2
        maxLength: 2
      responses:
        200:
          description: location deleted
          schema:
            $ref: '#/definitions/Location'
        400:
          description: Invalid building code supplied
        404:
          description: location not found
  
  /subLocation:
    get:
      tags:
      - subLocations
      summary: Searches sublocations on UTMap
      operationId: searchSubLocations
      description: By passing in the appropriate options, a user can search for existing locations in the system
      produces:
      - application/json
      parameters:
      - in: query
        name: searchString
        description: passes an optional search string to look up sublocations
        required: false
        type: string
      responses:
        200:
          description: search results matching criteria
          schema:
            type: array
            items:
              $ref: '#/definitions/SubLocation'
        400:
          description: bad input parameter
    post:
      tags:
      - subLocations
      summary: Adds a sublocation to UTMap
      operationId: addSubLocation
      description: A user can submit a json representation of a sublocation to add to the list of existing sublocations in the system
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: subLocation
        description: subLocation to add
        schema:
          $ref: '#/definitions/SubLocation'
      responses:
        201:
          description: item created
        400:
          description: invalid input, object invalid
        409:
          description: an existing item already exists
    put:
      tags:
      - subLocations
      summary: updates an existing sublocation on UTMap
      operationId: updateSubLocation
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Sublocation object to update
        required: true
        schema:
          $ref: '#/definitions/SubLocation'
      responses:
        201:
          description: item updated
        400:
          description: invalid input, object invalid
        404:
          description: object not found
  /subLocation/{subLocationName}:
    get:
      tags:
      - subLocations
      summary:  Finds a sublocation by its name
      operationId: getSubLocationByName
      description: By passing in a valid sublocation name, a user can search for a specific sublocation in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: subLocationName
        description: 5-6 character name for the subLocation that needs to be found
        required: true
        type: string
        format: roomCode
      responses:
        200:
          description: sublocation found
          schema:
            $ref: '#/definitions/SubLocation'
        400:
          description: Invalid name supplied
        404:
          description: sublocation not found
    delete:
      tags:
      - subLocations
      summary:  Deletes a sublocation by its name
      operationId: deleteSubLocation
      description: By passing in a valid sublocation name, a user can search for a specific sublocation in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: subLocationName
        description: 5-6 character name for the subLocation that needs to be found
        required: true
        type: string
        format: roomCode
      responses:
        200:
          description: sublocation deleted
          schema:
            $ref: '#/definitions/SubLocation'
        400:
          description: Invalid name supplied
        404:
          description: sublocation not found
  /event:
    get:
      tags:
      - events
      summary: Searches events on UTMap
      operationId: searchEvents
      description: By passing in the appropriate options, a user can search for existing events in the system
      produces:
      - application/json
      parameters:
      - in: query
        name: searchString
        description: passes an optional search string to look up events
        required: false
        type: string
      responses:
        200:
          description: search results matching criteria
          schema:
            type: array
            items:
              $ref: '#/definitions/Event'
        400:
          description: bad input parameter
    post:
      tags:
      - events
      summary: Adds an event to UTMap
      operationId: addEvent
      description: A user can submit a json representation of an event to add to the list of existing events in the system
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: event
        description: Event to add
        schema:
          $ref: '#/definitions/Event'
      responses:
        201:
          description: item created
        400:
          description: invalid input, object invalid
        409:
          description: an existing item already exists
    put:
      tags:
      - events
      summary: updates an existing event on UTMap
      operationId: updateEvent
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Event object to update
        required: true
        schema:
          $ref: '#/definitions/Event'
      responses:
        201:
          description: item updated
        400:
          description: invalid input, object invalid
        404:
          description: object not found
  /event/{eventName}:
    get:
      tags:
      - events
      summary:  Finds an event by its name
      operationId: getEventByName
      description: By passing in a valid event name, a user can search for a specific event in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: eventName
        description: name of the event that needs to be found
        required: true
        type: string
      responses:
        200:
          description: event found
          schema:
            $ref: '#/definitions/Event'
        400:
          description: Invalid name supplied
        404:
          description: event not found
    delete:
      tags:
      - events
      summary:  Deletes an event by its name
      operationId: deleteEvent
      description: By passing in a valid event name, a user can search for a specific event in the system
      produces:
      - application/json
      parameters:
      - in: path
        name: eventName
        description: name for the subLocation that needs to be found
        required: true
        type: string
      responses:
        200:
          description: event deleted
          schema:
            $ref: '#/definitions/Event'
        400:
          description: Invalid name supplied
        404:
          description: event not found
definitions:
  Space:
    type: object
    required:
    - id
    - name
    - code
    properties:
      id:
        type: string
        format: uuid
        example: d290f1ee-6c54-4b01-90e6-d701748f0851
      name:
        type: string
        example: Deerfield Hall
      code:
        type: string
        format: buildingCode
        minLength: 2
        maxLength: 2
        example: DH
  Location:
    allOf:
    - $ref: '#/definitions/Space'
    - type: object
      required:
      - id
      - name
      - code
      - coords
      - subLocations
      properties:
        id:
          type: string
          format: uuid
          example: d290f1ee-6c54-4b01-90e6-d701748f0851
        name:
          type: string
          example: Deerfield Hall
        code:
          type: string
          format: buildingCode
          minLength: 2
          maxLength: 2
          example: DH
        coords:
          type: array
          items:
            type: integer
            minItems: 2
            maxItems: 2
          example: 200, 400
        subLocations:
          type: object
          additionalProperties:
            type: object
            properties:
              code:
                $ref: '#/definitions/SubLocation'
              text:
                type: string
          example: {'Deerfield Hall' : 'DH2000'}
        #releaseDate:
          #type: string
          #format: date-time
          #example: 2016-08-29T09:12:33.001Z
        #manufacturer:
          #$ref: '#/definitions/Manufacturer'
  SubLocation:
    allOf:
    - $ref: '#/definitions/Space'
    - type: object
      required:
      - id
      - name
      - roomNumber
      - events
      properties:
        id:
          type: string
          format: uuid
          example: d290f1ee-6c54-4b01-90e6-d701748f0851
        name:
          type: string
          format: roomCode
          example: 'DH2000'
        roomNumber:
          type: integer
          minimum: 1
          maximum: 10000
          example: 2000
        events:
          type: array
          items:
            $ref: '#/definitions/Event'
          example: ['MCSS Game Night', 'UTM Exam Jam']
  Event:
    type: object
    required:
    - id
    - name
    - organizer
    - startTime
    - EndTime
    - place
    - description
    - tags
    properties:
      id:
        type: string
        format: uuid
        example: d290f1ee-6c54-4b01-90e6-d701748f0851
      name:
        type: string
        example: Game Night
      organizer:
        type: string
        format: clubName
        example: MCSS
      startTime:
        type: string
        format: date-time
        example: '2021-09-20T17:00:00Z'
      endTime:
        type: string
        format: date-time
        example: '2021-09-20T21:00:00Z'
      place:
        $ref: '#/definitions/SubLocation'
      description:
        type: string
        format: bio
        example: Come join us for Cards Against Humanity and Super Smash Bros.
      tags:
        type: array
        items:
          $ref: '#/definitions/Tag'
        example: ['Board Games', 'Computer Science', 'Video Games']
  Tag:
    type: object
    required:
    - id
    - name
    - description
    properties:
      id:
        type: string
        format: uuid
        example: d290f1ee-6c54-4b01-90e6-d701748f0851
      name:
        type: string
        example: Board Games
      description:
        type: string
        format: bio
        example: This event has board games.
# Added by API Auto Mocking Plugin
host: virtserver.swaggerhub.com
basePath: /DSC-UTMap/UTMap-API/1.0.0
schemes:
 - https
 - http