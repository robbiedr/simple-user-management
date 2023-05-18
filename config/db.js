require('dotenv').config();
const Sequelize = require('sequelize');

const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

// DEFINITIONS
const users = require('../definitions/Users');

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  timezone: 'utc',
});

const db = {
  Sequelize,
  sequelize,
};

// MODELS
db.users = users(sequelize, Sequelize);

module.exports = db;
