import React, { useState } from 'react';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { FeatureFocusSection } from './components/FeatureFocusSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { PhilosophySection } from './components/PhilosophySection';
import { KineticLabSection } from './components/KineticLabSection';
import { RecognitionSection } from './components/RecognitionSection';
import { CommissionSection } from './components/CommissionSection';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/atelierData';
import type { Project } from './types';

export const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [commissionPrefill, setCommissionPrefill] = useState<string | undefined>(undefined);

  const selectedProject: Project | null = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || null
    : null;

  const handleOpenCommission = (prefillTitle?: string) => {
    setCommissionPrefill(prefillTitle);
    const element = document.getElementById('commission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-bone relative selection:bg-cadmium selection:text-obsidian">
      {/* Magnetic Contextual Custom Cursor */}
      <CustomCursor />

      {/* Global Architectural Navigation */}
      <Header onOpenCommission={() => handleOpenCommission()} />

      {/* Main Page Sections */}
      <main>
        {/* 01. HERO // The Kinetic Spatial Monolith */}
        <HeroSection onOpenCommission={() => handleOpenCommission()} />

        {/* 02. MANIFESTO // Editorial Thesis & Concept Lens */}
        <ManifestoSection />

        {/* 03. ARCHITECTURAL FOCUS // Kronos Monolith 4-Layer X-Ray */}
        <FeatureFocusSection onOpenProject={(id) => setSelectedProjectId(id)} />

        {/* 04. SPATIAL ARCHIVES // Curated Monographs & Projects */}
        <ProjectsSection onOpenProject={(id) => setSelectedProjectId(id)} />

        {/* 05. PHILOSOPHY ESSAY // The Quiet Editorial Room */}
        <PhilosophySection />

        {/* 06. THE KINETIC LAB // Interactive Physics Sandbox */}
        <KineticLabSection />

        {/* 07. RECOGNITION & DIALOGUES // Global Citations & Awards */}
        <RecognitionSection />

        {/* 08. COMMISSIONS & TERMINAL // Scope Estimator & Intake */}
        <CommissionSection prefillProjectTitle={commissionPrefill} />
      </main>

      {/* Architectural Colophon & Clocks */}
      <Footer />

      {/* Archival Case Study Drawer Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onOpenCommission={(title) => handleOpenCommission(title)}
      />
    </div>
  );
};

export default App;
