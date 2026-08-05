export const SAMPLE_TRIPS = [
  {
    id: 'trip_101',
    destination: 'Tokyo & Kyoto, Japan',
    startDate: '2025-04-10',
    endDate: '2025-04-17',
    days: 7,
    budget: '$2,800',
    numericBudget: 2800,
    travelStyle: 'Cultural & Luxury',
    travelers: 'Couple (2)',
    status: 'Upcoming',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    tripSummary: {
      destination: 'Tokyo & Kyoto, Japan',
      budget: '$2,800',
      travelStyle: 'Cultural & Luxury',
      travelerCategory: 'Couple',
      recommendedPace: 'Balanced Exploration',
      estimatedCost: '$2,650'
    },
    budgets: {
      hotel: 1100,
      food: 650,
      transport: 400,
      activity: 350,
      miscellaneous: 150
    },
    weather: {
      temperature: '18°C / 64°F',
      condition: 'Pleasant & Mild (Spring Cherry Blossom)',
      warnings: 'High pollen count expected in parks',
      activitySuitability: 'Excellent for sightseeing & walking tours'
    },
    crowdInfo: {
      level: 'Moderate to High',
      bestVisitTime: '8:00 AM - 10:30 AM',
      congestionRisk: 'High near Fushimi Inari & Senso-ji'
    },
    companionTips: {
      packing: ['Comfortable walking shoes', 'Power bank (10,000mAh)', 'Light jacket', 'Suica/Pasmo app or card'],
      safety: ['Tap water is safe to drink', 'Keep cash (Yen) for small ramen shops'],
      emergency: ['Police: 110', 'Ambulance/Fire: 119', 'US Embassy Tokyo: +81 3-3224-5000'],
      food: ['Try Tonkatsu in Ginza', 'Matcha parfait in Kyoto', 'Tsukiji Outer Market sushi'],
      etiquette: ['Avoid walking while eating in public', 'Bow slightly when greeting', 'No tipping necessary']
    },
    hotels: [
      {
        name: 'Park Hyatt Tokyo',
        address: '3-7-1-2 Nishi-Shinjuku, Shinjuku City, Tokyo',
        coordinates: [35.6853, 139.6912],
        price: '$380/night',
        rating: 4.8
      },
      {
        name: 'The Ritz-Carlton Kyoto',
        address: 'Kamogawa Nijo-Ohashi Hotori, Nakagyo Ward, Kyoto',
        coordinates: [35.0116, 135.7722],
        price: '$420/night',
        rating: 4.9
      }
    ],
    attractions: [
      {
        name: 'Senso-ji Temple',
        address: '2-3-1 Asakusa, Taito City, Tokyo',
        coordinates: [35.7148, 139.7967],
        distance: '3.2 km'
      },
      {
        name: 'Fushimi Inari Shrine',
        address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
        coordinates: [34.9671, 135.7727],
        distance: '4.5 km'
      },
      {
        name: 'Shibuya Crossing & Sky',
        address: '2-24-12 Shibuya, Tokyo',
        coordinates: [35.6595, 139.7005],
        distance: '1.8 km'
      }
    ],
    itinerary: [
      {
        day: 1,
        theme: 'Arrival & Shinjuku Neon Lights',
        travelTip: 'Get a Suica digital pass on your iPhone or IC card at Narita Airport for seamless subway transit.',
        activities: [
          {
            name: 'Check-in at Park Hyatt Tokyo',
            location: 'Nishi-Shinjuku',
            cost: '$0 (Included)',
            time: '03:00 PM',
            weather: 'Sunny 19°C',
            crowdLevel: 'Low',
            coordinates: [35.6853, 139.6912]
          },
          {
            name: 'Explore Omoide Yokocho & Golden Gai',
            location: 'Shinjuku',
            cost: '$45',
            time: '06:30 PM',
            weather: 'Clear Night 15°C',
            crowdLevel: 'High',
            coordinates: [35.6938, 139.7003]
          }
        ]
      },
      {
        day: 2,
        theme: 'Historic Asakusa & Futuristic Odaiba',
        travelTip: 'Visit Senso-ji before 9:00 AM to beat the tour group crowds.',
        activities: [
          {
            name: 'Morning Tour of Senso-ji Temple',
            location: 'Asakusa',
            cost: '$10',
            time: '08:30 AM',
            weather: 'Sunny 20°C',
            crowdLevel: 'Moderate',
            coordinates: [35.7148, 139.7967]
          },
          {
            name: 'teamLab Planets Immersive Digital Art',
            location: 'Toyosu',
            cost: '$32',
            time: '02:00 PM',
            weather: 'Indoor',
            crowdLevel: 'High',
            coordinates: [35.6491, 139.7898]
          }
        ]
      },
      {
        day: 3,
        theme: 'Shinkansen Bullet Train to Kyoto & Arashiyama Bamboo Grove',
        travelTip: 'Reserve a Mount Fuji window seat (Seat E) on the Shinkansen line from Tokyo to Kyoto.',
        activities: [
          {
            name: 'Bullet Train Ride (Nozomi Shinkansen)',
            location: 'Tokyo Station to Kyoto Station',
            cost: '$130',
            time: '09:00 AM',
            weather: 'Clear 18°C',
            crowdLevel: 'Moderate',
            coordinates: [34.9858, 135.7588]
          },
          {
            name: 'Arashiyama Bamboo Grove Sunset Walk',
            location: 'Ukyo Ward, Kyoto',
            cost: '$0',
            time: '04:30 PM',
            weather: 'Mild 17°C',
            crowdLevel: 'Moderate',
            coordinates: [35.0170, 135.6713]
          }
        ]
      }
    ]
  },
  {
    id: 'trip_102',
    destination: 'Paris & Amalfi Coast, Europe',
    startDate: '2025-06-15',
    endDate: '2025-06-22',
    days: 8,
    budget: '$3,500',
    numericBudget: 3500,
    travelStyle: 'Romantic & Gastronomy',
    travelers: 'Couple (2)',
    status: 'Saved',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
    tripSummary: {
      destination: 'Paris & Amalfi Coast',
      budget: '$3,500',
      travelStyle: 'Romantic & Gastronomy',
      travelerCategory: 'Couple',
      recommendedPace: 'Relaxed & Scenic',
      estimatedCost: '$3,300'
    },
    budgets: {
      hotel: 1400,
      food: 900,
      transport: 500,
      activity: 400,
      miscellaneous: 100
    },
    weather: {
      temperature: '24°C / 75°F',
      condition: 'Sunny & Warm',
      warnings: 'High UV index afternoon',
      activitySuitability: 'Ideal for terrace dining & coastal boats'
    },
    crowdInfo: {
      level: 'High',
      bestVisitTime: 'Early Morning or Sunset',
      congestionRisk: 'High near Eiffel Tower & Positano Ferry'
    },
    companionTips: {
      packing: ['Sunscreen SPF 50', 'Linen shirts', 'Versatile summer dress', 'Comfortable sandals'],
      safety: ['Watch belongings on Paris Metro Line 1'],
      emergency: ['European Emergency: 112'],
      food: ['Croissants at Du Pain et des Idées', 'Seafood pasta in Amalfi'],
      etiquette: ['Always say "Bonjour" when entering Parisian shops']
    },
    hotels: [
      {
        name: 'Hôtel Le Meurice Paris',
        address: '228 Rue de Rivoli, 75001 Paris, France',
        coordinates: [48.8652, 2.3294],
        price: '$520/night',
        rating: 4.9
      }
    ],
    attractions: [
      {
        name: 'Eiffel Tower',
        address: 'Champ de Mars, Paris',
        coordinates: [48.8584, 2.2945],
        distance: '1.2 km'
      },
      {
        name: 'Louvre Museum',
        address: 'Rue de Rivoli, Paris',
        coordinates: [48.8606, 2.3376],
        distance: '0.8 km'
      }
    ],
    itinerary: [
      {
        day: 1,
        theme: 'Parisian Romance & Seine Cruise',
        travelTip: 'Book Seine River cruise tickets online in advance to skip ticket lines.',
        activities: [
          {
            name: 'Check-in & Tuileries Garden Stroll',
            location: '1st Arrondissement',
            cost: '$0',
            time: '02:00 PM',
            weather: 'Sunny 23°C',
            crowdLevel: 'Moderate',
            coordinates: [48.8635, 2.3275]
          },
          {
            name: 'Eiffel Tower Sunset Picnic & Champagne Cruise',
            location: 'Champ de Mars',
            cost: '$65',
            time: '07:30 PM',
            weather: 'Clear Sunset 21°C',
            crowdLevel: 'High',
            coordinates: [48.8584, 2.2945]
          }
        ]
      }
    ]
  }
];

