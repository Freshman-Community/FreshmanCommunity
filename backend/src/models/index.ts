import { Sequelize, Model, DataTypes } from 'sequelize';
import { env } from '../modules/env';
import { logger } from '../modules/logger';
import { Articles } from './articles.model';
import { Comments } from './comments.model';
import { Users } from './users.model';

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
  logger.debug('Start to initialize models');
  Users.initModel(sequelize);
  Articles.initModel(sequelize);
  Comments.initModel(sequelize);

  logger.debug('Start to create model associations');
  Users.hasMany(Articles, {
    foreignKey: 'authorId',
    sourceKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  Articles.belongsTo(Users, {
    foreignKey: 'authorId',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  Users.hasMany(Comments, {
    foreignKey: 'authorId',
    sourceKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  Comments.belongsTo(Users, {
    foreignKey: 'authorId',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  Articles.hasMany(Comments, {
    foreignKey: 'articleId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Comments.belongsTo(Articles, {
    foreignKey: 'articleId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully :)');
  } catch (error) {
    logger.error(`Unable to establish connection to the database :( ${error}`);
  }

  return sequelize;
}
