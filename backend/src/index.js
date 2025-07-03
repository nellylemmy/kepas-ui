import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';
import * as redis from 'redis';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('views', join(__dirname, '..', 'frontend'));
app.set('view engine', 'html');
app.engine('html', (filePath, options, callback) => {
  import('ejs').then(ejs => {
    ejs.renderFile(filePath, options, callback);
  });
});

app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(join(__dirname, '..', 'frontend')));

// Redis client for rate limiting
const redisClient = redis.createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

// Rate limiting middleware
const limiter = rateLimit({
  store: new RateLimitRedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  message: '<div class="toast error show">Too many requests from this IP, please try again after an hour.</div>',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

import messagesRouter from './routes/messages.js';
import leadsRouter from './routes/leads.js';
import testimonialsRouter from './routes/testimonials.js';
import postsRouter from './routes/posts.js';

app.use('/api', messagesRouter);
app.use('/api', leadsRouter);
app.use('/api', testimonialsRouter);
app.use('/api', postsRouter);

// Apply the rate limiting middleware to API calls
app.use('/api/messages', limiter);

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KEPAS API',
      version: '1.0.0',
      description: 'API documentation for the KEPAS website',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Testimonial: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            author: { type: 'string' },
            quote: { type: 'string' },
            title: { type: 'string' },
            company: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        TestimonialInput: {
          type: 'object',
          required: ['author', 'quote'],
          properties: {
            author: { type: 'string' },
            quote: { type: 'string' },
            title: { type: 'string' },
            company: { type: 'string' },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        PostInput: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/api/status', async (req, res) => {
  const status = {
    postgres: false,
    redis: false,
    strapi: false,
  };

  try {
    await pool.query('SELECT 1');
    status.postgres = true;
  } catch (error) {
    console.error('PostgreSQL status check failed:', error.message);
  }

  try {
    await redisClient.ping();
    status.redis = true;
  } catch (error) {
    console.error('Redis status check failed:', error.message);
  }

  try {
    const strapiResponse = await fetch('http://strapi:1337/admin');
    if (strapiResponse.ok) {
      status.strapi = true;
    }
  } catch (error) {
    console.error('Strapi status check failed:', error.message);
  }

  res.json(status);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;