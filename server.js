const fastify = require('fastify')({ logger: true });
const Redis = require('ioredis');
const { z } = require('zod');

// Nano-Banana Configuration
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  connectTimeout: 10000,
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on('connect', () => console.log('✅ Redis Connected!'));
redis.on('error', (err) => console.error('❌ Redis Error:', err.message));

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/helmet'));

// --- Flashy Landing Page ---
fastify.get('/', async (request, reply) => {
  reply.type('text/html').send(`
    <html>
      <head>
        <title>🍌 Nano-Edge API</title>
        <style>
          body { background: #020617; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); text-align: center; backdrop-filter: blur(10px); }
          h1 { color: #eab308; margin-bottom: 0.5rem; }
          .status { font-family: monospace; color: #4ade80; margin-top: 1rem; }
          .btn { background: #eab308; color: #020617; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 1rem; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🍌 Nano-Edge API</h1>
          <p>The high-performance data ingest engine is online.</p>
          <div class="status">REDIS STATUS: ${redis.status}</div>
          <a href="/status" class="btn">Check Health</a>
        </div>
      </body>
    </html>
  `);
});

// Validation Schema
const DataSchema = z.object({
  id: z.string().uuid(),
  payload: z.record(z.any()),
  timestamp: z.string().datetime()
});

fastify.get('/status', async (request, reply) => {
  return { 
    status: '🍌 Nano-Banana Active', 
    uptime: process.uptime(),
    redis: redis.status 
  };
});

fastify.post('/data', async (request, reply) => {
  try {
    const data = DataSchema.parse(request.body);
    const start = Date.now();
    await redis.set(`node:${data.id}`, JSON.stringify(data.payload), 'EX', 3600);
    const latency = Date.now() - start;
    
    return { 
      message: 'Processed at Edge', 
      id: data.id,
      metrics: { latency: `${latency}ms` }
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation Failed', details: err.errors });
    } else {
      reply.status(500).send({ error: 'Internal Server Error', message: err.message });
    }
  }
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: port, host: '0.0.0.0' });
    console.log(`🚀 Nano-Edge API screaming on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
