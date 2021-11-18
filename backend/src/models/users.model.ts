import { Sequelize, DataTypes, Model } from 'sequelize';

export class Users extends Model {
  id: number;
  username: string;
  password: string;
  nickname: string;
  major?: string;
  enteredYear?: number;

  static initModel(sequelize: Sequelize): typeof Users {
    Users.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: 'users_username_uindex',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'users_nickname_uindex',
        },
        major: {
          type: DataTypes.STRING(50),
        },
        enteredYear: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'users_username_uindex',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'username' }],
          },
          {
            name: 'users_nickname_uindex',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'nickname' }],
          },
        ],
      },
    );
    return Users;
  }
}
