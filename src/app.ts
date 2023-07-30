import cors from 'cors';
import 'dotenv/config';
import express, { Response } from 'express';

import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
// Cors should be updated to only allow requests from the frontend later on
app.use(cors());

// Routes
app.use(router);

app.get('/', (_, res: Response) => {
  res.send({
    message: 'Welcome to NextDo API!',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
