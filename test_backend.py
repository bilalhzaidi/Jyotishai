#!/usr/bin/env python3
"""Quick test to check if FastAPI backend can start"""

import sys
import os

# Add project root to path
sys.path.insert(0, '/root/jyotishai-saas')

try:
    from fastapi import FastAPI
    print("✓ FastAPI imported successfully")
except ImportError as e:
    print(f"✗ FastAPI import failed: {e}")
    sys.exit(1)

try:
    import uvicorn
    print("✓ Uvicorn imported successfully")
except ImportError as e:
    print(f"✗ Uvicorn import failed: {e}")
    sys.exit(1)

# Create a simple test app
app = FastAPI(title="Test")

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    print("\n🚀 Starting test server on http://localhost:8001/health")
    print("Press Ctrl+C to stop\n")
    uvicorn.run(app, host="0.0.0.0", port=8001)