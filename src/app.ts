import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import establishDBConnection from './db/mongo';
import router from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

// *** Middlewares ***
// TODO: Cors should be updated to only allow requests from the frontend later on
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// *** Routes ***
app.use(router);

// *** Database ***
establishDBConnection()
  .then(() => {
    console.log('DB connection established!');
  })
  .catch((err: Error) => {
    console.error('DB connection failed!');
    console.error(err);
    // Exit the process if the DB connection fails
    process.exit(1);
  });

// *** Start the server ***
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
