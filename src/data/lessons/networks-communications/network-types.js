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
    <div class="pan-overview">
      <p><strong>Personal Area Network (PAN)</strong> is the smallest type of network, designed to connect personal devices within a very limited range around an individual person.</p>
      
      <div class="pan-characteristics">
        <h4>PAN Characteristics</h4>
        <ul>
          <li><strong>Range:</strong> 1-10 meters (3-30 feet)</li>
          <li><strong>Purpose:</strong> Connect personal devices around an individual</li>
          <li><strong>Scope:</strong> Personal workspace or immediate vicinity</li>
          <li><strong>Ownership:</strong> Typically owned and managed by one person</li>
        </ul>
      </div>

      <div class="pan-technologies">
        <h4>PAN Technologies</h4>
        
        <div class="technology-section">
          <h5>Bluetooth</h5>
          <ul>
            <li><strong>Range:</strong> Up to 10 meters</li>
            <li><strong>Speed:</strong> 1-3 Mbps</li>
            <li><strong>Examples:</strong> Wireless headphones, computer mouse, smartphone to laptop connection</li>
            <li><strong>Advantages:</strong> Low power consumption, automatic device pairing, widely supported</li>
          </ul>
        </div>

        <div class="technology-section">
          <h5>USB (Universal Serial Bus)</h5>
          <ul>
            <li><strong>Range:</strong> Up to 5 meters (with cable)</li>
            <li><strong>Speed:</strong> 480 Mbps - 10 Gbps (depending on USB version)</li>
            <li><strong>Examples:</strong> External hard drive, printer connection, phone charging</li>
            <li><strong>Advantages:</strong> High speed, reliable connection, power delivery capability</li>
          </ul>
        </div>

        <div class="technology-section">
          <h5>NFC (Near Field Communication)</h5>
          <ul>
            <li><strong>Range:</strong> Up to 4 centimeters</li>
            <li><strong>Speed:</strong> 424 kbps</li>
            <li><strong>Examples:</strong> Contactless payments, file sharing, device pairing</li>
            <li><strong>Advantages:</strong> Very secure due to short range, instant connection</li>
          </ul>
        </div>

        <div class="technology-section">
          <h5>Infrared (IR)</h5>
          <ul>
            <li><strong>Range:</strong> Up to 1 meter</li>
            <li><strong>Speed:</strong> 115 kbps - 4 Mbps</li>
            <li><strong>Examples:</strong> TV remote control, legacy laptop file transfer</li>
            <li><strong>Limitations:</strong> Requires line of sight, largely obsolete for data transfer</li>
          </ul>
        </div>
      </div>

      <div class="pan-scenario">
        <h4>Real-World PAN Scenario: Sarah's Personal Workspace</h4>
        <p>Here's how a typical PAN might look in a personal workspace:</p>
        
        <div class="device-connections">
          <h5>Connected Devices</h5>
          <ul>
            <li><strong>Laptop</strong> - Central device and hub</li>
            <li><strong>Bluetooth Mouse</strong> - Connected via Bluetooth to laptop</li>
            <li><strong>Wireless Headphones</strong> - Connected via Bluetooth to laptop</li>
            <li><strong>Smartphone</strong> - USB cable for charging, Bluetooth for file sharing</li>
            <li><strong>Fitness Tracker</strong> - Connected via Bluetooth to smartphone</li>
            <li><strong>External SSD</strong> - Connected via USB-C to laptop</li>
          </ul>
        </div>

        <div class="pan-benefits">
          <h5>Benefits of This PAN Setup</h5>
          <ul>
            <li><strong>Convenience:</strong> Seamless device interaction without cables</li>
            <li><strong>Mobility:</strong> Move freely within the workspace</li>
            <li><strong>Productivity:</strong> Quick file sharing and device synchronization</li>
            <li><strong>Organization:</strong> Centralized control through the laptop</li>
          </ul>
        </div>
      </div>
    </div>
    
    <h3>Local Area Network (LAN)</h3>
    <div class="lan-overview">
      <p><strong>Local Area Network (LAN)</strong> connects devices within a limited geographic area, typically within a single building or campus. LANs provide high-speed connectivity and resource sharing for organizations.</p>
      
      <div class="lan-characteristics">
        <h4>LAN Characteristics</h4>
        <ul>
          <li><strong>Range:</strong> 100 meters - 1 kilometer</li>
          <li><strong>Purpose:</strong> Connect devices within a building or campus</li>
          <li><strong>Ownership:</strong> Typically owned and managed by a single organization</li>
          <li><strong>Speed:</strong> High-speed connections (10 Mbps to 10+ Gbps)</li>
        </ul>
      </div>

      <div class="lan-technologies">
        <h4>LAN Technologies</h4>
        
        <div class="technology-comparison">
          <h5>Ethernet (Wired) - IEEE 802.3</h5>
          <div class="tech-details">
            <p><strong>Medium:</strong> Twisted pair cables (Cat5e, Cat6, Cat6a)</p>
            <h6>Speed Evolution:</h6>
            <ul>
              <li>10 Mbps (10BASE-T) - Legacy standard</li>
              <li>100 Mbps (100BASE-TX) - Fast Ethernet</li>
              <li>1 Gbps (1000BASE-T) - Gigabit Ethernet (most common)</li>
              <li>10 Gbps (10GBASE-T) - 10 Gigabit Ethernet</li>
            </ul>
            <h6>Advantages:</h6>
            <ul>
              <li>✓ Highly reliable connection</li>
              <li>✓ Consistent high speed</li>
              <li>✓ More secure (physical access required)</li>
              <li>✓ Low latency</li>
            </ul>
            <h6>Disadvantages:</h6>
            <ul>
              <li>✗ Requires physical cables</li>
              <li>✗ Limited mobility</li>
              <li>✗ Complex installation</li>
            </ul>
          </div>

          <h5>Wi-Fi (Wireless) - IEEE 802.11</h5>
          <div class="tech-details">
            <p><strong>Medium:</strong> Radio waves (2.4 GHz, 5 GHz, 6 GHz bands)</p>
            <h6>Wi-Fi Standards Evolution:</h6>
            <ul>
              <li>11 Mbps (802.11b) - 2.4 GHz, legacy</li>
              <li>54 Mbps (802.11g) - 2.4 GHz, legacy</li>
              <li>600 Mbps (802.11n) - 2.4/5 GHz, still common</li>
              <li>1.3 Gbps (802.11ac) - 5 GHz, widely used</li>
              <li>9.6 Gbps (802.11ax/Wi-Fi 6) - 2.4/5/6 GHz, latest</li>
            </ul>
            <h6>Advantages:</h6>
            <ul>
              <li>✓ Complete mobility within range</li>
              <li>✓ Easy setup and configuration</li>
              <li>✓ No physical cables needed</li>
              <li>✓ Supports many devices simultaneously</li>
            </ul>
            <h6>Disadvantages:</h6>
            <ul>
              <li>✗ Susceptible to interference</li>
              <li>✗ Security vulnerabilities if not properly configured</li>
              <li>✗ Distance and obstacle limitations</li>
              <li>✗ Bandwidth shared among all users</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="lan-example">
        <h4>Real-World LAN Example: Small Office Network</h4>
        <p>Here's how a typical small office LAN is structured:</p>
        
        <div class="network-infrastructure">
          <h5>Network Infrastructure</h5>
          <ul>
            <li><strong>Router/Modem</strong>
              <ul>
                <li>Purpose: Internet connection and DHCP services</li>
                <li>Connections: ISP fiber connection</li>
              </ul>
            </li>
            <li><strong>Managed Switch (24-port)</strong>
              <ul>
                <li>Purpose: Connect multiple wired devices</li>
                <li>Connections: Ethernet cables to workstations</li>
              </ul>
            </li>
            <li><strong>Wireless Access Point</strong>
              <ul>
                <li>Purpose: Provide Wi-Fi for mobile devices</li>
                <li>Connections: Connected to switch via Ethernet</li>
              </ul>
            </li>
            <li><strong>Network Printer</strong>
              <ul>
                <li>Purpose: Shared printing for all users</li>
                <li>Connections: Ethernet connection to switch</li>
              </ul>
            </li>
            <li><strong>Network Attached Storage (NAS)</strong>
              <ul>
                <li>Purpose: File server and backup storage</li>
                <li>Connections: Ethernet connection to switch</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="client-devices">
          <h5>Client Devices</h5>
          <ul>
            <li><strong>Desktop Computers (8)</strong>
              <ul>
                <li>Connection: Wired Ethernet</li>
                <li>Usage: Primary workstations for employees</li>
              </ul>
            </li>
            <li><strong>Laptops (5)</strong>
              <ul>
                <li>Connection: Wi-Fi</li>
                <li>Usage: Mobile work and meeting rooms</li>
              </ul>
            </li>
            <li><strong>Smartphones (15)</strong>
              <ul>
                <li>Connection: Wi-Fi</li>
                <li>Usage: Communication and business apps</li>
              </ul>
            </li>
            <li><strong>Tablets (3)</strong>
              <ul>
                <li>Connection: Wi-Fi</li>
                <li>Usage: Presentations and mobile work</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="lan-benefits">
          <h5>Benefits of This LAN Setup</h5>
          <ul>
            <li><strong>Resource Sharing:</strong> Shared printer, files, and internet connection</li>
            <li><strong>Centralized Management:</strong> Easy to manage and secure all devices</li>
            <li><strong>Cost Effective:</strong> Single internet connection for all users</li>
            <li><strong>Scalability:</strong> Easy to add more devices as the business grows</li>
          </ul>
        </div>
      </div>
    </div>
    
    <h3>Wide Area Network (WAN)</h3>
    <div class="wan-overview">
      <p><strong>Wide Area Network (WAN)</strong> connects LANs across large geographic distances, spanning cities, countries, or even continents. WANs enable organizations to connect multiple locations and provide global connectivity.</p>
      
      <div class="wan-characteristics">
        <h4>WAN Characteristics</h4>
        <ul>
          <li><strong>Range:</strong> Cities, countries, continents (unlimited geographic scope)</li>
          <li><strong>Purpose:</strong> Connect LANs across large geographic distances</li>
          <li><strong>Ownership:</strong> Often involves third-party service providers</li>
          <li><strong>Speed:</strong> Varies widely based on technology and cost</li>
        </ul>
      </div>

      <div class="wan-technologies">
        <h4>WAN Technologies</h4>
        
        <div class="technology-section">
          <h5>Internet</h5>
          <div class="tech-details">
            <p><strong>Description:</strong> Global network of interconnected networks</p>
            <p><strong>Protocols:</strong> TCP/IP, HTTP/HTTPS, FTP, SMTP</p>
            <p><strong>Access Methods:</strong></p>
            <ul>
              <li>DSL (Digital Subscriber Line)</li>
              <li>Cable broadband</li>
              <li>Fiber optic connections</li>
              <li>Satellite internet</li>
              <li>Cellular networks (4G/5G)</li>
            </ul>
          </div>
        </div>

        <div class="technology-section">
          <h5>MPLS (Multiprotocol Label Switching)</h5>
          <div class="tech-details">
            <p><strong>Description:</strong> Private network service for businesses offering guaranteed performance</p>
            <p><strong>Protocols:</strong> MPLS, BGP, OSPF</p>
            <p><strong>Access Methods:</strong></p>
            <ul>
              <li>Dedicated lines</li>
              <li>Ethernet over MPLS</li>
            </ul>
            <p><strong>Benefits:</strong> Guaranteed bandwidth, low latency, high reliability</p>
          </div>
        </div>

        <div class="technology-section">
          <h5>VPN (Virtual Private Network)</h5>
          <div class="tech-details">
            <p><strong>Description:</strong> Secure tunnel over public networks</p>
            <p><strong>Protocols:</strong> IPSec, OpenVPN, WireGuard, PPTP</p>
            <p><strong>Access Methods:</strong></p>
            <ul>
              <li>Internet-based VPN</li>
              <li>Site-to-site connections</li>
              <li>Remote access for individual users</li>
            </ul>
            <p><strong>Benefits:</strong> Cost-effective, secure, flexible</p>
          </div>
        </div>

        <div class="technology-section">
          <h5>Satellite Networks</h5>
          <div class="tech-details">
            <p><strong>Description:</strong> Communication via satellites for remote or global coverage</p>
            <p><strong>Protocols:</strong> DVB-S, TCP/IP over satellite</p>
            <p><strong>Access Methods:</strong></p>
            <ul>
              <li>VSAT (Very Small Aperture Terminal)</li>
              <li>LEO satellites (Low Earth Orbit)</li>
              <li>GEO satellites (Geostationary Earth Orbit)</li>
            </ul>
            <p><strong>Use Cases:</strong> Remote locations, maritime, aviation</p>
          </div>
        </div>
      </div>

      <div class="wan-example">
        <h4>Real-World WAN Example: Multinational Corporation</h4>
        <p>Here's how a large corporation might structure its global WAN:</p>
        
        <div class="corporate-locations">
          <h5>Corporate Locations</h5>
          
          <div class="location-details">
            <h6>Headquarters (New York)</h6>
            <ul>
              <li><strong>Users:</strong> 500 users</li>
              <li><strong>Connection:</strong> Fiber 1 Gbps dedicated line</li>
              <li><strong>Role:</strong> Primary data center and internet gateway</li>
            </ul>
          </div>

          <div class="location-details">
            <h6>Branch Office (London)</h6>
            <ul>
              <li><strong>Users:</strong> 150 users</li>
              <li><strong>Connection:</strong> MPLS 100 Mbps + VPN backup</li>
              <li><strong>Role:</strong> Regional office with local file server</li>
            </ul>
          </div>

          <div class="location-details">
            <h6>Manufacturing Plant (Shanghai)</h6>
            <ul>
              <li><strong>Users:</strong> 80 users</li>
              <li><strong>Connection:</strong> Fiber 200 Mbps + satellite backup</li>
              <li><strong>Role:</strong> Production systems and inventory management</li>
            </ul>
          </div>

          <div class="location-details">
            <h6>Remote Workers (Global)</h6>
            <ul>
              <li><strong>Users:</strong> 200 users</li>
              <li><strong>Connection:</strong> VPN over home internet</li>
              <li><strong>Role:</strong> Distributed workforce access</li>
            </ul>
          </div>
        </div>

        <div class="wan-services">
          <h5>WAN Services Provided</h5>
          <ul>
            <li>Centralized email and file servers</li>
            <li>Video conferencing between offices</li>
            <li>Shared ERP and CRM systems</li>
            <li>Centralized backup and disaster recovery</li>
            <li>Global internet access and security filtering</li>
          </ul>
        </div>

        <div class="wan-benefits">
          <h5>Benefits of This WAN Setup</h5>
          <ul>
            <li><strong>Global Connectivity:</strong> All locations connected as one network</li>
            <li><strong>Centralized Resources:</strong> Shared applications and data</li>
            <li><strong>Redundancy:</strong> Multiple connection types for reliability</li>
            <li><strong>Scalability:</strong> Easy to add new locations</li>
            <li><strong>Security:</strong> Centralized security policies and monitoring</li>
          </ul>
        </div>
      </div>
    </div>
    
    <h2>Network Topologies</h2>
    
    <h3>Physical vs Logical Topologies</h3>
    <div className="topology-overview">
      <p><strong>Physical Topology:</strong> How devices are physically connected in a network</p>
      <p><strong>Logical Topology:</strong> How data flows through the network regardless of physical layout</p>
    </div>

    <div className="network-topologies">
      <div className="topology-section">
        <h4>Bus Topology</h4>
        <p>All devices are connected to a single central cable called the backbone or bus.</p>
        
        <div className="topology-diagram">
          <p><strong>Diagram:</strong> Device1 --- Device2 --- Device3 --- Device4 --- Device5</p>
        </div>
        
        <div className="advantages-disadvantages">
          <div className="advantages">
            <h5>✓ Advantages:</h5>
            <ul>
              <li>Simple and inexpensive to implement</li>
              <li>Requires less cable than other topologies</li>
              <li>Easy to add new devices</li>
              <li>Good for small networks</li>
            </ul>
          </div>
          
          <div className="disadvantages">
            <h5>✗ Disadvantages:</h5>
            <ul>
              <li>Single point of failure (backbone cable)</li>
              <li>Performance degrades with more devices</li>
              <li>Difficult to troubleshoot problems</li>
              <li>Limited cable length</li>
              <li>Collisions can occur</li>
            </ul>
          </div>
        </div>
        
        <div className="use-cases">
          <h5>Common Use Cases:</h5>
          <ul>
            <li>Early Ethernet networks</li>
            <li>Small office networks</li>
            <li>Temporary setups</li>
          </ul>
        </div>
      </div>

      <div className="topology-section">
        <h4>Star Topology</h4>
        <p>All devices are connected to a central hub or switch, forming a star-like pattern.</p>
        
        <div className="topology-diagram">
          <p><strong>Diagram:</strong></p>
          <pre>
    Device2
        |
