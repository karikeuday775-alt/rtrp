import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    area: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchFavorites();
    loadSearchHistory();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`/api/properties?${queryParams}`);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/api/favorites');
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const addToFavorites = async (propertyId) => {
    try {
      await axios.post('/api/favorites', { propertyId });
      setFavorites(prev => [...prev, { propertyId }]);
      toast.success('Added to favorites');
    } catch (error) {
      toast.error('Failed to add to favorites');
    }
  };

  const removeFromFavorites = async (propertyId) => {
    try {
      await axios.delete(`/api/favorites/${propertyId}`);
      setFavorites(prev => prev.filter(fav => fav.propertyId !== propertyId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove from favorites');
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.propertyId === propertyId);
  };

  const addProperty = async (propertyData) => {
    try {
      const response = await axios.post('/api/properties', propertyData);
      setProperties(prev => [response.data.property, ...prev]);
      toast.success('Property added successfully');
      return { success: true, property: response.data.property };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add property';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateProperty = async (propertyId, propertyData) => {
    try {
      const response = await axios.put(`/api/properties/${propertyId}`, propertyData);
      setProperties(prev => 
        prev.map(prop => 
          prop._id === propertyId ? response.data.property : prop
        )
      );
      toast.success('Property updated successfully');
      return { success: true, property: response.data.property };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update property';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      await axios.delete(`/api/properties/${propertyId}`);
      setProperties(prev => prev.filter(prop => prop._id !== propertyId));
      toast.success('Property deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete property';
      toast.error(message);
      return { success: false, message };
    }
  };

  const searchProperties = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/properties/search?q=${encodeURIComponent(searchQuery)}`);
      setProperties(response.data.properties);
      
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      return response.data.properties;
    } catch (error) {
      console.error('Error searching properties:', error);
      toast.error('Search failed');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (userId) => {
    try {
      const response = await axios.get(`/api/recommendations/${userId}`);
      return response.data.recommendations;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };

  const loadSearchHistory = () => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      area: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const value = {
    properties,
    loading,
    filters,
    favorites,
    searchHistory,
    fetchProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getRecommendations,
    updateFilters,
    resetFilters,
    clearSearchHistory
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};