# Weather Traffic App

This project is a sample application developed consuming Singapore government external APIs for viewing traffic images and weather forecast for a particular day and time and selecting a location. It includes a frontend built with React and a backend built with NestJS.

## Requirements

- Node.js
- npm
- Docker
- Docker Compose

## Getting Started

This project is made up of two sub-projects: a `client` and a `server`. Each can be installed and run separately, or they can be run together using Docker Compose.

### Client (React Application)

- Navigate to the `client` directory. (Root directory)
- Install dependencies with `npm install`.
- Run the application in development mode with `npm start`.
- Create a production build of the application with `npm run build`.

### Server (NestJS Application)

- Navigate to the `server` directory.
- Install dependencies with `npm install`.
- Run the application in development mode with `npm start`.
- Create a production build of the application with `npm run build`.

### Running the projects together with Docker Compose

From the root directory of the project, you can use Docker Compose to build and start both services:

```bash
docker-compose up --build
```

This will build and start both the React app and the NestJS server. The React app can be accessed at http://localhost:3000 and the NestJS server can be accessed at http://localhost:4000.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
