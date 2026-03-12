import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../properties/PropertyCard';

const SimilarProperties = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-charcoal font-playfair mb-6">
        Similar Properties
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PropertyCard property={property} viewMode="grid" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarProperties;