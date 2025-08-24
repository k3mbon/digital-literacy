#!/usr/bin/env python3
"""
Arduino Simulator Backend Service
Provides heavy computation services for realistic Arduino simulation
"""

import json
import time
import math
import random
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

class ArduinoSimulator:
    def __init__(self):
        self.pin_states = {}
        self.sensor_data = {}
        self.simulation_running = False
        
    def simulate_sensor_reading(self, sensor_type, pin):
        """Simulate realistic sensor readings with physics-based calculations"""
        current_time = time.time()
        
        if sensor_type == 'temperature':
            # Simulate temperature with realistic fluctuations
            base_temp = 25.0  # 25°C base temperature
            noise = random.uniform(-2.0, 2.0)
            seasonal_variation = 5 * math.sin(current_time / 86400)  # Daily variation
            return int((base_temp + noise + seasonal_variation) * 10)  # Convert to ADC value
            
        elif sensor_type == 'photoresistor':
            # Simulate light sensor with day/night cycle
            hour_of_day = (current_time % 86400) / 3600
            if 6 <= hour_of_day <= 18:  # Daytime
                base_light = 800 + random.uniform(-100, 100)
            else:  # Nighttime
                base_light = 200 + random.uniform(-50, 50)
            return int(max(0, min(1023, base_light)))
            
        elif sensor_type == 'ultrasonic':
            # Simulate distance sensor with realistic physics
            base_distance = 20  # 20cm base distance
            noise = random.uniform(-2, 2)
            return int(max(2, min(400, base_distance + noise)))
            
        elif sensor_type == 'potentiometer':
            # Simulate potentiometer with smooth transitions
            if pin not in self.sensor_data:
                self.sensor_data[pin] = random.randint(0, 1023)
            
            # Gradual changes to simulate user interaction
            change = random.randint(-10, 10)
            self.sensor_data[pin] = max(0, min(1023, self.sensor_data[pin] + change))
            return self.sensor_data[pin]
            
        else:
            return random.randint(0, 1023)
    
    def process_arduino_code(self, code):
        """Process Arduino code and return execution results"""
        results = {
            'pin_states': {},
            'serial_output': [],
            'execution_time': 0,
            'errors': []
        }
        
        start_time = time.time()
        
        try:
            lines = code.split('\n')
            for line_num, line in enumerate(lines, 1):
                line = line.strip().lower()
                
                # Process digitalWrite commands
                if 'digitalwrite' in line:
                    parts = line.replace('digitalwrite(', '').replace(')', '').split(',')
                    if len(parts) == 2:
                        pin = int(parts[0].strip())
                        state = parts[1].strip() == 'high'
                        results['pin_states'][pin] = state
                        
                # Process analogRead commands
                elif 'analogread' in line:
                    pin_match = line.replace('analogread(', '').replace(')', '')
                    if pin_match.startswith('a'):
                        pin = int(pin_match[1:])
                    else:
                        pin = int(pin_match)
                    
                    # Simulate sensor reading based on connected component
                    sensor_value = self.simulate_sensor_reading('temperature', pin)
                    results['serial_output'].append(f"Analog pin A{pin}: {sensor_value}")
                    
                # Process Serial.print commands
                elif 'serial.print' in line:
                    if '"' in line:
                        message = line.split('"')[1]
                        results['serial_output'].append(message)
                        
        except Exception as e:
            results['errors'].append(f"Error processing code: {str(e)}")
            
        results['execution_time'] = time.time() - start_time
        return results

simulator = ArduinoSimulator()

@app.route('/api/simulate', methods=['POST'])
def simulate_arduino():
    """Main simulation endpoint"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        components = data.get('components', [])
        connections = data.get('connections', [])
        
        # Process the Arduino code
        results = simulator.process_arduino_code(code)
        
        # Add component-specific simulations
        for component in components:
            if component['type'] in ['temperature', 'photoresistor', 'ultrasonic', 'potentiometer']:
                pin = component.get('pin', 0)
                sensor_value = simulator.simulate_sensor_reading(component['type'], pin)
                results['sensor_readings'] = results.get('sensor_readings', {})
                results['sensor_readings'][component['id']] = sensor_value
        
        return jsonify({
            'success': True,
            'results': results
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/sensor/<sensor_type>/<int:pin>', methods=['GET'])
def get_sensor_reading(sensor_type, pin):
    """Get real-time sensor reading"""
    try:
        value = simulator.simulate_sensor_reading(sensor_type, pin)
        return jsonify({
            'success': True,
            'sensor_type': sensor_type,
            'pin': pin,
            'value': value,
            'timestamp': time.time()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': time.time(),
        'simulator_running': simulator.simulation_running
    })

if __name__ == '__main__':
    print("🚀 Arduino Simulator Backend Service Starting...")
    print("📡 Server will run on http://localhost:5000")
    print("🔧 Ready to process Arduino simulations!")
    app.run(host='0.0.0.0', port=5000, debug=True)