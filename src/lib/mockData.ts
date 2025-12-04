export const kenyaCrops = [
  'Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)',
  'Cabbage', 'Onions', 'Carrots', 'Bananas', 'Tea', 'Coffee',
  'Wheat', 'Rice', 'Avocados', 'Mangoes', 'Pineapples'
];

export const kenyaCounties = [
  'Nairobi', 'Kiambu', 'Nakuru', 'Kakamega', 'Bungoma', 'Meru',
  'Nyeri', 'Uasin Gishu', 'Trans Nzoia', 'Kisumu', 'Machakos',
  'Kajiado', 'Laikipia', 'Nyandarua', 'Murang\'a', 'Kirinyaga'
];

export const mockMarketPrices = [
  { id: 1, crop: 'Maize', currentPrice: 45, previousPrice: 42, location: 'Nakuru', lastUpdated: '2024-01-15' },
  { id: 2, crop: 'Beans', currentPrice: 120, previousPrice: 115, location: 'Nairobi', lastUpdated: '2024-01-15' },
  { id: 3, crop: 'Potatoes', currentPrice: 35, previousPrice: 40, location: 'Nyandarua', lastUpdated: '2024-01-15' },
  { id: 4, crop: 'Tomatoes', currentPrice: 80, previousPrice: 75, location: 'Kiambu', lastUpdated: '2024-01-15' },
  { id: 5, crop: 'Kales', currentPrice: 25, previousPrice: 28, location: 'Kiambu', lastUpdated: '2024-01-15' },
  { id: 6, crop: 'Cabbage', currentPrice: 30, previousPrice: 32, location: 'Kinangop', lastUpdated: '2024-01-15' },
  { id: 7, crop: 'Onions', currentPrice: 55, previousPrice: 50, location: 'Kajiado', lastUpdated: '2024-01-15' },
  { id: 8, crop: 'Carrots', currentPrice: 45, previousPrice: 45, location: 'Nyandarua', lastUpdated: '2024-01-15' },
];

export const mockDiseases = [
  {
    name: 'Maize Lethal Necrosis',
    severity: 'High',
    confidence: 94,
    symptoms: [
      'Yellow streaking on leaves',
      'Stunted growth',
      'Premature wilting',
      'Small, deformed ears'
    ],
    treatment: [
      'Remove and destroy infected plants',
      'Use certified disease-free seeds',
      'Control aphid and thrip vectors',
      'Practice crop rotation'
    ],
    prevention: [
      'Plant resistant varieties',
      'Maintain field hygiene',
      'Regular scouting for symptoms'
    ]
  },
  {
    name: 'Tomato Late Blight',
    severity: 'High',
    confidence: 89,
    symptoms: [
      'Water-soaked spots on leaves',
      'White fungal growth on undersides',
      'Brown lesions on stems',
      'Fruit rot'
    ],
    treatment: [
      'Apply copper-based fungicides',
      'Remove infected plant parts',
      'Improve air circulation',
      'Avoid overhead irrigation'
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Proper spacing between plants',
      'Mulching to prevent soil splash'
    ]
  },
  {
    name: 'Coffee Berry Disease',
    severity: 'Medium',
    confidence: 87,
    symptoms: [
      'Dark sunken lesions on berries',
      'Premature berry drop',
      'Mummified berries',
      'Black spots on leaves'
    ],
    treatment: [
      'Apply fungicide sprays',
      'Prune to improve air circulation',
      'Remove mummified berries',
      'Maintain proper shade'
    ],
    prevention: [
      'Plant resistant varieties',
      'Regular pruning',
      'Proper field sanitation'
    ]
  }
];

export const mockListings = [
  {
    id: 1,
    crop: 'Maize',
    quantity: 500,
    unit: 'kg',
    price: 45,
    quality: 'Premium',
    farmer: 'John Kamau',
    location: 'Nakuru',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
    description: 'Fresh harvest, properly dried',
    postedAt: '2024-01-14'
  },
  {
    id: 2,
    crop: 'Tomatoes',
    quantity: 200,
    unit: 'kg',
    price: 80,
    quality: 'Premium',
    farmer: 'Mary Wanjiku',
    location: 'Kiambu',
    image: 'https://images.unsplash.com/photo-1546470427-227c7b8b1160?w=400',
    description: 'Organic, vine-ripened tomatoes',
    postedAt: '2024-01-13'
  },
  {
    id: 3,
    crop: 'Potatoes',
    quantity: 1000,
    unit: 'kg',
    price: 35,
    quality: 'Standard',
    farmer: 'Peter Mwangi',
    location: 'Nyandarua',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber75?w=400',
    description: 'Shangi variety, good for chips',
    postedAt: '2024-01-12'
  },
  {
    id: 4,
    crop: 'Beans',
    quantity: 300,
    unit: 'kg',
    price: 120,
    quality: 'Premium',
    farmer: 'Grace Njeri',
    location: 'Meru',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400',
    description: 'Rose coco beans, well sorted',
    postedAt: '2024-01-11'
  },
  {
    id: 5,
    crop: 'Cabbage',
    quantity: 150,
    unit: 'heads',
    price: 30,
    quality: 'Premium',
    farmer: 'David Ochieng',
    location: 'Kinangop',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400',
    description: 'Large, fresh heads',
    postedAt: '2024-01-10'
  },
  {
    id: 6,
    crop: 'Avocados',
    quantity: 400,
    unit: 'kg',
    price: 150,
    quality: 'Premium',
    farmer: 'Alice Muthoni',
    location: 'Murang\'a',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    description: 'Hass variety, export quality',
    postedAt: '2024-01-09'
  }
];

export const mockExperts = [
  {
    id: 1,
    name: 'Dr. James Kariuki',
    specialization: 'Crop Diseases',
    rating: 4.8,
    reviews: 156,
    languages: ['English', 'Swahili'],
    available: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200'
  },
  {
    id: 2,
    name: 'Dr. Sarah Otieno',
    specialization: 'Soil Science',
    rating: 4.9,
    reviews: 203,
    languages: ['English', 'Swahili', 'Luo'],
    available: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200'
  },
  {
    id: 3,
    name: 'Prof. Michael Njuguna',
    specialization: 'Agricultural Economics',
    rating: 4.7,
    reviews: 89,
    languages: ['English', 'Swahili'],
    available: false,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
  }
];

export const mockWeather = {
  current: {
    temp: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    location: 'Nairobi'
  },
  forecast: [
    { day: 'Mon', temp: 25, condition: 'Sunny', icon: '☀️' },
    { day: 'Tue', temp: 23, condition: 'Cloudy', icon: '☁️' },
    { day: 'Wed', temp: 22, condition: 'Rain', icon: '🌧️' },
    { day: 'Thu', temp: 21, condition: 'Rain', icon: '🌧️' },
    { day: 'Fri', temp: 24, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Sat', temp: 26, condition: 'Sunny', icon: '☀️' },
    { day: 'Sun', temp: 25, condition: 'Sunny', icon: '☀️' }
  ],
  alerts: [
    { type: 'rain', message: 'Heavy rainfall expected on Wednesday-Thursday. Delay harvesting activities.' },
    { type: 'temperature', message: 'Optimal planting conditions for maize this week.' }
  ]
};
