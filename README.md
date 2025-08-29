# Shopping List API

A simple RESTful API for managing a shopping list built with Node.js and TypeScript. This API allows you to create, read, update, and delete shopping list items with in-memory storage.

## Features

=> **CRUD Operations**: Full Create, Read, Update, Delete functionality for shopping items
=> **TypeScript**: Built with TypeScript for type safety and better development experience
=> **RESTful Design**: Clean REST API endpoints following standard conventions
=> **In-Memory Storage**: Simple data persistence (resets on server restart)
=> **Input Validation**: Comprehensive validation for all API requests

## Tech Stack

=> **Runtime**: Node.js
=> **Language**: TypeScript
=> **Development Tools**: 
  * ts-node for TypeScript execution
  * nodemon for automatic server restart during development
=> **HTTP Server**: Native Node.js http module

## HOW TO USE

### Setup Steps
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd shopping_list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development Mode
Start the development server with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

### Production Build
To build the TypeScript files:
```bash
npm run build
```

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Item Structure
```json
{
  "id": 1,
  "name": "Milk",
  "quantity": 2,
  "purchasedStatus": false
}
```

## Using the API with Postman

### Getting All Items

**Endpoint**: `GET /item`

**Postman Setup**:
1. Open Postman and create a new request
2. Set the method to **GET**
3. Enter the URL: `http://localhost:4000/item`
4. Click **Send**

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "Milk",
    "quantity": 2,
    "purchasedStatus": false
  },
  {
    "id": 2,
    "name": "Bread",
    "quantity": 1,
    "purchasedStatus": true
  }
]
```

### Getting a Single Item

**Endpoint**: `GET /item/{id}`

**Postman Setup**:
1. Create a new GET request
2. Enter URL: `http://localhost:4000/item/1`
3. Click **Send**

**Expected Response**:
```json
{
  "id": 1,
  "name": "Milk",
  "quantity": 2,
  "purchasedStatus": false
}
```

### Creating a New Item

**Endpoint**: `POST /item`

**Postman Setup**:
1. Create a new POST request
2. Enter URL: `http://localhost:4000/item`
3. Go to the **Body** tab
4. Select **raw** and choose **JSON** from the dropdown
5. Enter the request body:
```json
{
  "name": "Eggs",
  "quantity": 12,
  "purchasedStatus": false
}
```
6. Click **Send**

**Expected Response** (Status: 201 Created):
```json
{
  "id": 3,
  "name": "Eggs",
  "quantity": 12,
  "purchasedStatus": false
}
```

### Updating an Item

**Endpoint**: `PUT /item/{id}`

**Postman Setup**:
1. Create a new PUT request
2. Enter URL: `http://localhost:4000/item/1`
3. Go to the **Body** tab
4. Select **raw** and choose **JSON**
5. Enter the updated data:
```json
{
  "name": "Organic Milk",
  "quantity": 3,
  "purchasedStatus": true
}
```
6. Click **Send**

**Expected Response**:
```json
{
  "id": 1,
  "name": "Organic Milk",
  "quantity": 3,
  "purchasedStatus": true
}
```

### Deleting an Item

**Endpoint**: `DELETE /item/{id}`

**Postman Setup**:
1. Create a new DELETE request
2. Enter URL: `http://localhost:4000/item/1`
3. Click **Send**

**Expected Response**:
```json
{
  "message": "Item deleted successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- **200**: Success
- **201**: Created successfully
- **400**: Bad request (invalid input)
- **404**: Item not found
- **405**: Method not allowed

## Notes

- **Data Persistence**: Items are stored in memory and will be lost when the server restarts since we are just storing them in an local array
- **Validation**: All requests are validated for proper data types and required fields
- **ID Generation**: Items are automatically assigned sequential IDs starting from 1
- **CORS**: Currently no CORS headers are set (for local development only)

