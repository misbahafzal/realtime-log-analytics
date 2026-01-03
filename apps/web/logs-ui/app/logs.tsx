"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Log {
  timestamp: string;
  level: "info" | "warn" | "error";
  service: string;
  message: string;
  traceId?: string;
}

const socket = io("http://localhost:3000");

const LEVELS = ["info", "warn", "error"];

export default function LiveLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [paused, setPaused] = useState(false);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  useEffect(() => {
    const handler = (log: Log) => {
      if (paused) return;
      setLogs((prev) => [log, ...prev].slice(0, 200));
    };

    socket.on("log", handler);

    return () => {
      socket.off("log", handler);
    };
  }, [paused]);
  const services = Array.from(new Set(logs.map((l) => l.service)));
  const filteredLogs = logs.filter((log) => {
    if (levelFilter !== "all" && log.level !== levelFilter) return false;
    if (serviceFilter !== "all" && log.service !== serviceFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">🔴 Live Logs</h1>
        <button
          onClick={() => setPaused((p) => !p)}
          className={`px-4 py-2 rounded text-sm font-semibold border ${
            paused
              ? "bg-green-600 border-green-500"
              : "bg-red-600 border-red-500"
          }`}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="all">All Levels</option>
          {LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          <option value="all">All Services</option>
          {services.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 font-mono text-sm">
        {filteredLogs.map((log, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border border-gray-800 bg-gray-900 ${
              log.level === "error"
                ? "text-red-400"
                : log.level === "warn"
                ? "text-yellow-400"
                : "text-green-400"
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
