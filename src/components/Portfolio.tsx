import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ArticlesSection } from './sections/ArticlesSection';
import { ContactSection } from './sections/ContactSection';

const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'about', component: AboutSection },
  { id: 'projects', component: ProjectsSection },
  { id: 'skills', component: SkillsSection },
  { id: 'articles', component: ArticlesSection },
  { id: 'contact', component: ContactSection },
];

export const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection) return;

    setIsTransitioning(true);
    setActiveSection(sectionId);
    
    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  const handleScrollToNext = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    const nextIndex = currentIndex + 1;
    if (nextIndex < sections.length) {
      handleSectionChange(sections[nextIndex].id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = sections.findIndex(section => section.id === activeSection);
        const nextIndex = currentIndex + 1;
        if (nextIndex < sections.length) {
          handleSectionChange(sections[nextIndex].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = sections.findIndex(section => section.id === activeSection);
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          handleSectionChange(sections[prevIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.05,
    },
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.5,
  };

  const renderSection = (section: typeof sections[0]) => {
    const Component = section.component;
    
    switch (section.id) {
      case 'hero':
        return <HeroSection onScrollToNext={handleScrollToNext} />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'articles':
        return <ArticlesSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <Component />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />

        {/* Main Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {sections.map((section) => {
              return activeSection === section.id ? (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="min-h-screen"
                >
                  {renderSection(section)}
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </main>

        {/* Section Indicators */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
          <div className="space-y-3">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-primary border-primary scale-125'
                    : 'border-neutral-600 hover:border-neutral-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 z-50 bg-background flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};