import { Options, Sequelize } from 'sequelize';

console.log(process.env.NODE_ENV);

const environment = process.env.NODE_ENV? 'test' :'development';

console.log(environment);

const config = require('../../src/config/config.json')[environment];

// Sequelize configuration
const sequelize = new Sequelize(config);

sequelize.sync().then(() => {
  console.log('Database connection synchronized');
}).catch((error) => {
  console.error('Database synchronization error:', error);
});

export { sequelize };
