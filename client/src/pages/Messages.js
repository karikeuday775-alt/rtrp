import React from 'react';
import { motion } from 'framer-motion';

const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-charcoal font-playfair mb-4">
            Messages
          </h1>
          <p className="text-gray-600 mb-6">
            Real-time messaging between buyers and sellers
          </p>
          <p className="text-gray-500">
            This page will contain a chat interface with conversation history,
            typing indicators, and real-time notifications.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;