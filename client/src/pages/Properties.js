import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProperty } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyFilters from '../components/properties/PropertyFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Properties = () => {
  const { user } = useAuth();
  const { properties, loading, searchProperties, filters, updateFilters } = useProperty();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchProperties(searchQuery);
    }
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

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
          <h1 className="text-3xl font-bold text-charcoal font-playfair mb-4">
            {user?.role === 'seller' ? 'My Properties' : 'Discover Properties'}
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, property type, or keywords..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
            >
              Search
            </button>
          </form>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80"
          >
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </motion.div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-between items-center mb-6"
            >
              <p className="text-gray-600">
                {loading ? 'Searching...' : `${properties.length} properties found`}
              </p>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-gold text-white'
                        : 'text-gray-600 hover:text-charcoal'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list'
                        ? 'bg-gold text-white'
                        : 'text-gray-600 hover:text-charcoal'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Properties Grid/List */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {properties.length > 0 ? (
                  properties.map((property, index) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <PropertyCard
                        property={property}
                        viewMode={viewMode}
                        showOwnerActions={user?.role === 'seller'}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No properties found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;