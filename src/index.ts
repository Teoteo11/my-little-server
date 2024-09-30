import express, { Request, Response } from 'express';
import { generateUsers } from './generate-users';

const app = express();

const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to my little server!</h1>');
});

app.get('/generate-users', (req: Request, res: Response) => {
  try {
    const users = generateUsers(100);
    res.status(200).json({
      message: 'Utenti generati con successo!',
      users
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Errore durante la generazione degli utenti',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});