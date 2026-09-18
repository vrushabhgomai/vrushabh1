console.log("LOGS ENDPOINT:", process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT);
const express = require("express");
const winston = require("winston");

const app = express();
const PORT = 3000;

/*
|--------------------------------------------------------------------------
| Logger Configuration
|--------------------------------------------------------------------------
*/

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
  logger.info("Incoming Request", {
    method: req.method,
    url: req.url
  });

  next();
});

/*
|--------------------------------------------------------------------------
| Fast Endpoint
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  logger.info("Home endpoint called");

  res.json({
    status: "success",
    message: "Customer Portal Running"
  });
});

/*
|--------------------------------------------------------------------------
| Customer Endpoint
|--------------------------------------------------------------------------
*/

app.get("/customers", (req, res) => {
  logger.info("Fetching customers");

  res.json([
    {
      id: 1,
      name: "Nilesh"
    },
    {
      id: 2,
      name: "John"
    }
  ]);
});

/*
|--------------------------------------------------------------------------
| Slow Endpoint
|--------------------------------------------------------------------------
*/

app.get("/slow", async (req, res) => {

  logger.info("Slow endpoint started");

  await new Promise(resolve => setTimeout(resolve, 5000));

  logger.info("Slow endpoint completed");

  res.json({
    status: "success",
    responseTime: "5 seconds"
  });
});

/*
|--------------------------------------------------------------------------
| Very Slow Endpoint
|--------------------------------------------------------------------------
*/

app.get("/very-slow", async (req, res) => {

  logger.info("Very slow endpoint started");

  await new Promise(resolve => setTimeout(resolve, 10000));

  logger.info("Very slow endpoint completed");

  res.json({
    status: "success",
    responseTime: "10 seconds"
  });
});

/*
|--------------------------------------------------------------------------
| Warning Endpoint
|--------------------------------------------------------------------------
*/

app.get("/warning", (req, res) => {

  logger.warn("Low inventory warning generated");

  res.json({
    status: "warning",
    message: "Inventory below threshold"
  });
});

/*
|--------------------------------------------------------------------------
| Error Endpoint
|--------------------------------------------------------------------------
*/

app.get("/error", (req, res) => {

  logger.error("Business error generated");

  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

/*
|--------------------------------------------------------------------------
| Exception Endpoint
|--------------------------------------------------------------------------
*/

app.get("/exception", (req, res) => {

  logger.error("Throwing exception intentionally");

  throw new Error("Sample exception from customer portal");
});

/*
|--------------------------------------------------------------------------
| CPU Simulation Endpoint
|--------------------------------------------------------------------------
*/

app.get("/load", (req, res) => {

  logger.info("Generating CPU load");

  let total = 0;

  for (let i = 0; i < 100000000; i++) {
    total += i;
  }

  res.json({
    status: "success",
    result: total
  });
});

/*
|--------------------------------------------------------------------------
| Health Endpoint
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {

  res.json({
    status: "UP"
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {

  logger.error("Unhandled Exception", {
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    status: "error",
    message: err.message
  });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {

  logger.info(`Customer Portal started on port ${PORT}`);
});
