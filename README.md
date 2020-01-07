# eventshuffle-backend
A backend API for a doodle-like application, current features: save events, vote on suitable dates, get dates suitable for all participants.
## Requirements
- [node.js](https://nodejs.org/en/), developed on version `10.15.3`. _Should_ work on all versions up from `8.0`, although not confirmed.
- A [MongoDB](https://www.mongodb.com/) database
## Installation and usage
After cloning the project, install required dependencies using `npm install` in project's root. Set up environment variables `MONGODB_URI` and `PORT` using for example a `.env`-file. After installation start the application by running `npm start` in project's root. Running `npm run watch` instead starts the application's development version with [nodemon](https://nodemon.io/).
