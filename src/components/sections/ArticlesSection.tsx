import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParticleBackground } from '../ParticleBackground';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  href: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn best practices for structuring large React applications using TypeScript, including advanced patterns and performance optimization techniques.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'React',
    image: '⚛️',
    href: '#',
  },
  {
    id: '2',
    title: 'The Future of Web Development: WebAssembly and Beyond',
    excerpt: 'Exploring emerging technologies that are shaping the future of web development, including WebAssembly, Web3, and edge computing.',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Web Development',
    image: '🚀',
    href: '#',
  },
  {
    id: '3',
    title: 'Optimizing Performance in Modern JavaScript Applications',
    excerpt: 'A comprehensive guide to performance optimization techniques, from code splitting to lazy loading and beyond.',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Performance',
    image: '⚡',
    href: '#',
  },
];

export const ArticlesSection: React.FC = () => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section ref={ref} className="relative min-h-screen section-padding overflow-hidden">
      <ParticleBackground variant="default" />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-secondary mb-4">
            Latest Articles
          </span>
          <h2 className="text-section gradient-text mb-6">
            Featured Articles
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, technology trends, 
            and best practices from my experience in the field.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="glass rounded-2xl overflow-hidden hover-glow group cursor-pointer"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Article Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                {article.image}
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-medium text-white mb-3">
                  {article.category}
                </span>

                {/* Article Title */}
                <h3 className="text-xl font-semibold gradient-text mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <motion.a
                  href={article.href}
                  className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-secondary transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Articles Button */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="btn-hero inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Articles</span>
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};