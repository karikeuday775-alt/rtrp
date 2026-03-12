const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Mock messages storage (in real app, use database)
let messages = [];

// Get user conversations
router.get('/', auth, async (req, res) => {
  try {
    const userMessages = messages.filter(
      msg => msg.senderId === req.user.userId || msg.receiverId === req.user.userId
    );

    res.json({ messages: userMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
});

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, propertyId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({
        message: 'Receiver ID and message are required'
      });
    }

    const newMessage = {
      id: Date.now().toString(),
      senderId: req.user.userId,
      receiverId,
      propertyId,
      message,
      timestamp: new Date(),
      read: false
    };

    messages.push(newMessage);

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      message: 'Failed to send message',
      error: error.message
    });
  }
});

// Get conversation between two users
router.get('/:conversationId', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    // In a real app, conversationId would be properly structured
    const conversationMessages = messages.filter(
      msg => msg.senderId === conversationId || msg.receiverId === conversationId
    );

    res.json({ messages: conversationMessages });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({
      message: 'Failed to fetch conversation',
      error: error.message
    });
  }
});

module.exports = router;