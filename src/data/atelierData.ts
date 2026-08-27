import type { Project, RecognitionItem, PressQuote } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'monolith-pavilion',
    title: 'KRONOS MONOLITH PAVILION',
    subtitle: 'Brutalist Speculative Observatory & Kinetic Sound Chamber',
    category: 'pavilions',
    year: '2026',
    location: 'Reykjavik Volcanic Plateau, Iceland',
    client: 'Nordic Centre for Speculative Futures',
    heroImage: '/assets/hero_monolith.jpg',
    galleryImages: [
      '/assets/hero_monolith.jpg',
      '/assets/tokyo_biennale.jpg',
      '/assets/spatial_scenography.jpg'
    ],
    excerpt: 'A monolithic carbon-titanium spatial volume embedded in volcanic basalt, designed to focus polar sunlight and sub-acoustic seismic resonances.',
    fullDescription: 'Forged from ultra-dense obsidian carbon composite and heat-tempered titanium alloy, the Kronos Monolith is an autonomous architectural instrument. Its kinetic perimeter facades mechanically expand and contract along geometric axes based on ambient barometric pressure and diurnal solar angles, forming an ever-shifting silhouette against the subarctic horizon.',
    dimensions: '3,850 m² Floor Area / 28m Peak Height',
    materials: ['Oxidized Titanium Alloy', 'Obsidian Carbon Composite', 'Low-Iron Monolithic Glass', 'Cast Basalt Slabs'],
    engineeringHighlights: [
      'Kinetic facade actuation powered by sub-permafrost geothermal differentials.',
      'Precision acoustic resonance chamber tuned to 432 Hz seismic oscillations.',
      'Thermal mass retention engineered for -40°C arctic conditions without external heating.'
    ],
    accolades: [
      'Venice Biennale of Architecture — Golden Lion for Spatial Innovation (2026)',
      'World Architecture Festival — Future Project of the Year'
    ],
    metrics: [
      { label: 'Total Mass', value: '1,420 Metric Tons' },
      { label: 'Kinetic Tolerance', value: '± 0.4 mm' },
      { label: 'Energy Self-Sufficiency', value: '100% Geothermal' },
      { label: 'Acoustic Reverberation', value: '4.8s Controlled Decay' }
    ]
  },
  {
    id: 'velocite-scenography',
    title: 'VÉLOCITÉ HAUTE SCENOGRAPHY',
    subtitle: 'Synchronized Kinetic Runway & Volumetric Light Choreography',
    category: 'scenography',
    year: '2026',
    location: 'Grand Palais Éphémère, Paris',
    client: 'Maison de Haute Couture Paris',
    heroImage: '/assets/spatial_scenography.jpg',
    galleryImages: [
      '/assets/spatial_scenography.jpg',
      '/assets/tokyo_biennale.jpg',
      '/assets/generative_pavilion.jpg'
    ],
    excerpt: 'A dynamic architectural runway comprising 32 synchronized brushed-titanium kinetic monoliths that rotate to restructure spatial corridors in real time.',
    fullDescription: 'Conceived as an architectural manifestation of speed and compression, the Vélocité scenography replaces static set design with an alive, robotic environment. 32 colossal fins rotate in multi-axis polyrhythms, creating dramatic chiaroscuro light tunnels that guide models while transforming the spatial perception of 2,400 spectators.',
    dimensions: '1,800 m² Runway Arena / 14m Articulated Fin Height',
    materials: ['Brushed Aerospace Titanium', 'Acoustic Dampening Velvet Carbon', 'DMX-ArtNet Motorized Gimbal Columns', 'Ultra-Black Matte Concrete'],
    engineeringHighlights: [
      'Millisecond-precision DMX synchronization between motorized fins and live audio frequencies.',
      'Zero-backlash robotic rotary actuators with silent magnetic deceleration.',
      'Adaptive laser projection mapping dynamically calibrated to fin angles in real time.'
    ],
    accolades: [
      'Design Week Awards — Best Spatial Exhibition',
      'ADC Global Gold Cube — Spatial & Scenography Design'
    ],
    metrics: [
      { label: 'Kinetic Fins', value: '32 Articulated Units' },
      { label: 'Rotational Velocity', value: '45° / second' },
      { label: 'Audience Capacity', value: '2,400 Seats' },
      { label: 'Sync Latency', value: '< 2.4 ms' }
    ]
  },
  {
    id: 'parametric-luminary',
    title: 'PARAMETRIC LUMINARY LAB',
    subtitle: 'Continuous-Ribbon Carbon Bio-Pavilion',
    category: 'pavilions',
    year: '2025',
    location: 'Arashiyama Biosphere Reserve, Kyoto',
    client: 'Kyoto Institute of Computational Craft',
    heroImage: '/assets/generative_pavilion.jpg',
    galleryImages: [
      '/assets/generative_pavilion.jpg',
      '/assets/hero_monolith.jpg',
      '/assets/quantum_hardware.jpg'
    ],
    excerpt: 'An uninterrupted single-loop carbon fiber shell with edge-luminescent quantum glass ribbons weaving through ancient Japanese cedar canopy.',
    fullDescription: 'The Luminary Lab investigates topological continuum in architecture. Through multi-agent generative computation, the structure was algorithmically grown to optimize solar gain, structural tension, and minimal soil disruption. At night, embedded phosphor-luminescent ribbons illuminate internal work studios with warm, diffuse amber photons.',
    dimensions: '1,450 m² Internal Area / 72m Continuous Ribbon Loop',
    materials: ['Continuous-Strand Carbon Weave', 'Edge-Luminescent Quantum Glass', 'Charred Yakisugi Cedar', 'Poured Pervious Aggregate'],
    engineeringHighlights: [
      'Autonomous 6-axis robotic filament winding fabrication on-site.',
      'Zero internal structural columns across a 48-meter clear span.',
      'Biophilic natural ventilation channeling micro-climatic mountain drafts.'
    ],
    accolades: [
      'Pritzker Foundation Special Commendation for Generative Tectonics',
      'Architectural Review Experimental Architecture Award'
    ],
    metrics: [
      { label: 'Clear Span', value: '48 Meters' },
      { label: 'Shell Thickness', value: '18 mm Ultra-Thin' },
      { label: 'Carbon Saved', value: '84% vs Concrete' },
      { label: 'Robotic Print Hours', value: '420 Hours' }
    ]
  },
  {
    id: 'hyperion-core-hardware',
    title: 'HYPERION // CORE 01',
    subtitle: 'Haptic Spatial Controller & Quantum Optical Interface',
    category: 'hardware',
    year: '2026',
    location: 'Zurich Spatial Hardware Atelier',
    client: 'Hyperion Special Projects Division',
    heroImage: '/assets/quantum_hardware.jpg',
    galleryImages: [
      '/assets/quantum_hardware.jpg',
      '/assets/hero_monolith.jpg',
      '/assets/spatial_scenography.jpg'
    ],
    excerpt: 'A monolithic tabletop spatial transducer milled from a single billet of ceramic obsidian, housing a magnetic quantum optical core for tactile digital manipulation.',
    fullDescription: 'Bridging physical architectural models with computational spatial simulations, the Core 01 is an ultra-tactile physical instrument. Rotating its faceted obsidian petals dynamically shifts magnetic resistance, granting architects tangible physical resistance when manipulating complex generative geometries in virtual space.',
    dimensions: '220 mm × 220 mm × 180 mm / 4.2 kg Solid Monobloc',
    materials: ['Ceramic Obsidian Zirconia', 'Grade 5 Aerospace Titanium', 'Synthetic Amber Crystal Prism', 'Neodymium Magnetic Levitation Array'],
    engineeringHighlights: [
      'Micro-milled 5-axis CNC tolerance within 2 microns.',
      'Active magnetic eddy-current haptic feedback simulation.',
      'Internal 60fps optical tracking of ambient refractive light shifts.'
    ],
    accolades: [
      'Red Dot: Best of the Best in Industrial Design',
      'iF Design Gold Award — Hardware Excellence'
    ],
    metrics: [
      { label: 'Machining Precision', value: '± 0.002 mm' },
      { label: 'Magnetic Torque', value: '3.8 Nm Dynamic Range' },
      { label: 'Optical Sensor Bandwidth', value: '1,000 Hz' },
      { label: 'Mass', value: '4.2 kg Solid' }
    ]
  },
  {
    id: 'void-resonance-biennale',
    title: 'VOID & RESONANCE',
    subtitle: 'Levitating Volumetric Light & Acoustic Suspension',
    category: 'generative',
    year: '2025',
    location: 'Arsenale di Venezia, Venice',
    client: 'La Biennale di Venezia',
    heroImage: '/assets/tokyo_biennale.jpg',
    galleryImages: [
      '/assets/tokyo_biennale.jpg',
      '/assets/spatial_scenography.jpg',
      '/assets/generative_pavilion.jpg'
    ],
    excerpt: 'A suspended field of 18 floating illuminated monolithic glass prisms that harmonize acoustic reverberations and project volumetric light rays.',
    fullDescription: 'Suspended in the historic cavernous brick halls of Venice, Void & Resonance transforms architectural space into an ethereal contemplative instrument. As visitors walk through the mist-filled hall, their movement ripples through ultrasonic distance arrays, causing the suspended glass monoliths to oscillate in light warmth and low-frequency overtone chords.',
    dimensions: '3,200 m³ Volumetric Spatial Installation',
    materials: ['Acoustic Optical Glass Prisms', 'Kevlar Suspension Cables', 'High-CRI Warm Amber Projector Arrays', 'Ultrasonic Presence Transceivers'],
    engineeringHighlights: [
      'Real-time swarm spatial algorithm governing prism illumination and kinetic swing.',
      'Active spatial audio beamforming directed at individual visitor pathways.',
      'Volumetric micro-particulate atmospheric vapor modulation.'
    ],
    accolades: [
      'Venice Biennale Special Jury Mention',
      'FRAME Awards — Spatial Installation of the Year'
    ],
    metrics: [
      { label: 'Prism Count', value: '18 Levitating Units' },
      { label: 'Spatial Volume', value: '3,200 m³' },
      { label: 'Visitors Experienced', value: '320,000+' },
      { label: 'Harmonic Layers', value: '12 Generative Chords' }
    ]
  }
];

