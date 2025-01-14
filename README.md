# Backend_Web_API
 
## Beschrijving

Deze API biedt functionaliteiten voor het beheren van gebruikers en hun taken. 
Gebruikers kunnen worden geregistreerd, ingelogd, bewerkt, en verwijderd. 
Tasks kunnen worden gemaakt, opgehaald, bijgewerkt, en verwijderd. 


## Setup Instructies

1. **Clone the repository**
```bash
git clone https://github.com/jente01t/Backend_Web_API
cd Backend_Web_API
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a .env file in the root directory with:

```env
PORT=3000
MONGODB_URI=mongodb+srv://PublicUser:D2Uhcn25rcNeEf2eci5k@bw.4aenc.mongodb.net/?retryWrites=true&w=majority&appName=BW
JWT_SECRET=9b67ae6b19727d7fc53638e89b5a238d85b97260ef10f3c8855fdd0c2177a4ee
JWT_EXPIRES_IN=24h
```

4. **Start the server**
```bash
npm start
```

## Features

- User Authentication (JWT)
- User and Task Management (CRUD operations)
- Input Validation
- Error Handling

## API Documentation

Access the API documentation by visiting the root URL (`/`) after starting the server.

## Dependencies

- Express.js
- MongoDB/Mongoose
- JWT
- bcrypt
- dotenv

## API Features

### Users
- Register new user
- Login user
- User authentication
- Update user profile
- Delete user account
- Get user details

### Tasks
- Create tasks
- Assign tasks to users
- Update task status
- Delete tasks
- Get tasks
- Filter tasks

## References

- Github Copilot Complitions in Visual Studio Code
- https://canvas.ehb.be/courses/40595
- https://expressjs.com/en/guide/routing.html
- https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial
- https://stackoverflow.com/questions/63804747/how-to-generate-and-set-jwt-secret-and-jwt-expiration-time-in-express
- https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49
- https://github.com/kelektiv/node.bcrypt.js
- https://blog.logrocket.com/password-hashing-node-js-bcrypt/
- https://chatgpt.com/share/6784eaf5-a96c-800b-92dd-567fe5bd1e8e

## Postman tests

Als u zelf de API wilt testen met Postman kunt u deze files importen:
- [Environment](Postman/Backend%20API.postman_environment.json)
- [Collection](Postman/Backend%20API%20Tests.postman_collection.json) 


![Postman](https://github.com/user-attachments/assets/bd2cd740-cdba-42e3-9eae-734af2146e22)

