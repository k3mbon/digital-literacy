// Lesson 1.5: Data in Text-Based Programs - Comprehensive lesson content

export default {
  title: "Data in Text-Based Programs: Making Information Come Alive! 📊",
  description: "Learn how to work with different types of data in your programs, from simple numbers to complex information!",
  difficulty: "intermediate",
  estimatedTime: "70 minutes",
  
  // Learning objectives
  objectives: [
    "Understand what data is and why it's important in programming",
    "Learn about different types of data (numbers, text, true/false)",
    "Discover how to store and organize data using variables and collections",
    "Practice getting data from users and files",
    "Explore how to process, analyze, and save data in your programs"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Data in Programming? 💾</h2>
    <p><strong>Data</strong> is information that your programs can work with! Just like how you organize your school supplies, programs need to organize and work with different types of information. Data is everywhere around us!</p>
    
    <p>Examples of data in everyday apps:</p>
    <ul>
      <li>📱 <strong>Social Media:</strong> Posts, likes, comments, friend lists</li>
      <li>🎮 <strong>Games:</strong> Player scores, character stats, game progress</li>
      <li>🛒 <strong>Online Shopping:</strong> Product prices, customer reviews, order history</li>
      <li>📚 <strong>School:</strong> Student grades, attendance records, class schedules</li>
      <li>🌤️ <strong>Weather Apps:</strong> Temperature, humidity, forecast predictions</li>
      <li>🎵 <strong>Music Streaming:</strong> Song titles, artists, playlists, listening history</li>
    </ul>
    
    <h2>Types of Data 🎯</h2>
    
    <h3>Basic Data Types 🔤</h3>
    
    <h4>Numbers (Integers and Floats) 🔢</h4>
    <p>Numbers are used for calculations, counting, and measurements:</p>
    <ul>
      <li><strong>Integers:</strong> Whole numbers like 5, -3, 0, 100</li>
      <li><strong>Floats:</strong> Decimal numbers like 3.14, -2.5, 0.001</li>
      <li><strong>Examples:</strong> Age (17), temperature (23.5°C), score (95)</li>
    </ul>
    
    <h4>Text (Strings) 📝</h4>
    <p>Text data represents words, sentences, and any sequence of characters:</p>
    <ul>
      <li><strong>Examples:</strong> Names ("Sarah"), messages ("Hello World!"), addresses</li>
      <li><strong>Special characters:</strong> Emojis, punctuation, spaces all count as text</li>
      <li><strong>Empty strings:</strong> Sometimes you have text with nothing in it ("")</li>
    </ul>
    
    <h4>True/False (Booleans) ✅❌</h4>
    <p>Boolean data represents yes/no, on/off, true/false situations:</p>
    <ul>
      <li><strong>Examples:</strong> Is logged in? (True), Has homework? (False)</li>
      <li><strong>Used for:</strong> Decisions, conditions, flags, switches</li>
      <li><strong>Only two values:</strong> True or False (sometimes 1 or 0)</li>
    </ul>
    
    <h3>Collection Data Types 📦</h3>
    
    <h4>Lists/Arrays 📋</h4>
    <p>Lists store multiple items in order, like a shopping list or playlist:</p>
    <ul>
      <li><strong>Example:</strong> ["apple", "banana", "orange"] or [85, 92, 78, 96]</li>
      <li><strong>Ordered:</strong> Items have positions (first, second, third...)</li>
      <li><strong>Changeable:</strong> You can add, remove, or modify items</li>
      <li><strong>Mixed types:</strong> Can contain different types of data</li>
    </ul>
    
    <h4>Dictionaries/Objects 🗂️</h4>
    <p>Dictionaries store information with labels, like a contact card:</p>
    <ul>
      <li><strong>Example:</strong> {"name": "Alex", "age": 16, "grade": "A"}</li>
      <li><strong>Key-value pairs:</strong> Each piece of data has a label (key) and value</li>
      <li><strong>Flexible:</strong> Easy to add new information or update existing data</li>
      <li><strong>Organized:</strong> Perfect for representing real-world objects</li>
    </ul>
    
    <h2>Variables: Storing Your Data 📥</h2>
    
    <h3>What are Variables? 🏷️</h3>
    <p>Variables are like labeled boxes where you store your data. You give them names so you can find and use the data later!</p>
    
    <h3>Variable Naming Rules 📝</h3>
    <ul>
      <li><strong>Descriptive names:</strong> Use names that explain what the data is</li>
      <li><strong>No spaces:</strong> Use underscores or camelCase instead</li>
      <li><strong>Start with letter:</strong> Variable names should begin with a letter</li>
      <li><strong>Case sensitive:</strong> "Name" and "name" are different variables</li>
      <li><strong>Good examples:</strong> student_name, totalScore, isComplete</li>
      <li><strong>Bad examples:</strong> x, data1, temp, a</li>
    </ul>
    
    <h2>Getting Data Into Your Program 📥</h2>
    
    <h3>User Input 👤</h3>
    <p>Getting information directly from the person using your program:</p>
    <pre><code>// Getting user input
name = input("What's your name? ")
age = int(input("How old are you? "))
favorite_color = input("What's your favorite color? ")

print(f"Hi {name}! You are {age} years old and love {favorite_color}!")</code></pre>
    
    <h3>Reading from Files 📁</h3>
    <p>Loading data that's already saved in files on your computer:</p>
    <pre><code>// Reading from a text file
with open("student_grades.txt", "r") as file:
    grades = file.readlines()
    for grade in grades:
        print(f"Student grade: {grade.strip()}")</code></pre>
    
    <h3>Web APIs and Online Data 🌐</h3>
    <p>Getting live data from the internet, like weather or news:</p>
    <pre><code>// Getting weather data (simplified example)
import requests

response = requests.get("https://api.weather.com/current")
weather_data = response.json()
temperature = weather_data["temperature"]
print(f"Current temperature: {temperature}°C")</code></pre>
    
    <h2>Processing and Manipulating Data 🔄</h2>
    
    <h3>Data Cleaning 🧹</h3>
    <p>Real-world data is often messy and needs to be cleaned up:</p>
    <ul>
      <li><strong>Remove extra spaces:</strong> "  hello  " becomes "hello"</li>
      <li><strong>Fix capitalization:</strong> "jOhN" becomes "John"</li>
      <li><strong>Handle missing data:</strong> What to do when information is missing</li>
      <li><strong>Remove duplicates:</strong> Eliminate repeated information</li>
      <li><strong>Validate data:</strong> Check if email addresses, phone numbers are valid</li>
    </ul>
    
    <h3>Data Transformation 🔄</h3>
    <p>Converting data from one format to another:</p>
    <ul>
      <li><strong>Type conversion:</strong> "25" (text) to 25 (number)</li>
      <li><strong>Unit conversion:</strong> Celsius to Fahrenheit, meters to feet</li>
      <li><strong>Format changes:</strong> "2024-01-15" to "January 15, 2024"</li>
      <li><strong>Calculations:</strong> Computing averages, totals, percentages</li>
      <li><strong>Combining data:</strong> Merging first and last names</li>
    </ul>
    
    <h3>Searching and Filtering 🔍</h3>
    <p>Finding specific information in your data:</p>
    <ul>
      <li><strong>Find specific items:</strong> Students with grade A</li>
      <li><strong>Filter by criteria:</strong> Products under $50</li>
      <li><strong>Search by keywords:</strong> Books containing "adventure"</li>
      <li><strong>Range filtering:</strong> Temperatures between 20-30°C</li>
      <li><strong>Complex queries:</strong> Students in grade 9 with A average</li>
    </ul>
    
    <h2>Data Structures for Organization 🏗️</h2>
    
    <h3>Simple Structures 📊</h3>
    
    <h4>Lists for Sequences 📋</h4>
    <p>Perfect for ordered data like rankings, steps, or timelines:</p>
    <pre><code>// Student test scores in order
test_scores = [85, 92, 78, 96, 88]
top_movies = ["Avengers", "Star Wars", "Harry Potter"]
daily_temperatures = [22.5, 25.1, 23.8, 26.2]</code></pre>
    
    <h4>Dictionaries for Records 🗂️</h4>
    <p>Great for storing related information about one thing:</p>
    <pre><code>// Student information
student = {
    "name": "Emma Watson",
    "age": 16,
    "grade": 11,
    "subjects": ["Math", "Science", "English"],
    "gpa": 3.8
}</code></pre>
    
    <h3>Complex Structures 🏢</h3>
    
    <h4>Lists of Dictionaries 📚</h4>
    <p>Perfect for storing multiple records, like a class roster:</p>
    <pre><code>// Class roster
students = [
    {"name": "Alice", "grade": 95, "subject": "Math"},
    {"name": "Bob", "grade": 87, "subject": "Science"},
    {"name": "Carol", "grade": 92, "subject": "English"}
]</code></pre>
    
    <h4>Nested Data Structures 🪆</h4>
    <p>Complex data with multiple levels, like a school database:</p>
    <pre><code>// School data structure
school = {
    "name": "Riverside High",
    "grades": {
        "9": {"students": 150, "teachers": 8},
        "10": {"students": 145, "teachers": 8},
        "11": {"students": 140, "teachers": 7}
    }
}</code></pre>
    
    <h2>Data Analysis and Statistics 📈</h2>
    
    <h3>Basic Statistics 🧮</h3>
    <p>Understanding your data through numbers:</p>
    <ul>
      <li><strong>Average (Mean):</strong> Add all values and divide by count</li>
      <li><strong>Median:</strong> The middle value when sorted</li>
      <li><strong>Mode:</strong> The most frequently occurring value</li>
      <li><strong>Range:</strong> Difference between highest and lowest values</li>
      <li><strong>Count:</strong> How many items you have</li>
    </ul>
    
    <h3>Data Visualization 📊</h3>
    <p>Making your data easy to understand with charts and graphs:</p>
    <ul>
      <li><strong>Bar charts:</strong> Comparing different categories</li>
      <li><strong>Line graphs:</strong> Showing changes over time</li>
      <li><strong>Pie charts:</strong> Showing parts of a whole</li>
      <li><strong>Scatter plots:</strong> Finding relationships between two variables</li>
      <li><strong>Histograms:</strong> Showing distribution of values</li>
    </ul>
    
    <h2>Saving and Storing Data 💾</h2>
    
    <h3>File Formats 📄</h3>
    
    <h4>Text Files (.txt) 📝</h4>
    <p>Simple files for basic text data:</p>
    <pre><code>// Writing to a text file
with open("notes.txt", "w") as file:
    file.write("Today I learned about data types!\n")
    file.write("Variables are like labeled boxes.\n")</code></pre>
    
    <h4>CSV Files (.csv) 📊</h4>
    <p>Perfect for spreadsheet-like data with rows and columns:</p>
    <pre><code>// CSV format example
Name,Age,Grade,Subject
Alice,16,A,Math
Bob,15,B+,Science
Carol,16,A-,English</code></pre>
    
    <h4>JSON Files (.json) 🗂️</h4>
    <p>Great for complex, structured data:</p>
    <pre><code>// JSON format example
{
  "students": [
    {"name": "Alice", "age": 16, "grades": {"math": 95, "science": 88}},
    {"name": "Bob", "age": 15, "grades": {"math": 82, "science": 91}}
  ]
}</code></pre>
    
    <h3>Database Basics 🗄️</h3>
    <p>For large amounts of data that need to be organized and searched efficiently:</p>
    <ul>
      <li><strong>Tables:</strong> Data organized in rows and columns</li>
      <li><strong>Relationships:</strong> How different pieces of data connect</li>
      <li><strong>Queries:</strong> Asking questions about your data</li>
      <li><strong>Backup:</strong> Keeping copies of important data safe</li>
    </ul>
    
    <h2>Real-World Applications 🌍</h2>
    
    <h3>Educational Projects 📚</h3>
    <ul>
      <li><strong>Grade tracker:</strong> Monitor your academic progress</li>
      <li><strong>Study planner:</strong> Organize assignments and deadlines</li>
      <li><strong>Quiz maker:</strong> Create interactive learning tools</li>
      <li><strong>Class survey analyzer:</strong> Understand student opinions</li>
      <li><strong>Reading log:</strong> Track books and reading progress</li>
    </ul>
    
    <h3>Personal Projects 🏠</h3>
    <ul>
      <li><strong>Expense tracker:</strong> Monitor spending habits</li>
      <li><strong>Fitness logger:</strong> Track workouts and health metrics</li>
      <li><strong>Recipe organizer:</strong> Store and categorize favorite recipes</li>
      <li><strong>Music playlist manager:</strong> Organize songs and artists</li>
      <li><strong>Photo organizer:</strong> Sort and tag digital photos</li>
    </ul>
    
    <h3>Business Applications 💼</h3>
    <ul>
      <li><strong>Inventory management:</strong> Track products and supplies</li>
      <li><strong>Customer database:</strong> Store client information</li>
      <li><strong>Sales analytics:</strong> Analyze business performance</li>
      <li><strong>Employee scheduling:</strong> Manage work shifts</li>
      <li><strong>Financial reporting:</strong> Track income and expenses</li>
    </ul>
    
    <h2>Data Security and Privacy 🔒</h2>
    
    <h3>Protecting Sensitive Data 🛡️</h3>
    <ul>
      <li><strong>Encryption:</strong> Scrambling data so only authorized people can read it</li>
      <li><strong>Access controls:</strong> Limiting who can see or modify data</li>
      <li><strong>Secure storage:</strong> Using protected databases and servers</li>
      <li><strong>Regular backups:</strong> Keeping copies in case of data loss</li>
      <li><strong>Password protection:</strong> Securing accounts and files</li>
    </ul>
    
    <h3>Privacy Considerations 👥</h3>
    <ul>
      <li><strong>Personal information:</strong> Be careful with names, addresses, phone numbers</li>
      <li><strong>Consent:</strong> Get permission before collecting data from others</li>
      <li><strong>Data minimization:</strong> Only collect data you actually need</li>
      <li><strong>Transparency:</strong> Be clear about how you use data</li>
      <li><strong>Legal compliance:</strong> Follow laws about data protection</li>
    </ul>
    
    <h2>Common Data Challenges and Solutions 🧩</h2>
    
    <h3>Data Quality Issues 🔧</h3>
    <ul>
      <li><strong>Missing values:</strong> What to do when data is incomplete</li>
      <li><strong>Inconsistent formats:</strong> Different ways of writing the same thing</li>
      <li><strong>Duplicate entries:</strong> The same information repeated multiple times</li>
      <li><strong>Outdated information:</strong> Data that's no longer current or accurate</li>
      <li><strong>Input errors:</strong> Mistakes made when entering data</li>
    </ul>
    
    <h3>Performance Optimization ⚡</h3>
    <ul>
      <li><strong>Efficient algorithms:</strong> Choosing the best way to process data</li>
      <li><strong>Data indexing:</strong> Creating shortcuts for faster searching</li>
      <li><strong>Memory management:</strong> Using computer memory efficiently</li>
      <li><strong>Batch processing:</strong> Handling large amounts of data in chunks</li>
      <li><strong>Caching:</strong> Storing frequently used data for quick access</li>
    </ul>
    
    <h2>Future of Data in Programming 🚀</h2>
    
    <h3>Big Data 📊</h3>
    <ul>
      <li><strong>Volume:</strong> Handling massive amounts of information</li>
      <li><strong>Velocity:</strong> Processing data in real-time</li>
      <li><strong>Variety:</strong> Working with different types of data</li>
      <li><strong>Cloud computing:</strong> Using internet-based storage and processing</li>
      <li><strong>Distributed systems:</strong> Spreading work across multiple computers</li>
    </ul>
    
    <h3>Artificial Intelligence and Machine Learning 🤖</h3>
    <ul>
      <li><strong>Pattern recognition:</strong> Finding hidden patterns in data</li>
      <li><strong>Predictive analytics:</strong> Using data to predict future trends</li>
      <li><strong>Automated decision making:</strong> Programs that learn from data</li>
      <li><strong>Natural language processing:</strong> Understanding human language</li>
      <li><strong>Computer vision:</strong> Analyzing images and videos</li>
    </ul>
    
    <h2>Career Connections 💼</h2>
    
    <h3>Data-Related Careers 👨‍💼</h3>
    <ul>
      <li><strong>Data Scientist:</strong> Analyzes complex data to find insights</li>
      <li><strong>Database Administrator:</strong> Manages and maintains databases</li>
      <li><strong>Data Analyst:</strong> Interprets data to help make business decisions</li>
      <li><strong>Software Developer:</strong> Creates programs that work with data</li>
      <li><strong>Web Developer:</strong> Builds websites that handle user data</li>
      <li><strong>Machine Learning Engineer:</strong> Develops AI systems that learn from data</li>
      <li><strong>Business Intelligence Analyst:</strong> Uses data to improve business operations</li>
      <li><strong>Research Scientist:</strong> Uses data to conduct scientific studies</li>
    </ul>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      title: "Student Grade Manager 📊",
      type: "code-simulation",
      description: "Build a program to manage student grades with different data types.",
      initialCode: `# Student Grade Manager
# Let's work with different types of data!

# Student information (dictionary)
student = {
    "name": "Alex Johnson",
    "age": 16,
    "grade_level": 11,
    "is_honor_student": True,
    "subjects": ["Math", "Science", "English", "History"]
}

# Test scores (list of numbers)
math_scores = [85, 92, 78, 96, 88]
science_scores = [90, 87, 93, 89, 91]

# Functions to work with the data
def calculate_average(scores):
    """Calculate the average of a list of scores"""
    if len(scores) == 0:
        return 0
    return sum(scores) / len(scores)

def get_letter_grade(average):
    """Convert numeric average to letter grade"""
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"

def display_student_report(student_data, subject_scores):
    """Display a formatted report for the student"""
    print(f"\n📊 Student Report for \{student_data['name']\}")
    print(f"Age: \{student_data['age']\}")
    print(f"Grade Level: \{student_data['grade_level']\}")
    print(f"Honor Student: \{'Yes' if student_data['is_honor_student'] else 'No'\}")
    print(f"Subjects: \{', '.join(student_data['subjects'])\}")
    
    print("\n📈 Grade Summary:")
    for subject, scores in subject_scores.items():
        avg = calculate_average(scores)
        letter = get_letter_grade(avg)
        print(f"\{subject\}: \{avg:.1f\}% (\{letter\})")
    
    # Calculate overall GPA
    all_averages = [calculate_average(scores) for scores in subject_scores.values()]
    overall_avg = calculate_average(all_averages)
    overall_letter = get_letter_grade(overall_avg)
    
    print(f"\n🎯 Overall Average: \{overall_avg:.1f\}% (\{overall_letter\})")

# Main program
if __name__ == "__main__":
    # Organize all subject scores
    all_scores = {
        "Math": math_scores,
        "Science": science_scores
    }
    
    # Display the report
    display_student_report(student, all_scores)
    
    # Add a new test score
    print("\n📝 Adding new Math test score...")
    new_math_score = 94
    math_scores.append(new_math_score)
    print(f"Added score: \{new_math_score\}")
    
    # Update and display new report
    all_scores["Math"] = math_scores
    display_student_report(student, all_scores)
    
    # Demonstrate data manipulation
    print("\n🔍 Data Analysis:")
    print(f"Highest Math score: \{max(math_scores)\}")
    print(f"Lowest Math score: \{min(math_scores)\}")
    print(f"Total tests taken: \{len(math_scores)\}")
    
    # Check if student qualifies for honor roll
    overall_avg = calculate_average([calculate_average(scores) for scores in all_scores.values()])
    if overall_avg >= 90:
        print(f"🏆 \{student['name']\} qualifies for Honor Roll!")
    else:
        print(f"📚 \{student['name']\} needs \{90 - overall_avg:.1f\} more points for Honor Roll.")
`,
      expectedOutput: `📊 Student Report for Alex Johnson
Age: 16
Grade Level: 11
Honor Student: Yes
Subjects: Math, Science, English, History

📈 Grade Summary:
Math: 87.8% (B)
Science: 90.0% (A)

🎯 Overall Average: 88.9% (B)

📝 Adding new Math test score...
Added score: 94

📊 Student Report for Alex Johnson
Age: 16
Grade Level: 11
Honor Student: Yes
Subjects: Math, Science, English, History

📈 Grade Summary:
Math: 88.8% (B)
Science: 90.0% (A)

🎯 Overall Average: 89.4% (B)

🔍 Data Analysis:
Highest Math score: 96
Lowest Math score: 78
Total tests taken: 6

📚 Alex Johnson needs 0.6 more points for Honor Roll.`,
      hints: [
        "Notice how we use different data types: strings for names, integers for ages, booleans for yes/no questions",
        "Lists are perfect for storing multiple test scores that can change over time",
        "Dictionaries help organize related information about a student",
        "Functions make it easy to reuse code for calculations and formatting"
      ]
    },
    {
      type: "data-type-explorer",
      title: "Data Type Detective 🕵️",
      description: "Identify and work with different data types in various scenarios.",
      scenarios: [
        {
          data: "42",
          question: "What data type is this?",
          options: ["String", "Integer", "Float", "Boolean"],
          correct: 1,
          explanation: "42 is a whole number, making it an integer data type."
        },
        {
          data: "'Hello World!'",
          question: "What data type is this?",
          options: ["String", "Integer", "List", "Boolean"],
          correct: 0,
          explanation: "Text enclosed in quotes is a string data type."
        },
        {
          data: "[1, 2, 3, 4, 5]",
          question: "What data type is this?",
          options: ["String", "Dictionary", "List", "Boolean"],
          correct: 2,
          explanation: "Square brackets containing multiple values indicate a list data type."
        },
        {
          data: "True",
          question: "What data type is this?",
          options: ["String", "Integer", "Float", "Boolean"],
          correct: 3,
          explanation: "True (and False) are boolean values representing yes/no or on/off states."
        }
      ]
    },
    {
      type: "data-structure-builder",
      title: "Build a Class Database 🏫",
      description: "Create a data structure to represent a class of students.",
      requirements: [
        "Store information for at least 3 students",
        "Include name, age, grade, and favorite subject for each student",
        "Use appropriate data types for each piece of information",
        "Organize the data in a logical structure"
      ],
      template: {
        "class_name": "Grade 9A",
        "teacher": "Ms. Johnson",
        "students": [
          {
            "name": "",
            "age": 0,
            "grade": "",
            "favorite_subject": "",
            "is_present": true
          }
        ]
      }
    },
    {
      type: "data-processing-challenge",
      title: "Survey Data Analyzer 📋",
      description: "Process and analyze survey data about student preferences.",
      rawData: [
        "Pizza, 15, Yes",
        "Burgers, 16, No",
        "Tacos, 14, Yes",
        "Pizza, 15, Yes",
        "Sushi, 17, No",
        "Burgers, 16, Yes",
        "Pizza, 15, No"
      ],
      tasks: [
        "Parse the CSV data into a structured format",
        "Count how many students prefer each food",
        "Calculate the average age of students",
        "Find the most popular food choice",
        "Determine what percentage of students are vegetarian"
      ]
    }
  ],
  
  // Code examples and demonstrations
  codeExamples: [
    {
      title: "Weather Data Analyzer 🌤️",
      description: "A program that processes weather data and provides insights.",
      language: "python",
      code: `# Weather Data Analyzer
# Working with real-world data about weather conditions

import json
from datetime import datetime

# Sample weather data (normally would come from a file or API)
weather_data = [
    {"date": "2024-01-01", "city": "Toronto", "temperature": -5, "humidity": 65, "condition": "Snow"},
    {"date": "2024-01-01", "city": "Vancouver", "temperature": 8, "humidity": 80, "condition": "Rain"},
    {"date": "2024-01-01", "city": "Calgary", "temperature": -12, "humidity": 45, "condition": "Clear"},
    {"date": "2024-01-02", "city": "Toronto", "temperature": -3, "humidity": 70, "condition": "Cloudy"},
    {"date": "2024-01-02", "city": "Vancouver", "temperature": 10, "humidity": 75, "condition": "Partly Cloudy"},
    {"date": "2024-01-02", "city": "Calgary", "temperature": -8, "humidity": 50, "condition": "Snow"}
]

class WeatherAnalyzer:
    def __init__(self, data):
        self.data = data
        self.cities = list(set([record['city'] for record in data]))
    
    def get_city_average_temp(self, city):
        """Calculate average temperature for a specific city"""
        city_temps = [record['temperature'] for record in self.data if record['city'] == city]
        return sum(city_temps) / len(city_temps) if city_temps else 0
    
    def get_temperature_extremes(self):
        """Find the hottest and coldest temperatures recorded"""
        temperatures = [(record['temperature'], record['city'], record['date']) for record in self.data]
        hottest = max(temperatures, key=lambda x: x[0])
        coldest = min(temperatures, key=lambda x: x[0])
        
        return {
            'hottest': {'temperature': hottest[0], 'city': hottest[1], 'date': hottest[2]},
            'coldest': {'temperature': coldest[0], 'city': coldest[1], 'date': coldest[2]}
        }
    
    def get_condition_summary(self):
        """Count occurrences of each weather condition"""
        conditions = {}
        for record in self.data:
            condition = record['condition']
            conditions[condition] = conditions.get(condition, 0) + 1
        return conditions
    
    def generate_report(self):
        """Generate a comprehensive weather report"""
        print("🌤️ Weather Data Analysis Report")
        print("=" * 40)
        
        # City averages
        print("\n📊 Average Temperatures by City:")
        for city in self.cities:
            avg = self.get_city_average_temp(city)
            print(f"  {city}: {avg:.1f}°C")
        
        # Temperature extremes
        extremes = self.get_temperature_extremes()
        print("\n🌡️ Temperature Extremes:")
        print(f"  Hottest: {extremes['hottest']['temperature']}°C in {extremes['hottest']['city']} on {extremes['hottest']['date']}")
        print(f"  Coldest: {extremes['coldest']['temperature']}°C in {extremes['coldest']['city']} on {extremes['coldest']['date']}")
        
        # Weather conditions
        conditions = self.get_condition_summary()
        print("\n☁️ Weather Conditions Summary:")
        for condition, count in conditions.items():
            print(f"  {condition}: {count} occurrences")
        
        # Data quality check
        print("\n🔍 Data Quality Check:")
        print(f"  Total records: {len(self.data)}")
        print(f"  Cities covered: {len(self.cities)}")
        print(f"  Date range: {min([r['date'] for r in self.data])} to {max([r['date'] for r in self.data])}")

# Create analyzer and generate report
analyzer = WeatherAnalyzer(weather_data)
analyzer.generate_report()

# Demonstrate data filtering
print("\n❄️ Cold Weather Alert (Below 0°C):")
cold_days = [record for record in weather_data if record['temperature'] < 0]
for day in cold_days:
    print(f"  {day['date']} in {day['city']}: {day['temperature']}°C ({day['condition']})")

# Save processed data to JSON file
processed_data = {
    "summary": {
        "total_records": len(weather_data),
        "cities": analyzer.cities,
        "average_temperatures": {city: analyzer.get_city_average_temp(city) for city in analyzer.cities},
        "extremes": analyzer.get_temperature_extremes(),
        "conditions": analyzer.get_condition_summary()
    },
    "raw_data": weather_data
}

with open("weather_analysis.json", "w") as file:
    json.dump(processed_data, file, indent=2)
    print("\n💾 Analysis saved to weather_analysis.json")`
    },
    {
      title: "CSV Data Processor 📊",
      description: "Read, process, and analyze data from CSV files.",
      language: "python",
      code: `# CSV Data Processor
# Working with comma-separated values (CSV) data

import csv
from collections import defaultdict

# Sample CSV data (normally would be in a separate file)
csv_content = """Name,Age,Grade,Subject,Score,Date
Alice Johnson,16,11,Math,95,2024-01-15
Bob Smith,15,10,Science,87,2024-01-15
Carol Davis,16,11,English,92,2024-01-15
David Wilson,15,10,Math,78,2024-01-15
Eva Brown,17,12,Science,94,2024-01-15
Frank Miller,16,11,English,89,2024-01-15
Grace Lee,15,10,Math,91,2024-01-15
Henry Taylor,17,12,Science,85,2024-01-15
Ivy Chen,16,11,English,96,2024-01-15
Jack Anderson,15,10,Math,82,2024-01-15"""

class CSVProcessor:
    def __init__(self, csv_data):
        self.data = []
        self.load_data(csv_data)
    
    def load_data(self, csv_content):
        """Load CSV data into a list of dictionaries"""
        lines = csv_content.strip().split('\n')
        reader = csv.DictReader(lines)
        
        for row in reader:
            # Convert numeric fields
            processed_row = {
                'name': row['Name'],
                'age': int(row['Age']),
                'grade': int(row['Grade']),
                'subject': row['Subject'],
                'score': int(row['Score']),
                'date': row['Date']
            }
            self.data.append(processed_row)
        
        print(f"✅ Loaded {len(self.data)} records from CSV")
    
    def get_subject_statistics(self):
        """Calculate statistics for each subject"""
        subject_data = defaultdict(list)
        
        # Group scores by subject
        for record in self.data:
            subject_data[record['subject']].append(record['score'])
        
        # Calculate statistics
        stats = {}
        for subject, scores in subject_data.items():
            stats[subject] = {
                'count': len(scores),
                'average': sum(scores) / len(scores),
                'highest': max(scores),
                'lowest': min(scores),
                'total': sum(scores)
            }
        
        return stats
    
    def get_grade_level_analysis(self):
        """Analyze performance by grade level"""
        grade_data = defaultdict(list)
        
        # Group scores by grade level
        for record in self.data:
            grade_data[record['grade']].append(record['score'])
        
        # Calculate averages
        grade_averages = {}
        for grade, scores in grade_data.items():
            grade_averages[grade] = {
                'students': len(scores),
                'average_score': sum(scores) / len(scores),
                'scores': scores
            }
        
        return grade_averages
    
    def find_top_performers(self, n=3):
        """Find the top N performing students"""
        # Sort by score in descending order
        sorted_data = sorted(self.data, key=lambda x: x['score'], reverse=True)
        return sorted_data[:n]
    
    def filter_by_criteria(self, min_score=None, subject=None, grade=None):
        """Filter data based on various criteria"""
        filtered_data = self.data
        
        if min_score is not None:
            filtered_data = [record for record in filtered_data if record['score'] >= min_score]
        
        if subject is not None:
            filtered_data = [record for record in filtered_data if record['subject'] == subject]
        
        if grade is not None:
            filtered_data = [record for record in filtered_data if record['grade'] == grade]
        
        return filtered_data
    
    def export_summary_csv(self, filename="summary.csv"):
        """Export summary statistics to a new CSV file"""
        stats = self.get_subject_statistics()
        
        with open(filename, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Subject', 'Students', 'Average', 'Highest', 'Lowest'])
            
            for subject, data in stats.items():
                writer.writerow([
                    subject,
                    data['count'],
                    f"{data['average']:.1f}",
                    data['highest'],
                    data['lowest']
                ])
        
        print(f"📄 Summary exported to {filename}")
    
    def generate_report(self):
        """Generate a comprehensive data analysis report"""
        print("\n📊 CSV Data Analysis Report")
        print("=" * 50)
        
        # Basic statistics
        print(f"\n📈 Dataset Overview:")
        print(f"  Total records: {len(self.data)}")
        print(f"  Subjects covered: {len(set([r['subject'] for r in self.data]))}")
        print(f"  Grade levels: {sorted(set([r['grade'] for r in self.data]))}")
        
        # Subject statistics
        subject_stats = self.get_subject_statistics()
        print("\n📚 Subject Performance:")
        for subject, stats in subject_stats.items():
            print(f"  {subject}:")
            print(f"    Students: {stats['count']}")
            print(f"    Average: {stats['average']:.1f}%")
            print(f"    Range: {stats['lowest']}% - {stats['highest']}%")
        
        # Grade level analysis
        grade_analysis = self.get_grade_level_analysis()
        print("\n🎓 Grade Level Analysis:")
        for grade, data in sorted(grade_analysis.items()):
            print(f"  Grade {grade}: {data['students']} students, {data['average_score']:.1f}% average")
        
        # Top performers
        top_performers = self.find_top_performers(3)
        print("\n🏆 Top 3 Performers:")
        for i, student in enumerate(top_performers, 1):
            print(f"  {i}. {student['name']} - {student['score']}% in {student['subject']}")
        
        # High achievers (90% or above)
        high_achievers = self.filter_by_criteria(min_score=90)
        print(f"\n⭐ High Achievers (90%+): {len(high_achievers)} students")
        for student in high_achievers:
            print(f"  {student['name']}: {student['score']}% in {student['subject']}")

# Create processor and analyze data
processor = CSVProcessor(csv_content)
processor.generate_report()

# Demonstrate filtering
print("\n🔍 Math Students Only:")
math_students = processor.filter_by_criteria(subject="Math")
for student in math_students:
    print(f"  {student['name']} (Grade {student['grade']}): {student['score']}%")

# Export summary
processor.export_summary_csv("subject_summary.csv")`
    },
    {
      title: "Personal Expense Tracker 💰",
      description: "Track and analyze personal expenses with categories and budgets.",
      language: "python",
      code: `# Personal Expense Tracker
# Managing financial data with categories and budgets

from datetime import datetime, date
from collections import defaultdict
import json

class ExpenseTracker:
    def __init__(self):
        self.expenses = []
        self.categories = {
            "Food": {"budget": 300, "color": "🍕"},
            "Transportation": {"budget": 150, "color": "🚗"},
            "Entertainment": {"budget": 200, "color": "🎬"},
            "Shopping": {"budget": 250, "color": "🛍️"},
            "Education": {"budget": 100, "color": "📚"},
            "Other": {"budget": 100, "color": "💼"}
        }
        self.load_sample_data()
    
    def load_sample_data(self):
        """Load some sample expense data"""
        sample_expenses = [
            {"date": "2024-01-15", "category": "Food", "amount": 25.50, "description": "Lunch at cafe"},
            {"date": "2024-01-16", "category": "Transportation", "amount": 15.00, "description": "Bus pass"},
            {"date": "2024-01-17", "category": "Entertainment", "amount": 45.00, "description": "Movie tickets"},
            {"date": "2024-01-18", "category": "Food", "amount": 32.75, "description": "Groceries"},
            {"date": "2024-01-19", "category": "Shopping", "amount": 89.99, "description": "New headphones"},
            {"date": "2024-01-20", "category": "Education", "amount": 25.00, "description": "School supplies"},
            {"date": "2024-01-21", "category": "Food", "amount": 18.25, "description": "Coffee and snacks"},
            {"date": "2024-01-22", "category": "Transportation", "amount": 12.50, "description": "Taxi ride"},
            {"date": "2024-01-23", "category": "Entertainment", "amount": 35.00, "description": "Concert ticket"},
            {"date": "2024-01-24", "category": "Other", "amount": 15.75, "description": "Phone case"}
        ]
        
        for expense in sample_expenses:
            self.add_expense(
                expense["date"],
                expense["category"],
                expense["amount"],
                expense["description"]
            )
        
        print(f"📊 Loaded {len(sample_expenses)} sample expenses")
    
    def add_expense(self, date_str, category, amount, description):
        """Add a new expense to the tracker"""
        expense = {
            "id": len(self.expenses) + 1,
            "date": date_str,
            "category": category,
            "amount": float(amount),
            "description": description,
            "timestamp": datetime.now().isoformat()
        }
        self.expenses.append(expense)
        return expense["id"]
    
    def get_total_expenses(self, category=None, start_date=None, end_date=None):
        """Calculate total expenses with optional filters"""
        filtered_expenses = self.expenses
        
        if category:
            filtered_expenses = [e for e in filtered_expenses if e["category"] == category]
        
        if start_date:
            filtered_expenses = [e for e in filtered_expenses if e["date"] >= start_date]
        
        if end_date:
            filtered_expenses = [e for e in filtered_expenses if e["date"] <= end_date]
        
        return sum(expense["amount"] for expense in filtered_expenses)
    
    def get_category_breakdown(self):
        """Get spending breakdown by category"""
        breakdown = defaultdict(float)
        
        for expense in self.expenses:
            breakdown[expense["category"]] += expense["amount"]
        
        return dict(breakdown)
    
    def check_budget_status(self):
        """Check budget status for each category"""
        spending = self.get_category_breakdown()
        budget_status = {}
        
        for category, budget_info in self.categories.items():
            spent = spending.get(category, 0)
            budget = budget_info["budget"]
            remaining = budget - spent
            percentage = (spent / budget) * 100 if budget > 0 else 0
            
            budget_status[category] = {
                "spent": spent,
                "budget": budget,
                "remaining": remaining,
                "percentage": percentage,
                "status": "over" if remaining < 0 else "warning" if percentage > 80 else "good"
            }
        
        return budget_status
    
    def get_recent_expenses(self, limit=5):
        """Get the most recent expenses"""
        return sorted(self.expenses, key=lambda x: x["date"], reverse=True)[:limit]
    
    def find_expensive_purchases(self, threshold=50):
        """Find purchases above a certain threshold"""
        return [expense for expense in self.expenses if expense["amount"] >= threshold]
    
    def generate_monthly_report(self):
        """Generate a comprehensive monthly expense report"""
        print("\n💰 Monthly Expense Report")
        print("=" * 40)
        
        # Total spending
        total = self.get_total_expenses()
        print(f"\n📊 Total Spending: $\{total:.2f\}")
        
        # Category breakdown
        breakdown = self.get_category_breakdown()
        print("\n🏷️ Spending by Category:")
        for category, amount in sorted(breakdown.items(), key=lambda x: x[1], reverse=True):
            emoji = self.categories[category]["color"]
            percentage = (amount / total) * 100 if total > 0 else 0
            print(f"  \{emoji\} \{category\}: $\{amount:.2f\} (\{percentage:.1f\}%)")
        
        # Budget status
        budget_status = self.check_budget_status()
        print("\n💳 Budget Status:")
        total_budget = sum(cat["budget"] for cat in self.categories.values())
        total_remaining = total_budget - total
        
        for category, status in budget_status.items():
            emoji = self.categories[category]["color"]
            status_emoji = "🔴" if status["status"] == "over" else "🟡" if status["status"] == "warning" else "🟢"
            print(f"  \{emoji\} \{category\}: $\{status['spent']:.2f\}/$\{status['budget']:.2f\} \{status_emoji\}")
            
            if status["remaining"] < 0:
                print(f"    ⚠️ Over budget by $\{abs(status['remaining']):.2f\}")
            else:
                print(f"    ✅ $\{status['remaining']:.2f\} remaining")
        
        print(f"\n💼 Overall Budget: $\{total:.2f\}/$\{total_budget:.2f\}")
        if total_remaining >= 0:
            print(f"✅ Under budget by $\{total_remaining:.2f\}")
        else:
            print(f"⚠️ Over budget by $\{abs(total_remaining):.2f\}")
        
        # Recent expenses
        recent = self.get_recent_expenses(3)
        print("\n🕒 Recent Expenses:")
        for expense in recent:
            emoji = self.categories[expense["category"]]["color"]
            print(f"  \{expense['date']\} - \{emoji\} $\{expense['amount']:.2f\} - \{expense['description']\}")
        
        # Expensive purchases
        expensive = self.find_expensive_purchases(40)
        if expensive:
            print(f"\n💸 Large Purchases ($40+):")
            for expense in expensive:
                emoji = self.categories[expense["category"]]["color"]
                print(f"  \{expense['date']\} - \{emoji\} $\{expense['amount']:.2f\} - \{expense['description']\}")
        
        # Savings suggestions
        print("\n💡 Money-Saving Tips:")
        over_budget = [cat for cat, status in budget_status.items() if status["status"] == "over"]
        if over_budget:
            print(f"  • Consider reducing spending in: \{', '.join(over_budget)\}")
        
        high_spending = max(breakdown.items(), key=lambda x: x[1])
        print(f"  • Your highest spending category is \{high_spending[0]\} ($\{high_spending[1]:.2f\})")
        print(f"  • Try setting a daily limit of $\{high_spending[1]/30:.2f\} for \{high_spending[0]\}")
    
    def export_data(self, filename="expenses.json"):
        """Export all expense data to a JSON file"""
        export_data = {
            "expenses": self.expenses,
            "categories": self.categories,
            "summary": {
                "total_expenses": len(self.expenses),
                "total_amount": self.get_total_expenses(),
                "category_breakdown": self.get_category_breakdown(),
                "export_date": datetime.now().isoformat()
            }
        }
        
        with open(filename, 'w') as file:
            json.dump(export_data, file, indent=2)
        
        print(f"\n💾 Data exported to {filename}")

# Create expense tracker and generate report
tracker = ExpenseTracker()

# Add a new expense
print("\n➕ Adding new expense...")
tracker.add_expense("2024-01-25", "Food", 28.50, "Dinner with friends")

# Generate comprehensive report
tracker.generate_monthly_report()

# Export data
tracker.export_data("my_expenses.json")

# Demonstrate data analysis
print("\n🔍 Data Analysis Examples:")
print(f"Food expenses: $\{tracker.get_total_expenses(category='Food'):.2f\}")
print(f"Entertainment expenses: $\{tracker.get_total_expenses(category='Entertainment'):.2f\}")
print(f"Average expense: $\{tracker.get_total_expenses() / len(tracker.expenses):.2f\}")`
    },
    {
      title: "Library Book Manager 📚",
      description: "Manage a library's book collection with search and categorization features.",
      language: "python",
      code: `# Library Book Manager
# Managing a collection of books with various data types and operations

from datetime import datetime, timedelta
import json

class LibraryManager:
    def __init__(self):
        self.books = []
        self.members = []
        self.loans = []
        self.load_sample_data()
    
    def load_sample_data(self):
        """Load sample books and members"""
        # Sample books
        sample_books = [
            {"isbn": "978-0-123456-78-9", "title": "The Great Adventure", "author": "Jane Smith", "genre": "Fiction", "year": 2020, "available": True},
            {"isbn": "978-0-234567-89-0", "title": "Python Programming Guide", "author": "John Doe", "genre": "Technology", "year": 2023, "available": True},
            {"isbn": "978-0-345678-90-1", "title": "World History", "author": "Mary Johnson", "genre": "History", "year": 2019, "available": False},
            {"isbn": "978-0-456789-01-2", "title": "Mathematics for Everyone", "author": "Bob Wilson", "genre": "Education", "year": 2022, "available": True},
            {"isbn": "978-0-567890-12-3", "title": "The Mystery of the Lost Key", "author": "Alice Brown", "genre": "Mystery", "year": 2021, "available": True},
            {"isbn": "978-0-678901-23-4", "title": "Science Experiments", "author": "David Lee", "genre": "Science", "year": 2023, "available": False},
            {"isbn": "978-0-789012-34-5", "title": "Art Through the Ages", "author": "Emma Davis", "genre": "Art", "year": 2018, "available": True},
            {"isbn": "978-0-890123-45-6", "title": "Cooking Made Simple", "author": "Chef Marco", "genre": "Cooking", "year": 2022, "available": True}
        ]
        
        # Sample members
        sample_members = [
            {"id": 1, "name": "Alex Johnson", "email": "alex@email.com", "join_date": "2023-01-15", "active": True},
            {"id": 2, "name": "Sarah Wilson", "email": "sarah@email.com", "join_date": "2023-03-22", "active": True},
            {"id": 3, "name": "Mike Chen", "email": "mike@email.com", "join_date": "2023-06-10", "active": False},
            {"id": 4, "name": "Lisa Garcia", "email": "lisa@email.com", "join_date": "2023-09-05", "active": True}
        ]
        
        # Add books and members
        for book in sample_books:
            self.add_book(book["isbn"], book["title"], book["author"], book["genre"], book["year"])
            if not book["available"]:
                # Mark some books as borrowed
                self.books[-1]["available"] = False
        
        for member in sample_members:
            self.add_member(member["name"], member["email"], member["join_date"])
            if not member["active"]:
                self.members[-1]["active"] = False
        
        print(f"📚 Loaded {len(self.books)} books and {len(self.members)} members")
    
    def add_book(self, isbn, title, author, genre, year):
        """Add a new book to the library"""
        book = {
            "id": len(self.books) + 1,
            "isbn": isbn,
            "title": title,
            "author": author,
            "genre": genre,
            "year": int(year),
            "available": True,
            "added_date": datetime.now().strftime("%Y-%m-%d"),
            "times_borrowed": 0
        }
        self.books.append(book)
        return book["id"]
    
    def add_member(self, name, email, join_date=None):
         """Add a new library member"""
         member = {
             "id": len(self.members) + 1,
             "name": name,
             "email": email,
             "join_date": join_date or datetime.now().strftime("%Y-%m-%d"),
             "active": True,
             "books_borrowed": 0
         }
         self.members.append(member)
         return member["id"]
     
     def search_books(self, query, search_type="title"):
         """Search for books by title, author, or genre"""
         results = []
         query_lower = query.lower()
         
         for book in self.books:
             if search_type == "title" and query_lower in book["title"].lower():
                 results.append(book)
             elif search_type == "author" and query_lower in book["author"].lower():
                 results.append(book)
             elif search_type == "genre" and query_lower in book["genre"].lower():
                 results.append(book)
             elif search_type == "isbn" and query in book["isbn"]:
                 results.append(book)
         
         return results
     
     def get_books_by_genre(self):
         """Group books by genre"""
         genres = {}
         for book in self.books:
             genre = book["genre"]
             if genre not in genres:
                 genres[genre] = []
             genres[genre].append(book)
         return genres
     
     def get_popular_books(self, limit=5):
         """Get most borrowed books"""
         sorted_books = sorted(self.books, key=lambda x: x["times_borrowed"], reverse=True)
         return sorted_books[:limit]
     
     def generate_library_report(self):
         """Generate comprehensive library report"""
         print("\n📚 Library Management Report")
         print("=" * 45)
         
         # Basic statistics
         total_books = len(self.books)
         available_books = len([b for b in self.books if b["available"]])
         borrowed_books = total_books - available_books
         total_members = len(self.members)
         active_members = len([m for m in self.members if m["active"]])
         
         print(f"\n📊 Library Statistics:")
         print(f"  Total Books: {total_books}")
         print(f"  Available: {available_books}")
         print(f"  Currently Borrowed: {borrowed_books}")
         print(f"  Total Members: {total_members}")
         print(f"  Active Members: {active_members}")
         
         # Books by genre
         genres = self.get_books_by_genre()
         print(f"\n📖 Books by Genre:")
         for genre, books in sorted(genres.items()):
             available_count = len([b for b in books if b["available"]])
             print(f"  {genre}: {len(books)} books ({available_count} available)")
         
         # Popular books
         popular = self.get_popular_books(3)
         print(f"\n🏆 Most Popular Books:")
         for i, book in enumerate(popular, 1):
             status = "Available" if book["available"] else "Borrowed"
             print(f"  {i}. {book['title']} by {book['author']} - Borrowed {book['times_borrowed']} times ({status})")
         
         # Recent additions
         recent_books = sorted(self.books, key=lambda x: x["added_date"], reverse=True)[:3]
         print(f"\n📅 Recent Additions:")
         for book in recent_books:
             print(f"  {book['title']} by {book['author']} (Added: {book['added_date']})")
         
         # Member information
         print(f"\n👥 Member Information:")
         for member in self.members:
             status = "Active" if member["active"] else "Inactive"
             print(f"  {member['name']} - {member['email']} ({status}, Joined: {member['join_date']})")
     
     def search_and_display(self, query, search_type="title"):
         """Search for books and display results"""
         results = self.search_books(query, search_type)
         
         print(f"\n🔍 Search Results for '{query}' in {search_type}:")
         if results:
             for book in results:
                 status = "✅ Available" if book["available"] else "❌ Borrowed"
                 print(f"  📖 {book['title']}")
                 print(f"     Author: {book['author']}")
                 print(f"     Genre: {book['genre']} | Year: {book['year']}")
                 print(f"     ISBN: {book['isbn']}")
                 print(f"     Status: {status}")
                 print(f"     Times Borrowed: {book['times_borrowed']}")
                 print()
         else:
             print(f"  No books found matching '{query}' in {search_type}")
         
         return results
     
     def export_catalog(self, filename="library_catalog.json"):
         """Export library catalog to JSON file"""
         catalog_data = {
             "library_info": {
                 "total_books": len(self.books),
                 "total_members": len(self.members),
                 "export_date": datetime.now().isoformat()
             },
             "books": self.books,
             "members": self.members,
             "statistics": {
                 "books_by_genre": {genre: len(books) for genre, books in self.get_books_by_genre().items()},
                 "popular_books": [book["title"] for book in self.get_popular_books(5)]
             }
         }
         
         with open(filename, 'w') as file:
             json.dump(catalog_data, file, indent=2)
         
         print(f"\n💾 Library catalog exported to {filename}")
 
 # Create library manager and demonstrate functionality
 library = LibraryManager()
 
 # Generate comprehensive report
 library.generate_library_report()
 
 # Demonstrate search functionality
 library.search_and_display("Python", "title")
 library.search_and_display("Science", "genre")
 library.search_and_display("Smith", "author")
 
 # Export catalog
 library.export_catalog("my_library.json")
 
 # Demonstrate data analysis
 print("\n🔍 Library Analytics:")
 fiction_books = library.search_books("Fiction", "genre")
 print(f"Fiction books: {len(fiction_books)}")
 
 available_books = [book for book in library.books if book["available"]]
 print(f"Available books: {len(available_books)}")
 
 recent_books = [book for book in library.books if book["year"] >= 2020]
 print(f"Books published since 2020: {len(recent_books)}")`
     }
   ],
   
   // Practice exercises and assessments
   practiceExercises: [
     {
       title: "Data Type Explorer 🔍",
       difficulty: "beginner",
       description: "Practice identifying and working with different data types",
       tasks: [
         "Create variables of each basic data type (integer, float, string, boolean)",
         "Build a list containing mixed data types",
         "Create a dictionary to represent a student record",
         "Practice converting between data types"
       ]
     },
     {
       title: "Personal Data Organizer 📋",
       difficulty: "intermediate", 
       description: "Build a system to organize your personal information",
       tasks: [
         "Create data structures for contacts, tasks, and events",
         "Implement search and filter functionality",
         "Add data validation and error handling",
         "Save and load data from files"
       ]
     },
     {
       title: "Data Analysis Challenge 📊",
       difficulty: "advanced",
       description: "Analyze real-world datasets and generate insights",
       tasks: [
         "Process CSV data from multiple sources",
         "Clean and validate the data",
         "Calculate statistics and identify trends",
         "Create visualizations and reports"
       ]
     }
   ],
   
   // Key takeaways and summary
   keyTakeaways: [
     "Data is the foundation of all computer programs - from simple numbers to complex structures",
     "Different data types serve different purposes: numbers for calculations, strings for text, booleans for decisions",
     "Variables are like labeled containers that store and organize your data",
     "Lists and dictionaries help organize multiple pieces of related information",
     "Real-world data often needs cleaning and validation before it can be used",
     "Files and databases provide ways to store data permanently",
     "Good data organization makes programs easier to write, understand, and maintain",
     "Data security and privacy are important considerations in all programming projects"
   ],
   
   // Additional resources
   additionalResources: [
     {
       title: "Python Data Structures Tutorial",
       type: "tutorial",
       description: "Comprehensive guide to working with lists, dictionaries, and other data structures"
     },
     {
       title: "Introduction to Databases",
       type: "course",
       description: "Learn how to design and work with databases for larger data storage needs"
     },
     {
       title: "Data Science Fundamentals",
       type: "pathway",
       description: "Explore how data analysis and machine learning build on programming concepts"
     }
   ]
 };