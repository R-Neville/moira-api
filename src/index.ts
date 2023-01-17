import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.listen(port, (): void => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (error) {
  console.log(`ERROR: ${(error as Error).message}`)
}