import { Sequelize } from "sequelize";
import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
  DB_CONNECTION,
} from "../Config/config.js";

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_CONNECTION,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Render
    },
  },
});
