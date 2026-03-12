import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatBox = ({ property, seller, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      // In a real app, you'd fetch conversation between buyer and seller for this property
      const response = await axios.get(`/api/messages`);
      // Filter messages for this property/seller combination
      const propertyMessages = response.data.messages.filter(
        msg => msg.propertyId === property._id
      );
      setMessages(propertyMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const messageData = {
        receiverId: seller._id || seller.id,
        propertyId: property._id,
        message: newMessage.trim()
      };

      const response = await axios.post('/api/messages', messageData);
      
      // Add message to local state
      setMessages(prev => [...prev, response.data.data]);
      setNewMessage('');
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">
                {seller?.name || property.ownerContact?.name}
              </h3>
              <p className="text-sm text-gray-600">Property Owner</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Property Info */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex space-x-3">
            <img
              src={property.images?.[0]?.url || 'https://via.placeholder.com/60x60'}
              alt={property.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-charcoal truncate">{property.title}</h4>
              <p className="text-sm text-gray-600 truncate">{property.location.address}</p>
              <p className="text-sm font-semibold text-gold">
                ₹{property.price.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Start a conversation about this property</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId === user.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.senderId === user.id
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-charcoal'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === user.id ? 'text-gold-200' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatBox;