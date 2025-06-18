import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg text-blue-700">
            Want to learn more or get in touch? Email us at{' '}
            <a 
              href="mailto:contact@riptides.ai" 
              className="text-primary hover:text-blue-800 font-medium transition-colors duration-200 underline decoration-blue-300 hover:decoration-blue-500"
            >
              contact@riptides.ai
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;