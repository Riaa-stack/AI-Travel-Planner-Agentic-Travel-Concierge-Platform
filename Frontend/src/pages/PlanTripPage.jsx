import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Compass, 
  Users, 
  Hotel, 
  Bus, 
  Sliders, 
  Heart, 
  Sun,
  FileText
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { DESTINATION_PRESETS } from '../utils/mockData';

export default function PlanTripPage() {
  const { planTrip, generating, currentStep } = useTrips();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Tokyo & Kyoto, Japan');
  const [days, setDays] = useState('7');
  const [budget, setBudget] = useState('$2,800');
  const [travelStyle, setTravelStyle] = useState('Cultural & Luxury');
  const [interests, setInterests] = useState('Historical Temples, Culinary Fine Dining, Cherry Blossom Gardens, Anime & Tech');
  const [season, setSeason] = useState('Spring (Cherry Blossom)');
  const [travelers, setTravelers] = useState('Couple (2)');
  const [startDate, setStartDate] = useState('2025-04-10');
  const [endDate, setEndDate] = useState('2025-04-17');
  const [accommodation, setAccommodation] = useState('Boutique Luxury Hotel');
  const [transport, setTransport] = useState('Bullet Train & Private Taxi');
  const [specialReqs, setSpecialReqs] = useState('Prefer non-smoking rooms, early morning museum entries to avoid heavy crowds.');

  const [activeStepText, setActiveStepText] = useState('Analyzing Preferences');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      destination,
      days,
      budget,
      travelStyle,
      interests,
      season,
      travelers,
      startDate,
      endDate,
      accommodationPreference: accommodation,
      transportPreference: transport,
      specialRequirements: specialReqs
    };

    const newTrip = await planTrip(formData, (stepText) => {
      setActiveStepText(stepText);
    });

    if (newTrip) {
      navigate('/trip-result');
    }
  };

  const handleSelectPreset = (preset) => {
    setDestination(preset.name);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Agentic Travel Concierge
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Plan Your Custom AI Trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Configure your destination, duration, budget, and travel preferences to generate a complete travel blueprint.
          </p>
        </div>

        {/* Destination Quick Presets */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Destinations</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATION_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  destination.toLowerCase().includes(preset.name.split(',')[0].toLowerCase())
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <img
                  src={preset.image}
                  alt={preset.name}
                  className="w-full h-14 object-cover rounded-lg mb-1.5"
                  referrerPolicy="no-referrer"
                />
                <p className="text-xs font-bold text-slate-800 truncate">{preset.name.split(',')[0]}</p>
                <p className="text-[10px] text-slate-400">{preset.country}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Planner Form */}
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200/80 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Form Section 1: Basic Trip Parameters */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 border-b border-slate-100 pb-2">
                1. Basic Trip Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Destination City or Country"
                  icon={MapPin}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Paris, France or Tokyo, Japan"
                  required
                />

                <Input
                  label="Target Budget"
                  icon={DollarSign}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., $2,500"
                  required
                />

                <Input
                  label="Number of Days"
                  icon={Calendar}
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  required
                />

                <Dropdown
                  label="Travelers Category"
                  icon={Users}
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  options={[
                    'Solo Explorer',
                    'Couple (2)',
                    'Family with Kids (3-4)',
                    'Group of Friends (4+)',
                    'Business & Leisure'
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Form Section 2: Style & Preferences */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 border-b border-slate-100 pb-2">
                2. Style & Atmosphere Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Travel Style"
                  icon={Compass}
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  options={[
                    'Cultural & Luxury',
                    'Relaxed & Scenic',
                    'Fast-Paced Adventure',
                    'Foodie & Gastronomy',
                    'Budget Backpacker'
                  ]}
                />

                <Dropdown
                  label="Season / Climate"
                  icon={Sun}
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  options={[
                    'Spring (Cherry Blossom)',
                    'Summer (Warm & Sunny)',
                    'Autumn (Foliage & Mild)',
                    'Winter (Snow & Ski)'
                  ]}
                />

                <Dropdown
                  label="Accommodation Preference"
                  icon={Hotel}
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  options={[
                    'Boutique Luxury Hotel',
                    '5-Star Grand Resort',
                    'Cozy Airbnb Apartment',
                    'Traditional Ryokan / Heritage Stay',
                    'Budget Hostel / Capsule'
                  ]}
                />

                <Dropdown
                  label="Transport Preference"
                  icon={Bus}
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  options={[
                    'Public Transit & Trains',
                    'Bullet Train & Private Taxi',
                    'Rental Car',
                    'Walking & Eco Rides'
                  ]}
                />
              </div>

              <Input
                label="Interests & Passions"
                icon={Heart}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., Michelin dining, Museums, Hiking, Shopping"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Special Requirements or Notes</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={specialReqs}
                    onChange={(e) => setSpecialReqs(e.target.value)}
                    placeholder="e.g., Vegetarian options, wheelchair accessible paths, early morning starts..."
                    className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100">
              <Button
                type="submit"
                fullWidth
                size="lg"
                icon={Sparkles}
                className="shadow-lg shadow-blue-500/25 hover:scale-[1.01]"
              >
                Generate Custom AI Itinerary
              </Button>
            </div>

          </form>
        </Card>

        {/* Animated Loading Modal */}
        <Modal
          isOpen={generating}
          onClose={() => {}}
          maxWidth="max-w-md"
        >
          <Loader
            text="Agentic AI Synthesis in Progress..."
            currentStep={activeStepText}
            stepIndex={currentStep}
          />
        </Modal>

      </div>
    </DashboardLayout>
  );
}
