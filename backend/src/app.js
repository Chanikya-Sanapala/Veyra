import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import connectionRoutes from './routes/connectionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import { sendError } from './utils/responseHandler.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const allowedOriginsEnv = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

// Dynamic CORS: allow env origins + any Vercel preview deployments (chanix/veyra) + localhost
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Standardize origin by removing trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    // Allow if explicitly listed or matched in allowed origins
    if (allowedOriginsEnv.includes(cleanOrigin) || allowedOriginsEnv.includes(origin)) return callback(null, true);
    // Allow any Vercel preview/production URL for chanix or veyra projects
    if (cleanOrigin.match(/^https:\/\/(chanix|veyra).*\.vercel\.app$/)) return callback(null, true);
    // Allow localhost in any form
    if (cleanOrigin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) return callback(null, true);
    console.warn(`[CORS] Blocked origin: ${origin}`);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000, // Relaxed for development
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.'
  }
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Engine API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supportedUserTypes: ['jobseeker', 'recruiter', 'admin']
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/games', gameRoutes);

// Serve uploaded files (e.g. resumes) statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/*splat', (req, res) => {
  sendError(res, `Route ${req.originalUrl} not found`, null, 404);
});

app.use((error, req, res, next) => {
  console.error('Global error:', error);

  if (error.name === 'MongoError' || error.name === 'MongooseError') {
    return sendError(res, 'Database connection error', null, 503);
  }

  if (error.type === 'entity.parse.failed') {
    return sendError(res, 'Invalid JSON format', null, 400);
  }

  sendError(res, 'Internal server error', null, 500);
});

export default app;
