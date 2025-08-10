import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';
import { ParticleBackground } from '../ParticleBackground';
import { Download, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

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

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground variant="hero" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
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
    </section>
  );
};