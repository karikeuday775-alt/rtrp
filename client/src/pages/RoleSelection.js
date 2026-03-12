import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  BuildingOfficeIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuth();

  const roles = [
    {
      id: 'buyer',
      title: 'Buyer',
      description: 'Find and purchase your dream property',
      icon: HomeIcon,
      features: [
        'Browse premium properties',
        'AI-powered recommendations',
        'Direct seller communication',
        'Save favorites & compare',
        '3D virtual tours'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'seller',
      title: 'Seller',
      description: 'List and sell your property directly',
      icon: BuildingOfficeIcon,
      features: [
        'List properties for free',
        'AI-generated descriptions',
        'Direct buyer communication',
        'Upload 3D tours',
        'Analytics & insights'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage platform and users',
      icon: CogIcon,
      features: [
        'User management',
        'Property verification',
        'Platform analytics',
        'Content moderation',
        'System administration'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal font-playfair mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to use our platform to get started with the perfect experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleRoleSelect(role.id)}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${role.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {role.title}
                  </h3>
                  <p className="text-center text-white/90">
                    {role.description}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button className="w-full bg-charcoal text-white py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200">
                    Continue as {role.title}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">
            Already have an account?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="text-gold hover:text-accent-600 font-medium transition-colors"
          >
            Sign in to your existing account
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;