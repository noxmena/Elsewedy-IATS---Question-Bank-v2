#!/usr/bin/env bash
# Simple helper to test the /api/grade endpoint locally or on a deployed host.
# Usage:
#   OPENROUTER_API_KEY="sk-..." ./scripts/test-grade.sh http://localhost:5173

set -euo pipefail

HOST=${1:-http://localhost:5173}

if [ -z "${OPENROUTER_API_KEY:-}" ]; then
  echo "ERROR: OPENROUTER_API_KEY is not set. Export it before running."
  exit 1
fi

echo "Sending test grading request to $HOST/api/grade"

payload=$(cat <<'JSON'
{ "model":"openai/gpt-oss-20b:free", "temperature":0.1, "messages":[{"role":"system","content":"You are an automated technical exam grading engine. Return a single JSON object with isCorrect, score, feedback, modelAnswer."},{"role":"user","content":"Question: \"What is 2+2\" Type: \"shortAnswer\" Expected: \"4\" User: \"4\""} ] }
JSON
)

resp=$(curl -s -X POST "$HOST/api/grade" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d "$payload")

echo
echo "Response:" 
echo "$resp" | jq . || echo "$resp"
