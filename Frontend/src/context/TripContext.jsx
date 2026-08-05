import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const TripContext = createContext(null);

// Normalize response from backend into standardized React state trip object
export function normalizeBackendTrip(resData, formData = {}) {
  // Support both direct object and nested { success: true, data: { preference, budget, route, weather, crowd, travel_companion } }
  const raw = resData?.data || resData?.trip || resData;
  const pref = raw?.preference || raw?.preferences || {};
  const budgetObj = raw?.budget || raw?.budgets || {};
  const routeObj = raw?.route || raw?.itinerary || {};
  const weatherObj = raw?.weather?.weather || raw?.weather || {};
  const crowdObj = raw?.crowd?.crowd || raw?.crowd || {};
  const companionObj = raw?.travel_companion || raw?.companionTips || {};

  const daysList = routeObj?.days || (Array.isArray(routeObj) ? routeObj : []);

  const dest = pref?.destination || raw?.destination || formData?.destination || 'Tokyo & Kyoto, Japan';
  const numDays = parseInt(pref?.days || raw?.days || formData?.days || daysList.length || 5, 10);
  const rawBudgetString = String(pref?.budget || raw?.budget || formData?.budget || '$2,500');
  const numericBudget = parseInt(rawBudgetString.replace(/[^0-9]/g, ''), 10) || 2500;

  const hotelB = budgetObj.hotel || budgetObj.hotel_budget || Math.round(numericBudget * 0.4);
  const foodB = budgetObj.food || budgetObj.food_budget || Math.round(numericBudget * 0.25);
  const transB = budgetObj.transport || budgetObj.transport_budget || Math.round(numericBudget * 0.15);
  const actB = budgetObj.activity || budgetObj.activity_budget || Math.round(numericBudget * 0.15);
  const miscB = budgetObj.miscellaneous || Math.max(0, numericBudget - (hotelB + foodB + transB + actB));

  // Extract itinerary days & activities
  const itinerary = daysList.map((dayItem, idx) => ({
    day: dayItem.day || idx + 1,
    theme: dayItem.theme || dayItem.title || `Day ${idx + 1}: ${dest.split(',')[0]} Highlights`,
    travelTip: dayItem.travelTip || dayItem.travel_tip || 'Check weather forecasts before outdoor activities.',
    activities: (dayItem.activities || []).map((act) => ({
    name: act.activity_name || act.name || act.title || 'Sightseeing Spot',
    location: act.location || dest,
    cost:
      act.estimated_cost !== undefined
        ? `$${act.estimated_cost}`
        : act.cost
          ? (typeof act.cost === 'number' ? `$${act.cost}` : act.cost)
          : '$30',
    time: act.time || '10:00 AM',
      weather: act.weather || weatherObj.condition || 'Clear Skies',
      crowdLevel: act.crowdLevel || act.crowd_level || crowdObj.level || 'Moderate',
     coordinates: (() => {
        if (Array.isArray(act.coordinates)) {
          return act.coordinates;
        }

        if (
          act.coordinates &&
          act.coordinates.latitude != null &&
          act.coordinates.longitude != null
        ) {
          return [
            act.coordinates.latitude,
            act.coordinates.longitude
          ];
        }

        if (Array.isArray(act.coords)) {
          return act.coords;
        }

        return [
          35.6853 + idx * 0.01,
          139.6912 + idx * 0.01
        ];
      })(),
      nearbyHotels: act.nearbyHotels || act.hotels || [],
      nearbyAttractions: act.nearbyAttractions || act.attractions || []
    }))
  }));

  // Fallback itinerary if empty
  if (itinerary.length === 0) {
    for (let i = 1; i <= numDays; i++) {
      itinerary.push({
        day: i,
        theme: `Day ${i}: ${dest.split(',')[0]} Exploration`,
        travelTip: 'Start early in the morning to enjoy popular sites with lower crowds.',
        activities: [
          {
            name: `Morning Highlights - ${dest.split(',')[0]}`,
            location: `${dest} Central`,
            cost: '$40',
            time: '09:00 AM',
            weather: '20°C ☀️',
            crowdLevel: 'Low',
            coordinates: [35.6853 + i * 0.005, 139.6912 + i * 0.005]
          },
          {
            name: `Afternoon Cultural Experience`,
            location: `${dest} Heritage District`,
            cost: '$60',
            time: '02:00 PM',
            weather: '22°C ☀️',
            crowdLevel: 'Moderate',
            coordinates: [35.6900 + i * 0.005, 139.7000 + i * 0.005]
          }
        ]
      });
    }
  }

  // Extract hotels & attractions across days or root
  const hotels = raw?.hotels || [
    {
      name: `${dest.split(',')[0]} Central Hotel & Spa`,
      address: `101 Main St, ${dest}`,
      coordinates: [35.6853, 139.6912],
      price: `$${Math.round(hotelB / numDays)}/night`,
      rating: 4.8
    }
  ];

  const attractions = raw?.attractions || [
    {
      name: `${dest.split(',')[0]} Landmark Gardens`,
      address: `Historic District, ${dest}`,
      coordinates: [35.7148, 139.7967],
      distance: '1.5 km'
    }
  ];

  return {
    id: raw?.id || raw?._id || 'trip_' + Date.now(),
    destination: dest,
    startDate: pref?.startDate || formData?.startDate || '2025-05-10',
    endDate: pref?.endDate || formData?.endDate || '2025-05-17',
    days: numDays,
    budget: `$${numericBudget.toLocaleString()}`,
    numericBudget,
    travelStyle: pref?.travelStyle || formData?.travelStyle || 'Cultural & Luxury',
    travelers: pref?.travelers || formData?.travelers || 'Couple (2)',
    status: 'Saved',
    coverImage: raw?.coverImage || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    tripSummary: {
      destination: dest,
      budget: `$${numericBudget.toLocaleString()}`,
      travelStyle: pref?.travelStyle || formData?.travelStyle || 'Cultural & Luxury',
      travelerCategory: pref?.travelers || formData?.travelers || 'Couple',
      recommendedPace: 'Optimized Pace',
      estimatedCost: budgetObj.total || budgetObj.estimated_total || `$${(numericBudget * 0.95).toFixed(0)}`
    },
    budgets: {
      hotel: hotelB,
      food: foodB,
      transport: transB,
      activity: actB,
      miscellaneous: miscB,
      total: budgetObj.total || budgetObj.estimated_total || `$${numericBudget.toLocaleString()}`
    },
    weather: {
      temperature: weatherObj.temperature || weatherObj.temp || '22°C / 72°F',
      condition: weatherObj.condition || weatherObj.sky || 'Partly Cloudy & Pleasant',
      warnings: weatherObj.warnings || weatherObj.warning || 'Moderate UV index; sunscreen advised',
      activitySuitability: weatherObj.activitySuitable || weatherObj.activity_suitable || 'Ideal for outdoor walking and tours'
    },
    crowdInfo: {
      level: crowdObj.level || crowdObj.crowd_level || 'Moderate',
      bestVisitTime: crowdObj.bestVisitTime || crowdObj.best_visit_time || '08:30 AM - 11:00 AM',
      congestionRisk: crowdObj.congestionRisk || crowdObj.congestion_risk || 'Low risk during morning hours'
    },
    companionTips: {
      packing: companionObj.packing || ['Comfortable walking footwear', 'Portable charger', 'Weather-appropriate jacket'],
      safety: companionObj.safety || ['Keep digital copies of documents', 'Emergency numbers saved'],
      emergency: companionObj.emergency || ['Local Helpline / Ambulance: 112 / 911'],
      food: companionObj.food || ['Must-try local culinary specialties'],
      etiquette: companionObj.etiquette || ['Observe local quiet zones & tipping etiquette'],
      travelTips: companionObj.travelTips || companionObj.travel_tips || ['Book museum passes online in advance']
    },
    itinerary,
    hotels,
    attractions
  };
}

