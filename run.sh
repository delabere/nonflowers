#!/bin/bash

# Start the Python HTTP server in the background
python -m http.server &
SERVER_PID=$!

# Sleep for a short while to ensure the server starts properly
sleep 2

# Run the first Python script
python run.py test.png

# Run the second Python script
# python image.py

# Kill the Python HTTP server
kill $SERVER_PID

echo "All tasks completed and server stopped."
