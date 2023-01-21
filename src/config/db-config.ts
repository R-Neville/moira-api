const dbConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default dbConfig;
