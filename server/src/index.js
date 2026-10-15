import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';

dns.setDefaultResultOrder('ipv4first');

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS.'));
  },
}));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.get('/api/health', (request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    service: 'Srujana Sharma Portfolio API',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/contact', contactRoutes);

app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ message: 'Request body must be valid JSON.' });
  }
  if (error.message === 'Origin is not allowed by CORS.') {
    return response.status(403).json({ message: 'This origin is not allowed.' });
  }
  console.error(error);
  return response.status(500).json({ message: 'Unexpected server error.' });
});

async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is not set. Contact submission is disabled until MongoDB is configured.');
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    app.listen(port, () => console.log(`API running on port ${port}`));
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

start();
