const fs = require('fs');
const path = require('path');

// Property templates for different areas
const areas = [
  {
    name: "Banjara Hills",
    pincode: "500034",
    coordinates: { lat: 17.4126, lng: 78.4486 },
    priceMultiplier: 1.2
  },
  {
    name: "Jubilee Hills", 
    pincode: "500033",
    coordinates: { lat: 17.4239, lng: 78.4738 },
    priceMultiplier: 1.3
  },
  {
    name: "Gachibowli",
    pincode: "500032", 
    coordinates: { lat: 17.4435, lng: 78.3772 },
    priceMultiplier: 1.0
  },
  {
    name: "Hitech City",
    pincode: "500081",
    coordinates: { lat: 17.4483, lng: 78.3915 },
    priceMultiplier: 1.1
  },
  {
    name: "Kondapur",
    pincode: "500084",
    coordinates: { lat: 17.4616, lng: 78.3646 },
    priceMultiplier: 0.9
  },
  {
    name: "Madhapur",
    pincode: "500081",
    coordinates: { lat: 17.4485, lng: 78.3908 },
    priceMultiplier: 1.0
  },
  {
    name: "Kukatpally",
    pincode: "500072",
    coordinates: { lat: 17.4851, lng: 78.4056 },
    priceMultiplier: 0.7
  },
  {
    name: "Miyapur",
    pincode: "500049",
    coordinates: { lat: 17.4967, lng: 78.3563 },
    priceMultiplier: 0.6
  },
  {
    name: "Secunderabad",
    pincode: "500003",
    coordinates: { lat: 17.4399, lng: 78.4983 },
    priceMultiplier: 0.8
  },
  {
    name: "Begumpet",
    pincode: "500016",
    coordinates: { lat: 17.4399, lng: 78.4482 },
    priceMultiplier: 0.9
  },
  {
    name: "Ameerpet",
    pincode: "500016",
    coordinates: { lat: 17.4374, lng: 78.4482 },
    priceMultiplier: 0.8
  },
  {
    name: "Somajiguda",
    pincode: "500082",
    coordinates: { lat: 17.4239, lng: 78.4738 },
    priceMultiplier: 1.0
  },
  {
    name: "Punjagutta",
    pincode: "500082",
    coordinates: { lat: 17.4326, lng: 78.4594 },
    priceMultiplier: 0.9
  },
  {
    name: "Lakdi Ka Pul",
    pincode: "500004",
    coordinates: { lat: 17.4011, lng: 78.4593 },
    priceMultiplier: 0.8
  },
  {
    name: "Mehdipatnam",
    pincode: "500028",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    priceMultiplier: 0.7
  },
  {
    name: "Tolichowki",
    pincode: "500008",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    priceMultiplier: 0.7
  },
  {
    name: "Manikonda",
    pincode: "500089",
    coordinates: { lat: 17.4026, lng: 78.3618 },
    priceMultiplier: 0.8
  },
  {
    name: "Nanakramguda",
    pincode: "500032",
    coordinates: { lat: 17.4239, lng: 78.3618 },
    priceMultiplier: 0.9
  }
];

const propertyTypes = [
  {
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: { total: 800, built: 720, carpet: 640 },
    basePrice: 3000000,
    amenities: ["parking", "security", "elevator", "power_backup"]
  },
  {
    type: "apartment", 
    bedrooms: 2,
    bathrooms: 2,
    area: { total: 1200, built: 1080, carpet: 960 },
    basePrice: 4500000,
    amenities: ["parking", "security", "elevator", "power_backup", "water_supply"]
  },
  {
    type: "apartment",
    bedrooms: 3, 
    bathrooms: 3,
    area: { total: 1800, built: 1620, carpet: 1440 },
    basePrice: 7000000,
    amenities: ["parking", "gym", "swimming_pool", "security", "elevator", "club_house"]
  },
  {
    type: "villa",
    bedrooms: 3,
    bathrooms: 4,
    area: { total: 2500, built: 2250, carpet: 2000 },
    basePrice: 12000000,
    amenities: ["parking", "garden", "security", "power_backup", "water_supply"]
  },
  {
    type: "villa",
    bedrooms: 4,
    bathrooms: 5,
    area: { total: 3500, built: 3150, carpet: 2800 },
    basePrice: 18000000,
    amenities: ["parking", "gym", "swimming_pool", "garden", "security", "elevator"]
  }
];

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560449752-c4b8b5b8b3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const imageCaptions = [
  "Property exterior view",
  "Living room interior", 
  "Master bedroom",
  "Modern kitchen",
  "Bathroom with premium fixtures",
  "Balcony with city view",
  "Dining area",
  "Guest bedroom",
  "Swimming pool area",
  "Garden and outdoor space",
  "Building entrance",
  "Parking area"
];

