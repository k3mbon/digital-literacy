// Lesson 3.2: Data Security - Comprehensive lesson content

export default {
  title: "Data Security",
  description: "Master the fundamentals of data security, encryption, authentication, and cybersecurity best practices",
  difficulty: "intermediate",
  estimatedTime: "80 minutes",
  
  // Learning objectives
  objectives: [
    "Understand fundamental data security concepts and threats",
    "Learn about encryption methods and cryptographic principles",
    "Master authentication and access control mechanisms",
    "Explore network security protocols and implementations",
    "Apply cybersecurity best practices and incident response"
  ],
  
  // Main lesson content
  content: `
    <h2>Introduction to Data Security</h2>
    <p><strong>Data security</strong> refers to the practice of protecting digital information from unauthorized access, corruption, or theft throughout its entire lifecycle. In our interconnected world, data security is crucial for protecting personal privacy, business operations, and national security.</p>
    
    <p>The CIA Triad forms the foundation of information security:</p>
    <ul>
      <li><strong>Confidentiality:</strong> Ensuring information is accessible only to authorized individuals</li>
      <li><strong>Integrity:</strong> Maintaining the accuracy and completeness of data</li>
      <li><strong>Availability:</strong> Ensuring information and resources are accessible when needed</li>
    </ul>
    
    <h2>Common Security Threats and Vulnerabilities</h2>
    
    <h3>Types of Cyber Threats</h3>
    <pre><code>BEGIN Cyber_Threats_Analysis
    DISPLAY "=== COMMON CYBER THREATS ==="
    
    // Malware Categories
    SET malware_types = [
        {
            name: "Virus",
            description: "Malicious code that attaches to legitimate programs",
            behavior: "Replicates when host program runs",
            damage: ["File corruption", "System slowdown", "Data theft"],
            prevention: ["Antivirus software", "Regular updates", "Safe browsing"]
        },
        {
            name: "Worm",
            description: "Self-replicating malware that spreads across networks",
            behavior: "Spreads automatically without user interaction",
            damage: ["Network congestion", "System crashes", "Resource consumption"],
            prevention: ["Network segmentation", "Firewalls", "Patch management"]
        },
        {
            name: "Trojan Horse",
            description: "Malware disguised as legitimate software",
            behavior: "Appears harmless but performs malicious actions",
            damage: ["Data theft", "System backdoors", "Identity theft"],
            prevention: ["Software verification", "User education", "Behavioral analysis"]
        },
        {
            name: "Ransomware",
            description: "Encrypts victim's files and demands payment",
            behavior: "Locks files and displays ransom message",
            damage: ["Data encryption", "Business disruption", "Financial loss"],
            prevention: ["Regular backups", "Network isolation", "Employee training"]
        },
        {
            name: "Spyware",
            description: "Secretly monitors and collects user information",
            behavior: "Runs hidden in background",
            damage: ["Privacy violation", "Identity theft", "Performance degradation"],
            prevention: ["Anti-spyware tools", "Privacy settings", "Regular scans"]
        }
    ]
    
    DISPLAY "Malware Types and Characteristics:"
    FOR each malware IN malware_types
        DISPLAY "\n" + malware["name"] + ":"
        DISPLAY "  Description: " + malware["description"]
        DISPLAY "  Behavior: " + malware["behavior"]
        DISPLAY "  Potential Damage:"
        FOR each damage IN malware["damage"]
            DISPLAY "    • " + damage
        ENDFOR
        DISPLAY "  Prevention Methods:"
        FOR each prevention IN malware["prevention"]
            DISPLAY "    ✓ " + prevention
        ENDFOR
    ENDFOR
    
    // Social Engineering Attacks
    DISPLAY "\n=== SOCIAL ENGINEERING ATTACKS ==="
    
    SET social_engineering = [
        {
            name: "Phishing",
            method: "Fraudulent emails or websites to steal credentials",
            example: "Fake bank email asking to verify account details",
            indicators: ["Urgent language", "Suspicious sender", "Generic greetings", "Spelling errors"],
            protection: ["Verify sender identity", "Check URLs carefully", "Use multi-factor authentication"]
        },
        {
            name: "Spear Phishing",
            method: "Targeted phishing attacks against specific individuals",
            example: "Personalized email to CEO requesting wire transfer",
            indicators: ["Highly personalized content", "Requests for sensitive actions", "Time pressure"],
            protection: ["Verification procedures", "Employee training", "Email filtering"]
        },
        {
            name: "Pretexting",
            method: "Creating false scenarios to obtain information",
            example: "Caller pretending to be IT support requesting passwords",
            indicators: ["Unsolicited contact", "Requests for sensitive info", "Claims of urgency"],
            protection: ["Identity verification protocols", "Never give info over phone", "Callback procedures"]
        },
        {
            name: "Baiting",
            method: "Offering something enticing to trigger malicious actions",
            example: "USB drive labeled 'Salary Information' left in parking lot",
            indicators: ["Too good to be true offers", "Unexpected physical media", "Curiosity triggers"],
            protection: ["Security awareness", "Device policies", "Skeptical mindset"]
        }
    ]
    
    DISPLAY "Social Engineering Attack Types:"
    FOR each attack IN social_engineering
        DISPLAY "\n" + attack["name"] + ":"
        DISPLAY "  Method: " + attack["method"]
        DISPLAY "  Example: " + attack["example"]
        DISPLAY "  Warning Indicators:"
        FOR each indicator IN attack["indicators"]
            DISPLAY "    ⚠ " + indicator
        ENDFOR
        DISPLAY "  Protection Strategies:"
        FOR each protection IN attack["protection"]
            DISPLAY "    🛡 " + protection
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Cryptography and Encryption</h2>
    
    <h3>Fundamental Cryptographic Concepts</h3>
    <pre><code>BEGIN Cryptography_Fundamentals
    DISPLAY "=== CRYPTOGRAPHY BASICS ==="
    DISPLAY "Cryptography: The practice of securing information through mathematical algorithms"
    
    // Key Terminology
    SET crypto_terms = [
        {term: "Plaintext", definition: "Original, readable message before encryption"},
        {term: "Ciphertext", definition: "Encrypted message that appears as random data"},
        {term: "Key", definition: "Secret value used to encrypt and decrypt data"},
        {term: "Algorithm", definition: "Mathematical procedure for encryption/decryption"},
        {term: "Cipher", definition: "Complete cryptographic system (algorithm + key)"},
        {term: "Cryptanalysis", definition: "Science of breaking encrypted messages"}
    ]
    
    DISPLAY "\nCryptographic Terminology:"
    FOR each term IN crypto_terms
        DISPLAY "  " + term["term"] + ": " + term["definition"]
    ENDFOR
    
    // Symmetric Encryption
    DISPLAY "\n=== SYMMETRIC ENCRYPTION ==="
    DISPLAY "Uses the same key for both encryption and decryption"
    
    SET symmetric_algorithms = [
        {
            name: "AES (Advanced Encryption Standard)",
            key_sizes: ["128-bit", "192-bit", "256-bit"],
            block_size: "128-bit",
            security: "Very High",
            speed: "Fast",
            use_cases: ["File encryption", "VPN tunnels", "Wireless security", "Database encryption"]
        },
        {
            name: "DES (Data Encryption Standard)",
            key_sizes: ["56-bit"],
            block_size: "64-bit",
            security: "Weak (deprecated)",
            speed: "Fast",
            use_cases: ["Legacy systems (not recommended)"]
        },
        {
            name: "3DES (Triple DES)",
            key_sizes: ["112-bit", "168-bit"],
            block_size: "64-bit",
            security: "Moderate (being phased out)",
            speed: "Slow",
            use_cases: ["Legacy financial systems", "Transitional implementations"]
        }
    ]
    
    FOR each algorithm IN symmetric_algorithms
        DISPLAY "\n" + algorithm["name"] + ":"
        DISPLAY "  Key Sizes: " + join(algorithm["key_sizes"], ", ")
        DISPLAY "  Block Size: " + algorithm["block_size"]
        DISPLAY "  Security Level: " + algorithm["security"]
        DISPLAY "  Performance: " + algorithm["speed"]
        DISPLAY "  Use Cases:"
        FOR each use_case IN algorithm["use_cases"]
            DISPLAY "    • " + use_case
        ENDFOR
    ENDFOR
    
    // Symmetric Encryption Example
    DISPLAY "\n=== SYMMETRIC ENCRYPTION EXAMPLE ==="
    
    FUNCTION demonstrate_symmetric_encryption()
        SET plaintext = "Hello, World!"
        SET key = "MySecretKey123"
        
        DISPLAY "Original Message: " + plaintext
        DISPLAY "Encryption Key: " + key
        
        // Simulate encryption (simplified)
        SET ciphertext = encrypt_aes(plaintext, key)
        DISPLAY "Encrypted Message: " + ciphertext
        
        // Simulate decryption
        SET decrypted = decrypt_aes(ciphertext, key)
        DISPLAY "Decrypted Message: " + decrypted
        
        IF decrypted == plaintext THEN
            DISPLAY "✓ Encryption/Decryption successful!"
        ELSE
            DISPLAY "✗ Encryption/Decryption failed!"
        ENDIF
    END FUNCTION
    
    CALL demonstrate_symmetric_encryption()
    
    // Asymmetric Encryption
    DISPLAY "\n=== ASYMMETRIC ENCRYPTION ==="
    DISPLAY "Uses a pair of mathematically related keys: public and private"
    
    SET asymmetric_algorithms = [
        {
            name: "RSA (Rivest-Shamir-Adleman)",
            key_sizes: ["1024-bit (deprecated)", "2048-bit (standard)", "4096-bit (high security)"],
            security_basis: "Factoring large prime numbers",
            speed: "Slow",
            use_cases: ["Digital signatures", "Key exchange", "SSL/TLS certificates", "Email encryption"]
        },
        {
            name: "ECC (Elliptic Curve Cryptography)",
            key_sizes: ["256-bit", "384-bit", "521-bit"],
            security_basis: "Elliptic curve discrete logarithm problem",
            speed: "Faster than RSA",
            use_cases: ["Mobile devices", "IoT security", "Modern TLS", "Cryptocurrency"]
        },
        {
            name: "Diffie-Hellman",
            key_sizes: ["2048-bit", "3072-bit"],
            security_basis: "Discrete logarithm problem",
            speed: "Moderate",
            use_cases: ["Key exchange", "VPN setup", "Secure communications"]
        }
    ]
    
    FOR each algorithm IN asymmetric_algorithms
        DISPLAY "\n" + algorithm["name"] + ":"
        DISPLAY "  Key Sizes: " + join(algorithm["key_sizes"], ", ")
        DISPLAY "  Security Basis: " + algorithm["security_basis"]
        DISPLAY "  Performance: " + algorithm["speed"]
        DISPLAY "  Use Cases:"
        FOR each use_case IN algorithm["use_cases"]
            DISPLAY "    • " + use_case
        ENDFOR
    ENDFOR
    
    // Asymmetric Encryption Example
    DISPLAY "\n=== ASYMMETRIC ENCRYPTION EXAMPLE ==="
    
    FUNCTION demonstrate_asymmetric_encryption()
        // Key generation
        SET key_pair = generate_rsa_keys(2048)
        SET public_key = key_pair["public"]
        SET private_key = key_pair["private"]
        
        DISPLAY "RSA Key Pair Generated:"
        DISPLAY "  Public Key: " + public_key[0:50] + "..."
        DISPLAY "  Private Key: " + private_key[0:50] + "..."
        
        SET message = "Confidential Data"
        DISPLAY "\nOriginal Message: " + message
        
        // Encryption with public key
        SET encrypted = encrypt_rsa(message, public_key)
        DISPLAY "Encrypted with Public Key: " + encrypted[0:50] + "..."
        
        // Decryption with private key
        SET decrypted = decrypt_rsa(encrypted, private_key)
        DISPLAY "Decrypted with Private Key: " + decrypted
        
        IF decrypted == message THEN
            DISPLAY "✓ Asymmetric encryption successful!"
        ELSE
            DISPLAY "✗ Asymmetric encryption failed!"
        ENDIF
    END FUNCTION
    
    CALL demonstrate_asymmetric_encryption()
END</code></pre>
    
    <h3>Hash Functions and Digital Signatures</h3>
    <pre><code>BEGIN Hash_Functions_Digital_Signatures
    DISPLAY "=== CRYPTOGRAPHIC HASH FUNCTIONS ==="
    DISPLAY "One-way functions that produce fixed-size output from variable input"
    
    // Hash Function Properties
    SET hash_properties = [
        "Deterministic: Same input always produces same output",
        "Fixed Output Size: Always produces same length hash",
        "Avalanche Effect: Small input change causes large output change",
        "One-way: Computationally infeasible to reverse",
        "Collision Resistant: Hard to find two inputs with same hash"
    ]
    
    DISPLAY "Hash Function Properties:"
    FOR each property IN hash_properties
        DISPLAY "  • " + property
    ENDFOR
    
    // Common Hash Algorithms
    SET hash_algorithms = [
        {
            name: "SHA-256 (Secure Hash Algorithm)",
            output_size: "256 bits (32 bytes)",
            security: "Very High",
            speed: "Fast",
            use_cases: ["Bitcoin mining", "Digital certificates", "Password hashing", "File integrity"]
        },
        {
            name: "SHA-3",
            output_size: "224, 256, 384, or 512 bits",
            security: "Very High",
            speed: "Moderate",
            use_cases: ["Next-generation security", "Government applications", "Long-term security"]
        },
        {
            name: "MD5 (Message Digest 5)",
            output_size: "128 bits (16 bytes)",
            security: "Weak (deprecated)",
            speed: "Very Fast",
            use_cases: ["File checksums (non-security)", "Legacy systems"]
        },
        {
            name: "bcrypt",
            output_size: "Variable",
            security: "High (adaptive)",
            speed: "Intentionally Slow",
            use_cases: ["Password hashing", "User authentication", "Secure storage"]
        }
    ]
    
    DISPLAY "\nCommon Hash Algorithms:"
    FOR each algorithm IN hash_algorithms
        DISPLAY "\n" + algorithm["name"] + ":"
        DISPLAY "  Output Size: " + algorithm["output_size"]
        DISPLAY "  Security Level: " + algorithm["security"]
        DISPLAY "  Performance: " + algorithm["speed"]
        DISPLAY "  Use Cases:"
        FOR each use_case IN algorithm["use_cases"]
            DISPLAY "    • " + use_case
        ENDFOR
    ENDFOR
    
    // Hash Function Example
    DISPLAY "\n=== HASH FUNCTION DEMONSTRATION ==="
    
    FUNCTION demonstrate_hashing()
        SET messages = [
            "Hello, World!",
            "Hello, World",  // Note: missing exclamation mark
            "The quick brown fox jumps over the lazy dog",
            "The quick brown fox jumps over the lazy dog."
        ]
        
        DISPLAY "SHA-256 Hash Examples:"
        FOR each message IN messages
            SET hash_value = sha256(message)
            DISPLAY "\nMessage: '" + message + "'"
            DISPLAY "SHA-256: " + hash_value
            DISPLAY "Length: " + length(hash_value) + " characters"
        ENDFOR
        
        DISPLAY "\nObservations:"
        DISPLAY "• Small changes in input cause completely different hashes"
        DISPLAY "• All hashes are exactly 64 characters (256 bits in hex)"
        DISPLAY "• Same input always produces same hash"
    END FUNCTION
    
    CALL demonstrate_hashing()
    
    // Digital Signatures
    DISPLAY "\n=== DIGITAL SIGNATURES ==="
    DISPLAY "Cryptographic mechanism to verify authenticity and integrity"
    
    FUNCTION demonstrate_digital_signature()
        DISPLAY "Digital Signature Process:"
        
        // Step 1: Create message
        SET document = "Important Contract Terms"
        DISPLAY "\n1. Original Document: " + document
        
        // Step 2: Hash the document
        SET document_hash = sha256(document)
        DISPLAY "2. Document Hash: " + document_hash[0:20] + "..."
        
        // Step 3: Sign the hash with private key
        SET private_key = "[Private Key of Sender]"
        SET signature = sign_rsa(document_hash, private_key)
        DISPLAY "3. Digital Signature: " + signature[0:20] + "..."
        
        // Step 4: Send document + signature
        DISPLAY "4. Send: Document + Signature"
        
        DISPLAY "\nVerification Process:"
        
        // Step 5: Receiver hashes the document
        SET received_hash = sha256(document)
        DISPLAY "5. Hash Received Document: " + received_hash[0:20] + "..."
        
        // Step 6: Verify signature with public key
        SET public_key = "[Public Key of Sender]"
        SET is_valid = verify_rsa_signature(signature, received_hash, public_key)
        
        IF is_valid THEN
            DISPLAY "6. Signature Verification: ✓ VALID"
            DISPLAY "   • Document is authentic (from claimed sender)"
            DISPLAY "   • Document has not been tampered with"
            DISPLAY "   • Sender cannot deny sending it (non-repudiation)"
        ELSE
            DISPLAY "6. Signature Verification: ✗ INVALID"
            DISPLAY "   • Document may be forged or tampered with"
        ENDIF
    END FUNCTION
    
    CALL demonstrate_digital_signature()
END</code></pre>
    
    <h2>Authentication and Access Control</h2>
    
    <h3>Authentication Methods</h3>
    <pre><code>BEGIN Authentication_Methods
    DISPLAY "=== AUTHENTICATION FUNDAMENTALS ==="
    DISPLAY "Authentication: Verifying the identity of users, devices, or systems"
    
    // Authentication Factors
    SET auth_factors = [
        {
            factor: "Something You Know",
            category: "Knowledge Factor",
            examples: ["Passwords", "PINs", "Security questions", "Passphrases"],
            strengths: ["Easy to implement", "No additional hardware", "Familiar to users"],
            weaknesses: ["Can be forgotten", "Can be shared", "Vulnerable to attacks", "Weak passwords common"]
        },
        {
            factor: "Something You Have",
            category: "Possession Factor",
            examples: ["Smart cards", "Tokens", "Mobile phones", "USB keys"],
            strengths: ["Physical possession required", "Harder to duplicate", "Can be combined with other factors"],
            weaknesses: ["Can be lost or stolen", "Additional cost", "Battery dependency"]
        },
        {
            factor: "Something You Are",
            category: "Inherence Factor",
            examples: ["Fingerprints", "Iris scans", "Voice recognition", "Facial recognition"],
            strengths: ["Unique to individual", "Cannot be forgotten", "Difficult to forge"],
            weaknesses: ["Privacy concerns", "Expensive technology", "False positives/negatives"]
        },
        {
            factor: "Somewhere You Are",
            category: "Location Factor",
            examples: ["GPS coordinates", "IP address", "Network location", "Geofencing"],
            strengths: ["Context-aware security", "Automatic verification", "Fraud detection"],
            weaknesses: ["Location spoofing", "Privacy issues", "Accuracy limitations"]
        }
    ]
    
    DISPLAY "Authentication Factors:"
    FOR each factor IN auth_factors
        DISPLAY "\n" + factor["factor"] + " (" + factor["category"] + "):"
        DISPLAY "  Examples:"
        FOR each example IN factor["examples"]
            DISPLAY "    • " + example
        ENDFOR
        DISPLAY "  Strengths:"
        FOR each strength IN factor["strengths"]
            DISPLAY "    ✓ " + strength
        ENDFOR
        DISPLAY "  Weaknesses:"
        FOR each weakness IN factor["weaknesses"]
            DISPLAY "    ✗ " + weakness
        ENDFOR
    ENDFOR
    
    // Multi-Factor Authentication (MFA)
    DISPLAY "\n=== MULTI-FACTOR AUTHENTICATION (MFA) ==="
    DISPLAY "Using two or more authentication factors for enhanced security"
    
    SET mfa_implementations = [
        {
            name: "Two-Factor Authentication (2FA)",
            description: "Combines two different authentication factors",
            common_combinations: [
                "Password + SMS code",
                "Password + Authenticator app",
                "Smart card + PIN",
                "Biometric + Password"
            ],
            security_level: "High",
            user_experience: "Moderate complexity"
        },
        {
            name: "Three-Factor Authentication (3FA)",
            description: "Uses three different authentication factors",
            common_combinations: [
                "Password + Token + Fingerprint",
                "Smart card + PIN + Location",
                "Biometric + Password + Device"
            ],
            security_level: "Very High",
            user_experience: "Higher complexity"
        },
        {
            name: "Adaptive Authentication",
            description: "Adjusts authentication requirements based on risk",
            common_combinations: [
                "Low risk: Password only",
                "Medium risk: Password + SMS",
                "High risk: Password + Token + Biometric"
            ],
            security_level: "Variable (Risk-based)",
            user_experience: "Context-dependent"
        }
    ]
    
    FOR each implementation IN mfa_implementations
        DISPLAY "\n" + implementation["name"] + ":"
        DISPLAY "  Description: " + implementation["description"]
        DISPLAY "  Common Combinations:"
        FOR each combo IN implementation["common_combinations"]
            DISPLAY "    • " + combo
        ENDFOR
        DISPLAY "  Security Level: " + implementation["security_level"]
        DISPLAY "  User Experience: " + implementation["user_experience"]
    ENDFOR
    
    // Password Security Best Practices
    DISPLAY "\n=== PASSWORD SECURITY BEST PRACTICES ==="
    
    FUNCTION demonstrate_password_security()
        SET password_examples = [
            {
                password: "password123",
                strength: "Very Weak",
                issues: ["Common word", "Predictable pattern", "Too short", "No special characters"],
                crack_time: "Instantly"
            },
            {
                password: "P@ssw0rd!",
                strength: "Weak",
                issues: ["Common substitutions", "Dictionary word base", "Predictable"],
                crack_time: "Minutes"
            },
            {
                password: "MyDog'sName2023!",
                strength: "Moderate",
                issues: ["Personal information", "Predictable year"],
                crack_time: "Days to weeks"
            },
            {
                password: "Tr0ub4dor&3",
                strength: "Good",
                issues: ["Could be stronger with more length"],
                crack_time: "Years"
            },
            {
                password: "correct-horse-battery-staple-2023",
                strength: "Excellent",
                issues: ["None - follows best practices"],
                crack_time: "Centuries"
            }
        ]
        
        DISPLAY "Password Strength Examples:"
        FOR each example IN password_examples
            DISPLAY "\nPassword: " + example["password"]
            DISPLAY "Strength: " + example["strength"]
            DISPLAY "Issues:"
            FOR each issue IN example["issues"]
                DISPLAY "  • " + issue
            ENDFOR
            DISPLAY "Estimated Crack Time: " + example["crack_time"]
        ENDFOR
        
        DISPLAY "\nPassword Best Practices:"
        SET best_practices = [
            "Use at least 12-16 characters",
            "Include uppercase, lowercase, numbers, and symbols",
            "Avoid dictionary words and personal information",
            "Use unique passwords for each account",
            "Consider passphrases (multiple words)",
            "Use a password manager",
            "Enable multi-factor authentication",
            "Regular password updates for sensitive accounts"
        ]
        
        FOR each practice IN best_practices
            DISPLAY "  ✓ " + practice
        ENDFOR
    END FUNCTION
    
    CALL demonstrate_password_security()
END</code></pre>
    
    <h2>Network Security Protocols</h2>
    
    <h3>Secure Communication Protocols</h3>
    <pre><code>BEGIN Network_Security_Protocols
    DISPLAY "=== SECURE COMMUNICATION PROTOCOLS ==="
    
    // SSL/TLS Protocol
    DISPLAY "\n--- SSL/TLS (Secure Sockets Layer / Transport Layer Security) ---"
    
    SET tls_versions = [
        {
            version: "SSL 2.0",
            year: "1995",
            status: "Deprecated (insecure)",
            issues: ["Weak encryption", "No integrity protection", "Vulnerable to attacks"]
        },
        {
            version: "SSL 3.0",
            year: "1996",
            status: "Deprecated (POODLE attack)",
            issues: ["Padding oracle attacks", "Weak MAC construction"]
        },
        {
            version: "TLS 1.0",
            year: "1999",
            status: "Deprecated (2020)",
            issues: ["Vulnerable to BEAST attack", "Weak cipher suites"]
        },
        {
            version: "TLS 1.1",
            year: "2006",
            status: "Deprecated (2020)",
            issues: ["Limited improvements over 1.0", "Still vulnerable"]
        },
        {
            version: "TLS 1.2",
            year: "2008",
            status: "Widely Used",
            issues: ["Generally secure with proper configuration"]
        },
        {
            version: "TLS 1.3",
            year: "2018",
            status: "Current Standard",
            issues: ["Most secure, simplified handshake"]
        }
    ]
    
    DISPLAY "TLS/SSL Version History:"
    FOR each version IN tls_versions
        DISPLAY "\n" + version["version"] + " (" + version["year"] + "):"
        DISPLAY "  Status: " + version["status"]
        IF length(version["issues"]) > 0 THEN
            DISPLAY "  Notes:"
            FOR each issue IN version["issues"]
                DISPLAY "    • " + issue
            ENDFOR
        ENDIF
    ENDFOR
    
    // TLS Handshake Process
    DISPLAY "\n=== TLS 1.3 HANDSHAKE PROCESS ==="
    
    FUNCTION demonstrate_tls_handshake()
        DISPLAY "Simplified TLS 1.3 Handshake:"
        
        SET handshake_steps = [
            {
                step: 1,
                sender: "Client",
                action: "Client Hello",
                details: "Sends supported cipher suites, random number, and key share"
            },
            {
                step: 2,
                sender: "Server",
                action: "Server Hello + Certificate + Key Share",
                details: "Selects cipher suite, sends certificate, and key share"
            },
            {
                step: 3,
                sender: "Client",
                action: "Certificate Verification",
                details: "Verifies server certificate and computes shared secret"
            },
            {
                step: 4,
                sender: "Both",
                action: "Finished Messages",
                details: "Both parties confirm handshake completion"
            },
            {
                step: 5,
                sender: "Both",
                action: "Encrypted Communication",
                details: "All subsequent data is encrypted with session keys"
            }
        ]
        
        FOR each step IN handshake_steps
            DISPLAY "\nStep " + step["step"] + " - " + step["sender"] + ": " + step["action"]
            DISPLAY "  " + step["details"]
        ENDFOR
        
        DISPLAY "\nTLS Security Features:"
        SET tls_features = [
            "Encryption: Protects data confidentiality",
            "Authentication: Verifies server identity",
            "Integrity: Detects data tampering",
            "Forward Secrecy: Past sessions remain secure if keys compromised",
            "Perfect Forward Secrecy: Each session uses unique keys"
        ]
        
        FOR each feature IN tls_features
            DISPLAY "  ✓ " + feature
        ENDFOR
    END FUNCTION
    
    CALL demonstrate_tls_handshake()
    
    // VPN Protocols
    DISPLAY "\n=== VPN (VIRTUAL PRIVATE NETWORK) PROTOCOLS ==="
    
    SET vpn_protocols = [
        {
            name: "IPSec (Internet Protocol Security)",
            description: "Suite of protocols for securing IP communications",
            modes: ["Transport Mode (end-to-end)", "Tunnel Mode (gateway-to-gateway)"],
            components: ["AH (Authentication Header)", "ESP (Encapsulating Security Payload)", "IKE (Internet Key Exchange)"],
            use_cases: ["Site-to-site VPNs", "Remote access", "Network layer security"]
        },
        {
            name: "OpenVPN",
            description: "Open-source VPN solution using SSL/TLS",
            modes: ["UDP mode (faster)", "TCP mode (more reliable)"],
            components: ["OpenSSL library", "Custom protocol", "Certificate-based auth"],
            use_cases: ["Remote workers", "Cross-platform support", "Flexible configurations"]
        },
        {
            name: "WireGuard",
            description: "Modern, lightweight VPN protocol",
            modes: ["Point-to-point", "Hub-and-spoke", "Mesh networks"],
            components: ["ChaCha20 encryption", "Curve25519 key exchange", "BLAKE2s hashing"],
            use_cases: ["High-performance VPNs", "Mobile devices", "Cloud environments"]
        },
        {
            name: "PPTP (Point-to-Point Tunneling Protocol)",
            description: "Legacy VPN protocol (deprecated)",
            modes: ["Client-to-server"],
            components: ["GRE tunneling", "MS-CHAP authentication", "MPPE encryption"],
            use_cases: ["Legacy systems (not recommended for security)"]
        }
    ]
    
    DISPLAY "VPN Protocol Comparison:"
    FOR each protocol IN vpn_protocols
        DISPLAY "\n" + protocol["name"] + ":"
        DISPLAY "  Description: " + protocol["description"]
        DISPLAY "  Modes:"
        FOR each mode IN protocol["modes"]
            DISPLAY "    • " + mode
        ENDFOR
        DISPLAY "  Key Components:"
        FOR each component IN protocol["components"]
            DISPLAY "    • " + component
        ENDFOR
        DISPLAY "  Use Cases:"
        FOR each use_case IN protocol["use_cases"]
            DISPLAY "    • " + use_case
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Cybersecurity Best Practices</h2>
    
    <h3>Defense in Depth Strategy</h3>
    <pre><code>BEGIN Defense_In_Depth
    DISPLAY "=== DEFENSE IN DEPTH STRATEGY ==="
    DISPLAY "Layered security approach using multiple defensive measures"
    
    // Security Layers
    SET security_layers = [
        {
            layer: "Physical Security",
            description: "Protecting physical access to systems and facilities",
            controls: [
                "Locked server rooms and data centers",
                "Security cameras and monitoring",
                "Access cards and biometric scanners",
                "Environmental controls (fire, flood, temperature)",
                "Secure disposal of hardware and media"
            ],
            threats_addressed: ["Physical theft", "Unauthorized access", "Environmental damage"]
        },
        {
            layer: "Network Security",
            description: "Protecting network infrastructure and communications",
            controls: [
                "Firewalls and intrusion prevention systems",
                "Network segmentation and VLANs",
                "VPN for remote access",
                "Network monitoring and logging",
                "Wireless security (WPA3, enterprise authentication)"
            ],
            threats_addressed: ["Network intrusions", "Data interception", "Lateral movement"]
        },
        {
            layer: "Host Security",
            description: "Protecting individual computers and servers",
            controls: [
                "Antivirus and anti-malware software",
                "Host-based firewalls",
                "Operating system hardening",
                "Patch management and updates",
                "Endpoint detection and response (EDR)"
            ],
            threats_addressed: ["Malware infections", "System vulnerabilities", "Unauthorized software"]
        },
        {
            layer: "Application Security",
            description: "Securing software applications and services",
            controls: [
                "Secure coding practices",
                "Input validation and sanitization",
                "Application firewalls (WAF)",
                "Regular security testing",
                "Code reviews and static analysis"
            ],
            threats_addressed: ["SQL injection", "Cross-site scripting", "Application vulnerabilities"]
        },
        {
            layer: "Data Security",
            description: "Protecting sensitive information and databases",
            controls: [
                "Data encryption (at rest and in transit)",
                "Database security and access controls",
                "Data loss prevention (DLP)",
                "Backup and recovery procedures",
                "Data classification and handling policies"
            ],
            threats_addressed: ["Data breaches", "Data loss", "Unauthorized data access"]
        },
        {
            layer: "Identity and Access Management",
            description: "Managing user identities and access rights",
            controls: [
                "Multi-factor authentication (MFA)",
                "Role-based access control (RBAC)",
                "Privileged access management (PAM)",
                "Single sign-on (SSO)",
                "Regular access reviews and audits"
            ],
            threats_addressed: ["Unauthorized access", "Privilege escalation", "Account compromise"]
        },
        {
            layer: "Security Awareness and Training",
            description: "Educating users about security threats and practices",
            controls: [
                "Regular security awareness training",
                "Phishing simulation exercises",
                "Security policies and procedures",
                "Incident reporting mechanisms",
                "Security culture development"
            ],
            threats_addressed: ["Social engineering", "Human error", "Insider threats"]
        }
    ]
    
    DISPLAY "Defense in Depth Layers:"
    FOR each layer IN security_layers
        DISPLAY "\n" + layer["layer"] + ":"
        DISPLAY "  Description: " + layer["description"]
        DISPLAY "  Security Controls:"
        FOR each control IN layer["controls"]
            DISPLAY "    • " + control
        ENDFOR
        DISPLAY "  Threats Addressed:"
        FOR each threat IN layer["threats_addressed"]
            DISPLAY "    ⚠ " + threat
        ENDFOR
    ENDFOR
    
    // Incident Response Process
    DISPLAY "\n=== INCIDENT RESPONSE PROCESS ==="
    
    SET incident_phases = [
        {
            phase: "Preparation",
            description: "Establishing incident response capabilities",
            activities: [
                "Develop incident response plan",
                "Form incident response team",
                "Implement monitoring and detection tools",
                "Conduct training and exercises",
                "Establish communication procedures"
            ]
        },
        {
            phase: "Detection and Analysis",
            description: "Identifying and analyzing security incidents",
            activities: [
                "Monitor security alerts and logs",
                "Analyze suspicious activities",
                "Determine incident scope and impact",
                "Classify incident severity",
                "Document initial findings"
            ]
        },
        {
            phase: "Containment",
            description: "Limiting the spread and impact of the incident",
            activities: [
                "Isolate affected systems",
                "Preserve evidence for investigation",
                "Implement temporary fixes",
                "Prevent further damage",
                "Maintain business operations"
            ]
        },
        {
            phase: "Eradication and Recovery",
            description: "Removing threats and restoring normal operations",
            activities: [
                "Remove malware and threats",
                "Patch vulnerabilities",
                "Restore systems from clean backups",
                "Implement additional security measures",
                "Monitor for recurring issues"
            ]
        },
        {
            phase: "Post-Incident Activities",
            description: "Learning from the incident and improving security",
            activities: [
                "Conduct post-incident review",
                "Document lessons learned",
                "Update incident response procedures",
                "Improve security controls",
                "Provide stakeholder reports"
            ]
        }
    ]
    
    DISPLAY "Incident Response Phases:"
    FOR each phase IN incident_phases
        DISPLAY "\n" + phase["phase"] + ":"
        DISPLAY "  Description: " + phase["description"]
        DISPLAY "  Key Activities:"
        FOR each activity IN phase["activities"]
            DISPLAY "    • " + activity
        ENDFOR
    ENDFOR
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "threat-assessment-simulator",
      title: "Cybersecurity Threat Assessment",
      description: "Analyze different cyber threats and recommend appropriate security measures.",
      scenarios: [
        {
          organization: "Small e-commerce business",
          assets: ["Customer database", "Payment processing", "Website", "Email system"],
          threats: ["Credit card fraud", "Data breach", "Website defacement", "Phishing attacks"],
          recommendations: ["PCI DSS compliance", "SSL certificates", "Regular backups", "Employee training"]
        },
        {
          organization: "Healthcare clinic",
          assets: ["Patient records", "Medical devices", "Appointment system", "Billing system"],
          threats: ["HIPAA violations", "Ransomware", "Medical device hacking", "Insider threats"],
          recommendations: ["HIPAA compliance", "Network segmentation", "Access controls", "Encryption"]
        }
      ]
    },
    {
      type: "encryption-lab",
      title: "Cryptography Laboratory",
      description: "Practice with different encryption methods and analyze their security.",
      exercises: [
        {
          type: "Caesar Cipher",
          plaintext: "HELLO WORLD",
          key: "3",
          ciphertext: "KHOOR ZRUOG",
          security: "Very weak - easily broken"
        },
        {
          type: "AES Encryption",
          plaintext: "Confidential Data",
          key: "256-bit key",
          ciphertext: "[Random-looking encrypted data]",
          security: "Very strong - current standard"
        }
      ]
    },
    {
      type: "password-strength-analyzer",
      title: "Password Security Analyzer",
      description: "Test password strength and learn about secure password practices.",
      features: [
        "Real-time strength assessment",
        "Common password database check",
        "Entropy calculation",
        "Crack time estimation",
        "Improvement suggestions"
      ]
    },
    {
      type: "phishing-detection-game",
      title: "Phishing Email Detection Challenge",
      description: "Learn to identify phishing emails and social engineering attempts.",
      examples: [
        {
          email_type: "Legitimate",
          indicators: ["Known sender", "Proper grammar", "Expected content", "Secure links"]
        },
        {
          email_type: "Phishing",
          indicators: ["Urgent language", "Suspicious sender", "Generic greeting", "Malicious links"]
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Evolution of Cybersecurity",
      content: `
        <p>Cybersecurity has evolved dramatically as our dependence on digital systems has grown:</p>
        
        <h4>1970s-1980s: Early Computer Security</h4>
        <p>Focus on physical security and access control for mainframe computers. The Morris Worm (1988) was one of the first major internet security incidents.</p>
        
        <h4>1990s: Network Security Emerges</h4>
        <p>As networks became widespread, firewalls and antivirus software became essential. The concept of "defense in depth" was established.</p>
        
        <h4>2000s: Internet Security Challenges</h4>
        <p>E-commerce growth brought new threats like credit card fraud and identity theft. SSL/TLS became standard for secure web communications.</p>
        
        <h4>2010s: Advanced Persistent Threats</h4>
        <p>Sophisticated, state-sponsored attacks emerged. Cloud security and mobile device management became critical concerns.</p>
        
        <h4>2020s: AI and IoT Security</h4>
        <p>Artificial intelligence is both a security tool and a threat vector. The Internet of Things creates billions of new attack surfaces.</p>
        
        <h4>Future Challenges</h4>
        <p>Quantum computing threatens current encryption methods, while AI-powered attacks become more sophisticated. Zero-trust architecture and quantum-resistant cryptography are emerging solutions.</p>
      `
    },
    {
      title: "Privacy vs. Security: Finding the Balance",
      content: `
        <p>The relationship between privacy and security is complex and often involves trade-offs:</p>
        
        <h4>Privacy Concerns</h4>
        <ul>
          <li><strong>Data Collection:</strong> Organizations collect vast amounts of personal data</li>
          <li><strong>Surveillance:</strong> Government and corporate monitoring capabilities</li>
          <li><strong>Data Sharing:</strong> Information shared between organizations</li>
          <li><strong>Profiling:</strong> Creating detailed profiles of individuals</li>
        </ul>
        
        <h4>Security Needs</h4>
        <ul>
          <li><strong>Threat Detection:</strong> Monitoring for malicious activities</li>
          <li><strong>Identity Verification:</strong> Confirming user identities</li>
          <li><strong>Incident Response:</strong> Investigating security breaches</li>
          <li><strong>Compliance:</strong> Meeting regulatory requirements</li>
        </ul>
        
        <h4>Finding Balance</h4>
        <ul>
          <li><strong>Privacy by Design:</strong> Building privacy into systems from the start</li>
          <li><strong>Data Minimization:</strong> Collecting only necessary information</li>
          <li><strong>Transparency:</strong> Clear communication about data practices</li>
          <li><strong>User Control:</strong> Giving individuals control over their data</li>
          <li><strong>Strong Governance:</strong> Policies and oversight for data handling</li>
        </ul>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which of the following is NOT one of the three pillars of the CIA triad in information security?",
      options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
      correct: 3,
      explanation: "The CIA triad consists of Confidentiality, Integrity, and Availability. Authentication is a security mechanism but not part of the CIA triad."
    },
    {
      type: "scenario-based",
      question: "A company's database containing customer credit card information has been compromised. Describe the immediate steps that should be taken according to incident response best practices.",
      sampleAnswer: "1) Contain the breach by isolating affected systems, 2) Assess the scope and impact, 3) Preserve evidence, 4) Notify relevant authorities and customers as required by law, 5) Begin forensic investigation, 6) Implement additional security measures, 7) Monitor for further suspicious activity.",
      rubric: [
        "Identifies containment as first priority",
        "Mentions evidence preservation",
        "Addresses legal notification requirements",
        "Includes investigation and monitoring steps",
        "Considers additional security measures"
      ]
    },
    {
      type: "technical-analysis",
      question: "Explain the difference between symmetric and asymmetric encryption, including when each would be used.",
      sampleAnswer: "Symmetric encryption uses the same key for encryption and decryption, making it fast but requiring secure key distribution. Used for bulk data encryption. Asymmetric encryption uses key pairs (public/private), solving key distribution but being slower. Used for key exchange, digital signatures, and small data encryption.",
      rubric: [
        "Correctly explains symmetric encryption characteristics",
        "Correctly explains asymmetric encryption characteristics",
        "Identifies appropriate use cases for each",
        "Mentions key distribution challenges",
        "Discusses performance trade-offs"
      ]
    },
    {
      type: "risk-assessment",
      question: "A small business wants to implement multi-factor authentication. Analyze the costs, benefits, and implementation challenges they might face.",
      correctAnswer: "Benefits include significantly improved security and reduced risk of account compromise. Costs include software/hardware, training, and ongoing support. Challenges include user resistance, technical complexity, and backup authentication methods. Recommend starting with software-based solutions and gradual rollout.",
      explanation: "MFA provides substantial security benefits but requires careful planning and change management for successful implementation."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Security Policy Development",
      description: "Create a comprehensive information security policy for a medium-sized organization, including acceptable use, incident response, and data handling procedures.",
      difficulty: "hard",
      hints: ["Consider all stakeholders", "Include enforcement mechanisms", "Address remote work scenarios"]
    },
    {
      title: "Vulnerability Assessment",
      description: "Conduct a security assessment of a sample network configuration and identify potential vulnerabilities and recommended fixes.",
      difficulty: "medium",
      hints: ["Check for default passwords", "Analyze network segmentation", "Review access controls"]
    },
    {
      title: "Cryptographic Protocol Analysis",
      description: "Compare different cryptographic protocols (TLS versions, VPN protocols) and recommend the best choices for specific scenarios.",
      difficulty: "medium",
      hints: ["Consider security vs. performance", "Check compatibility requirements", "Evaluate future-proofing"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Zero-Day Vulnerability",
      definition: "A security flaw that is unknown to security vendors and has no available patch"
    },
    {
      term: "Social Engineering",
      definition: "Manipulating people to divulge confidential information or perform actions that compromise security"
    },
    {
      term: "Advanced Persistent Threat (APT)",
      definition: "A prolonged and targeted cyberattack where an intruder gains access and remains undetected"
    },
    {
      term: "Penetration Testing",
      definition: "Authorized simulated cyberattack to evaluate the security of a system"
    },
    {
      term: "Security Information and Event Management (SIEM)",
      definition: "Software that provides real-time analysis of security alerts generated by applications and network hardware"
    },
    {
      term: "Data Loss Prevention (DLP)",
      definition: "Strategy and tools to prevent sensitive data from leaving the organization"
    },
    {
      term: "Endpoint Detection and Response (EDR)",
      definition: "Security solution that monitors endpoint devices for suspicious activities and responds to threats"
    },
    {
      term: "Zero Trust Architecture",
      definition: "Security model that requires verification for every user and device, regardless of location"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of computer networks and internet protocols",
    "Basic knowledge of computer systems and operating systems",
    "Familiarity with common software applications",
    "Understanding of basic mathematical concepts"
  ],
  
  nextSteps: [
    "Study advanced cryptographic concepts and quantum cryptography",
    "Learn about security frameworks (NIST, ISO 27001)",
    "Explore ethical hacking and penetration testing",
    "Practice with security tools and technologies",
    "Study compliance requirements (GDPR, HIPAA, PCI DSS)"
  ]
};