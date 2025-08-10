import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';
import { ParticleBackground } from '../ParticleBackground';
import { Download, ArrowDown, Home, User, Briefcase, Code, MessageCircle, Rss } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'articles', label: 'Articles', icon: Rss },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
];

const FloatingSkillIcon: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>
    </Float>
  );
};

const Scene3D: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingSkillIcon text="React" position={[-2, 1, 0]} />
      <FloatingSkillIcon text="TypeScript" position={[2, -1, 0]} />
      <FloatingSkillIcon text="Node.js" position={[0, 2, -1]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext, activeSection = 'hero', onSectionChange }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <ParticleBackground variant="hero" />
      
      {/* Header Navigation */}
      <motion.header
        className="relative z-20 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            JD
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange?.(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <motion.button
              className="p-2 glass rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="relative z-10 text-center section-padding max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-primary">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-hero gradient-text font-bold mb-6"
          >
            John Developer
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Full-stack developer crafting beautiful, interactive digital experiences with
            cutting-edge technologies and modern design principles.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              className="btn-hero"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onScrollToNext}
            >
              <span>View My Work</span>
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center space-x-2 glass rounded-xl px-6 py-3 hover-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Skill Icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill, index) => (
              <motion.div
                key={skill}
                className="glass rounded-lg px-4 py-2 text-sm font-medium"
                whileHover={{ scale: 1.1, rotate: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={onScrollToNext}
              className="p-2 rounded-full glass hover-glow"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowDown className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};