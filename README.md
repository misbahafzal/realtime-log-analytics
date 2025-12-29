# Real-Time Log Analytics Platform
A full-stack distributed system that ingests logs in real-time, processes them through a streaming pipeline, and exposes analytics dashboards with live metrics.
Designed as a production-grade, scalable, fault-tolerant system using Node.js, Python, WebSockets, Redis, and Kafka-like patterns.

## Features
- Real-time log ingestion over REST or WebSocket
- Streaming pipeline that processes logs instantly
- CQRS-style aggregation (counts, error rates, frequency analysis)
- Live dashboard (React/Next.js)
- Horizontal scaling with Redis pub/sub queues
- Log search with filters (service, severity, timestamp)
- Structured parsing and validation
- Modular architecture (collector → processor → dashboard)

## High-Level Architecture

```bash

           ┌───────────────┐
           │  Log Sources   │
           └───────┬───────┘
                   │  (HTTP/WebSocket)
           ┌───────▼────────┐
           │ Log Collector   │  Node.js (NestJS)
           └───────┬────────┘
                   │ publishes
           ┌───────▼────────┐
           │  Redis Stream   │  (Pub/Sub / Streams)
           └───────┬────────┘
                   │ consumed by
           ┌───────▼────────┐
           │ Log Processor   │  Python Worker
           └───────┬────────┘
                   │ writes aggregates
           ┌───────▼────────┐
           │ Redis Cache     │
           └───────┬────────┘
                   │
           ┌───────▼───────────┐
           │ Dashboard Backend  │  Node.js API
           └───────┬───────────┘
                   │
           ┌───────▼───────────┐
           │ React Frontend     │
           └────────────────────┘
```

## Tech Stack

### Backend 
- Node.js / NestJS
- Python Worker
- Redis (Streams / PubSub / Cache)

### Frontend
- React / Next.js
- Tailwind CSS

### DevOps
- Docker + Docker Compose
- PM2 / nodemon

## Folder Structure

```bash
realtime-log-analytics/
│
├── collector-service/        # Accepts logs (HTTP/Websocket)
├── processor-worker/         # Python log processor
├── dashboard-api/            # Serves analytics
├── dashboard-ui/             # React frontend
│
├── docker-compose.yml
└── README.md
```

## Running the Project

### Clone the repo

```bash
git clone https://github.com/misbahafzal/realtime-log-analytics
cd realtime-log-analytics
```

### Start all services

```bash
docker-compose up --build
```

### Send test logs

```bash
curl -X POST http://localhost:3001/log \
  -H "Content-Type: application/json" \
  -d '{"service": "auth", "level": "error", "message": "Invalid token"}'
```

### Open Dashboard

```bash
http://localhost:3000
```

 ## Roadmap
 
 - [ ] Add anomaly detection (Python)
 - [ ] Implement log retention policies
 - [ ] Add charts for severity levels
 - [ ] Add user authentication
 - [ ] Add Elasticsearch for search
 - [ ] Add rate limiting for log ingestion

 ## License
 MIT