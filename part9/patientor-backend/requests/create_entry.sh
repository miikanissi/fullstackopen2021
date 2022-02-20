#!/bin/sh
curl -X POST http://localhost:3001/api/patients/3ff2f0a0-928e-11ec-ba6b-f5e40f072505/entries \
  -H 'Content-Type: application/json' \
  -d '{"description": "Entry for Miika Nissi", "date": "2022-02-20", "specialist": "Matti Luukkainen", "type": "Hospital", "discharge": {"date": "2022-02-20", "criteria": "He died"}}'
