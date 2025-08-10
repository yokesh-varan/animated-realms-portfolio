import React from 'react';
import { motion } from 'framer-motion';

interface AbstractBackgroundProps {
  variant?: 'hero' | 'about' | 'projects' | 'skills' | 'contact' | 'articles' | string;
}

export const AbstractBackground: React.FC<AbstractBackgroundProps> = ({ variant = 'hero' }) => {
  const getShapeColor = (index: number) => {
    const colors = {
      hero: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'],
      about: ['hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--primary))'],
      projects: ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--secondary))'],
      skills: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))'],
      contact: ['hsl(var(--secondary))', 'hsl(var(--primary))', 'hsl(var(--accent))'],
      articles: ['hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--primary))'],
    };
    return colors[variant][index % 3];
  };

  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-neutral-950 to-background opacity-90" />
      
      {/* Animated Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.id % 4 === 0 && (
            <div
              className="w-full h-full rounded-full blur-xl"
              style={{
                background: `radial-gradient(circle, ${getShapeColor(shape.id)}/0.3, transparent)`,
              }}
            />
          )}
          {shape.id % 4 === 1 && (
            <div
              className="w-full h-full blur-xl"
              style={{
                background: `linear-gradient(45deg, ${getShapeColor(shape.id)}/0.2, transparent)`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          )}
          {shape.id % 4 === 2 && (
            <div
              className="w-full h-full rounded-lg blur-xl"
              style={{
                background: `conic-gradient(from 0deg, ${getShapeColor(shape.id)}/0.3, transparent, ${getShapeColor(shape.id)}/0.2)`,
              }}
            />
          )}
          {shape.id % 4 === 3 && (
            <div
              className="w-full h-full blur-xl"
              style={{
                background: `radial-gradient(ellipse, ${getShapeColor(shape.id)}/0.25, transparent)`,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: `radial-gradient(circle, ${getShapeColor(0)}, transparent)` }}
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.5, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
        style={{ background: `radial-gradient(circle, ${getShapeColor(1)}, transparent)` }}
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 200, -50, 0],
          scale: [1, 0.7, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${getShapeColor(2)} 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
};