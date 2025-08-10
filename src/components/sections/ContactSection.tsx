import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParticleBackground } from '../ParticleBackground';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-gray-400' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com', color: 'hover:text-red-400' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', color: 'hover:text-pink-400' },
];

const codingProfiles = [
  { name: 'LeetCode', href: 'https://leetcode.com', icon: '💻' },
  { name: 'CodeForces', href: 'https://codeforces.com', icon: '🏆' },
  { name: 'HackerRank', href: 'https://hackerrank.com', icon: '🎯' },
  { name: 'CodeChef', href: 'https://codechef.com', icon: '👨‍🍳' },
];

export const ContactSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

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
    <section ref={ref} className="relative min-h-screen section-padding overflow-hidden">
      <ParticleBackground variant="contact" />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-accent mb-4">
            Get In Touch
          </span>
          <h2 className="text-section gradient-text mb-6">
            Let's Work Together
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
            I'm always excited to work on new challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Information */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold gradient-text mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-neutral-300">Email</p>
                    <p className="font-medium">john.developer@email.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-neutral-300">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-neutral-300">Location</p>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold gradient-text mb-6">
                Follow Me
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-xl transition-all duration-300 ${link.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Coding Profiles */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold gradient-text mb-6">
                Coding Profiles
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {codingProfiles.map((profile) => (
                  <motion.a
                    key={profile.name}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 glass rounded-xl hover-glow transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{profile.icon}</span>
                    <span className="font-medium">{profile.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};