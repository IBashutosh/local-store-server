### Set mondodb connection

\app\config\db.config.js
```
module.exports = {
    HOST: "localhost",
    PORT: 27017,
    DB: "demo_db"
  };
```

## Project setup

In the project directory, you can run:

```
npm install
```


### start server 
In server directory

```
npm run dev
```
Server will start on port 5000.

### APIs
**Signup User**
----
  Signup new user.

* **URL**

  /api/auth/signup

* **Method:**

  `POST`
  
*  **URL Params**

   **NA**
 `

* **Data Params**

	For Admin who can add products role is admin;
  `{"username": "adminTest","email": "adminTest@gmail.com","password": "123", "roles":["admin"]}`
		* **OR** *
	For user user who can add to cart role is user
  `{"username": "userTest","email": "userTest@gmail.com","password": "123", "roles":["user"]}`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "User was registered successfully!"}`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{"message": "Failed! Username is already in use!"}`

**Signin User**
----
  Signup new user.

* **URL**

  /api/auth/signin

* **Method:**

  `POST`
  
*  **URL Params**

   **NA**
 `

* **Data Params**

  `{"username": "adminTest", "password": "123"}`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": "5f5f46fb30e69e727cbbd000",
    "username": "adminTest",
    "email": "adminTest@gmail.com",
    "roles": [
        "ROLE_ADMIN"
    ],
    "accessToken": "tosdfhsdfh"
}`
 
* **Error Response:**

  * **Code:** 404 Not found <br />
    **Content:** `{"message": "User Not found."}`

**Add product by Admin**
----
  Add product by logged admin user.

* **URL**

  /api/products/admin

* **Method:**

  `POST`
  
*  **HEADERS**

   `x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWY0NmZiMzBlNjllNzI3Y2JiZDAwMCIsImlhdCI6MTYwMDA4NTg3NywiZXhwIjoxNjAwMTcyMjc3fQ.QhVdoVQGgmqDd85DhGufIdwydsJl5cC1nNlkfTKooqk Content-Type: application/json`

* **Data Params**

  `{"username": "adminTest", "password": "123"}`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": "5f5f46fb30e69e727cbbd000",
    "username": "adminTest",
    "email": "adminTest@gmail.com",
    "roles": [
        "ROLE_ADMIN"
    ],
    "accessToken": "tosdfhsdfh"
}`

**Add products in cart by user**
----
  Add products in cart by logged user role as user.

* **URL**

  /api/cart/user

* **Method:**

  `POST`
  
*  **HEADERS**

   `x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWY0NmZiMzBlNjllNzI3Y2JiZDAwMCIsImlhdCI6MTYwMDA4NTg3NywiZXhwIjoxNjAwMTcyMjc3fQ.QhVdoVQGgmqDd85DhGufIdwydsJl5cC1nNlkfTKooqk Content-Type: application/json`

* **Data Params**

  `{"products":["B"]}`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "Products are added successfully!"}`
 
**Get cart by user**
----
  Get cart by logged user role as user.

* **URL**

  /api/cart/user

* **Method:**

  `GET`
  
*  **HEADERS**

   `x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWY0NmZiMzBlNjllNzI3Y2JiZDAwMCIsImlhdCI6MTYwMDA4NTg3NywiZXhwIjoxNjAwMTcyMjc3fQ.QhVdoVQGgmqDd85DhGufIdwydsJl5cC1nNlkfTKooqk Content-Type: application/json`

* **Data Params**

 * **NA** *  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "_id": "5f5f5f83c7012a2dbc9f0c49",
        "name": "B",
        "description": "qwertfvv",
        "price": 2455,
        "make": 12345,
        "__v": 0
    }
]`
 


