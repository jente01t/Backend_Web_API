import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.mjs';
import taskRoutes from './routes/taskRoutes.mjs';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Backend API Documentation</title>
    </head>
    <body>
        <h1>API Documentation - Tasks API</h1>

        <details id="authentication">
            <summary>Authentication</summary>
            <div class="endpoint">
                <p>Bearer Token required for protected endpoints</p>
                <pre>Authorization: Bearer YOUR_JWT_TOKEN</pre>
            </div>
        </details>

        <details id="users">
            <summary>Users Endpoints</summary>
            
            <details id="register">
                <summary>Register User</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> POST /api/users/register</p>
                    <p><strong>Authentication:</strong> None</p>
                    <p><strong>Request Body Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>firstName</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Minimum 2 characters<br>
                                - Only letters, spaces and hyphens allowed<br>
                                - Will be trimmed
                            </td>
                        </tr>
                        <tr>
                            <td>lastName</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Minimum 2 characters<br>
                                - Only letters, spaces and hyphens allowed<br>
                                - Will be trimmed
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Must be unique<br>
                                - Valid email format<br>
                                - Will be converted to lowercase
                            </td>
                        </tr>
                        <tr>
                            <td>phoneNumber</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>Format: +32 XXX XX XX XX</td>
                        </tr>
                        <tr>
                            <td>age</td>
                            <td>Number</td>
                            <td>Yes</td>
                            <td>
                                - Must be between 0 and 120<br>
                                - Must be a positive number
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>Minimum 6 characters</td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phoneNumber": "+32 123 45 67 89",
    "age": 30,
    "password": "test123"
}
                    </pre>
                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (201):</strong></p>
                    <pre>
{
    "message": "User registered successfully",
    "userId": "user_id"
}
                    </pre>
                    <p><strong>Error Response (400):</strong></p>
                    <pre>
{
    "message": "Error message here"
}
                    </pre>
                </div>
            </details>

            <details id="login">
                <summary>Login User</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> POST /api/users/login</p>
                    <p><strong>Authentication:</strong> None</p>

                    <p><strong>Request Body Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Must be a valid email format<br>
                                - Will be converted to lowercase<br>
                                - Must exist in the database
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Minimum 6 characters<br>
                                - Will be compared against the stored hashed password
                            </td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
    "email": "test@example.com",
    "password": "test123"
}
                    </pre>

                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (200):</strong></p>
                    <pre>
{
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com"
    }
}
                    </pre>

                    <p><strong>Error Response (401):</strong></p>
                    <pre>
{
    "message": "Invalid email or password"
}
                    </pre>

                    <p><strong>Error Response (500):</strong></p>
                    <pre>
{
    "message": "Server error",
    "error": "error_message_here"
}
                    </pre>
                </div>
            </details>

            <details id="get-users">
                <summary>Get All Users</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> GET /api/users</p>
                    <p><strong>Authentication:</strong> Required</p>

                    <p><strong>Request Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>limit</td>
                            <td>Number</td>
                            <td>No</td>
                            <td>
                                - Default: 10<br>
                                - Controls the number of users returned
                            </td>
                        </tr>
                        <tr>
                            <td>offset</td>
                            <td>Number</td>
                            <td>No</td>
                            <td>
                                - Default: 0<br>
                                - Controls the starting point for the users to be returned
                            </td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
  "limit": 10,
  "offset": 0
}
                    </pre>

                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (200):</strong></p>
                    <pre>
{
  "users": [
      {
          "_id": "user_id",
          "firstName": "Test",
          "lastName": "User",
          "email": "test@example.com",
          "phoneNumber": "+32 123 45 67 89"
      }
  ],
  "pagination": {
      "total": 1,
      "limit": 10,
      "offset": 0,
      "hasMore": false
  }
}
                    </pre>

                    <p><strong>Error Response (400):</strong></p>
                    <pre>
{
    "message": "Error message here"
}
                    </pre>
                </div>
            </details>

            <details id="get-user">
                <summary>Get User by ID</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> GET /api/users/:id</p>
                    <p><strong>Authentication:</strong> Required</p>

                    <p><strong>Request Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Must be a valid user ID<br>
                                - Should correspond to an existing user in the database
                            </td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
    "id": "user_id"
}
                    </pre>

                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (200):</strong></p>
                    <pre>
{
    "id": "user_id",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com"
}
                    </pre>

                    <p><strong>Error Response (404):</strong></p>
                    <pre>
{
    "message": "User not found"
}
                    </pre>

                    <p><strong>Error Response (400):</strong></p>
                    <pre>
{
    "message": "Error message here"
}
                    </pre>
                </div>
            </details>

            <details id="update-user">
                <summary>Update User</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> PUT /api/users/:id</p>
                    <p><strong>Authentication:</strong> Required</p>

                    <p><strong>Request Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Must be a valid user ID<br>
                                - Should correspond to an existing user in the database
                            </td>
                        </tr>
                    </table>

                    <p><strong>Request Body Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>firstName</td>
                            <td>String</td>
                            <td>No</td>
                            <td>
                                - Minimum 2 characters<br>
                                - Only letters, spaces, and hyphens allowed<br>
                                - Will be trimmed
                            </td>
                        </tr>
                        <tr>
                            <td>lastName</td>
                            <td>String</td>
                            <td>No</td>
                            <td>
                                - Minimum 2 characters<br>
                                - Only letters, spaces, and hyphens allowed<br>
                                - Will be trimmed
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>String</td>
                            <td>No</td>
                            <td>
                                - Must be a valid email format<br>
                                - Will be converted to lowercase<br>
                                - Should be unique
                            </td>
                        </tr>
                        <tr>
                            <td>phoneNumber</td>
                            <td>String</td>
                            <td>No</td>
                            <td>Format: +32 XXX XX XX XX</td>
                        </tr>
                        <tr>
                            <td>age</td>
                            <td>Number</td>
                            <td>No</td>
                            <td>
                                - Must be between 0 and 120<br>
                                - Must be a positive number
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>String</td>
                            <td>No</td>
                            <td>
                                - Minimum 6 characters<br>
                                - Only required if changing the password
                            </td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
    "firstName": "UpdatedFirstName",
    "lastName": "UpdatedLastName",
    "email": "updated.email@example.com",
    "phoneNumber": "+32 456 78 91 13",
    "age": 30,
    "password": "newPassword123"
}
                    </pre>

                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (200):</strong></p>
                    <pre>
{
    "message": "User updated successfully"
}
                    </pre>

                    <p><strong>Error Response (404):</strong></p>
                    <pre>
{
    "message": "User not found"
}
                    </pre>

                    <p><strong>Error Response (400):</strong></p>
                    <pre>
{
    "message": "Error message here"
}
                    </pre>
                </div>
            </details>

            <details id="delete-user">
                <summary>Delete User</summary>
                <div class="endpoint">
                    <p><strong>URL:</strong> DELETE /api/users/:id</p>
                    <p><strong>Authentication:</strong> Required</p>

                    <p><strong>Request Parameters:</strong></p>
                    <table class="parameter-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Validation Rules</th>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>String</td>
                            <td>Yes</td>
                            <td>
                                - Must be a valid user ID (typically a MongoDB ObjectId)<br>
                                - Should correspond to an existing user in the database
                            </td>
                        </tr>
                    </table>

                    <p><strong>Example Request:</strong></p>
                    <pre>
{
    "id": "user_id"
}
                    </pre>

                    <p><strong>Response:</strong></p>
                    <p><strong>Success Response (200):</strong></p>
                    <pre>
{
    "message": "User deleted successfully"
}
                    </pre>

                    <p><strong>Error Response (404):</strong></p>
                    <pre>
{
    "message": "User not found"
}
                    </pre>

                    <p><strong>Error Response (400):</strong></p>
                    <pre>
{
    "message": "Error message here"
}
                    </pre>
                </div>
            </details>
        </details>
























        <details id="tasks">
    <summary>Tasks Endpoints</summary>
    
    <details id="create-task">
        <summary>Create Task</summary>
        <div class="endpoint">
            <p><strong>URL:</strong> POST /api/tasks</p>
            <p><strong>Authentication:</strong> Required</p>
            
            <p><strong>Request Body:</strong></p>
            <table class="parameter-table">
                <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Validation Rules</th>
                </tr>
                <tr>
                    <td>title</td>
                    <td>String</td>
                    <td>Yes</td>
                    <td>
                        - Minimum 3 characters<br>
                        - Will be trimmed
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>String</td>
                    <td>No</td>
                    <td>
                        - Maximum 1000 characters<br>
                        - Will be trimmed
                    </td>
                </tr>
                <tr>
                    <td>dueDate</td>
                    <td>Date</td>
                    <td>Yes</td>
                    <td>
                        - Must be in the future<br>
                        - Will be validated
                    </td>
                </tr>
                <tr>
                    <td>status</td>
                    <td>String</td>
                    <td>Yes</td>
                    <td>
                        - Must be one of: 'pending', 'in-progress', or 'completed'<br>
                        - Default: 'pending'
                    </td>
                </tr>
                <tr>
                    <td>priority</td>
                    <td>String</td>
                    <td>Yes</td>
                    <td>
                        - Must be one of: 'low', 'medium', or 'high'<br>
                        - Default: 'medium'
                    </td>
                </tr>
                <tr>
                    <td>assignedTo</td>
                    <td>String (ObjectId)</td>
                    <td>Yes</td>
                    <td>
                        - Must be a valid user ID<br>
                        - References the 'User' model
                    </td>
                </tr>
            </table>

            <p><strong>Example Request:</strong></p>
            <pre>
{
    "title": "Test Task",
    "description": "Test Description",
    "dueDate": "2024-12-31",
    "status": "pending",
    "priority": "medium",
    "assignedTo": "user_id_here"
}
            </pre>

            <p><strong>Response:</strong></p>
            <p><strong>Success Response (201):</strong></p>
            <pre>
{
    "_id": "task_id",
    "title": "Test Task",
    "description": "Test Description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "status": "pending",
    "priority": "medium",
    "assignedTo": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdBy": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z"
}
            </pre>

            <p><strong>Error Response (400):</strong></p>
            <pre>
{
    "message": "Error message here"
}
            </pre>
        </div>
    </details>


            <details id="get-tasks">
    <summary>Get All Tasks</summary>
    <div class="endpoint">
        <p><strong>URL:</strong> GET /api/tasks</p>
        <p><strong>Authentication:</strong> Required</p>

        <p><strong>Query Parameters:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>limit</td>
                <td>Number</td>
                <td>No</td>
                <td>Het maximum aantal taken om te retourneren (standaard: 10).</td>
            </tr>
            <tr>
                <td>offset</td>
                <td>Number</td>
                <td>No</td>
                <td>Het aantal te overslaan taken voor paginering (standaard: 0).</td>
            </tr>
            <tr>
                <td>status</td>
                <td>String</td>
                <td>No</td>
                <td>Filter taken op basis van hun status (mogelijk: 'pending', 'in-progress', 'completed').</td>
            </tr>
            <tr>
                <td>priority</td>
                <td>String</td>
                <td>No</td>
                <td>Filter taken op basis van hun prioriteit (mogelijk: 'low', 'medium', 'high').</td>
            </tr>
            <tr>
                <td>assignedTo</td>
                <td>String (ObjectId)</td>
                <td>No</td>
                <td>Filter taken toegewezen aan een specifieke gebruiker op basis van gebruikers-ID.</td>
            </tr>
        </table>

        <p><strong>Request Example:</strong></p>
        <pre>
{
    "limit": 10,
    "offset": 0,
    "status": "pending",
    "priority": "medium",
    "assignedTo": "user_id_here"
}
        </pre>

        <p><strong>Response:</strong></p>
        <p><strong>Success Response (200):</strong></p>
        <pre>
{
    "tasks": [
        {
            "_id": "task_id",
            "title": "Test Task",
            "description": "Test Description",
            "dueDate": "2024-12-31T00:00:00.000Z",
            "status": "pending",
            "priority": "medium",
            "assignedTo": {
                "_id": "user_id",
                "firstName": "Test",
                "lastName": "User"
            },
            "createdBy": {
                "_id": "user_id",
                "firstName": "Test",
                "lastName": "User"
            },
            "createdAt": "2024-03-14T12:00:00.000Z",
            "updatedAt": "2024-03-14T12:00:00.000Z"
        },
        {
            "_id": "task_id_2",
            "title": "Another Task",
            "description": "Another Description",
            "dueDate": "2024-12-31T00:00:00.000Z",
            "status": "completed",
            "priority": "high",
            "assignedTo": {
                "_id": "user_id_2",
                "firstName": "Another",
                "lastName": "User"
            },
            "createdBy": {
                "_id": "user_id_2",
                "firstName": "Another",
                "lastName": "User"
            },
            "createdAt": "2024-03-14T12:00:00.000Z",
            "updatedAt": "2024-03-14T12:00:00.000Z"
        }
    ],
    "pagination": {
        "total": 20,
        "limit": 10,
        "offset": 0,
        "hasMore": true
    }
}
        </pre>

        <p><strong>Error Response (400):</strong></p>
        <pre>
{
    "message": "Error message here"
}
        </pre>
    </div>
