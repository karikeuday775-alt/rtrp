import React from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  MapPinIcon,
  CubeIcon,
  SparklesIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const PropertyInfo = ({ property }) => {
  const amenityIcons = {
    parking: '🚗',
    gym: '🏋️',
    swimming_pool: '🏊',
    garden: '🌳',
    security: '🔒',
    elevator: '🛗',
    power_backup: '⚡',
    water_supply: '💧',
    internet: '📶',
    air_conditioning: '❄️',
    balcony: '🏠',
    terrace: '🏔️',
    club_house: '🏛️',
    children_play_area: '🎮',
    jogging_track: '🏃',
    library: '📚'
  };

  const formatAmenityName = (amenity) => {
    return amenity.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Title and Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-charcoal mb-4 font-playfair">
          {property.title}
        </h1>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span>{property.location.address}, {property.location.city}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <HomeIcon className="w-5 h-5 text-gold" />
            <div>
              <div className="text-sm text-gray-600">Type</div>
              <div className="font-semibold capitalize">{property.type}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CubeIcon className="w-5 h-5 text-gold" />
            <div>
              <div className="text-sm text-gray-600">Area</div>
              <div className="font-semibold">{property.area.total} sq ft</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <HomeIcon className="w-5 h-5 text-gold" />
            <div>
              <div className="text-sm text-gray-600">Bedrooms</div>
              <div className="font-semibold">{property.bedrooms}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <HomeIcon className="w-5 h-5 text-gold" />
            <div>
              <div className="text-sm text-gray-600">Bathrooms</div>
              <div className="font-semibold">{property.bathrooms}</div>
            </div>
          </div>
        </div>

        {property.featured && (
          <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium">
            <SparklesIcon className="w-4 h-4" />
            <span>Featured Property</span>
          </div>
        )}
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-charcoal mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </motion.div>

      {/* Area Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-charcoal mb-4">Area Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-charcoal">{property.area.total}</div>
            <div className="text-sm text-gray-600">Total Area (sq ft)</div>
          </div>
          {property.area.built && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-charcoal">{property.area.built}</div>
              <div className="text-sm text-gray-600">Built-up Area (sq ft)</div>
            </div>
          )}
          {property.area.carpet && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-charcoal">{property.area.carpet}</div>
              <div className="text-sm text-gray-600">Carpet Area (sq ft)</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-charcoal mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{amenityIcons[amenity] || '✨'}</span>
                <span className="text-sm font-medium text-gray-700">
                  {formatAmenityName(amenity)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Scores */}
      {property.aiScore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <ChartBarIcon className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-semibold text-charcoal">AI Property Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {property.aiScore.location && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {property.aiScore.location.toFixed(1)}/10
                </div>
                <div className="text-sm text-gray-600">Location Score</div>
              </div>
            )}
            {property.aiScore.amenities && (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {property.aiScore.amenities.toFixed(1)}/10
                </div>
                <div className="text-sm text-gray-600">Amenities Score</div>
              </div>
            )}
            {property.aiScore.investment && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {property.aiScore.investment.toFixed(1)}/10
                </div>
                <div className="text-sm text-gray-600">Investment Score</div>
              </div>
            )}
            {property.aiScore.overall && (
              <div className="text-center p-4 bg-gold/10 rounded-lg">
                <div className="text-2xl font-bold text-gold">
                  {property.aiScore.overall.toFixed(1)}/10
                </div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Location Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-charcoal mb-4">Location Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Neighborhood:</span>
            <span className="font-medium">{property.location.neighborhood}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">City:</span>
            <span className="font-medium">{property.location.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">State:</span>
            <span className="font-medium">{property.location.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pincode:</span>
            <span className="font-medium">{property.location.pincode}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyInfo;