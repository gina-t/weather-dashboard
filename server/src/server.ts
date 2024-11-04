import express from 'express';
import routes from './routes/routesIndex.js';


const app = express();

// set up static folder
app.use(express.static('client/dist'));

// Middleware setup
app.use(express.json());

// Use the router defined in routesIndex.ts
app.use(routes);

// TODO: Implement middleware for parsing JSON and urlencoded form data
// Using extended: false to parse URL-encoded data with the querystring library
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use weather routes


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