</details>



            <details id="get-task">
    <summary>Get Task by ID</summary>
    <div class="endpoint">
        <p><strong>URL:</strong> GET /api/tasks/:id</p>
        <p><strong>Authentication:</strong> Required</p>

        <p><strong>Parameters:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>id</td>
                <td>String (ObjectId)</td>
                <td>Yes</td>
                <td>De unieke ID van de taak die je wilt ophalen.</td>
            </tr>
        </table>

        <p><strong>Request Example:</strong></p>
        <pre>
{
    "id": "task_id_here"
}
        </pre>

        <p><strong>Response:</strong></p>
        <p><strong>Success Response (200):</strong></p>
        <pre>
{
    "_id": "task_id",
    "title": "Test Task",
    "description": "Test Description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "status": "pending",
    "priority": "medium",
    "assignedTo": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdBy": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z"
}
        </pre>

        <p><strong>Error Response (404):</strong></p>
        <pre>
{
    "message": "Task not found"
}
        </pre>

        <p><strong>Error Response (400):</strong></p>
        <pre>
{
    "message": "Error message here"
}
        </pre>
    </div>
</details>


            <details id="update-task">
    <summary>Update Task</summary>
    <div class="endpoint">
        <p><strong>URL:</strong> PUT /api/tasks/:id</p>
        <p><strong>Authentication:</strong> Required</p>

        <p><strong>Parameters:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>id</td>
                <td>String (ObjectId)</td>
                <td>Yes</td>
                <td>De unieke ID van de taak die je wilt bijwerken.</td>
            </tr>
        </table>

        <p><strong>Request Body:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Validation Rules</th>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>No</td>
                <td>Minimaal 3 tekens</td>
            </tr>
            <tr>
                <td>description</td>
                <td>String</td>
                <td>No</td>
                <td>Maximaal 1000 tekens</td>
            </tr>
            <tr>
                <td>dueDate</td>
                <td>Date</td>
                <td>Yes</td>
                <td>Moet in de toekomst liggen</td>
            </tr>
            <tr>
                <td>status</td>
                <td>String</td>
                <td>Yes</td>
                <td>Waarde kan zijn: 'pending', 'in-progress', 'completed'</td>
            </tr>
            <tr>
                <td>priority</td>
                <td>String</td>
                <td>Yes</td>
                <td>Waarde kan zijn: 'low', 'medium', 'high'</td>
            </tr>
            <tr>
                <td>assignedTo</td>
                <td>String (ObjectId)</td>
                <td>Yes</td>
                <td>Moet een geldige gebruikers-ID zijn</td>
            </tr>
        </table>

        <p><strong>Request Example:</strong></p>
        <pre>
{
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "dueDate": "2025-01-31",
    "status": "completed",
    "priority": "high",
    "assignedTo": "user_id_here"
}
        </pre>

        <p><strong>Response:</strong></p>
        <p><strong>Success Response (200):</strong></p>
        <pre>
{
    "_id": "task_id",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "dueDate": "2025-01-31T00:00:00.000Z",
    "status": "completed",
    "priority": "high",
    "assignedTo": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdBy": {
        "_id": "user_id",
        "firstName": "Test",
        "lastName": "User"
    },
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z"
}
        </pre>

        <p><strong>Error Response (404):</strong></p>
        <pre>
{
    "message": "Task not found"
}
        </pre>

        <p><strong>Error Response (400):</strong></p>
        <pre>
{
    "message": "Error message here"
}
        </pre>
    </div>
