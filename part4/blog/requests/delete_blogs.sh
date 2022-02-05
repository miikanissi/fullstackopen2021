#!/bin/sh
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1uaXNzaSIsImlkIjoiNjFmZWYxYTY2ZDE4N2ZlMmQyNWU2MWI3IiwiaWF0IjoxNjQ0MDk4MDY3fQ.UsndfPb_RnOLwbtk3vkzmLMpSlhw3K0Be9uy-rl6_To" \
-X DELETE http://localhost:3001/api/blogs/61fef8f973c6d1251357015a
