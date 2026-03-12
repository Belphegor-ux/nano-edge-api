const fastify = require('fastify')({ logger: true });
const Redis = require('ioredis');
const { z } = require('zod');

// Nano-Banana Configuration
const redis = new Redis('redis://localhost:6379');

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/helmet'));

// Validation Schema
const DataSchema = z.object({
  id: z.string().uuid(),
  payload: z.record(z.any()),
  timestamp: z.string().datetime()
});

fastify.get('/status', async (request, reply) => {
  return { status: '🍌 Nano-Banana Active', uptime: process.uptime() };
});

fastify.post('/data', async (request, reply) => {
  try {
    const data = DataSchema.parse(request.body);
    
    // Low-latency Redis storage
    const start = Date.now();
    await redis.set(`node:${data.id}`, JSON.stringify(data.payload), 'EX', 3600);
    const latency = Date.now() - start;
    
    return { 
      message: 'Processed at Edge', 
      id: data.id,
      metrics: { latency: `${latency}ms` }
    };
  } catch (err) {
    reply.status(400).send({ error: 'Validation Failed', details: err.errors });
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
