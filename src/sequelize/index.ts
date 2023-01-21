import { Dialect, Sequelize } from "sequelize";
import dbConfig from "../config/db-config";
import modelInitializers from "./models";
import initAssociations from "./models/initAssociations";
import logger from "../logger";

export async function dbConnect(sequelize: Sequelize) {
  try {
    await sequelize.authenticate();
    logger.info("Database connection succeeded");
  } catch (error) {
    logger.error(`Database connection failed - ${(error as Error).message}`);
    process.exit(1);
  }
}

const sequelize = new Sequelize(
  dbConfig.name!,
  dbConfig.username!,
  dbConfig.password!,
  {
    host: dbConfig.host!,
    dialect: dbConfig.dialect! as Dialect,
    logging: false,
  }
);

modelInitializers.forEach((initializer) => {
  initializer(sequelize);
});

initAssociations();

sequelize.sync();

export default sequelize;