export const DESTINATION_PRESETS = [
  { name: 'Tokyo, Japan', country: 'Japan', lat: 35.6762, lng: 139.6503, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80' },
  { name: 'Paris, France', country: 'France', lat: 48.8566, lng: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80' },
  { name: 'New York City, USA', country: 'USA', lat: 40.7128, lng: -74.0060, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80' },
  { name: 'Bali, Indonesia', country: 'Indonesia', lat: -8.4095, lng: 115.1889, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80' },
  { name: 'Rome, Italy', country: 'Italy', lat: 41.9028, lng: 12.4964, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80' },
  { name: 'Swiss Alps, Switzerland', country: 'Switzerland', lat: 46.5601, lng: 8.5612, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80' }
];

export function generateCustomTrip(formData) {
  const {
    destination = 'Bali, Indonesia',
    days = 5,
    budget = '$2,000',
    travelStyle = 'Balanced',
    travelers = 'Solo Explorer',
    accommodationPreference = 'Boutique Hotel',
    transportPreference = 'Rental Car / Private Taxi'
  } = formData;

  const numDays = parseInt(days) || 5;
  const numericBudget = parseInt(budget.replace(/[^0-9]/g, '')) || 2000;

  // Calculate proportional budget allocation
  const hotelBudget = Math.round(numericBudget * 0.40);
  const foodBudget = Math.round(numericBudget * 0.25);
  const transportBudget = Math.round(numericBudget * 0.15);
  const activityBudget = Math.round(numericBudget * 0.15);
  const miscBudget = numericBudget - (hotelBudget + foodBudget + transportBudget + activityBudget);

  // Derive coordinates based on destination or fallback
  let centerLat = 35.6762;
  let centerLng = 139.6503;

  const destLower = destination.toLowerCase();
  if (destLower.includes('paris') || destLower.includes('france')) {
    centerLat = 48.8566; centerLng = 2.3522;
  } else if (destLower.includes('bali') || destLower.includes('indonesia')) {
    centerLat = -8.4095; centerLng = 115.1889;
  } else if (destLower.includes('new york') || destLower.includes('usa')) {
    centerLat = 40.7128; centerLng = -74.0060;
  } else if (destLower.includes('rome') || destLower.includes('italy')) {
    centerLat = 41.9028; centerLng = 12.4964;
  } else if (destLower.includes('swiss') || destLower.includes('switzerland')) {
    centerLat = 46.5601; centerLng = 8.5612;
  } else if (destLower.includes('dubai') || destLower.includes('uae')) {
    centerLat = 25.2048; centerLng = 55.2708;
  }

  const generatedItinerary = [];
  for (let i = 1; i <= numDays; i++) {
    const latOffset1 = (Math.random() - 0.5) * 0.04;
    const lngOffset1 = (Math.random() - 0.5) * 0.04;
    const latOffset2 = (Math.random() - 0.5) * 0.04;
    const lngOffset2 = (Math.random() - 0.5) * 0.04;

    generatedItinerary.push({
      day: i,
      theme: `Day ${i}: ${getThemeForDay(i, destination)}`,
      travelTip: `Tip for Day ${i}: Use local contactless transport apps or eco-friendly ride shares during peak hours.`,
      activities: [
        {
          name: `Morning Landmark Tour - ${getLandmarkName(i, destination, 'A')}`,
          location: `${destination} City Center`,
          cost: `$${Math.round(activityBudget / (numDays * 2))}`,
          time: '09:00 AM',
          weather: 'Sunny 22°C',
          crowdLevel: i % 2 === 0 ? 'Moderate' : 'Low',
          coordinates: [centerLat + latOffset1, centerLng + lngOffset1]
        },
        {
          name: `Afternoon Cultural Experience - ${getLandmarkName(i, destination, 'B')}`,
          location: `${destination} District`,
          cost: `$${Math.round(activityBudget / (numDays * 2.5))}`,
          time: '02:30 PM',
          weather: 'Pleasant 24°C',
          crowdLevel: 'Moderate',
          coordinates: [centerLat + latOffset2, centerLng + lngOffset2]
        }
      ]
    });
  }

  return {
    id: 'trip_' + Date.now(),
    destination,
    startDate: formData.startDate || '2025-05-10',
    endDate: formData.endDate || '2025-05-17',
    days: numDays,
    budget: `$${numericBudget.toLocaleString()}`,
    numericBudget,
    travelStyle,
    travelers,
    status: 'Saved',
    coverImage: getCoverImageForDestination(destination),
    tripSummary: {
      destination,
      budget: `$${numericBudget.toLocaleString()}`,
      travelStyle,
      travelerCategory: travelers,
      recommendedPace: 'Optimized Agentic Flow',
      estimatedCost: `$${(numericBudget * 0.92).toFixed(0)}`
    },
    budgets: {
      hotel: hotelBudget,
      food: foodBudget,
      transport: transportBudget,
      activity: activityBudget,
      miscellaneous: miscBudget
    },
    weather: {
      temperature: '22°C / 72°F',
      condition: 'Partly Cloudy & Comfortable',
      warnings: 'Mild chance of afternoon rain shower',
      activitySuitability: 'Great for walking tours & outdoor photography'
    },
    crowdInfo: {
      level: 'Moderate',
      bestVisitTime: '9:00 AM - 11:30 AM',
      congestionRisk: 'Moderate around historical monuments'
    },
    companionTips: {
      packing: ['Comfortable walking shoes', 'Universal power adapter', 'Light raincoat or umbrella', 'Reusable water bottle'],
      safety: ['Keep digital backups of passport & travel insurance', 'Use verified ride-share services'],
      emergency: ['Local Emergency Services: 112 / 911', 'Concierge AI hotline active 24/7'],
      food: ['Sample signature regional dishes at verified local eateries', 'Check dietary tags on AI menu scanner'],
      etiquette: ['Greet store owners warmly', 'Be mindful of local photography regulations at sacred sites']
    },
    hotels: [
      {
        name: `${destination.split(',')[0]} Grand Resort & Spa`,
        address: `100 Ocean Promenade, ${destination}`,
        coordinates: [centerLat + 0.005, centerLng - 0.005],
        price: `$${Math.round(hotelBudget / numDays)}/night`,
        rating: 4.8
      },
      {
        name: `Boutique Haven Suites`,
        address: `45 Heritage Avenue, ${destination}`,
        coordinates: [centerLat - 0.008, centerLng + 0.006],
        price: `$${Math.round((hotelBudget * 0.8) / numDays)}/night`,
        rating: 4.7
      }
    ],
    attractions: [
      {
        name: `Iconic Plaza & Cultural Hub`,
        address: `Main Boulevard, ${destination}`,
        coordinates: [centerLat + 0.012, centerLng + 0.010],
        distance: '1.4 km'
      },
      {
        name: `Historic Botanical Gardens`,
        address: `Park Drive, ${destination}`,
        coordinates: [centerLat - 0.010, centerLng - 0.015],
        distance: '2.1 km'
      }
    ],
    itinerary: generatedItinerary
  };
}

function getThemeForDay(dayNum, dest) {
  const themes = [
    'Arrival, Check-in & Orientation Walk',
    'Historical Heart & Cultural Masterpieces',
    'Gastronomy & Local Artisan Markets',
    'Scenic Nature Escapes & Panoramic Viewpoints',
    'Architectural Highlights & Evening Cruises',
    'Hidden Gems & Local Neighborhood Secrets',
    'Relaxation, Spa & Departure Souvenirs'
  ];
  return themes[(dayNum - 1) % themes.length];
}

function getLandmarkName(dayNum, dest, slot) {
  const landmarksA = ['Central Cathedral', 'Imperial Palace Gardens', 'Art Museum', 'Old Town Square', 'Harbor Promenade'];
  const landmarksB = ['Sunset Peak Lookout', 'Artisan Flea Market', 'Heritage Culinary Hall', 'Riverside Park', 'Observation Tower'];
  return slot === 'A' ? landmarksA[(dayNum - 1) % landmarksA.length] : landmarksB[(dayNum - 1) % landmarksB.length];
}

function getCoverImageForDestination(dest) {
  const lower = dest.toLowerCase();
  if (lower.includes('tokyo') || lower.includes('japan')) return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80';
  if (lower.includes('paris') || lower.includes('france')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80';
  if (lower.includes('bali') || lower.includes('indonesia')) return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80';
  if (lower.includes('rome') || lower.includes('italy')) return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80';
  if (lower.includes('swiss') || lower.includes('switzerland')) return 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80';
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80';
}
