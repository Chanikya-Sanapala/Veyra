import 'dotenv/config';
import connectDB from './src/config/database.js';
import startScheduler from './src/utils/scheduler.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const { default: app } = await import('./src/app.js');
  startScheduler();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Smart Engine Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  });

  process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Promise Rejection:', err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();
