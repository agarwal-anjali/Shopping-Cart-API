import express from 'express';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import { sequelize } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database connection synchronized');
}).catch((error) => {
  console.error('Database synchronization error:', error);
});

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle Ctrl+C (SIGINT) signal
process.on('SIGINT', () => {
  console.log('User is terminating server (Ctrl+C)');
  process.exit(0); // Exit the application gracefully
});

export default app;
