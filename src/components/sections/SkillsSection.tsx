import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { ParticleBackground } from '../ParticleBackground';

interface SkillCategory {
  title: string;
  skills: Array<{
    name: string;
    level: number;
    icon: string;
  }>;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '📘' },
      { name: 'Next.js', level: 85, icon: '🔥' },
      { name: 'Tailwind CSS', level: 90, icon: '🎨' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'PostgreSQL', level: 80, icon: '🐘' },
      { name: 'MongoDB', level: 75, icon: '🍃' },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90, icon: '📋' },
      { name: 'Docker', level: 80, icon: '🐳' },
      { name: 'AWS', level: 75, icon: '☁️' },
      { name: 'Figma', level: 85, icon: '🎯' },
    ],
  },
];

const Skill3D: React.FC<{ skill: any; position: [number, number, number] }> = ({ skill, position }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>
      <Text
        position={[position[0], position[1] - 0.6, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </Float>
  );
};

const Skills3DScene: React.FC = () => {
  const positions: [number, number, number][] = [
    [-2, 1, 0], [2, 1, 0], [0, 0, 1], [-1, -1, 0], [1, -1, 0],
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {skillCategories[0].skills.slice(0, 5).map((skill, index) => (
        <Skill3D
          key={skill.name}
          skill={skill}
          position={positions[index]}
        />
      ))}
    </>
  );
};

export const SkillsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section ref={ref} className="relative min-h-screen section-padding overflow-hidden">
      <ParticleBackground variant="default" />
      
      {/* 3D Skills Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Skills3DScene />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-section gradient-text mb-6">
            Technical Proficiency
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across 
            different technologies and tools.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass rounded-2xl p-6 hover-glow"
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              <h3 className="text-xl font-semibold gradient-text mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{
                      delay: categoryIndex * 0.2 + skillIndex * 0.1,
                      duration: 0.5,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="font-medium text-neutral-200">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          duration: 1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};