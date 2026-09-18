#!/bin/bash

BASE_URL="http://localhost:3000"

# Number of requests to send to EACH endpoint
REQUESTS=100

ENDPOINTS=(
    "/"
    "/customers"
    "/health"
    "/warning"
    "/error"
    "/slow"
)

echo "==============================================="
echo "Starting Traffic Generation"
echo "Base URL      : $BASE_URL"
echo "Requests/Path : $REQUESTS"
echo "==============================================="

TOTAL=0

for ENDPOINT in "${ENDPOINTS[@]}"
do
    echo ""
    echo "Sending $REQUESTS requests to $ENDPOINT"

    for ((i=1; i<=REQUESTS; i++))
    do
        printf "\r[%3d/%3d] %s" "$i" "$REQUESTS" "$ENDPOINT"

        curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${ENDPOINT}" > /dev/null

        TOTAL=$((TOTAL + 1))
    done

    echo "  ✔ Completed"
done

echo ""
echo "==============================================="
echo "Traffic Generation Completed"
echo "==============================================="
echo "Total Requests Sent : $TOTAL"
echo "Expected Count Per Endpoint:"
echo "  /            : $REQUESTS"
echo "  /customers   : $REQUESTS"
echo "  /health      : $REQUESTS"
echo "  /warning     : $REQUESTS"
echo "  /error       : $REQUESTS"
echo "  /slow        : $REQUESTS"
echo "==============================================="