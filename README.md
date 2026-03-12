# Nano-Edge API (Banana Edition) 

A hyper-optimized, low-latency microservice designed for edge data processing. Built for maximum performance using Fastify and Redis.

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23202020.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## Features
- **Nano-Banana Latency:** Fastify-based architecture for high-throughput edge processing.
- **Redis Integration:** Low-latency key-value storage with automatic expiration (TTL).
- **Hardened Security:** Built-in CORS and Helmet protection for production-ready SecOps.
- **Type-Safe Validation:** Full request body validation powered by Zod.

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Redis](https://redis.io/) (Local or Cloud instance)

### Installation
```bash
git clone https://github.com/Belphegor-ux/nano-edge-api.git
cd nano-edge-api
npm install
```

### Running the API
Make sure Redis is running, then:
```bash
node server.js
```
The server will start on `http://localhost:3000`.

## 🛠️ API Endpoints

### Status Check
`GET /status` - Returns the real-time health and uptime of the "Nano-Banana" engine.

### Data Ingest
`POST /data` - Process and store edge data in Redis.
```json
{
  "id": "uuid-v4",
  "payload": { "key": "value" },
  "timestamp": "iso-date"
}
```

## Tech Stack
- **Framework:** Fastify
- **Database:** ioredis
- **Validation:** Zod
- **Infrastructure:** Prometheus/Grafana ready

---
Built with by [Belphegor-ux](https://github.com/Belphegor-ux)
