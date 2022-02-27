#!/bin/sh
curl -X POST http://localhost:3001/api/users \
  -H 'Content-Type: application/json' \
  -d '{"blogs": [], "username": "mnissi", "name": "Miika Nissi", "password": "password"}'
