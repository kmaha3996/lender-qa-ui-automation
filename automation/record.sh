#!/bin/bash
# Record a browser session using Playwright codegen
# This opens a browser where you interact normally.
# When you close the browser, the recorded script is saved to recordings/

RECORDING_DIR="recordings"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="${RECORDING_DIR}/session_${TIMESTAMP}.js"
TARGET_URL="${TARGET_URL:-https://example.com/}"

mkdir -p "$RECORDING_DIR"

echo "Ensuring Playwright browsers are installed..."
npx --yes playwright install chromium

echo "Starting Playwright recorder..."
echo "Target: $TARGET_URL"
echo "Output: $OUTPUT_FILE"
echo ""
echo "A browser will open. Perform your actions, then close the browser to save."
echo "---"

npx playwright codegen \
  --target javascript \
  --output "$OUTPUT_FILE" \
  "$TARGET_URL"

if [ -f "$OUTPUT_FILE" ]; then
  echo ""
  echo "Recording saved to: $OUTPUT_FILE"
  echo "To replay: node replay.js $OUTPUT_FILE"
else
  echo "No recording was saved."
fi
