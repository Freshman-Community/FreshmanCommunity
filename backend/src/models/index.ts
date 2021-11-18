import { Sequelize, Model, DataTypes } from 'sequelize';
import { env } from '../modules/env';
import { logger } from '../modules/logger';

const { host, port, database, username, password } = env.database;
const sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
  host,
  port,
  logging: (query) => {
    logger.verbose(`Query database: ${query}`);
  },
});

export async function initializeSequelize() {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully :)');
  } catch (error) {
    logger.error(`Unable to establish connection to the database :( ${error}`);
  }
  return sequelize;
}
