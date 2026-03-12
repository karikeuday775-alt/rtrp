import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProperty } from '../contexts/PropertyContext';
import PropertyCard from '../components/properties/PropertyCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { HeartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Favorites = () => {
  const { favorites } = useProperty();
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteProperties();
  }, [favorites]);

  const fetchFavoriteProperties = async () => {
    try {
      setLoading(true);
      if (favorites.length === 0) {
        setFavoriteProperties([]);
        return;
      }

      // Fetch full property details for each favorite
      const propertyPromises = favorites.map(fav => 
        axios.get(`/api/properties/${fav.propertyId}`)
      );
      
      const responses = await Promise.all(propertyPromises);
      const properties = responses.map(response => response.data.property);
      setFavoriteProperties(properties);
    } catch (error) {
      console.error('Error fetching favorite properties:', error);
      setFavoriteProperties([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <HeartIcon className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-charcoal font-playfair">
              Favorite Properties
            </h1>
          </div>
          <p className="text-gray-600">
            {favoriteProperties.length > 0 
              ? `You have ${favoriteProperties.length} saved ${favoriteProperties.length === 1 ? 'property' : 'properties'}`
              : 'You haven\'t saved any properties yet'
            }
          </p>
        </motion.div>

        {/* Properties Grid */}
        {favoriteProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favoriteProperties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard property={property} viewMode="grid" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-6">
              <HeartIcon className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              No favorite properties yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring properties and save the ones you like by clicking the heart icon. 
              They'll appear here for easy access.
            </p>
            <motion.a
              href="/properties"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              Browse Properties
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;