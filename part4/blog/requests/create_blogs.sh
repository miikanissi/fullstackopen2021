#!/bin/sh
curl -X POST http://localhost:3001/api/blogs \
   -H 'Content-Type: application/json' \
   -d '{"title": "Miika'\''s Blog", "author": "Miika Nissi", "url": "miikanissi.com", "likes": 10}'
