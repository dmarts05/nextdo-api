import { Response } from 'express';
import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const removeFileNameExtension = (fileName: string) =>
  fileName.split('.').shift();

for (const file of readdirSync(PATH_ROUTER)) {
  const fileName = removeFileNameExtension(file);
  if (fileName === 'index') continue;

  import(`./${fileName}`).then(module => {
    router.use(`/${fileName}`, module.router);
  });
}

// Add a welcome message at the root of the API
router.get('/', (_, res: Response) => {
  res.send({
    message: 'Welcome to NextDo API!',
  });
});

export default router;
