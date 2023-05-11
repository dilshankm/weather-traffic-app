# React App with Docker and Nginx

This project is a sample application developed consuming singapore goverment external apis for viewing traffic images and weather forecast for a particular day and time and selecting a location.

## Requirements

- Node.js
- npm
- Docker

## Getting Started

First, install dependencies:

npm install

Then, you can run the app in development mode:

npm start

Or you can create a production build of the app:

npm run build

## Docker

### Building the Docker Image

You can build a Docker image of the application by using the provided Dockerfile. To do so, navigate to the root directory of the project and run the following command:

docker build -t weather-traffic-app .

### Running the Docker Container

After the image has been built, you can run a container from the image using the following command:

docker run -p 3000:80 weather-traffic-app

This command maps port 80 in the Docker container to port 3000 on your host machine.

After the Docker container is running, you should be able to access the application in your web browser at http://localhost:3000.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
