// Lesson 3.1: Network Types - Comprehensive lesson content

export default {
  title: "Network Types",
  description: "Explore different network types, topologies, and communication protocols that connect our digital world",
  difficulty: "intermediate",
  estimatedTime: "75 minutes",
  
  // Learning objectives
  objectives: [
    "Understand different network types and their characteristics",
    "Learn about network topologies and their advantages/disadvantages",
    "Master network protocols and communication methods",
    "Explore network hardware and infrastructure components",
    "Apply network troubleshooting and optimization techniques"
  ],
  
  // Main lesson content
  content: `
    <h2>What is a Computer Network?</h2>
    <p>A <strong>computer network</strong> is a collection of interconnected devices that can communicate and share resources with each other. Networks enable data sharing, resource sharing, and communication across different locations and distances.</p>
    
    <p>Key benefits of computer networks:</p>
    <ul>
      <li><strong>Resource Sharing:</strong> Share files, printers, and applications</li>
      <li><strong>Communication:</strong> Email, messaging, video conferencing</li>
      <li><strong>Data Backup:</strong> Centralized storage and backup solutions</li>
      <li><strong>Cost Efficiency:</strong> Share expensive resources among multiple users</li>
      <li><strong>Scalability:</strong> Easy to add new devices and expand capabilities</li>
      <li><strong>Remote Access:</strong> Access resources from anywhere</li>
    </ul>
    
    <h2>Network Types by Geographic Scope</h2>
    
    <h3>Personal Area Network (PAN)</h3>
    <pre><code>BEGIN PAN_Network_Example
    DISPLAY "=== PERSONAL AREA NETWORK (PAN) ==="
    DISPLAY "Range: 1-10 meters (3-30 feet)"
    DISPLAY "Purpose: Connect personal devices around an individual"
    
    // PAN Technologies and Examples
    SET pan_technologies = [
        {
            name: "Bluetooth",
            range: "10 meters",
            speed: "1-3 Mbps",
            examples: ["Wireless headphones", "Computer mouse", "Smartphone to laptop"]
        },
        {
            name: "USB",
            range: "5 meters (with cable)",
            speed: "480 Mbps - 10 Gbps",
            examples: ["External hard drive", "Printer connection", "Phone charging"]
        },
        {
            name: "NFC (Near Field Communication)",
            range: "4 centimeters",
            speed: "424 kbps",
            examples: ["Contactless payments", "File sharing", "Device pairing"]
        },
        {
            name: "Infrared (IR)",
            range: "1 meter",
            speed: "115 kbps - 4 Mbps",
            examples: ["TV remote control", "Old laptop file transfer", "Printer connection"]
        }
    ]
    
    DISPLAY "\nPAN Technologies:"
    FOR each tech IN pan_technologies
        DISPLAY "\n" + tech["name"] + ":"
        DISPLAY "  Range: " + tech["range"]
        DISPLAY "  Speed: " + tech["speed"]
        DISPLAY "  Examples:"
        FOR each example IN tech["examples"]
            DISPLAY "    • " + example
        ENDFOR
    ENDFOR
    
    // PAN Scenario Example
    DISPLAY "\n=== PAN SCENARIO ==="
    DISPLAY "Sarah's Personal Workspace:"
    
    SET sarahs_pan = {
        devices: [
            {name: "Laptop", role: "Central device"},
            {name: "Bluetooth Mouse", connection: "Bluetooth to laptop"},
            {name: "Wireless Headphones", connection: "Bluetooth to laptop"},
            {name: "Smartphone", connection: "USB cable for charging, Bluetooth for file sharing"},
            {name: "Fitness Tracker", connection: "Bluetooth to smartphone"},
            {name: "External SSD", connection: "USB-C to laptop"}
        ]
    }
    
    FOR each device IN sarahs_pan["devices"]
        DISPLAY "  • " + device["name"]
        IF has_key(device, "connection") THEN
            DISPLAY "    Connection: " + device["connection"]
        ENDIF
        IF has_key(device, "role") THEN
            DISPLAY "    Role: " + device["role"]
        ENDIF
    ENDFOR
END</code></pre>
    
    <h3>Local Area Network (LAN)</h3>
    <pre><code>BEGIN LAN_Network_Example
    DISPLAY "=== LOCAL AREA NETWORK (LAN) ==="
    DISPLAY "Range: 100 meters - 1 kilometer"
    DISPLAY "Purpose: Connect devices within a building or campus"
    
    // LAN Technologies
    SET lan_technologies = [
        {
            name: "Ethernet (Wired)",
            standard: "IEEE 802.3",
            speeds: ["10 Mbps (10BASE-T)", "100 Mbps (100BASE-TX)", "1 Gbps (1000BASE-T)", "10 Gbps (10GBASE-T)"],
            medium: "Twisted pair cables (Cat5e, Cat6, Cat6a)",
            advantages: ["Reliable", "High speed", "Secure", "Low latency"],
            disadvantages: ["Requires cables", "Limited mobility", "Installation complexity"]
        },
        {
            name: "Wi-Fi (Wireless)",
            standard: "IEEE 802.11",
            speeds: ["11 Mbps (802.11b)", "54 Mbps (802.11g)", "600 Mbps (802.11n)", "1.3 Gbps (802.11ac)", "9.6 Gbps (802.11ax/Wi-Fi 6)"],
            medium: "Radio waves (2.4 GHz, 5 GHz, 6 GHz)",
            advantages: ["Mobility", "Easy setup", "No cables", "Multiple device support"],
            disadvantages: ["Interference", "Security concerns", "Distance limitations", "Shared bandwidth"]
        }
    ]
    
    FOR each tech IN lan_technologies
        DISPLAY "\n" + tech["name"] + " (" + tech["standard"] + "):"
        DISPLAY "  Medium: " + tech["medium"]
        DISPLAY "  Speeds:"
        FOR each speed IN tech["speeds"]
            DISPLAY "    • " + speed
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN tech["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN tech["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
    ENDFOR
    
    // LAN Example: Office Network
    DISPLAY "\n=== LAN EXAMPLE: SMALL OFFICE ==="
    
    SET office_lan = {
        infrastructure: [
            {device: "Router/Modem", purpose: "Internet connection and DHCP", connections: "ISP fiber connection"},
            {device: "Managed Switch (24-port)", purpose: "Connect wired devices", connections: "Ethernet cables to workstations"},
            {device: "Wireless Access Point", purpose: "Wi-Fi for mobile devices", connections: "Connected to switch via Ethernet"},
            {device: "Network Printer", purpose: "Shared printing", connections: "Ethernet to switch"},
            {device: "Network Attached Storage (NAS)", purpose: "File server and backup", connections: "Ethernet to switch"}
        ],
        client_devices: [
            {device: "Desktop Computers (8)", connection: "Wired Ethernet", usage: "Primary workstations"},
            {device: "Laptops (5)", connection: "Wi-Fi", usage: "Mobile work and meetings"},
            {device: "Smartphones (15)", connection: "Wi-Fi", usage: "Communication and apps"},
            {device: "Tablets (3)", connection: "Wi-Fi", usage: "Presentations and mobile work"}
        ]
    }
    
    DISPLAY "Network Infrastructure:"
    FOR each item IN office_lan["infrastructure"]
        DISPLAY "  • " + item["device"]
        DISPLAY "    Purpose: " + item["purpose"]
        DISPLAY "    Connections: " + item["connections"]
    ENDFOR
    
    DISPLAY "\nClient Devices:"
    FOR each item IN office_lan["client_devices"]
        DISPLAY "  • " + item["device"]
        DISPLAY "    Connection: " + item["connection"]
        DISPLAY "    Usage: " + item["usage"]
    ENDFOR
END</code></pre>
    
    <h3>Wide Area Network (WAN)</h3>
    <pre><code>BEGIN WAN_Network_Example
    DISPLAY "=== WIDE AREA NETWORK (WAN) ==="
    DISPLAY "Range: Cities, countries, continents"
    DISPLAY "Purpose: Connect LANs across large geographic distances"
    
    // WAN Technologies
    SET wan_technologies = [
        {
            name: "Internet",
            description: "Global network of interconnected networks",
            protocols: ["TCP/IP", "HTTP/HTTPS", "FTP", "SMTP"],
            access_methods: ["DSL", "Cable", "Fiber", "Satellite", "Cellular"]
        },
        {
            name: "MPLS (Multiprotocol Label Switching)",
            description: "Private network service for businesses",
            protocols: ["MPLS", "BGP", "OSPF"],
            access_methods: ["Dedicated lines", "Ethernet over MPLS"]
        },
        {
            name: "VPN (Virtual Private Network)",
            description: "Secure tunnel over public networks",
            protocols: ["IPSec", "OpenVPN", "WireGuard", "PPTP"],
            access_methods: ["Internet-based", "Site-to-site", "Remote access"]
        },
        {
            name: "Satellite Networks",
            description: "Communication via satellites",
            protocols: ["DVB-S", "TCP/IP over satellite"],
            access_methods: ["VSAT", "LEO satellites", "GEO satellites"]
        }
    ]
    
    FOR each tech IN wan_technologies
        DISPLAY "\n" + tech["name"] + ":"
        DISPLAY "  Description: " + tech["description"]
        DISPLAY "  Protocols: " + join(tech["protocols"], ", ")
        DISPLAY "  Access Methods: " + join(tech["access_methods"], ", ")
    ENDFOR
    
    // WAN Example: Multi-location Company
    DISPLAY "\n=== WAN EXAMPLE: MULTINATIONAL CORPORATION ==="
    
    SET corporate_wan = {
        locations: [
            {
                site: "Headquarters (New York)",
                lan_size: "500 users",
                connection: "Fiber 1 Gbps dedicated line",
                role: "Primary data center and internet gateway"
            },
            {
                site: "Branch Office (London)",
                lan_size: "150 users",
                connection: "MPLS 100 Mbps + VPN backup",
                role: "Regional office with local file server"
            },
            {
                site: "Manufacturing Plant (Shanghai)",
                lan_size: "80 users",
                connection: "Fiber 200 Mbps + satellite backup",
                role: "Production systems and inventory management"
            },
            {
                site: "Remote Workers (Global)",
                lan_size: "200 users",
                connection: "VPN over home internet",
                role: "Distributed workforce access"
            }
        ],
        wan_services: [
            "Centralized email and file servers",
            "Video conferencing between offices",
            "Shared ERP and CRM systems",
            "Centralized backup and disaster recovery",
            "Global internet access and security filtering"
        ]
    }
    
    DISPLAY "Corporate Locations:"
    FOR each location IN corporate_wan["locations"]
        DISPLAY "\n  " + location["site"] + ":"
        DISPLAY "    Users: " + location["lan_size"]
        DISPLAY "    Connection: " + location["connection"]
        DISPLAY "    Role: " + location["role"]
    ENDFOR
    
    DISPLAY "\nWAN Services:"
    FOR each service IN corporate_wan["wan_services"]
        DISPLAY "  • " + service
    ENDFOR
END</code></pre>
    
    <h2>Network Topologies</h2>
    
    <h3>Physical vs Logical Topologies</h3>
    <pre><code>BEGIN Network_Topologies
    DISPLAY "=== NETWORK TOPOLOGIES ==="
    DISPLAY "Physical Topology: How devices are physically connected"
    DISPLAY "Logical Topology: How data flows through the network"
    
    // Bus Topology
    DISPLAY "\n--- BUS TOPOLOGY ---"
    SET bus_topology = {
        description: "All devices connected to a single central cable (backbone)",
        diagram: "Device1 --- Device2 --- Device3 --- Device4 --- Device5",
        advantages: [
            "Simple and inexpensive to implement",
            "Requires less cable than other topologies",
            "Easy to add new devices",
            "Good for small networks"
        ],
        disadvantages: [
            "Single point of failure (backbone cable)",
            "Performance degrades with more devices",
            "Difficult to troubleshoot problems",
            "Limited cable length",
            "Collisions can occur"
        ],
        use_cases: ["Early Ethernet networks", "Small office networks", "Temporary setups"]
    }
    
    DISPLAY "Bus Topology:"
    DISPLAY "  Description: " + bus_topology["description"]
    DISPLAY "  Diagram: " + bus_topology["diagram"]
    DISPLAY "  Advantages:"
    FOR each adv IN bus_topology["advantages"]
        DISPLAY "    ✓ " + adv
    ENDFOR
    DISPLAY "  Disadvantages:"
    FOR each dis IN bus_topology["disadvantages"]
        DISPLAY "    ✗ " + dis
    ENDFOR
    
    // Star Topology
    DISPLAY "\n--- STAR TOPOLOGY ---"
    SET star_topology = {
        description: "All devices connected to a central hub or switch",
        diagram: "    Device2\n        |\nDevice1 - HUB - Device3\n        |\n    Device4",
        advantages: [
            "Easy to install and manage",
            "Failure of one device doesn't affect others",
            "Easy to detect and isolate faults",
            "Good performance",
            "Easy to add/remove devices"
        ],
        disadvantages: [
            "Central hub is single point of failure",
            "Requires more cable than bus topology",
            "Hub/switch can be expensive",
            "Limited by hub/switch capacity"
        ],
        use_cases: ["Modern Ethernet networks", "Home networks", "Office LANs"]
    }
    
    DISPLAY "Star Topology:"
    DISPLAY "  Description: " + star_topology["description"]
    DISPLAY "  Advantages:"
    FOR each adv IN star_topology["advantages"]
        DISPLAY "    ✓ " + adv
    ENDFOR
    DISPLAY "  Disadvantages:"
    FOR each dis IN star_topology["disadvantages"]
        DISPLAY "    ✗ " + dis
    ENDFOR
    
    // Ring Topology
    DISPLAY "\n--- RING TOPOLOGY ---"
    SET ring_topology = {
        description: "Devices connected in a circular chain",
        diagram: "Device1 → Device2 → Device3 → Device4 → Device1",
        advantages: [
            "Equal access for all devices",
            "No collisions (token-based access)",
            "Predictable performance",
            "Can handle high traffic loads"
        ],
        disadvantages: [
            "Single device failure can break entire network",
            "Difficult to troubleshoot",
            "Adding/removing devices disrupts network",
            "More expensive than bus topology"
        ],
        use_cases: ["Token Ring networks (legacy)", "FDDI networks", "Some industrial networks"]
    }
    
    DISPLAY "Ring Topology:"
    DISPLAY "  Description: " + ring_topology["description"]
    DISPLAY "  Diagram: " + ring_topology["diagram"]
    DISPLAY "  Advantages:"
    FOR each adv IN ring_topology["advantages"]
        DISPLAY "    ✓ " + adv
    ENDFOR
    DISPLAY "  Disadvantages:"
    FOR each dis IN ring_topology["disadvantages"]
        DISPLAY "    ✗ " + dis
    ENDFOR
    
    // Mesh Topology
    DISPLAY "\n--- MESH TOPOLOGY ---"
    SET mesh_topology = {
        description: "Every device connected to every other device",
        types: [
            {name: "Full Mesh", desc: "Every device connected to every other device"},
            {name: "Partial Mesh", desc: "Some devices have multiple connections, not all"}
        ],
        advantages: [
            "Highly reliable (multiple paths)",
            "Excellent fault tolerance",
            "High performance",
            "Secure (dedicated connections)",
            "No single point of failure"
        ],
        disadvantages: [
            "Very expensive (many connections required)",
            "Complex to install and maintain",
            "Requires many network interfaces",
            "Difficult to troubleshoot"
        ],
        use_cases: ["Internet backbone", "Critical systems", "Wireless mesh networks"]
    }
    
    DISPLAY "Mesh Topology:"
    DISPLAY "  Description: " + mesh_topology["description"]
    DISPLAY "  Types:"
    FOR each type IN mesh_topology["types"]
        DISPLAY "    • " + type["name"] + ": " + type["desc"]
    ENDFOR
    DISPLAY "  Advantages:"
    FOR each adv IN mesh_topology["advantages"]
        DISPLAY "    ✓ " + adv
    ENDFOR
    DISPLAY "  Disadvantages:"
    FOR each dis IN mesh_topology["disadvantages"]
        DISPLAY "    ✗ " + dis
    ENDFOR
END</code></pre>
    
    <h2>Network Protocols</h2>
    
    <h3>OSI Model and Protocol Stack</h3>
    <pre><code>BEGIN OSI_Model_Protocols
    DISPLAY "=== OSI MODEL AND NETWORK PROTOCOLS ==="
    DISPLAY "The OSI (Open Systems Interconnection) model defines 7 layers of network communication"
    
    SET osi_layers = [
        {
            layer: 7,
            name: "Application Layer",
            description: "User interface and network services",
            protocols: ["HTTP/HTTPS", "FTP", "SMTP", "DNS", "DHCP"],
            examples: ["Web browsers", "Email clients", "File transfer programs"]
        },
        {
            layer: 6,
            name: "Presentation Layer",
            description: "Data formatting, encryption, compression",
            protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII"],
            examples: ["Data encryption", "Image compression", "Character encoding"]
        },
        {
            layer: 5,
            name: "Session Layer",
            description: "Establishes, manages, terminates connections",
            protocols: ["NetBIOS", "RPC", "SQL sessions"],
            examples: ["Login sessions", "Database connections", "Video calls"]
        },
        {
            layer: 4,
            name: "Transport Layer",
            description: "Reliable data delivery, error correction",
            protocols: ["TCP", "UDP", "SCTP"],
            examples: ["Port numbers", "Flow control", "Error detection"]
        },
        {
            layer: 3,
            name: "Network Layer",
            description: "Routing and logical addressing",
            protocols: ["IP", "ICMP", "OSPF", "BGP"],
            examples: ["IP addresses", "Routers", "Path determination"]
        },
        {
            layer: 2,
            name: "Data Link Layer",
            description: "Frame formatting, error detection, MAC addressing",
            protocols: ["Ethernet", "Wi-Fi", "PPP", "ARP"],
            examples: ["MAC addresses", "Switches", "Frame check sequences"]
        },
        {
            layer: 1,
            name: "Physical Layer",
            description: "Physical transmission of raw bits",
            protocols: ["Ethernet cables", "Fiber optic", "Radio waves"],
            examples: ["Cables", "Hubs", "Repeaters", "Network cards"]
        }
    ]
    
    DISPLAY "\nOSI Model Layers (Top to Bottom):"
    FOR each layer IN osi_layers
        DISPLAY "\nLayer " + layer["layer"] + ": " + layer["name"]
        DISPLAY "  Description: " + layer["description"]
        DISPLAY "  Protocols: " + join(layer["protocols"], ", ")
        DISPLAY "  Examples: " + join(layer["examples"], ", ")
    ENDFOR
    
    // TCP/IP Model (Simplified)
    DISPLAY "\n=== TCP/IP MODEL (INTERNET MODEL) ==="
    DISPLAY "Simplified 4-layer model used in practice"
    
    SET tcpip_layers = [
        {
            layer: 4,
            name: "Application Layer",
            description: "Combines OSI layers 5-7",
            protocols: ["HTTP", "FTP", "SMTP", "DNS", "DHCP"],
            osi_equivalent: "Application, Presentation, Session"
        },
        {
            layer: 3,
            name: "Transport Layer",
            description: "End-to-end communication",
            protocols: ["TCP", "UDP"],
            osi_equivalent: "Transport"
        },
        {
            layer: 2,
            name: "Internet Layer",
            description: "Routing and logical addressing",
            protocols: ["IP", "ICMP", "ARP"],
            osi_equivalent: "Network"
        },
        {
            layer: 1,
            name: "Network Access Layer",
            description: "Physical network access",
            protocols: ["Ethernet", "Wi-Fi", "PPP"],
            osi_equivalent: "Data Link, Physical"
        }
    ]
    
    DISPLAY "\nTCP/IP Model Layers:"
    FOR each layer IN tcpip_layers
        DISPLAY "\nLayer " + layer["layer"] + ": " + layer["name"]
        DISPLAY "  Description: " + layer["description"]
        DISPLAY "  Protocols: " + join(layer["protocols"], ", ")
        DISPLAY "  OSI Equivalent: " + layer["osi_equivalent"]
    ENDFOR
END</code></pre>
    
    <h3>Common Network Protocols</h3>
    <pre><code>BEGIN Common_Network_Protocols
    DISPLAY "=== COMMON NETWORK PROTOCOLS ==="
    
    // Internet Protocols
    SET internet_protocols = [
        {
            name: "HTTP (HyperText Transfer Protocol)",
            port: 80,
            purpose: "Web page transfer",
            example: "Loading websites in a browser",
            secure_version: "HTTPS (port 443)"
        },
        {
            name: "FTP (File Transfer Protocol)",
            port: 21,
            purpose: "File transfer between computers",
            example: "Uploading files to a web server",
            secure_version: "SFTP or FTPS"
        },
        {
            name: "SMTP (Simple Mail Transfer Protocol)",
            port: 25,
            purpose: "Sending email messages",
            example: "Email client sending outgoing mail",
            secure_version: "SMTPS (port 465/587)"
        },
        {
            name: "POP3 (Post Office Protocol v3)",
            port: 110,
            purpose: "Retrieving email from server",
            example: "Downloading email to local client",
            secure_version: "POP3S (port 995)"
        },
        {
            name: "IMAP (Internet Message Access Protocol)",
            port: 143,
            purpose: "Accessing email on server",
            example: "Webmail and synchronized email",
            secure_version: "IMAPS (port 993)"
        },
        {
            name: "DNS (Domain Name System)",
            port: 53,
            purpose: "Translate domain names to IP addresses",
            example: "Converting www.google.com to 142.250.191.14",
            secure_version: "DNS over HTTPS (DoH)"
        }
    ]
    
    DISPLAY "Internet Application Protocols:"
    FOR each protocol IN internet_protocols
        DISPLAY "\n" + protocol["name"] + ":"
        DISPLAY "  Port: " + protocol["port"]
        DISPLAY "  Purpose: " + protocol["purpose"]
        DISPLAY "  Example: " + protocol["example"]
        DISPLAY "  Secure Version: " + protocol["secure_version"]
    ENDFOR
    
    // Transport Protocols
    DISPLAY "\n=== TRANSPORT PROTOCOLS ==="
    
    SET transport_protocols = [
        {
            name: "TCP (Transmission Control Protocol)",
            characteristics: ["Connection-oriented", "Reliable", "Ordered delivery", "Error correction", "Flow control"],
            use_cases: ["Web browsing (HTTP)", "Email (SMTP)", "File transfer (FTP)", "Remote access (SSH)"],
            overhead: "Higher (due to reliability features)"
        },
        {
            name: "UDP (User Datagram Protocol)",
            characteristics: ["Connectionless", "Unreliable", "No ordering guarantee", "No error correction", "Low overhead"],
            use_cases: ["Video streaming", "Online gaming", "DNS queries", "DHCP", "Voice over IP"],
            overhead: "Lower (minimal features)"
        }
    ]
    
    FOR each protocol IN transport_protocols
        DISPLAY "\n" + protocol["name"] + ":"
        DISPLAY "  Characteristics:"
        FOR each char IN protocol["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Use Cases:"
        FOR each use IN protocol["use_cases"]
            DISPLAY "    • " + use
        ENDFOR
        DISPLAY "  Overhead: " + protocol["overhead"]
    ENDFOR
    
    // Network Layer Protocols
    DISPLAY "\n=== NETWORK LAYER PROTOCOLS ==="
    
    SET network_protocols = [
        {
            name: "IPv4 (Internet Protocol version 4)",
            address_format: "32-bit (4 octets)",
            example: "192.168.1.1",
            address_space: "~4.3 billion addresses",
            features: ["Widely supported", "Simple", "Well-established"]
        },
        {
            name: "IPv6 (Internet Protocol version 6)",
            address_format: "128-bit (8 groups of 4 hex digits)",
            example: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            address_space: "~340 undecillion addresses",
            features: ["Larger address space", "Built-in security", "Better mobile support"]
        },
        {
            name: "ICMP (Internet Control Message Protocol)",
            address_format: "N/A (uses IP)",
            example: "ping, traceroute commands",
            address_space: "N/A",
            features: ["Error reporting", "Network diagnostics", "Path discovery"]
        }
    ]
    
    FOR each protocol IN network_protocols
        DISPLAY "\n" + protocol["name"] + ":"
        DISPLAY "  Address Format: " + protocol["address_format"]
        DISPLAY "  Example: " + protocol["example"]
        DISPLAY "  Address Space: " + protocol["address_space"]
        DISPLAY "  Features:"
        FOR each feature IN protocol["features"]
            DISPLAY "    • " + feature
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Network Hardware and Infrastructure</h2>
    
    <h3>Network Devices and Their Functions</h3>
    <pre><code>BEGIN Network_Hardware
    DISPLAY "=== NETWORK HARDWARE COMPONENTS ==="
    
    // Layer 1 Devices (Physical Layer)
    DISPLAY "\n--- PHYSICAL LAYER DEVICES ---"
    
    SET physical_devices = [
        {
            name: "Hub",
            function: "Repeats electrical signals to all connected devices",
            characteristics: ["Operates at Physical Layer", "Creates single collision domain", "Half-duplex communication", "Largely obsolete"],
            use_case: "Legacy networks (replaced by switches)"
        },
        {
            name: "Repeater",
            function: "Amplifies and regenerates signals over long distances",
            characteristics: ["Extends network range", "No intelligence", "Simply repeats signals", "Can introduce delays"],
            use_case: "Extending cable runs beyond standard limits"
        },
        {
            name: "Network Cables",
            function: "Physical medium for data transmission",
            characteristics: ["Various types (Cat5e, Cat6, Fiber)", "Different speeds and distances", "Shielded vs unshielded"],
            use_case: "Connecting network devices"
        }
    ]
    
    FOR each device IN physical_devices
        DISPLAY "\n" + device["name"] + ":"
        DISPLAY "  Function: " + device["function"]
        DISPLAY "  Characteristics:"
        FOR each char IN device["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Use Case: " + device["use_case"]
    ENDFOR
    
    // Layer 2 Devices (Data Link Layer)
    DISPLAY "\n--- DATA LINK LAYER DEVICES ---"
    
    SET datalink_devices = [
        {
            name: "Switch",
            function: "Forwards frames based on MAC addresses",
            characteristics: [
                "Learns MAC addresses",
                "Creates separate collision domains",
                "Full-duplex communication",
                "Can implement VLANs",
                "Store-and-forward operation"
            ],
            types: ["Unmanaged (plug-and-play)", "Managed (configurable features)", "Layer 3 (routing capable)"],
            use_case: "Connecting devices in a LAN"
        },
        {
            name: "Bridge",
            function: "Connects two network segments, filters traffic",
            characteristics: [
                "Reduces collision domains",
                "Learns MAC addresses",
                "Forwards only necessary traffic",
                "Can connect different media types"
            ],
            types: ["Transparent bridge", "Source-routing bridge"],
            use_case: "Connecting network segments (largely replaced by switches)"
        },
        {
            name: "Wireless Access Point (WAP)",
            function: "Provides wireless connectivity to wired network",
            characteristics: [
                "Converts between wired and wireless",
                "Manages wireless clients",
                "Implements security protocols",
                "Can support multiple SSIDs"
            ],
            types: ["Standalone AP", "Controller-based AP", "Mesh AP"],
            use_case: "Providing Wi-Fi access in buildings"
        }
    ]
    
    FOR each device IN datalink_devices
        DISPLAY "\n" + device["name"] + ":"
        DISPLAY "  Function: " + device["function"]
        DISPLAY "  Characteristics:"
        FOR each char IN device["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        IF has_key(device, "types") THEN
            DISPLAY "  Types:"
            FOR each type IN device["types"]
                DISPLAY "    • " + type
            ENDFOR
        ENDIF
        DISPLAY "  Use Case: " + device["use_case"]
    ENDFOR
    
    // Layer 3 Devices (Network Layer)
    DISPLAY "\n--- NETWORK LAYER DEVICES ---"
    
    SET network_devices = [
        {
            name: "Router",
            function: "Routes packets between different networks using IP addresses",
            characteristics: [
                "Operates at Network Layer",
                "Maintains routing tables",
                "Connects different networks",
                "Implements NAT and firewall features",
                "Can run routing protocols"
            ],
            types: ["Home/SOHO router", "Enterprise router", "Core router", "Edge router"],
            use_case: "Connecting LANs to WANs, internet connectivity"
        },
        {
            name: "Layer 3 Switch",
            function: "Combines switching and routing capabilities",
            characteristics: [
                "Fast switching at Layer 2",
                "Routing between VLANs",
                "Hardware-based routing",
                "High port density"
            ],
            types: ["Distribution switch", "Core switch"],
            use_case: "Inter-VLAN routing in enterprise networks"
        },
        {
            name: "Firewall",
            function: "Controls network traffic based on security rules",
            characteristics: [
                "Packet filtering",
                "Stateful inspection",
                "Application-layer filtering",
                "VPN capabilities",
                "Intrusion prevention"
            ],
            types: ["Hardware firewall", "Software firewall", "Next-generation firewall"],
            use_case: "Network security and access control"
        }
    ]
    
    FOR each device IN network_devices
        DISPLAY "\n" + device["name"] + ":"
        DISPLAY "  Function: " + device["function"]
        DISPLAY "  Characteristics:"
        FOR each char IN device["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Types:"
        FOR each type IN device["types"]
            DISPLAY "    • " + type
        ENDFOR
        DISPLAY "  Use Case: " + device["use_case"]
    ENDFOR
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "network-topology-designer",
      title: "Design Network Topologies",
      description: "Create different network topologies and analyze their characteristics.",
      scenarios: [
        {
          requirement: "Small office with 10 computers, 1 printer, and internet access",
          constraints: "Budget-conscious, easy maintenance",
          recommendedTopology: "Star topology with central switch"
        },
        {
          requirement: "Manufacturing plant with critical systems requiring high reliability",
          constraints: "Cannot afford downtime, multiple backup paths needed",
          recommendedTopology: "Partial mesh topology with redundant connections"
        }
      ]
    },
    {
      type: "protocol-stack-analyzer",
      title: "Analyze Protocol Communication",
      description: "Trace how data moves through the OSI layers for different applications.",
      scenarios: [
        {
          application: "Web browsing (HTTP)",
          layers: [
            {layer: 7, protocol: "HTTP", data: "GET /index.html HTTP/1.1"},
            {layer: 4, protocol: "TCP", data: "TCP segment with port 80"},
            {layer: 3, protocol: "IP", data: "IP packet with destination address"},
            {layer: 2, protocol: "Ethernet", data: "Ethernet frame with MAC addresses"}
          ]
        },
        {
          application: "Video streaming (UDP)",
          layers: [
            {layer: 7, protocol: "RTP", data: "Real-time video data"},
            {layer: 4, protocol: "UDP", data: "UDP datagram (no reliability)"},
            {layer: 3, protocol: "IP", data: "IP packet with QoS marking"},
            {layer: 2, protocol: "Wi-Fi", data: "802.11 wireless frame"}
          ]
        }
      ]
    },
    {
      type: "network-troubleshooting-sim",
      title: "Network Troubleshooting Simulator",
      description: "Diagnose and fix common network problems.",
      problems: [
        {
          symptom: "Cannot access websites but can ping IP addresses",
          cause: "DNS server problem",
          solution: "Check DNS settings, try alternative DNS servers",
          tools: ["nslookup", "ping", "ipconfig"]
        },
        {
          symptom: "Slow network performance in one area of office",
          cause: "Wi-Fi interference or weak signal",
          solution: "Relocate access point, change channel, add additional AP",
          tools: ["Wi-Fi analyzer", "speed test", "signal strength meter"]
        }
      ]
    },
    {
      type: "ip-addressing-calculator",
      title: "IP Address and Subnetting Practice",
      description: "Practice IP addressing, subnetting, and CIDR notation.",
      exercises: [
        {
          network: "192.168.1.0/24",
          task: "Divide into 4 subnets",
          solution: "192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, 192.168.1.192/26"
        },
        {
          network: "10.0.0.0/8",
          task: "Calculate number of possible hosts",
          solution: "16,777,214 hosts (2^24 - 2)"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "Evolution of Network Technologies",
      content: `
        <p>Network technologies have evolved dramatically over the past several decades:</p>
        
        <h4>1960s-1970s: Early Networks</h4>
        <p>ARPANET, the predecessor to the Internet, was developed to connect research institutions. It introduced packet switching and the concept of distributed networks.</p>
        
        <h4>1980s: Local Area Networks</h4>
        <p>Ethernet was standardized, enabling reliable local networking. Token Ring and other LAN technologies competed for market share.</p>
        
        <h4>1990s: Internet Explosion</h4>
        <p>The World Wide Web made the Internet accessible to the general public. TCP/IP became the dominant protocol suite.</p>
        
        <h4>2000s: Wireless Revolution</h4>
        <p>Wi-Fi standards matured, enabling ubiquitous wireless connectivity. Mobile networks evolved from 2G to 3G.</p>
        
        <h4>2010s: Mobile and Cloud</h4>
        <p>4G LTE provided high-speed mobile internet. Cloud computing drove demand for high-capacity data center networks.</p>
        
        <h4>2020s: 5G and Beyond</h4>
        <p>5G networks promise ultra-low latency and massive device connectivity. Software-defined networking (SDN) and network function virtualization (NFV) are transforming network architecture.</p>
      `
    },
    {
      title: "Network Security Fundamentals",
      content: `
        <p>Network security is critical in today's interconnected world:</p>
        
        <h4>Common Network Threats</h4>
        <ul>
          <li><strong>Eavesdropping:</strong> Intercepting network communications</li>
          <li><strong>Man-in-the-Middle:</strong> Intercepting and potentially modifying communications</li>
          <li><strong>Denial of Service (DoS):</strong> Overwhelming network resources</li>
          <li><strong>Malware:</strong> Viruses, worms, and trojans spreading through networks</li>
        </ul>
        
        <h4>Security Measures</h4>
        <ul>
          <li><strong>Encryption:</strong> Protecting data in transit with protocols like TLS/SSL</li>
          <li><strong>Firewalls:</strong> Controlling network access based on rules</li>
          <li><strong>VPNs:</strong> Creating secure tunnels over public networks</li>
          <li><strong>Network Segmentation:</strong> Isolating critical systems</li>
          <li><strong>Monitoring:</strong> Detecting unusual network activity</li>
        </ul>
        
        <h4>Best Practices</h4>
        <ul>
          <li>Regular security updates and patches</li>
          <li>Strong authentication and access controls</li>
          <li>Network monitoring and logging</li>
          <li>Employee security training</li>
          <li>Incident response planning</li>
        </ul>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which network topology provides the highest fault tolerance but is most expensive to implement?",
      options: ["Bus", "Star", "Ring", "Mesh"],
      correct: 3,
      explanation: "Mesh topology provides multiple paths between devices, offering excellent fault tolerance, but requires many connections making it expensive."
    },
    {
      type: "scenario-based",
      question: "A company has offices in New York, London, and Tokyo. They need to connect these offices for file sharing and video conferencing. What type of network would you recommend and why?",
      sampleAnswer: "A WAN (Wide Area Network) using a combination of technologies: MPLS for reliable connectivity between offices, VPN over internet as backup, and dedicated bandwidth for video conferencing. This provides global connectivity with redundancy.",
      rubric: [
        "Identifies the need for a WAN due to geographic distribution",
        "Suggests appropriate WAN technologies (MPLS, VPN, dedicated lines)",
        "Considers redundancy and backup connections",
        "Addresses specific requirements (file sharing, video conferencing)",
        "Considers cost and performance trade-offs"
      ]
    },
    {
      type: "protocol-analysis",
      question: "Explain the difference between TCP and UDP, and give examples of when each would be used.",
      sampleAnswer: "TCP is connection-oriented and reliable, ensuring data arrives in order without errors. Used for web browsing, email, file transfer. UDP is connectionless and faster but unreliable. Used for video streaming, online gaming, DNS queries where speed is more important than perfect delivery.",
      rubric: [
        "Correctly identifies TCP as reliable, connection-oriented",
        "Correctly identifies UDP as unreliable, connectionless",
        "Provides appropriate examples for TCP usage",
        "Provides appropriate examples for UDP usage",
        "Explains the trade-offs between reliability and speed"
      ]
    },
    {
      type: "network-design",
      question: "Design a network for a 3-story office building with 50 employees per floor. Include the necessary hardware and explain your topology choice.",
      correctAnswer: "Hierarchical star topology with core switch in server room, distribution switches on each floor, access switches for workgroups. Include wireless access points, firewall, and internet router. This provides scalability, manageability, and fault tolerance.",
      explanation: "Hierarchical design provides good performance, scalability, and is cost-effective for medium-sized organizations."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Design a Campus Network",
      description: "Create a comprehensive network design for a university campus with multiple buildings, dormitories, and outdoor areas.",
      difficulty: "hard",
      hints: ["Consider fiber backbone between buildings", "Plan for high-density wireless", "Include redundant internet connections"]
    },
    {
      title: "Network Performance Optimization",
      description: "Analyze a slow network and propose solutions to improve performance, considering bandwidth, latency, and congestion.",
      difficulty: "medium",
      hints: ["Check for bottlenecks", "Consider QoS implementation", "Analyze traffic patterns"]
    },
    {
      title: "Wireless Network Planning",
      description: "Design a wireless network for a large warehouse, considering coverage, capacity, and interference.",
      difficulty: "medium",
      hints: ["Consider RF propagation", "Plan for roaming", "Address interference sources"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Bandwidth",
      definition: "The maximum amount of data that can be transmitted over a network connection in a given time period"
    },
    {
      term: "Latency",
      definition: "The time delay between sending data and receiving a response over a network"
    },
    {
      term: "MAC Address",
      definition: "Media Access Control address - a unique identifier assigned to network interfaces"
    },
    {
      term: "IP Address",
      definition: "Internet Protocol address - a numerical label assigned to devices on a network"
    },
    {
      term: "Subnet",
      definition: "A logical subdivision of an IP network, used to organize and secure network traffic"
    },
    {
      term: "DHCP",
      definition: "Dynamic Host Configuration Protocol - automatically assigns IP addresses to devices"
    },
    {
      term: "DNS",
      definition: "Domain Name System - translates human-readable domain names to IP addresses"
    },
    {
      term: "VLAN",
      definition: "Virtual Local Area Network - logically separates devices on the same physical network"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Basic understanding of computer systems",
    "Familiarity with internet usage and web browsing",
    "Understanding of basic electrical concepts",
    "Knowledge of computer hardware components"
  ],
  
  nextSteps: [
    "Learn about network security and data protection",
    "Study advanced routing and switching concepts",
    "Explore wireless networking technologies",
    "Practice with network simulation tools",
    "Learn about network monitoring and troubleshooting"
  ]
};