const slides = [
  {
    title: 'Presentation Roadmap',
    description:
      'Switching enables communication networks to route information efficiently. This session reviews major techniques, trade-offs, and where each excels.',
    bullets: [
      'Define switching and why networks rely on it',
      'Explore circuit, packet, and message switching',
      'Compare strengths, limitations, and applications'
    ]
  },
  {
    title: 'What Is Switching?',
    description:
      'Switching refers to directing data from an input port to the correct output port across an interconnected network.',
    bullets: [
      'Establishes temporary or permanent paths between communicating devices',
      'Optimizes resource usage while meeting quality demands',
      'Underpins telephony, data networks, and industrial communication'
    ]
  },
  {
    title: 'Circuit Switching Essentials',
    description:
      'Circuit switching sets up a dedicated end-to-end communication path before data transmission begins.',
    bullets: [
      'Three phases: call setup, data transfer, teardown',
      'Resources (bandwidth, timeslots) reserved for the session',
      'Used in traditional PSTN and legacy WAN services (e.g., ISDN)'
    ]
  },
  {
    title: 'Circuit Switching Advantages',
    description: 'Deterministic connections suit real-time and latency-sensitive services.',
    bullets: [
      'Guaranteed bandwidth and predictable delay once the circuit is established',
      'No packet overhead or reordering since data follows a fixed path',
      'Simplifies synchronization for voice and streamed media'
    ]
  },
  {
    title: 'Circuit Switching Limitations',
    description: 'Continuous resource allocation can hinder scalability and efficiency.',
    bullets: [
      'Idle periods waste reserved capacity during silence or bursty traffic',
      'Call blocking occurs under high demand because circuits are finite',
      'Setup latency makes short-lived data exchanges inefficient'
    ]
  },
  {
    title: 'Packet Switching Essentials',
    description:
      'Packet switching breaks data into independent packets routed dynamically through the network.',
    bullets: [
      'Supports datagram mode (connectionless) and virtual circuit mode (connection-oriented)',
      'Routers forward packets based on destination addresses and routing tables',
      'Foundation of the Internet, local area networks, and modern cloud backbones'
    ]
  },
  {
    title: 'Packet Switching Advantages',
    description: 'Statistical multiplexing drives efficient link utilization.',
    bullets: [
      'Shared bandwidth adapts to bursty data patterns across users',
      'Automatic rerouting around failures improves resiliency',
      'Flexible QoS policies via priority queues and traffic engineering'
    ]
  },
  {
    title: 'Packet Switching Limitations',
    description: 'Dynamic routing introduces uncertainty that must be managed.',
    bullets: [
      'Variable latency and jitter can disrupt real-time flows without QoS controls',
      'Packet overhead from headers and acknowledgements reduces payload efficiency',
      'Congestion requires complex algorithms (e.g., TCP congestion control)'
    ]
  },
  {
    title: 'Message Switching Essentials',
    description:
      'Message switching stores entire messages at intermediate nodes before forwarding.',
    bullets: [
      '"Store-and-forward" operation eliminates the need for a dedicated path',
      'Messages routed based on addressing metadata and availability',
      'Historically used in telegraph networks and some military systems'
    ]
  },
  {
    title: 'Message Switching Advantages',
    description: 'Useful when connections are intermittent or bandwidth constrained.',
    bullets: [
      'Links never reserved exclusively, maximizing shared medium usage',
      'Supports prioritization and alternate routing with full-message context',
      'Handles heterogeneous message sizes without fragmentation'
    ]
  },
  {
    title: 'Message Switching Limitations',
    description: 'Buffering entire messages introduces significant delay and storage needs.',
    bullets: [
      'High latency unsuitable for interactive communication',
      'Requires large memory at switching nodes to store messages',
      'Failure at an intermediate node can delay multiple messages'
    ]
  },
  {
    title: 'Hybrid & Emerging Approaches',
    description:
      'Modern networks mix techniques to balance efficiency, determinism, and scalability.',
    bullets: [
      'Multi-Protocol Label Switching (MPLS) blends circuit-like labels with packet cores',
      'Software-Defined Networking (SDN) centralizes path control for agility',
      'Time-Sensitive Networking (TSN) extends Ethernet with deterministic scheduling'
    ]
  },
  {
    title: 'Notable Applications',
    description: 'Each switching technique maps to domains with matching service requirements.',
    bullets: [
      'Circuit: public switched telephone networks, leased lines, optical transport',
      'Packet: Internet backbones, enterprise LANs, 5G core networks',
      'Message: delay-tolerant networking, satellite store-and-forward relays'
    ]
  },
  {
    title: 'Comparative Snapshot',
    description: 'Key trade-offs guide architectural choices.',
    bullets: [
      'Efficiency: packet > message > circuit for bursty traffic',
      'Latency control: circuit > packet (with QoS) > message',
      'Complexity: message (simpler routing) < circuit < packet (dynamic control)'
    ]
  },
  {
    title: 'Key Takeaways & Next Steps',
    description:
      'Selecting a switching technique depends on service guarantees, cost, and scalability goals.',
    bullets: [
      'No single technique dominates; hybrid designs prevail in modern infrastructures',
      'QoS engineering and traffic analytics mitigate disadvantages',
      'Future research explores intent-based networking and AI-driven switching decisions'
    ]
  }
];

let currentIndex = 0;

const slideEl = document.getElementById('slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const counterEl = document.getElementById('counter');
const barFillEl = document.getElementById('barFill');

const renderSlide = () => {
  const { title, description, bullets } = slides[currentIndex];
  slideEl.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <ul>
      ${bullets.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;

  counterEl.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
  const progress = ((currentIndex + 1) / slides.length) * 100;
  barFillEl.style.width = `${progress}%`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
};

const goToSlide = (index) => {
  if (index < 0 || index >= slides.length) return;
  currentIndex = index;
  renderSlide();
};

prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'ArrowRight' || key === ' ') {
    event.preventDefault();
    goToSlide(currentIndex + 1);
  } else if (key === 'ArrowLeft') {
    goToSlide(currentIndex - 1);
  } else if (key === 'Home') {
    goToSlide(0);
  } else if (key === 'End') {
    goToSlide(slides.length - 1);
  }
});

renderSlide();
