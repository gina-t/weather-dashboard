import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 3000;
import routes from './routes/index.js';
import htmlRoutes from './routes/htmlRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const __parentDir = path.resolve(__dirname, '../../');
console.log(__parentDir);

// TODO: Serve static files from the client/dist directory
app.use(express.static(path.join(__parentDir, '/client/dist')));
app.use(htmlRoutes);

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

