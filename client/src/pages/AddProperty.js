import React from 'react';
import { motion } from 'framer-motion';

const AddProperty = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-charcoal font-playfair mb-4">
            Add New Property
          </h1>
          <p className="text-gray-600 mb-6">
            Create a new property listing with AI-powered descriptions
          </p>
          <p className="text-gray-500">
            This page will contain a comprehensive form for adding property details,
            uploading images, setting pricing, and generating AI descriptions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty;