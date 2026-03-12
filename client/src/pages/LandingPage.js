import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  SparklesIcon,
  MapPinIcon,
  CubeTransparentIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Search',
      description: 'Find your perfect property with intelligent recommendations and natural language search.'
    },
    {
      icon: MapPinIcon,
      title: 'Interactive Maps',
      description: 'Explore properties with detailed maps, neighborhood insights, and location analytics.'
    },
    {
      icon: CubeTransparentIcon,
      title: '3D Virtual Tours',
      description: 'Experience properties in immersive 3D before visiting, saving time and effort.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Direct Communication',
      description: 'Connect directly with property owners without intermediaries or agent fees.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Verified Listings',
      description: 'All properties are verified for authenticity and accuracy by our AI systems.'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Premium Experience',
      description: 'Luxury-focused platform designed for high-end real estate transactions.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Premium Properties' },
    { number: '5,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Cities Covered' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
              Discover
              <span className="text-gold block">Extraordinary</span>
              Properties
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              AI-powered luxury real estate marketplace where buyers and sellers connect directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/role-selection"
                className="btn-secondary text-lg px-8 py-4"
              >
                Start Your Journey
              </Link>
              <Link
                to="/properties"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-charcoal"
              >
                Explore Properties
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal font-playfair mb-4">
              Why Choose LuxeEstate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of real estate with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-playfair mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-300">
              Join our growing community of satisfied users
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white font-playfair mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of satisfied users who found their perfect home with LuxeEstate
            </p>
            <Link
              to="/role-selection"
              className="btn-secondary text-lg px-8 py-4 inline-block"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;