export const TripProvider = ({ children }) => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);

  // Fetch all saved trips on component mount
  const fetchTrips = async () => {
    setLoadingTrips(true);
    setError(null);
    try {
      const response = await api.get('/trips');
      const rawList = response.data?.trips || response.data?.data || response.data || [];
      const normalizedList = Array.isArray(rawList)
        ? rawList.map((item) => normalizeBackendTrip(item))
        : [];
      setSavedTrips(normalizedList);
      if (normalizedList.length > 0 && !activeTrip) {
        setActiveTrip(normalizedList[0]);
      }
    } catch (err) {
      console.warn('Failed to fetch trips from API:', err.message);
      setError(err.message);
    } finally {
      setLoadingTrips(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Plan AI Trip via POST /api/trips/plan
  const planTrip = async (formData, onStepUpdate) => {
    setGenerating(true);
    setCurrentStep(0);
    setError(null);

    const steps = [
      'Analyzing Preferences',
      'Calculating Budget',
      'Planning Route',
      'Checking Weather',
      'Finding Hotels',
      'Building Itinerary',
      'Almost Ready'
    ];

    // Animated step progression
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      if (onStepUpdate) onStepUpdate(steps[i], i);
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const payload = {
        destination: formData.destination,
        days: parseInt(formData.days),
        budget: parseInt(String(formData.budget).replace(/[^0-9]/g, '')),
        group_type: formData.travelers,
        travel_style: formData.travelStyle,
        season: formData.season,
        interests: formData.interests,
        accommodation_preference: formData.accommodationPreference,
        transport_preference: formData.transportPreference,
        special_requirements: formData.specialRequirements,
        start_date: formData.startDate,
        end_date: formData.endDate,
      };

      const response = await api.post('/trips/plan', payload);

      console.log("✅ FULL RESPONSE:", response);
      console.log("✅ RESPONSE DATA:", response.data);

      const generated = normalizeBackendTrip(response.data, formData);

      console.log("✅ GENERATED TRIP:", generated);

      setActiveTrip(generated);

      console.log("✅ ACTIVE TRIP SET");

      setSavedTrips((prev) => [
        generated,
        ...prev.filter((t) => t.id !== generated.id)
      ]);

      console.log("✅ SAVED TRIPS UPDATED");

      setGenerating(false);

      return generated;
    } catch (err) {
      console.error('API /trips/plan error:', err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to generate trip';
      setError(msg);
      setGenerating(false);
      throw err;
    }
  };

  const createTrip = async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      const newTrip = normalizeBackendTrip(response.data);
      setSavedTrips((prev) => [newTrip, ...prev]);
      return newTrip;
    } catch (err) {
      console.error('Failed to create trip:', err);
      throw err;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
      if (activeTrip?.id === tripId) {
        const remaining = savedTrips.filter((t) => t.id !== tripId);
        setActiveTrip(remaining.length > 0 ? remaining[0] : null);
      }
    } catch (err) {
      console.warn('Backend delete trip failed, removing locally:', err);
      setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    }
  };

  const updateTrip = async (tripId, updatedFields) => {
    try {
      const response = await api.put(`/trips/${tripId}`, updatedFields);
      const updated = normalizeBackendTrip(response.data);
      setSavedTrips((prev) => prev.map((t) => (t.id === tripId ? updated : t)));
      if (activeTrip?.id === tripId) {
        setActiveTrip(updated);
      }
      return updated;
    } catch (err) {
      console.warn('Backend update failed:', err);
      const updated = { ...activeTrip, ...updatedFields };
      setActiveTrip(updated);
      setSavedTrips((prev) => prev.map((t) => (t.id === tripId ? updated : t)));
      return updated;
    }
  };

  const selectTrip = (trip) => {
    setActiveTrip(trip);
  };

  return (
    <TripContext.Provider
      value={{
        savedTrips,
        activeTrip,
        generating,
        loadingTrips,
        currentStep,
        error,
        planTrip,
        createTrip,
        fetchTrips,
        deleteTrip,
        updateTrip,
        selectTrip,
        setActiveTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
