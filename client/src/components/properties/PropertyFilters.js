import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PropertyFilters = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hyderabadAreas = [
    'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City',
    'Kondapur', 'Madhapur', 'Kukatpally', 'Miyapur', 'Secunderabad',
    'Begumpet', 'Ameerpet', 'Somajiguda', 'Punjagutta', 'Lakdi Ka Pul',
    'Mehdipatnam', 'Tolichowki', 'Manikonda', 'Nanakramguda'
  ];

  const propertyTypes = [
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'land', label: 'Land/Plot' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  const bedroomOptions = [
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4 BHK' },
    { value: '5', label: '5+ BHK' }
  ];

  const priceRanges = [
    { min: '', max: '', label: 'Any Price' },
    { min: '0', max: '5000000', label: 'Under ₹50L' },
    { min: '5000000', max: '10000000', label: '₹50L - ₹1Cr' },
    { min: '10000000', max: '20000000', label: '₹1Cr - ₹2Cr' },
    { min: '20000000', max: '50000000', label: '₹2Cr - ₹5Cr' },
    { min: '50000000', max: '', label: 'Above ₹5Cr' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({
      minPrice: range.min,
      maxPrice: range.max
    });
  };

  const clearFilters = () => {
    onFilterChange({
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

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'createdAt' && value !== 'desc'
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 btn-outline w-full justify-center"
        >
          <FunnelIcon className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-gold text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent
          filters={filters}
          hyderabadAreas={hyderabadAreas}
          propertyTypes={propertyTypes}
          bedroomOptions={bedroomOptions}
          priceRanges={priceRanges}
          handleFilterChange={handleFilterChange}
          handlePriceRangeChange={handlePriceRangeChange}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Filter Properties
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <FilterContent
                  filters={filters}
                  hyderabadAreas={hyderabadAreas}
                  propertyTypes={propertyTypes}
                  bedroomOptions={bedroomOptions}
                  priceRanges={priceRanges}
                  handleFilterChange={handleFilterChange}
                  handlePriceRangeChange={handlePriceRangeChange}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full sm:w-auto"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

const FilterContent = ({
  filters,
  hyderabadAreas,
  propertyTypes,
  bedroomOptions,
  priceRanges,
  handleFilterChange,
  handlePriceRangeChange,
  clearFilters,
  hasActiveFilters
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-charcoal">Filters</h2>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-gold hover:text-accent-600 font-medium"
        >
          Clear All
        </button>
      )}
    </div>

    <div className="space-y-6">
      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="">All Areas</option>
          {hyderabadAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => handlePriceRangeChange(range)}
                className="mr-2 text-gold focus:ring-gold"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="">All Types</option>
          {propertyTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bedrooms
        </label>
        <select
          value={filters.bedrooms}
          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="">Any</option>
          {bedroomOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            handleFilterChange('sortBy', sortBy);
            handleFilterChange('sortOrder', sortOrder);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price.amount-asc">Price: Low to High</option>
          <option value="price.amount-desc">Price: High to Low</option>
          <option value="area.total-desc">Area: Large to Small</option>
          <option value="area.total-asc">Area: Small to Large</option>
        </select>
      </div>
    </div>
  </div>
);

export default PropertyFilters;