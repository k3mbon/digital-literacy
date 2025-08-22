// Lesson 1.6: Validation - Comprehensive lesson content

export default {
  title: "Validation",
  description: "Master input validation and error checking for robust program design",
  difficulty: "intermediate",
  estimatedTime: "50 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the importance of input validation in programming",
    "Learn different types of validation: range, format, type, and business rule validation",
    "Master validation techniques and error handling strategies",
    "Implement user-friendly error messages and recovery mechanisms",
    "Apply validation in real-world scenarios and form processing"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Validation?</h2>
    <p><strong>Validation</strong> is the process of checking whether input data meets specified criteria before processing it. It's a critical aspect of programming that ensures data integrity, prevents errors, and improves user experience.</p>
    
    <p>Validation is essential because:</p>
    <ul>
      <li><strong>Prevents crashes:</strong> Invalid data can cause programs to fail unexpectedly</li>
      <li><strong>Ensures data quality:</strong> Maintains consistency and accuracy in data processing</li>
      <li><strong>Improves security:</strong> Prevents malicious input from compromising the system</li>
      <li><strong>Enhances user experience:</strong> Provides clear feedback when input is incorrect</li>
      <li><strong>Maintains business rules:</strong> Ensures data conforms to organizational requirements</li>
    </ul>
    
    <h2>Types of Validation</h2>
    
    <h3>1. Type Validation</h3>
    <p>Ensures input matches the expected data type (number, text, boolean, etc.).</p>
    
    <h4>Basic Type Validation:</h4>
    <pre><code>BEGIN Validate_Number_Input
    DISPLAY "Enter your age: "
    read user_input
    
    IF is_numeric(user_input) THEN
        SET age = convert_to_number(user_input)
        DISPLAY "Age entered: " + age
    ELSE
        DISPLAY "Error: Please enter a valid number"
        // Could loop back to ask again
    ENDIF
END</code></pre>
    
    <h4>Advanced Type Validation with Conversion:</h4>
    <pre><code>FUNCTION Get_Valid_Integer(prompt, min_value, max_value)
    SET valid_input = FALSE
    SET result = 0
    
    WHILE NOT valid_input
        DISPLAY prompt
        read user_input
        
        IF is_numeric(user_input) THEN
            SET result = convert_to_integer(user_input)
            
            IF result >= min_value AND result <= max_value THEN
                SET valid_input = TRUE
            ELSE
                DISPLAY "Error: Number must be between " + min_value + " and " + max_value
            ENDIF
        ELSE
            DISPLAY "Error: Please enter a valid integer"
        ENDIF
    ENDWHILE
    
    RETURN result
END FUNCTION</code></pre>
    
    <h3>2. Range Validation</h3>
    <p>Checks if numeric input falls within acceptable minimum and maximum values.</p>
    
    <h4>Simple Range Validation:</h4>
    <pre><code>BEGIN Validate_Test_Score
    DISPLAY "Enter test score (0-100): "
    read score
    
    IF score >= 0 AND score <= 100 THEN
        DISPLAY "Valid score: " + score
        
        // Determine grade
        IF score >= 90 THEN
            DISPLAY "Grade: A"
        ELSE IF score >= 80 THEN
            DISPLAY "Grade: B"
        ELSE IF score >= 70 THEN
            DISPLAY "Grade: C"
        ELSE IF score >= 60 THEN
            DISPLAY "Grade: D"
        ELSE
            DISPLAY "Grade: F"
        ENDIF
    ELSE
        DISPLAY "Error: Score must be between 0 and 100"
    ENDIF
END</code></pre>
    
    <h4>Complex Range Validation:</h4>
    <pre><code>BEGIN Validate_Date_Range
    DISPLAY "Enter birth year: "
    read birth_year
    SET current_year = get_current_year()
    SET min_year = current_year - 120  // Reasonable maximum age
    SET max_year = current_year - 13   // Minimum age for account
    
    IF birth_year >= min_year AND birth_year <= max_year THEN
        SET age = current_year - birth_year
        DISPLAY "Age: " + age + " years"
        DISPLAY "Eligible for account creation"
    ELSE IF birth_year > max_year THEN
        DISPLAY "Error: Must be at least 13 years old"
    ELSE
        DISPLAY "Error: Please enter a valid birth year"
    ENDIF
END</code></pre>
    
    <h3>3. Format Validation</h3>
    <p>Ensures input follows a specific pattern or format (email, phone number, postal code, etc.).</p>
    
    <h4>Email Format Validation:</h4>
    <pre><code>FUNCTION Validate_Email(email)
    SET is_valid = FALSE
    
    // Basic email validation checks
    IF length(email) > 0 THEN
        IF contains(email, "@") THEN
            SET parts = split(email, "@")
            
            IF length(parts) = 2 THEN
                SET local_part = parts[0]
                SET domain_part = parts[1]
                
                // Check local part (before @)
                IF length(local_part) > 0 AND length(local_part) <= 64 THEN
                    // Check domain part (after @)
                    IF length(domain_part) > 0 AND contains(domain_part, ".") THEN
                        SET domain_parts = split(domain_part, ".")
                        
                        IF length(domain_parts) >= 2 THEN
                            SET is_valid = TRUE
                            
                            // Check each domain part
                            FOR each part IN domain_parts
                                IF length(part) = 0 THEN
                                    SET is_valid = FALSE
                                    BREAK
                                ENDIF
                            ENDFOR
                        ENDIF
                    ENDIF
                ENDIF
            ENDIF
        ENDIF
    ENDIF
    
    RETURN is_valid
END FUNCTION

// Usage example
BEGIN Get_Valid_Email
    SET email_valid = FALSE
    
    WHILE NOT email_valid
        DISPLAY "Enter your email address: "
        read email
        
        IF Validate_Email(email) THEN
            DISPLAY "Valid email: " + email
            SET email_valid = TRUE
        ELSE
            DISPLAY "Error: Please enter a valid email address"
            DISPLAY "Format: username@domain.com"
        ENDIF
    ENDWHILE
END</code></pre>
    
    <h4>Phone Number Format Validation:</h4>
    <pre><code>FUNCTION Validate_Phone_Number(phone)
    // Remove common separators
    SET cleaned_phone = remove_characters(phone, "()-. ")
    
    // Check if all remaining characters are digits
    IF is_all_digits(cleaned_phone) THEN
        // Check length (assuming 10-digit US format)
        IF length(cleaned_phone) = 10 THEN
            // Check area code (first 3 digits)
            SET area_code = substring(cleaned_phone, 0, 3)
            
            IF area_code >= "200" AND area_code <= "999" THEN
                RETURN TRUE
            ELSE
                RETURN FALSE
            ENDIF
        ELSE IF length(cleaned_phone) = 11 AND starts_with(cleaned_phone, "1") THEN
            // Handle 1-xxx-xxx-xxxx format
            SET area_code = substring(cleaned_phone, 1, 3)
            
            IF area_code >= "200" AND area_code <= "999" THEN
                RETURN TRUE
            ELSE
                RETURN FALSE
            ENDIF
        ELSE
            RETURN FALSE
        ENDIF
    ELSE
        RETURN FALSE
    ENDIF
END FUNCTION</code></pre>
    
    <h3>4. Business Rule Validation</h3>
    <p>Ensures input meets specific business or application requirements.</p>
    
    <h4>Password Strength Validation:</h4>
    <pre><code>FUNCTION Validate_Password_Strength(password)
    SET errors = []
    SET is_valid = TRUE
    
    // Length requirement
    IF length(password) < 8 THEN
        add_to_array(errors, "Password must be at least 8 characters long")
        SET is_valid = FALSE
    ENDIF
    
    // Uppercase requirement
    IF NOT contains_uppercase(password) THEN
        add_to_array(errors, "Password must contain at least one uppercase letter")
        SET is_valid = FALSE
    ENDIF
    
    // Lowercase requirement
    IF NOT contains_lowercase(password) THEN
        add_to_array(errors, "Password must contain at least one lowercase letter")
        SET is_valid = FALSE
    ENDIF
    
    // Number requirement
    IF NOT contains_digit(password) THEN
        add_to_array(errors, "Password must contain at least one number")
        SET is_valid = FALSE
    ENDIF
    
    // Special character requirement
    SET special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    IF NOT contains_any_character(password, special_chars) THEN
        add_to_array(errors, "Password must contain at least one special character")
        SET is_valid = FALSE
    ENDIF
    
    // Common password check
    SET common_passwords = ["password", "123456", "qwerty", "admin"]
    IF array_contains(common_passwords, to_lowercase(password)) THEN
        add_to_array(errors, "Password is too common, please choose a different one")
        SET is_valid = FALSE
    ENDIF
    
    RETURN {valid: is_valid, errors: errors}
END FUNCTION</code></pre>
    
    <h4>Credit Card Validation (Luhn Algorithm):</h4>
    <pre><code>FUNCTION Validate_Credit_Card(card_number)
    // Remove spaces and dashes
    SET cleaned_number = remove_characters(card_number, "- ")
    
    // Check if all digits
    IF NOT is_all_digits(cleaned_number) THEN
        RETURN FALSE
    ENDIF
    
    // Check length (13-19 digits for most cards)
    IF length(cleaned_number) < 13 OR length(cleaned_number) > 19 THEN
        RETURN FALSE
    ENDIF
    
    // Luhn algorithm implementation
    SET sum = 0
    SET alternate = FALSE
    
    // Process digits from right to left
    FOR i = length(cleaned_number) - 1 TO 0 STEP -1
        SET digit = convert_to_number(cleaned_number[i])
        
        IF alternate THEN
            SET digit = digit * 2
            
            // If result is two digits, add them together
            IF digit > 9 THEN
                SET digit = digit - 9
            ENDIF
        ENDIF
        
        SET sum = sum + digit
        SET alternate = NOT alternate
    ENDFOR
    
    // Valid if sum is divisible by 10
    RETURN (sum MOD 10 = 0)
END FUNCTION</code></pre>
    
    <h2>Error Handling Strategies</h2>
    
    <h3>1. Graceful Error Recovery</h3>
    <p>Allow users to correct their input without losing progress.</p>
    
    <pre><code>BEGIN User_Registration_Form
    SET registration_complete = FALSE
    SET user_data = {}
    
    WHILE NOT registration_complete
        DISPLAY "=== User Registration ==="
        
        // Get and validate username
        IF NOT has_key(user_data, "username") THEN
            SET username_valid = FALSE
            
            WHILE NOT username_valid
                DISPLAY "Enter username (3-20 characters, letters and numbers only): "
                read username
                
                IF length(username) >= 3 AND length(username) <= 20 THEN
                    IF is_alphanumeric(username) THEN
                        SET user_data["username"] = username
                        SET username_valid = TRUE
                        DISPLAY "✓ Username accepted"
                    ELSE
                        DISPLAY "✗ Username can only contain letters and numbers"
                    ENDIF
                ELSE
                    DISPLAY "✗ Username must be 3-20 characters long"
                ENDIF
            ENDWHILE
        ELSE
            DISPLAY "Username: " + user_data["username"] + " ✓"
        ENDIF
        
        // Get and validate email
        IF NOT has_key(user_data, "email") THEN
            SET email_valid = FALSE
            
            WHILE NOT email_valid
                DISPLAY "Enter email address: "
                read email
                
                IF Validate_Email(email) THEN
                    SET user_data["email"] = email
                    SET email_valid = TRUE
                    DISPLAY "✓ Email accepted"
                ELSE
                    DISPLAY "✗ Please enter a valid email address"
                ENDIF
            ENDWHILE
        ELSE
            DISPLAY "Email: " + user_data["email"] + " ✓"
        ENDIF
        
        // Get and validate password
        IF NOT has_key(user_data, "password") THEN
            SET password_valid = FALSE
            
            WHILE NOT password_valid
                DISPLAY "Enter password: "
                read password
                
                SET validation_result = Validate_Password_Strength(password)
                
                IF validation_result["valid"] THEN
                    SET user_data["password"] = password
                    SET password_valid = TRUE
                    DISPLAY "✓ Password accepted"
                ELSE
                    DISPLAY "✗ Password requirements not met:"
                    FOR each error IN validation_result["errors"]
                        DISPLAY "  - " + error
                    ENDFOR
                ENDIF
            ENDWHILE
        ELSE
            DISPLAY "Password: [Hidden] ✓"
        ENDIF
        
        // Confirm registration
        DISPLAY "\nRegistration Summary:"
        DISPLAY "Username: " + user_data["username"]
        DISPLAY "Email: " + user_data["email"]
        DISPLAY "\nConfirm registration? (y/n): "
        read confirmation
        
        IF to_lowercase(confirmation) = "y" OR to_lowercase(confirmation) = "yes" THEN
            DISPLAY "Registration successful!"
            SET registration_complete = TRUE
        ELSE
            DISPLAY "Registration cancelled. You can modify any field."
            DISPLAY "Enter field to modify (username/email/password) or 'restart': "
            read field_to_modify
            
            IF field_to_modify = "restart" THEN
                SET user_data = {}
            ELSE IF has_key(user_data, field_to_modify) THEN
                remove_key(user_data, field_to_modify)
            ENDIF
        ENDIF
    ENDWHILE
END</code></pre>
    
    <h3>2. Comprehensive Error Messages</h3>
    <p>Provide clear, actionable feedback to help users understand and fix errors.</p>
    
    <pre><code>FUNCTION Generate_Validation_Message(field_name, value, validation_type, requirements)
    SET message = ""
    
    CASE validation_type OF
        "required":
            SET message = field_name + " is required and cannot be empty."
        
        "type_mismatch":
            SET message = field_name + " must be a " + requirements["expected_type"] + 
                         ". You entered: '" + value + "'"
        
        "range_error":
            SET message = field_name + " must be between " + requirements["min"] + 
                         " and " + requirements["max"] + ". You entered: " + value
        
        "format_error":
            SET message = field_name + " format is invalid. Expected format: " + 
                         requirements["format"] + ". You entered: '" + value + "'"
        
        "length_error":
            IF length(value) < requirements["min_length"] THEN
                SET message = field_name + " must be at least " + requirements["min_length"] + 
                             " characters long. Current length: " + length(value)
            ELSE
                SET message = field_name + " cannot exceed " + requirements["max_length"] + 
                             " characters. Current length: " + length(value)
            ENDIF
        
        "business_rule":
            SET message = field_name + " violates business rule: " + requirements["rule_description"]
        
        DEFAULT:
            SET message = field_name + " is invalid. Please check your input."
    ENDCASE
    
    // Add helpful suggestions if available
    IF has_key(requirements, "suggestion") THEN
        SET message = message + "\nSuggestion: " + requirements["suggestion"]
    ENDIF
    
    RETURN message
END FUNCTION</code></pre>
    
    <h2>Advanced Validation Techniques</h2>
    
    <h3>1. Cross-Field Validation</h3>
    <p>Validate relationships between multiple input fields.</p>
    
    <pre><code>FUNCTION Validate_Date_Range(start_date, end_date)
    SET errors = []
    
    // Individual date validation
    IF NOT is_valid_date(start_date) THEN
        add_to_array(errors, "Start date is not a valid date")
    ENDIF
    
    IF NOT is_valid_date(end_date) THEN
        add_to_array(errors, "End date is not a valid date")
    ENDIF
    
    // Cross-field validation (only if both dates are valid)
    IF is_valid_date(start_date) AND is_valid_date(end_date) THEN
        IF start_date > end_date THEN
            add_to_array(errors, "Start date cannot be after end date")
        ENDIF
        
        SET date_difference = calculate_days_between(start_date, end_date)
        
        IF date_difference > 365 THEN
            add_to_array(errors, "Date range cannot exceed one year")
        ENDIF
        
        IF start_date < get_current_date() THEN
            add_to_array(errors, "Start date cannot be in the past")
        ENDIF
    ENDIF
    
    RETURN {valid: length(errors) = 0, errors: errors}
END FUNCTION</code></pre>
    
    <h3>2. Real-Time Validation</h3>
    <p>Provide immediate feedback as users type or interact with form fields.</p>
    
    <pre><code>BEGIN Real_Time_Form_Validation
    SET form_fields = {
        "username": {value: "", valid: FALSE, errors: []},
        "email": {value: "", valid: FALSE, errors: []},
        "password": {value: "", valid: FALSE, errors: []}
    }
    
    WHILE form_not_submitted
        // Simulate user typing in username field
        IF field_changed("username") THEN
            SET new_value = get_field_value("username")
            SET form_fields["username"]["value"] = new_value
            
            // Validate username in real-time
            SET validation_result = validate_username(new_value)
            SET form_fields["username"]["valid"] = validation_result["valid"]
            SET form_fields["username"]["errors"] = validation_result["errors"]
            
            // Update UI feedback
            IF validation_result["valid"] THEN
                show_success_indicator("username")
                hide_error_messages("username")
            ELSE
                show_error_indicator("username")
                display_error_messages("username", validation_result["errors"])
            ENDIF
        ENDIF
        
        // Similar real-time validation for other fields...
        
        // Enable/disable submit button based on overall form validity
        SET all_fields_valid = TRUE
        FOR each field IN form_fields
            IF NOT field["valid"] THEN
                SET all_fields_valid = FALSE
                BREAK
            ENDIF
        ENDFOR
        
        IF all_fields_valid THEN
            enable_submit_button()
        ELSE
            disable_submit_button()
        ENDIF
    ENDWHILE
END</code></pre>
    
    <h2>Security Considerations</h2>
    
    <h3>1. Input Sanitization</h3>
    <p>Clean and sanitize input to prevent security vulnerabilities.</p>
    
    <pre><code>FUNCTION Sanitize_Input(input, input_type)
    SET sanitized = input
    
    CASE input_type OF
        "text":
            // Remove potentially dangerous characters
            SET sanitized = remove_characters(sanitized, "<>\"'&")
            // Trim whitespace
            SET sanitized = trim(sanitized)
        
        "html":
            // Escape HTML special characters
            SET sanitized = replace_all(sanitized, "&", "&amp;")
            SET sanitized = replace_all(sanitized, "<", "&lt;")
            SET sanitized = replace_all(sanitized, ">", "&gt;")
            SET sanitized = replace_all(sanitized, "\"", "&quot;")
            SET sanitized = replace_all(sanitized, "'", "&#x27;")
        
        "sql":
            // Escape SQL special characters (basic example)
            SET sanitized = replace_all(sanitized, "'", "''")
            SET sanitized = replace_all(sanitized, "\\", "\\\\")
        
        "filename":
            // Remove path traversal attempts and invalid filename characters
            SET sanitized = remove_characters(sanitized, "../\\:*?\"<>|")
            SET sanitized = trim(sanitized)
        
        DEFAULT:
            // Basic sanitization
            SET sanitized = trim(sanitized)
    ENDCASE
    
    RETURN sanitized
END FUNCTION</code></pre>
    
    <h2>Real-World Application: E-commerce Checkout Form</h2>
    
    <pre><code>BEGIN E_Commerce_Checkout_Validation
    SET checkout_data = {}
    SET validation_errors = {}
    
    // Shipping Information Validation
    FUNCTION Validate_Shipping_Info(shipping_info)
        SET errors = []
        
        // Name validation
        IF length(trim(shipping_info["full_name"])) < 2 THEN
            add_to_array(errors, "Full name must be at least 2 characters")
        ENDIF
        
        // Address validation
        IF length(trim(shipping_info["address"])) < 5 THEN
            add_to_array(errors, "Street address must be at least 5 characters")
        ENDIF
        
        // City validation
        IF length(trim(shipping_info["city"])) < 2 THEN
            add_to_array(errors, "City must be at least 2 characters")
        ENDIF
        
        // Postal code validation (US format)
        SET postal_code = remove_characters(shipping_info["postal_code"], "- ")
        IF NOT matches_pattern(postal_code, "^[0-9]{5}([0-9]{4})?$") THEN
            add_to_array(errors, "Postal code must be in format 12345 or 12345-6789")
        ENDIF
        
        // Phone validation
        IF NOT Validate_Phone_Number(shipping_info["phone"]) THEN
            add_to_array(errors, "Please enter a valid phone number")
        ENDIF
        
        RETURN {valid: length(errors) = 0, errors: errors}
    END FUNCTION
    
    // Payment Information Validation
    FUNCTION Validate_Payment_Info(payment_info)
        SET errors = []
        
        // Credit card validation
        IF NOT Validate_Credit_Card(payment_info["card_number"]) THEN
            add_to_array(errors, "Please enter a valid credit card number")
        ENDIF
        
        // Expiration date validation
        SET current_date = get_current_date()
        SET exp_month = payment_info["exp_month"]
        SET exp_year = payment_info["exp_year"]
        
        IF exp_month < 1 OR exp_month > 12 THEN
            add_to_array(errors, "Expiration month must be between 1 and 12")
        ENDIF
        
        IF exp_year < get_current_year() THEN
            add_to_array(errors, "Card has expired")
        ELSE IF exp_year = get_current_year() AND exp_month < get_current_month() THEN
            add_to_array(errors, "Card has expired")
        ENDIF
        
        // CVV validation
        SET cvv = payment_info["cvv"]
        IF NOT is_all_digits(cvv) OR (length(cvv) ≠ 3 AND length(cvv) ≠ 4) THEN
            add_to_array(errors, "CVV must be 3 or 4 digits")
        ENDIF
        
        // Cardholder name validation
        IF length(trim(payment_info["cardholder_name"])) < 2 THEN
            add_to_array(errors, "Cardholder name must be at least 2 characters")
        ENDIF
        
        RETURN {valid: length(errors) = 0, errors: errors}
    END FUNCTION
    
    // Main checkout validation process
    DISPLAY "=== Checkout Validation ==="
    
    // Validate shipping information
    SET shipping_validation = Validate_Shipping_Info(checkout_data["shipping"])
    IF NOT shipping_validation["valid"] THEN
        DISPLAY "Shipping Information Errors:"
        FOR each error IN shipping_validation["errors"]
            DISPLAY "  ✗ " + error
        ENDFOR
    ELSE
        DISPLAY "✓ Shipping information is valid"
    ENDIF
    
    // Validate payment information
    SET payment_validation = Validate_Payment_Info(checkout_data["payment"])
    IF NOT payment_validation["valid"] THEN
        DISPLAY "Payment Information Errors:"
        FOR each error IN payment_validation["errors"]
            DISPLAY "  ✗ " + error
        ENDFOR
    ELSE
        DISPLAY "✓ Payment information is valid"
    ENDIF
    
    // Overall validation result
    IF shipping_validation["valid"] AND payment_validation["valid"] THEN
        DISPLAY "\n✓ All information is valid. Proceeding to payment processing..."
        // Process the order
    ELSE
        DISPLAY "\n✗ Please correct the errors above before proceeding."
    ENDIF
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "validation-builder",
      title: "Build a Validation Function",
      description: "Create validation functions for different input types.",
      challenges: [
        {
          task: "Create a function to validate a username (3-20 chars, alphanumeric only)",
          template: "FUNCTION Validate_Username(username)\n  // Your code here\nEND FUNCTION",
          testCases: [
            {input: "john123", expected: true},
            {input: "ab", expected: false},
            {input: "user@name", expected: false},
            {input: "validuser", expected: true}
          ]
        },
        {
          task: "Create a function to validate an age (13-120 years)",
          template: "FUNCTION Validate_Age(age)\n  // Your code here\nEND FUNCTION",
          testCases: [
            {input: 25, expected: true},
            {input: 12, expected: false},
            {input: 150, expected: false},
            {input: "25", expected: true}
          ]
        }
      ]
    },
    {
      type: "error-message-generator",
      title: "Craft Better Error Messages",
      description: "Improve generic error messages to be more helpful and user-friendly.",
      scenarios: [
        {
          badMessage: "Invalid input",
          context: "User entered 'abc' for age field",
          goodMessage: "Age must be a number between 13 and 120. You entered 'abc' which is not a valid number."
        },
        {
          badMessage: "Wrong format",
          context: "User entered '123-45-678' for phone number",
          goodMessage: "Phone number format is invalid. Please enter 10 digits like (555) 123-4567 or 555-123-4567."
        }
      ]
    },
    {
      type: "validation-flow-designer",
      title: "Design Validation Flow",
      description: "Create a step-by-step validation process for a registration form.",
      formFields: ["username", "email", "password", "confirm_password", "age"],
      validationTypes: ["required", "format", "range", "match", "uniqueness"],
      userTask: "Arrange validation steps in logical order and choose appropriate validation types"
    },
    {
      type: "security-scanner",
      title: "Identify Security Vulnerabilities",
      description: "Spot potential security issues in input validation code.",
      codeExamples: [
        {
          code: "SET query = 'SELECT * FROM users WHERE name = ' + user_input",
          vulnerability: "SQL Injection",
          fix: "Use parameterized queries or escape special characters"
        },
        {
          code: "DISPLAY '<h1>' + user_input + '</h1>'",
          vulnerability: "XSS (Cross-Site Scripting)",
          fix: "Escape HTML special characters before displaying"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Psychology of Error Messages",
      content: `
        <p>Research in human-computer interaction shows that error messages significantly impact user experience and task completion rates:</p>
        
        <h4>Cognitive Load and Error Recovery</h4>
        <p>When users encounter errors, their cognitive load increases dramatically. Clear, specific error messages reduce this load by providing immediate understanding of what went wrong and how to fix it.</p>
        
        <h4>Emotional Response to Errors</h4>
        <p>Generic error messages like "Invalid input" can cause frustration and anxiety. Users often interpret these as personal failures rather than system feedback. Specific, helpful messages reduce negative emotional responses.</p>
        
        <h4>Learning Through Validation</h4>
        <p>Well-designed validation serves as a teaching tool. Users learn system requirements and constraints through interaction, building mental models that prevent future errors.</p>
        
        <h4>Trust and Credibility</h4>
        <p>Systems that provide clear, accurate validation feedback are perceived as more trustworthy and professional. Users are more likely to complete tasks and return to systems that handle errors gracefully.</p>
      `
    },
    {
      title: "Security Implications of Input Validation",
      content: `
        <p>Input validation is the first line of defense against many security vulnerabilities:</p>
        
        <h4>Injection Attacks</h4>
        <p>SQL injection, command injection, and script injection attacks all exploit insufficient input validation. Proper validation and sanitization can prevent these attacks by ensuring input conforms to expected patterns.</p>
        
        <h4>Buffer Overflow Prevention</h4>
        <p>Length validation prevents buffer overflow attacks by ensuring input doesn't exceed allocated memory boundaries. This is especially critical in systems programming languages.</p>
        
        <h4>Data Integrity</h4>
        <p>Validation ensures data integrity by preventing malformed or malicious data from entering the system. This protects both the application and its users from data corruption.</p>
        
        <h4>Compliance and Regulations</h4>
        <p>Many industries have regulations requiring specific validation practices, especially for handling personal information, financial data, and healthcare records.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which type of validation should be performed FIRST when processing user input?",
      options: ["Format validation", "Range validation", "Type validation", "Business rule validation"],
      correct: 2,
      explanation: "Type validation should be performed first to ensure the input is the expected data type before applying other validation rules."
    },
    {
      type: "code-analysis",
      question: "What is wrong with this validation code?\n\nIF age > 0 THEN\n    DISPLAY 'Valid age'\nELSE\n    DISPLAY 'Invalid age'\nENDIF",
      options: ["No upper limit check", "Doesn't handle non-numeric input", "Both A and B", "Nothing is wrong"],
      correct: 2,
      explanation: "The code lacks both an upper limit check (people can't be 999 years old) and doesn't verify that 'age' is actually a number."
    },
    {
      type: "debugging",
      question: "Fix this email validation to be more robust:\n\nIF contains(email, '@') THEN\n    DISPLAY 'Valid email'\nELSE\n    DISPLAY 'Invalid email'\nENDIF",
      correctFix: "Add checks for: non-empty local and domain parts, domain contains dot, no multiple @ symbols, reasonable length limits",
      explanation: "Simply checking for @ is insufficient. A robust email validator needs multiple checks for format compliance."
    },
    {
      type: "scenario-based",
      question: "A user enters '12/32/2023' as a date. Design a validation response that helps them understand and correct the error.",
      sampleAnswer: "Error: Invalid date entered. The day '32' is not valid for December. December has 31 days. Please enter a date in MM/DD/YYYY format with a valid day (1-31 depending on the month).",
      rubric: [
        "Identifies the specific error (day 32 doesn't exist)",
        "Explains why it's wrong (December has 31 days)",
        "Provides the expected format",
        "Gives guidance for correction",
        "Uses clear, non-technical language"
      ]
    },
    {
      type: "design-challenge",
      question: "Design a validation strategy for a password reset form that includes: current password, new password, and confirm new password fields. Consider security, usability, and error handling.",
      rubric: [
        "Validates current password against stored hash",
        "Ensures new password meets strength requirements",
        "Confirms new password matches confirmation",
        "Prevents reuse of current password",
        "Provides clear error messages for each validation failure",
        "Considers timing attacks and security implications"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Multi-Step Form Validator",
      description: "Create a comprehensive validation system for a multi-step registration form with progressive disclosure of errors.",
      difficulty: "medium",
      hints: ["Validate each step before allowing progression", "Store validation state between steps", "Provide summary of all errors at the end"]
    },
    {
      title: "Real-Time Search Validator",
      description: "Build a search input validator that provides real-time feedback on query length, special characters, and search suggestions.",
      difficulty: "medium",
      hints: ["Implement debouncing for performance", "Validate as user types", "Provide helpful suggestions for common mistakes"]
    },
    {
      title: "File Upload Validator",
      description: "Design a file upload validation system that checks file type, size, name format, and scans for potential security issues.",
      difficulty: "hard",
      hints: ["Check file extensions and MIME types", "Validate file size limits", "Scan for malicious content patterns", "Handle multiple file uploads"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Input Validation",
      definition: "The process of checking whether input data meets specified criteria before processing"
    },
    {
      term: "Sanitization",
      definition: "The process of cleaning input data by removing or escaping potentially dangerous characters"
    },
    {
      term: "Cross-Field Validation",
      definition: "Validation that checks relationships and dependencies between multiple input fields"
    },
    {
      term: "Business Rule Validation",
      definition: "Validation that ensures input meets specific organizational or application requirements"
    },
    {
      term: "Graceful Error Handling",
      definition: "Managing errors in a way that allows users to recover and continue their tasks without losing progress"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of conditional statements and logical operators",
    "Knowledge of string manipulation and pattern matching",
    "Familiarity with functions and return values",
    "Basic understanding of data types and type conversion"
  ],
  
  nextSteps: [
    "Learn about regular expressions for advanced pattern matching",
    "Explore database validation and constraints",
    "Study security testing and penetration testing techniques",
    "Practice with real-world form validation frameworks",
    "Learn about accessibility considerations in error messaging"
  ]
};