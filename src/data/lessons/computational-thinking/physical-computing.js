// Lesson 1.8: Physical Computing - Comprehensive lesson content

export default {
  title: "Physical Computing: Making Things Move and Think! 🤖",
  description: "Learn how to control real-world objects with code using microcontrollers like Arduino and Raspberry Pi!",
  difficulty: "intermediate",
  estimatedTime: "75 minutes",
  
  // Learning objectives
  objectives: [
    "Understand what physical computing means and how it works",
    "Learn about microcontrollers like Arduino and Raspberry Pi",
    "Discover sensors, actuators, and electronic components",
    "Practice programming microcontrollers to control devices",
    "Build simple interactive projects that respond to the real world"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Physical Computing? 🌟</h2>
    <p><strong>Physical computing</strong> is like giving superpowers to everyday objects! It's the amazing world where computer code meets the real world. Instead of just making things happen on a screen, we can make lights blink, motors spin, and robots move - all with the power of programming!</p>
    
    <p>Physical computing is all around us:</p>
    <ul>
      <li>🚗 <strong>Smart Cars:</strong> Self-parking, collision detection, GPS navigation</li>
      <li>🏠 <strong>Smart Homes:</strong> Automatic lights, smart thermostats, security systems</li>
      <li>⌚ <strong>Wearable Tech:</strong> Fitness trackers, smartwatches, health monitors</li>
      <li>🤖 <strong>Robots:</strong> Cleaning robots, delivery drones, industrial automation</li>
      <li>🎮 <strong>Interactive Games:</strong> Motion controllers, VR headsets, dance mats</li>
      <li>🌱 <strong>Smart Gardens:</strong> Automatic watering, soil sensors, grow lights</li>
    </ul>
    
    <h2>Meet Your New Best Friends: Microcontrollers! 🧠</h2>
    
    <h3>What is a Microcontroller? 💻</h3>
    <p>A <strong>microcontroller</strong> is like a tiny computer brain that can control electronic devices. It's small, affordable, and perfect for learning! Think of it as the "brain" that tells other components what to do.</p>
    
    <h3>Arduino Uno - The Perfect Starter! 🟦</h3>
    <p>The <strong>Arduino Uno</strong> is one of the most popular microcontrollers for beginners:</p>
    <ul>
      <li><strong>Easy to Use:</strong> Simple programming language and friendly community</li>
      <li><strong>Lots of Pins:</strong> 14 digital pins and 6 analog pins for connecting components</li>
      <li><strong>USB Connection:</strong> Easy to connect to your computer for programming</li>
      <li><strong>Open Source:</strong> Free software and tons of online resources</li>
      <li><strong>Affordable:</strong> Costs less than a video game!</li>
    </ul>
    
    <h3>Raspberry Pi - The Mini Computer! 🍓</h3>
    <p>The <strong>Raspberry Pi</strong> is like a full computer shrunk down to the size of a credit card:</p>
    <ul>
      <li><strong>Full Operating System:</strong> Runs Linux, can browse the web, play videos</li>
      <li><strong>GPIO Pins:</strong> 40 pins for connecting sensors and actuators</li>
      <li><strong>Camera Support:</strong> Can connect cameras for computer vision projects</li>
      <li><strong>WiFi and Bluetooth:</strong> Built-in wireless connectivity</li>
      <li><strong>Programming Languages:</strong> Python, Scratch, JavaScript, and more</li>
    </ul>
    
    <h2>The Building Blocks: Components and Sensors! 🔧</h2>
    
    <h3>Input Devices - Sensing the World! 👁️</h3>
    
    <h4>Basic Sensors 📡</h4>
    <ul>
      <li><strong>Light Sensor (LDR):</strong> Detects how bright or dark it is</li>
      <li><strong>Temperature Sensor:</strong> Measures how hot or cold something is</li>
      <li><strong>Motion Sensor (PIR):</strong> Detects when something moves nearby</li>
      <li><strong>Sound Sensor:</strong> Listens for noise levels and sounds</li>
      <li><strong>Button/Switch:</strong> Simple on/off input from users</li>
    </ul>
    
    <h4>Advanced Sensors 🚀</h4>
    <ul>
      <li><strong>Ultrasonic Sensor:</strong> Measures distance using sound waves (like bat echolocation!)</li>
      <li><strong>Accelerometer:</strong> Detects movement and orientation changes</li>
      <li><strong>Gyroscope:</strong> Senses rotation and spinning motions</li>
      <li><strong>Camera Module:</strong> Takes pictures and videos for computer vision</li>
      <li><strong>GPS Module:</strong> Knows exactly where it is in the world</li>
    </ul>
    
    <h3>Output Devices - Making Things Happen! ⚡</h3>
    
    <h4>Visual Outputs 💡</h4>
    <ul>
      <li><strong>LEDs:</strong> Colorful lights that can blink, fade, and change colors</li>
      <li><strong>LCD/OLED Displays:</strong> Show text, numbers, and simple graphics</li>
      <li><strong>LED Strips:</strong> Long chains of colorful lights for amazing effects</li>
      <li><strong>7-Segment Displays:</strong> Show numbers like on digital clocks</li>
    </ul>
    
    <h4>Movement and Sound 🔊</h4>
    <ul>
      <li><strong>Servo Motors:</strong> Precise rotation for robot arms and steering</li>
      <li><strong>DC Motors:</strong> Continuous spinning for wheels and fans</li>
      <li><strong>Stepper Motors:</strong> Very precise movement for 3D printers</li>
      <li><strong>Buzzers/Speakers:</strong> Make beeps, music, and sound effects</li>
      <li><strong>Vibration Motors:</strong> Create haptic feedback like phone notifications</li>
    </ul>
    
    <h2>Arduino Programming - Your First Steps! 👨‍💻</h2>
    
    <h3>The Arduino IDE 💻</h3>
    <p>The <strong>Arduino IDE</strong> (Integrated Development Environment) is where we write code for Arduino:</p>
    <ul>
      <li><strong>Simple Interface:</strong> Easy-to-use editor with helpful features</li>
      <li><strong>Built-in Examples:</strong> Lots of sample code to learn from</li>
      <li><strong>Library Manager:</strong> Easy access to code libraries for sensors</li>
      <li><strong>Serial Monitor:</strong> See messages from your Arduino in real-time</li>
    </ul>
    
    <h3>Basic Arduino Code Structure 📝</h3>
    <p>Every Arduino program (called a "sketch") has two main parts:</p>
    <ul>
      <li><strong>setup():</strong> Runs once when the Arduino starts up</li>
      <li><strong>loop():</strong> Runs over and over again forever</li>
    </ul>
    
    <h2>Raspberry Pi Programming - Python Power! 🐍</h2>
    
    <h3>GPIO Programming 🔌</h3>
    <p>GPIO (General Purpose Input/Output) pins let us connect sensors and actuators:</p>
    <ul>
      <li><strong>Digital Pins:</strong> On/off signals (like switches and LEDs)</li>
      <li><strong>PWM Pins:</strong> Variable signals (like dimming lights or motor speed)</li>
      <li><strong>I2C/SPI Pins:</strong> Communication with advanced sensors</li>
    </ul>
    
    <h2>Amazing Project Ideas! 🎯</h2>
    
    <h3>Beginner Projects (Grade 7) 🌱</h3>
    <ul>
      <li><strong>Blinking LED:</strong> Your first "Hello World" of physical computing</li>
      <li><strong>Night Light:</strong> LED that turns on when it gets dark</li>
      <li><strong>Temperature Monitor:</strong> Display showing current temperature</li>
      <li><strong>Simple Alarm:</strong> Buzzer that sounds when motion is detected</li>
      <li><strong>Digital Dice:</strong> Random number generator with LED display</li>
    </ul>
    
    <h3>Intermediate Projects (Grade 8) 🚀</h3>
    <ul>
      <li><strong>Smart Plant Watering:</strong> Automatic watering based on soil moisture</li>
      <li><strong>Distance Measuring Tool:</strong> Ultrasonic sensor with LCD display</li>
      <li><strong>Color-Changing Mood Light:</strong> RGB LED that changes with music</li>
      <li><strong>Simple Robot Car:</strong> Remote-controlled vehicle with motors</li>
      <li><strong>Weather Station:</strong> Multiple sensors displaying environmental data</li>
    </ul>
    
    <h3>Advanced Projects (Grade 9) 🏆</h3>
    <ul>
      <li><strong>Home Security System:</strong> Multiple sensors with smartphone alerts</li>
      <li><strong>Gesture-Controlled Robot:</strong> Hand movements control robot actions</li>
      <li><strong>Smart Mirror:</strong> Display with weather, time, and notifications</li>
      <li><strong>IoT Garden Monitor:</strong> Web-connected plant monitoring system</li>
      <li><strong>Voice-Controlled Assistant:</strong> Simple AI that responds to voice commands</li>
    </ul>
    
    <h2>Circuit Building Basics ⚡</h2>
    
    <h3>Breadboards - Your Building Platform! 🍞</h3>
    <p>A <strong>breadboard</strong> is like a construction site for electronics:</p>
    <ul>
      <li><strong>No Soldering Needed:</strong> Just push components into holes</li>
      <li><strong>Reusable:</strong> Build, test, rebuild as many times as you want</li>
      <li><strong>Connection Rows:</strong> Holes in rows are connected electrically</li>
      <li><strong>Power Rails:</strong> Long strips for connecting power and ground</li>
    </ul>
    
    <h3>Essential Components 🔧</h3>
    <ul>
      <li><strong>Jumper Wires:</strong> Connect different parts of your circuit</li>
      <li><strong>Resistors:</strong> Control the flow of electricity (like water valves)</li>
      <li><strong>Capacitors:</strong> Store electrical energy temporarily</li>
      <li><strong>Transistors:</strong> Electronic switches that can amplify signals</li>
    </ul>
    
    <h3>Safety First! ⚠️</h3>
    <ul>
      <li><strong>Low Voltage:</strong> Arduino and Raspberry Pi use safe 3.3V and 5V</li>
      <li><strong>Check Connections:</strong> Make sure positive and negative are correct</li>
      <li><strong>Start Simple:</strong> Begin with basic circuits before adding complexity</li>
      <li><strong>Ask for Help:</strong> Always have an adult help with electrical projects</li>
    </ul>
    
    <h2>Communication and Connectivity 📡</h2>
    
    <h3>Wired Communication 🔌</h3>
    <ul>
      <li><strong>Serial Communication:</strong> Send data between devices using USB</li>
      <li><strong>I2C Protocol:</strong> Connect multiple sensors with just two wires</li>
      <li><strong>SPI Protocol:</strong> Fast communication for displays and sensors</li>
    </ul>
    
    <h3>Wireless Communication 📶</h3>
    <ul>
      <li><strong>WiFi Modules:</strong> Connect to the internet and control remotely</li>
      <li><strong>Bluetooth:</strong> Short-range communication with phones and tablets</li>
      <li><strong>Radio Modules:</strong> Long-range communication between devices</li>
      <li><strong>LoRa:</strong> Very long-range, low-power communication</li>
    </ul>
    
    <h2>Internet of Things (IoT) 🌐</h2>
    
    <h3>What is IoT? 🤔</h3>
    <p>The <strong>Internet of Things</strong> connects everyday objects to the internet, making them "smart":</p>
    <ul>
      <li><strong>Remote Monitoring:</strong> Check your projects from anywhere in the world</li>
      <li><strong>Data Collection:</strong> Gather information over time for analysis</li>
      <li><strong>Automation:</strong> Devices that respond to conditions automatically</li>
      <li><strong>Integration:</strong> Different devices working together as a system</li>
    </ul>
    
    <h3>IoT Platforms 🏗️</h3>
    <ul>
      <li><strong>Arduino IoT Cloud:</strong> Easy cloud platform for Arduino projects</li>
      <li><strong>Raspberry Pi Connect:</strong> Remote access to your Pi projects</li>
      <li><strong>ThingSpeak:</strong> Collect and analyze sensor data online</li>
      <li><strong>Blynk:</strong> Create mobile apps to control your projects</li>
    </ul>
    
    <h2>Artificial Intelligence in Physical Computing 🧠</h2>
    
    <h3>Machine Learning on the Edge 🤖</h3>
    <ul>
      <li><strong>TinyML:</strong> Machine learning on small microcontrollers</li>
      <li><strong>Computer Vision:</strong> Teaching devices to "see" and recognize objects</li>
      <li><strong>Voice Recognition:</strong> Devices that understand spoken commands</li>
      <li><strong>Predictive Maintenance:</strong> AI that predicts when things need fixing</li>
    </ul>
    
    <h2>Career Connections 💼</h2>
    
    <h3>Jobs in Physical Computing 👨‍💼</h3>
    <ul>
      <li><strong>Embedded Systems Engineer:</strong> Design smart devices and IoT products</li>
      <li><strong>Robotics Engineer:</strong> Build and program robots for various industries</li>
      <li><strong>IoT Developer:</strong> Create connected devices and smart systems</li>
      <li><strong>Hardware Designer:</strong> Design circuit boards and electronic systems</li>
      <li><strong>Automation Engineer:</strong> Make factories and processes more efficient</li>
    </ul>
    
    <h2>Environmental Impact and Sustainability 🌍</h2>
    
    <h3>Green Technology 🌱</h3>
    <ul>
      <li><strong>Energy Monitoring:</strong> Track and reduce power consumption</li>
      <li><strong>Smart Agriculture:</strong> Optimize water and fertilizer use</li>
      <li><strong>Environmental Sensing:</strong> Monitor air quality and pollution</li>
      <li><strong>Renewable Energy:</strong> Smart solar panels and wind turbines</li>
    </ul>
  `,
  
  // Interactive examples and activities
  examples: [
    {
      title: "Arduino Simulator - LED Control 💡",
      type: "interactive",
      component: "ArduinoSimulator",
      description: "Learn Arduino programming by controlling LEDs, sensors, and motors in a virtual environment.",
      components: [
        {
          type: "microcontroller",
          name: "Arduino Uno",
          description: "The main brain of your project",
          pins: {
            digital: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            analog: ["A0", "A1", "A2", "A3", "A4", "A5"],
            power: ["5V", "3.3V", "GND"]
          }
        },
        {
          type: "output",
          name: "LED",
          description: "Light Emitting Diode - shows visual output",
          properties: {
            colors: ["red", "green", "blue", "yellow", "white"],
            voltage: "2-3V",
            current: "20mA"
          }
        },
        {
          type: "input",
          name: "Push Button",
          description: "Detects when pressed",
          properties: {
            states: ["pressed", "released"],
            debounce: "required"
          }
        },
        {
          type: "sensor",
          name: "Temperature Sensor (LM35)",
          description: "Measures temperature in Celsius",
          properties: {
            range: "-55°C to 150°C",
            accuracy: "±0.5°C",
            output: "analog voltage"
          }
        },
        {
          type: "sensor",
          name: "Ultrasonic Sensor (HC-SR04)",
          description: "Measures distance using sound waves",
          properties: {
            range: "2cm to 400cm",
            accuracy: "±3mm",
            pins: ["VCC", "Trig", "Echo", "GND"]
          }
        },
        {
          type: "actuator",
          name: "Servo Motor",
          description: "Precise rotational control",
          properties: {
            rotation: "0° to 180°",
            control: "PWM signal",
            torque: "1.8 kg⋅cm"
          }
        },
        {
          type: "display",
          name: "LCD Display (16x2)",
          description: "Shows text information",
          properties: {
            size: "16 characters × 2 lines",
            interface: "I2C or parallel",
            backlight: "optional"
          }
        }
      ],
      projects: [
        {
          name: "Blinking LED",
          difficulty: "beginner",
          description: "Make an LED blink on and off",
          code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
          wiring: [
            "Connect LED positive leg to pin 13",
            "Connect LED negative leg to GND through 220Ω resistor"
          ]
        },
        {
          name: "Button Controlled LED",
          difficulty: "intermediate",
          description: "Control LED with a push button",
          code: `int buttonPin = 2;
int ledPin = 13;
int buttonState = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
          wiring: [
            "Connect button to pin 2 and GND",
            "Connect LED to pin 13 with resistor"
          ]
        },
        {
          name: "Temperature Monitor",
          difficulty: "advanced",
          description: "Read temperature and display on LCD",
          code: `#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
int tempPin = A0;

void setup() {
  lcd.begin(16, 2);
  lcd.print(\"Temperature:\");
}

void loop() {
  int reading = analogRead(tempPin);
  float voltage = reading * 5.0 / 1024.0;
  float temperature = voltage * 100.0;
  
  lcd.setCursor(0, 1);
  lcd.print(temperature);
  lcd.print(\" C\");
  delay(1000);
}`,
          wiring: [
            "Connect LM35 to A0, 5V, and GND",
            "Connect LCD using standard 6-pin configuration"
          ]
        }
      ]
    },
    {
      title: "Blinking LED - Your First Arduino Project! 💡",
      description: "The classic 'Hello World' of physical computing",
      code: `// Blinking LED - Arduino Code
// This makes an LED blink on and off every second

// Pin 13 has an LED connected on most Arduino boards
int ledPin = 13;

void setup() {
  // Initialize the digital pin as an output
  pinMode(ledPin, OUTPUT);
  
  // Start serial communication for debugging
  Serial.begin(9600);
  Serial.println("LED Blink Program Started!");
}

void loop() {
  // Turn the LED on
  digitalWrite(ledPin, HIGH);
  Serial.println("LED ON");
  
  // Wait for 1 second (1000 milliseconds)
  delay(1000);
  
  // Turn the LED off
  digitalWrite(ledPin, LOW);
  Serial.println("LED OFF");
  
  // Wait for 1 second
  delay(1000);
}

// Challenge: Try changing the delay times!
// - Make it blink faster (delay(100))
// - Make it blink slower (delay(2000))
// - Create a pattern (short-short-long blinks)`,
      language: "cpp"
    },
    {
      title: "Smart Night Light with Light Sensor 🌙",
      description: "LED that automatically turns on when it gets dark",
      code: `// Smart Night Light - Arduino Code
// Uses a light sensor to automatically control an LED

int lightSensorPin = A0;  // Analog pin for light sensor
int ledPin = 9;           // PWM pin for LED
int threshold = 300;      // Light level threshold

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Smart Night Light Started!");
}

void loop() {
  // Read the light sensor value (0-1023)
  int lightLevel = analogRead(lightSensorPin);
  
  // Print the light level for debugging
  Serial.print("Light Level: ");
  Serial.println(lightLevel);
  
  // If it's dark (low light level)
  if (lightLevel < threshold) {
    // Turn LED on (brightness based on darkness)
    int brightness = map(lightLevel, 0, threshold, 255, 0);
    analogWrite(ledPin, brightness);
    Serial.println("Night light ON");
  } else {
    // Turn LED off during daylight
    analogWrite(ledPin, 0);
    Serial.println("Night light OFF");
  }
  
  delay(500);  // Check every half second
}

// How it works:
// 1. Light sensor gives higher values in bright light
// 2. When light level drops below threshold, LED turns on
// 3. LED brightness increases as it gets darker
// 4. Perfect for automatic room lighting!`,
      language: "cpp"
    },
    {
      title: "Distance Measuring with Ultrasonic Sensor 📏",
      description: "Measure distance like a robot's eyes!",
      code: `// Ultrasonic Distance Sensor - Arduino Code
// Measures distance using sound waves (like echolocation)

// Pin connections
int trigPin = 7;    // Trigger pin sends sound pulse
int echoPin = 8;    // Echo pin receives sound reflection
int buzzerPin = 3;  // Buzzer for audio feedback

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  
  Serial.begin(9600);
  Serial.println("Ultrasonic Distance Sensor Ready!");
}

void loop() {
  // Measure distance
  long distance = measureDistance();
  
  // Display distance
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  // Audio feedback based on distance
  if (distance < 10) {
    // Very close - fast beeping
    tone(buzzerPin, 1000, 100);
    delay(150);
  } else if (distance < 30) {
    // Close - medium beeping
    tone(buzzerPin, 800, 200);
    delay(400);
  } else if (distance < 100) {
    // Far - slow beeping
    tone(buzzerPin, 600, 300);
    delay(800);
  }
  // No sound if very far away
  
  delay(100);
}

long measureDistance() {
  // Send ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Measure echo time
  long duration = pulseIn(echoPin, HIGH);
  
  // Calculate distance (sound travels at 343 m/s)
  long distance = duration * 0.034 / 2;
  
  return distance;
}

// Applications:
// - Parking sensors in cars
// - Robot navigation
// - Automatic doors
// - Level measurement in tanks`,
      language: "cpp"
    },
    {
      title: "Raspberry Pi LED Control with Python 🐍",
      description: "Control LEDs using Python on Raspberry Pi",
      code: `# Raspberry Pi LED Control - Python Code
# Control multiple LEDs with different patterns

import RPi.GPIO as GPIO
import time
import random

# Set up GPIO pins
led_pins = [18, 19, 20, 21]  # GPIO pins for LEDs
button_pin = 2               # GPIO pin for button

# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(led_pins, GPIO.OUT)
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("Raspberry Pi LED Controller Started!")
print("Press the button to change patterns")

def all_off():
    """Turn all LEDs off"""
    for pin in led_pins:
        GPIO.output(pin, GPIO.LOW)

def knight_rider():
    """Knight Rider style LED sweep"""
    # Forward sweep
    for pin in led_pins:
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(pin, GPIO.LOW)
    
    # Backward sweep
    for pin in reversed(led_pins):
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(pin, GPIO.LOW)

def random_blink():
    """Random LED blinking pattern"""
    all_off()
    random_pin = random.choice(led_pins)
    GPIO.output(random_pin, GPIO.HIGH)
    time.sleep(0.2)
    GPIO.output(random_pin, GPIO.LOW)
    time.sleep(0.1)

def binary_counter():
    """Display binary numbers on LEDs"""
    for i in range(16):  # 0 to 15 in binary
        all_off()
        # Convert number to binary and display on LEDs
        for bit in range(4):
            if i & (1 << bit):
                GPIO.output(led_pins[bit], GPIO.HIGH)
        time.sleep(0.5)

# Pattern list
patterns = [knight_rider, random_blink, binary_counter]
current_pattern = 0

try:
    while True:
        # Check if button is pressed
        if GPIO.input(button_pin) == GPIO.LOW:
            current_pattern = (current_pattern + 1) % len(patterns)
            print(f"Switched to pattern {current_pattern + 1}")
            time.sleep(0.3)  # Debounce delay
        
        # Run current pattern
        patterns[current_pattern]()
        
except KeyboardInterrupt:
    print("\nProgram stopped by user")
    all_off()
    GPIO.cleanup()

# Features:
# - Multiple LED patterns
# - Button input for pattern switching
# - Clean GPIO cleanup on exit
# - Easy to add new patterns!`,
      language: "python"
    }
  ],
  
  // Practice exercises
  practiceExercises: [
    {
      title: "Design Your Smart Room 🏠",
      description: "Plan a smart room system with multiple sensors and outputs",
      difficulty: "beginner",
      hints: [
        "Think about what you'd want to automate in your bedroom",
        "Consider sensors: light, temperature, motion, sound",
        "Plan outputs: lights, fan, music, displays",
        "Draw a simple diagram of your system"
      ]
    },
    {
      title: "Build a Simple Alarm System 🚨",
      description: "Create a motion-activated alarm with LED and buzzer",
      difficulty: "intermediate",
      hints: [
        "Use a PIR motion sensor for detection",
        "Add a delay before triggering the alarm",
        "Include a way to turn the alarm off",
        "Make the LED blink and buzzer beep in patterns"
      ]
    },
    {
      title: "Weather Station Project 🌤️",
      description: "Build a device that measures and displays weather data",
      difficulty: "intermediate",
      hints: [
        "Combine temperature, humidity, and light sensors",
        "Display data on an LCD screen",
        "Add data logging to track changes over time",
        "Consider adding wireless connectivity"
      ]
    },
    {
      title: "Robot Pet Simulator 🐕",
      description: "Create a virtual pet that responds to interaction",
      difficulty: "advanced",
      hints: [
        "Use multiple sensors for different interactions",
        "Program different 'moods' and behaviors",
        "Add sound effects and LED expressions",
        "Include feeding, playing, and sleeping modes"
      ]
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      question: "What is the main difference between Arduino and Raspberry Pi?",
      type: "multiple-choice",
      options: [
        "Arduino is a microcontroller, Raspberry Pi is a mini computer",
        "Arduino is more expensive than Raspberry Pi",
        "Arduino can only control LEDs, Raspberry Pi can control motors",
        "There is no difference between them"
      ],
      correct: 0,
      explanation: "Arduino is a microcontroller focused on controlling hardware, while Raspberry Pi is a full computer that can run an operating system."
    },
    {
      question: "Which sensor would be best for detecting when someone enters a room?",
      type: "multiple-choice",
      options: [
        "Temperature sensor",
        "Light sensor",
        "PIR motion sensor",
        "Sound sensor"
      ],
      correct: 2,
      explanation: "PIR (Passive Infrared) motion sensors are specifically designed to detect movement and are perfect for detecting when people enter rooms."
    },
    {
      question: "What does GPIO stand for in Raspberry Pi?",
      type: "multiple-choice",
      options: [
        "General Purpose Input/Output",
        "Graphics Processing Input/Output",
        "Global Positioning Input/Output",
        "Game Programming Input/Output"
      ],
      correct: 0,
      explanation: "GPIO stands for General Purpose Input/Output - these are the pins used to connect sensors and actuators to the Raspberry Pi."
    },
    {
      question: "True or False: Physical computing projects can connect to the internet.",
      type: "true-false",
      correct: true,
      explanation: "True! Many physical computing projects can connect to the internet using WiFi modules, creating IoT (Internet of Things) devices."
    }
  ],
  
  // Vocabulary terms
  vocabulary: [
    {
      term: "Physical Computing",
      definition: "Using computer programming to control real-world objects and devices through sensors and actuators."
    },
    {
      term: "Microcontroller",
      definition: "A small computer chip that can control electronic devices and sensors (like Arduino)."
    },
    {
      term: "Sensor",
      definition: "A device that detects and measures physical properties like light, temperature, or motion."
    },
    {
      term: "Actuator",
      definition: "A device that creates movement or action, like motors, LEDs, or speakers."
    },
    {
      term: "GPIO",
      definition: "General Purpose Input/Output pins used to connect sensors and actuators to computers."
    },
    {
      term: "Arduino",
      definition: "A popular, beginner-friendly microcontroller platform for physical computing projects."
    },
    {
      term: "Raspberry Pi",
      definition: "A small, affordable computer that can run a full operating system and control hardware."
    },
    {
      term: "Breadboard",
      definition: "A reusable platform for building electronic circuits without soldering."
    },
    {
      term: "IoT (Internet of Things)",
      definition: "Connecting everyday objects to the internet to make them 'smart' and controllable remotely."
    },
    {
      term: "PWM (Pulse Width Modulation)",
      definition: "A technique for controlling the power sent to devices, like dimming LEDs or controlling motor speed."
    }
  ],
  
  // Prerequisites
  prerequisites: [
    "Basic understanding of programming concepts",
    "Familiarity with simple electronics (batteries, wires, switches)",
    "Basic problem-solving and logical thinking skills",
    "Interest in building and creating physical projects"
  ],
  
  // Next steps
  nextSteps: [
    "Get an Arduino or Raspberry Pi starter kit to begin hands-on learning",
    "Practice with online simulators like Tinkercad Circuits",
    "Join maker spaces or robotics clubs in your community",
    "Learn basic electronics and circuit building",
    "Explore advanced topics like IoT, machine learning, and robotics",
    "Build increasingly complex projects to develop your skills",
    "Share your projects online and learn from the maker community"
  ]
};