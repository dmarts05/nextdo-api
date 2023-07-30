import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;

export const router = Router();

const removeFileNameExtension = (fileName: string) => fileName.split('.')[0];

for (const file of readdirSync(PATH_ROUTER)) {
  const fileName = removeFileNameExtension(file);
  if (fileName === 'index') continue;

  import(`./${fileName}`).then(module => {
    router.use(`/${fileName}`, module.router);
  });
}
