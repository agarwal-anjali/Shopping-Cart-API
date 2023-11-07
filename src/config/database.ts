import { Options, Sequelize } from 'sequelize';

const environment = process.env.NODE_ENV || 'development';

let config: Options;

if(environment === 'development') {
  config = {
    dialect: 'sqlite',
    storage: 'database.sqlite'
  }
} else {
  config = {
    dialect: 'sqlite',
    storage: 'test_database.sqlite'
  }
}

// const config = require(path.join(__dirname, '../config/config.json'))[environment];

// Sequelize configuration
const sequelize = new Sequelize(config);

export { sequelize };