export const RECOGNITIONS: RecognitionItem[] = [
  {
    year: '2026',
    award: 'Site of the Year // Nominee & Innovation Gold',
    category: 'Digital Scenography & Creative Direction',
    project: 'HYPERION ATELIER SPATIAL PORTAL',
    organization: 'Awwwards / FWA of the Day',
    image: '/assets/hero_monolith.jpg'
  },
  {
    year: '2026',
    award: 'Golden Lion for Spatial Innovation',
    category: 'Speculative Architecture & Pavilion Design',
    project: 'KRONOS MONOLITH PAVILION',
    organization: 'La Biennale di Venezia',
    image: '/assets/hero_monolith.jpg'
  },
  {
    year: '2026',
    award: 'ADC Global Gold Cube',
    category: 'Spatial Scenography & Experiential Craft',
    project: 'VÉLOCITÉ PARIS RUNWAY',
    organization: 'Art Directors Club New York',
    image: '/assets/spatial_scenography.jpg'
  },
  {
    year: '2025',
    award: 'Pritzker Generative Tectonics Prize',
    category: 'Algorithmic Bio-Architecture',
    project: 'PARAMETRIC LUMINARY LAB',
    organization: 'Kyoto Institute of Architecture',
    image: '/assets/generative_pavilion.jpg'
  },
  {
    year: '2025',
    award: 'Best of the Best: Industrial Hardware',
    category: 'Spatial Computing Physical Artifacts',
    project: 'HYPERION CORE 01 TRANSDUCER',
    organization: 'Red Dot International Design Council',
    image: '/assets/quantum_hardware.jpg'
  },
  {
    year: '2025',
    award: 'Spatial Installation of the Year',
    category: 'Volumetric Light & Acoustic Atmosphere',
    project: 'VOID & RESONANCE',
    organization: 'FRAME Awards Amsterdam',
    image: '/assets/tokyo_biennale.jpg'
  }
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    quote: 'Hyperion does not design buildings; they sculpt monumental tectonic choreographies that challenge the boundary between physical matter and computational intelligence.',
    author: 'Elena Rostova',
    publication: 'Architectural Digest International',
    year: '2026'
  },
  {
    quote: 'The most audacious spatial design studio of the decade. Their Paris scenography turned the runway into a living, breathing titanium organism.',
    author: 'Jean-Luc Vasseur',
    publication: 'Le Monde Scénographie',
    year: '2026'
  },
  {
    quote: 'A radical synthesis of brutalist weight and ethereal digital ephemerality. Hyperion creates the architectural archetypes of 2050 today.',
    author: 'Kenzo Takahashi',
    publication: 'Tokyo Spatial Journal',
    year: '2025'
  }
];

