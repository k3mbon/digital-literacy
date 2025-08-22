// Lesson 4.2: Operating Systems - Comprehensive lesson content

export default {
  title: "Operating Systems",
  description: "Understand the role and functions of operating systems, including process management, memory management, file systems, and system security",
  difficulty: "intermediate",
  estimatedTime: "85 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the fundamental role and functions of operating systems",
    "Learn about process and thread management",
    "Explore memory management techniques and virtual memory",
    "Understand file systems and storage management",
    "Analyze system security and protection mechanisms"
  ],
  
  // Main lesson content
  content: `
    <h2>Introduction to Operating Systems</h2>
    <p>An <strong>Operating System (OS)</strong> is system software that manages computer hardware and software resources and provides common services for computer programs. It acts as an intermediary between users and the computer hardware.</p>
    
    <p>The operating system serves several critical functions:</p>
    <ul>
      <li><strong>Resource Management:</strong> Efficiently allocates CPU time, memory, and I/O devices</li>
      <li><strong>Process Management:</strong> Creates, schedules, and terminates processes</li>
      <li><strong>Memory Management:</strong> Manages system memory and virtual memory</li>
      <li><strong>File System Management:</strong> Organizes and controls access to files and directories</li>
      <li><strong>Security and Protection:</strong> Controls access to system resources and data</li>
      <li><strong>User Interface:</strong> Provides interaction mechanisms for users and applications</li>
    </ul>
    
    <h2>Operating System Architecture and Components</h2>
    
    <h3>Kernel Architecture</h3>
    <pre><code>BEGIN Operating_System_Architecture
    DISPLAY "=== OPERATING SYSTEM KERNEL ARCHITECTURE ==="
    DISPLAY "The kernel is the core component that manages system resources and provides services"
    
    // Kernel Types
    SET kernel_types = [
        {
            type: "Monolithic Kernel",
            description: "All OS services run in kernel space with direct access to hardware",
            characteristics: [
                "Single address space for kernel",
                "Direct function calls between components",
                "High performance due to no context switching",
                "All device drivers in kernel space",
                "Large kernel size"
            ],
            advantages: ["Fast system calls", "Efficient communication", "Good performance"],
            disadvantages: ["Less modular", "Kernel crashes affect entire system", "Difficult to maintain"],
            examples: ["Linux", "Unix", "MS-DOS"]
        },
        {
            type: "Microkernel",
            description: "Minimal kernel with most services running in user space",
            characteristics: [
                "Small kernel with basic functions only",
                "Services run as separate processes",
                "Message passing for communication",
                "Device drivers in user space",
                "Modular architecture"
            ],
            advantages: ["High reliability", "Easy to extend", "Better security isolation"],
            disadvantages: ["Performance overhead", "Complex message passing", "More context switches"],
            examples: ["QNX", "Minix", "L4"]
        },
        {
            type: "Hybrid Kernel",
            description: "Combines aspects of monolithic and microkernel architectures",
            characteristics: [
                "Core services in kernel space",
                "Some services in user space",
                "Selective placement of components",
                "Balance between performance and modularity",
                "Configurable architecture"
            ],
            advantages: ["Balanced performance", "Good modularity", "Flexible design"],
            disadvantages: ["Complex design", "Potential inconsistencies", "Design trade-offs"],
            examples: ["Windows NT", "macOS", "BeOS"]
        }
    ]
    
    DISPLAY "Kernel Architecture Types:"
    FOR each kernel IN kernel_types
        DISPLAY "\n" + kernel["type"] + ":"
        DISPLAY "  Description: " + kernel["description"]
        DISPLAY "  Key Characteristics:"
        FOR each char IN kernel["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN kernel["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN kernel["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Examples: " + join(kernel["examples"], ", ")
    ENDFOR
    
    // OS Components
    DISPLAY "\n=== CORE OPERATING SYSTEM COMPONENTS ==="
    
    SET os_components = [
        {
            component: "Process Manager",
            description: "Manages process creation, scheduling, and termination",
            responsibilities: [
                "Process creation and destruction",
                "Process scheduling and context switching",
                "Inter-process communication (IPC)",
                "Process synchronization",
                "Deadlock detection and prevention"
            ],
            key_algorithms: ["Round Robin", "Priority Scheduling", "Shortest Job First", "Multilevel Queue"]
        },
        {
            component: "Memory Manager",
            description: "Controls allocation and deallocation of memory space",
            responsibilities: [
                "Physical memory allocation",
                "Virtual memory management",
                "Memory protection and isolation",
                "Paging and segmentation",
                "Memory compaction and garbage collection"
            ],
            key_algorithms: ["LRU", "FIFO", "Clock Algorithm", "Working Set", "Buddy System"]
        },
        {
            component: "File System Manager",
            description: "Manages files, directories, and storage devices",
            responsibilities: [
                "File creation, deletion, and modification",
                "Directory structure management",
                "File access control and permissions",
                "Storage space allocation",
                "File system integrity and recovery"
            ],
            key_algorithms: ["FAT", "NTFS", "ext4", "ZFS", "Btrfs"]
        },
        {
            component: "I/O Manager",
            description: "Handles input/output operations and device management",
            responsibilities: [
                "Device driver management",
                "I/O request scheduling",
                "Buffer management",
                "Interrupt handling",
                "Device abstraction"
            ],
            key_algorithms: ["FCFS", "SSTF", "SCAN", "C-SCAN", "LOOK"]
        },
        {
            component: "Security Manager",
            description: "Enforces security policies and access control",
            responsibilities: [
                "User authentication and authorization",
                "Access control lists (ACLs)",
                "Audit logging and monitoring",
                "Encryption and key management",
                "Intrusion detection and prevention"
            ],
            key_algorithms: ["RSA", "AES", "SHA", "Kerberos", "OAuth"]
        }
    ]
    
    DISPLAY "Operating System Components:"
    FOR each component IN os_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Key Responsibilities:"
        FOR each resp IN component["responsibilities"]
            DISPLAY "    • " + resp
        ENDFOR
        DISPLAY "  Important Algorithms/Technologies:"
        FOR each alg IN component["key_algorithms"]
            DISPLAY "    ⚡ " + alg
        ENDFOR
    ENDFOR
END</code></pre>
    
    <h2>Process and Thread Management</h2>
    
    <h3>Process Lifecycle and States</h3>
    <pre><code>BEGIN Process_Management
    DISPLAY "=== PROCESS LIFECYCLE AND STATES ==="
    DISPLAY "A process is a program in execution, consisting of code, data, and system resources"
    
    // Process States
    SET process_states = [
        {
            state: "New",
            description: "Process is being created but not yet ready to run",
            activities: ["Memory allocation", "Process control block creation", "Resource initialization"],
            transitions: ["To Ready when initialization complete"]
        },
        {
            state: "Ready",
            description: "Process is prepared to run and waiting for CPU allocation",
            activities: ["Waiting in ready queue", "Available for scheduling", "All resources except CPU available"],
            transitions: ["To Running when scheduled", "To Terminated if killed"]
        },
        {
            state: "Running",
            description: "Process is currently executing on the CPU",
            activities: ["Executing instructions", "Using CPU time slice", "Accessing system resources"],
            transitions: ["To Ready when time slice expires", "To Waiting for I/O", "To Terminated when complete"]
        },
        {
            state: "Waiting (Blocked)",
            description: "Process is waiting for some event to occur (I/O, resource)",
            activities: ["Waiting for I/O completion", "Waiting for resource availability", "Waiting for signal/event"],
            transitions: ["To Ready when event occurs", "To Terminated if killed"]
        },
        {
            state: "Terminated",
            description: "Process has finished execution or been killed",
            activities: ["Resource deallocation", "Process control block cleanup", "Exit status reporting"],
            transitions: ["No further transitions - process ends"]
        }
    ]
    
    DISPLAY "Process State Diagram:"
    DISPLAY "New → Ready → Running → Terminated"
    DISPLAY "         ↑      ↓"
    DISPLAY "      Waiting ←→"
    
    DISPLAY "\nDetailed Process States:"
    FOR each state IN process_states
        DISPLAY "\n" + state["state"] + " State:"
        DISPLAY "  Description: " + state["description"]
        DISPLAY "  Activities:"
        FOR each activity IN state["activities"]
            DISPLAY "    • " + activity
        ENDFOR
        DISPLAY "  Possible Transitions:"
        FOR each transition IN state["transitions"]
            DISPLAY "    → " + transition
        ENDFOR
    ENDFOR
    
    // Process Control Block (PCB)
    DISPLAY "\n=== PROCESS CONTROL BLOCK (PCB) ==="
    DISPLAY "Data structure containing all information about a process"
    
    SET pcb_contents = [
        {
            field: "Process ID (PID)",
            description: "Unique identifier for the process",
            example: "PID: 1234",
            importance: "Essential for process identification and management"
        },
        {
            field: "Process State",
            description: "Current state of the process",
            example: "State: Running",
            importance: "Determines what operations can be performed"
        },
        {
            field: "Program Counter",
            description: "Address of next instruction to execute",
            example: "PC: 0x401000",
            importance: "Critical for resuming execution after context switch"
        },
        {
            field: "CPU Registers",
            description: "Contents of all processor registers",
            example: "R1: 0x1000, R2: 0x2000, ...",
            importance: "Must be saved/restored during context switches"
        },
        {
            field: "Memory Management Info",
            description: "Page tables, segment tables, memory limits",
            example: "Base: 0x100000, Limit: 0x50000",
            importance: "Defines process memory space and protection"
        },
        {
            field: "Scheduling Information",
            description: "Priority, scheduling queue pointers, CPU time used",
            example: "Priority: 5, CPU time: 120ms",
            importance: "Used by scheduler to make scheduling decisions"
        },
        {
            field: "I/O Status Information",
            description: "List of open files, I/O devices allocated",
            example: "Files: [file1.txt, file2.dat]",
            importance: "Tracks resources allocated to process"
        },
        {
            field: "Accounting Information",
            description: "CPU time used, time limits, process start time",
            example: "Start: 10:30:15, CPU: 2.5s",
            importance: "Used for billing, statistics, and resource management"
        }
    ]
    
    DISPLAY "Process Control Block Contents:"
    FOR each field IN pcb_contents
        DISPLAY "\n" + field["field"] + ":"
        DISPLAY "  Description: " + field["description"]
        DISPLAY "  Example: " + field["example"]
        DISPLAY "  Importance: " + field["importance"]
    ENDFOR
    
    // Context Switching
    DISPLAY "\n=== CONTEXT SWITCHING ==="
    DISPLAY "Process of saving and restoring process state when switching between processes"
    
    FUNCTION demonstrate_context_switch()
        DISPLAY "Context Switch Steps:"
        
        SET context_switch_steps = [
            {
                step: 1,
                action: "Save Current Process State",
                details: ["Save CPU registers to PCB", "Save program counter", "Update process state to Ready/Waiting"]
            },
            {
                step: 2,
                action: "Update Process Queues",
                details: ["Move current process to appropriate queue", "Select next process from ready queue", "Update scheduling information"]
            },
            {
                step: 3,
                action: "Load New Process State",
                details: ["Load CPU registers from new process PCB", "Set program counter", "Update memory management unit"]
            },
            {
                step: 4,
                action: "Resume Execution",
                details: ["Update process state to Running", "Start executing new process", "Begin new time slice"]
            }
        ]
        
        FOR each step IN context_switch_steps
            DISPLAY "\nStep " + step["step"] + ": " + step["action"]
            FOR each detail IN step["details"]
                DISPLAY "  • " + detail
            ENDFOR
        ENDFOR
        
        DISPLAY "\nContext Switch Overhead:"
        DISPLAY "• Typical time: 1-10 microseconds"
        DISPLAY "• Factors affecting overhead:"
        DISPLAY "  - Number of registers to save/restore"
        DISPLAY "  - Memory management complexity"
        DISPLAY "  - Cache and TLB invalidation"
        DISPLAY "  - Hardware support for context switching"
    END FUNCTION
    
    CALL demonstrate_context_switch()
END</code></pre>
    
    <h3>CPU Scheduling Algorithms</h3>
    <pre><code>BEGIN CPU_Scheduling
    DISPLAY "=== CPU SCHEDULING ALGORITHMS ==="
    DISPLAY "Methods for determining which process gets CPU time and for how long"
    
    // Scheduling Algorithms
    SET scheduling_algorithms = [
        {
            algorithm: "First-Come, First-Served (FCFS)",
            description: "Processes are executed in the order they arrive",
            characteristics: ["Non-preemptive", "Simple to implement", "Fair in arrival order"],
            advantages: ["Simple and fair", "No starvation", "Low overhead"],
            disadvantages: ["Poor average waiting time", "Convoy effect", "Not suitable for interactive systems"],
            best_for: ["Batch processing systems", "Long-running processes"]
        },
        {
            algorithm: "Shortest Job First (SJF)",
            description: "Process with shortest CPU burst time is executed first",
            characteristics: ["Can be preemptive or non-preemptive", "Optimal for average waiting time", "Requires burst time prediction"],
            advantages: ["Minimum average waiting time", "Good throughput", "Efficient for batch systems"],
            disadvantages: ["Starvation of long processes", "Difficult to predict burst times", "Not practical for interactive systems"],
            best_for: ["Batch systems with known job lengths", "Systems where throughput is priority"]
        },
        {
            algorithm: "Round Robin (RR)",
            description: "Each process gets a fixed time slice in circular order",
            characteristics: ["Preemptive", "Time quantum determines performance", "Fair time sharing"],
            advantages: ["Fair to all processes", "Good for interactive systems", "No starvation"],
            disadvantages: ["Higher context switch overhead", "Performance depends on time quantum", "Poor for I/O bound processes"],
            best_for: ["Interactive systems", "Time-sharing systems", "Multi-user environments"]
        },
        {
            algorithm: "Priority Scheduling",
            description: "Processes are executed based on priority levels",
            characteristics: ["Can be preemptive or non-preemptive", "Higher priority processes execute first", "May use aging to prevent starvation"],
            advantages: ["Important processes get preference", "Flexible priority assignment", "Good for real-time systems"],
            disadvantages: ["Starvation of low-priority processes", "Priority inversion problems", "Complex priority management"],
            best_for: ["Real-time systems", "Systems with varying process importance", "Embedded systems"]
        },
        {
            algorithm: "Multilevel Queue",
            description: "Processes are divided into separate queues with different scheduling algorithms",
            characteristics: ["Multiple priority levels", "Different algorithms per queue", "Fixed queue assignment"],
            advantages: ["Tailored scheduling per process type", "Good separation of concerns", "Efficient for mixed workloads"],
            disadvantages: ["Complex to implement", "Potential starvation between queues", "Fixed queue assignment limitations"],
            best_for: ["Systems with distinct process types", "Mixed interactive and batch workloads"]
        },
        {
            algorithm: "Multilevel Feedback Queue",
            description: "Processes can move between queues based on behavior",
            characteristics: ["Dynamic queue assignment", "Adaptive to process behavior", "Multiple feedback mechanisms"],
            advantages: ["Adapts to process behavior", "Good for unknown process characteristics", "Balances response time and throughput"],
            disadvantages: ["Most complex to implement", "Many parameters to tune", "Overhead of queue management"],
            best_for: ["General-purpose operating systems", "Systems with unknown workload characteristics"]
        }
    ]
    
    DISPLAY "CPU Scheduling Algorithms Comparison:"
    FOR each algorithm IN scheduling_algorithms
        DISPLAY "\n" + algorithm["algorithm"] + ":"
        DISPLAY "  Description: " + algorithm["description"]
        DISPLAY "  Characteristics:"
        FOR each char IN algorithm["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN algorithm["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN algorithm["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Best For:"
        FOR each use IN algorithm["best_for"]
            DISPLAY "    → " + use
        ENDFOR
    ENDFOR
    
    // Scheduling Example
    DISPLAY "\n=== SCHEDULING ALGORITHM COMPARISON EXAMPLE ==="
    
    FUNCTION compare_scheduling_algorithms()
        DISPLAY "Process Set for Comparison:"
        
        SET processes = [
            {process: "P1", arrival_time: 0, burst_time: 8, priority: 3},
            {process: "P2", arrival_time: 1, burst_time: 4, priority: 1},
            {process: "P3", arrival_time: 2, burst_time: 9, priority: 4},
            {process: "P4", arrival_time: 3, burst_time: 5, priority: 2}
        ]
        
        FOR each proc IN processes
            DISPLAY "  " + proc["process"] + ": Arrival=" + proc["arrival_time"] + ", Burst=" + proc["burst_time"] + ", Priority=" + proc["priority"]
        ENDFOR
        
        DISPLAY "\nFCFS Scheduling:"
        DISPLAY "  Execution Order: P1 → P2 → P3 → P4"
        DISPLAY "  Average Waiting Time: 7.0 time units"
        DISPLAY "  Average Turnaround Time: 13.5 time units"
        
        DISPLAY "\nSJF Scheduling:"
        DISPLAY "  Execution Order: P1 → P2 → P4 → P3"
        DISPLAY "  Average Waiting Time: 4.0 time units"
        DISPLAY "  Average Turnaround Time: 10.5 time units"
        
        DISPLAY "\nRound Robin (Time Quantum = 3):"
        DISPLAY "  Execution Pattern: P1(3) → P2(3) → P3(3) → P4(3) → P1(3) → P2(1) → P3(3) → P4(2) → P1(2) → P3(3)"
        DISPLAY "  Average Waiting Time: 5.75 time units"
        DISPLAY "  Average Turnaround Time: 12.25 time units"
        
        DISPLAY "\nPriority Scheduling (Lower number = Higher priority):"
        DISPLAY "  Execution Order: P2 → P4 → P1 → P3"
        DISPLAY "  Average Waiting Time: 4.5 time units"
        DISPLAY "  Average Turnaround Time: 11.0 time units"
        
        DISPLAY "\nKey Insights:"
        DISPLAY "• SJF provides best average waiting time"
        DISPLAY "• FCFS is simplest but may have poor performance"
        DISPLAY "• Round Robin provides fairness but higher overhead"
        DISPLAY "• Priority scheduling balances importance and efficiency"
    END FUNCTION
    
    CALL compare_scheduling_algorithms()
END</code></pre>
    
    <h2>Memory Management</h2>
    
    <h3>Memory Allocation and Virtual Memory</h3>
    <pre><code>BEGIN Memory_Management
    DISPLAY "=== MEMORY MANAGEMENT FUNDAMENTALS ==="
    DISPLAY "Managing physical and virtual memory to provide efficient and secure memory access"
    
    // Memory Management Techniques
    SET memory_techniques = [
        {
            technique: "Contiguous Memory Allocation",
            description: "Processes are allocated contiguous blocks of physical memory",
            methods: [
                "Fixed Partitioning: Memory divided into fixed-size partitions",
                "Dynamic Partitioning: Variable-size partitions created as needed",
                "Buddy System: Power-of-2 sized blocks for efficient allocation"
            ],
            advantages: ["Simple implementation", "Fast access", "No address translation overhead"],
            disadvantages: ["External fragmentation", "Internal fragmentation", "Limited flexibility"],
            fragmentation_issues: ["External: Unusable gaps between allocated blocks", "Internal: Wasted space within allocated blocks"]
        },
        {
            technique: "Paging",
            description: "Physical memory divided into fixed-size frames, logical memory into pages",
            methods: [
                "Page Tables: Map logical pages to physical frames",
                "Translation Lookaside Buffer (TLB): Cache for page translations",
                "Multi-level Paging: Hierarchical page tables for large address spaces"
            ],
            advantages: ["No external fragmentation", "Efficient memory utilization", "Easy swapping"],
            disadvantages: ["Internal fragmentation in last page", "Memory overhead for page tables", "Address translation overhead"],
            fragmentation_issues: ["Only internal fragmentation in last page of each process"]
        },
        {
            technique: "Segmentation",
            description: "Memory divided into variable-size segments based on logical divisions",
            methods: [
                "Segment Tables: Map segment numbers to base addresses and limits",
                "Segment Registers: Hardware support for segment addressing",
                "Protection Bits: Access control for each segment"
            ],
            advantages: ["Logical organization", "Easy sharing and protection", "Dynamic growth"],
            disadvantages: ["External fragmentation", "Complex memory management", "Segment size limitations"],
            fragmentation_issues: ["External fragmentation when segments are deallocated"]
        },
        {
            technique: "Paged Segmentation",
            description: "Combines benefits of both paging and segmentation",
            methods: [
                "Segments divided into pages", 
                "Two-level address translation",
                "Segment and page tables combined"
            ],
            advantages: ["Logical organization with no external fragmentation", "Flexible memory management", "Good protection mechanisms"],
            disadvantages: ["Complex implementation", "Higher address translation overhead", "Multiple table lookups required"],
            fragmentation_issues: ["Only internal fragmentation in last page of each segment"]
        }
    ]
    
    DISPLAY "Memory Management Techniques:"
    FOR each technique IN memory_techniques
        DISPLAY "\n" + technique["technique"] + ":"
        DISPLAY "  Description: " + technique["description"]
        DISPLAY "  Implementation Methods:"
        FOR each method IN technique["methods"]
            DISPLAY "    • " + method
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN technique["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN technique["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Fragmentation Issues:"
        FOR each frag IN technique["fragmentation_issues"]
            DISPLAY "    ⚠ " + frag
        ENDFOR
    ENDFOR
    
    // Virtual Memory
    DISPLAY "\n=== VIRTUAL MEMORY SYSTEM ==="
    DISPLAY "Technique that allows execution of processes that are not completely in physical memory"
    
    SET virtual_memory_concepts = [
        {
            concept: "Virtual Address Space",
            description: "Logical view of memory as seen by each process",
            details: [
                "Each process has its own virtual address space",
                "Virtual addresses translated to physical addresses",
                "Address space can be larger than physical memory",
                "Provides memory protection and isolation"
            ],
            benefits: ["Process isolation", "Memory protection", "Simplified programming model"]
        },
        {
            concept: "Demand Paging",
            description: "Pages are loaded into memory only when accessed",
            details: [
                "Pages initially marked as not present",
                "Page fault occurs on first access",
                "Operating system loads page from storage",
                "Execution continues after page is loaded"
            ],
            benefits: ["Reduced memory usage", "Faster program startup", "Support for large programs"]
        },
        {
            concept: "Page Replacement",
            description: "Algorithm to select which page to remove when memory is full",
            details: [
                "Triggered when no free frames available",
                "Victim page selected based on algorithm",
                "Dirty pages written to storage before replacement",
                "Page table updated to reflect changes"
            ],
            benefits: ["Efficient memory utilization", "Support for multiprogramming", "Automatic memory management"]
        },
        {
            concept: "Thrashing",
            description: "Excessive paging activity that degrades system performance",
            details: [
                "Occurs when working set exceeds available memory",
                "System spends more time paging than executing",
                "CPU utilization drops dramatically",
                "Response time increases significantly"
            ],
            benefits: ["Understanding helps in system tuning", "Indicates need for more memory", "Guides multiprogramming level"]
        }
    ]
    
    DISPLAY "Virtual Memory Key Concepts:"
    FOR each concept IN virtual_memory_concepts
        DISPLAY "\n" + concept["concept"] + ":"
        DISPLAY "  Description: " + concept["description"]
        DISPLAY "  Key Details:"
        FOR each detail IN concept["details"]
            DISPLAY "    • " + detail
        ENDFOR
        DISPLAY "  Benefits:"
        FOR each benefit IN concept["benefits"]
            DISPLAY "    ✓ " + benefit
        ENDFOR
    ENDFOR
    
    // Page Replacement Algorithms
    DISPLAY "\n=== PAGE REPLACEMENT ALGORITHMS ==="
    
    SET replacement_algorithms = [
        {
            algorithm: "First-In, First-Out (FIFO)",
            description: "Replace the oldest page in memory",
            implementation: "Queue of pages in order of arrival",
            advantages: ["Simple to implement", "Low overhead", "Fair in temporal order"],
            disadvantages: ["May replace frequently used pages", "Belady's anomaly possible", "Poor performance"],
            complexity: "O(1) for replacement decision"
        },
        {
            algorithm: "Least Recently Used (LRU)",
            description: "Replace the page that has not been used for the longest time",
            implementation: "Stack or counter-based tracking of page usage",
            advantages: ["Good approximation of optimal", "Considers recent usage patterns", "Generally good performance"],
            disadvantages: ["High implementation overhead", "Requires hardware support", "Complex bookkeeping"],
            complexity: "O(1) with hardware support, O(n) with software"
        },
        {
            algorithm: "Optimal (OPT)",
            description: "Replace the page that will not be used for the longest time in future",
            implementation: "Requires knowledge of future page references",
            advantages: ["Theoretical minimum page faults", "Benchmark for other algorithms", "Optimal performance"],
            disadvantages: ["Impossible to implement in practice", "Requires future knowledge", "Only theoretical value"],
            complexity: "O(n) for each replacement (theoretical)"
        },
        {
            algorithm: "Clock (Second Chance)",
            description: "Circular list with reference bit, approximates LRU",
            implementation: "Circular buffer with reference bits and clock pointer",
            advantages: ["Good approximation of LRU", "Lower overhead than LRU", "Hardware support available"],
            disadvantages: ["May degrade to FIFO in worst case", "Requires reference bit support", "Multiple scans possible"],
            complexity: "O(n) in worst case, typically much better"
        }
    ]
    
    DISPLAY "Page Replacement Algorithms:"
    FOR each algorithm IN replacement_algorithms
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
        DISPLAY "  Complexity: " + algorithm["complexity"]
    ENDFOR
END</code></pre>
    
    <h2>File Systems and Storage Management</h2>
    
    <h3>File System Architecture</h3>
    <pre><code>BEGIN File_System_Management
    DISPLAY "=== FILE SYSTEM ARCHITECTURE ==="
    DISPLAY "Organizing and managing files and directories on storage devices"
    
    // File System Components
    SET filesystem_components = [
        {
            component: "File Allocation Table (FAT)",
            description: "Simple file system using a table to track file clusters",
            characteristics: [
                "Centralized allocation table",
                "Fixed cluster sizes",
                "Simple directory structure",
                "Limited file size and volume size",
                "No built-in security features"
            ],
            advantages: ["Simple implementation", "Wide compatibility", "Low overhead"],
            disadvantages: ["Fragmentation issues", "Limited scalability", "No security features"],
            use_cases: ["Removable media", "Embedded systems", "Legacy compatibility"]
        },
        {
            component: "New Technology File System (NTFS)",
            description: "Advanced file system with security, compression, and large file support",
            characteristics: [
                "Master File Table (MFT) for metadata",
                "Variable cluster sizes",
                "Hierarchical directory structure",
                "Large file and volume support",
                "Built-in security and encryption"
            ],
            advantages: ["Advanced features", "Good performance", "Reliability features"],
            disadvantages: ["Complex implementation", "Higher overhead", "Windows-specific"],
            use_cases: ["Windows systems", "Enterprise environments", "Large storage volumes"]
        },
        {
            component: "Extended File System (ext4)",
            description: "Linux file system with journaling and large file support",
            characteristics: [
                "Inode-based file allocation",
                "Journaling for reliability",
                "Extent-based allocation",
                "Large file and volume support",
                "POSIX permissions"
            ],
            advantages: ["Reliable journaling", "Good performance", "Mature and stable"],
            disadvantages: ["Linux-specific", "Limited Windows support", "No built-in compression"],
            use_cases: ["Linux systems", "Server environments", "General-purpose computing"]
        },
        {
            component: "Z File System (ZFS)",
            description: "Advanced file system with built-in volume management and data integrity",
            characteristics: [
                "Copy-on-write semantics",
                "Built-in RAID and volume management",
                "Data integrity verification",
                "Snapshots and cloning",
                "Compression and deduplication"
            ],
            advantages: ["Excellent data integrity", "Advanced features", "Scalability"],
            disadvantages: ["High memory usage", "Complex administration", "Limited OS support"],
            use_cases: ["Enterprise storage", "Data centers", "High-reliability systems"]
        }
    ]
    
    DISPLAY "File System Types Comparison:"
    FOR each component IN filesystem_components
        DISPLAY "\n" + component["component"] + ":"
        DISPLAY "  Description: " + component["description"]
        DISPLAY "  Key Characteristics:"
        FOR each char IN component["characteristics"]
            DISPLAY "    • " + char
        ENDFOR
        DISPLAY "  Advantages:"
        FOR each adv IN component["advantages"]
            DISPLAY "    ✓ " + adv
        ENDFOR
        DISPLAY "  Disadvantages:"
        FOR each dis IN component["disadvantages"]
            DISPLAY "    ✗ " + dis
        ENDFOR
        DISPLAY "  Typical Use Cases:"
        FOR each use IN component["use_cases"]
            DISPLAY "    → " + use
        ENDFOR
    ENDFOR
    
    // File Operations and Management
    DISPLAY "\n=== FILE OPERATIONS AND MANAGEMENT ==="
    
    SET file_operations = [
        {
            operation: "File Creation",
            description: "Creating new files in the file system",
            steps: ["Allocate directory entry", "Initialize file metadata", "Allocate initial storage blocks", "Set file permissions"],
            considerations: ["Naming conventions", "Permission inheritance", "Storage allocation strategy"]
        },
        {
            operation: "File Access",
            description: "Reading from and writing to existing files",
            steps: ["Locate file in directory", "Check access permissions", "Load file metadata", "Perform I/O operations"],
            considerations: ["Buffering strategies", "Concurrent access control", "Performance optimization"]
        },
        {
            operation: "File Deletion",
            description: "Removing files from the file system",
            steps: ["Check deletion permissions", "Remove directory entry", "Deallocate storage blocks", "Update free space information"],
            considerations: ["Data recovery implications", "Secure deletion requirements", "Reference counting"]
        },
        {
            operation: "Directory Management",
            description: "Creating and managing directory structures",
            steps: ["Create directory entry", "Initialize directory metadata", "Set up parent/child relationships", "Manage directory contents"],
            considerations: ["Directory traversal efficiency", "Naming conflicts", "Circular reference prevention"]
        }
    ]
    
    DISPLAY "Core File Operations:"
    FOR each operation IN file_operations
        DISPLAY "\n" + operation["operation"] + ":"
        DISPLAY "  Description: " + operation["description"]
        DISPLAY "  Implementation Steps:"
        FOR each step IN operation["steps"]
            DISPLAY "    1. " + step
        ENDFOR
        DISPLAY "  Key Considerations:"
        FOR each consideration IN operation["considerations"]
            DISPLAY "    • " + consideration
        ENDFOR
    ENDFOR
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "process-scheduler-simulator",
      title: "CPU Scheduling Algorithm Simulator",
      description: "Compare different scheduling algorithms with customizable process sets.",
      features: [
        "Multiple scheduling algorithms (FCFS, SJF, RR, Priority)",
        "Customizable process arrival times and burst times",
        "Gantt chart visualization",
        "Performance metrics calculation",
        "Interactive parameter adjustment"
      ]
    },
    {
      type: "memory-management-lab",
      title: "Virtual Memory Management Laboratory",
      description: "Experiment with paging, page replacement algorithms, and memory allocation.",
      parameters: [
        "Physical memory size",
        "Page size",
        "Number of processes",
        "Page replacement algorithm",
        "Memory access patterns"
      ]
    },
    {
      type: "file-system-explorer",
      title: "File System Structure Explorer",
      description: "Visualize different file system structures and operations.",
      filesystems: [
        "FAT32 structure",
        "NTFS Master File Table",
        "ext4 inode system",
        "Directory tree navigation"
      ]
    },
    {
      type: "deadlock-detector",
      title: "Deadlock Detection and Prevention",
      description: "Analyze resource allocation scenarios for potential deadlocks.",
      features: [
        "Resource allocation graph visualization",
        "Deadlock detection algorithms",
        "Prevention strategy simulation",
        "Banker's algorithm implementation"
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Evolution of Operating Systems",
      content: `
        <p>Operating systems have evolved significantly since the early days of computing:</p>
        
        <h4>Batch Processing Systems (1950s-1960s)</h4>
        <p>Early systems processed jobs in batches without user interaction. Users submitted jobs on punch cards, and the system processed them sequentially.</p>
        
        <h4>Time-Sharing Systems (1960s-1970s)</h4>
        <p>Multiple users could interact with the computer simultaneously through terminals. This required sophisticated scheduling and memory management.</p>
        
        <h4>Personal Computer Operating Systems (1980s-1990s)</h4>
        <p>Systems like MS-DOS and early Windows focused on single-user environments with graphical interfaces becoming increasingly important.</p>
        
        <h4>Network and Distributed Systems (1990s-2000s)</h4>
        <p>Operating systems began incorporating network capabilities as standard features, enabling distributed computing and resource sharing.</p>
        
        <h4>Mobile and Cloud Operating Systems (2000s-present)</h4>
        <p>New challenges emerged with mobile devices requiring power-efficient operation and cloud systems needing massive scalability.</p>
        
        <h4>Modern Trends</h4>
        <p>Current developments include containerization, microservices, edge computing, and AI-assisted system management.</p>
      `
    },
    {
      title: "Security in Operating Systems",
      content: `
        <p>Operating system security is crucial for protecting system resources and user data:</p>
        
        <h4>Authentication and Authorization</h4>
        <p>Systems must verify user identity and control access to resources based on permissions and policies.</p>
        
        <h4>Memory Protection</h4>
        <p>Hardware and software mechanisms prevent processes from accessing memory they shouldn't, including:</p>
        <ul>
          <li><strong>Address Space Isolation:</strong> Each process has its own virtual address space</li>
          <li><strong>Privilege Levels:</strong> Kernel mode vs. user mode execution</li>
          <li><strong>Stack Protection:</strong> Preventing buffer overflow attacks</li>
        </ul>
        
        <h4>File System Security</h4>
        <p>Access control mechanisms protect files and directories:</p>
        <ul>
          <li><strong>Discretionary Access Control (DAC):</strong> Owner-controlled permissions</li>
          <li><strong>Mandatory Access Control (MAC):</strong> System-enforced security policies</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Permissions based on user roles</li>
        </ul>
        
        <h4>Network Security</h4>
        <p>Operating systems include firewalls, intrusion detection, and secure communication protocols.</p>
        
        <h4>Emerging Threats</h4>
        <p>Modern systems face challenges from malware, side-channel attacks, and sophisticated persistent threats.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which scheduling algorithm provides the minimum average waiting time for a given set of processes?",
      options: ["First-Come, First-Served (FCFS)", "Round Robin (RR)", "Shortest Job First (SJF)", "Priority Scheduling"],
      correct: 2,
      explanation: "Shortest Job First (SJF) scheduling algorithm provides the minimum average waiting time for a given set of processes, as proven mathematically. However, it requires knowing the burst times in advance."
    },
    {
      type: "scenario-based",
      question: "A system has 4 frames of physical memory and uses the LRU page replacement algorithm. Given the page reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, calculate the number of page faults and explain the replacement decisions.",
      sampleAnswer: "Page faults occur at references: 1, 2, 3, 4 (initial loading), 5 (replaces 3), 3 (replaces 4), 4 (replaces 5). Total: 7 page faults. LRU replaces the page that hasn't been used for the longest time.",
      rubric: [
        "Correctly identifies initial page faults",
        "Accurately tracks LRU replacement decisions",
        "Calculates correct total number of page faults",
        "Explains LRU algorithm logic"
      ]
    },
    {
      type: "comparison",
      question: "Compare monolithic and microkernel architectures, discussing their advantages, disadvantages, and typical use cases.",
      sampleAnswer: "Monolithic kernels run all OS services in kernel space, providing high performance but less modularity and reliability. Microkernels run minimal services in kernel space with most services in user space, offering better reliability and modularity but with performance overhead due to message passing.",
      rubric: [
        "Explains architectural differences clearly",
        "Identifies performance vs. reliability trade-offs",
        "Provides appropriate examples of each type",
        "Discusses practical implications for system design"
      ]
    },
    {
      type: "design-analysis",
      question: "Design a file system for a solid-state drive (SSD) considering wear leveling, performance optimization, and data integrity. Justify your design choices.",
      correctAnswer: "Use log-structured file system with copy-on-write semantics to distribute writes evenly. Implement wear leveling algorithms, use larger block sizes to reduce write amplification, include error correction codes, and optimize for sequential writes while minimizing random writes.",
      explanation: "SSDs have different characteristics than traditional hard drives, requiring specialized file system designs to maximize performance and lifespan."
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Process Synchronization Challenge",
      description: "Implement solutions to classic synchronization problems (Producer-Consumer, Readers-Writers, Dining Philosophers) using semaphores, mutexes, and condition variables.",
      difficulty: "hard",
      hints: ["Consider race conditions", "Avoid deadlock scenarios", "Ensure fairness"]
    },
    {
      title: "Memory Management Optimization",
      description: "Analyze memory access patterns and design an optimal page replacement algorithm for a specific workload, comparing its performance to standard algorithms.",
      difficulty: "medium",
      hints: ["Study access patterns", "Consider locality principles", "Measure performance metrics"]
    },
    {
      title: "File System Performance Analysis",
      description: "Compare the performance of different file systems (FAT32, NTFS, ext4) for various workloads and storage devices, explaining the results.",
      difficulty: "medium",
      hints: ["Consider different I/O patterns", "Measure throughput and latency", "Account for storage device characteristics"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Context Switch",
      definition: "The process of saving and restoring CPU state when switching between processes"
    },
    {
      term: "Thrashing",
      definition: "Excessive paging activity that severely degrades system performance"
    },
    {
      term: "Deadlock",
      definition: "A situation where processes are blocked indefinitely, waiting for resources held by each other"
    },
    {
      term: "Critical Section",
      definition: "A code segment that accesses shared resources and must be executed atomically"
    },
    {
      term: "Page Fault",
      definition: "An interrupt that occurs when a program accesses a page not currently in physical memory"
    },
    {
      term: "Inode",
      definition: "A data structure that stores metadata about a file in Unix-like file systems"
    },
    {
      term: "System Call",
      definition: "An interface that allows user programs to request services from the operating system kernel"
    },
    {
      term: "Race Condition",
      definition: "A situation where the outcome depends on the relative timing of events"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of computer architecture and hardware components",
    "Basic knowledge of programming concepts and data structures",
    "Familiarity with computer systems and software concepts",
    "Understanding of basic algorithms and complexity analysis"
  ],
  
  nextSteps: [
    "Study advanced operating system concepts (distributed systems, real-time systems)",
    "Learn about system programming and kernel development",
    "Explore virtualization and containerization technologies",
    "Investigate operating system security and hardening techniques",
    "Practice with operating system simulation and development tools"
  ]
};