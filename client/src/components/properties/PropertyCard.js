import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useProperty } from '../../contexts/PropertyContext';
import {
  HeartIcon,
  MapPinIcon,
  HomeIcon,
  BanknotesIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const PropertyCard = ({ property, viewMode = 'grid', showOwnerActions = false }) => {
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite, deleteProperty } = useProperty();

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(property._id)) {
      await removeFromFavorites(property._id);
    } else {
      await addToFavorites(property._id);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(property._id);
    }
  };

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <Link to={`/properties/${property._id}`} className="flex">
          {/* Image */}
          <div className="w-80 h-48 relative overflow-hidden">
            <img
              src={primaryImage?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-gold text-white px-2 py-1 rounded-full text-xs font-medium">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            </div>
            {property.featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-charcoal line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center space-x-2">
                {user?.role === 'buyer' && (
                  <button
                    onClick={handleFavoriteToggle}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isFavorite(property._id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                )}
                {showOwnerActions && (
                  <>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location.address}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <HomeIcon className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} BHK</span>
              </div>
              <div>
                <span>{property.area.total} sq ft</span>
              </div>
              <div className="flex items-center">
                <EyeIcon className="w-4 h-4 mr-1" />
                <span>{property.views} views</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gold">
                  {formatPrice(property.price.amount)}
                </p>
                {property.price.pricePerSqft && (
                  <p className="text-sm text-gray-500">
                    ₹{property.price.pricePerSqft}/sq ft
                  </p>
                )}
              </div>
              
              {property.aiScore?.overall && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">AI Score</div>
                  <div className="text-lg font-bold text-green-600">
                    {property.aiScore.overall.toFixed(1)}/10
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
    >
      <Link to={`/properties/${property._id}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={primaryImage?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-gold text-white px-2 py-1 rounded-full text-xs font-medium">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </span>
          </div>
          {property.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex space-x-2">
            {user?.role === 'buyer' && (
              <button
                onClick={handleFavoriteToggle}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                {isFavorite(property._id) ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            )}
            {showOwnerActions && (
              <>
                <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <PencilIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-charcoal mb-2 line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPinIcon className="w-4 h-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.location.address}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <HomeIcon className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} BHK</span>
              </div>
              <div>
                <span>{property.area.total} sq ft</span>
              </div>
            </div>
            <div className="flex items-center">
              <EyeIcon className="w-4 h-4 mr-1" />
              <span>{property.views}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gold">
                {formatPrice(property.price.amount)}
              </p>
              {property.price.pricePerSqft && (
                <p className="text-xs text-gray-500">
                  ₹{property.price.pricePerSqft}/sq ft
                </p>
              )}
            </div>
            
            {property.aiScore?.overall && (
              <div className="text-right">
                <div className="text-xs text-gray-600">AI Score</div>
                <div className="text-sm font-bold text-green-600">
                  {property.aiScore.overall.toFixed(1)}/10
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;