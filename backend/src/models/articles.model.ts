import { Sequelize, DataTypes, Model, Deferrable } from 'sequelize';
import { Users } from './users.model';

export type Category = 'announce' | 'restaurant' | 'general';

export class Articles extends Model {
  id: number;
  authorId?: number;
  communityType: Category;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  anonymity: boolean;
  voteCount: number;
  viewCount: number;

  static initModel(sequelize: Sequelize): typeof Articles {
    Articles.init(
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
        communityType: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
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
        viewCount: {
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
    return Articles;
  }
}
