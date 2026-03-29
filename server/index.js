import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import customersRoutes from './routes/customers.js';
import submissionsRoutes from './routes/submissions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://steliosk2000.github.io',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/submissions', submissionsRoutes);

// Database check route
app.get('/health', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
