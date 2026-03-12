const sampleProperties = require('../data/sampleProperties.js');

console.log('Total properties:', sampleProperties.length);
console.log('\nProperties per area:');

const areas = [...new Set(sampleProperties.map(p => p.location.neighborhood))];
areas.forEach(area => {
  const count = sampleProperties.filter(p => p.location.neighborhood === area).length;
  console.log(`${area}: ${count} properties`);
});

console.log('\nProperty types distribution:');
const types = [...new Set(sampleProperties.map(p => p.type))];
types.forEach(type => {
  const count = sampleProperties.filter(p => p.type === type).length;
  console.log(`${type}: ${count} properties`);
});

console.log('\nPrice range:');
const prices = sampleProperties.map(p => p.price.amount);
console.log(`Min: ₹${Math.min(...prices).toLocaleString()}`);
console.log(`Max: ₹${Math.max(...prices).toLocaleString()}`);
console.log(`Average: ₹${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString()}`);

console.log('\nSample property titles:');
sampleProperties.slice(0, 5).forEach(p => {
  console.log(`- ${p.title} (₹${p.price.amount.toLocaleString()})`);
});