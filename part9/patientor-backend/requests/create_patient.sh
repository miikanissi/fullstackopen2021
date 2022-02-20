#!/bin/sh
curl -X POST http://localhost:3001/api/patients \
  -H 'Content-Type: application/json' \
  -d '{"name": "Miika Nissi", "ssn": "12345678", "gender": "male", "occupation": "Software Developer", "dateOfBirth": "1998-01-01"}'
