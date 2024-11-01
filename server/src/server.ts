import express from 'express';
const PORT = process.env.PORT || 3001;

import routes from './routes/index.js';
import htmlRoutes from './routes/htmlRoutes.js';

const app = express();

// TODO: Set up static folder and serve static files of entire client dist folder
// 
app.use(htmlRoutes);

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

