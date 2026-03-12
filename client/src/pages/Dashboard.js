import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProperty } from '../contexts/PropertyContext';
import {
  BuildingOfficeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { properties, loading, getRecommendations } = useProperty();
  const [stats, setStats] = useState({
    totalProperties: 0,
    favorites: 0,
    messages: 0,
    views: 0
  });
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recommendations for buyers
      if (user.role === 'buyer') {
        const recs = await getRecommendations(user.id);
        setRecommendations(recs.slice(0, 3)); // Show top 3
      }

      // Mock stats - in real app, fetch from API
      setStats({
        totalProperties: user.role === 'seller' ? 5 : 150,
        favorites: user.role === 'buyer' ? 12 : 0,
        messages: 8,
        views: user.role === 'seller' ? 245 : 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getDashboardCards = () => {
    const baseCards = [
      {
        title: 'Messages',
        value: stats.messages,
        icon: ChatBubbleLeftRightIcon,
        color: 'bg-blue-500',
        link: '/messages'
      }
    ];

    if (user.role === 'buyer') {
      return [
        {
          title: 'Available Properties',
          value: stats.totalProperties,
          icon: BuildingOfficeIcon,
          color: 'bg-green-500',
          link: '/properties'
        },
        {
          title: 'Favorites',
          value: stats.favorites,
          icon: HeartIcon,
          color: 'bg-red-500',
          link: '/favorites'
        },
        ...baseCards
      ];
    }

    if (user.role === 'seller') {
      return [
        {
          title: 'My Properties',
          value: stats.totalProperties,
          icon: BuildingOfficeIcon,
          color: 'bg-green-500',
          link: '/properties'
        },
        {
          title: 'Total Views',
          value: stats.views,
          icon: EyeIcon,
          color: 'bg-purple-500',
          link: '/properties'
        },
        ...baseCards
      ];
    }

    return baseCards;
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
          <h1 className="text-3xl font-bold text-charcoal font-playfair">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to your {user?.role} dashboard
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getDashboardCards().map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={card.link}
                  className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center">
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-charcoal">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            {user?.role === 'seller' && (
              <Link
                to="/add-property"
                className="flex items-center space-x-2 btn-primary"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Property</span>
              </Link>
            )}
            <Link
              to="/properties"
              className="flex items-center space-x-2 btn-outline"
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              <span>Browse Properties</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center space-x-2 btn-outline"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>Messages</span>
            </Link>
          </div>
        </motion.div>

        {/* Recommendations for Buyers */}
        {user?.role === 'buyer' && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((property, index) => (
                <div
                  key={property._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={property.images?.[0]?.url || 'https://via.placeholder.com/300x200'}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-charcoal mb-1">
                    {property.title}
                  </h3>
                  <p className="text-gold font-bold mb-1">
                    ₹{property.price.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {property.location.address}
                  </p>
                  <Link
                    to={`/properties/${property._id}`}
                    className="text-sm text-gold hover:text-accent-600 mt-2 inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;