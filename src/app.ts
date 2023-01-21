import express, { Application, NextFunction } from "express";
import cors from "cors";
import corsConfig from "./config/cors-config";
import v1Router from "./api/v1";
import notFoundHandler from "./exceptions/notFoundHandler";
import errorHandler from "./exceptions/errorHandler";

const app: Application = express();
export const port = process.env.PORT || 3000;

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import "./config/passport-config";

app.use("/api/v1", v1Router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
