export type ProjectCategory = 'all' | 'scenography' | 'pavilions' | 'generative' | 'hardware';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'scenography' | 'pavilions' | 'generative' | 'hardware';
  year: string;
  location: string;
  client: string;
  heroImage: string;
  galleryImages: string[];
  excerpt: string;
  fullDescription: string;
  dimensions: string;
  materials: string[];
  engineeringHighlights: string[];
  accolades: string[];
  metrics: { label: string; value: string }[];
}

export type XRayLayer = 'realized' | 'wireframe' | 'thermal' | 'structural';

export interface LabParameters {
  fluidity: number;       // 0 - 100
  latticeTension: number; // 0 - 100
  entropy: number;        // 0 - 100
  luminescence: number;   // 0 - 100
  preset: 'vortex' | 'crystal' | 'quantum' | 'tectonic';
}

export interface RecognitionItem {
  year: string;
  award: string;
  category: string;
  project: string;
  organization: string;
  image: string;
}

export interface PressQuote {
  quote: string;
  author: string;
  publication: string;
  year: string;
}
