import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, MessageCircle, FileText, Rss } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'articles', label: 'Articles', icon: Rss },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="glass rounded-2xl p-4 space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="h-5 w-5" />
                
                {/* Tooltip */}
                <motion.div
                  className="absolute left-16 top-1/2 -translate-y-1/2 glass rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.button
        className="fixed top-6 left-6 z-50 lg:hidden glass rounded-full p-3"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
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
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-6 right-6 glass rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};