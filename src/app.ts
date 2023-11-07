import express from 'express';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle Ctrl+C (SIGINT) signal
process.on('SIGINT', () => {
  console.log('Terminating server (Ctrl+C)');
});

export default app;
