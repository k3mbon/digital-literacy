# Arduino Simulator Backend Service

A Python-based backend service that provides realistic Arduino simulation capabilities with physics-based sensor readings and code processing.

## Features

- **Realistic Sensor Simulation**: Physics-based calculations for temperature, light, distance, and potentiometer sensors
- **Arduino Code Processing**: Parses and executes Arduino C++ code with realistic timing
- **Real-time Data**: Provides live sensor readings with natural fluctuations
- **RESTful API**: Easy integration with frontend applications
- **Cross-Origin Support**: CORS enabled for web application integration

## Installation

1. Install Python 3.8 or higher
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Start the backend service:
   ```bash
   python arduino_simulator.py
   ```

2. The service will run on `http://localhost:5000`

## API Endpoints

### POST /api/simulate
Process Arduino code and return simulation results.

**Request Body:**
```json
{
  "code": "Arduino C++ code",
  "components": [/* component array */],
  "connections": [/* connection array */]
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "pin_states": {},
    "serial_output": [],
    "execution_time": 0.001,
    "sensor_readings": {}
  }
}
```

### GET /api/sensor/{sensor_type}/{pin}
Get real-time sensor reading.

**Response:**
```json
{
  "success": true,
  "sensor_type": "temperature",
  "pin": 0,
  "value": 250,
  "timestamp": 1234567890.123
}
```

### GET /api/health
Health check endpoint.

## Supported Sensors

- **Temperature**: Realistic temperature readings with daily variations
- **Photoresistor**: Light sensor with day/night cycle simulation
- **Ultrasonic**: Distance sensor with physics-based calculations
- **Potentiometer**: Smooth value transitions simulating user interaction

## Performance

- Optimized for low latency responses
- Efficient memory usage
- Scalable architecture for multiple concurrent simulations