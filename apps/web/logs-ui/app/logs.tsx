'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface Log {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  traceId?: string;
}

const socket = io('http://localhost:3000');

export default function LiveLogs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    socket.on('log', (log: Log) => {
      setLogs((prev) => [log, ...prev].slice(0, 100));
    });

    return () => {
      socket.off('log');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🔴 Live Logs</h1>

      <div className="space-y-2 font-mono text-sm">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border border-gray-800 bg-gray-900 ${
              log.level === 'error'
                ? 'text-red-400'
                : log.level === 'warn'
                ? 'text-yellow-400'
                : 'text-green-400'
            }`}
          >
            <div className="flex gap-2">
              <span className="opacity-60">{log.timestamp}</span>
              <span>[{log.level.toUpperCase()}]</span>
              <span className="text-blue-400">{log.service}</span>
            </div>
            <div className="ml-2">{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
