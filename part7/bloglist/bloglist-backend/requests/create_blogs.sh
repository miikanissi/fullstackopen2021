#!/bin/sh
curl -X POST http://localhost:3001/api/blogs \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1uaXNzaSIsImlkIjoiNjFmZWYxYTY2ZDE4N2ZlMmQyNWU2MWI3IiwiaWF0IjoxNjQ0MDk4MDY3fQ.UsndfPb_RnOLwbtk3vkzmLMpSlhw3K0Be9uy-rl6_To" \
  -d '{"title": "Miika'\''s Blog", "author": "Miika Nissi", "url": "miikanissi.com", "likes": 10}'
