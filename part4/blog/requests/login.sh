#!/bin/sh
curl -X POST http://localhost:3001/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "mnissi", "password": "password"}'
