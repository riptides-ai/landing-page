import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WaitlistForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/your-email@domain.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          _subject: 'New Riptides Waitlist Signup'
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            Be the first to know
          </h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    error && !firstName ? 'border-red-300 focus:border-red-500' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none transition-colors duration-200`}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    error && !lastName ? 'border-red-300 focus:border-red-500' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none transition-colors duration-200`}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    error ? 'border-red-300 focus:border-red-500' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none transition-colors duration-200`}
                  required
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-4 px-6 rounded-lg
                  font-semibold text-white text-lg
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-700 hover:to-blue-600
                  shadow-lg hover:shadow-blue-500/25
                  transition-all duration-200
                  relative overflow-hidden
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Processing...' : 'Join Waitlist'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                We respect your privacy. Your email will only be used for updates about Riptides.
              </p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Thank you for joining!</h3>
              <p className="text-blue-700">
                We'll keep you updated on our progress and let you know when we launch.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistForm;