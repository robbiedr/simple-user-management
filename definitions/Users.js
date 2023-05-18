const Users = (sequelize, Datatypes) => {
  return sequelize.define(
      'users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Datatypes.UUID,
          defaultValue: Datatypes.UUIDV4,
        },
        email: {
          type: Datatypes.STRING,
        },
        password: {
          type: Datatypes.STRING,
        },
        firstName: {
          type: Datatypes.STRING,
        },
        lastName: {
          type: Datatypes.STRING,
        },
        active: {
          type: Datatypes.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Datatypes.DATE,
          defaultValue: Datatypes.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Datatypes.DATE,
          defaultValue: Datatypes.literal('CURRENT_TIMESTAMP'),
        },
      },
  );
};

module.exports = Users;
