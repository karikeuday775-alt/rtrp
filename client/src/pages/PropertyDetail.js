import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProperty } from '../contexts/PropertyContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageGallery from '../components/property/ImageGallery';
import PropertyInfo from '../components/property/PropertyInfo';
import ChatBox from '../components/property/ChatBox';
import SimilarProperties from '../components/property/SimilarProperties';
import {
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import toast from 'react-hot-toast';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useProperty();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data.property);
      
      // Fetch similar properties
      const similarResponse = await axios.get(`/api/properties?propertyType=${response.data.property.type}&limit=4`);
      setSimilarProperties(similarResponse.data.properties.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Property not found');
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    if (isFavorite(property._id)) {
      await removeFromFavorites(property._id);
    } else {
      await addToFavorites(property._id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-charcoal transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Properties</span>
            </button>
            
            <div className="flex items-center space-x-4">
              {user?.role === 'buyer' && (
                <button
                  onClick={handleFavoriteToggle}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  {isFavorite(property._id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                  <span>{isFavorite(property._id) ? 'Saved' : 'Save'}</span>
                </button>
              )}
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <ShareIcon className="w-5 h-5 text-gray-600" />
                <span>Share</span>
              </button>
              
              {user?.role === 'buyer' && (
                <button
                  onClick={() => setShowChat(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Contact Seller</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={property.images} title={property.title} />
            
            {/* Property Information */}
            <PropertyInfo property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="text-3xl font-bold text-gold mb-2">
                  ₹{property.price.amount.toLocaleString()}
                </div>
                {property.price.pricePerSqft && (
                  <div className="text-gray-600 mb-4">
                    ₹{property.price.pricePerSqft}/sq ft
                  </div>
                )}
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{property.location.address}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-charcoal">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-charcoal">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-charcoal">{property.area.total}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                </div>

                {property.aiScore?.overall && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">AI Investment Score</span>
                      <span className="text-lg font-bold text-green-600">
                        {property.aiScore.overall.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(property.aiScore.overall / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {user?.role === 'buyer' && (
                  <button
                    onClick={() => setShowChat(true)}
                    className="w-full btn-primary py-3"
                  >
                    Contact Seller
                  </button>
                )}
              </motion.div>

              {/* Seller Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-charcoal mb-4">Seller Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <div className="font-medium">{property.seller?.name || property.ownerContact?.name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <div className="font-medium">{property.ownerContact?.phone}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <div className="font-medium">{property.seller?.email || property.ownerContact?.email}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <SimilarProperties properties={similarProperties} />
          </div>
        )}
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <ChatBox
            property={property}
            seller={property.seller}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyDetail;