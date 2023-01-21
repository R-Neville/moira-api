import "dotenv/config";
import app, { port } from "./app";
import logger from "./logger";
import sequelize, { dbConnect } from "./sequelize";

(async () => {
  await dbConnect(sequelize);

  try {
    app.listen(port, (): void => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error((error as Error).message);
  }
})();
