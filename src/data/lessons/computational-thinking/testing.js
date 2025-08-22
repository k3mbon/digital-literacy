// Lesson 1.7: Testing - Comprehensive lesson content

export default {
  title: "Testing",
  description: "Master testing strategies, debugging techniques, and quality assurance for reliable software",
  difficulty: "intermediate",
  estimatedTime: "60 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the importance of testing in software development",
    "Learn different types of testing: unit, integration, system, and user acceptance testing",
    "Master debugging techniques and tools for finding and fixing errors",
    "Apply test-driven development principles and create effective test cases",
    "Implement quality assurance practices and continuous testing strategies"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Testing?</h2>
    <p><strong>Testing</strong> is the systematic process of evaluating software to identify defects, verify functionality, and ensure quality. It's a critical phase in software development that helps deliver reliable, secure, and user-friendly applications.</p>
    
    <p>Testing is essential because:</p>
    <ul>
      <li><strong>Prevents failures:</strong> Identifies bugs before they reach users</li>
      <li><strong>Ensures quality:</strong> Verifies that software meets requirements and expectations</li>
      <li><strong>Reduces costs:</strong> Finding bugs early is much cheaper than fixing them in production</li>
      <li><strong>Builds confidence:</strong> Provides assurance that the software works as intended</li>
      <li><strong>Improves user experience:</strong> Ensures smooth, reliable operation for end users</li>
      <li><strong>Maintains reputation:</strong> Prevents embarrassing failures that damage credibility</li>
    </ul>
    
    <h2>Types of Testing</h2>
    
    <h3>1. Unit Testing</h3>
    <p>Unit testing involves testing individual components or functions in isolation to ensure they work correctly.</p>
    
    <h4>Unit Test Example - Testing a Calculator Function:</h4>
    <pre><code>// Function to test
FUNCTION Calculate_Area_Rectangle(length, width)
    IF length <= 0 OR width <= 0 THEN
        RETURN -1  // Error code for invalid input
    ENDIF
    
    RETURN length * width
END FUNCTION

// Unit tests for the function
BEGIN Test_Calculate_Area_Rectangle
    DISPLAY "Running unit tests for Calculate_Area_Rectangle..."
    
    // Test Case 1: Normal positive values
    SET result1 = Calculate_Area_Rectangle(5, 3)
    IF result1 = 15 THEN
        DISPLAY "✓ Test 1 PASSED: Normal calculation (5 × 3 = 15)"
    ELSE
        DISPLAY "✗ Test 1 FAILED: Expected 15, got " + result1
    ENDIF
    
    // Test Case 2: Zero values
    SET result2 = Calculate_Area_Rectangle(0, 5)
    IF result2 = -1 THEN
        DISPLAY "✓ Test 2 PASSED: Zero length handled correctly"
    ELSE
        DISPLAY "✗ Test 2 FAILED: Expected -1, got " + result2
    ENDIF
    
    // Test Case 3: Negative values
    SET result3 = Calculate_Area_Rectangle(-2, 4)
    IF result3 = -1 THEN
        DISPLAY "✓ Test 3 PASSED: Negative length handled correctly"
    ELSE
        DISPLAY "✗ Test 3 FAILED: Expected -1, got " + result3
    ENDIF
    
    // Test Case 4: Decimal values
    SET result4 = Calculate_Area_Rectangle(2.5, 4.0)
    IF result4 = 10.0 THEN
        DISPLAY "✓ Test 4 PASSED: Decimal calculation (2.5 × 4.0 = 10.0)"
    ELSE
        DISPLAY "✗ Test 4 FAILED: Expected 10.0, got " + result4
    ENDIF
    
    DISPLAY "Unit testing complete."
END</code></pre>
    
    <h4>Comprehensive Unit Testing Framework:</h4>
    <pre><code>// Simple testing framework
SET test_results = {
    total_tests: 0,
    passed_tests: 0,
    failed_tests: 0,
    test_details: []
}

FUNCTION Assert_Equal(actual, expected, test_name)
    SET test_results["total_tests"] = test_results["total_tests"] + 1
    
    IF actual = expected THEN
        SET test_results["passed_tests"] = test_results["passed_tests"] + 1
        SET status = "PASSED"
        DISPLAY "✓ " + test_name + " PASSED"
    ELSE
        SET test_results["failed_tests"] = test_results["failed_tests"] + 1
        SET status = "FAILED"
        DISPLAY "✗ " + test_name + " FAILED: Expected " + expected + ", got " + actual
    ENDIF
    
    add_to_array(test_results["test_details"], {
        name: test_name,
        status: status,
        expected: expected,
        actual: actual
    })
END FUNCTION

FUNCTION Assert_True(condition, test_name)
    Assert_Equal(condition, TRUE, test_name)
END FUNCTION

FUNCTION Assert_False(condition, test_name)
    Assert_Equal(condition, FALSE, test_name)
END FUNCTION

FUNCTION Print_Test_Summary()
    DISPLAY "\n=== TEST SUMMARY ==="
    DISPLAY "Total Tests: " + test_results["total_tests"]
    DISPLAY "Passed: " + test_results["passed_tests"]
    DISPLAY "Failed: " + test_results["failed_tests"]
    
    SET pass_rate = (test_results["passed_tests"] / test_results["total_tests"]) * 100
    DISPLAY "Pass Rate: " + pass_rate + "%"
    
    IF test_results["failed_tests"] > 0 THEN
        DISPLAY "\nFailed Tests:"
        FOR each test IN test_results["test_details"]
            IF test["status"] = "FAILED" THEN
                DISPLAY "  - " + test["name"]
            ENDIF
        ENDFOR
    ENDIF
END FUNCTION</code></pre>
    
    <h3>2. Integration Testing</h3>
    <p>Integration testing verifies that different components work correctly when combined together.</p>
    
    <h4>Integration Test Example - User Authentication System:</h4>
    <pre><code>// Components to integrate
FUNCTION Hash_Password(password)
    // Simulate password hashing
    RETURN "hashed_" + password
END FUNCTION

FUNCTION Store_User(username, hashed_password)
    // Simulate database storage
    SET users_database[username] = hashed_password
    RETURN TRUE
END FUNCTION

FUNCTION Validate_User_Input(username, password)
    IF length(username) < 3 OR length(password) < 8 THEN
        RETURN FALSE
    ENDIF
    RETURN TRUE
END FUNCTION

// Integration function that combines all components
FUNCTION Register_User(username, password)
    // Step 1: Validate input
    IF NOT Validate_User_Input(username, password) THEN
        RETURN {success: FALSE, message: "Invalid input"}
    ENDIF
    
    // Step 2: Check if user already exists
    IF has_key(users_database, username) THEN
        RETURN {success: FALSE, message: "User already exists"}
    ENDIF
    
    // Step 3: Hash password
    SET hashed_password = Hash_Password(password)
    
    // Step 4: Store user
    IF Store_User(username, hashed_password) THEN
        RETURN {success: TRUE, message: "User registered successfully"}
    ELSE
        RETURN {success: FALSE, message: "Database error"}
    ENDIF
END FUNCTION

// Integration tests
BEGIN Test_User_Registration_Integration
    DISPLAY "Running integration tests for user registration..."
    
    // Initialize test database
    SET users_database = {}
    
    // Test 1: Successful registration
    SET result1 = Register_User("john_doe", "password123")
    Assert_True(result1["success"], "Successful user registration")
    Assert_Equal(result1["message"], "User registered successfully", "Success message")
    
    // Test 2: Duplicate user registration
    SET result2 = Register_User("john_doe", "password456")
    Assert_False(result2["success"], "Duplicate user rejection")
    Assert_Equal(result2["message"], "User already exists", "Duplicate user message")
    
    // Test 3: Invalid input (short username)
    SET result3 = Register_User("jo", "password123")
    Assert_False(result3["success"], "Short username rejection")
    Assert_Equal(result3["message"], "Invalid input", "Invalid input message")
    
    // Test 4: Invalid input (short password)
    SET result4 = Register_User("jane_doe", "pass")
    Assert_False(result4["success"], "Short password rejection")
    
    // Verify database state
    Assert_True(has_key(users_database, "john_doe"), "User stored in database")
    Assert_Equal(users_database["john_doe"], "hashed_password123", "Password hashed correctly")
    
    Print_Test_Summary()
END</code></pre>
    
    <h3>3. System Testing</h3>
    <p>System testing evaluates the complete integrated system to verify it meets specified requirements.</p>
    
    <h4>System Test Example - E-commerce Checkout Process:</h4>
    <pre><code>BEGIN Test_E_Commerce_Checkout_System
    DISPLAY "Running system tests for e-commerce checkout..."
    
    // Test Scenario 1: Complete successful purchase
    FUNCTION Test_Successful_Purchase()
        DISPLAY "\nTest: Complete successful purchase flow"
        
        // Step 1: Add items to cart
        SET cart = Initialize_Cart()
        SET add_result = Add_Item_To_Cart(cart, "laptop", 1, 999.99)
        Assert_True(add_result["success"], "Item added to cart")
        
        // Step 2: Apply discount code
        SET discount_result = Apply_Discount_Code(cart, "SAVE10")
        Assert_True(discount_result["success"], "Discount code applied")
        
        // Step 3: Calculate totals
        SET total = Calculate_Cart_Total(cart)
        Assert_Equal(total, 899.99, "Correct total with discount")  // 999.99 - 10%
        
        // Step 4: Process payment
        SET payment_info = {
            card_number: "4111111111111111",
            exp_month: 12,
            exp_year: 2025,
            cvv: "123",
            amount: total
        }
        SET payment_result = Process_Payment(payment_info)
        Assert_True(payment_result["success"], "Payment processed successfully")
        
        // Step 5: Create order
        SET order_result = Create_Order(cart, payment_result["transaction_id"])
        Assert_True(order_result["success"], "Order created")
        
        // Step 6: Send confirmation email
        SET email_result = Send_Order_Confirmation(order_result["order_id"])
        Assert_True(email_result["success"], "Confirmation email sent")
        
        // Step 7: Update inventory
        SET inventory_result = Update_Inventory(cart)
        Assert_True(inventory_result["success"], "Inventory updated")
        
        DISPLAY "✓ Complete purchase flow test completed"
    END FUNCTION
    
    // Test Scenario 2: Payment failure handling
    FUNCTION Test_Payment_Failure_Handling()
        DISPLAY "\nTest: Payment failure handling"
        
        SET cart = Initialize_Cart()
        Add_Item_To_Cart(cart, "book", 2, 29.99)
        
        // Use invalid payment info
        SET invalid_payment = {
            card_number: "4000000000000002",  // Declined card
            exp_month: 12,
            exp_year: 2025,
            cvv: "123",
            amount: 59.98
        }
        
        SET payment_result = Process_Payment(invalid_payment)
        Assert_False(payment_result["success"], "Payment correctly declined")
        
        // Verify no order was created
        SET order_count_before = Get_Order_Count()
        SET order_result = Create_Order(cart, payment_result["transaction_id"])
        SET order_count_after = Get_Order_Count()
        
        Assert_Equal(order_count_before, order_count_after, "No order created on payment failure")
        
        // Verify inventory wasn't updated
        SET book_inventory_before = Get_Item_Inventory("book")
        Update_Inventory(cart)
        SET book_inventory_after = Get_Item_Inventory("book")
        
        Assert_Equal(book_inventory_before, book_inventory_after, "Inventory unchanged on payment failure")
        
        DISPLAY "✓ Payment failure handling test completed"
    END FUNCTION
    
    // Test Scenario 3: Cart abandonment and recovery
    FUNCTION Test_Cart_Abandonment_Recovery()
        DISPLAY "\nTest: Cart abandonment and recovery"
        
        SET user_id = "user123"
        SET cart = Initialize_Cart_For_User(user_id)
        Add_Item_To_Cart(cart, "smartphone", 1, 699.99)
        
        // Simulate user leaving without completing purchase
        SET abandon_time = get_current_timestamp()
        Save_Abandoned_Cart(cart, abandon_time)
        
        // Simulate recovery email after 24 hours
        SET recovery_time = abandon_time + (24 * 60 * 60)  // 24 hours later
        SET recovery_result = Send_Cart_Recovery_Email(user_id, recovery_time)
        
        Assert_True(recovery_result["success"], "Recovery email sent")
        
        // Verify cart can be restored
        SET restored_cart = Restore_Abandoned_Cart(user_id)
        Assert_Equal(Get_Cart_Item_Count(restored_cart), 1, "Cart restored with correct items")
        Assert_Equal(Get_Cart_Total(restored_cart), 699.99, "Cart total preserved")
        
        DISPLAY "✓ Cart abandonment recovery test completed"
    END FUNCTION
    
    // Run all system tests
    Test_Successful_Purchase()
    Test_Payment_Failure_Handling()
    Test_Cart_Abandonment_Recovery()
    
    Print_Test_Summary()
END</code></pre>
    
    <h3>4. User Acceptance Testing (UAT)</h3>
    <p>UAT involves end users testing the system to ensure it meets their needs and requirements.</p>
    
    <h4>UAT Test Plan Example:</h4>
    <pre><code>BEGIN User_Acceptance_Test_Plan
    DISPLAY "=== USER ACCEPTANCE TEST PLAN ==="
    DISPLAY "System: Online Learning Platform"
    DISPLAY "Test Period: 2 weeks"
    DISPLAY "Test Users: 10 students, 3 instructors, 1 administrator"
    
    // UAT Test Scenarios
    SET uat_scenarios = [
        {
            id: "UAT-001",
            title: "Student Course Enrollment",
            description: "Student can browse, select, and enroll in courses",
            user_type: "Student",
            steps: [
                "Log into the platform",
                "Browse available courses",
                "View course details and syllabus",
                "Enroll in a course",
                "Verify enrollment confirmation",
                "Access course materials"
            ],
            acceptance_criteria: [
                "Course enrollment completes within 30 seconds",
                "Confirmation email received within 5 minutes",
                "Course appears in student dashboard",
                "All course materials are accessible"
            ]
        },
        {
            id: "UAT-002",
            title: "Instructor Content Upload",
            description: "Instructor can upload and organize course content",
            user_type: "Instructor",
            steps: [
                "Log into instructor portal",
                "Navigate to course management",
                "Upload video lecture (max 500MB)",
                "Upload PDF materials",
                "Create quiz with 10 questions",
                "Set assignment due dates",
                "Publish content to students"
            ],
            acceptance_criteria: [
                "File upload completes successfully",
                "Content is properly organized",
                "Students can access published content",
                "Quiz functions correctly"
            ]
        },
        {
            id: "UAT-003",
            title: "Administrator User Management",
            description: "Administrator can manage user accounts and permissions",
            user_type: "Administrator",
            steps: [
                "Access admin dashboard",
                "Create new user accounts",
                "Assign roles and permissions",
                "Generate usage reports",
                "Manage course catalogs",
                "Handle user support requests"
            ],
            acceptance_criteria: [
                "User accounts created successfully",
                "Permissions work as expected",
                "Reports generate accurate data",
                "Support workflow is efficient"
            ]
        }
    ]
    
    // UAT Execution and Feedback Collection
    FUNCTION Execute_UAT_Scenario(scenario, test_user)
        DISPLAY "\nExecuting: " + scenario["title"]
        DISPLAY "Test User: " + test_user["name"] + " (" + test_user["role"] + ")"
        
        SET start_time = get_current_timestamp()
        SET feedback = {
            scenario_id: scenario["id"],
            user_id: test_user["id"],
            completion_time: 0,
            success: FALSE,
            issues_found: [],
            user_satisfaction: 0,  // 1-5 scale
            comments: ""
        }
        
        // Guide user through test steps
        FOR each step IN scenario["steps"]
            DISPLAY "Step: " + step
            DISPLAY "Please complete this step and press Enter when done..."
            read user_input  // Wait for user confirmation
            
            DISPLAY "Did this step complete successfully? (y/n): "
            read step_result
            
            IF to_lowercase(step_result) ≠ "y" THEN
                DISPLAY "Please describe the issue: "
                read issue_description
                add_to_array(feedback["issues_found"], {
                    step: step,
                    description: issue_description,
                    severity: Get_Issue_Severity()  // User rates 1-5
                })
            ENDIF
        ENDFOR
        
        SET end_time = get_current_timestamp()
        SET feedback["completion_time"] = end_time - start_time
        
        // Collect overall feedback
        DISPLAY "\nOverall, how satisfied are you with this feature? (1-5): "
        read satisfaction_rating
        SET feedback["user_satisfaction"] = satisfaction_rating
        
        DISPLAY "Any additional comments?: "
        read additional_comments
        SET feedback["comments"] = additional_comments
        
        // Determine success based on acceptance criteria
        SET feedback["success"] = Check_Acceptance_Criteria(scenario, feedback)
        
        RETURN feedback
    END FUNCTION
    
    // Collect and analyze UAT results
    SET uat_results = []
    
    FOR each scenario IN uat_scenarios
        FOR each test_user IN Get_Test_Users_For_Role(scenario["user_type"])
            SET result = Execute_UAT_Scenario(scenario, test_user)
            add_to_array(uat_results, result)
        ENDFOR
    ENDFOR
    
    // Generate UAT report
    Generate_UAT_Report(uat_results)
END</code></pre>
    
    <h2>Debugging Techniques</h2>
    
    <h3>1. Print/Log Debugging</h3>
    <p>Adding output statements to trace program execution and variable values.</p>
    
    <pre><code>// Example: Debugging a sorting algorithm
FUNCTION Debug_Bubble_Sort(array)
    DISPLAY "Starting bubble sort with array: " + array_to_string(array)
    SET n = length(array)
    
    FOR i = 0 TO n - 2
        DISPLAY "\nPass " + (i + 1) + ":"
        SET swapped = FALSE
        
        FOR j = 0 TO n - i - 2
            DISPLAY "  Comparing " + array[j] + " and " + array[j + 1]
            
            IF array[j] > array[j + 1] THEN
                DISPLAY "    Swapping " + array[j] + " and " + array[j + 1]
                
                // Swap elements
                SET temp = array[j]
                SET array[j] = array[j + 1]
                SET array[j + 1] = temp
                SET swapped = TRUE
            ELSE
                DISPLAY "    No swap needed"
            ENDIF
            
            DISPLAY "    Array now: " + array_to_string(array)
        ENDFOR
        
        IF NOT swapped THEN
            DISPLAY "  No swaps in this pass - array is sorted!"
            BREAK
        ENDIF
    ENDFOR
    
    DISPLAY "\nFinal sorted array: " + array_to_string(array)
    RETURN array
END FUNCTION</code></pre>
    
    <h3>2. Breakpoint Debugging</h3>
    <p>Pausing execution at specific points to examine program state.</p>
    
    <pre><code>// Simulated breakpoint debugging
FUNCTION Debug_With_Breakpoints(data)
    SET processed_count = 0
    SET error_count = 0
    
    FOR each item IN data
        // BREAKPOINT: Examine item before processing
        IF DEBUGGING_ENABLED THEN
            DISPLAY "\n=== BREAKPOINT 1 ==="
            DISPLAY "Current item: " + item
            DISPLAY "Processed count: " + processed_count
            DISPLAY "Error count: " + error_count
            DISPLAY "Continue? (y/n): "
            read continue_debug
            IF to_lowercase(continue_debug) ≠ "y" THEN
                RETURN "Debugging stopped by user"
            ENDIF
        ENDIF
        
        // Process the item
        SET result = Process_Item(item)
        
        // BREAKPOINT: Examine result after processing
        IF DEBUGGING_ENABLED THEN
            DISPLAY "\n=== BREAKPOINT 2 ==="
            DISPLAY "Processing result: " + result
            DISPLAY "Success: " + result["success"]
            IF NOT result["success"] THEN
                DISPLAY "Error message: " + result["error"]
            ENDIF
            DISPLAY "Continue? (y/n): "
            read continue_debug
            IF to_lowercase(continue_debug) ≠ "y" THEN
                RETURN "Debugging stopped by user"
            ENDIF
        ENDIF
        
        IF result["success"] THEN
            SET processed_count = processed_count + 1
        ELSE
            SET error_count = error_count + 1
        ENDIF
    ENDFOR
    
    RETURN {processed: processed_count, errors: error_count}
END FUNCTION</code></pre>
    
    <h3>3. Rubber Duck Debugging</h3>
    <p>Explaining code line-by-line to identify logical errors.</p>
    
    <pre><code>// Example: Debugging a function by explaining it step by step
BEGIN Rubber_Duck_Debug_Session
    DISPLAY "=== RUBBER DUCK DEBUGGING SESSION ==="
    DISPLAY "Problem: Function to find maximum value returns wrong result"
    
    DISPLAY "\nOriginal function:"
    DISPLAY "FUNCTION Find_Maximum(numbers)"
    DISPLAY "    SET max = 0  // ← Explaining: I initialize max to 0"
    DISPLAY "    FOR each num IN numbers"
    DISPLAY "        IF num > max THEN  // ← Explaining: If current number is bigger than max"
    DISPLAY "            SET max = num   // ← Explaining: Update max to current number"
    DISPLAY "        ENDIF"
    DISPLAY "    ENDFOR"
    DISPLAY "    RETURN max"
    DISPLAY "END FUNCTION"
    
    DISPLAY "\nRubber Duck Analysis:"
    DISPLAY "Wait... I'm initializing max to 0. What if all numbers are negative?"
    DISPLAY "For example, with array [-5, -2, -8], the function would return 0"
    DISPLAY "But the maximum should be -2!"
    
    DISPLAY "\nThe bug: Initializing max to 0 instead of the first element"
    
    DISPLAY "\nCorrected function:"
    DISPLAY "FUNCTION Find_Maximum(numbers)"
    DISPLAY "    IF length(numbers) = 0 THEN"
    DISPLAY "        RETURN NULL  // Handle empty array"
    DISPLAY "    ENDIF"
    DISPLAY "    "
    DISPLAY "    SET max = numbers[0]  // ← Fixed: Initialize to first element"
    DISPLAY "    FOR i = 1 TO length(numbers) - 1"
    DISPLAY "        IF numbers[i] > max THEN"
    DISPLAY "            SET max = numbers[i]"
    DISPLAY "        ENDIF"
    DISPLAY "    ENDFOR"
    DISPLAY "    RETURN max"
    DISPLAY "END FUNCTION"
    
    DISPLAY "\nRubber Duck helped identify the initialization bug!"
END</code></pre>
    
    <h2>Test-Driven Development (TDD)</h2>
    
    <h3>TDD Cycle: Red-Green-Refactor</h3>
    <p>TDD follows a cycle of writing failing tests first, making them pass, then improving the code.</p>
    
    <pre><code>// TDD Example: Building a Password Validator
BEGIN TDD_Password_Validator
    DISPLAY "=== TEST-DRIVEN DEVELOPMENT EXAMPLE ==="
    
    // STEP 1: RED - Write failing test first
    DISPLAY "\nSTEP 1: RED - Writing failing test"
    
    FUNCTION Test_Password_Length_Requirement()
        // Test that password must be at least 8 characters
        SET result = Validate_Password("short")  // This function doesn't exist yet!
        Assert_False(result["valid"], "Short password should be invalid")
        Assert_True(contains(result["errors"], "Password must be at least 8 characters"), 
                   "Should have length error message")
    END FUNCTION
    
    // Run the test - it will fail because Validate_Password doesn't exist
    DISPLAY "Running test... (will fail)"
    Test_Password_Length_Requirement()  // This will cause an error
    
    // STEP 2: GREEN - Write minimal code to make test pass
    DISPLAY "\nSTEP 2: GREEN - Writing minimal code to pass test"
    
    FUNCTION Validate_Password(password)
        SET result = {valid: TRUE, errors: []}
        
        // Minimal implementation to pass the test
        IF length(password) < 8 THEN
            SET result["valid"] = FALSE
            add_to_array(result["errors"], "Password must be at least 8 characters")
        ENDIF
        
        RETURN result
    END FUNCTION
    
    DISPLAY "Running test again... (should pass now)"
    Test_Password_Length_Requirement()  // Should pass now
    
    // STEP 3: Add more tests (RED)
    DISPLAY "\nAdding more tests..."
    
    FUNCTION Test_Password_Uppercase_Requirement()
        SET result = Validate_Password("lowercase123")
        Assert_False(result["valid"], "Password without uppercase should be invalid")
        Assert_True(contains(result["errors"], "Password must contain uppercase letter"), 
                   "Should have uppercase error message")
    END FUNCTION
    
    // This test will fail with current implementation
    Test_Password_Uppercase_Requirement()
    
    // STEP 4: GREEN - Extend code to pass new test
    DISPLAY "\nExtending Validate_Password function..."
    
    FUNCTION Validate_Password(password)  // Updated version
        SET result = {valid: TRUE, errors: []}
        
        // Length check
        IF length(password) < 8 THEN
            SET result["valid"] = FALSE
            add_to_array(result["errors"], "Password must be at least 8 characters")
        ENDIF
        
        // Uppercase check
        IF NOT contains_uppercase(password) THEN
            SET result["valid"] = FALSE
            add_to_array(result["errors"], "Password must contain uppercase letter")
        ENDIF
        
        RETURN result
    END FUNCTION
    
    // STEP 5: REFACTOR - Improve code structure
    DISPLAY "\nSTEP 5: REFACTOR - Improving code structure"
    
    FUNCTION Validate_Password(password)  // Refactored version
        SET validators = [
            {check: "length", min: 8, message: "Password must be at least 8 characters"},
            {check: "uppercase", message: "Password must contain uppercase letter"},
            {check: "lowercase", message: "Password must contain lowercase letter"},
            {check: "digit", message: "Password must contain a number"}
        ]
        
        SET result = {valid: TRUE, errors: []}
        
        FOR each validator IN validators
            SET check_result = Run_Password_Check(password, validator)
            IF NOT check_result THEN
                SET result["valid"] = FALSE
                add_to_array(result["errors"], validator["message"])
            ENDIF
        ENDFOR
        
        RETURN result
    END FUNCTION
    
    FUNCTION Run_Password_Check(password, validator)
        CASE validator["check"] OF
            "length":
                RETURN length(password) >= validator["min"]
            "uppercase":
                RETURN contains_uppercase(password)
            "lowercase":
                RETURN contains_lowercase(password)
            "digit":
                RETURN contains_digit(password)
            DEFAULT:
                RETURN TRUE
        ENDCASE
    END FUNCTION
    
    DISPLAY "\nTDD cycle complete! Tests still pass with refactored code."
END</code></pre>
    
    <h2>Quality Assurance Practices</h2>
    
    <h3>1. Code Review Process</h3>
    <pre><code>BEGIN Code_Review_Checklist
    DISPLAY "=== CODE REVIEW CHECKLIST ==="
    
    SET review_criteria = [
        {
            category: "Functionality",
            checks: [
                "Does the code do what it's supposed to do?",
                "Are all requirements implemented correctly?",
                "Are edge cases handled properly?",
                "Is error handling comprehensive?"
            ]
        },
        {
            category: "Code Quality",
            checks: [
                "Is the code readable and well-structured?",
                "Are variable and function names descriptive?",
                "Is the code properly commented?",
                "Are there any code smells or anti-patterns?"
            ]
        },
        {
            category: "Performance",
            checks: [
                "Are there any obvious performance issues?",
                "Is the algorithm choice appropriate?",
                "Are resources used efficiently?",
                "Could any operations be optimized?"
            ]
        },
        {
            category: "Security",
            checks: [
                "Is input properly validated and sanitized?",
                "Are there any security vulnerabilities?",
                "Is sensitive data handled securely?",
                "Are authentication and authorization correct?"
            ]
        },
        {
            category: "Testing",
            checks: [
                "Are there adequate unit tests?",
                "Do tests cover edge cases?",
                "Are integration tests included?",
                "Is test coverage sufficient?"
            ]
        }
    ]
    
    FUNCTION Conduct_Code_Review(code_submission)
        SET review_results = {
            overall_score: 0,
            category_scores: {},
            issues_found: [],
            recommendations: []
        }
        
        FOR each category IN review_criteria
            DISPLAY "\nReviewing: " + category["category"]
            SET category_score = 0
            SET category_issues = []
            
            FOR each check IN category["checks"]
                DISPLAY "  " + check
                DISPLAY "  Rating (1-5): "
                read rating
                SET category_score = category_score + rating
                
                IF rating < 3 THEN
                    DISPLAY "  Issue description: "
                    read issue_description
                    add_to_array(category_issues, {
                        check: check,
                        rating: rating,
                        description: issue_description
                    })
                ENDIF
            ENDFOR
            
            SET avg_score = category_score / length(category["checks"])
            SET review_results["category_scores"][category["category"]] = avg_score
            
            IF length(category_issues) > 0 THEN
                SET review_results["issues_found"][category["category"]] = category_issues
            ENDIF
        ENDFOR
        
        // Calculate overall score
        SET total_score = 0
        FOR each category IN review_results["category_scores"]
            SET total_score = total_score + category["score"]
        ENDFOR
        SET review_results["overall_score"] = total_score / length(review_criteria)
        
        // Generate recommendations
        IF review_results["overall_score"] < 3 THEN
            add_to_array(review_results["recommendations"], "Major revisions needed before approval")
        ELSE IF review_results["overall_score"] < 4 THEN
            add_to_array(review_results["recommendations"], "Minor improvements needed")
        ELSE
            add_to_array(review_results["recommendations"], "Code approved with minor or no changes")
        ENDIF
        
        RETURN review_results
    END FUNCTION
END</code></pre>
    
    <h3>2. Continuous Integration Testing</h3>
    <pre><code>BEGIN Continuous_Integration_Pipeline
    DISPLAY "=== CONTINUOUS INTEGRATION PIPELINE ==="
    
    FUNCTION Run_CI_Pipeline(code_changes)
        SET pipeline_results = {
            stage_results: [],
            overall_success: TRUE,
            deployment_ready: FALSE
        }
        
        // Stage 1: Code Quality Checks
        DISPLAY "Stage 1: Running code quality checks..."
        SET quality_result = Run_Code_Quality_Checks(code_changes)
        add_to_array(pipeline_results["stage_results"], {
            stage: "Code Quality",
            success: quality_result["success"],
            details: quality_result
        })
        
        IF NOT quality_result["success"] THEN
            SET pipeline_results["overall_success"] = FALSE
            DISPLAY "❌ Code quality checks failed"
            RETURN pipeline_results
        ENDIF
        DISPLAY "✅ Code quality checks passed"
        
        // Stage 2: Unit Tests
        DISPLAY "\nStage 2: Running unit tests..."
        SET unit_test_result = Run_All_Unit_Tests()
        add_to_array(pipeline_results["stage_results"], {
            stage: "Unit Tests",
            success: unit_test_result["success"],
            details: unit_test_result
        })
        
        IF NOT unit_test_result["success"] THEN
            SET pipeline_results["overall_success"] = FALSE
            DISPLAY "❌ Unit tests failed"
            RETURN pipeline_results
        ENDIF
        DISPLAY "✅ Unit tests passed (" + unit_test_result["passed"] + "/" + unit_test_result["total"] + ")"
        
        // Stage 3: Integration Tests
        DISPLAY "\nStage 3: Running integration tests..."
        SET integration_result = Run_Integration_Tests()
        add_to_array(pipeline_results["stage_results"], {
            stage: "Integration Tests",
            success: integration_result["success"],
            details: integration_result
        })
        
        IF NOT integration_result["success"] THEN
            SET pipeline_results["overall_success"] = FALSE
            DISPLAY "❌ Integration tests failed"
            RETURN pipeline_results
        ENDIF
        DISPLAY "✅ Integration tests passed"
        
        // Stage 4: Security Scan
        DISPLAY "\nStage 4: Running security scan..."
        SET security_result = Run_Security_Scan(code_changes)
        add_to_array(pipeline_results["stage_results"], {
            stage: "Security Scan",
            success: security_result["success"],
            details: security_result
        })
        
        IF NOT security_result["success"] THEN
            SET pipeline_results["overall_success"] = FALSE
            DISPLAY "❌ Security scan found vulnerabilities"
            RETURN pipeline_results
        ENDIF
        DISPLAY "✅ Security scan passed"
        
        // Stage 5: Performance Tests
        DISPLAY "\nStage 5: Running performance tests..."
        SET performance_result = Run_Performance_Tests()
        add_to_array(pipeline_results["stage_results"], {
            stage: "Performance Tests",
            success: performance_result["success"],
            details: performance_result
        })
        
        IF NOT performance_result["success"] THEN
            DISPLAY "⚠️ Performance tests failed (non-blocking)"
        ELSE
            DISPLAY "✅ Performance tests passed"
        ENDIF
        
        // Final decision
        IF pipeline_results["overall_success"] THEN
            SET pipeline_results["deployment_ready"] = TRUE
            DISPLAY "\n🎉 All pipeline stages passed! Ready for deployment."
        ELSE
            DISPLAY "\n❌ Pipeline failed. Deployment blocked."
        ENDIF
        
        RETURN pipeline_results
    END FUNCTION
    
    // Example usage
    SET code_changes = Get_Latest_Code_Changes()
    SET pipeline_result = Run_CI_Pipeline(code_changes)
    
    IF pipeline_result["deployment_ready"] THEN
        DISPLAY "Triggering automated deployment..."
        Deploy_To_Staging()
    ELSE
        DISPLAY "Notifying developers of pipeline failure..."
        Send_Failure_Notification(pipeline_result)
    ENDIF
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "test-case-designer",
      title: "Design Test Cases",
      description: "Create comprehensive test cases for different scenarios.",
      functions: [
        {
          name: "Calculate_Grade",
          description: "Takes a score (0-100) and returns letter grade (A, B, C, D, F)",
          parameters: ["score"],
          userTask: "Design test cases covering normal cases, boundary values, and edge cases"
        },
        {
          name: "Validate_Email",
          description: "Validates email format and returns true/false",
          parameters: ["email"],
          userTask: "Create test cases for valid emails, invalid formats, and edge cases"
        }
      ]
    },
    {
      type: "bug-hunter",
      title: "Find the Bugs",
      description: "Identify bugs in code snippets and suggest fixes.",
      codeSnippets: [
        {
          code: `FUNCTION Find_Average(numbers)
    SET sum = 0
    FOR each num IN numbers
        SET sum = sum + num
    ENDFOR
    RETURN sum / length(numbers)
END FUNCTION`,
          bugs: ["Division by zero when array is empty"],
          fixes: ["Check if array is empty before division"]
        },
        {
          code: `FUNCTION Is_Prime(n)
    FOR i = 2 TO n - 1
        IF n MOD i = 0 THEN
            RETURN FALSE
        ENDIF
    ENDFOR
    RETURN TRUE
END FUNCTION`,
          bugs: ["Returns true for n=1 (not prime)", "Inefficient - checks all numbers up to n-1"],
          fixes: ["Add check for n <= 1", "Only check up to square root of n"]
        }
      ]
    },
    {
      type: "tdd-simulator",
      title: "Practice Test-Driven Development",
      description: "Follow the TDD cycle to build a function step by step.",
      challenge: "Build a function that validates credit card numbers using the Luhn algorithm",
      steps: [
        "Write a failing test for basic number validation",
        "Implement minimal code to pass the test",
        "Add test for Luhn algorithm validation",
        "Implement Luhn algorithm",
        "Refactor code for better structure",
        "Add tests for edge cases"
      ]
    },
    {
      type: "debugging-detective",
      title: "Debug the Mystery",
      description: "Use debugging techniques to solve programming mysteries.",
      scenarios: [
        {
          problem: "Function returns wrong result for certain inputs",
          symptoms: "Works for positive numbers but fails for negative numbers",
          debuggingSteps: ["Add print statements", "Check initialization values", "Test boundary conditions"],
          solution: "Variable initialized to 0 instead of first array element"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Economics of Software Testing",
      content: `
        <p>Understanding the cost-benefit relationship of testing helps justify investment in quality assurance:</p>
        
        <h4>Cost of Bugs by Development Phase</h4>
        <p>Research shows that the cost of fixing bugs increases exponentially as they progress through development phases:</p>
        <ul>
          <li><strong>Requirements phase:</strong> $1 to fix</li>
          <li><strong>Design phase:</strong> $5 to fix</li>
          <li><strong>Implementation phase:</strong> $10 to fix</li>
          <li><strong>Testing phase:</strong> $20 to fix</li>
          <li><strong>Production phase:</strong> $200+ to fix</li>
        </ul>
        
        <h4>Return on Investment (ROI) of Testing</h4>
        <p>Studies indicate that every dollar spent on testing saves $4-7 in maintenance and support costs. Organizations with mature testing practices report 40-50% fewer production defects.</p>
        
        <h4>Business Impact of Quality</h4>
        <p>High-quality software leads to increased customer satisfaction, reduced support costs, faster feature delivery, and improved team morale. Poor quality software can damage reputation and lose customers permanently.</p>
      `
    },
    {
      title: "Psychology of Testing and Debugging",
      content: `
        <p>Testing and debugging involve complex cognitive processes that can be improved through understanding:</p>
        
        <h4>Confirmation Bias in Testing</h4>
        <p>Developers often unconsciously test their code to prove it works rather than to find bugs. Effective testing requires a mindset shift to actively seek failures and edge cases.</p>
        
        <h4>The Debugging Mindset</h4>
        <p>Successful debugging requires systematic thinking, patience, and the ability to form and test hypotheses. It's a scientific process of observation, hypothesis formation, and experimentation.</p>
        
        <h4>Cognitive Load and Error Detection</h4>
        <p>Complex code increases cognitive load, making bugs harder to spot. Good testing practices and code organization reduce mental overhead and improve error detection rates.</p>
        
        <h4>Team Dynamics in Quality Assurance</h4>
        <p>Effective testing cultures encourage open communication about bugs without blame, treat testing as a collaborative effort, and value quality as a shared responsibility.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "In the Test-Driven Development (TDD) cycle, what does the 'Red' phase represent?",
      options: ["Writing code that passes tests", "Writing failing tests first", "Refactoring existing code", "Running all tests"],
      correct: 1,
      explanation: "The 'Red' phase in TDD involves writing a failing test first, before any implementation code exists."
    },
    {
      type: "scenario-based",
      question: "You're testing a login function that should accept usernames of 3-20 characters. What test cases would you create to ensure comprehensive coverage?",
      sampleAnswer: "Test cases: 1) Valid username (8 chars), 2) Minimum valid (3 chars), 3) Maximum valid (20 chars), 4) Too short (2 chars), 5) Too long (21 chars), 6) Empty string, 7) Special characters, 8) Numbers only, 9) Mixed case, 10) Leading/trailing spaces",
      rubric: [
        "Includes valid cases within range",
        "Tests boundary values (3 and 20 characters)",
        "Tests invalid cases (too short, too long)",
        "Considers edge cases (empty, special chars)",
        "Tests different character types"
      ]
    },
    {
      type: "debugging-challenge",
      question: "This function should return the second largest number in an array, but it's not working correctly. Identify and fix the bug:\n\nFUNCTION Find_Second_Largest(numbers)\n    SET largest = numbers[0]\n    SET second_largest = numbers[0]\n    \n    FOR i = 1 TO length(numbers) - 1\n        IF numbers[i] > largest THEN\n            SET largest = numbers[i]\n        ELSE IF numbers[i] > second_largest THEN\n            SET second_largest = numbers[i]\n        ENDIF\n    ENDFOR\n    \n    RETURN second_largest\nEND FUNCTION",
      correctFix: "Initialize second_largest to a very small value (or numbers[1] after checking array length >= 2), because initializing both to numbers[0] means second_largest can never be updated when the first element is the largest.",
      explanation: "The bug occurs because both variables start with the same value, preventing second_largest from being updated correctly."
    },
    {
      type: "test-design",
      question: "Design a comprehensive test plan for an e-commerce shopping cart system. Include different types of tests and specific test cases.",
      rubric: [
        "Includes unit tests for individual functions (add item, remove item, calculate total)",
        "Includes integration tests for cart-payment system interaction",
        "Includes system tests for complete purchase workflow",
        "Includes user acceptance tests from customer perspective",
        "Considers edge cases (empty cart, invalid items, payment failures)",
        "Includes performance and security testing considerations"
      ]
    },
    {
      type: "code-review",
      question: "Review this code and identify potential issues:\n\nFUNCTION Process_User_Data(data)\n    FOR each user IN data\n        SET email = user.email\n        SET query = 'INSERT INTO users VALUES (' + user.id + ', \'' + user.name + '\', \'' + email + '\')'\n        execute_sql(query)\n    ENDFOR\nEND FUNCTION",
      issues: ["SQL injection vulnerability", "No input validation", "No error handling", "No transaction management", "Hardcoded SQL structure"],
      improvements: ["Use parameterized queries", "Validate input data", "Add try-catch blocks", "Use database transactions", "Separate data access logic"]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Build a Testing Framework",
      description: "Create a simple testing framework with assertion methods, test runners, and reporting capabilities.",
      difficulty: "hard",
      hints: ["Start with basic assert functions", "Add test discovery and execution", "Include detailed reporting and statistics"]
    },
    {
      title: "Automated Bug Report Generator",
      description: "Design a system that automatically generates detailed bug reports when tests fail, including stack traces, variable states, and reproduction steps.",
      difficulty: "hard",
      hints: ["Capture execution context", "Generate step-by-step reproduction guides", "Include environment information"]
    },
    {
      title: "Performance Testing Suite",
      description: "Create a performance testing system that measures execution time, memory usage, and identifies performance regressions.",
      difficulty: "medium",
      hints: ["Measure execution time accurately", "Track memory allocation", "Compare against baseline performance"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Unit Testing",
      definition: "Testing individual components or functions in isolation to verify they work correctly"
    },
    {
      term: "Integration Testing",
      definition: "Testing the interaction between different components or systems to ensure they work together properly"
    },
    {
      term: "Test-Driven Development (TDD)",
      definition: "A development approach where tests are written before the actual code, following a Red-Green-Refactor cycle"
    },
    {
      term: "Debugging",
      definition: "The process of finding, analyzing, and fixing bugs or defects in software"
    },
    {
      term: "Regression Testing",
      definition: "Re-running tests to ensure that new changes haven't broken existing functionality"
    },
    {
      term: "Code Coverage",
      definition: "A metric that measures the percentage of code executed during testing"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of functions and procedures",
    "Knowledge of conditional statements and loops",
    "Familiarity with debugging concepts",
    "Basic understanding of software development lifecycle"
  ],
  
  nextSteps: [
    "Learn advanced testing frameworks and tools",
    "Explore automated testing and continuous integration",
    "Study performance testing and load testing",
    "Practice security testing and vulnerability assessment",
    "Learn about test automation and testing in production"
  ]
};