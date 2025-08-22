// Lesson 2.1: Data Modelling - Comprehensive lesson content

export default {
  title: "Data Modelling",
  description: "Master data structures, relationships, and modeling techniques for effective data organization",
  difficulty: "intermediate",
  estimatedTime: "70 minutes",
  
  // Learning objectives
  objectives: [
    "Understand fundamental data types and structures",
    "Learn to model real-world entities and their relationships",
    "Master entity-relationship diagrams and data modeling techniques",
    "Apply normalization principles to optimize data organization",
    "Design efficient data models for various applications"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Data Modelling?</h2>
    <p><strong>Data modelling</strong> is the process of creating a conceptual representation of data structures and their relationships. It serves as a blueprint for organizing, storing, and managing data effectively in information systems.</p>
    
    <p>Key purposes of data modelling:</p>
    <ul>
      <li><strong>Organization:</strong> Structure data in a logical, accessible way</li>
      <li><strong>Communication:</strong> Provide a common understanding between stakeholders</li>
      <li><strong>Design:</strong> Guide database and system architecture decisions</li>
      <li><strong>Optimization:</strong> Ensure efficient data storage and retrieval</li>
      <li><strong>Integrity:</strong> Maintain data accuracy and consistency</li>
      <li><strong>Scalability:</strong> Support future growth and changes</li>
    </ul>
    
    <h2>Fundamental Data Types</h2>
    
    <h3>Primitive Data Types</h3>
    <p>Basic building blocks for all data structures:</p>
    
    <pre><code>BEGIN Data_Types_Overview
    DISPLAY "=== PRIMITIVE DATA TYPES ==="
    
    // Numeric Types
    SET integer_example = 42
    SET float_example = 3.14159
    SET currency_example = 29.99
    
    DISPLAY "Numeric Types:"
    DISPLAY "  Integer: " + integer_example + " (whole numbers)"
    DISPLAY "  Float: " + float_example + " (decimal numbers)"
    DISPLAY "  Currency: $" + currency_example + " (monetary values)"
    
    // Text Types
    SET character_example = 'A'
    SET string_example = "Hello, World!"
    SET text_example = "This is a longer text that might span multiple lines..."
    
    DISPLAY "\nText Types:"
    DISPLAY "  Character: '" + character_example + "' (single character)"
    DISPLAY "  String: \"" + string_example + "\" (sequence of characters)"
    DISPLAY "  Text: \"" + substring(text_example, 0, 30) + "...\" (long text)"
    
    // Boolean Type
    SET boolean_true = TRUE
    SET boolean_false = FALSE
    
    DISPLAY "\nBoolean Type:"
    DISPLAY "  True: " + boolean_true + " (represents yes/on/valid)"
    DISPLAY "  False: " + boolean_false + " (represents no/off/invalid)"
    
    // Date and Time Types
    SET date_example = "2024-03-15"
    SET time_example = "14:30:00"
    SET datetime_example = "2024-03-15 14:30:00"
    
    DISPLAY "\nDate and Time Types:"
    DISPLAY "  Date: " + date_example + " (year-month-day)"
    DISPLAY "  Time: " + time_example + " (hour:minute:second)"
    DISPLAY "  DateTime: " + datetime_example + " (combined date and time)"
    
    // Special Types
    SET null_example = NULL
    SET undefined_example = UNDEFINED
    
    DISPLAY "\nSpecial Types:"
    DISPLAY "  NULL: " + null_example + " (intentionally empty value)"
    DISPLAY "  UNDEFINED: " + undefined_example + " (value not set)"
END</code></pre>
    
    <h3>Composite Data Types</h3>
    <p>Complex structures built from primitive types:</p>
    
    <pre><code>BEGIN Composite_Data_Types
    DISPLAY "=== COMPOSITE DATA TYPES ==="
    
    // Arrays (Lists)
    SET number_array = [1, 2, 3, 4, 5]
    SET string_array = ["apple", "banana", "cherry"]
    SET mixed_array = ["John", 25, TRUE, "2024-03-15"]
    
    DISPLAY "Arrays (Ordered Collections):"
    DISPLAY "  Numbers: " + array_to_string(number_array)
    DISPLAY "  Strings: " + array_to_string(string_array)
    DISPLAY "  Mixed: " + array_to_string(mixed_array)
    
    // Objects (Records/Structures)
    SET person_object = {
        name: "Alice Johnson",
        age: 28,
        email: "alice@example.com",
        is_active: TRUE,
        join_date: "2023-01-15"
    }
    
    DISPLAY "\nObjects (Key-Value Pairs):"
    DISPLAY "  Person Object:"
    FOR each key IN keys(person_object)
        DISPLAY "    " + key + ": " + person_object[key]
    ENDFOR
    
    // Nested Structures
    SET company_object = {
        name: "Tech Solutions Inc.",
        founded: 2020,
        employees: [
            {name: "Alice Johnson", role: "Developer", salary: 75000},
            {name: "Bob Smith", role: "Designer", salary: 65000},
            {name: "Carol Davis", role: "Manager", salary: 85000}
        ],
        address: {
            street: "123 Main St",
            city: "Tech City",
            state: "CA",
            zip: "12345"
        }
    }
    
    DISPLAY "\nNested Structures:"
    DISPLAY "  Company: " + company_object["name"]
    DISPLAY "  Founded: " + company_object["founded"]
    DISPLAY "  Employee Count: " + length(company_object["employees"])
    DISPLAY "  Address: " + company_object["address"]["street"] + ", " + company_object["address"]["city"]
    
    DISPLAY "\n  Employee Details:"
    FOR each employee IN company_object["employees"]
        DISPLAY "    " + employee["name"] + " - " + employee["role"] + " ($" + employee["salary"] + ")"
    ENDFOR
END</code></pre>
    
    <h2>Entity-Relationship Modeling</h2>
    
    <h3>Entities and Attributes</h3>
    <p>Entities represent real-world objects, and attributes describe their properties.</p>
    
    <pre><code>BEGIN Entity_Modeling_Example
    DISPLAY "=== ENTITY-RELATIONSHIP MODELING ==="
    DISPLAY "Example: University Management System"
    
    // Define Entities with Attributes
    SET student_entity = {
        name: "Student",
        attributes: [
            {name: "student_id", type: "integer", key: "primary", required: TRUE},
            {name: "first_name", type: "string", length: 50, required: TRUE},
            {name: "last_name", type: "string", length: 50, required: TRUE},
            {name: "email", type: "string", length: 100, unique: TRUE, required: TRUE},
            {name: "date_of_birth", type: "date", required: TRUE},
            {name: "enrollment_date", type: "date", required: TRUE},
            {name: "gpa", type: "float", min: 0.0, max: 4.0, required: FALSE},
            {name: "is_active", type: "boolean", default: TRUE}
        ]
    }
    
    SET course_entity = {
        name: "Course",
        attributes: [
            {name: "course_id", type: "string", length: 10, key: "primary", required: TRUE},
            {name: "course_name", type: "string", length: 100, required: TRUE},
            {name: "description", type: "text", required: FALSE},
            {name: "credits", type: "integer", min: 1, max: 6, required: TRUE},
            {name: "department", type: "string", length: 50, required: TRUE},
            {name: "max_enrollment", type: "integer", min: 1, required: TRUE}
        ]
    }
    
    SET instructor_entity = {
        name: "Instructor",
        attributes: [
            {name: "instructor_id", type: "integer", key: "primary", required: TRUE},
            {name: "first_name", type: "string", length: 50, required: TRUE},
            {name: "last_name", type: "string", length: 50, required: TRUE},
            {name: "email", type: "string", length: 100, unique: TRUE, required: TRUE},
            {name: "department", type: "string", length: 50, required: TRUE},
            {name: "hire_date", type: "date", required: TRUE},
            {name: "salary", type: "currency", required: TRUE}
        ]
    }
    
    // Display Entity Definitions
    SET entities = [student_entity, course_entity, instructor_entity]
    
    FOR each entity IN entities
        DISPLAY "\nEntity: " + entity["name"]
        DISPLAY "Attributes:"
        FOR each attr IN entity["attributes"]
            SET attr_desc = "  " + attr["name"] + " (" + attr["type"]
            
            IF has_key(attr, "length") THEN
                SET attr_desc = attr_desc + ", max length: " + attr["length"]
            ENDIF
            
            IF has_key(attr, "key") THEN
                SET attr_desc = attr_desc + ", " + attr["key"] + " key"
            ENDIF
            
            IF attr["required"] THEN
                SET attr_desc = attr_desc + ", required"
            ENDIF
            
            SET attr_desc = attr_desc + ")"
            DISPLAY attr_desc
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h3>Relationships Between Entities</h3>
    <p>Relationships define how entities are connected to each other.</p>
    
    <pre><code>BEGIN Relationship_Modeling
    DISPLAY "\n=== RELATIONSHIP TYPES ==="
    
    // One-to-One Relationship (1:1)
    SET one_to_one_example = {
        name: "Student-StudentProfile",
        type: "1:1",
        description: "Each student has exactly one profile, and each profile belongs to exactly one student",
        entities: ["Student", "StudentProfile"],
        example: "Student ID 12345 has Profile ID 12345"
    }
    
    // One-to-Many Relationship (1:M)
    SET one_to_many_example = {
        name: "Instructor-Course",
        type: "1:M",
        description: "One instructor can teach many courses, but each course has only one primary instructor",
        entities: ["Instructor", "Course"],
        example: "Instructor 'Dr. Smith' teaches 'Math 101', 'Math 201', and 'Statistics'"
    }
    
    // Many-to-Many Relationship (M:N)
    SET many_to_many_example = {
        name: "Student-Course (Enrollment)",
        type: "M:N",
        description: "Students can enroll in multiple courses, and courses can have multiple students",
        entities: ["Student", "Course"],
        junction_table: "Enrollment",
        example: "Student 'Alice' is enrolled in 'Math 101' and 'History 201'; 'Math 101' has 30 students"
    }
    
    SET relationships = [one_to_one_example, one_to_many_example, many_to_many_example]
    
    FOR each rel IN relationships
        DISPLAY "\nRelationship: " + rel["name"]
        DISPLAY "Type: " + rel["type"]
        DISPLAY "Description: " + rel["description"]
        DISPLAY "Entities: " + join(rel["entities"], " ↔ ")
        
        IF has_key(rel, "junction_table") THEN
            DISPLAY "Junction Table: " + rel["junction_table"]
        ENDIF
        
        DISPLAY "Example: " + rel["example"]
    ENDFOR
    
    // Junction Table for Many-to-Many Relationship
    DISPLAY "\n=== JUNCTION TABLE DESIGN ==="
    DISPLAY "Enrollment Table (resolves Student-Course M:N relationship):"
    
    SET enrollment_table = {
        name: "Enrollment",
        attributes: [
            {name: "enrollment_id", type: "integer", key: "primary", auto_increment: TRUE},
            {name: "student_id", type: "integer", key: "foreign", references: "Student.student_id"},
            {name: "course_id", type: "string", key: "foreign", references: "Course.course_id"},
            {name: "enrollment_date", type: "date", required: TRUE},
            {name: "grade", type: "string", length: 2, required: FALSE},
            {name: "status", type: "string", values: ["enrolled", "completed", "dropped"], default: "enrolled"}
        ],
        constraints: [
            "UNIQUE(student_id, course_id)",  // Prevent duplicate enrollments
            "CHECK(grade IN ('A', 'B', 'C', 'D', 'F', 'W'))"
        ]
    }
    
    DISPLAY "\nEnrollment Table Structure:"
    FOR each attr IN enrollment_table["attributes"]
        SET attr_desc = "  " + attr["name"] + " (" + attr["type"]
        
        IF has_key(attr, "key") THEN
            SET attr_desc = attr_desc + ", " + attr["key"] + " key"
        ENDIF
        
        IF has_key(attr, "references") THEN
            SET attr_desc = attr_desc + ", references " + attr["references"]
        ENDIF
        
        SET attr_desc = attr_desc + ")"
        DISPLAY attr_desc
    ENDFOR
    
    DISPLAY "\nConstraints:"
    FOR each constraint IN enrollment_table["constraints"]
        DISPLAY "  " + constraint
    ENDFOR
END</code></pre>
    
    <h2>Data Normalization</h2>
    
    <h3>Normal Forms</h3>
    <p>Normalization eliminates data redundancy and ensures data integrity.</p>
    
    <pre><code>BEGIN Normalization_Example
    DISPLAY "=== DATA NORMALIZATION PROCESS ==="
    DISPLAY "Example: Library Book Management System"
    
    // Unnormalized Data (0NF) - All data in one table
    DISPLAY "\n--- UNNORMALIZED FORM (0NF) ---"
    DISPLAY "Problems: Redundancy, update anomalies, insertion anomalies"
    
    SET unnormalized_data = [
        {
            book_id: "B001",
            title: "Database Design",
            author_name: "John Smith",
            author_email: "john@email.com",
            author_birth_year: 1970,
            publisher_name: "Tech Books Inc",
            publisher_address: "123 Main St, NY",
            publisher_phone: "555-0123",
            isbn: "978-1234567890",
            publication_year: 2020,
            category: "Computer Science",
            copies_available: 5
        },
        {
            book_id: "B002",
            title: "Advanced Algorithms",
            author_name: "John Smith",  // Redundant author info
            author_email: "john@email.com",
            author_birth_year: 1970,
            publisher_name: "Tech Books Inc",  // Redundant publisher info
            publisher_address: "123 Main St, NY",
            publisher_phone: "555-0123",
            isbn: "978-0987654321",
            publication_year: 2021,
            category: "Computer Science",
            copies_available: 3
        }
    ]
    
    DISPLAY "Unnormalized table contains redundant data:"
    FOR each book IN unnormalized_data
        DISPLAY "  Book: " + book["title"] + " by " + book["author_name"]
        DISPLAY "    Publisher: " + book["publisher_name"] + " (" + book["publisher_phone"] + ")"
    ENDFOR
    
    // First Normal Form (1NF)
    DISPLAY "\n--- FIRST NORMAL FORM (1NF) ---"
    DISPLAY "Rules: Eliminate repeating groups, ensure atomic values"
    
    // Assume we had multi-valued attributes like multiple authors
    SET books_1nf = [
        {book_id: "B001", title: "Database Design", isbn: "978-1234567890", publication_year: 2020, category: "Computer Science", copies: 5},
        {book_id: "B002", title: "Advanced Algorithms", isbn: "978-0987654321", publication_year: 2021, category: "Computer Science", copies: 3}
    ]
    
    SET book_authors_1nf = [
        {book_id: "B001", author_name: "John Smith", author_email: "john@email.com", author_birth_year: 1970},
        {book_id: "B002", author_name: "John Smith", author_email: "john@email.com", author_birth_year: 1970}
    ]
    
    DISPLAY "1NF: Separated repeating groups, but still has redundancy"
    
    // Second Normal Form (2NF)
    DISPLAY "\n--- SECOND NORMAL FORM (2NF) ---"
    DISPLAY "Rules: Must be in 1NF + eliminate partial dependencies on composite keys"
    
    SET books_2nf = [
        {book_id: "B001", title: "Database Design", isbn: "978-1234567890", publication_year: 2020, category: "Computer Science", copies: 5, publisher_id: "P001"},
        {book_id: "B002", title: "Advanced Algorithms", isbn: "978-0987654321", publication_year: 2021, category: "Computer Science", copies: 3, publisher_id: "P001"}
    ]
    
    SET authors_2nf = [
        {author_id: "A001", author_name: "John Smith", author_email: "john@email.com", author_birth_year: 1970}
    ]
    
    SET book_authors_2nf = [
        {book_id: "B001", author_id: "A001"},
        {book_id: "B002", author_id: "A001"}
    ]
    
    SET publishers_2nf = [
        {publisher_id: "P001", publisher_name: "Tech Books Inc", address: "123 Main St, NY", phone: "555-0123"}
    ]
    
    DISPLAY "2NF: Eliminated partial dependencies, reduced redundancy"
    
    // Third Normal Form (3NF)
    DISPLAY "\n--- THIRD NORMAL FORM (3NF) ---"
    DISPLAY "Rules: Must be in 2NF + eliminate transitive dependencies"
    
    // Further normalize if there were transitive dependencies
    SET categories_3nf = [
        {category_id: "C001", category_name: "Computer Science", department: "Engineering"}
    ]
    
    SET books_3nf = [
        {book_id: "B001", title: "Database Design", isbn: "978-1234567890", publication_year: 2020, category_id: "C001", copies: 5, publisher_id: "P001"},
        {book_id: "B002", title: "Advanced Algorithms", isbn: "978-0987654321", publication_year: 2021, category_id: "C001", copies: 3, publisher_id: "P001"}
    ]
    
    DISPLAY "3NF: Eliminated transitive dependencies, optimal normalization for most applications"
    
    // Benefits of Normalization
    DISPLAY "\n=== NORMALIZATION BENEFITS ==="
    DISPLAY "✓ Eliminates data redundancy"
    DISPLAY "✓ Prevents update anomalies"
    DISPLAY "✓ Reduces storage space"
    DISPLAY "✓ Ensures data consistency"
    DISPLAY "✓ Improves data integrity"
    
    DISPLAY "\n=== POTENTIAL DRAWBACKS ==="
    DISPLAY "⚠ May require more complex queries (joins)"
    DISPLAY "⚠ Can impact query performance for read-heavy applications"
    DISPLAY "⚠ Sometimes denormalization is needed for performance"
END</code></pre>
    
    <h2>Data Model Design Process</h2>
    
    <h3>Step-by-Step Design Methodology</h3>
    <pre><code>BEGIN Data_Model_Design_Process
    DISPLAY "=== DATA MODEL DESIGN METHODOLOGY ==="
    DISPLAY "Example: E-commerce Platform"
    
    // Step 1: Requirements Analysis
    DISPLAY "\nSTEP 1: REQUIREMENTS ANALYSIS"
    SET business_requirements = [
        "Customers can create accounts and manage profiles",
        "Products are organized into categories and have multiple variants",
        "Customers can add products to shopping cart and place orders",
        "Orders contain multiple items and have shipping information",
        "System tracks inventory levels and product availability",
        "Customers can write reviews and rate products",
        "System supports discount codes and promotional pricing"
    ]
    
    DISPLAY "Business Requirements:"
    FOR each req IN business_requirements
        DISPLAY "  • " + req
    ENDFOR
    
    // Step 2: Identify Entities
    DISPLAY "\nSTEP 2: IDENTIFY ENTITIES"
    SET entities = [
        {name: "Customer", description: "Users who purchase products"},
        {name: "Product", description: "Items available for sale"},
        {name: "Category", description: "Product classification groups"},
        {name: "Order", description: "Customer purchase transactions"},
        {name: "OrderItem", description: "Individual products within an order"},
        {name: "ShoppingCart", description: "Temporary storage for products before purchase"},
        {name: "Review", description: "Customer feedback on products"},
        {name: "DiscountCode", description: "Promotional codes for discounts"}
    ]
    
    DISPLAY "Identified Entities:"
    FOR each entity IN entities
        DISPLAY "  • " + entity["name"] + ": " + entity["description"]
    ENDFOR
    
    // Step 3: Define Attributes
    DISPLAY "\nSTEP 3: DEFINE ATTRIBUTES"
    
    SET customer_attributes = [
        "customer_id (PK)", "email (unique)", "password_hash", "first_name", "last_name",
        "phone", "date_of_birth", "registration_date", "is_active"
    ]
    
    SET product_attributes = [
        "product_id (PK)", "name", "description", "price", "cost", "sku", "weight",
        "dimensions", "category_id (FK)", "stock_quantity", "is_active", "created_date"
    ]
    
    DISPLAY "Sample Entity Attributes:"
    DISPLAY "  Customer: " + join(customer_attributes, ", ")
    DISPLAY "  Product: " + join(product_attributes, ", ")
    
    // Step 4: Identify Relationships
    DISPLAY "\nSTEP 4: IDENTIFY RELATIONSHIPS"
    
    SET relationships = [
        {from: "Customer", to: "Order", type: "1:M", description: "One customer can have many orders"},
        {from: "Order", to: "OrderItem", type: "1:M", description: "One order contains many items"},
        {from: "Product", to: "OrderItem", type: "1:M", description: "One product can be in many order items"},
        {from: "Category", to: "Product", type: "1:M", description: "One category contains many products"},
        {from: "Customer", to: "Review", type: "1:M", description: "One customer can write many reviews"},
        {from: "Product", to: "Review", type: "1:M", description: "One product can have many reviews"},
        {from: "Customer", to: "ShoppingCart", type: "1:1", description: "Each customer has one active cart"}
    ]
    
    DISPLAY "Entity Relationships:"
    FOR each rel IN relationships
        DISPLAY "  • " + rel["from"] + " → " + rel["to"] + " (" + rel["type"] + "): " + rel["description"]
    ENDFOR
    
    // Step 5: Apply Normalization
    DISPLAY "\nSTEP 5: APPLY NORMALIZATION"
    DISPLAY "• Ensure all tables are in 3NF"
    DISPLAY "• Separate address information into Address entity"
    DISPLAY "• Create junction tables for M:N relationships"
    DISPLAY "• Add audit fields (created_date, updated_date, created_by)"
    
    // Step 6: Add Constraints and Indexes
    DISPLAY "\nSTEP 6: ADD CONSTRAINTS AND INDEXES"
    
    SET constraints_and_indexes = [
        "Primary keys for all entities",
        "Foreign key constraints to maintain referential integrity",
        "Unique constraints on email addresses and SKUs",
        "Check constraints for valid data ranges (price > 0, rating 1-5)",
        "Indexes on frequently queried columns (email, product name, order date)",
        "Composite indexes for common query patterns"
    ]
    
    FOR each item IN constraints_and_indexes
        DISPLAY "  • " + item
    ENDFOR
    
    // Step 7: Validate and Refine
    DISPLAY "\nSTEP 7: VALIDATE AND REFINE"
    DISPLAY "• Review model with stakeholders"
    DISPLAY "• Test with sample data and queries"
    DISPLAY "• Consider performance implications"
    DISPLAY "• Plan for future scalability"
    DISPLAY "• Document the model thoroughly"
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "entity-designer",
      title: "Design Your Data Model",
      description: "Create entities and relationships for different scenarios.",
      scenarios: [
        {
          domain: "Hospital Management System",
          requirements: "Track patients, doctors, appointments, treatments, and medical records",
          userTask: "Identify entities, attributes, and relationships"
        },
        {
          domain: "Social Media Platform",
          requirements: "Users can post content, follow other users, like and comment on posts",
          userTask: "Design a data model supporting social interactions"
        }
      ]
    },
    {
      type: "normalization-practice",
      title: "Normalize Database Tables",
      description: "Practice converting unnormalized data into proper normal forms.",
      exercises: [
        {
          unnormalizedTable: "Student course enrollment with redundant instructor and department info",
          task: "Convert to 3NF by eliminating redundancy and dependencies",
          expectedTables: ["Students", "Courses", "Instructors", "Departments", "Enrollments"]
        }
      ]
    },
    {
      type: "relationship-mapper",
      title: "Map Entity Relationships",
      description: "Identify and classify relationships between entities.",
      entityPairs: [
        {entities: ["Author", "Book"], correctRelationship: "1:M", explanation: "One author can write many books"},
        {entities: ["Student", "Course"], correctRelationship: "M:N", explanation: "Students can take multiple courses, courses have multiple students"},
        {entities: ["Person", "Passport"], correctRelationship: "1:1", explanation: "Each person has one passport, each passport belongs to one person"}
      ]
    },
    {
      type: "data-type-selector",
      title: "Choose Appropriate Data Types",
      description: "Select the best data types for different attributes.",
      attributes: [
        {name: "email_address", options: ["VARCHAR(255)", "TEXT", "CHAR(50)"], correct: 0, explanation: "VARCHAR allows variable length with reasonable maximum"},
        {name: "product_price", options: ["FLOAT", "DECIMAL(10,2)", "INTEGER"], correct: 1, explanation: "DECIMAL ensures precise monetary calculations"},
        {name: "is_active", options: ["BOOLEAN", "VARCHAR(10)", "INTEGER"], correct: 0, explanation: "BOOLEAN is most appropriate for true/false values"}
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "Evolution of Data Models",
      content: `
        <p>Data modeling has evolved significantly since the early days of computing:</p>
        
        <h4>Hierarchical Model (1960s)</h4>
        <p>The first database model organized data in a tree-like structure. While simple, it was rigid and couldn't handle complex relationships efficiently. IBM's IMS (Information Management System) was a prominent example.</p>
        
        <h4>Network Model (1970s)</h4>
        <p>Introduced by CODASYL, this model allowed more complex relationships through a graph structure. It was more flexible than hierarchical but still complex to navigate and maintain.</p>
        
        <h4>Relational Model (1970s-present)</h4>
        <p>Edgar Codd's relational model revolutionized data management by organizing data into tables with rows and columns. This model, with its mathematical foundation and SQL query language, became the dominant approach for decades.</p>
        
        <h4>Object-Oriented Model (1980s-1990s)</h4>
        <p>As object-oriented programming gained popularity, object-oriented databases emerged to store complex objects directly. While powerful, they never achieved widespread adoption due to complexity and performance issues.</p>
        
        <h4>NoSQL Models (2000s-present)</h4>
        <p>The rise of big data and web applications led to NoSQL databases offering document, key-value, column-family, and graph models. These provide flexibility and scalability for specific use cases.</p>
        
        <h4>Modern Hybrid Approaches</h4>
        <p>Today's systems often combine multiple models, with databases supporting both relational and document storage, or graph capabilities alongside traditional tables.</p>
      `
    },
    {
      title: "Data Modeling Best Practices",
      content: `
        <p>Effective data modeling requires following established best practices:</p>
        
        <h4>Design Principles</h4>
        <ul>
          <li><strong>Start with business requirements:</strong> Understand what the system needs to accomplish before designing the data structure</li>
          <li><strong>Keep it simple:</strong> Avoid over-engineering; design for current needs with room for growth</li>
          <li><strong>Be consistent:</strong> Use consistent naming conventions, data types, and design patterns</li>
          <li><strong>Document everything:</strong> Maintain clear documentation of entities, relationships, and business rules</li>
        </ul>
        
        <h4>Common Pitfalls to Avoid</h4>
        <ul>
          <li><strong>Over-normalization:</strong> While normalization is important, excessive normalization can hurt performance</li>
          <li><strong>Ignoring performance:</strong> Consider query patterns and access frequencies during design</li>
          <li><strong>Poor naming:</strong> Use clear, descriptive names that reflect business terminology</li>
          <li><strong>Missing constraints:</strong> Implement proper constraints to ensure data integrity</li>
        </ul>
        
        <h4>Collaboration and Communication</h4>
        <p>Successful data modeling requires close collaboration between technical teams and business stakeholders. Use visual diagrams, prototypes, and iterative reviews to ensure the model meets all requirements.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which normal form eliminates transitive dependencies?",
      options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      correct: 2,
      explanation: "Third Normal Form (3NF) eliminates transitive dependencies, where non-key attributes depend on other non-key attributes."
    },
    {
      type: "scenario-based",
      question: "You're designing a data model for a library system. A book can have multiple authors, and an author can write multiple books. How would you model this relationship?",
      sampleAnswer: "Create a many-to-many (M:N) relationship using a junction table. Have separate Book and Author entities, then create a BookAuthor junction table with book_id and author_id as foreign keys. This allows multiple authors per book and multiple books per author.",
      rubric: [
        "Identifies the relationship as many-to-many (M:N)",
        "Suggests using a junction/bridge table",
        "Correctly identifies the foreign keys needed",
        "Explains how this resolves the M:N relationship",
        "Considers additional attributes like author order or role"
      ]
    },
    {
      type: "normalization-exercise",
      question: "Normalize this table to 3NF:\n\nStudent_Course_Info:\nstudent_id, student_name, student_email, course_id, course_name, instructor_name, instructor_email, grade\n\nSample data shows that multiple students can take the same course, and the same instructor teaches multiple courses.",
      correctAnswer: "Create separate tables: Students (student_id, student_name, student_email), Courses (course_id, course_name, instructor_id), Instructors (instructor_id, instructor_name, instructor_email), and Enrollments (student_id, course_id, grade)",
      explanation: "This eliminates redundancy by separating entities and their attributes, with proper foreign key relationships."
    },
    {
      type: "design-challenge",
      question: "Design a data model for an online food delivery system. Consider restaurants, menus, customers, orders, delivery drivers, and payments. Identify at least 6 entities and their key relationships.",
      rubric: [
        "Identifies core entities (Restaurant, Customer, Order, MenuItem, Driver, Payment)",
        "Defines appropriate attributes for each entity",
        "Correctly models relationships (1:M, M:N) between entities",
        "Considers junction tables where needed (OrderItems)",
        "Includes important business rules and constraints",
        "Addresses scalability and performance considerations"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Design a Social Network Data Model",
      description: "Create a comprehensive data model for a social networking platform including users, posts, comments, likes, follows, and groups.",
      difficulty: "hard",
      hints: ["Consider privacy settings", "Think about different types of content", "Model complex relationships like mutual follows"]
    },
    {
      title: "E-commerce Inventory Management",
      description: "Design a data model for tracking product inventory across multiple warehouses, including stock levels, transfers, and reservations.",
      difficulty: "medium",
      hints: ["Track inventory movements", "Consider product variants", "Handle backorders and reservations"]
    },
    {
      title: "Healthcare Patient Records System",
      description: "Model a system for managing patient records, appointments, treatments, prescriptions, and medical history while ensuring privacy compliance.",
      difficulty: "hard",
      hints: ["Consider HIPAA compliance", "Model complex medical relationships", "Handle recurring appointments"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Entity",
      definition: "A real-world object or concept that can be distinctly identified and about which data is stored"
    },
    {
      term: "Attribute",
      definition: "A property or characteristic of an entity that describes some aspect of the entity"
    },
    {
      term: "Primary Key",
      definition: "A unique identifier for each record in a table that cannot be null"
    },
    {
      term: "Foreign Key",
      definition: "A field that creates a link between two tables by referencing the primary key of another table"
    },
    {
      term: "Normalization",
      definition: "The process of organizing data to minimize redundancy and dependency"
    },
    {
      term: "Junction Table",
      definition: "A table used to resolve many-to-many relationships between two entities"
    },
    {
      term: "Cardinality",
      definition: "The numerical relationship between entities, such as one-to-one, one-to-many, or many-to-many"
    },
    {
      term: "Data Integrity",
      definition: "The accuracy, consistency, and reliability of data throughout its lifecycle"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of basic data types and structures",
    "Familiarity with logical thinking and problem-solving",
    "Basic knowledge of business processes and requirements",
    "Understanding of relationships and dependencies"
  ],
  
  nextSteps: [
    "Learn database design and SQL implementation",
    "Study advanced normalization techniques",
    "Explore NoSQL and modern data modeling approaches",
    "Practice with real-world data modeling scenarios",
    "Learn about data warehousing and dimensional modeling"
  ]
};