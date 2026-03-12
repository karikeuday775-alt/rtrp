const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['villa', 'apartment', 'land', 'commercial', 'penthouse'],
    required: true
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true, default: 'Hyderabad' },
    state: { type: String, default: 'Telangana' },
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    neighborhood: String
  },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    pricePerSqft: Number
  },
  area: {
    total: { type: Number, required: true }, // in sq ft
    built: Number,
    carpet: Number
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String,
    enum: [
      'parking', 'gym', 'swimming_pool', 'garden', 'security',
      'elevator', 'power_backup', 'water_supply', 'internet',
      'air_conditioning', 'balcony', 'terrace', 'club_house',
      'children_play_area', 'jogging_track', 'library'
    ]
  }],
  images: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  virtualTour: {
    url: String,
    type: { type: String, enum: ['360', '3d', 'video'] }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerContact: {
    name: String,
    phone: String,
    email: String
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'pending', 'inactive'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  aiScore: {
    investment: { type: Number, min: 0, max: 10 },
    location: { type: Number, min: 0, max: 10 },
    amenities: { type: Number, min: 0, max: 10 },
    overall: { type: Number, min: 0, max: 10 }
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: Date,
    documents: [{
      type: String,
      url: String
    }]
  }
}, {
  timestamps: true
});

// Indexes for better query performance
propertySchema.index({ 'location.city': 1, type: 1, 'price.amount': 1 });
propertySchema.index({ seller: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ 'location.coordinates': '2dsphere' });

// Calculate AI scores before saving
propertySchema.pre('save', function(next) {
  if (this.isNew || this.isModified(['location', 'amenities', 'price', 'area'])) {
    this.calculateAIScores();
  }
  next();
});

propertySchema.methods.calculateAIScores = function() {
  // Location score based on area (simplified)
  const locationScores = {
    'Banjara Hills': 9.5,
    'Jubilee Hills': 9.0,
    'Gachibowli': 8.5,
    'Hitech City': 8.0,
    'Kondapur': 7.5,
    'Madhapur': 8.0,
    'Kukatpally': 7.0,
    'Miyapur': 6.5,
    'Secunderabad': 7.5,
    'Begumpet': 7.0
  };

  this.aiScore.location = locationScores[this.location.neighborhood] || 6.0;

  // Amenities score
  const amenityWeights = {
    'swimming_pool': 1.5,
    'gym': 1.2,
    'security': 1.0,
    'parking': 0.8,
    'elevator': 0.6,
    'garden': 0.7,
    'club_house': 1.3
  };

  let amenityScore = 5.0;
  this.amenities.forEach(amenity => {
    amenityScore += (amenityWeights[amenity] || 0.3);
  });
  this.aiScore.amenities = Math.min(amenityScore, 10);

  // Investment score (simplified calculation)
  const pricePerSqft = this.price.amount / this.area.total;
  const avgPricePerSqft = 5000; // Average price per sqft in Hyderabad
  
  let investmentScore = 5.0;
  if (pricePerSqft < avgPricePerSqft * 0.8) investmentScore += 2;
  else if (pricePerSqft < avgPricePerSqft) investmentScore += 1;
  else if (pricePerSqft > avgPricePerSqft * 1.5) investmentScore -= 1;

  this.aiScore.investment = Math.max(Math.min(investmentScore, 10), 1);

  // Overall score
  this.aiScore.overall = (
    this.aiScore.location * 0.4 +
    this.aiScore.amenities * 0.3 +
    this.aiScore.investment * 0.3
  );
};

module.exports = mongoose.model('Property', propertySchema);