Device1 - HUB - Device3
        |
    Device4
          </pre>
        </div>
        
        <div className="advantages-disadvantages">
          <div className="advantages">
            <h5>✓ Advantages:</h5>
            <ul>
              <li>Easy to install and manage</li>
              <li>Failure of one device doesn't affect others</li>
              <li>Easy to detect and isolate faults</li>
              <li>Good performance</li>
              <li>Easy to add/remove devices</li>
            </ul>
          </div>
          
          <div className="disadvantages">
            <h5>✗ Disadvantages:</h5>
            <ul>
              <li>Central hub is single point of failure</li>
              <li>Requires more cable than bus topology</li>
              <li>Hub/switch can be expensive</li>
              <li>Limited by hub/switch capacity</li>
            </ul>
          </div>
        </div>
        
        <div className="use-cases">
          <h5>Common Use Cases:</h5>
          <ul>
            <li>Modern Ethernet networks</li>
            <li>Home networks</li>
            <li>Office LANs</li>
          </ul>
        </div>
      </div>

      <div className="topology-section">
        <h4>Ring Topology</h4>
        <p>Devices are connected in a circular chain, where each device connects to exactly two other devices.</p>
        
        <div className="topology-diagram">
          <p><strong>Diagram:</strong> Device1 → Device2 → Device3 → Device4 → Device1</p>
        </div>
        
        <div className="advantages-disadvantages">
          <div className="advantages">
            <h5>✓ Advantages:</h5>
            <ul>
              <li>Equal access for all devices</li>
              <li>No collisions (token-based access)</li>
              <li>Predictable performance</li>
              <li>Can handle high traffic loads</li>
            </ul>
          </div>
          
          <div className="disadvantages">
            <h5>✗ Disadvantages:</h5>
            <ul>
              <li>Single device failure can break entire network</li>
              <li>Difficult to troubleshoot</li>
              <li>Adding/removing devices disrupts network</li>
              <li>More expensive than bus topology</li>
            </ul>
          </div>
        </div>
        
        <div className="use-cases">
          <h5>Common Use Cases:</h5>
          <ul>
            <li>Token Ring networks (legacy)</li>
            <li>FDDI networks</li>
            <li>Some industrial networks</li>
          </ul>
        </div>
      </div>

      <div className="topology-section">
        <h4>Mesh Topology</h4>
        <p>Devices are interconnected with multiple connections, providing redundant paths for data transmission.</p>
        
        <div className="mesh-types">
          <h5>Types of Mesh Topology:</h5>
          <ul>
            <li><strong>Full Mesh:</strong> Every device connected to every other device</li>
            <li><strong>Partial Mesh:</strong> Some devices have multiple connections, but not all devices are connected to all others</li>
          </ul>
        </div>
        
        <div className="advantages-disadvantages">
          <div className="advantages">
            <h5>✓ Advantages:</h5>
            <ul>
              <li>Highly reliable (multiple paths)</li>
              <li>Excellent fault tolerance</li>
              <li>High performance</li>
              <li>Secure (dedicated connections)</li>
              <li>No single point of failure</li>
            </ul>
          </div>
          
          <div className="disadvantages">
            <h5>✗ Disadvantages:</h5>
            <ul>
              <li>Very expensive (many connections required)</li>
              <li>Complex to install and maintain</li>
              <li>Requires many network interfaces</li>
              <li>Difficult to troubleshoot</li>
            </ul>
          </div>
        </div>
        
        <div className="use-cases">
          <h5>Common Use Cases:</h5>
          <ul>
            <li>Internet backbone</li>
            <li>Critical systems</li>
            <li>Wireless mesh networks</li>
          </ul>
        </div>
      </div>
    </div>
    
    <h2>Network Protocols</h2>
    
    <h3>OSI Model and Protocol Stack</h3>
    <div className="protocol-models">
      <div className="osi-model">
        <h4>OSI (Open Systems Interconnection) Model</h4>
        <p>The OSI model defines 7 layers of network communication, providing a standardized framework for understanding how data moves through a network.</p>
        
        <div className="osi-layers">
          <div className="layer-item">
            <h5>Layer 7: Application Layer</h5>
            <p><strong>Description:</strong> User interface and network services</p>
            <p><strong>Protocols:</strong> HTTP/HTTPS, FTP, SMTP, DNS, DHCP</p>
            <p><strong>Examples:</strong> Web browsers, Email clients, File transfer programs</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 6: Presentation Layer</h5>
            <p><strong>Description:</strong> Data formatting, encryption, compression</p>
            <p><strong>Protocols:</strong> SSL/TLS, JPEG, MPEG, ASCII</p>
            <p><strong>Examples:</strong> Data encryption, Image compression, Character encoding</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 5: Session Layer</h5>
            <p><strong>Description:</strong> Establishes, manages, terminates connections</p>
            <p><strong>Protocols:</strong> NetBIOS, RPC, SQL sessions</p>
            <p><strong>Examples:</strong> Login sessions, Database connections, Video calls</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 4: Transport Layer</h5>
            <p><strong>Description:</strong> Reliable data delivery, error correction</p>
            <p><strong>Protocols:</strong> TCP, UDP, SCTP</p>
            <p><strong>Examples:</strong> Port numbers, Flow control, Error detection</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 3: Network Layer</h5>
            <p><strong>Description:</strong> Routing and logical addressing</p>
            <p><strong>Protocols:</strong> IP, ICMP, OSPF, BGP</p>
            <p><strong>Examples:</strong> IP addresses, Routers, Path determination</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 2: Data Link Layer</h5>
            <p><strong>Description:</strong> Frame formatting, error detection, MAC addressing</p>
            <p><strong>Protocols:</strong> Ethernet, Wi-Fi, PPP, ARP</p>
            <p><strong>Examples:</strong> MAC addresses, Switches, Frame check sequences</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 1: Physical Layer</h5>
            <p><strong>Description:</strong> Physical transmission of raw bits</p>
            <p><strong>Protocols:</strong> Ethernet cables, Fiber optic, Radio waves</p>
            <p><strong>Examples:</strong> Cables, Hubs, Repeaters, Network cards</p>
          </div>
        </div>
      </div>
      
      <div className="tcpip-model">
        <h4>TCP/IP Model (Internet Model)</h4>
        <p>A simplified 4-layer model that is widely used in practice for internet communications.</p>
        
        <div className="tcpip-layers">
          <div className="layer-item">
            <h5>Layer 4: Application Layer</h5>
            <p><strong>Description:</strong> Combines OSI layers 5-7</p>
            <p><strong>Protocols:</strong> HTTP, FTP, SMTP, DNS, DHCP</p>
            <p><strong>OSI Equivalent:</strong> Application, Presentation, Session</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 3: Transport Layer</h5>
            <p><strong>Description:</strong> End-to-end communication</p>
            <p><strong>Protocols:</strong> TCP, UDP</p>
            <p><strong>OSI Equivalent:</strong> Transport</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 2: Internet Layer</h5>
            <p><strong>Description:</strong> Routing and logical addressing</p>
            <p><strong>Protocols:</strong> IP, ICMP, ARP</p>
            <p><strong>OSI Equivalent:</strong> Network</p>
          </div>
          
          <div className="layer-item">
            <h5>Layer 1: Network Access Layer</h5>
            <p><strong>Description:</strong> Physical network access</p>
            <p><strong>Protocols:</strong> Ethernet, Wi-Fi, PPP</p>
            <p><strong>OSI Equivalent:</strong> Data Link, Physical</p>
          </div>
        </div>
      </div>
    </div>
    
    <h3>Common Network Protocols</h3>
    <div className="network-protocols">
      <div className="protocol-category">
        <h4>Internet Application Protocols</h4>
        <div className="protocol-grid">
          <div className="protocol-item">
            <h5>HTTP (HyperText Transfer Protocol)</h5>
            <p><strong>Port:</strong> 80</p>
            <p><strong>Purpose:</strong> Web page transfer</p>
            <p><strong>Example:</strong> Loading websites in a browser</p>
            <p><strong>Secure Version:</strong> HTTPS (port 443)</p>
          </div>
          
          <div className="protocol-item">
            <h5>FTP (File Transfer Protocol)</h5>
            <p><strong>Port:</strong> 21</p>
            <p><strong>Purpose:</strong> File transfer between computers</p>
            <p><strong>Example:</strong> Uploading files to a web server</p>
            <p><strong>Secure Version:</strong> SFTP or FTPS</p>
          </div>
          
          <div className="protocol-item">
            <h5>SMTP (Simple Mail Transfer Protocol)</h5>
            <p><strong>Port:</strong> 25</p>
            <p><strong>Purpose:</strong> Sending email messages</p>
            <p><strong>Example:</strong> Email client sending outgoing mail</p>
            <p><strong>Secure Version:</strong> SMTPS (port 465/587)</p>
          </div>
          
          <div className="protocol-item">
            <h5>POP3 (Post Office Protocol v3)</h5>
            <p><strong>Port:</strong> 110</p>
            <p><strong>Purpose:</strong> Retrieving email from server</p>
            <p><strong>Example:</strong> Downloading email to local client</p>
            <p><strong>Secure Version:</strong> POP3S (port 995)</p>
          </div>
          
          <div className="protocol-item">
            <h5>IMAP (Internet Message Access Protocol)</h5>
            <p><strong>Port:</strong> 143</p>
            <p><strong>Purpose:</strong> Accessing email on server</p>
            <p><strong>Example:</strong> Webmail and synchronized email</p>
            <p><strong>Secure Version:</strong> IMAPS (port 993)</p>
          </div>
          
          <div className="protocol-item">
            <h5>DNS (Domain Name System)</h5>
            <p><strong>Port:</strong> 53</p>
            <p><strong>Purpose:</strong> Translate domain names to IP addresses</p>
            <p><strong>Example:</strong> Converting www.google.com to 142.250.191.14</p>
            <p><strong>Secure Version:</strong> DNS over HTTPS (DoH)</p>
          </div>
        </div>
      </div>
      
      <div className="protocol-category">
        <h4>Transport Protocols</h4>
        <div className="transport-comparison">
          <div className="protocol-item">
            <h5>TCP (Transmission Control Protocol)</h5>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Connection-oriented</li>
                <li>Reliable</li>
                <li>Ordered delivery</li>
                <li>Error correction</li>
                <li>Flow control</li>
              </ul>
            </div>
            <div className="use-cases">
              <h6>Use Cases:</h6>
              <ul>
                <li>Web browsing (HTTP)</li>
                <li>Email (SMTP)</li>
                <li>File transfer (FTP)</li>
                <li>Remote access (SSH)</li>
              </ul>
            </div>
            <p><strong>Overhead:</strong> Higher (due to reliability features)</p>
          </div>
          
          <div className="protocol-item">
            <h5>UDP (User Datagram Protocol)</h5>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Connectionless</li>
                <li>Unreliable</li>
                <li>No ordering guarantee</li>
                <li>No error correction</li>
                <li>Low overhead</li>
              </ul>
            </div>
            <div className="use-cases">
              <h6>Use Cases:</h6>
              <ul>
                <li>Video streaming</li>
                <li>Online gaming</li>
                <li>DNS queries</li>
                <li>DHCP</li>
                <li>Voice over IP</li>
              </ul>
            </div>
            <p><strong>Overhead:</strong> Lower (minimal features)</p>
          </div>
        </div>
      </div>
      
      <div className="protocol-category">
        <h4>Network Layer Protocols</h4>
        <div className="protocol-grid">
          <div className="protocol-item">
            <h5>IPv4 (Internet Protocol version 4)</h5>
            <p><strong>Address Format:</strong> 32-bit (4 octets)</p>
            <p><strong>Example:</strong> 192.168.1.1</p>
            <p><strong>Address Space:</strong> ~4.3 billion addresses</p>
            <div className="features">
              <h6>Features:</h6>
              <ul>
                <li>Widely supported</li>
                <li>Simple</li>
                <li>Well-established</li>
              </ul>
            </div>
          </div>
          
          <div className="protocol-item">
            <h5>IPv6 (Internet Protocol version 6)</h5>
            <p><strong>Address Format:</strong> 128-bit (8 groups of 4 hex digits)</p>
            <p><strong>Example:</strong> 2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
            <p><strong>Address Space:</strong> ~340 undecillion addresses</p>
            <div className="features">
              <h6>Features:</h6>
              <ul>
                <li>Larger address space</li>
                <li>Built-in security</li>
                <li>Better mobile support</li>
              </ul>
            </div>
          </div>
          
          <div className="protocol-item">
            <h5>ICMP (Internet Control Message Protocol)</h5>
            <p><strong>Address Format:</strong> N/A (uses IP)</p>
            <p><strong>Example:</strong> ping, traceroute commands</p>
            <p><strong>Address Space:</strong> N/A</p>
            <div className="features">
              <h6>Features:</h6>
              <ul>
                <li>Error reporting</li>
                <li>Network diagnostics</li>
                <li>Path discovery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Network Hardware and Infrastructure</h2>
    
    <h3>Network Devices and Their Functions</h3>
    <div className="network-hardware">
      <div className="hardware-layer">
        <h4>Physical Layer Devices (Layer 1)</h4>
        <div className="device-grid">
          <div className="device-item">
            <h5>Hub</h5>
            <p><strong>Function:</strong> Repeats electrical signals to all connected devices</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Operates at Physical Layer</li>
                <li>Creates single collision domain</li>
                <li>Half-duplex communication</li>
                <li>Largely obsolete</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Legacy networks (replaced by switches)</p>
          </div>
          
          <div className="device-item">
            <h5>Repeater</h5>
            <p><strong>Function:</strong> Amplifies and regenerates signals over long distances</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Extends network range</li>
                <li>No intelligence</li>
                <li>Simply repeats signals</li>
                <li>Can introduce delays</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Extending cable runs beyond standard limits</p>
          </div>
          
          <div className="device-item">
            <h5>Network Cables</h5>
            <p><strong>Function:</strong> Physical medium for data transmission</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Various types (Cat5e, Cat6, Fiber)</li>
                <li>Different speeds and distances</li>
                <li>Shielded vs unshielded</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Connecting network devices</p>
          </div>
        </div>
      </div>
      
      <div className="hardware-layer">
        <h4>Data Link Layer Devices (Layer 2)</h4>
        <div className="device-grid">
          <div className="device-item">
            <h5>Switch</h5>
            <p><strong>Function:</strong> Forwards frames based on MAC addresses</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Learns MAC addresses</li>
                <li>Creates separate collision domains</li>
                <li>Full-duplex communication</li>
                <li>Can implement VLANs</li>
                <li>Store-and-forward operation</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Unmanaged (plug-and-play)</li>
                <li>Managed (configurable features)</li>
                <li>Layer 3 (routing capable)</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Connecting devices in a LAN</p>
          </div>
          
          <div className="device-item">
            <h5>Bridge</h5>
            <p><strong>Function:</strong> Connects two network segments, filters traffic</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Reduces collision domains</li>
                <li>Learns MAC addresses</li>
                <li>Forwards only necessary traffic</li>
                <li>Can connect different media types</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Transparent bridge</li>
                <li>Source-routing bridge</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Connecting network segments (largely replaced by switches)</p>
          </div>
          
          <div className="device-item">
            <h5>Wireless Access Point (WAP)</h5>
            <p><strong>Function:</strong> Provides wireless connectivity to wired network</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Converts between wired and wireless</li>
                <li>Manages wireless clients</li>
                <li>Implements security protocols</li>
                <li>Can support multiple SSIDs</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Standalone AP</li>
                <li>Controller-based AP</li>
                <li>Mesh AP</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Providing Wi-Fi access in buildings</p>
          </div>
        </div>
      </div>
      
      <div className="hardware-layer">
        <h4>Network Layer Devices (Layer 3)</h4>
        <div className="device-grid">
          <div className="device-item">
            <h5>Router</h5>
            <p><strong>Function:</strong> Routes packets between different networks using IP addresses</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Operates at Network Layer</li>
                <li>Maintains routing tables</li>
                <li>Connects different networks</li>
                <li>Implements NAT and firewall features</li>
                <li>Can run routing protocols</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Home/SOHO router</li>
                <li>Enterprise router</li>
                <li>Core router</li>
                <li>Edge router</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Connecting LANs to WANs, internet connectivity</p>
          </div>
          
          <div className="device-item">
            <h5>Layer 3 Switch</h5>
            <p><strong>Function:</strong> Combines switching and routing capabilities</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Fast switching at Layer 2</li>
                <li>Routing between VLANs</li>
                <li>Hardware-based routing</li>
                <li>High port density</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Distribution switch</li>
                <li>Core switch</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Inter-VLAN routing in enterprise networks</p>
          </div>
          
          <div className="device-item">
            <h5>Firewall</h5>
            <p><strong>Function:</strong> Controls network traffic based on security rules</p>
            <div className="characteristics">
              <h6>Characteristics:</h6>
              <ul>
                <li>Packet filtering</li>
                <li>Stateful inspection</li>
                <li>Application-layer filtering</li>
                <li>VPN capabilities</li>
                <li>Intrusion prevention</li>
              </ul>
            </div>
            <div className="types">
              <h6>Types:</h6>
              <ul>
                <li>Hardware firewall</li>
                <li>Software firewall</li>
                <li>Next-generation firewall</li>
              </ul>
            </div>
            <p><strong>Use Case:</strong> Network security and access control</p>
          </div>
        </div>
      </div>
    </div>
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