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
    <div className="von-neumann-architecture">
      <div className="architecture-intro">
        <h4>Von Neumann Architecture Model</h4>
        <p>Proposed by John von Neumann in 1945, this model forms the basis of modern computers and defines how computer systems are organized and operate.</p>
      </div>
      
      <div className="architecture-components">
        <h4>Core Components</h4>
        <div className="component-grid">
          <div className="component-item">
            <h5>Central Processing Unit (CPU)</h5>
            <p><strong>Description:</strong> Executes instructions and performs calculations</p>
            <div className="subcomponents">
              <h6>Subcomponents:</h6>
              <ul>
                <li><strong>Arithmetic Logic Unit (ALU):</strong> Performs mathematical and logical operations</li>
                <li><strong>Control Unit (CU):</strong> Manages instruction execution and system control</li>
                <li><strong>Registers:</strong> High-speed temporary storage within the CPU</li>
                <li><strong>Cache:</strong> Fast memory close to the CPU for frequently used data</li>
              </ul>
            </div>
            <div className="functions">
              <h6>Primary Functions:</h6>
              <ul>
                <li>Fetch instructions</li>
                <li>Decode instructions</li>
                <li>Execute operations</li>
                <li>Store results</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Memory (Primary Storage)</h5>
            <p><strong>Description:</strong> Stores programs and data currently being used</p>
            <div className="subcomponents">
              <h6>Subcomponents:</h6>
              <ul>
                <li><strong>RAM (Random Access Memory):</strong> Volatile main memory</li>
                <li><strong>ROM (Read-Only Memory):</strong> Non-volatile firmware storage</li>
                <li><strong>Cache Memory:</strong> High-speed buffer between CPU and RAM</li>
                <li><strong>Virtual Memory:</strong> Extension of physical memory using storage</li>
              </ul>
            </div>
            <div className="functions">
              <h6>Primary Functions:</h6>
              <ul>
                <li>Store program instructions</li>
                <li>Hold data being processed</li>
                <li>Provide fast access to CPU</li>
                <li>Support multitasking</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Input/Output (I/O) System</h5>
            <p><strong>Description:</strong> Handles communication with external devices</p>
            <div className="subcomponents">
              <h6>Subcomponents:</h6>
              <ul>
                <li><strong>I/O Controllers:</strong> Manage specific device types</li>
                <li><strong>Device Drivers:</strong> Software interface to hardware</li>
                <li><strong>Buses:</strong> Communication pathways for data transfer</li>
                <li><strong>Interrupt System:</strong> Handles asynchronous events</li>
              </ul>
            </div>
            <div className="functions">
              <h6>Primary Functions:</h6>
              <ul>
                <li>Accept user input</li>
                <li>Display output</li>
                <li>Transfer data</li>
                <li>Manage peripherals</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Secondary Storage</h5>
            <p><strong>Description:</strong> Provides long-term, non-volatile data storage</p>
            <div className="subcomponents">
              <h6>Subcomponents:</h6>
              <ul>
                <li><strong>Hard Disk Drives (HDD):</strong> Magnetic storage devices</li>
                <li><strong>Solid State Drives (SSD):</strong> Flash memory storage</li>
                <li><strong>Optical Drives:</strong> CD/DVD/Blu-ray storage</li>
                <li><strong>Network Storage:</strong> Remote storage systems</li>
              </ul>
            </div>
            <div className="functions">
              <h6>Primary Functions:</h6>
              <ul>
                <li>Store programs permanently</li>
                <li>Hold user data</li>
                <li>Provide backup storage</li>
                <li>Enable data sharing</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>System Bus</h5>
            <p><strong>Description:</strong> Communication pathway connecting all components</p>
            <div className="subcomponents">
              <h6>Subcomponents:</h6>
              <ul>
                <li><strong>Data Bus:</strong> Carries actual data between components</li>
                <li><strong>Address Bus:</strong> Specifies memory locations</li>
                <li><strong>Control Bus:</strong> Carries control signals</li>
                <li><strong>Power Bus:</strong> Distributes electrical power</li>
              </ul>
            </div>
            <div className="functions">
              <h6>Primary Functions:</h6>
              <ul>
                <li>Enable component communication</li>
                <li>Coordinate data transfer</li>
                <li>Synchronize operations</li>
                <li>Distribute power</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="stored-program-concept">
        <h4>Stored Program Concept</h4>
        <p><strong>Key Principle:</strong> Both programs and data are stored in the same memory</p>
        <div className="benefits">
          <h5>Benefits of Stored Program Concept:</h5>
          <ul>
            <li><strong>Flexibility:</strong> Programs can be easily changed without hardware modifications</li>
            <li><strong>Self-Modification:</strong> Programs can modify themselves during execution</li>
            <li><strong>Universal Machine:</strong> Same hardware can run different programs</li>
            <li><strong>Efficiency:</strong> No need to rewire hardware for different tasks</li>
            <li><strong>Programmability:</strong> Complex behaviors through software rather than hardware</li>
          </ul>
        </div>
      </div>
      
      <div className="von-neumann-bottleneck">
        <h4>Von Neumann Bottleneck</h4>
        <p><strong>Limitation:</strong> Single bus between CPU and memory creates performance bottleneck</p>
        <div className="solutions">
          <h5>Solutions to Von Neumann Bottleneck:</h5>
          <div className="solution-grid">
            <div className="solution-item">
              <h6>Cache Memory</h6>
              <p><strong>Description:</strong> High-speed memory close to CPU reduces memory access time</p>
              <p><strong>Effectiveness:</strong> High - reduces average memory access time significantly</p>
            </div>
            <div className="solution-item">
              <h6>Pipelining</h6>
              <p><strong>Description:</strong> Overlapping instruction execution phases</p>
              <p><strong>Effectiveness:</strong> High - increases instruction throughput</p>
            </div>
            <div className="solution-item">
              <h6>Superscalar Architecture</h6>
              <p><strong>Description:</strong> Multiple execution units allow parallel instruction execution</p>
              <p><strong>Effectiveness:</strong> Very High - enables instruction-level parallelism</p>
            </div>
            <div className="solution-item">
              <h6>Harvard Architecture</h6>
              <p><strong>Description:</strong> Separate buses for instructions and data</p>
              <p><strong>Effectiveness:</strong> Moderate - used in specialized processors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Central Processing Unit (CPU) Design</h2>
    
    <h3>CPU Architecture and Components</h3>
    <div className="cpu-architecture">
      <div className="cpu-intro">
        <h4>CPU Internal Architecture</h4>
        <p>The Central Processing Unit consists of several key components that work together to execute instructions and manage system operations.</p>
      </div>
      
      <div className="cpu-components">
        <h4>CPU Core Components</h4>
        <div className="component-grid">
          <div className="component-item">
            <h5>Arithmetic Logic Unit (ALU)</h5>
            <p><strong>Description:</strong> Performs mathematical and logical operations</p>
            <div className="operations">
              <h6>Key Operations:</h6>
              <ul>
                <li><strong>Arithmetic:</strong> Addition, subtraction, multiplication, division</li>
                <li><strong>Logical:</strong> AND, OR, NOT, XOR operations</li>
                <li><strong>Comparison:</strong> Equal, greater than, less than</li>
                <li><strong>Shift:</strong> Bit shifting operations</li>
                <li><strong>Bitwise:</strong> Individual bit manipulation</li>
              </ul>
            </div>
            <div className="design-considerations">
              <h6>Design Considerations:</h6>
              <ul>
                <li>Speed vs. complexity</li>
                <li>Power consumption</li>
                <li>Silicon area</li>
                <li>Precision requirements</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Control Unit (CU)</h5>
            <p><strong>Description:</strong> Manages instruction execution and coordinates system operations</p>
            <div className="operations">
              <h6>Key Operations:</h6>
              <ul>
                <li><strong>Instruction Fetch:</strong> Retrieves instructions from memory</li>
                <li><strong>Instruction Decode:</strong> Interprets instruction format and operation</li>
                <li><strong>Execution Control:</strong> Coordinates ALU and memory operations</li>
                <li><strong>Interrupt Handling:</strong> Manages system interrupts and exceptions</li>
                <li><strong>Pipeline Management:</strong> Controls instruction pipeline stages</li>
              </ul>
            </div>
            <div className="design-considerations">
              <h6>Design Considerations:</h6>
              <ul>
                <li>Instruction set complexity</li>
                <li>Pipeline depth</li>
                <li>Branch prediction</li>
                <li>Exception handling</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Register File</h5>
            <p><strong>Description:</strong> High-speed storage locations within the CPU</p>
            <div className="operations">
              <h6>Key Operations:</h6>
              <ul>
                <li><strong>General Purpose:</strong> Store operands and intermediate results</li>
                <li><strong>Special Purpose:</strong> Program counter, stack pointer, status flags</li>
                <li><strong>Floating Point:</strong> Dedicated registers for floating-point operations</li>
                <li><strong>Vector:</strong> SIMD (Single Instruction, Multiple Data) operations</li>
                <li><strong>Control:</strong> System control and configuration registers</li>
              </ul>
            </div>
            <div className="design-considerations">
              <h6>Design Considerations:</h6>
              <ul>
                <li>Number of registers</li>
                <li>Register width</li>
                <li>Access patterns</li>
                <li>Power consumption</li>
              </ul>
            </div>
          </div>
          
          <div className="component-item">
            <h5>Cache System</h5>
            <p><strong>Description:</strong> High-speed memory hierarchy to reduce memory access latency</p>
            <div className="operations">
              <h6>Key Operations:</h6>
              <ul>
                <li><strong>L1 Cache:</strong> Fastest, smallest cache closest to CPU cores</li>
                <li><strong>L2 Cache:</strong> Larger, slightly slower cache shared or per-core</li>
                <li><strong>L3 Cache:</strong> Largest, shared cache for multiple cores</li>
                <li><strong>Cache Coherency:</strong> Maintains data consistency across caches</li>
                <li><strong>Prefetching:</strong> Predicts and loads data before it's needed</li>
              </ul>
            </div>
            <div className="design-considerations">
              <h6>Design Considerations:</h6>
              <ul>
                <li>Cache size vs. speed</li>
                <li>Associativity</li>
                <li>Replacement policies</li>
                <li>Coherency protocols</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h3>Instruction Execution Cycle</h3>
    <div className="instruction-execution-cycle">
      <div className="cycle-intro">
        <h4>Instruction Execution Cycle</h4>
        <p>The CPU executes instructions through a systematic four-stage cycle that repeats for every instruction.</p>
      </div>
      
      <div className="execution-stages">
        <h4>Instruction Execution Stages</h4>
        <div className="stages-grid">
          <div className="stage-item">
            <h5>1. Fetch Stage</h5>
            <p><strong>Description:</strong> Retrieve instruction from memory</p>
            <p><strong>Typical Time:</strong> 1-2 clock cycles</p>
            <div className="stage-steps">
              <h6>Detailed Steps:</h6>
              <ol>
                <li>Send address from Program Counter (PC) to memory</li>
                <li>Read instruction from memory location</li>
                <li>Load instruction into Instruction Register (IR)</li>
                <li>Increment Program Counter to next instruction</li>
              </ol>
            </div>
          </div>
          
          <div className="stage-item">
            <h5>2. Decode Stage</h5>
            <p><strong>Description:</strong> Interpret the instruction format and determine operation</p>
            <p><strong>Typical Time:</strong> 1 clock cycle</p>
            <div className="stage-steps">
              <h6>Detailed Steps:</h6>
              <ol>
                <li>Analyze instruction opcode (operation code)</li>
                <li>Identify operand locations (registers, memory, immediate)</li>
                <li>Determine required execution units</li>
                <li>Generate control signals for execution</li>
              </ol>
            </div>
          </div>
          
          <div className="stage-item">
            <h5>3. Execute Stage</h5>
            <p><strong>Description:</strong> Perform the actual operation</p>
            <p><strong>Typical Time:</strong> 1-10+ clock cycles (varies by operation)</p>
            <div className="stage-steps">
              <h6>Detailed Steps:</h6>
              <ol>
                <li>Read operands from specified locations</li>
                <li>Perform operation using ALU or other units</li>
                <li>Handle any exceptions or interrupts</li>
                <li>Generate result and status flags</li>
              </ol>
            </div>
          </div>
          
          <div className="stage-item">
            <h5>4. Writeback Stage</h5>
            <p><strong>Description:</strong> Store the result in the destination</p>
            <p><strong>Typical Time:</strong> 1 clock cycle</p>
            <div className="stage-steps">
              <h6>Detailed Steps:</h6>
              <ol>
                <li>Write result to destination register or memory</li>
                <li>Update processor status flags</li>
                <li>Handle any pipeline forwarding</li>
                <li>Prepare for next instruction</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="execution-example">
        <h4>Example: ADD R1, R2, R3</h4>
        <p><strong>Instruction:</strong> Add contents of R2 and R3, store result in R1</p>
        
        <div className="example-stages">
          <div className="example-stage">
            <h5>Fetch Stage:</h5>
            <ul>
              <li>PC contains address 0x1000</li>
              <li>CPU reads instruction from memory[0x1000]</li>
              <li>Instruction 'ADD R1, R2, R3' loaded into IR</li>
              <li>PC incremented to 0x1004</li>
            </ul>
          </div>
          
          <div className="example-stage">
            <h5>Decode Stage:</h5>
            <ul>
              <li>Opcode identified as ADD operation</li>
              <li>Source registers: R2, R3</li>
              <li>Destination register: R1</li>
              <li>ALU configured for addition</li>
            </ul>
          </div>
          
          <div className="example-stage">
            <h5>Execute Stage:</h5>
            <ul>
              <li>Read value from R2: 0x00000010 (16 decimal)</li>
              <li>Read value from R3: 0x00000020 (32 decimal)</li>
              <li>ALU performs: 16 + 32 = 48</li>
              <li>Result: 0x00000030 (48 decimal)</li>
            </ul>
          </div>
          
          <div className="example-stage">
            <h5>Writeback Stage:</h5>
            <ul>
              <li>Store result 0x00000030 in register R1</li>
              <li>Update status flags (if needed)</li>
              <li>Instruction complete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <h3>Instruction Set Architecture (ISA)</h3>
    <div className="instruction-set-architecture">
      <div className="isa-intro">
        <h4>Instruction Set Architecture (ISA)</h4>
        <p>The interface between software and hardware - defines what instructions the CPU can execute</p>
      </div>
      
      <div className="isa-types">
        <h4>ISA Types Comparison</h4>
        <div className="isa-types-grid">
          <div className="isa-type-item">
            <h5>CISC (Complex Instruction Set Computer)</h5>
            <p><strong>Description:</strong> Large number of complex instructions that can perform multiple operations</p>
            <div className="characteristics">
              <h6>Key Characteristics:</h6>
              <ul>
                <li>Variable-length instructions</li>
                <li>Complex addressing modes</li>
                <li>Many specialized instructions</li>
                <li>Microcode-based implementation</li>
                <li>Fewer instructions needed for programs</li>
              </ul>
            </div>
            <p><strong>Examples:</strong> x86/x64 (Intel, AMD), VAX, Motorola 68000</p>
            <div className="advantages">
              <h6>Advantages:</h6>
              <ul>
                <li>Compact code</li>
                <li>Rich instruction set</li>
                <li>Backward compatibility</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h6>Disadvantages:</h6>
              <ul>
                <li>Complex hardware</li>
                <li>Variable execution times</li>
                <li>Difficult to pipeline</li>
              </ul>
            </div>
          </div>
          
          <div className="isa-type-item">
            <h5>RISC (Reduced Instruction Set Computer)</h5>
            <p><strong>Description:</strong> Small number of simple, uniform instructions</p>
            <div className="characteristics">
              <h6>Key Characteristics:</h6>
              <ul>
                <li>Fixed-length instructions</li>
                <li>Simple addressing modes</li>
                <li>Load/store architecture</li>
                <li>Large register file</li>
                <li>Hardwired control unit</li>
              </ul>
            </div>
            <p><strong>Examples:</strong> ARM, MIPS, PowerPC, RISC-V</p>
            <div className="advantages">
              <h6>Advantages:</h6>
              <ul>
                <li>Simple hardware</li>
                <li>Predictable timing</li>
                <li>Easy to pipeline</li>
                <li>Lower power consumption</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h6>Disadvantages:</h6>
              <ul>
                <li>More instructions needed</li>
                <li>Larger code size</li>
                <li>Compiler complexity</li>
              </ul>
            </div>
          </div>
          
          <div className="isa-type-item">
            <h5>VLIW (Very Long Instruction Word)</h5>
            <p><strong>Description:</strong> Instructions explicitly specify multiple operations to execute in parallel</p>
            <div className="characteristics">
              <h6>Key Characteristics:</h6>
              <ul>
                <li>Very wide instructions (128+ bits)</li>
                <li>Explicit parallelism</li>
                <li>Compiler-scheduled operations</li>
                <li>Multiple functional units</li>
                <li>No dynamic scheduling</li>
              </ul>
            </div>
            <p><strong>Examples:</strong> Intel Itanium, TI C6000 DSP, Some GPUs</p>
            <div className="advantages">
              <h6>Advantages:</h6>
              <ul>
                <li>High performance potential</li>
                <li>Simple hardware</li>
                <li>Predictable execution</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h6>Disadvantages:</h6>
              <ul>
                <li>Compiler complexity</li>
                <li>Code compatibility</li>
                <li>Wasted instruction slots</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="instruction-formats">
        <h4>Instruction Formats</h4>
        <p>Common instruction formats using MIPS as an example:</p>
        <div className="formats-grid">
          <div className="format-item">
            <h5>R-Type (Register)</h5>
            <p><strong>Description:</strong> Operations between registers</p>
            <p><strong>Fields:</strong> Opcode (6 bits), Rs (5 bits), Rt (5 bits), Rd (5 bits), Shamt (5 bits), Function (6 bits)</p>
            <p><strong>Example:</strong> <code>ADD R1, R2, R3  // R1 = R2 + R3</code></p>
            <div className="use-cases">
              <h6>Use Cases:</h6>
              <ul>
                <li>Arithmetic operations</li>
                <li>Logical operations</li>
                <li>Shift operations</li>
              </ul>
            </div>
          </div>
          
          <div className="format-item">
            <h5>I-Type (Immediate)</h5>
            <p><strong>Description:</strong> Operations with immediate values</p>
            <p><strong>Fields:</strong> Opcode (6 bits), Rs (5 bits), Rt (5 bits), Immediate (16 bits)</p>
            <p><strong>Example:</strong> <code>ADDI R1, R2, 100  // R1 = R2 + 100</code></p>
            <div className="use-cases">
              <h6>Use Cases:</h6>
              <ul>
                <li>Load/store operations</li>
                <li>Branch instructions</li>
                <li>Immediate arithmetic</li>
              </ul>
            </div>
          </div>
          
          <div className="format-item">
            <h5>J-Type (Jump)</h5>
            <p><strong>Description:</strong> Jump and call instructions</p>
            <p><strong>Fields:</strong> Opcode (6 bits), Address (26 bits)</p>
            <p><strong>Example:</strong> <code>J 0x400000  // Jump to address 0x400000</code></p>
            <div className="use-cases">
              <h6>Use Cases:</h6>
              <ul>
                <li>Unconditional jumps</li>
                <li>Function calls</li>
                <li>Long-distance branches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Memory Hierarchy and Storage Systems</h2>
    
    <h3>Memory Hierarchy Design</h3>
    <div className="memory-hierarchy">
      <div className="hierarchy-intro">
        <h4>Memory Hierarchy Principles</h4>
        <p>Computer memory is organized in levels from fastest/smallest to slowest/largest, balancing speed, capacity, and cost.</p>
      </div>
      
      <div className="memory-levels">
        <h4>Memory Hierarchy Levels</h4>
        <div className="levels-grid">
          <div className="level-item">
            <h5>CPU Registers</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 32-128 registers × 32/64 bits</p>
              <p><strong>Access Time:</strong> 0.1-0.5 ns</p>
              <p><strong>Cost per Bit:</strong> Very High</p>
              <p><strong>Technology:</strong> SRAM (Static RAM)</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Fastest access time</li>
                <li>Directly accessible by CPU</li>
                <li>Limited capacity</li>
                <li>No cache misses</li>
                <li>Compiler-managed</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>Operands for current instruction</li>
                <li>Intermediate results</li>
                <li>Address calculations</li>
              </ul>
            </div>
          </div>
          
          <div className="level-item">
            <h5>L1 Cache</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 16-64 KB per core</p>
              <p><strong>Access Time:</strong> 1-2 ns</p>
              <p><strong>Cost per Bit:</strong> High</p>
              <p><strong>Technology:</strong> SRAM</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Split instruction/data caches</li>
                <li>Highest cache priority</li>
                <li>Direct CPU connection</li>
                <li>Hardware-managed</li>
                <li>Write-through or write-back</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>Recently used instructions</li>
                <li>Frequently accessed data</li>
                <li>Hot code paths</li>
              </ul>
            </div>
          </div>
          
          <div className="level-item">
            <h5>L2 Cache</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 256 KB - 2 MB per core</p>
              <p><strong>Access Time:</strong> 3-10 ns</p>
              <p><strong>Cost per Bit:</strong> Medium-High</p>
              <p><strong>Technology:</strong> SRAM</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Unified instruction/data cache</li>
                <li>Larger than L1</li>
                <li>May be shared between cores</li>
                <li>Inclusive or exclusive of L1</li>
                <li>More associative than L1</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>L1 cache overflow</li>
                <li>Shared data between cores</li>
                <li>Medium-term storage</li>
              </ul>
            </div>
          </div>
          
          <div className="level-item">
            <h5>L3 Cache</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 4-32 MB shared</p>
              <p><strong>Access Time:</strong> 10-30 ns</p>
              <p><strong>Cost per Bit:</strong> Medium</p>
              <p><strong>Technology:</strong> SRAM</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Shared among all cores</li>
                <li>Last level cache (LLC)</li>
                <li>Highly associative</li>
                <li>Smart replacement policies</li>
                <li>Cache coherency point</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>Inter-core data sharing</li>
                <li>Large working sets</li>
                <li>Reduced memory traffic</li>
              </ul>
            </div>
          </div>
          
          <div className="level-item">
            <h5>Main Memory (RAM)</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 4-128+ GB</p>
              <p><strong>Access Time:</strong> 50-100 ns</p>
              <p><strong>Cost per Bit:</strong> Low-Medium</p>
              <p><strong>Technology:</strong> DRAM (Dynamic RAM)</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Volatile storage</li>
                <li>Large capacity</li>
                <li>Sequential access optimization</li>
                <li>Refresh required</li>
                <li>Multiple channels/ranks</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>Program code and data</li>
                <li>Operating system</li>
                <li>Application working sets</li>
              </ul>
            </div>
          </div>
          
          <div className="level-item">
            <h5>Secondary Storage</h5>
            <div className="level-specs">
              <p><strong>Capacity:</strong> 256 GB - 10+ TB</p>
              <p><strong>Access Time:</strong> 0.1-10 ms</p>
              <p><strong>Cost per Bit:</strong> Low</p>
              <p><strong>Technology:</strong> SSD/HDD</p>
            </div>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Non-volatile storage</li>
                <li>Very large capacity</li>
                <li>Block-based access</li>
                <li>Wear leveling (SSD)</li>
                <li>Mechanical delays (HDD)</li>
              </ul>
            </div>
            <div className="typical-uses">
              <h6>Typical Uses:</h6>
              <ul>
                <li>File systems</li>
                <li>Virtual memory</li>
                <li>Long-term storage</li>
                <li>Backup and archival</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h3>Cache Design Principles</h3>
    <div className="cache-design">
      <div className="cache-fundamentals">
        <h4>Cache Performance Factors</h4>
        <p>Cache performance depends on several key factors that exploit different types of locality and design trade-offs.</p>
      </div>
      
      <div className="cache-factors">
        <div className="factor-item">
          <h5>Temporal Locality</h5>
          <p><strong>Description:</strong> Recently accessed data is likely to be accessed again soon</p>
          <p><strong>Example:</strong> Loop variables, frequently called functions</p>
          <p><strong>Cache Strategy:</strong> Keep recently used data in cache</p>
        </div>
        
        <div className="factor-item">
          <h5>Spatial Locality</h5>
          <p><strong>Description:</strong> Data near recently accessed data is likely to be accessed</p>
          <p><strong>Example:</strong> Array elements, sequential code execution</p>
          <p><strong>Cache Strategy:</strong> Fetch entire cache lines (blocks)</p>
        </div>
        
        <div className="factor-item">
          <h5>Cache Size</h5>
          <p><strong>Description:</strong> Larger caches can hold more data but are slower</p>
          <p><strong>Example:</strong> L1: 32KB fast, L3: 16MB slower</p>
          <p><strong>Cache Strategy:</strong> Balance size vs. speed in hierarchy</p>
        </div>
        
        <div className="factor-item">
          <h5>Associativity</h5>
          <p><strong>Description:</strong> How many cache locations can hold a memory block</p>
          <p><strong>Example:</strong> Direct-mapped, 2-way, 4-way, fully associative</p>
          <p><strong>Cache Strategy:</strong> Higher associativity reduces conflicts</p>
        </div>
        
        <div className="factor-item">
          <h5>Block Size</h5>
          <p><strong>Description:</strong> Amount of data transferred on cache miss</p>
          <p><strong>Example:</strong> 32, 64, 128 bytes per cache line</p>
          <p><strong>Cache Strategy:</strong> Larger blocks exploit spatial locality</p>
        </div>
      </div>
      
      <div className="cache-performance-metrics">
        <h4>Cache Performance Metrics</h4>
        <div className="performance-example">
          <h5>Performance Calculation Example</h5>
          <div className="metrics-data">
            <p><strong>Cache Hits:</strong> 950</p>
            <p><strong>Cache Misses:</strong> 50</p>
            <p><strong>Total Accesses:</strong> 1000</p>
            <p><strong>Hit Rate:</strong> 95%</p>
            <p><strong>Miss Rate:</strong> 5%</p>
            <p><strong>Hit Time:</strong> 2 ns</p>
            <p><strong>Miss Penalty:</strong> 100 ns</p>
            <p><strong>Average Access Time:</strong> 7 ns</p>
          </div>
          
          <div className="performance-insights">
            <h6>Key Performance Insights</h6>
            <p><strong>Impact of Miss Rate:</strong> Even a small miss rate significantly impacts performance!</p>
            <ul>
              <li>With 95% hit rate: 2ns + 5% × 100ns = 7ns average</li>
              <li>With 99% hit rate: 2ns + 1% × 100ns = 3ns average</li>
            </ul>
            <p>Improving hit rate from 95% to 99% reduces average access time by 57%!</p>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Performance Analysis and Optimization</h2>
    
    <h3>System Performance Metrics</h3>
    <div className="performance-analysis">
      <div className="performance-intro">
        <h4>Computer System Performance Metrics</h4>
        <p>Understanding and measuring system performance requires analyzing multiple key indicators that affect overall system efficiency.</p>
      </div>
      
      <div className="performance-metrics">
        <div className="metric-item">
          <h5>Throughput</h5>
          <p><strong>Description:</strong> Number of tasks completed per unit time</p>
          <p><strong>Units:</strong> Instructions per second (IPS), Transactions per second (TPS), Operations per second</p>
          <div className="measurement-methods">
            <h6>Measurement Methods:</h6>
            <ul>
              <li>Benchmark suites</li>
              <li>Workload analysis</li>
              <li>Performance counters</li>
            </ul>
          </div>
          <div className="optimization-strategies">
            <h6>Optimization Strategies:</h6>
            <ul>
              <li>Parallel processing</li>
              <li>Pipeline optimization</li>
              <li>Resource utilization</li>
            </ul>
          </div>
        </div>
        
        <div className="metric-item">
          <h5>Latency</h5>
          <p><strong>Description:</strong> Time required to complete a single task</p>
          <p><strong>Units:</strong> Seconds, Clock cycles, Nanoseconds</p>
          <div className="measurement-methods">
            <h6>Measurement Methods:</h6>
            <ul>
              <li>Timing analysis</li>
              <li>Critical path analysis</li>
              <li>Profiling tools</li>
            </ul>
          </div>
          <div className="optimization-strategies">
            <h6>Optimization Strategies:</h6>
            <ul>
              <li>Reduce dependencies</li>
              <li>Faster components</li>
              <li>Caching strategies</li>
            </ul>
          </div>
        </div>
        
        <div className="metric-item">
          <h5>CPU Utilization</h5>
          <p><strong>Description:</strong> Percentage of time CPU is actively executing instructions</p>
          <p><strong>Units:</strong> Percentage (%), Utilization ratio</p>
          <div className="measurement-methods">
            <h6>Measurement Methods:</h6>
            <ul>
              <li>System monitors</li>
              <li>Performance counters</li>
              <li>Sampling techniques</li>
            </ul>
          </div>
          <div className="optimization-strategies">
            <h6>Optimization Strategies:</h6>
            <ul>
              <li>Load balancing</li>
              <li>Efficient algorithms</li>
              <li>Reduce idle time</li>
            </ul>
          </div>
        </div>
        
        <div className="metric-item">
          <h5>Memory Bandwidth</h5>
          <p><strong>Description:</strong> Rate of data transfer between memory and processor</p>
          <p><strong>Units:</strong> Bytes per second (B/s), Gigabytes per second (GB/s)</p>
          <div className="measurement-methods">
            <h6>Measurement Methods:</h6>
            <ul>
              <li>Memory benchmarks</li>
              <li>Hardware counters</li>
              <li>Bandwidth tests</li>
            </ul>
          </div>
          <div className="optimization-strategies">
            <h6>Optimization Strategies:</h6>
            <ul>
              <li>Multiple memory channels</li>
              <li>Cache optimization</li>
              <li>Data locality</li>
            </ul>
          </div>
        </div>
        
        <div className="metric-item">
          <h5>Power Consumption</h5>
          <p><strong>Description:</strong> Electrical power used by the system</p>
          <p><strong>Units:</strong> Watts (W), Joules per operation (J/op)</p>
          <div className="measurement-methods">
            <h6>Measurement Methods:</h6>
            <ul>
              <li>Power meters</li>
              <li>Built-in sensors</li>
              <li>Energy profiling</li>
            </ul>
          </div>
          <div className="optimization-strategies">
            <h6>Optimization Strategies:</h6>
            <ul>
              <li>Dynamic voltage scaling</li>
              <li>Clock gating</li>
              <li>Efficient algorithms</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="performance-comparison">
        <h4>Performance Analysis Example</h4>
        <p><strong>Comparing Two System Configurations:</strong></p>
        
        <div className="system-configs">
          <div className="system-config">
            <h5>System A - High Clock Speed</h5>
            <ul>
              <li><strong>CPU Frequency:</strong> 4.0 GHz</li>
              <li><strong>Cores:</strong> 4</li>
              <li><strong>L3 Cache:</strong> 8 MB</li>
              <li><strong>Memory:</strong> 2400 MHz, 2 channels</li>
              <li><strong>Power:</strong> 95 W</li>
            </ul>
          </div>
          
          <div className="system-config">
            <h5>System B - More Cores</h5>
            <ul>
              <li><strong>CPU Frequency:</strong> 2.5 GHz</li>
              <li><strong>Cores:</strong> 8</li>
              <li><strong>L3 Cache:</strong> 16 MB</li>
              <li><strong>Memory:</strong> 3200 MHz, 4 channels</li>
              <li><strong>Power:</strong> 85 W</li>
            </ul>
          </div>
        </div>
        
        <div className="workload-scenarios">
          <h5>Performance Comparison by Workload</h5>
          <div className="scenario">
            <h6>Single-threaded CPU-intensive</h6>
            <p><strong>System A:</strong> Excellent (high frequency advantage)</p>
            <p><strong>System B:</strong> Good (limited by single-thread performance)</p>
            <p><strong>Winner:</strong> System A</p>
            <p><strong>Reason:</strong> Single-threaded workloads benefit from higher clock speeds</p>
          </div>
          
          <div className="scenario">
            <h6>Multi-threaded parallel processing</h6>
            <p><strong>System A:</strong> Good (4 cores fully utilized)</p>
            <p><strong>System B:</strong> Excellent (8 cores provide more parallelism)</p>
            <p><strong>Winner:</strong> System B</p>
            <p><strong>Reason:</strong> More cores enable better parallel task execution</p>
          </div>
          
          <div className="scenario">
            <h6>Memory-intensive applications</h6>
            <p><strong>System A:</strong> Moderate (limited memory bandwidth)</p>
            <p><strong>System B:</strong> Excellent (4 memory channels, faster RAM)</p>
            <p><strong>Winner:</strong> System B</p>
            <p><strong>Reason:</strong> Higher memory bandwidth and larger cache</p>
          </div>
          
          <div className="scenario">
            <h6>Power-constrained environments</h6>
            <p><strong>System A:</strong> Good performance but higher power</p>
            <p><strong>System B:</strong> Better performance per watt</p>
            <p><strong>Winner:</strong> System B</p>
            <p><strong>Reason:</strong> Lower power consumption with competitive performance</p>
          </div>
        </div>
        
        <div className="key-insights">
          <h5>Key Performance Insights</h5>
          <ul>
            <li>No single 'best' system - performance depends on workload</li>
            <li>High frequency benefits single-threaded performance</li>
            <li>More cores enable better parallel processing</li>
            <li>Memory bandwidth can be a bottleneck</li>
            <li>Power efficiency is increasingly important</li>
            <li>Cache size affects performance for large working sets</li>
          </ul>
        </div>
      </div>
    </div>
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