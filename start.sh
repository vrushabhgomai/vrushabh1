#!/bin/bash

export OTEL_SERVICE_NAME=node-test-app

export OTEL_RESOURCE_ATTRIBUTES="deployment.environment=poc,service.version=1.0.0"

export OTEL_TRACES_EXPORTER=otlp
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp

export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=<your_traces_endpoint>
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=<your_metrics_endpoint>
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=<your_logs_endpoint>

export OTEL_EXPORTER_OTLP_HEADERS="x-api-key=<your_api_key>,X-Metrics-Type=otel"

export OTEL_TRACES_SAMPLER=always_on
export OTEL_LOG_LEVEL=debug
export OTEL_NODE_RESOURCE_DETECTORS=env,host

echo "TRACES=$OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"
echo "METRICS=$OTEL_EXPORTER_OTLP_METRICS_ENDPOINT"
echo "LOGS=$OTEL_EXPORTER_OTLP_LOGS_ENDPOINT"

NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" node app.js

