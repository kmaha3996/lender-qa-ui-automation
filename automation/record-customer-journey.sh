#!/bin/bash
# Record the "customer-journey" flow via Playwright codegen.
# Close the browser when done — the script is saved to recordings/.

RECORDING_DIR="recordings"
FLOW="customer-journey"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="${RECORDING_DIR}/${FLOW}_${TIMESTAMP}.js"
START_URL="${TARGET_URL:-https://example.com/}"

mkdir -p "$RECORDING_DIR"

echo "Ensuring Playwright browsers are installed..."
npx --yes playwright install chromium

echo "Starting Playwright recorder..."
echo "Flow:   $FLOW"
echo "Target: $START_URL"
echo "Output: $OUTPUT_FILE"
echo ""
echo "A browser will open. Perform your actions, then close the browser to save."
echo "---"

npx playwright codegen \
  --target javascript \
  --output "$OUTPUT_FILE" \
  "$START_URL"

if [ -f "$OUTPUT_FILE" ]; then
  echo ""
  echo "Recording saved to: $OUTPUT_FILE"
  echo "To replay: node ../automation/replay.js $OUTPUT_FILE"
else
  echo "No recording was saved."
fi
