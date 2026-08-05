import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Initialize Gemini AI Client lazily if GEMINI_API_KEY is present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize Gemini AI client:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // In-memory database for demo persistence across server sessions
  const mockUsers: Record<string, any> = {
    'usr_1': {
      id: 'usr_1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  };

  const mockTripsStore: any[] = [];

  // API ROUTES FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Auth: Register
  app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password required' });
    }
    const id = 'usr_' + Date.now();
    const newUser = {
      id,
      name: name || email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    mockUsers[id] = newUser;
    return res.json({
      success: true,
      data: {
        token: 'jwt_token_' + id,
        user: newUser
      }
    });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email required' });
    }
    const existing = Object.values(mockUsers).find((u) => u.email === email);
    const user = existing || {
      id: 'usr_demo',
      name: email.split('@')[0] || 'Explorer',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    return res.json({
      success: true,
      data: {
        token: 'jwt_token_' + user.id,
        user
      }
    });
  });

  // Auth: Profile / Me
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    return res.json({
      success: true,
      data: {
        user: mockUsers['usr_1'] || {
          id: 'usr_1',
          name: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        }
      }
    });
  });

  // Trips: Plan (Generates custom AI trip with exact prompt response structure)
  app.post('/api/trips/plan', async (req, res) => {
    const formData = req.body;
    const {
      destination = 'Tokyo & Kyoto, Japan',
      days = '5',
      budget = '$2,500',
      travelStyle = 'Cultural & Luxury',
      travelers = 'Couple (2)',
      startDate = '2025-05-10',
      endDate = '2025-05-17'
    } = formData;

    const numDays = parseInt(days) || 5;
    const numericBudget = parseInt(budget.replace(/[^0-9]/g, '')) || 2500;

    const hotelB = Math.round(numericBudget * 0.4);
    const foodB = Math.round(numericBudget * 0.25);
    const transB = Math.round(numericBudget * 0.15);
    const actB = Math.round(numericBudget * 0.15);
    const miscB = numericBudget - (hotelB + foodB + transB + actB);

    const generatedTripData = {
      preference: {
        destination,
        startDate,
        endDate,
        days: numDays,
        budget: `$${numericBudget.toLocaleString()}`,
        travelStyle,
        travelers
      },
      budget: {
        hotel: hotelB,
        food: foodB,
        transport: transB,
        activity: actB,
        miscellaneous: miscB,
        total: `$${numericBudget.toLocaleString()}`
      },
      route: {
        days: Array.from({ length: numDays }, (_, i) => ({
          day: i + 1,
          theme: `Day ${i + 1}: ${destination.split(',')[0]} Exploration`,
          travelTip: 'Start early in the morning to beat heavy crowds.',
          activities: [
            {
              name: `Morning Highlights & Cultural Tour`,
              location: `${destination} Historic Center`,
              cost: `$${Math.round(actB / (numDays * 2))}`,
              time: '09:00 AM',
              weather: '20°C ☀️',
              crowdLevel: 'Low',
              coordinates: [35.6853 + (i * 0.008), 139.6912 + (i * 0.008)]
            },
            {
              name: `Afternoon Culinary & Local Landmarks`,
              location: `${destination} Heritage District`,
              cost: `$${Math.round(actB / (numDays * 2))}`,
              time: '02:00 PM',
              weather: '22°C ☀️',
              crowdLevel: 'Moderate',
              coordinates: [35.6900 + (i * 0.008), 139.7000 + (i * 0.008)]
            }
          ]
        }))
      },
      weather: {
        weather: {
          temperature: '22°C / 72°F',
          condition: 'Partly Cloudy & Pleasant',
          warnings: 'Moderate UV Index; Sunscreen Recommended',
          activitySuitable: 'Ideal for walking tours and outdoor sightseeing'
        }
      },
      crowd: {
        crowd: {
          level: 'Moderate',
          bestVisitTime: '08:30 AM - 11:00 AM',
          congestionRisk: 'Low congestion during morning hours'
        }
      },
      travel_companion: {
        packing: ['Comfortable walking shoes', 'Portable power bank', 'Weather-appropriate layer'],
        safety: ['Keep digital copy of passport', 'Safe tap water', 'Keep emergency numbers saved'],
        emergency: ['Local Helpline / Emergency Services: 112 / 911'],
        food: ['Try signature local delicacies and fresh street food'],
        etiquette: ['Respect local cultural customs and quiet zones'],
        travelTips: ['Reserve train tickets and museum entries online in advance']
      }
    };

    mockTripsStore.unshift(generatedTripData);
    return res.json({
      success: true,
      data: generatedTripData
    });
  });

  // Trips: GET All Trips
  app.get('/api/trips', (req, res) => {
    res.json({
      success: true,
      data: mockTripsStore,
      trips: mockTripsStore
    });
  });

  // Trips: POST Create Trip
  app.post('/api/trips', (req, res) => {
    const newTrip = req.body;
    newTrip.id = newTrip.id || 'trip_' + Date.now();
    mockTripsStore.unshift(newTrip);
    res.json({
      success: true,
      data: newTrip
    });
  });

  // Trips: GET Single Trip
  app.get('/api/trips/:id', (req, res) => {
    const { id } = req.params;
    const trip = mockTripsStore.find((t) => t.id === id || t.preference?.id === id);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    res.json({
      success: true,
      data: trip
    });
  });

  // Trips: PUT Update Trip
  app.put('/api/trips/:id', (req, res) => {
    const { id } = req.params;
    const index = mockTripsStore.findIndex((t) => t.id === id || t.preference?.id === id);
    if (index !== -1) {
      mockTripsStore[index] = { ...mockTripsStore[index], ...req.body };
      return res.json({ success: true, data: mockTripsStore[index] });
    }
    return res.json({ success: true, data: req.body });
  });

  // Trips: DELETE Trip
  app.delete('/api/trips/:id', (req, res) => {
    const { id } = req.params;
    const index = mockTripsStore.findIndex((t) => t.id === id || t.preference?.id === id);
    if (index !== -1) {
      mockTripsStore.splice(index, 1);
    }
    res.json({ success: true, message: 'Trip deleted successfully', id });
  });

  // VITE MIDDLEWARE FOR DEVELOPMENT MODE
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express + Vite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
