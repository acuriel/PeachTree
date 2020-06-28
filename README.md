# PeachTree Bank

## 1. User requirements

Tha main propose of the requested product, is to have a tool that allows the user to request and manage monetary transactions between Contractors and user's bank accounts.

### 1.1 Basic features

* Log in into the app
* Add a Bank Account
* Add a Contractor
* Add a Transaction (associated to selected Bank Account and Contractor)
* List Transactions (filtering and sorting)
* To see details about a Transaction
* Change Transaction status (Sent, Received, Payed)

## 2. Planification

### 2.1 Models

```
USER
----
- username [str]
- email [str]
- password [str]

CONTRACTOR
----------
- name [str]

ACCOUNT
-------
- name [str]
- owner [User]
- amount [float] (sum agreggation of the payed related transactions)

TRANSACTION
-----------
- account [Account]
- contractor [Contractor]
- amount [float]
- status [sent | received | payed]

```

### 2.2 Basic Architecture

A basic 2-layers architecture will be followed for developing the app:

```
----------         -------          --------
|CONSUMER|    =>   | API |    =>    | DATA |
|  (UI)  |    <=   |     |    <=    |      |
----------         -------          --------

```

#### 2.2.1 API Endpoints
 It will be provided one main endpoint for every model with the respective HTTP methods for each operation, and the endpoints for JWT authentication.

 ```
 Authentication
 --------------
 /api/token/ - Get authentication token
 /api/refresh-token/ - Refresh authentication token

Consuming data
--------------
 /api/accounts/ - CRUD for accounts
 /api/contractors/ - CRUD for contractors
 /api/transactions/ - CRUD for transactions

 All the data endpoints allows the following HTTP methods
 GET / - List the elements
 GET /<id> - Details of the element with id <id>
 POST / - Create a new element
 PUT /<id> - Full update of the element with id <id>
 PATCH /<id> - Partial update of the element with id <id>
 DELETE /<id> - Remove the element with id <id>
 ```


### 2.3 Selected Stack (React + Django + SQLite)

#### Django
Django is an amazing Python web framework, integrating different built in features, like Authentication and Authorization, an ORM for DB abstraction, and more. The API was developed using Django Rest Framework package, which has an ease developing curve.

#### React
React is one of the most popular Front End JS libraries, and using Material UI for a quick UI/UX developing and Axios for the API consuming, all the requirments could be developed ass soon as possible

#### SQLite
For developing proposes, SQLite was the chosen option because its integration with Django. For production is not recommended.


### 2.4 Developing

Having the basic archtiecture, the API endpoints and the selected stack. Both, Backend and Frontend can start to be developed independently.
The project development would have 2 repositories (Backend and Frontend), both with the same git flow branches (This flow was selected because the simplicity of the project)

```
master (Release)
|__feature/# - * branches
|__bugfixes and hotfixes branches
```

The frontend could be developed without the dependency on the API using *json-server* package that simulates an API from a json file, if the same model and endpoints routes covnention are followed. This way, after backend API basics are developed, changing just the root server in the frontend is enough. This would allow a parallel  and independent development between backend and frontend from scratch.

In a team, a backlog and 2 sprints would be planned initially, but since this task was developed by one SE, the following steps and pseudo-stories were followed:

**Backend**
1. Configuring JWT authentication for Django and Django Rest-Framework and Exposing endpoints for authentication
2. Defining Contractor model, serializer, viewsets for exposing endpoint to authenticated users
3. Defining Account model, serializer, viewsets for exposing endpoint to authenticated users
4. Defining Transaction model, serializer, viewsets for exposing endpoint to authenticated users
5. Defining permission IsOwner and apply it to Account and Transaction endpoints

**FronteEnd**
1. Define Axios Api consumer base service and Auth service
2. Define routing structure with react router
3. Define Login UI
4. Add transacion react controller, listing accoutns and cotnractors and posting element
5. List transactions react controller UI
6. Details transaction react controller UI
7. Filtering in the transaction list
8. Sorting in the transaction list
9. Show payed transaction toggle
10. Add extra option for Add account
11. Add extra option for Add contractor


## How to run

### Requirements

* Python >= 3.7
* NodeJS >= 12.14
* npm >= 6.13

#### Setting up the API

1. Open your terminal in the backend project folder (Recommended to use a virtual environment)
2. Install all project dependencies from the requirement.txt file
> pip install -r requirements.txt
3. Apply migrations
> python manage.py migrate
3. Populate DB with dumb data
> python manage.py loaddata initial_data
4. Run the development server (recommended default configuration)
> python manage.py runserver

Note: The dumb data provides 2 users

* Username: aryan, Password: MyPa$$w0rd (Super user)
* Username: talia, Password: MyPa$$w0rd

Django provides also a basic admin interface in the [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) with CRUD operation for all models.

#### Setting up the Frontend

1. Open your terminal in the frontend project folder
2. Install all project dependencies with `npm install` or `yarn`
3. Run the project with  `npm run start` or `yarn start`
4. Open your browser in [http://127.0.0.1:3000/auth](http://127.0.0.1:3000/auth) for authenticating

Note: it's recommended to use default configuration and to use port 3000

