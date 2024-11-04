import express from 'express';
const PORT = process.env.PORT || 3000;
import apiRoutes from './routes/api/index.js';
const app = express();

app.use(express.static('./client/dist.js'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: Implement middleware to connect the routes
app.use('/api', apiRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

