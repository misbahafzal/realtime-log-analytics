import axios from 'axios';

const SERVICES = ['auth-service', 'payment-service', 'order-service'];
const LEVELS = ['info', 'warn', 'error'];

let count = 0;
const MAX_LOGS = 50; // hard stop
const INTERVAL_MS = 1000; // 1 log / second

const interval = setInterval(async () => {
    if (count >= MAX_LOGS) {
      clearInterval(interval);
      console.log('Log generation stopped.');
      process.exit(0);
    }

    const log = {
      timestamp: new Date().toISOString(),
      level: LEVELS[Math.floor(Math.random() * LEVELS.length)],
      service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
      message: 'Simulated log message',
      traceId: Math.random().toString(36).substring(2, 10),
    };

    try {
      await axios.post('http://localhost:3000/logs', log);
      console.log('Sent log:', log.service, log.level);
    } catch (error) {
      console.error('Failed to send log:', error?.message ?? error);
    }

    count++;
}, INTERVAL_MS);
