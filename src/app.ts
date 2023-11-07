// app.ts
import express from 'express';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import { Options, Sequelize } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3000;

// Set the environment based on NODE_ENV or default to 'development'
const environment = process.env.NODE_ENV || 'development';

console.log(environment);

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

// Load database configuration from config.json
// const config = require(path.join(__dirname, '../config/config.json'))[environment];

console.log(config);

// Sequelize configuration
const sequelize = new Sequelize(config);

// Add an event listener to indicate when the app has started
// app.on('appStarted', () => {
//   console.log(`Server is running on port ${PORT}`);
// });

sequelize.sync().then(() => {
    console.log('Database connection synchronized');
    // app.emit('appStarted'); // Emit the event when the database is synced
}).catch((error) => {
    console.error('Database synchronization error:', error);
});

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
