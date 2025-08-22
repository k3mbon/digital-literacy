// Lesson 4.1: Computer Architecture - Comprehensive lesson content

export default {
  title: "Computer Architecture",
  description: "Explore the fundamental components and design principles of computer systems, from basic hardware to advanced architectural concepts",
  difficulty: "intermediate",
  estimatedTime: "90 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the basic components of computer architecture",
    "Learn about CPU design, instruction sets, and execution cycles",
    "Explore memory hierarchy and storage systems",
    "Analyze system performance and optimization techniques",
    "Compare different architectural approaches and their trade-offs"
  ],
  
  // Main lesson content
  content: `
    <h2>Introduction to Computer Architecture</h2>
    <p><strong>Computer architecture</strong> refers to the design and organization of computer systems, including the structure and behavior of hardware components and their interactions. It encompasses everything from individual processor design to entire system organization.</p>
    
    <p>Computer architecture operates at multiple levels:</p>
    <ul>
      <li><strong>Instruction Set Architecture (ISA):</strong> The interface between software and hardware</li>
      <li><strong>Microarchitecture:</strong> The implementation of the ISA in hardware</li>
      <li><strong>System Architecture:</strong> The overall organization of computer systems</li>
    </ul>
    
    <h2>Fundamental Components of Computer Systems</h2>
    
    <h3>The Von Neumann Architecture</h3>
    <pre><code>BEGIN Von_Neumann_Architecture
    DISPLAY "=== VON NEUMANN ARCHITECTURE MODEL ==="
    DISPLAY "Proposed by John von Neumann in 1945, this model forms the basis of modern computers"
    
    // Core Components
    SET von_neumann_components = [
        {
            component: "Central Processing Unit (CPU)",
            description: "Executes instructions and performs calculations",
            subcomponents: [
                "Arithmetic Logic Unit (ALU): Performs mathematical and logical operations",
                "Control Unit (CU): Manages instruction execution and system control",
                "Registers: High-speed temporary storage within the CPU",
                "Cache: Fast memory close to the CPU for frequently used data"
            ],
            functions: ["Fetch instructions", "Decode instructions", "Execute operations", "Store results"]
        },
        {
            component: "Memory (Primary Storage)",
            description: "Stores programs and data currently being used",
            subcomponents: [
                "RAM (Random Access Memory): Volatile main memory",
                "ROM (Read-Only Memory): Non-volatile firmware storage",
                "Cache Memory: High-speed buffer between CPU and RAM",
                "Virtual Memory: Extension of physical memory using storage"
            ],
            functions: ["Store program instructions", "Hold data being processed", "Provide fast access to CPU", "Support multitasking"]
        },
        {
            component: "Input/Output (I/O) System",
            description: "Handles communication with external devices",
            subcomponents: [
                "I/O Controllers: Manage specific device types",
                "Device Drivers: Software interface to hardware",
                "Buses: Communication pathways for data transfer",
                "Interrupt System: Handles asynchronous events"
            ],
            functions: ["Accept user input", "Display output", "Transfer data", "Manage peripherals"]
        },
        {
            component: "Secondary Storage",
            description: "Provides long-term, non-volatile data storage",
            subcomponents: [
                "Hard Disk Drives (HDD): Magnetic storage devices",
                "Solid State Drives (SSD): Flash memory storage",
                "Optical Drives: CD/DVD/Blu-ray storage",
                "Network Storage: Remote storage systems"
            ],
            functions: ["Store programs permanently", "Hold user data", "Provide backup storage", "Enable data sharing"]
        },
        {
            component: "System Bus",
            description: "Communication pathway connecting all components",
            subcomponents: [
                "Data Bus: Carries actual data between components",
                "Address Bus: Specifies memory locations",
                "Control Bus: Carries control signals",
                "Power Bus: Distributes electrical power"
            ],
            functions: ["Enable component communication", "Coordinate data transfer", "Synchronize operations", "Distribute power"]
        }
    ]
    
    DISPLAY "Von Neumann Architecture Components:"
    FOR each component IN von_neumann_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Subcomponents:"
        FOR each subcomp IN component["subcomponents"]
            DISPLAY "    • " + subcomp
        ENDFOR
        DISPLAY "  Primary Functions:"
        FOR each function IN component["functions"]
            DISPLAY "    ✓ " + function
        ENDFOR
    ENDFOR
    
    // Stored Program Concept
    DISPLAY "\n=== STORED PROGRAM CONCEPT ==="
    DISPLAY "Key principle: Both programs and data are stored in the same memory"
    
    SET stored_program_benefits = [
        "Flexibility: Programs can be easily changed without hardware modifications",
        "Self-Modification: Programs can modify themselves during execution",
        "Universal Machine: Same hardware can run different programs",
        "Efficiency: No need to rewire hardware for different tasks",
        "Programmability: Complex behaviors through software rather than hardware"
    ]
    
    DISPLAY "Benefits of Stored Program Concept:"
    FOR each benefit IN stored_program_benefits
        DISPLAY "  ✓ " + benefit
    ENDFOR
    
    // Von Neumann Bottleneck
    DISPLAY "\n=== VON NEUMANN BOTTLENECK ==="
    DISPLAY "Limitation: Single bus between CPU and memory creates performance bottleneck"
    
    SET bottleneck_solutions = [
        {
            solution: "Cache Memory",
            description: "High-speed memory close to CPU reduces memory access time",
            effectiveness: "High - reduces average memory access time significantly"
        },
        {
            solution: "Pipelining",
            description: "Overlapping instruction execution phases",
            effectiveness: "High - increases instruction throughput"
        },
        {
            solution: "Superscalar Architecture",
            description: "Multiple execution units allow parallel instruction execution",
            effectiveness: "Very High - enables instruction-level parallelism"
        },
        {
            solution: "Harvard Architecture",
            description: "Separate buses for instructions and data",
            effectiveness: "Moderate - used in specialized processors"
        }
    ]
    
    DISPLAY "Solutions to Von Neumann Bottleneck:"
    FOR each solution IN bottleneck_solutions
        DISPLAY "\n" + solution["solution"] + ":"
        DISPLAY "  Description: " + solution["description"]
        DISPLAY "  Effectiveness: " + solution["effectiveness"]
    ENDFOR
END</code></pre>
    
    <h2>Central Processing Unit (CPU) Design</h2>
    
    <h3>CPU Architecture and Components</h3>
    <pre><code>BEGIN CPU_Architecture
    DISPLAY "=== CPU INTERNAL ARCHITECTURE ==="
    
    // CPU Core Components
    SET cpu_components = [
        {
            component: "Arithmetic Logic Unit (ALU)",
            description: "Performs mathematical and logical operations",
            operations: [
                "Arithmetic: Addition, subtraction, multiplication, division",
                "Logical: AND, OR, NOT, XOR operations",
                "Comparison: Equal, greater than, less than",
                "Shift: Bit shifting operations",
                "Bitwise: Individual bit manipulation"
            ],
            design_considerations: ["Speed vs. complexity", "Power consumption", "Silicon area", "Precision requirements"]
        },
        {
            component: "Control Unit (CU)",
            description: "Manages instruction execution and coordinates system operations",
            operations: [
                "Instruction Fetch: Retrieves instructions from memory",
                "Instruction Decode: Interprets instruction format and operation",
                "Execution Control: Coordinates ALU and memory operations",
                "Interrupt Handling: Manages system interrupts and exceptions",
                "Pipeline Management: Controls instruction pipeline stages"
            ],
            design_considerations: ["Instruction set complexity", "Pipeline depth", "Branch prediction", "Exception handling"]
        },
        {
            component: "Register File",
            description: "High-speed storage locations within the CPU",
            operations: [
                "General Purpose: Store operands and intermediate results",
                "Special Purpose: Program counter, stack pointer, status flags",
                "Floating Point: Dedicated registers for floating-point operations",
                "Vector: SIMD (Single Instruction, Multiple Data) operations",
                "Control: System control and configuration registers"
            ],
            design_considerations: ["Number of registers", "Register width", "Access patterns", "Power consumption"]
        },
        {
            component: "Cache System",
            description: "High-speed memory hierarchy to reduce memory access latency",
            operations: [
                "L1 Cache: Fastest, smallest cache closest to CPU cores",
                "L2 Cache: Larger, slightly slower cache shared or per-core",
                "L3 Cache: Largest, shared cache for multiple cores",
                "Cache Coherency: Maintains data consistency across caches",
                "Prefetching: Predicts and loads data before it's needed"
            ],
            design_considerations: ["Cache size vs. speed", "Associativity", "Replacement policies", "Coherency protocols"]
        }
    ]
    
    DISPLAY "CPU Core Components:"
    FOR each component IN cpu_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Key Operations:"
        FOR each operation IN component["operations"]
            DISPLAY "    • " + operation
        ENDFOR
        DISPLAY "  Design Considerations:"
        FOR each consideration IN component["design_considerations"]
            DISPLAY "    ⚡ " + consideration
        ENDFOR
    ENDFOR
    
    // Instruction Execution Cycle
    DISPLAY "\n=== INSTRUCTION EXECUTION CYCLE ==="
    DISPLAY "The basic cycle that CPUs follow to execute instructions"
    
    FUNCTION demonstrate_instruction_cycle()
        SET instruction_cycle = [
            {
                stage: "Fetch",
                description: "Retrieve instruction from memory",
                steps: [
                    "Send address from Program Counter (PC) to memory",
                    "Read instruction from memory location",
                    "Load instruction into Instruction Register (IR)",
                    "Increment Program Counter to next instruction"
                ],
                time_typical: "1-2 clock cycles"
            },
            {
                stage: "Decode",
                description: "Interpret the instruction format and determine operation",
                steps: [
                    "Analyze instruction opcode (operation code)",
                    "Identify operand locations (registers, memory, immediate)",
                    "Determine required execution units",
                    "Generate control signals for execution"
                ],
                time_typical: "1 clock cycle"
            },
            {
                stage: "Execute",
                description: "Perform the actual operation",
                steps: [
                    "Read operands from specified locations",
                    "Perform operation using ALU or other units",
                    "Handle any exceptions or interrupts",
                    "Generate result and status flags"
                ],
                time_typical: "1-10+ clock cycles (varies by operation)"
            },
            {
                stage: "Writeback",
                description: "Store the result in the destination",
                steps: [
                    "Write result to destination register or memory",
                    "Update processor status flags",
                    "Handle any pipeline forwarding",
                    "Prepare for next instruction"
                ],
                time_typical: "1 clock cycle"
            }
        ]
        
        DISPLAY "Instruction Execution Stages:"
        FOR each stage IN instruction_cycle
            DISPLAY "\n" + stage["stage"] + " Stage:"
            DISPLAY "  Description: " + stage["description"]
            DISPLAY "  Typical Time: " + stage["time_typical"]
            DISPLAY "  Detailed Steps:"
            FOR each step IN stage["steps"]
                DISPLAY "    1. " + step
            ENDFOR
        ENDFOR
        
        // Example Instruction Execution
        DISPLAY "\n=== EXAMPLE: ADD R1, R2, R3 ==="
        DISPLAY "Instruction: Add contents of R2 and R3, store result in R1"
        
        DISPLAY "\nFetch Stage:"
        DISPLAY "  • PC contains address 0x1000"
        DISPLAY "  • CPU reads instruction from memory[0x1000]"
        DISPLAY "  • Instruction 'ADD R1, R2, R3' loaded into IR"
        DISPLAY "  • PC incremented to 0x1004"
        
        DISPLAY "\nDecode Stage:"
        DISPLAY "  • Opcode identified as ADD operation"
        DISPLAY "  • Source registers: R2, R3"
        DISPLAY "  • Destination register: R1"
        DISPLAY "  • ALU configured for addition"
        
        DISPLAY "\nExecute Stage:"
        DISPLAY "  • Read value from R2: 0x00000010 (16 decimal)"
        DISPLAY "  • Read value from R3: 0x00000020 (32 decimal)"
        DISPLAY "  • ALU performs: 16 + 32 = 48"
        DISPLAY "  • Result: 0x00000030 (48 decimal)"
        
        DISPLAY "\nWriteback Stage:"
        DISPLAY "  • Store result 0x00000030 in register R1"
        DISPLAY "  • Update status flags (if needed)"
        DISPLAY "  • Instruction complete"
    END FUNCTION
    
    CALL demonstrate_instruction_cycle()
END</code></pre>
    
    <h3>Instruction Set Architecture (ISA)</h3>
    <pre><code>BEGIN Instruction_Set_Architecture
    DISPLAY "=== INSTRUCTION SET ARCHITECTURE (ISA) ==="
    DISPLAY "The interface between software and hardware - defines what instructions the CPU can execute"
    
    // ISA Categories
    SET isa_types = [
        {
            type: "CISC (Complex Instruction Set Computer)",
            description: "Large number of complex instructions that can perform multiple operations",
            characteristics: [
                "Variable-length instructions",
                "Complex addressing modes",
                "Many specialized instructions",
                "Microcode-based implementation",
                "Fewer instructions needed for programs"
            ],
            examples: ["x86/x64 (Intel, AMD)", "VAX", "Motorola 68000"],
            advantages: ["Compact code", "Rich instruction set", "Backward compatibility"],
            disadvantages: ["Complex hardware", "Variable execution times", "Difficult to pipeline"]
        },
        {
            type: "RISC (Reduced Instruction Set Computer)",
            description: "Small number of simple, uniform instructions",
            characteristics: [
                "Fixed-length instructions",
                "Simple addressing modes",
                "Load/store architecture",
                "Large register file",
                "Hardwired control unit"
            ],
            examples: ["ARM", "MIPS", "PowerPC", "RISC-V"],
            advantages: ["Simple hardware", "Predictable timing", "Easy to pipeline", "Lower power consumption"],
            disadvantages: ["More instructions needed", "Larger code size", "Compiler complexity"]
        },
        {
            type: "VLIW (Very Long Instruction Word)",
            description: "Instructions explicitly specify multiple operations to execute in parallel",
            characteristics: [
                "Very wide instructions (128+ bits)",
                "Explicit parallelism",
                "Compiler-scheduled operations",
                "Multiple functional units",
                "No dynamic scheduling"
            ],
            examples: ["Intel Itanium", "TI C6000 DSP", "Some GPUs"],
            advantages: ["High performance potential", "Simple hardware", "Predictable execution"],
            disadvantages: ["Compiler complexity", "Code compatibility", "Wasted instruction slots"]
        }
    ]
    
    DISPLAY "ISA Types Comparison:"
    FOR each isa IN isa_types
        DISPLAY "\n" + isa["type"] + ":"
        DISPLAY "  Description: " + isa["description"]
        DISPLAY "  Key Characteristics:"
        FOR each char IN isa["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Examples: " + join(isa["examples"], ", ")
        DISPLAY "  Advantages:"
        FOR each adv IN isa["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN isa["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
    ENDFOR
    
    // Instruction Formats
    DISPLAY "\n=== INSTRUCTION FORMATS ==="
    
    SET instruction_formats = [
        {
            format: "R-Type (Register)",
            description: "Operations between registers",
            fields: ["Opcode (6 bits)", "Rs (5 bits)", "Rt (5 bits)", "Rd (5 bits)", "Shamt (5 bits)", "Function (6 bits)"],
            example: "ADD R1, R2, R3  // R1 = R2 + R3",
            use_cases: ["Arithmetic operations", "Logical operations", "Shift operations"]
        },
        {
            format: "I-Type (Immediate)",
            description: "Operations with immediate values",
            fields: ["Opcode (6 bits)", "Rs (5 bits)", "Rt (5 bits)", "Immediate (16 bits)"],
            example: "ADDI R1, R2, 100  // R1 = R2 + 100",
            use_cases: ["Load/store operations", "Branch instructions", "Immediate arithmetic"]
        },
        {
            format: "J-Type (Jump)",
            description: "Jump and call instructions",
            fields: ["Opcode (6 bits)", "Address (26 bits)"],
            example: "J 0x400000  // Jump to address 0x400000",
            use_cases: ["Unconditional jumps", "Function calls", "Long-distance branches"]
        }
    ]
    
    DISPLAY "Common Instruction Formats (MIPS Example):"
    FOR each format IN instruction_formats
        DISPLAY "\n" + format["format"] + ":"
        DISPLAY "  Description: " + format["description"]
        DISPLAY "  Fields: " + join(format["fields"], ", ")
        DISPLAY "  Example: " + format["example"]
        DISPLAY "  Use Cases:"
        FOR each use_case IN format["use_cases"]
            DISPLAY "    • " + use_case
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Memory Hierarchy and Storage Systems</h2>
    
    <h3>Memory Hierarchy Design</h3>
    <pre><code>BEGIN Memory_Hierarchy
    DISPLAY "=== MEMORY HIERARCHY PRINCIPLES ==="
    DISPLAY "Organized in levels from fastest/smallest to slowest/largest"
    
    // Memory Hierarchy Levels
    SET memory_levels = [
        {
            level: "CPU Registers",
            capacity: "32-128 registers × 32/64 bits",
            access_time: "0.1-0.5 ns",
            cost_per_bit: "Very High",
            technology: "SRAM (Static RAM)",
            characteristics: [
                "Fastest access time",
                "Directly accessible by CPU",
                "Limited capacity",
                "No cache misses",
                "Compiler-managed"
            ],
            typical_uses: ["Operands for current instruction", "Intermediate results", "Address calculations"]
        },
        {
            level: "L1 Cache",
            capacity: "16-64 KB per core",
            access_time: "1-2 ns",
            cost_per_bit: "High",
            technology: "SRAM",
            characteristics: [
                "Split instruction/data caches",
                "Highest cache priority",
                "Direct CPU connection",
                "Hardware-managed",
                "Write-through or write-back"
            ],
            typical_uses: ["Recently used instructions", "Frequently accessed data", "Hot code paths"]
        },
        {
            level: "L2 Cache",
            capacity: "256 KB - 2 MB per core",
            access_time: "3-10 ns",
            cost_per_bit: "Medium-High",
            technology: "SRAM",
            characteristics: [
                "Unified instruction/data cache",
                "Larger than L1",
                "May be shared between cores",
                "Inclusive or exclusive of L1",
                "More associative than L1"
            ],
            typical_uses: ["L1 cache overflow", "Shared data between cores", "Medium-term storage"]
        },
        {
            level: "L3 Cache",
            capacity: "4-32 MB shared",
            access_time: "10-30 ns",
            cost_per_bit: "Medium",
            technology: "SRAM",
            characteristics: [
                "Shared among all cores",
                "Last level cache (LLC)",
                "Highly associative",
                "Smart replacement policies",
                "Cache coherency point"
            ],
            typical_uses: ["Inter-core data sharing", "Large working sets", "Reduced memory traffic"]
        },
        {
            level: "Main Memory (RAM)",
            capacity: "4-128+ GB",
            access_time: "50-100 ns",
            cost_per_bit: "Low-Medium",
            technology: "DRAM (Dynamic RAM)",
            characteristics: [
                "Volatile storage",
                "Large capacity",
                "Sequential access optimization",
                "Refresh required",
                "Multiple channels/ranks"
            ],
            typical_uses: ["Program code and data", "Operating system", "Application working sets"]
        },
        {
            level: "Secondary Storage",
            capacity: "256 GB - 10+ TB",
            access_time: "0.1-10 ms",
            cost_per_bit: "Low",
            technology: "SSD/HDD",
            characteristics: [
                "Non-volatile storage",
                "Very large capacity",
                "Block-based access",
                "Wear leveling (SSD)",
                "Mechanical delays (HDD)"
            ],
            typical_uses: ["File systems", "Virtual memory", "Long-term storage", "Backup and archival"]
        }
    ]
    
    DISPLAY "Memory Hierarchy Levels:"
    FOR each level IN memory_levels
        DISPLAY "\n" + level["level"] + ":"
        DISPLAY "  Capacity: " + level["capacity"]
        DISPLAY "  Access Time: " + level["access_time"]
        DISPLAY "  Cost per Bit: " + level["cost_per_bit"]
        DISPLAY "  Technology: " + level["technology"]
        DISPLAY "  Characteristics:"
        FOR each char IN level["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Typical Uses:"
        FOR each use IN level["typical_uses"]
            DISPLAY "    ✓ " + use
        ENDFOR
    ENDFOR
    
    // Cache Design Principles
    DISPLAY "\n=== CACHE DESIGN PRINCIPLES ==="
    
    FUNCTION demonstrate_cache_concepts()
        DISPLAY "Cache Performance Factors:"
        
        SET cache_factors = [
            {
                factor: "Temporal Locality",
                description: "Recently accessed data is likely to be accessed again soon",
                example: "Loop variables, frequently called functions",
                cache_strategy: "Keep recently used data in cache"
            },
            {
                factor: "Spatial Locality",
                description: "Data near recently accessed data is likely to be accessed",
                example: "Array elements, sequential code execution",
                cache_strategy: "Fetch entire cache lines (blocks)"
            },
            {
                factor: "Cache Size",
                description: "Larger caches can hold more data but are slower",
                example: "L1: 32KB fast, L3: 16MB slower",
                cache_strategy: "Balance size vs. speed in hierarchy"
            },
            {
                factor: "Associativity",
                description: "How many cache locations can hold a memory block",
                example: "Direct-mapped, 2-way, 4-way, fully associative",
                cache_strategy: "Higher associativity reduces conflicts"
            },
            {
                factor: "Block Size",
                description: "Amount of data transferred on cache miss",
                example: "32, 64, 128 bytes per cache line",
                cache_strategy: "Larger blocks exploit spatial locality"
            }
        ]
        
        FOR each factor IN cache_factors
            DISPLAY "\n" + factor["factor"] + ":"
            DISPLAY "  Description: " + factor["description"]
            DISPLAY "  Example: " + factor["example"]
            DISPLAY "  Cache Strategy: " + factor["cache_strategy"]
        ENDFOR
        
        // Cache Performance Metrics
        DISPLAY "\n=== CACHE PERFORMANCE METRICS ==="
        
        SET performance_example = {
            cache_hits: 950,
            cache_misses: 50,
            total_accesses: 1000,
            hit_time: 2,  // nanoseconds
            miss_penalty: 100  // nanoseconds
        }
        
        SET hit_rate = performance_example["cache_hits"] / performance_example["total_accesses"]
        SET miss_rate = performance_example["cache_misses"] / performance_example["total_accesses"]
        SET average_access_time = (hit_rate * performance_example["hit_time"]) + (miss_rate * performance_example["miss_penalty"])
        
        DISPLAY "Performance Calculation Example:"
        DISPLAY "  Cache Hits: " + performance_example["cache_hits"]
        DISPLAY "  Cache Misses: " + performance_example["cache_misses"]
        DISPLAY "  Total Accesses: " + performance_example["total_accesses"]
        DISPLAY "  Hit Rate: " + (hit_rate * 100) + "%"
        DISPLAY "  Miss Rate: " + (miss_rate * 100) + "%"
        DISPLAY "  Hit Time: " + performance_example["hit_time"] + " ns"
        DISPLAY "  Miss Penalty: " + performance_example["miss_penalty"] + " ns"
        DISPLAY "  Average Access Time: " + average_access_time + " ns"
        
        DISPLAY "\nKey Insight: Even a small miss rate significantly impacts performance!"
        DISPLAY "With 95% hit rate: 2ns + 5% × 100ns = 7ns average"
        DISPLAY "With 99% hit rate: 2ns + 1% × 100ns = 3ns average"
    END FUNCTION
    
    CALL demonstrate_cache_concepts()
END</code></pre>
    
    <h2>Performance Analysis and Optimization</h2>
    
    <h3>System Performance Metrics</h3>
    <pre><code>BEGIN Performance_Analysis
    DISPLAY "=== COMPUTER SYSTEM PERFORMANCE METRICS ==="
    
    // Key Performance Indicators
    SET performance_metrics = [
        {
            metric: "Throughput",
            description: "Number of tasks completed per unit time",
            units: ["Instructions per second (IPS)", "Transactions per second (TPS)", "Operations per second"],
            measurement_methods: ["Benchmark suites", "Workload analysis", "Performance counters"],
            optimization_strategies: ["Parallel processing", "Pipeline optimization", "Resource utilization"]
        },
        {
            metric: "Latency",
            description: "Time required to complete a single task",
            units: ["Seconds", "Clock cycles", "Nanoseconds"],
            measurement_methods: ["Timing analysis", "Critical path analysis", "Profiling tools"],
            optimization_strategies: ["Reduce dependencies", "Faster components", "Caching strategies"]
        },
        {
            metric: "CPU Utilization",
            description: "Percentage of time CPU is actively executing instructions",
            units: ["Percentage (%)", "Utilization ratio"],
            measurement_methods: ["System monitors", "Performance counters", "Sampling techniques"],
            optimization_strategies: ["Load balancing", "Efficient algorithms", "Reduce idle time"]
        },
        {
            metric: "Memory Bandwidth",
            description: "Rate of data transfer between memory and processor",
            units: ["Bytes per second (B/s)", "Gigabytes per second (GB/s)"],
            measurement_methods: ["Memory benchmarks", "Hardware counters", "Bandwidth tests"],
            optimization_strategies: ["Multiple memory channels", "Cache optimization", "Data locality"]
        },
        {
            metric: "Power Consumption",
            description: "Electrical power used by the system",
            units: ["Watts (W)", "Joules per operation (J/op)"],
            measurement_methods: ["Power meters", "Built-in sensors", "Energy profiling"],
            optimization_strategies: ["Dynamic voltage scaling", "Clock gating", "Efficient algorithms"]
        }
    ]
    
    DISPLAY "System Performance Metrics:"
    FOR each metric IN performance_metrics
        DISPLAY "\n" + metric["metric"] + ":"
        DISPLAY "  Description: " + metric["description"]
        DISPLAY "  Units: " + join(metric["units"], ", ")
        DISPLAY "  Measurement Methods:"
        FOR each method IN metric["measurement_methods"]
            DISPLAY "    • " + method
        ENDFOR
        DISPLAY "  Optimization Strategies:"
        FOR each strategy IN metric["optimization_strategies"]
            DISPLAY "    ✓ " + strategy
        ENDFOR
    ENDFOR
    
    // Performance Analysis Example
    DISPLAY "\n=== PERFORMANCE ANALYSIS EXAMPLE ==="
    
    FUNCTION analyze_system_performance()
        DISPLAY "Comparing Two System Configurations:"
        
        SET system_a = {
            name: "System A - High Clock Speed",
            cpu_frequency: 4.0,  // GHz
            cores: 4,
            cache_l3: 8,  // MB
            memory_speed: 2400,  // MHz
            memory_channels: 2,
            power_consumption: 95  // Watts
        }
        
        SET system_b = {
            name: "System B - More Cores",
            cpu_frequency: 2.5,  // GHz
            cores: 8,
            cache_l3: 16,  // MB
            memory_speed: 3200,  // MHz
            memory_channels: 4,
            power_consumption: 85  // Watts
        }
        
        DISPLAY "\n" + system_a["name"] + ":"
        DISPLAY "  CPU Frequency: " + system_a["cpu_frequency"] + " GHz"
        DISPLAY "  Cores: " + system_a["cores"]
        DISPLAY "  L3 Cache: " + system_a["cache_l3"] + " MB"
        DISPLAY "  Memory: " + system_a["memory_speed"] + " MHz, " + system_a["memory_channels"] + " channels"
        DISPLAY "  Power: " + system_a["power_consumption"] + " W"
        
        DISPLAY "\n" + system_b["name"] + ":"
        DISPLAY "  CPU Frequency: " + system_b["cpu_frequency"] + " GHz"
        DISPLAY "  Cores: " + system_b["cores"]
        DISPLAY "  L3 Cache: " + system_b["cache_l3"] + " MB"
        DISPLAY "  Memory: " + system_b["memory_speed"] + " MHz, " + system_b["memory_channels"] + " channels"
        DISPLAY "  Power: " + system_b["power_consumption"] + " W"
        
        // Performance Analysis
        DISPLAY "\n=== PERFORMANCE COMPARISON ==="
        
        SET workload_scenarios = [
            {
                workload: "Single-threaded CPU-intensive",
                system_a_performance: "Excellent (high frequency advantage)",
                system_b_performance: "Good (limited by single-thread performance)",
                winner: "System A",
                reason: "Single-threaded workloads benefit from higher clock speeds"
            },
            {
                workload: "Multi-threaded parallel processing",
                system_a_performance: "Good (4 cores fully utilized)",
                system_b_performance: "Excellent (8 cores provide more parallelism)",
                winner: "System B",
                reason: "More cores enable better parallel task execution"
            },
            {
                workload: "Memory-intensive applications",
                system_a_performance: "Moderate (limited memory bandwidth)",
                system_b_performance: "Excellent (4 memory channels, faster RAM)",
                winner: "System B",
                reason: "Higher memory bandwidth and larger cache"
            },
            {
                workload: "Power-constrained environments",
                system_a_performance: "Good performance but higher power",
                system_b_performance: "Better performance per watt",
                winner: "System B",
                reason: "Lower power consumption with competitive performance"
            }
        ]
        
        FOR each scenario IN workload_scenarios
            DISPLAY "\n" + scenario["workload"] + ":"
            DISPLAY "  System A: " + scenario["system_a_performance"]
            DISPLAY "  System B: " + scenario["system_b_performance"]
            DISPLAY "  Winner: " + scenario["winner"]
            DISPLAY "  Reason: " + scenario["reason"]
        ENDFOR
        
        DISPLAY "\n=== KEY INSIGHTS ==="
        DISPLAY "• No single 'best' system - performance depends on workload"
        DISPLAY "• High frequency benefits single-threaded performance"
        DISPLAY "• More cores enable better parallel processing"
        DISPLAY "• Memory bandwidth can be a bottleneck"
        DISPLAY "• Power efficiency is increasingly important"
        DISPLAY "• Cache size affects performance for large working sets"
    END FUNCTION
    
    CALL analyze_system_performance()
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "cpu-simulator",
      title: "CPU Instruction Execution Simulator",
      description: "Step through the fetch-decode-execute cycle and see how instructions are processed.",
      features: [
        "Visual representation of CPU components",
        "Step-by-step instruction execution",
        "Register and memory state tracking",
        "Pipeline visualization",
        "Performance counter simulation"
      ]
    },
    {
      type: "cache-performance-analyzer",
      title: "Cache Performance Laboratory",
      description: "Experiment with different cache configurations and analyze their impact on performance.",
      parameters: [
        "Cache size (KB)",
        "Associativity (1, 2, 4, 8-way)",
        "Block size (bytes)",
        "Replacement policy (LRU, FIFO, Random)",
        "Access pattern (sequential, random, strided)"
      ]
    },
    {
      type: "architecture-comparison-tool",
      title: "Computer Architecture Comparison",
      description: "Compare different architectural approaches and their trade-offs.",
      architectures: [
        "CISC vs RISC",
        "Superscalar vs VLIW",
        "Single-core vs Multi-core",
        "Von Neumann vs Harvard"
      ]
    },
    {
      type: "performance-calculator",
      title: "System Performance Calculator",
      description: "Calculate various performance metrics and analyze system bottlenecks.",
      calculations: [
        "CPU utilization",
        "Memory bandwidth",
        "Cache hit/miss ratios",
        "Instructions per second",
        "Amdahl's Law speedup"
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Evolution of Computer Architecture",
      content: `
        <p>Computer architecture has evolved dramatically since the first electronic computers:</p>
        
        <h4>First Generation (1940s-1950s): Vacuum Tubes</h4>
        <p>Early computers like ENIAC used vacuum tubes for switching and amplification. These machines were enormous, consumed massive amounts of power, and were prone to failures.</p>
        
        <h4>Second Generation (1950s-1960s): Transistors</h4>
        <p>The invention of the transistor revolutionized computing, making computers smaller, more reliable, and more efficient. This era saw the development of high-level programming languages.</p>
        
        <h4>Third Generation (1960s-1970s): Integrated Circuits</h4>
        <p>Integrated circuits allowed multiple transistors to be placed on a single chip, leading to minicomputers and the beginning of personal computing.</p>
        
        <h4>Fourth Generation (1970s-present): Microprocessors</h4>
        <p>The Intel 4004, released in 1971, was the first microprocessor. This era has seen exponential growth in processing power, following Moore's Law.</p>
        
        <h4>Modern Era: Multi-core and Specialized Processors</h4>
        <p>As single-core performance improvements slowed, the industry shifted to multi-core processors and specialized chips like GPUs, AI accelerators, and quantum processors.</p>
        
        <h4>Future Directions</h4>
        <p>Emerging technologies include neuromorphic computing, quantum computing, and optical computing, each promising to overcome current limitations in different ways.</p>
      `
    },
    {
      title: "Moore's Law and Its Implications",
      content: `
        <p>Moore's Law, proposed by Intel co-founder Gordon Moore in 1965, observed that the number of transistors on a microchip doubles approximately every two years while the cost of computers is halved.</p>
        
        <h4>Historical Accuracy</h4>
        <p>For decades, Moore's Law held remarkably true, driving the exponential growth in computing power that enabled the digital revolution.</p>
        
        <h4>Physical Limitations</h4>
        <p>As transistors approach atomic scales (current processors use 5nm and 3nm processes), physical limitations become significant:</p>
        <ul>
          <li><strong>Quantum Effects:</strong> At small scales, quantum tunneling causes leakage currents</li>
          <li><strong>Heat Dissipation:</strong> Power density creates thermal management challenges</li>
          <li><strong>Manufacturing Costs:</strong> Advanced fabrication becomes exponentially expensive</li>
        </ul>
        
        <h4>Alternative Approaches</h4>
        <p>As Moore's Law slows, the industry is exploring new directions:</p>
        <ul>
          <li><strong>3D Integration:</strong> Stacking components vertically</li>
          <li><strong>New Materials:</strong> Beyond silicon semiconductors</li>
          <li><strong>Novel Architectures:</strong> Neuromorphic and quantum computing</li>
          <li><strong>Specialized Processors:</strong> AI chips, GPUs, and domain-specific architectures</li>
        </ul>
        
        <h4>Implications for Computing</h4>
        <p>The end of Moore's Law is driving innovation in software optimization, parallel computing, and specialized hardware design.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which component of the CPU is responsible for performing mathematical and logical operations?",
      options: ["Control Unit", "Arithmetic Logic Unit (ALU)", "Register File", "Cache Memory"],
      correct: 1,
      explanation: "The Arithmetic Logic Unit (ALU) is the component that performs mathematical operations (addition, subtraction, etc.) and logical operations (AND, OR, NOT, etc.)."
    },
    {
      type: "scenario-based",
      question: "A program has a cache hit rate of 90% with a hit time of 2ns and a miss penalty of 50ns. Calculate the average memory access time and explain how increasing the cache size might affect performance.",
      sampleAnswer: "Average access time = (0.9 × 2ns) + (0.1 × 50ns) = 1.8ns + 5ns = 6.8ns. Increasing cache size would likely improve hit rate, reducing average access time, but might slightly increase hit time due to larger cache being slower to search.",
      rubric: [
        "Correctly calculates average access time",
        "Shows understanding of hit rate impact",
        "Explains cache size trade-offs",
        "Demonstrates knowledge of cache performance factors"
      ]
    },
    {
      type: "comparison",
      question: "Compare RISC and CISC architectures, explaining their key differences and providing examples of when each would be preferred.",
      sampleAnswer: "RISC uses simple, uniform instructions that are easy to pipeline and optimize, making it ideal for high-performance and low-power applications like mobile devices. CISC uses complex instructions that can perform multiple operations, making it suitable for applications where code density is important and backward compatibility is required, like x86 desktop systems.",
      rubric: [
        "Identifies key characteristics of each architecture",
        "Explains performance and complexity trade-offs",
        "Provides appropriate use case examples",
        "Demonstrates understanding of design philosophy differences"
      ]
    },
    {
      type: "design-analysis",
      question: "Design a memory hierarchy for a high-performance gaming computer, justifying your choices for each level in terms of size, speed, and cost considerations.",
      correctAnswer: "L1: 32KB (fast access for immediate needs), L2: 512KB (balance of size/speed), L3: 16MB (shared among cores), RAM: 32GB DDR4-3200 (large capacity for games), SSD: 1TB NVMe (fast loading), HDD: 2TB (bulk storage). Each level balances cost, capacity, and performance for gaming workloads.",
      explanation: "Gaming requires fast access to textures, models, and code, making a well-designed memory hierarchy crucial for performance."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "CPU Design Challenge",
      description: "Design a simple CPU architecture including instruction set, register file, and execution units. Consider the trade-offs between complexity and performance.",
      difficulty: "hard",
      hints: ["Start with basic operations", "Consider pipeline stages", "Think about data dependencies"]
    },
    {
      title: "Cache Optimization Analysis",
      description: "Given a specific memory access pattern, determine the optimal cache configuration (size, associativity, block size) and calculate the expected performance improvement.",
      difficulty: "medium",
      hints: ["Analyze access patterns", "Consider spatial vs temporal locality", "Calculate miss rates"]
    },
    {
      title: "Performance Bottleneck Investigation",
      description: "Analyze a system performance profile and identify the primary bottlenecks, then propose specific architectural improvements.",
      difficulty: "medium",
      hints: ["Look at utilization metrics", "Check memory bandwidth", "Consider parallelization opportunities"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Pipeline",
      definition: "Technique where multiple instruction phases are overlapped to increase throughput"
    },
    {
      term: "Superscalar",
      definition: "Architecture that can execute multiple instructions simultaneously in a single clock cycle"
    },
    {
      term: "Branch Prediction",
      definition: "Hardware technique to guess which way a conditional branch will go to avoid pipeline stalls"
    },
    {
      term: "Out-of-Order Execution",
      definition: "Technique where instructions are executed as soon as their operands are available, not necessarily in program order"
    },
    {
      term: "Cache Coherency",
      definition: "Protocol ensuring that multiple caches maintain consistent copies of shared data"
    },
    {
      term: "Virtual Memory",
      definition: "Memory management technique that provides an abstraction of storage resources"
    },
    {
      term: "Instruction-Level Parallelism (ILP)",
      definition: "Measure of how many instructions can be executed simultaneously"
    },
    {
      term: "Thermal Design Power (TDP)",
      definition: "Maximum amount of heat a processor is designed to dissipate"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Basic understanding of digital logic and binary number systems",
    "Familiarity with computer programming concepts",
    "Knowledge of basic mathematics and Boolean algebra",
    "Understanding of computer hardware components"
  ],
  
  nextSteps: [
    "Study advanced processor design techniques (pipelining, superscalar)",
    "Learn about parallel computing architectures",
    "Explore specialized processors (GPUs, DSPs, AI accelerators)",
    "Investigate emerging technologies (quantum computing, neuromorphic chips)",
    "Practice with computer architecture simulation tools"
  ]
};