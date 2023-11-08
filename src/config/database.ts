import { Sequelize } from 'sequelize';

const environment = process.env.NODE_ENV? 'test' :'development';

const config = require('../../src/config/config.json')[environment];

const sequelize = new Sequelize(config);

sequelize.sync().then(() => {
  console.log('Database connection synchronized');
}).catch((error) => {
  console.error('Database synchronization error:', error);
});

export { sequelize };
