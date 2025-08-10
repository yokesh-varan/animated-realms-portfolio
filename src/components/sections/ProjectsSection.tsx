import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParticleBackground } from '../ParticleBackground';
import { ExternalLink, Github, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  category: 'web' | 'mobile' | 'desktop';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React, Node.js, and PostgreSQL. Features include real-time inventory management, payment processing, and advanced analytics.',
    image: '🛒',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'web',
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'An intelligent task management app that uses machine learning to prioritize tasks and suggest optimal scheduling. Built with React Native and Python.',
    image: '🤖',
    tech: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'mobile',
  },
  {
    id: '3',
    title: 'Real-time Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization, built using React, D3.js, and WebSocket connections.',
    image: '📊',
    tech: ['React', 'D3.js', 'WebSocket', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'web',
  },
];

export const ProjectsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'desktop', label: 'Desktop Apps' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen section-padding overflow-hidden">
      <ParticleBackground variant="projects" />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-accent mb-4">
            My Work
          </span>
          <h2 className="text-section gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for creating 
            innovative digital solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === filterItem.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'glass hover:bg-neutral-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterItem.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden hover-glow cursor-pointer group"
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                  {project.image}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold gradient-text mb-3">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-300">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 glass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Project Details */}
              <div className="mb-6">
                <div className="text-6xl mb-4 text-center">{selectedProject.image}</div>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 glass rounded-xl px-6 py-3 hover-glow transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Github className="h-5 w-5" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};