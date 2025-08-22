// Lesson 2.2: Databases - Comprehensive lesson content

export default {
  title: "Databases",
  description: "Master database concepts, SQL fundamentals, and database management systems for effective data storage and retrieval",
  difficulty: "intermediate",
  estimatedTime: "80 minutes",
  
  // Learning objectives
  objectives: [
    "Understand database concepts and terminology",
    "Learn SQL fundamentals for data manipulation",
    "Master database design principles and best practices",
    "Explore different types of database management systems",
    "Apply database security and optimization techniques"
  ],
  
  // Main lesson content
  content: `
    <h2>What is a Database?</h2>
    <p>A <strong>database</strong> is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a <strong>database management system (DBMS)</strong>.</p>
    
    <p>Key characteristics of databases:</p>
    <ul>
      <li><strong>Organized:</strong> Data is structured in a logical, systematic way</li>
      <li><strong>Persistent:</strong> Data survives beyond the execution of programs</li>
      <li><strong>Shared:</strong> Multiple users and applications can access the same data</li>
      <li><strong>Concurrent:</strong> Multiple operations can occur simultaneously</li>
      <li><strong>Secure:</strong> Access controls protect sensitive information</li>
      <li><strong>Reliable:</strong> Data integrity is maintained through constraints and transactions</li>
    </ul>
    
    <h2>Database Management Systems (DBMS)</h2>
    
    <h3>Types of Database Systems</h3>
    <pre><code>BEGIN Database_Types_Overview
    DISPLAY "=== DATABASE MANAGEMENT SYSTEMS ==="
    
    // Relational Databases (RDBMS)
    SET relational_databases = [
        {name: "MySQL", type: "Open Source", use_case: "Web applications, small to medium businesses"},
        {name: "PostgreSQL", type: "Open Source", use_case: "Complex applications, data analytics"},
        {name: "Oracle Database", type: "Commercial", use_case: "Enterprise applications, large corporations"},
        {name: "Microsoft SQL Server", type: "Commercial", use_case: "Windows environments, enterprise solutions"},
        {name: "SQLite", type: "Embedded", use_case: "Mobile apps, small applications"}
    ]
    
    DISPLAY "\nRELATIONAL DATABASES (RDBMS):"
    DISPLAY "Characteristics: Tables with rows and columns, ACID properties, SQL queries"
    
    FOR each db IN relational_databases
        DISPLAY "  • " + db["name"] + " (" + db["type"] + "): " + db["use_case"]
    ENDFOR
    
    // NoSQL Databases
    SET nosql_databases = [
        {name: "MongoDB", type: "Document", use_case: "Content management, real-time analytics"},
        {name: "Redis", type: "Key-Value", use_case: "Caching, session storage, real-time applications"},
        {name: "Cassandra", type: "Column-Family", use_case: "Big data, high-write applications"},
        {name: "Neo4j", type: "Graph", use_case: "Social networks, recommendation engines"}
    ]
    
    DISPLAY "\nNOSQL DATABASES:"
    DISPLAY "Characteristics: Flexible schema, horizontal scaling, various data models"
    
    FOR each db IN nosql_databases
        DISPLAY "  • " + db["name"] + " (" + db["type"] + "): " + db["use_case"]
    ENDFOR
    
    // Cloud Databases
    SET cloud_databases = [
        {name: "Amazon RDS", provider: "AWS", type: "Managed Relational"},
        {name: "Google Cloud SQL", provider: "Google Cloud", type: "Managed Relational"},
        {name: "Azure SQL Database", provider: "Microsoft Azure", type: "Managed Relational"},
        {name: "Amazon DynamoDB", provider: "AWS", type: "Managed NoSQL"}
    ]
    
    DISPLAY "\nCLOUD DATABASES:"
    DISPLAY "Characteristics: Managed services, automatic scaling, high availability"
    
    FOR each db IN cloud_databases
        DISPLAY "  • " + db["name"] + " (" + db["provider"] + "): " + db["type"]
    ENDFOR
END</code></pre>
    
    <h2>SQL Fundamentals</h2>
    
    <h3>Data Definition Language (DDL)</h3>
    <p>DDL commands define and modify database structure.</p>
    
    <pre><code>BEGIN SQL_DDL_Examples
    DISPLAY "=== DATA DEFINITION LANGUAGE (DDL) ==="
    DISPLAY "Example: Creating a University Database"
    
    // Create Database
    DISPLAY "\n--- CREATE DATABASE ---"
    SET create_database_sql = "
        CREATE DATABASE university_db
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;
    "
    DISPLAY "SQL Command:"
    DISPLAY create_database_sql
    
    // Create Tables
    DISPLAY "\n--- CREATE TABLES ---"
    
    SET create_students_table = "
        CREATE TABLE students (
            student_id INT PRIMARY KEY AUTO_INCREMENT,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            date_of_birth DATE NOT NULL,
            enrollment_date DATE DEFAULT CURRENT_DATE,
            gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    "
    
    DISPLAY "Creating Students Table:"
    DISPLAY create_students_table
    
    SET create_courses_table = "
        CREATE TABLE courses (
            course_id VARCHAR(10) PRIMARY KEY,
            course_name VARCHAR(100) NOT NULL,
            description TEXT,
            credits INT NOT NULL CHECK (credits > 0 AND credits <= 6),
            department VARCHAR(50) NOT NULL,
            max_enrollment INT DEFAULT 30,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    "
    
    DISPLAY "\nCreating Courses Table:"
    DISPLAY create_courses_table
    
    SET create_enrollments_table = "
        CREATE TABLE enrollments (
            enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
            student_id INT NOT NULL,
            course_id VARCHAR(10) NOT NULL,
            enrollment_date DATE DEFAULT CURRENT_DATE,
            grade CHAR(2) CHECK (grade IN ('A', 'B', 'C', 'D', 'F', 'W')),
            status ENUM('enrolled', 'completed', 'dropped') DEFAULT 'enrolled',
            FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
            FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
            UNIQUE KEY unique_enrollment (student_id, course_id)
        );
    "
    
    DISPLAY "\nCreating Enrollments Table (with Foreign Keys):"
    DISPLAY create_enrollments_table
    
    // Alter Table Examples
    DISPLAY "\n--- ALTER TABLE ---"
    
    SET alter_examples = [
        "ALTER TABLE students ADD COLUMN phone VARCHAR(15);",
        "ALTER TABLE courses MODIFY COLUMN description TEXT NOT NULL;",
        "ALTER TABLE students DROP COLUMN phone;",
        "CREATE INDEX idx_student_email ON students(email);",
        "CREATE INDEX idx_enrollment_date ON enrollments(enrollment_date);"
    ]
    
    DISPLAY "Common ALTER TABLE operations:"
    FOR each sql IN alter_examples
        DISPLAY "  " + sql
    ENDFOR
    
    // Drop Examples
    DISPLAY "\n--- DROP STATEMENTS ---"
    DISPLAY "DROP INDEX idx_student_email ON students;  -- Remove index"
    DISPLAY "DROP TABLE enrollments;                     -- Remove table (with dependencies first)"
    DISPLAY "DROP DATABASE university_db;               -- Remove entire database"
END</code></pre>
    
    <h3>Data Manipulation Language (DML)</h3>
    <p>DML commands manipulate data within database tables.</p>
    
    <pre><code>BEGIN SQL_DML_Examples
    DISPLAY "=== DATA MANIPULATION LANGUAGE (DML) ==="
    
    // INSERT Examples
    DISPLAY "\n--- INSERT DATA ---"
    
    SET insert_students = "
        INSERT INTO students (first_name, last_name, email, date_of_birth, gpa)
        VALUES 
            ('Alice', 'Johnson', 'alice.johnson@university.edu', '2002-03-15', 3.75),
            ('Bob', 'Smith', 'bob.smith@university.edu', '2001-07-22', 3.20),
            ('Carol', 'Davis', 'carol.davis@university.edu', '2002-11-08', 3.90),
            ('David', 'Wilson', 'david.wilson@university.edu', '2001-12-03', 2.85);
    "
    
    DISPLAY "Inserting Students:"
    DISPLAY insert_students
    
    SET insert_courses = "
        INSERT INTO courses (course_id, course_name, description, credits, department)
        VALUES 
            ('CS101', 'Introduction to Programming', 'Basic programming concepts using Python', 3, 'Computer Science'),
            ('MATH201', 'Calculus II', 'Integral calculus and applications', 4, 'Mathematics'),
            ('ENG102', 'English Composition', 'Academic writing and research skills', 3, 'English'),
            ('HIST150', 'World History', 'Survey of world civilizations', 3, 'History');
    "
    
    DISPLAY "\nInserting Courses:"
    DISPLAY insert_courses
    
    // SELECT Examples
    DISPLAY "\n--- SELECT QUERIES ---"
    
    SET select_examples = [
        {
            description: "Basic SELECT - All students",
            sql: "SELECT * FROM students;"
        },
        {
            description: "SELECT with specific columns",
            sql: "SELECT first_name, last_name, email, gpa FROM students;"
        },
        {
            description: "SELECT with WHERE clause",
            sql: "SELECT * FROM students WHERE gpa > 3.5;"
        },
        {
            description: "SELECT with ORDER BY",
            sql: "SELECT first_name, last_name, gpa FROM students ORDER BY gpa DESC;"
        },
        {
            description: "SELECT with LIMIT",
            sql: "SELECT * FROM students ORDER BY gpa DESC LIMIT 3;"
        }
    ]
    
    FOR each example IN select_examples
        DISPLAY "\n" + example["description"] + ":"
        DISPLAY example["sql"]
    ENDFOR
    
    // Advanced SELECT with JOINs
    DISPLAY "\n--- JOINS ---"
    
    SET join_examples = [
        {
            type: "INNER JOIN",
            description: "Students and their enrollments",
            sql: "
                SELECT s.first_name, s.last_name, c.course_name, e.grade
                FROM students s
                INNER JOIN enrollments e ON s.student_id = e.student_id
                INNER JOIN courses c ON e.course_id = c.course_id;
            "
        },
        {
            type: "LEFT JOIN",
            description: "All students, including those not enrolled",
            sql: "
                SELECT s.first_name, s.last_name, c.course_name
                FROM students s
                LEFT JOIN enrollments e ON s.student_id = e.student_id
                LEFT JOIN courses c ON e.course_id = c.course_id;
            "
        },
        {
            type: "GROUP BY with aggregation",
            description: "Count enrollments per student",
            sql: "
                SELECT s.first_name, s.last_name, COUNT(e.enrollment_id) as enrollment_count
                FROM students s
                LEFT JOIN enrollments e ON s.student_id = e.student_id
                GROUP BY s.student_id, s.first_name, s.last_name
                ORDER BY enrollment_count DESC;
            "
        }
    ]
    
    FOR each join IN join_examples
        DISPLAY "\n" + join["type"] + " - " + join["description"] + ":"
        DISPLAY join["sql"]
    ENDFOR
    
    // UPDATE Examples
    DISPLAY "\n--- UPDATE DATA ---"
    
    SET update_examples = [
        "UPDATE students SET gpa = 3.85 WHERE student_id = 1;",
        "UPDATE students SET is_active = FALSE WHERE gpa < 2.0;",
        "UPDATE enrollments SET grade = 'A', status = 'completed' WHERE student_id = 1 AND course_id = 'CS101';"
    ]
    
    DISPLAY "Update Examples:"
    FOR each sql IN update_examples
        DISPLAY "  " + sql
    ENDFOR
    
    // DELETE Examples
    DISPLAY "\n--- DELETE DATA ---"
    
    SET delete_examples = [
        "DELETE FROM enrollments WHERE status = 'dropped';",
        "DELETE FROM students WHERE is_active = FALSE AND enrollment_date < '2020-01-01';"
    ]
    
    DISPLAY "Delete Examples (use with caution!):"
    FOR each sql IN delete_examples
        DISPLAY "  " + sql
    ENDFOR
END</code></pre>
    
    <h2>Database Design Principles</h2>
    
    <h3>ACID Properties</h3>
    <p>ACID properties ensure database reliability and consistency.</p>
    
    <pre><code>BEGIN ACID_Properties_Example
    DISPLAY "=== ACID PROPERTIES ==="
    DISPLAY "Example: Bank Transfer Transaction"
    
    // Atomicity Example
    DISPLAY "\n--- ATOMICITY ---"
    DISPLAY "Definition: All operations in a transaction succeed or all fail"
    
    SET transfer_transaction = "
        BEGIN TRANSACTION;
        
        -- Deduct from source account
        UPDATE accounts 
        SET balance = balance - 500.00 
        WHERE account_id = 'ACC001';
        
        -- Add to destination account
        UPDATE accounts 
        SET balance = balance + 500.00 
        WHERE account_id = 'ACC002';
        
        -- Check if both operations succeeded
        IF @@ERROR = 0 THEN
            COMMIT TRANSACTION;  -- Make changes permanent
        ELSE
            ROLLBACK TRANSACTION;  -- Undo all changes
        END IF;
    "
    
    DISPLAY "Bank Transfer Transaction (Atomic):"
    DISPLAY transfer_transaction
    DISPLAY "Result: Either both accounts are updated, or neither is changed"
    
    // Consistency Example
    DISPLAY "\n--- CONSISTENCY ---"
    DISPLAY "Definition: Database remains in a valid state before and after transaction"
    
    SET consistency_rules = [
        "Account balance cannot be negative (CHECK constraint)",
        "Total money in system remains constant (business rule)",
        "Foreign key relationships are maintained",
        "Data types and formats are enforced"
    ]
    
    DISPLAY "Consistency Rules in Banking System:"
    FOR each rule IN consistency_rules
        DISPLAY "  • " + rule
    ENDFOR
    
    // Isolation Example
    DISPLAY "\n--- ISOLATION ---"
    DISPLAY "Definition: Concurrent transactions don't interfere with each other"
    
    SET isolation_levels = [
        {level: "READ UNCOMMITTED", description: "Lowest isolation, allows dirty reads"},
        {level: "READ COMMITTED", description: "Prevents dirty reads, allows non-repeatable reads"},
        {level: "REPEATABLE READ", description: "Prevents dirty and non-repeatable reads"},
        {level: "SERIALIZABLE", description: "Highest isolation, prevents all phenomena"}
    ]
    
    DISPLAY "SQL Isolation Levels:"
    FOR each level IN isolation_levels
        DISPLAY "  • " + level["level"] + ": " + level["description"]
    ENDFOR
    
    // Durability Example
    DISPLAY "\n--- DURABILITY ---"
    DISPLAY "Definition: Committed transactions survive system failures"
    
    SET durability_mechanisms = [
        "Transaction logs record all changes before they're applied",
        "Write-ahead logging ensures recovery is possible",
        "Database backups provide additional protection",
        "Replication maintains copies across multiple servers"
    ]
    
    DISPLAY "Durability Mechanisms:"
    FOR each mechanism IN durability_mechanisms
        DISPLAY "  • " + mechanism
    ENDFOR
END</code></pre>
    
    <h3>Database Security</h3>
    <pre><code>BEGIN Database_Security_Practices
    DISPLAY "=== DATABASE SECURITY ==="
    
    // User Management and Access Control
    DISPLAY "\n--- USER MANAGEMENT ---"
    
    SET user_management_sql = [
        "-- Create database users",
        "CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password123!';",
        "CREATE USER 'read_only_user'@'%' IDENTIFIED BY 'readonly_pass456!';",
        "CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_secure789!';",
        "",
        "-- Grant specific privileges",
        "GRANT SELECT, INSERT, UPDATE, DELETE ON university_db.* TO 'app_user'@'localhost';",
        "GRANT SELECT ON university_db.* TO 'read_only_user'@'%';",
        "GRANT ALL PRIVILEGES ON university_db.* TO 'admin_user'@'localhost';",
        "",
        "-- Apply changes",
        "FLUSH PRIVILEGES;"
    ]
    
    FOR each sql IN user_management_sql
        DISPLAY sql
    ENDFOR
    
    // SQL Injection Prevention
    DISPLAY "\n--- SQL INJECTION PREVENTION ---"
    
    DISPLAY "\nVULNERABLE CODE (DON'T DO THIS):"
    SET vulnerable_code = "
        // Dangerous: Direct string concatenation
        String query = \"SELECT * FROM students WHERE email = '\" + userInput + \"'\";
        Statement stmt = connection.createStatement();
        ResultSet rs = stmt.executeQuery(query);
    "
    DISPLAY vulnerable_code
    
    DISPLAY "\nSECURE CODE (USE PREPARED STATEMENTS):"
    SET secure_code = "
        // Safe: Using prepared statements with parameters
        String query = \"SELECT * FROM students WHERE email = ?\";
        PreparedStatement pstmt = connection.prepareStatement(query);
        pstmt.setString(1, userInput);  // Automatically escaped
        ResultSet rs = pstmt.executeQuery();
    "
    DISPLAY secure_code
    
    // Data Encryption
    DISPLAY "\n--- DATA ENCRYPTION ---"
    
    SET encryption_examples = [
        "-- Encrypt sensitive data at rest",
        "ALTER TABLE students ADD COLUMN ssn_encrypted VARBINARY(256);",
        "",
        "-- Store encrypted data",
        "UPDATE students SET ssn_encrypted = AES_ENCRYPT('123-45-6789', 'encryption_key') WHERE student_id = 1;",
        "",
        "-- Retrieve and decrypt data",
        "SELECT student_id, first_name, AES_DECRYPT(ssn_encrypted, 'encryption_key') as ssn FROM students;"
    ]
    
    FOR each sql IN encryption_examples
        DISPLAY sql
    ENDFOR
    
    // Security Best Practices
    DISPLAY "\n--- SECURITY BEST PRACTICES ---"
    
    SET security_practices = [
        "Use strong, unique passwords for database accounts",
        "Implement principle of least privilege (minimal necessary access)",
        "Regularly update database software and apply security patches",
        "Enable database audit logging for sensitive operations",
        "Use SSL/TLS encryption for data in transit",
        "Implement database firewalls and network segmentation",
        "Regular security assessments and penetration testing",
        "Backup encryption and secure backup storage",
        "Monitor for unusual database activity and access patterns"
    ]
    
    FOR each practice IN security_practices
        DISPLAY "  ✓ " + practice
    ENDFOR
END</code></pre>
    
    <h2>Database Performance Optimization</h2>
    
    <h3>Indexing Strategies</h3>
    <pre><code>BEGIN Database_Indexing
    DISPLAY "=== DATABASE INDEXING ==="
    
    // Index Types and Examples
    DISPLAY "\n--- INDEX TYPES ---"
    
    SET index_examples = [
        {
            type: "Primary Index",
            sql: "-- Automatically created with PRIMARY KEY\nCREATE TABLE students (student_id INT PRIMARY KEY, ...);",
            use_case: "Unique identification and fast lookups"
        },
        {
            type: "Unique Index",
            sql: "CREATE UNIQUE INDEX idx_student_email ON students(email);",
            use_case: "Enforce uniqueness and fast lookups on email"
        },
        {
            type: "Composite Index",
            sql: "CREATE INDEX idx_name_gpa ON students(last_name, first_name, gpa);",
            use_case: "Queries filtering by multiple columns"
        },
        {
            type: "Partial Index",
            sql: "CREATE INDEX idx_active_students ON students(enrollment_date) WHERE is_active = TRUE;",
            use_case: "Index only subset of data to save space"
        },
        {
            type: "Full-Text Index",
            sql: "CREATE FULLTEXT INDEX idx_course_description ON courses(description);",
            use_case: "Text search within course descriptions"
        }
    ]
    
    FOR each index IN index_examples
        DISPLAY "\n" + index["type"] + ":"
        DISPLAY index["sql"]
        DISPLAY "Use Case: " + index["use_case"]
    ENDFOR
    
    // Query Optimization Examples
    DISPLAY "\n--- QUERY OPTIMIZATION ---"
    
    SET optimization_examples = [
        {
            problem: "Slow query without index",
            bad_query: "SELECT * FROM students WHERE last_name = 'Smith';",
            solution: "Create index on last_name column",
            good_query: "CREATE INDEX idx_last_name ON students(last_name);\nSELECT * FROM students WHERE last_name = 'Smith';"
        },
        {
            problem: "Inefficient JOIN without proper indexes",
            bad_query: "SELECT s.*, c.course_name FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;",
            solution: "Ensure foreign key columns are indexed",
            good_query: "CREATE INDEX idx_enrollment_student ON enrollments(student_id);\nCREATE INDEX idx_enrollment_course ON enrollments(course_id);"
        },
        {
            problem: "Using SELECT * instead of specific columns",
            bad_query: "SELECT * FROM students WHERE gpa > 3.5;",
            solution: "Select only needed columns",
            good_query: "SELECT student_id, first_name, last_name, gpa FROM students WHERE gpa > 3.5;"
        }
    ]
    
    FOR each opt IN optimization_examples
        DISPLAY "\nProblem: " + opt["problem"]
        DISPLAY "Inefficient: " + opt["bad_query"]
        DISPLAY "Solution: " + opt["solution"]
        DISPLAY "Optimized: " + opt["good_query"]
    ENDFOR
    
    // Performance Monitoring
    DISPLAY "\n--- PERFORMANCE MONITORING ---"
    
    SET monitoring_queries = [
        "-- Analyze query execution plan",
        "EXPLAIN SELECT * FROM students WHERE gpa > 3.5;",
        "",
        "-- Show slow queries (MySQL)",
        "SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;",
        "",
        "-- Check index usage",
        "SHOW INDEX FROM students;",
        "",
        "-- Monitor database performance",
        "SHOW PROCESSLIST;  -- Current running queries",
        "SHOW STATUS LIKE 'Slow_queries';  -- Count of slow queries"
    ]
    
    FOR each query IN monitoring_queries
        DISPLAY query
    ENDFOR
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "sql-query-builder",
      title: "Build SQL Queries",
      description: "Practice writing SQL queries for different scenarios.",
      exercises: [
        {
          scenario: "Find all students with GPA above 3.5",
          tables: ["students"],
          expectedQuery: "SELECT * FROM students WHERE gpa > 3.5;",
          difficulty: "easy"
        },
        {
          scenario: "List course names and enrollment counts",
          tables: ["courses", "enrollments"],
          expectedQuery: "SELECT c.course_name, COUNT(e.student_id) as enrollment_count FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.course_id, c.course_name;",
          difficulty: "medium"
        },
        {
          scenario: "Find students enrolled in Computer Science courses",
          tables: ["students", "enrollments", "courses"],
          expectedQuery: "SELECT DISTINCT s.first_name, s.last_name FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE c.department = 'Computer Science';",
          difficulty: "hard"
        }
      ]
    },
    {
      type: "database-design-tool",
      title: "Design Database Schema",
      description: "Create tables and relationships for different business scenarios.",
      scenarios: [
        {
          domain: "Online Bookstore",
          requirements: "Track books, authors, customers, orders, and inventory",
          expectedTables: ["books", "authors", "book_authors", "customers", "orders", "order_items"]
        },
        {
          domain: "Hospital Management",
          requirements: "Manage patients, doctors, appointments, and treatments",
          expectedTables: ["patients", "doctors", "appointments", "treatments", "medical_records"]
        }
      ]
    },
    {
      type: "sql-injection-detector",
      title: "Identify Security Vulnerabilities",
      description: "Spot and fix SQL injection vulnerabilities in code.",
      codeExamples: [
        {
          code: "query = 'SELECT * FROM users WHERE username = \'' + username + \'''",
          vulnerable: true,
          fix: "Use prepared statements with parameterized queries"
        },
        {
          code: "PreparedStatement pstmt = conn.prepareStatement('SELECT * FROM users WHERE username = ?'); pstmt.setString(1, username);",
          vulnerable: false,
          explanation: "Properly uses prepared statements"
        }
      ]
    },
    {
      type: "index-optimizer",
      title: "Optimize Database Performance",
      description: "Choose appropriate indexes for different query patterns.",
      queryPatterns: [
        {
          query: "SELECT * FROM orders WHERE customer_id = ? AND order_date > ?",
          recommendedIndex: "CREATE INDEX idx_customer_date ON orders(customer_id, order_date);",
          explanation: "Composite index supports both filter conditions"
        },
        {
          query: "SELECT * FROM products WHERE name LIKE '%search_term%'",
          recommendedIndex: "CREATE FULLTEXT INDEX idx_product_name ON products(name);",
          explanation: "Full-text index better for text search than LIKE with wildcards"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "History and Evolution of Databases",
      content: `
        <p>The evolution of database systems reflects the changing needs of data management:</p>
        
        <h4>1960s - File Systems</h4>
        <p>Early computing relied on flat files with custom programs for data access. This approach led to data redundancy, inconsistency, and maintenance challenges.</p>
        
        <h4>1970s - Hierarchical and Network Models</h4>
        <p>IBM's IMS introduced hierarchical databases, while CODASYL developed the network model. These provided better organization but were complex to navigate and maintain.</p>
        
        <h4>1970s-1980s - Relational Revolution</h4>
        <p>Edgar Codd's relational model transformed database management. SQL became the standard query language, and systems like Oracle, DB2, and later MySQL emerged.</p>
        
        <h4>1990s - Object-Oriented Databases</h4>
        <p>As object-oriented programming gained popularity, object databases attempted to store complex objects directly. However, they never achieved widespread adoption.</p>
        
        <h4>2000s - Data Warehousing and OLAP</h4>
        <p>Business intelligence needs drove the development of data warehouses and Online Analytical Processing (OLAP) systems for complex analytics.</p>
        
        <h4>2010s - NoSQL and Big Data</h4>
        <p>Web-scale applications and big data requirements led to NoSQL databases offering flexible schemas and horizontal scaling capabilities.</p>
        
        <h4>2020s - Multi-Model and Cloud-Native</h4>
        <p>Modern databases often support multiple data models within a single system, with cloud-native architectures providing unprecedented scalability and availability.</p>
      `
    },
    {
      title: "Database Design Best Practices",
      content: `
        <p>Effective database design requires careful planning and adherence to proven principles:</p>
        
        <h4>Planning and Analysis</h4>
        <ul>
          <li><strong>Requirements Gathering:</strong> Understand business needs, data relationships, and usage patterns</li>
          <li><strong>Conceptual Design:</strong> Create entity-relationship diagrams to model the problem domain</li>
          <li><strong>Logical Design:</strong> Transform the conceptual model into a database schema</li>
          <li><strong>Physical Design:</strong> Optimize for performance, storage, and access patterns</li>
        </ul>
        
        <h4>Design Principles</h4>
        <ul>
          <li><strong>Normalization:</strong> Eliminate redundancy while maintaining data integrity</li>
          <li><strong>Consistency:</strong> Use consistent naming conventions and data types</li>
          <li><strong>Scalability:</strong> Design for future growth in data volume and user load</li>
          <li><strong>Security:</strong> Implement appropriate access controls and data protection</li>
        </ul>
        
        <h4>Performance Considerations</h4>
        <ul>
          <li><strong>Indexing Strategy:</strong> Create indexes based on query patterns</li>
          <li><strong>Query Optimization:</strong> Write efficient queries and avoid common pitfalls</li>
          <li><strong>Partitioning:</strong> Divide large tables for better performance</li>
          <li><strong>Caching:</strong> Implement appropriate caching strategies</li>
        </ul>
        
        <h4>Maintenance and Evolution</h4>
        <ul>
          <li><strong>Documentation:</strong> Maintain comprehensive database documentation</li>
          <li><strong>Version Control:</strong> Track schema changes and migrations</li>
          <li><strong>Monitoring:</strong> Continuously monitor performance and usage patterns</li>
          <li><strong>Backup and Recovery:</strong> Implement robust backup and disaster recovery procedures</li>
        </ul>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which SQL command is used to modify the structure of an existing table?",
      options: ["UPDATE", "MODIFY", "ALTER TABLE", "CHANGE TABLE"],
      correct: 2,
      explanation: "ALTER TABLE is the DDL command used to modify table structure, such as adding, dropping, or modifying columns."
    },
    {
      type: "sql-writing",
      question: "Write a SQL query to find all students who are enrolled in more than 2 courses. Include the student's name and the count of their enrollments.",
      sampleAnswer: "SELECT s.first_name, s.last_name, COUNT(e.course_id) as course_count FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.first_name, s.last_name HAVING COUNT(e.course_id) > 2;",
      rubric: [
        "Uses appropriate JOIN to connect students and enrollments",
        "Groups by student to aggregate enrollments",
        "Uses HAVING clause to filter groups (not WHERE)",
        "Includes student name and enrollment count in SELECT",
        "Correctly counts enrollments per student"
      ]
    },
    {
      type: "scenario-based",
      question: "You're designing a database for an e-commerce platform. Explain how you would handle the relationship between products and categories, considering that a product can belong to multiple categories and categories can have subcategories.",
      sampleAnswer: "Create separate tables: Products, Categories, and ProductCategories (junction table). Categories table should have a parent_category_id field for hierarchical structure. ProductCategories table contains product_id and category_id foreign keys to handle the many-to-many relationship.",
      rubric: [
        "Identifies the many-to-many relationship between products and categories",
        "Suggests using a junction table to resolve M:N relationship",
        "Addresses hierarchical category structure with self-referencing foreign key",
        "Considers normalization and data integrity",
        "Explains the table structure clearly"
      ]
    },
    {
      type: "security-analysis",
      question: "Identify three security vulnerabilities in this code and explain how to fix them:\n\n```\nString userInput = request.getParameter('search');\nString query = \"SELECT * FROM products WHERE name LIKE '%\" + userInput + \"%'\";\nStatement stmt = connection.createStatement();\nResultSet rs = stmt.executeQuery(query);\n```",
      correctAnswer: "1) SQL Injection: Use prepared statements with parameters. 2) No input validation: Validate and sanitize user input. 3) Overprivileged query: Use specific columns instead of SELECT *.",
      explanation: "The code is vulnerable to SQL injection attacks and lacks proper input validation and query optimization."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Design a Library Management System Database",
      description: "Create a complete database schema for a library system including books, authors, members, loans, and reservations.",
      difficulty: "medium",
      hints: ["Consider book copies vs book titles", "Handle overdue books and fines", "Track reservation queues"]
    },
    {
      title: "Optimize Slow Database Queries",
      description: "Given a set of slow-performing queries, identify bottlenecks and create appropriate indexes and query optimizations.",
      difficulty: "hard",
      hints: ["Use EXPLAIN to analyze query plans", "Consider composite indexes", "Look for unnecessary JOINs"]
    },
    {
      title: "Implement Database Security Measures",
      description: "Design and implement a comprehensive security strategy for a financial database including user roles, encryption, and audit logging.",
      difficulty: "hard",
      hints: ["Apply principle of least privilege", "Encrypt sensitive data", "Implement audit trails"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "ACID",
      definition: "Atomicity, Consistency, Isolation, Durability - properties that guarantee database transaction reliability"
    },
    {
      term: "SQL",
      definition: "Structured Query Language - standard language for managing and manipulating relational databases"
    },
    {
      term: "Primary Key",
      definition: "A unique identifier for each record in a database table that cannot be null"
    },
    {
      term: "Foreign Key",
      definition: "A field that creates a link between two tables by referencing the primary key of another table"
    },
    {
      term: "Index",
      definition: "A database structure that improves query performance by creating shortcuts to data"
    },
    {
      term: "Normalization",
      definition: "The process of organizing database tables to minimize redundancy and dependency"
    },
    {
      term: "Transaction",
      definition: "A sequence of database operations that are treated as a single unit of work"
    },
    {
      term: "SQL Injection",
      definition: "A security vulnerability where malicious SQL code is inserted into application queries"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of data modeling concepts",
    "Basic knowledge of logical relationships",
    "Familiarity with data types and structures",
    "Understanding of business requirements analysis"
  ],
  
  nextSteps: [
    "Learn advanced SQL techniques and stored procedures",
    "Explore NoSQL databases and their use cases",
    "Study database administration and maintenance",
    "Practice with real-world database projects",
    "Learn about data warehousing and business intelligence"
  ]
};