const names = [
  "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Suresh Reddy", "Lakshmi Devi",
  "Venkat Rao", "Meera Singh", "Arjun Reddy", "Kavitha Nair", "Ravi Kumar",
  "Sanjay Gupta", "Deepika Sharma", "Vikram Singh", "Anita Desai", "Kiran Reddy",
  "Sunita Agarwal", "Mahesh Babu", "Rekha Patel", "Anil Kumar", "Pooja Gupta"
];

function generateProperty(area, propertyTemplate, index) {
  const finalPrice = Math.round(propertyTemplate.basePrice * area.priceMultiplier);
  const pricePerSqft = Math.round(finalPrice / propertyTemplate.area.total);
  
  return {
    title: `${propertyTemplate.type === 'villa' ? 'Beautiful' : 'Modern'} ${propertyTemplate.bedrooms}BHK ${propertyTemplate.type === 'villa' ? 'Villa' : 'Apartment'} in ${area.name}`,
    description: `${propertyTemplate.type === 'villa' ? 'Independent villa' : 'Well-designed apartment'} with ${propertyTemplate.bedrooms} bedrooms and modern amenities. Located in ${area.name} with excellent connectivity and nearby facilities.`,
    type: propertyTemplate.type,
    location: {
      address: `${area.name} Main Road, Hyderabad`,
      city: "Hyderabad", 
      state: "Telangana",
      pincode: area.pincode,
      neighborhood: area.name,
      coordinates: {
        lat: area.coordinates.lat + (Math.random() - 0.5) * 0.01,
        lng: area.coordinates.lng + (Math.random() - 0.5) * 0.01
      }
    },
    price: {
      amount: finalPrice,
      currency: "INR",
      pricePerSqft: pricePerSqft
    },
    area: propertyTemplate.area,
    bedrooms: propertyTemplate.bedrooms,
    bathrooms: propertyTemplate.bathrooms,
    amenities: propertyTemplate.amenities,
    images: [
      {
        url: images[index % images.length],
        caption: imageCaptions[index % imageCaptions.length],
        isPrimary: true
      },
      {
        url: images[(index + 1) % images.length],
        caption: imageCaptions[(index + 1) % imageCaptions.length],
        isPrimary: false
      },
      {
        url: images[(index + 2) % images.length], 
        caption: imageCaptions[(index + 2) % imageCaptions.length],
        isPrimary: false
      },
      {
        url: images[(index + 3) % images.length], 
        caption: imageCaptions[(index + 3) % imageCaptions.length],
        isPrimary: false
      },
      {
        url: images[(index + 4) % images.length], 
        caption: imageCaptions[(index + 4) % imageCaptions.length],
        isPrimary: false
      }
    ],
    ownerContact: {
      name: names[index % names.length],
      phone: `+91 987654${3210 + index}`,
      email: `${names[index % names.length].toLowerCase().replace(' ', '.')}@email.com`
    },
    featured: index % 5 === 0,
    views: Math.floor(Math.random() * 300) + 50
  };
}

// Generate properties
const allProperties = [];

areas.forEach((area, areaIndex) => {
  for (let i = 0; i < 10; i++) {
    const propertyTemplate = propertyTypes[i % propertyTypes.length];
    const property = generateProperty(area, propertyTemplate, areaIndex * 10 + i);
    allProperties.push(property);
  }
});

// Write to file
const fileContent = `const sampleProperties = ${JSON.stringify(allProperties, null, 2)};

module.exports = sampleProperties;`;

fs.writeFileSync(path.join(__dirname, '../data/sampleProperties.js'), fileContent);
console.log(`Generated ${allProperties.length} properties across ${areas.length} areas`);