// Lesson 4.3: Input/Output Systems - Comprehensive lesson content

export default {
  title: "Input/Output Systems",
  description: "Explore I/O hardware, device management, interrupt handling, and performance optimization techniques in computer systems",
  difficulty: "intermediate",
  estimatedTime: "75 minutes",
  
  // Learning objectives
  objectives: [
    "Understand I/O hardware components and their functions",
    "Learn about device drivers and I/O software layers",
    "Explore interrupt handling and DMA mechanisms",
    "Analyze I/O scheduling algorithms and performance optimization",
    "Study modern I/O technologies and interfaces"
  ],
  
  // Main lesson content
  content: `
    <h2>Introduction to Input/Output Systems</h2>
    <p><strong>Input/Output (I/O) Systems</strong> are responsible for managing communication between the computer and external devices. They handle data transfer, device control, and provide abstraction layers that allow applications to interact with hardware devices without knowing their specific details.</p>
    
    <p>I/O systems are critical for computer functionality because:</p>
    <ul>
      <li><strong>Data Exchange:</strong> Enable communication between the computer and external world</li>
      <li><strong>User Interaction:</strong> Provide interfaces for keyboards, mice, displays, and other user devices</li>
      <li><strong>Storage Access:</strong> Manage access to persistent storage devices</li>
      <li><strong>Network Communication:</strong> Handle network interfaces and protocols</li>
      <li><strong>Performance:</strong> Often the bottleneck in system performance</li>
      <li><strong>Reliability:</strong> Must handle device failures and errors gracefully</li>
    </ul>
    
    <h2>I/O Hardware Components</h2>
    
    <h3>I/O Hardware Architecture</h3>
    <pre><code>BEGIN IO_Hardware_Architecture
    DISPLAY "=== INPUT/OUTPUT HARDWARE COMPONENTS ==="
    DISPLAY "Understanding the physical components that enable I/O operations"
    
    // I/O Hardware Components
    SET io_components = [
        {
            component: "I/O Ports",
            description: "Hardware interfaces that connect devices to the computer",
            types: [
                "Memory-mapped I/O: Devices accessed through memory addresses",
                "Port-mapped I/O: Devices accessed through special I/O instructions",
                "Hybrid approaches: Combination of both methods"
            ],
            characteristics: [
                "Unique addressing for each device",
                "Control and data registers",
                "Status information availability",
                "Standardized interface protocols"
            ],
            examples: ["Serial ports", "Parallel ports", "USB ports", "Network interfaces"]
        },
        {
            component: "I/O Controllers",
            description: "Specialized processors that manage specific types of devices",
            types: [
                "Disk Controllers: Manage storage devices (SATA, SCSI, NVMe)",
                "Network Controllers: Handle network communication",
                "Graphics Controllers: Manage display and graphics processing",
                "USB Controllers: Coordinate USB device communication"
            ],
            characteristics: [
                "Device-specific command sets",
                "Buffer management",
                "Error detection and correction",
                "Performance optimization"
            ],
            examples: ["SATA controller", "Ethernet controller", "GPU", "USB host controller"]
        },
        {
            component: "Device Registers",
            description: "Special memory locations used for device communication",
            types: [
                "Control Registers: Send commands to devices",
                "Status Registers: Read device state and error conditions",
                "Data Registers: Transfer data to/from devices",
                "Configuration Registers: Set device parameters"
            ],
            characteristics: [
                "Memory-mapped or port-mapped access",
                "Read-only, write-only, or read-write",
                "Volatile or persistent state",
                "Interrupt generation capability"
            ],
            examples: ["Command register", "Status register", "Data buffer", "Interrupt mask"]
        },
        {
            component: "Buses and Interconnects",
            description: "Communication pathways between CPU, memory, and I/O devices",
            types: [
                "System Bus: Connects CPU, memory, and major components",
                "I/O Bus: Dedicated to I/O device communication",
                "Expansion Bus: For add-in cards and peripherals",
                "High-speed Interconnects: For performance-critical devices"
            ],
            characteristics: [
                "Data width (8, 16, 32, 64 bits)",
                "Clock speed and bandwidth",
                "Arbitration mechanisms",
                "Hot-plug capability"
            ],
            examples: ["PCIe", "USB", "SATA", "Thunderbolt"]
        }
    ]
    
    DISPLAY "I/O Hardware Components Overview:"
    FOR each component IN io_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Types and Variants:"
        FOR each type IN component["types"]
            DISPLAY "    • " + type
        ENDFOR
        DISPLAY "  Key Characteristics:"
        FOR each char IN component["characteristics"]
            DISPLAY "    ◦ " + char
        ENDFOR
        DISPLAY "  Common Examples:"
        FOR each example IN component["examples"]
            DISPLAY "    → " + example
        ENDFOR
    ENDFOR
    
    // I/O Communication Methods
    DISPLAY "\n=== I/O COMMUNICATION METHODS ==="
    
    SET io_methods = [
        {
            method: "Programmed I/O (Polling)",
            description: "CPU directly controls I/O operations by continuously checking device status",
            process: [
                "CPU sends command to device",
                "CPU continuously polls device status",
                "CPU reads/writes data when device is ready",
                "CPU handles any error conditions"
            ],
            advantages: ["Simple implementation", "Predictable timing", "No additional hardware required"],
            disadvantages: ["CPU intensive", "Inefficient for slow devices", "Blocks other operations"],
            best_for: ["Simple embedded systems", "Real-time applications", "Fast devices"]
        },
        {
            method: "Interrupt-Driven I/O",
            description: "Device signals CPU when I/O operation is complete or needs attention",
            process: [
                "CPU initiates I/O operation",
                "CPU continues with other tasks",
                "Device generates interrupt when ready",
                "CPU handles interrupt and processes I/O"
            ],
            advantages: ["CPU can multitask", "Efficient for slow devices", "Responsive to device events"],
            disadvantages: ["Interrupt overhead", "Complex interrupt handling", "Potential interrupt storms"],
            best_for: ["General-purpose systems", "Multiple device management", "Interactive applications"]
        },
        {
            method: "Direct Memory Access (DMA)",
            description: "Specialized controller transfers data directly between device and memory",
            process: [
                "CPU programs DMA controller",
                "DMA controller takes control of bus",
                "Data transferred without CPU intervention",
                "DMA controller interrupts CPU when complete"
            ],
            advantages: ["Minimal CPU involvement", "High throughput", "Efficient for large transfers"],
            disadvantages: ["Additional hardware complexity", "Bus contention", "Cache coherency issues"],
            best_for: ["High-speed storage", "Network interfaces", "Graphics systems"]
        }
    ]
    
    DISPLAY "I/O Communication Methods:"
    FOR each method IN io_methods
        DISPLAY "\n" + method["method"] + ":"
        DISPLAY "  Description: " + method["description"]
        DISPLAY "  Process Steps:"
        FOR each step IN method["process"]
            DISPLAY "    1. " + step
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN method["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN method["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Best Suited For:"
        FOR each use IN method["best_for"]
            DISPLAY "    → " + use
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Device Drivers and I/O Software</h2>
    
    <h3>I/O Software Layers</h3>
    <pre><code>BEGIN IO_Software_Architecture
    DISPLAY "=== I/O SOFTWARE LAYERED ARCHITECTURE ==="
    DISPLAY "Software layers that provide abstraction and management for I/O operations"
    
    // I/O Software Layers
    SET io_layers = [
        {
            layer: "User-Level I/O Software",
            level: 4,
            description: "Application programs and user libraries that perform I/O operations",
            responsibilities: [
                "Provide high-level I/O interfaces",
                "Format data for specific applications",
                "Handle application-specific protocols",
                "Manage user-level buffering",
                "Implement application I/O policies"
            ],
            examples: ["printf() function", "File I/O libraries", "Graphics APIs", "Network libraries"],
            interfaces: ["Standard C library", "POSIX I/O", "Windows API", "Graphics libraries"]
        },
        {
            layer: "Device-Independent I/O Software",
            level: 3,
            description: "Operating system layer that provides uniform interface to different devices",
            responsibilities: [
                "Provide uniform naming and interface",
                "Implement device-independent operations",
                "Handle buffering and caching",
                "Manage I/O scheduling and queuing",
                "Provide error handling and recovery"
            ],
            examples: ["File system interface", "Socket interface", "Block device interface", "Character device interface"],
            interfaces: ["System calls", "Virtual file system", "Device abstraction layer"]
        },
        {
            layer: "Device Drivers",
            level: 2,
            description: "Software that directly controls specific hardware devices",
            responsibilities: [
                "Translate generic requests to device commands",
                "Handle device-specific protocols",
                "Manage device registers and memory",
                "Handle device interrupts",
                "Implement device power management"
            ],
            examples: ["Disk driver", "Network card driver", "Graphics driver", "USB driver"],
            interfaces: ["Kernel driver interface", "Hardware abstraction layer", "Plug and Play"]
        },
        {
            layer: "Interrupt Handlers",
            level: 1,
            description: "Low-level software that responds to hardware interrupts",
            responsibilities: [
                "Save processor state",
                "Identify interrupt source",
                "Perform minimal interrupt processing",
                "Schedule deferred processing",
                "Restore processor state"
            ],
            examples: ["Timer interrupt handler", "Keyboard interrupt handler", "Network interrupt handler", "Disk interrupt handler"],
            interfaces: ["Interrupt vector table", "Hardware interrupt lines", "Interrupt controller"]
        }
    ]
    
    DISPLAY "I/O Software Layer Architecture (Top to Bottom):"
    FOR each layer IN io_layers
        DISPLAY "\nLayer " + layer["level"] + ": " + layer["layer"]
        DISPLAY "  Description: " + layer["description"]
        DISPLAY "  Key Responsibilities:"
        FOR each resp IN layer["responsibilities"]
            DISPLAY "    • " + resp
        ENDFOR
        DISPLAY "  Examples:"
        FOR each example IN layer["examples"]
            DISPLAY "    → " + example
        ENDFOR
        DISPLAY "  Interface Types:"
        FOR each interface IN layer["interfaces"]
            DISPLAY "    ◦ " + interface
        ENDFOR
    ENDFOR
    
    // Device Driver Architecture
    DISPLAY "\n=== DEVICE DRIVER ARCHITECTURE ==="
    
    SET driver_components = [
        {
            component: "Driver Entry Points",
            description: "Functions called by the operating system to interact with the driver",
            functions: [
                "DriverEntry: Initialize driver and register callbacks",
                "AddDevice: Handle new device detection",
                "StartDevice: Initialize and start device operation",
                "RemoveDevice: Clean up when device is removed",
                "Unload: Clean up driver resources on unload"
            ],
            characteristics: ["Well-defined interface", "Standardized calling conventions", "Error handling requirements"]
        },
        {
            component: "I/O Request Processing",
            description: "Handles I/O requests from applications and system",
            functions: [
                "Read: Handle read requests from device",
                "Write: Handle write requests to device",
                "DeviceControl: Handle device-specific control operations",
                "InternalDeviceControl: Handle internal control requests",
                "Cleanup: Handle resource cleanup"
            ],
            characteristics: ["Asynchronous processing", "Queue management", "Request validation"]
        },
        {
            component: "Interrupt Service Routine (ISR)",
            description: "Handles hardware interrupts from the device",
            functions: [
                "Acknowledge interrupt",
                "Read device status",
                "Queue deferred processing",
                "Signal completion events",
                "Handle error conditions"
            ],
            characteristics: ["Minimal processing time", "Non-blocking operations", "Hardware-specific code"]
        },
        {
            component: "Deferred Procedure Calls (DPC)",
            description: "Handles time-consuming interrupt processing at lower priority",
            functions: [
                "Process completed I/O requests",
                "Update data structures",
                "Signal waiting threads",
                "Perform error recovery",
                "Schedule additional work"
            ],
            characteristics: ["Lower interrupt level", "Can be preempted", "Longer processing time allowed"]
        }
    ]
    
    DISPLAY "Device Driver Components:"
    FOR each component IN driver_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Key Functions:"
        FOR each function IN component["functions"]
            DISPLAY "    • " + function
        ENDFOR
        DISPLAY "  Characteristics:"
        FOR each char IN component["characteristics"]
            DISPLAY "    ◦ " + char
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Interrupt Handling and DMA</h2>
    
    <h3>Interrupt Processing Mechanisms</h3>
    <pre><code>BEGIN Interrupt_Processing
    DISPLAY "=== INTERRUPT HANDLING MECHANISMS ==="
    DISPLAY "How computer systems respond to and process hardware interrupts"
    
    // Interrupt Types and Classification
    SET interrupt_types = [
        {
            type: "Hardware Interrupts",
            description: "Signals from hardware devices requiring immediate attention",
            sources: [
                "Timer interrupts: System clock and scheduling",
                "I/O device interrupts: Keyboard, mouse, disk, network",
                "Error interrupts: Hardware failures and exceptions",
                "Power management interrupts: Battery, thermal events"
            ],
            characteristics: ["Asynchronous", "External to CPU", "Maskable or non-maskable"],
            priority_levels: ["High: Critical system events", "Medium: I/O completion", "Low: Background tasks"]
        },
        {
            type: "Software Interrupts",
            description: "Programmatically generated interrupts for system services",
            sources: [
                "System calls: Application requests for OS services",
                "Exception handling: Division by zero, page faults",
                "Trap instructions: Debugging and monitoring",
                "Inter-processor interrupts: Multi-core coordination"
            ],
            characteristics: ["Synchronous", "Generated by software", "Predictable timing"],
            priority_levels: ["High: System calls", "Medium: Exceptions", "Low: Debug traps"]
        }
    ]
    
    DISPLAY "Interrupt Classification:"
    FOR each type IN interrupt_types
        DISPLAY "\n" + type["type"] + ":"
        DISPLAY "  Description: " + type["description"]
        DISPLAY "  Common Sources:"
        FOR each source IN type["sources"]
            DISPLAY "    • " + source
        ENDFOR
        DISPLAY "  Key Characteristics:"
        FOR each char IN type["characteristics"]
            DISPLAY "    ◦ " + char
        ENDFOR
        DISPLAY "  Priority Levels:"
        FOR each priority IN type["priority_levels"]
            DISPLAY "    → " + priority
        ENDFOR
    ENDFOR
    
    // Interrupt Processing Steps
    DISPLAY "\n=== INTERRUPT PROCESSING WORKFLOW ==="
    
    FUNCTION demonstrate_interrupt_processing()
        DISPLAY "Complete Interrupt Processing Sequence:"
        
        SET interrupt_steps = [
            {
                phase: "Interrupt Detection",
                step: 1,
                actions: [
                    "Hardware device asserts interrupt line",
                    "Interrupt controller receives signal",
                    "Controller determines interrupt priority",
                    "Controller signals CPU if priority is sufficient"
                ],
                timing: "Hardware propagation delay (nanoseconds)",
                considerations: ["Interrupt masking", "Priority arbitration", "Nested interrupts"]
            },
            {
                phase: "Context Saving",
                step: 2,
                actions: [
                    "CPU completes current instruction",
                    "Save program counter and processor flags",
                    "Save general-purpose registers",
                    "Switch to kernel mode if necessary"
                ],
                timing: "Few CPU cycles (microseconds)",
                considerations: ["Register set size", "Hardware assistance", "Stack management"]
            },
            {
                phase: "Interrupt Vector Lookup",
                step: 3,
                actions: [
                    "Identify interrupt source",
                    "Look up handler address in interrupt vector table",
                    "Load handler address into program counter",
                    "Begin executing interrupt handler"
                ],
                timing: "Memory access time (nanoseconds)",
                considerations: ["Vector table organization", "Shared vs. dedicated vectors", "Handler registration"]
            },
            {
                phase: "Interrupt Service Routine (ISR)",
                step: 4,
                actions: [
                    "Acknowledge interrupt to hardware",
                    "Perform minimal necessary processing",
                    "Queue work for deferred processing if needed",
                    "Clear interrupt condition"
                ],
                timing: "Microseconds to milliseconds",
                considerations: ["Minimize processing time", "Avoid blocking operations", "Reentrancy issues"]
            },
            {
                phase: "Context Restoration",
                step: 5,
                actions: [
                    "Restore saved registers",
                    "Restore program counter and flags",
                    "Return to previous execution mode",
                    "Resume interrupted program"
                ],
                timing: "Few CPU cycles (microseconds)",
                considerations: ["Atomic restoration", "Interrupt nesting", "Priority inversion"]
            }
        ]
        
        FOR each step IN interrupt_steps
            DISPLAY "\nPhase " + step["step"] + ": " + step["phase"]
            DISPLAY "  Actions Performed:"
            FOR each action IN step["actions"]
                DISPLAY "    • " + action
            ENDFOR
            DISPLAY "  Typical Timing: " + step["timing"]
            DISPLAY "  Key Considerations:"
            FOR each consideration IN step["considerations"]
                DISPLAY "    ◦ " + consideration
            ENDFOR
        ENDFOR
        
        DISPLAY "\nInterrupt Processing Performance Factors:"
        DISPLAY "• Context switch overhead: 1-10 microseconds"
        DISPLAY "• ISR execution time: Should be minimized"
        DISPLAY "• Interrupt frequency: Affects overall system performance"
        DISPLAY "• Nested interrupt handling: Increases complexity"
        DISPLAY "• Cache and TLB effects: May cause additional delays"
    END FUNCTION
    
    CALL demonstrate_interrupt_processing()
    
    // DMA (Direct Memory Access)
    DISPLAY "\n=== DIRECT MEMORY ACCESS (DMA) ==="
    
    SET dma_concepts = [
        {
            concept: "DMA Controller Architecture",
            description: "Specialized hardware that manages data transfers without CPU intervention",
            components: [
                "Address Register: Source and destination addresses",
                "Count Register: Number of bytes to transfer",
                "Control Register: Transfer mode and parameters",
                "Status Register: Current transfer status"
            ],
            transfer_modes: [
                "Single Transfer: One data unit per DMA cycle",
                "Block Transfer: Entire block transferred at once",
                "Burst Transfer: Multiple units with bus release",
                "Cycle Stealing: Interleaved with CPU access"
            ]
        },
        {
            concept: "DMA Transfer Process",
            description: "Step-by-step process of DMA data transfer",
            components: [
                "CPU programs DMA controller with transfer parameters",
                "DMA controller requests bus control from CPU",
                "Bus arbiter grants control to DMA controller",
                "DMA performs data transfer directly"
            ],
            transfer_modes: [
                "Memory-to-Memory: Between different memory locations",
                "Memory-to-Device: From memory to I/O device",
                "Device-to-Memory: From I/O device to memory",
                "Device-to-Device: Between I/O devices (rare)"
            ]
        },
        {
            concept: "DMA Advantages and Challenges",
            description: "Benefits and issues associated with DMA implementation",
            components: [
                "High throughput for large data transfers",
                "Reduced CPU overhead and improved multitasking",
                "Efficient for streaming and bulk operations",
                "Hardware complexity and cost considerations"
            ],
            transfer_modes: [
                "Bus Contention: Competition between CPU and DMA",
                "Cache Coherency: Maintaining data consistency",
                "Memory Protection: Ensuring secure transfers",
                "Error Handling: Managing transfer failures"
            ]
        }
    ]
    
    DISPLAY "DMA (Direct Memory Access) Concepts:"
    FOR each concept IN dma_concepts
        DISPLAY "\n" + concept["concept"] + ":"
        DISPLAY "  Description: " + concept["description"]
        DISPLAY "  Key Components/Steps:"
        FOR each component IN concept["components"]
            DISPLAY "    • " + component
        ENDFOR
        DISPLAY "  Transfer Modes/Considerations:"
        FOR each mode IN concept["transfer_modes"]
            DISPLAY "    → " + mode
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>I/O Scheduling and Performance</h2>
    
    <h3>Disk Scheduling Algorithms</h3>
    <pre><code>BEGIN IO_Scheduling
    DISPLAY "=== I/O SCHEDULING ALGORITHMS ==="
    DISPLAY "Algorithms for optimizing disk access patterns and reducing seek time"
    
    // Disk Scheduling Algorithms
    SET scheduling_algorithms = [
        {
            algorithm: "First-Come, First-Served (FCFS)",
            description: "Process I/O requests in the order they arrive",
            implementation: "Simple queue of requests processed sequentially",
            advantages: ["Fair to all requests", "Simple implementation", "No starvation"],
            disadvantages: ["Poor performance", "High seek time", "No optimization"],
            best_for: ["Light I/O loads", "Systems where fairness is critical"],
            seek_pattern: "Random movement based on request order"
        },
        {
            algorithm: "Shortest Seek Time First (SSTF)",
            description: "Select request with minimum seek time from current position",
            implementation: "Priority queue ordered by distance from current head position",
            advantages: ["Reduced average seek time", "Better throughput than FCFS", "Locally optimal"],
            disadvantages: ["Starvation possible", "Not globally optimal", "Complex implementation"],
            best_for: ["Moderate I/O loads", "Systems prioritizing throughput"],
            seek_pattern: "Greedy selection of closest requests"
        },
        {
            algorithm: "SCAN (Elevator Algorithm)",
            description: "Move head in one direction, servicing requests until end, then reverse",
            implementation: "Sorted list of requests, process in current direction",
            advantages: ["No starvation", "Good average performance", "Predictable behavior"],
            disadvantages: ["Unfair to middle tracks", "End tracks get better service", "Direction changes costly"],
            best_for: ["Heavy I/O loads", "Systems requiring predictable response"],
            seek_pattern: "Systematic sweep across disk surface"
        },
        {
            algorithm: "C-SCAN (Circular SCAN)",
            description: "Like SCAN but only services requests in one direction, returns to start",
            implementation: "Circular list, always move in same direction",
            advantages: ["More uniform wait times", "No starvation", "Fair to all tracks"],
            disadvantages: ["Longer seek times for return", "May miss nearby requests", "Complex implementation"],
            best_for: ["Systems requiring uniform response times", "Heavy random I/O"],
            seek_pattern: "Unidirectional sweep with circular return"
        },
        {
            algorithm: "LOOK and C-LOOK",
            description: "Like SCAN/C-SCAN but only go as far as last request in direction",
            implementation: "Modified SCAN that stops at last request",
            advantages: ["Reduced unnecessary movement", "Better performance than SCAN", "Still fair"],
            disadvantages: ["More complex logic", "Dynamic endpoint calculation", "Variable sweep distance"],
            best_for: ["Modern disk systems", "Variable request distributions"],
            seek_pattern: "Optimized sweep with dynamic endpoints"
        }
    ]
    
    DISPLAY "Disk Scheduling Algorithms Comparison:"
    FOR each algorithm IN scheduling_algorithms
        DISPLAY "\n" + algorithm["algorithm"] + ":"
        DISPLAY "  Description: " + algorithm["description"]
        DISPLAY "  Implementation: " + algorithm["implementation"]
        DISPLAY "  Advantages:"
        FOR each adv IN algorithm["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN algorithm["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Best For: " + join(algorithm["best_for"], ", ")
        DISPLAY "  Seek Pattern: " + algorithm["seek_pattern"]
    ENDFOR
    
    // Scheduling Algorithm Example
    DISPLAY "\n=== DISK SCHEDULING EXAMPLE ==="
    
    FUNCTION compare_disk_scheduling()
        DISPLAY "Disk Scheduling Comparison Example:"
        DISPLAY "Initial head position: 50"
        DISPLAY "Request queue: [82, 170, 43, 140, 24, 16, 190]"
        DISPLAY "Disk range: 0-199 tracks"
        
        SET algorithms_performance = [
            {
                name: "FCFS",
                sequence: [82, 170, 43, 140, 24, 16, 190],
                total_movement: 644,
                average_seek: 92.0
            },
            {
                name: "SSTF",
                sequence: [43, 24, 16, 82, 140, 170, 190],
                total_movement: 236,
                average_seek: 33.7
            },
            {
                name: "SCAN",
                sequence: [82, 140, 170, 190, 43, 24, 16],
                total_movement: 334,
                average_seek: 47.7
            },
            {
                name: "C-SCAN",
                sequence: [82, 140, 170, 190, 16, 24, 43],
                total_movement: 382,
                average_seek: 54.6
            }
        ]
        
        DISPLAY "\nPerformance Comparison:"
        FOR each perf IN algorithms_performance
            DISPLAY "\n" + perf["name"] + " Algorithm:"
            DISPLAY "  Service sequence: " + join(perf["sequence"], " → ")
            DISPLAY "  Total head movement: " + perf["total_movement"] + " tracks"
            DISPLAY "  Average seek distance: " + perf["average_seek"] + " tracks"
        ENDFOR
        
        DISPLAY "\nKey Insights:"
        DISPLAY "• SSTF provides best performance but may cause starvation"
        DISPLAY "• SCAN offers good balance of performance and fairness"
        DISPLAY "• FCFS is fair but inefficient for random access patterns"
        DISPLAY "• C-SCAN provides more uniform response times"
        DISPLAY "• Modern SSDs make these algorithms less relevant"
    END FUNCTION
    
    CALL compare_disk_scheduling()
END</code></pre>
    
    <h2>Modern I/O Technologies</h2>
    
    <h3>Advanced I/O Interfaces and Technologies</h3>
    <pre><code>BEGIN Modern_IO_Technologies
    DISPLAY "=== MODERN I/O TECHNOLOGIES AND INTERFACES ==="
    DISPLAY "Contemporary I/O technologies and their impact on system performance"
    
    // Modern Storage Technologies
    SET storage_technologies = [
        {
            technology: "Solid State Drives (SSDs)",
            description: "Flash memory-based storage with no moving parts",
            characteristics: [
                "NAND flash memory technology",
                "No mechanical seek time",
                "High random access performance",
                "Limited write/erase cycles",
                "Wear leveling algorithms"
            ],
            advantages: ["Fast access times", "Low power consumption", "Shock resistant", "Silent operation"],
            challenges: ["Write amplification", "Wear leveling", "Cost per GB", "Data retention"],
            interfaces: ["SATA", "NVMe", "M.2", "PCIe"]
        },
        {
            technology: "NVMe (Non-Volatile Memory Express)",
            description: "High-performance interface protocol designed for SSDs",
            characteristics: [
                "PCIe-based interface",
                "Multiple command queues",
                "Reduced latency and overhead",
                "Parallel processing support",
                "Optimized for flash memory"
            ],
            advantages: ["Very high throughput", "Low latency", "Efficient CPU usage", "Scalable performance"],
            challenges: ["Higher cost", "Power consumption", "Heat generation", "Compatibility"],
            interfaces: ["PCIe 3.0/4.0/5.0", "M.2", "U.2", "Add-in cards"]
        },
        {
            technology: "Storage Class Memory (SCM)",
            description: "Memory technologies that bridge the gap between RAM and storage",
            characteristics: [
                "Byte-addressable non-volatile memory",
                "Near-DRAM performance",
                "Persistent data storage",
                "Direct CPU access",
                "New programming models"
            ],
            advantages: ["Ultra-low latency", "High endurance", "Byte addressability", "Persistent memory"],
            challenges: ["Limited capacity", "High cost", "New software models", "Reliability concerns"],
            interfaces: ["DDR4/5 slots", "PCIe", "CXL", "Memory bus"]
        }
    ]
    
    DISPLAY "Modern Storage Technologies:"
    FOR each tech IN storage_technologies
        DISPLAY "\n" + tech["technology"] + ":"
        DISPLAY "  Description: " + tech["description"]
        DISPLAY "  Key Characteristics:"
        FOR each char IN tech["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN tech["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Challenges:"
        FOR each challenge IN tech["challenges"]
            DISPLAY "    ⚠ " + challenge
        ENDFOR
        DISPLAY "  Common Interfaces: " + join(tech["interfaces"], ", ")
    ENDFOR
    
    // High-Speed Interconnects
    DISPLAY "\n=== HIGH-SPEED INTERCONNECT TECHNOLOGIES ==="
    
    SET interconnect_technologies = [
        {
            technology: "PCIe (Peripheral Component Interconnect Express)",
            description: "High-speed serial expansion bus standard",
            versions: [
                "PCIe 3.0: 8 GT/s per lane, up to 32 GB/s (x16)",
                "PCIe 4.0: 16 GT/s per lane, up to 64 GB/s (x16)",
                "PCIe 5.0: 32 GT/s per lane, up to 128 GB/s (x16)",
                "PCIe 6.0: 64 GT/s per lane, up to 256 GB/s (x16)"
            ],
            features: ["Point-to-point connections", "Lane scalability", "Hot-plug support", "Advanced error reporting"],
            applications: ["Graphics cards", "NVMe SSDs", "Network cards", "Expansion cards"]
        },
        {
            technology: "Thunderbolt",
            description: "High-speed I/O technology combining PCIe and DisplayPort",
            versions: [
                "Thunderbolt 1: 10 Gbps bidirectional",
                "Thunderbolt 2: 20 Gbps bidirectional",
                "Thunderbolt 3: 40 Gbps bidirectional (USB-C)",
                "Thunderbolt 4: 40 Gbps with enhanced features"
            ],
            features: ["Daisy chaining", "Power delivery", "Multiple protocols", "External GPU support"],
            applications: ["External storage", "Displays", "Docking stations", "Professional peripherals"]
        },
        {
            technology: "USB (Universal Serial Bus)",
            description: "Widely adopted standard for connecting peripherals",
            versions: [
                "USB 2.0: 480 Mbps (High Speed)",
                "USB 3.0/3.1 Gen 1: 5 Gbps (SuperSpeed)",
                "USB 3.1 Gen 2: 10 Gbps (SuperSpeed+)",
                "USB 3.2/4: Up to 40 Gbps (various configurations)"
            ],
            features: ["Hot-plug support", "Power delivery", "Backward compatibility", "Wide device support"],
            applications: ["Keyboards/mice", "Storage devices", "Mobile devices", "Audio interfaces"]
        }
    ]
    
    DISPLAY "High-Speed Interconnect Technologies:"
    FOR each tech IN interconnect_technologies
        DISPLAY "\n" + tech["technology"] + ":"
        DISPLAY "  Description: " + tech["description"]
        DISPLAY "  Version Evolution:"
        FOR each version IN tech["versions"]
            DISPLAY "    • " + version
        ENDFOR
        DISPLAY "  Key Features:"
        FOR each feature IN tech["features"]
            DISPLAY "    ◦ " + feature
        ENDFOR
        DISPLAY "  Common Applications:"
        FOR each app IN tech["applications"]
            DISPLAY "    → " + app
        ENDFOR
    ENDFOR
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "interrupt-simulator",
      title: "Interrupt Handling Simulator",
      description: "Simulate interrupt processing and observe system behavior under different interrupt loads.",
      features: [
        "Multiple interrupt sources with different priorities",
        "Configurable interrupt frequencies",
        "Context switching visualization",
        "Performance impact analysis",
        "Nested interrupt scenarios"
      ]
    },
    {
      type: "disk-scheduler",
      title: "Disk Scheduling Algorithm Visualizer",
      description: "Compare different disk scheduling algorithms with customizable request patterns.",
      algorithms: [
        "FCFS (First-Come, First-Served)",
        "SSTF (Shortest Seek Time First)",
        "SCAN (Elevator Algorithm)",
        "C-SCAN (Circular SCAN)",
        "LOOK and C-LOOK"
      ]
    },
    {
      type: "dma-controller",
      title: "DMA Transfer Simulation",
      description: "Visualize Direct Memory Access operations and compare with programmed I/O.",
      parameters: [
        "Transfer size",
        "Source and destination addresses",
        "Transfer mode (single, block, burst)",
        "Bus arbitration settings",
        "Performance comparison metrics"
      ]
    },
    {
      type: "io-performance-analyzer",
      title: "I/O Performance Analysis Tool",
      description: "Analyze I/O performance characteristics of different storage technologies.",
      metrics: [
        "Throughput (MB/s)",
        "IOPS (Input/Output Operations Per Second)",
        "Latency (response time)",
        "Queue depth effects",
        "Random vs. sequential performance"
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "Evolution of Storage Technologies",
      content: `
        <p>Storage technology has undergone dramatic changes over the decades:</p>
        
        <h4>Mechanical Storage Era</h4>
        <p>Traditional hard disk drives (HDDs) dominated storage for decades, using magnetic recording on spinning platters. Key characteristics included:</p>
        <ul>
          <li><strong>Mechanical Components:</strong> Spinning platters, moving read/write heads</li>
          <li><strong>Seek Time:</strong> Time to position heads over correct track</li>
          <li><strong>Rotational Latency:</strong> Time for correct sector to rotate under head</li>
          <li><strong>Sequential vs. Random Access:</strong> Large performance difference</li>
        </ul>
        
        <h4>Solid State Revolution</h4>
        <p>SSDs eliminated mechanical components, using NAND flash memory:</p>
        <ul>
          <li><strong>No Moving Parts:</strong> Eliminated seek time and rotational latency</li>
          <li><strong>Random Access:</strong> Consistent performance regardless of access pattern</li>
          <li><strong>Power Efficiency:</strong> Lower power consumption than HDDs</li>
          <li><strong>Durability:</strong> Resistant to shock and vibration</li>
        </ul>
        
        <h4>Interface Evolution</h4>
        <p>Storage interfaces evolved to match performance capabilities:</p>
        <ul>
          <li><strong>PATA/IDE:</strong> Parallel interface, limited speed</li>
          <li><strong>SATA:</strong> Serial interface, better performance and cables</li>
          <li><strong>NVMe:</strong> Designed specifically for flash storage, PCIe-based</li>
        </ul>
        
        <h4>Future Technologies</h4>
        <p>Emerging storage technologies promise even better performance:</p>
        <ul>
          <li><strong>Storage Class Memory:</strong> Byte-addressable persistent memory</li>
          <li><strong>3D NAND:</strong> Stacking memory cells vertically for higher density</li>
          <li><strong>New Memory Types:</strong> ReRAM, MRAM, and other non-volatile technologies</li>
        </ul>
      `
    },
    {
      title: "I/O Virtualization and Cloud Computing",
      content: `
        <p>Modern computing environments require sophisticated I/O virtualization:</p>
        
        <h4>Hardware Virtualization</h4>
        <p>Hardware features that support I/O virtualization:</p>
        <ul>
          <li><strong>IOMMU:</strong> I/O Memory Management Unit for device isolation</li>
          <li><strong>SR-IOV:</strong> Single Root I/O Virtualization for PCIe devices</li>
          <li><strong>VT-d/AMD-Vi:</strong> CPU virtualization extensions for I/O</li>
        </ul>
        
        <h4>Software Virtualization</h4>
        <p>Software techniques for I/O virtualization:</p>
        <ul>
          <li><strong>Paravirtualization:</strong> Guest OS aware of virtualization</li>
          <li><strong>Device Emulation:</strong> Hypervisor emulates hardware devices</li>
          <li><strong>Passthrough:</strong> Direct device access for performance</li>
        </ul>
        
        <h4>Cloud Storage</h4>
        <p>Cloud environments present unique I/O challenges:</p>
        <ul>
          <li><strong>Network Storage:</strong> Storage accessed over network protocols</li>
          <li><strong>Distributed Systems:</strong> Data spread across multiple nodes</li>
          <li><strong>Consistency Models:</strong> Managing data consistency in distributed systems</li>
          <li><strong>Performance Variability:</strong> Shared infrastructure affects performance</li>
        </ul>
        
        <h4>Container I/O</h4>
        <p>Containerization adds another layer of I/O abstraction:</p>
        <ul>
          <li><strong>Volume Management:</strong> Persistent storage for containers</li>
          <li><strong>Network I/O:</strong> Container networking and service discovery</li>
          <li><strong>Resource Limits:</strong> I/O throttling and quality of service</li>
        </ul>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which I/O method provides the highest throughput for large data transfers while minimizing CPU overhead?",
      options: ["Programmed I/O (Polling)", "Interrupt-driven I/O", "Direct Memory Access (DMA)", "Memory-mapped I/O"],
      correct: 2,
      explanation: "Direct Memory Access (DMA) allows data transfer directly between devices and memory without CPU intervention, providing the highest throughput and lowest CPU overhead for large transfers."
    },
    {
      type: "scenario-based",
      question: "A disk has requests for tracks: 98, 183, 37, 122, 14, 124, 65, 67. The current head position is at track 53. Calculate the total head movement for SCAN algorithm assuming the head moves toward higher track numbers first.",
      sampleAnswer: "SCAN sequence: 65, 67, 98, 122, 124, 183, then reverse to 37, 14. Total movement: (183-53) + (183-14) = 130 + 169 = 299 tracks.",
      rubric: [
        "Correctly identifies SCAN algorithm behavior",
        "Properly sequences requests in ascending order first",
        "Includes return sweep for remaining requests",
        "Calculates total head movement accurately"
      ]
    },
    {
      type: "comparison",
      question: "Compare the advantages and disadvantages of interrupt-driven I/O versus polling (programmed I/O) for different types of applications.",
      sampleAnswer: "Interrupt-driven I/O is efficient for slow devices and multitasking systems but has overhead. Polling is simple and predictable but wastes CPU cycles. Real-time systems may prefer polling for deterministic timing, while general-purpose systems benefit from interrupt-driven I/O.",
      rubric: [
        "Explains both methods clearly",
        "Identifies appropriate use cases for each",
        "Discusses performance trade-offs",
        "Considers system requirements and constraints"
      ]
    },
    {
      type: "design-analysis",
      question: "Design an I/O subsystem for a high-performance database server that needs to handle thousands of concurrent transactions. Consider storage technology, I/O scheduling, and performance optimization techniques.",
      correctAnswer: "Use NVMe SSDs with multiple queues, implement deadline scheduling to ensure transaction timeouts, use asynchronous I/O with completion ports, implement read-ahead and write-behind caching, and consider RAID for redundancy and performance.",
      explanation: "Database servers require low latency, high throughput, and predictable performance, making NVMe SSDs and advanced I/O techniques essential."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Device Driver Development",
      description: "Write a simple device driver that handles basic I/O operations, interrupt processing, and error handling for a hypothetical hardware device.",
      difficulty: "hard",
      hints: ["Implement proper interrupt handling", "Handle device errors gracefully", "Ensure thread safety"]
    },
    {
      title: "I/O Performance Benchmarking",
      description: "Design and implement benchmarks to measure I/O performance characteristics of different storage devices and interfaces.",
      difficulty: "medium",
      hints: ["Test various access patterns", "Measure latency and throughput", "Consider queue depth effects"]
    },
    {
      title: "Interrupt Optimization",
      description: "Analyze an interrupt-heavy system and propose optimizations to reduce interrupt overhead while maintaining responsiveness.",
      difficulty: "medium",
      hints: ["Consider interrupt coalescing", "Analyze interrupt frequency", "Evaluate polling alternatives"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Interrupt Service Routine (ISR)",
      definition: "A special function that executes in response to a hardware or software interrupt"
    },
    {
      term: "Direct Memory Access (DMA)",
      definition: "A method that allows devices to transfer data directly to/from memory without CPU intervention"
    },
    {
      term: "Device Driver",
      definition: "Software that provides an interface between the operating system and a hardware device"
    },
    {
      term: "Memory-Mapped I/O",
      definition: "A method of performing I/O where device registers are mapped to memory addresses"
    },
    {
      term: "Interrupt Vector",
      definition: "A memory address that points to the interrupt service routine for a specific interrupt"
    },
    {
      term: "Bus Arbitration",
      definition: "The process of determining which device gets control of the system bus"
    },
    {
      term: "I/O Controller",
      definition: "Hardware that manages communication between the CPU and I/O devices"
    },
    {
      term: "Seek Time",
      definition: "The time required to position a disk drive's read/write head over the correct track"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of computer architecture and hardware components",
    "Knowledge of operating system concepts and process management",
    "Familiarity with memory management and addressing",
    "Basic understanding of computer networks and protocols"
  ],
  
  nextSteps: [
    "Study advanced I/O technologies (NVMe, Storage Class Memory)",
    "Learn about I/O virtualization and cloud storage systems",
    "Explore real-time I/O systems and embedded device programming",
    "Investigate I/O security and trusted computing platforms",
    "Practice with device driver development and system programming"
  ]
};