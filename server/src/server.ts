import express from 'express';
import router from './routes/api/index';
import weatherRoutes from './routes/api/weatherRoutes';

const app = express();

// Middleware setup
app.use(express.json());

// Use the router defined in index.ts
app.use(router);

// Use weather routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// import router from './routes/index';
// import weatherRoutes from './routes/api/weatherRoutes';
// const PORT = process.env.PORT || 3000;
// const app = express();


// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../../client/dist')));

// // TODO: Implement middleware for parsing JSON and urlencoded form data
// // Using extended: false to parse URL-encoded data with the querystring library
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // TODO: Implement middleware to connect the routes
// app.use(router);

// // Start the server on the port
// app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

// export default app;