export const ATELIER_MANIFESTO = [
  {
    number: '01',
    title: 'TECTONIC COMPUTATION',
    description: 'We reject static architecture. Matter must be imbued with mechanical kinetic intelligence, transforming rigid shelter into dynamic ecological organisms.'
  },
  {
    number: '02',
    title: 'CHIAROSCURO SCALE',
    description: 'Light possesses physical mass. We sculpt space through deep obsidian voids slashed by deliberate, razor-sharp ribbons of warm solar amber.'
  },
  {
    number: '03',
    title: 'PHYSICAL-DIGITAL HYBRIDITY',
    description: 'Virtual space without physical weight is meaningless. Physical space without computational responsiveness is obsolete. We exist at their collision point.'
  }
];

export const GLOBAL_STUDIOS = [
  { city: 'TOKYO', country: 'JAPAN', timezone: 'Asia/Tokyo', code: 'NRT // 35.6762° N' },
  { city: 'ZURICH', country: 'SWITZERLAND', timezone: 'Europe/Zurich', code: 'ZRH // 47.3769° N' },
  { city: 'PARIS', country: 'FRANCE', timezone: 'Europe/Paris', code: 'CDG // 48.8566° N' },
  { city: 'NEW YORK', country: 'UNITED STATES', timezone: 'America/New_York', code: 'JFK // 40.7128° N' }
];
