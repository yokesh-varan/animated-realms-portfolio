import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParticleBackground } from '../ParticleBackground';
import { Code, Coffee, Lightbulb, Rocket } from 'lucide-react';

export const AboutSection: React.FC = () => {
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

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Lightbulb, label: 'Ideas Realized', value: '25+' },
    { icon: Rocket, label: 'Years Experience', value: '5+' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center section-padding overflow-hidden">
      <ParticleBackground variant="about" />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 glass rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-secondary mb-4"
              >
                About Me
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-section gradient-text mb-6"
              >
                Passionate Developer & Problem Solver
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="space-y-4 text-neutral-300 leading-relaxed">
              <p>
                I'm a full-stack developer with a passion for creating innovative digital solutions 
                that make a real impact. With 5+ years of experience in web development, I specialize 
                in building scalable applications using modern technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community through 
                articles and talks.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="glass rounded-xl p-6 text-center hover-glow"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};