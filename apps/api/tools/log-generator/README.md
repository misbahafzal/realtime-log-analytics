# Log Generator

A utility tool for generating and sending simulated log entries to the realtime-log-analytics API. Useful for testing, development, and load testing the log ingestion system.

## Overview

The log generator creates realistic log entries with randomized data and sends them to the API endpoint at a configurable rate. It automatically stops after generating a specified number of logs.

## Features

- **Randomized log data**: Generates logs with random service names, log levels, timestamps, and trace IDs
- **Configurable rate**: Sends logs at 1 log per second (configurable)
- **Auto-stop**: Automatically stops after generating 50 logs (configurable)
- **Error handling**: Gracefully handles connection errors and continues running

## Generated Log Structure

Each generated log entry contains:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "info" | "warn" | "error",
  "service": "auth-service" | "payment-service" | "order-service",
  "message": "Simulated log message",
  "traceId": "abc123xyz"
}
```

## Prerequisites

- Node.js (v18 or higher)
- The API server running on `http://localhost:3000`

## Installation

```bash
npm install
```

## Usage

### Run with ts-node

```bash
npx ts-node generate.ts
```

### Run with Node.js (after compilation)

```bash
tsc generate.ts
node generate.js
```

## Configuration

You can modify the following constants in `generate.ts`:

- `SERVICES`: Array of service names to randomly select from
- `LEVELS`: Array of log levels to randomly select from
- `MAX_LOGS`: Maximum number of logs to generate before stopping (default: 50)
- `INTERVAL_MS`: Time interval between log generations in milliseconds (default: 1000ms = 1 second)

## Example Output

```
Sent log: auth-service info
Sent log: payment-service error
Sent log: order-service warn
...
Log generation stopped.
```

## Error Handling

If the API server is not running or unreachable, the generator will:
- Log an error message to the console
- Continue attempting to send logs at the configured interval
- Not stop the generation process (unless `MAX_LOGS` is reached)

## Use Cases

- **Development**: Quickly populate the system with test data
- **Testing**: Verify log ingestion and processing pipelines
- **Load Testing**: Generate logs at scale to test system performance
- **Demo**: Showcase the real-time log analytics dashboard with live data

## Notes

- Ensure the API server is running before starting the generator
- The generator sends logs to `http://localhost:3000/logs` by default
- Modify the endpoint URL in the code if your API runs on a different port or host

