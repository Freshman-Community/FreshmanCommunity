import { Sequelize, Model, DataTypes } from 'sequelize';
import { Articles } from './articles.model';
import { Users } from './users.model';

export class Comments extends Model {
  id: number;
  authorId?: number;
  articleId?: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  anonymity: boolean;
  voteCount: number;

  static initModel(sequelize: Sequelize): typeof Comments {
    Comments.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        authorId: {
          type: DataTypes.BIGINT,
          references: {
            model: Users,
            key: 'id',
          },
        },
        articleId: {
          type: DataTypes.BIGINT,
          references: {
            model: Articles,
            key: 'id',
          },
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        anonymity: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        voteCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    );
    return Comments;
  }
}