</details>


            <details id="user-tasks">
    <summary>Get User's Tasks</summary>
    <div class="endpoint">
        <p><strong>URL:</strong> GET /api/tasks/user/:userId</p>
        <p><strong>Authentication:</strong> Required</p>

        <p><strong>Parameters:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>userId</td>
                <td>String (ObjectId)</td>
                <td>Yes</td>
                <td>De unieke ID van de gebruiker waarvan je de taken wilt ophalen.</td>
            </tr>
        </table>

        <p><strong>Response:</strong></p>
        <p><strong>Success Response (200):</strong></p>
        <pre>
[
    {
        "_id": "task_id",
        "title": "Test Task",
        "description": "Test Description",
        "dueDate": "2024-12-31T00:00:00.000Z",
        "status": "pending",
        "priority": "medium",
        "assignedTo": {
            "_id": "user_id",
            "firstName": "Test",
            "lastName": "User"
        },
        "createdBy": {
            "_id": "user_id",
            "firstName": "Test",
            "lastName": "User"
        },
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z"
    },
    {
        "_id": "task_id_2",
        "title": "Another Task",
        "description": "Another Description",
        "dueDate": "2024-12-31T00:00:00.000Z",
        "status": "completed",
        "priority": "high",
        "assignedTo": {
            "_id": "user_id_2",
            "firstName": "Another",
            "lastName": "User"
        },
        "createdBy": {
            "_id": "user_id_2",
            "firstName": "Another",
            "lastName": "User"
        },
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z"
    }
]
        </pre>

        <p><strong>Error Response (400):</strong></p>
        <pre>
{
    "message": "Error message here"
}
        </pre>
    </div>
</details>


            <details id="delete-task">
    <summary>Delete Task</summary>
    <div class="endpoint">
        <p><strong>URL:</strong> DELETE /api/tasks/:id</p>
        <p><strong>Authentication:</strong> Required</p>

        <p><strong>Parameters:</strong></p>
        <table class="parameter-table">
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>id</td>
                <td>String (ObjectId)</td>
                <td>Yes</td>
                <td>De unieke ID van de taak die je wilt verwijderen.</td>
            </tr>
        </table>

        <p><strong>Request Body:</strong></p>
        <pre>
{
    "id": "task_id_here"
}
        </pre>

        <p><strong>Response:</strong></p>
        <p><strong>Success Response (200):</strong></p>
        <pre>
{
    "message": "Task deleted successfully",
    "taskId": "task_id_here"
}
        </pre>

        <p><strong>Error Response (404):</strong></p>
        <pre>
{
    "message": "Task not found"
}
        </pre>

        <p><strong>Error Response (400):</strong></p>
        <pre>
{
    "message": "Error message here"
}
        </pre>
    </div>
</details>

        </details>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
