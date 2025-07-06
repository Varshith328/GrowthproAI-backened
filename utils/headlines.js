// AI-style headline templates for SEO
const headlineTemplates = [
  "Why {name} is {location}'s Best Kept Secret in {year}",
  "Discover {name}: {location}'s Premier Destination for Excellence",
  "How {name} Became {location}'s Most Trusted Local Business",
  "{name} Transforms {location}'s Business Landscape This {year}",
  "The Ultimate Guide to {name} in {location} - Local Expert Review",
  "Why {location} Residents Choose {name} Over the Competition",
  "{name}: Leading {location}'s Innovation Revolution in {year}",
  "From Zero to Hero: {name}'s Journey to {location} Success",
  "What Makes {name} {location}'s Most Recommended Business",
  "The {name} Advantage: Why {location} Customers Keep Coming Back",
  "{name} Sets New Standards for Excellence in {location}",
  "Breaking: {name} Voted {location}'s Top Business for {year}",
  "The Secret Behind {name}'s Success in {location}",
  "Why {name} is Revolutionizing Business in {location}",
  "{location}'s Rising Star: The {name} Success Story",
  "How {name} Became {location}'s Most Talked-About Business",
  "{name}: Your {location} Solution for Premium Quality",
  "The {name} Difference: Why {location} Trusts Us Most",
  "Exclusive: Inside {name}'s Rise to {location} Prominence",
  "{name} Leads {location}'s Digital Transformation in {year}",
  "Why Smart {location} Customers Choose {name} First",
  "The {name} Experience: Redefining {location} Standards",
  "{name}: Where {location} Meets World-Class Service",
  "Game Changer: How {name} Disrupted {location}'s Market",
  "{name} Wins {location}'s Heart with Unmatched Quality"
];

// Industry-specific templates
const industryTemplates = {
  restaurant: [
    "Taste the Difference: {name} Brings Authentic Flavors to {location}",
    "Why {name} is {location}'s Hottest Culinary Destination",
    "From Kitchen to Heart: {name}'s Recipe for {location} Success",
    "Foodie Alert: {name} Serves Up {location}'s Best Dining Experience"
  ],
  retail: [
    "Shopping Redefined: {name} Transforms {location}'s Retail Scene",
    "Why {name} is {location}'s Ultimate Shopping Destination",
    "Style Meets Substance: {name}'s {location} Fashion Revolution",
    "The {name} Collection: {location}'s Premier Shopping Experience"
  ],
  service: [
    "Service Excellence: How {name} Raised {location}'s Standards",
    "Why {name} is {location}'s Most Reliable Service Provider",
    "Trust Redefined: {name}'s Commitment to {location} Quality",
    "The {name} Promise: Delivering Excellence Across {location}"
  ],
  health: [
    "Wellness Reimagined: {name} Brings Health Innovation to {location}",
    "Why {name} is {location}'s Most Trusted Health Partner",
    "Your Health, Our Priority: {name}'s {location} Excellence",
    "The {name} Approach: Revolutionizing {location} Healthcare"
  ]
};

// Generate contextual headline based on business name
const generateHeadline = (name, location) => {
  const currentYear = new Date().getFullYear();
  
  // Detect potential industry from business name
  const businessName = name.toLowerCase();
  let templates = headlineTemplates;
  
  if (businessName.includes('restaurant') || businessName.includes('cafe') || 
      businessName.includes('kitchen') || businessName.includes('food') ||
      businessName.includes('pizza') || businessName.includes('burger') ||
      businessName.includes('cake') || businessName.includes('bakery')) {
    templates = [...headlineTemplates, ...industryTemplates.restaurant];
  } else if (businessName.includes('store') || businessName.includes('shop') ||
             businessName.includes('boutique') || businessName.includes('mall')) {
    templates = [...headlineTemplates, ...industryTemplates.retail];
  } else if (businessName.includes('clinic') || businessName.includes('hospital') ||
             businessName.includes('dental') || businessName.includes('medical')) {
    templates = [...headlineTemplates, ...industryTemplates.health];
  } else if (businessName.includes('service') || businessName.includes('repair') ||
             businessName.includes('cleaning') || businessName.includes('consulting')) {
    templates = [...headlineTemplates, ...industryTemplates.service];
  }
  
  // Select random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace placeholders
  return template
    .replace(/\{name\}/g, name)
    .replace(/\{location\}/g, location)
    .replace(/\{year\}/g, currentYear);
};

// Get random headline for regeneration
const getRandomHeadline = (name, location) => {
  return generateHeadline(name, location);
};

// Power words for enhanced SEO
const powerWords = [
  'Ultimate', 'Premium', 'Elite', 'Exclusive', 'Revolutionary', 'Innovative',
  'Trusted', 'Certified', 'Award-Winning', 'Professional', 'Expert', 'Leading',
  'Top-Rated', 'Outstanding', 'Exceptional', 'Superior', 'World-Class'
];

// Generate power word enhanced headline
const generatePowerHeadline = (name, location) => {
  const powerWord = powerWords[Math.floor(Math.random() * powerWords.length)];
  const baseHeadline = generateHeadline(name, location);
  
  // Insert power word strategically
  const insertVariations = [
    `${powerWord} ${baseHeadline}`,
    `${baseHeadline} - ${powerWord} Service`,
    `Experience ${powerWord} Quality with ${name} in ${location}`,
    `${name}: ${location}'s ${powerWord} Choice for ${new Date().getFullYear()}`
  ];
  
  return insertVariations[Math.floor(Math.random() * insertVariations.length)];
};

module.exports = {
  generateHeadline,
  getRandomHeadline,
  generatePowerHeadline,
  headlineTemplates
};