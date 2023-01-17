import express, { Application, Request, Response } from "express";
import logger from "./logger";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.listen(port, (): void => {
    logger.info(`Server is running at http://localhost:${port}`);
  });
} catch (error) {
  logger.error((error as Error).message)
}