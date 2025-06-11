# Fullstack Notes App

## Installation

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development without Docker)

### Project Structure

- **Frontend**  
  Created with React + TypeScript  
  Accessible at: [`http://localhost:3000`](http://localhost:3000)  
  Scaffolded via:
  ```sh
  npx create-react-app frontend --template typescript
  ``` 

  - **Backend**  
  Created with React + TypeScript  
  Accessible at: [`http://localhost:5000`](http://localhost:5000) 
  Swagget UI: [`http://localhost:5000/swagger`](http://localhost:5000/swagger) 
  Scaffolded via:
  ```sh
  dotnet new webapi -n BackendApp -o backend
  ``` 

#### Running the Application

1. Build and start the containers:
  ```sh
  docker-compose up --build
  ``` 
2. Then remove the containters with
```sh
  docker-compose down
  ``` 