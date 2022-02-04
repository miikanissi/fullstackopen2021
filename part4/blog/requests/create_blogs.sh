#!/bin/sh
curl -X POST http://localhost:3001/api/blogs \
  -H 'Content-Type: application/json' \
  -H "Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImsxMjM0NSJ9.eyJ0aXRsZSI6Ik1paWthJ3MgQmxvZyIsImF1dGhvciI6Ik1paWthIE5pc3NpIiwidXJsIjoibWlpa2FuaXNzaS5jb20iLCJsaWtlcyI6MTB9.FR4yAgreAslrxGbyctXJc-mrnV3o8b3FI1zp2STO4BE" \
  -d '{"title": "Miika'\''s Blog", "author": "Miika Nissi", "url": "miikanissi.com", "likes": 10}'
