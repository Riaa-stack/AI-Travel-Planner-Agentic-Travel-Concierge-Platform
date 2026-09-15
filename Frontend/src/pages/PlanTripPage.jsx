import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
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
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState("2800");
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
      currency,
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
      <div className="space-y-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" /> Agentic Travel Concierge
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Plan Your Custom AI Trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            Configure your destination, duration, budget, and travel preferences to generate a complete travel blueprint.
          </p>
        </div>

        {/* Destination Quick Presets */}
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Popular Destinations</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATION_PRESETS.map((preset, idx) => {
              const isSelected = destination.toLowerCase().includes(preset.name.split(',')[0].toLowerCase());
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 shadow-[4px_4px_0px_#4F46E5] -translate-y-1'
                      : 'border-slate-900 bg-white hover:bg-slate-50 shadow-[2px_2px_0px_#0F172A]'
                  }`}
                >
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-16 object-cover rounded-xl mb-2 border border-slate-900"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-xs font-black text-slate-900 truncate">{preset.name.split(',')[0]}</p>
                  <p className="text-[10px] font-bold text-slate-500">{preset.country}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Planner Form */}
        <Card className="p-6 sm:p-8 shadow-[6px_6px_0px_#0F172A] border-2 border-slate-900 bg-white rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Form Section 1: Basic Trip Parameters */}
            <div className="space-y-5">
              <div className="inline-block px-4 py-1.5 rounded-2xl bg-indigo-100 border-2 border-indigo-600 text-indigo-950 text-xs font-black shadow-[2px_2px_0px_#4F46E5]">
                1. Basic Trip Parameters
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Destination City or Country"
                  icon={MapPin}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Paris, France or Tokyo, Japan"
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Target Budget
                  </label>

                  <div className="flex overflow-hidden rounded-2xl border-2 border-slate-900 bg-[#F8FAFC] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white">

                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-24 bg-slate-200 border-r-2 border-slate-900 px-3 font-extrabold text-xs outline-none cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                    </select>

                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Enter budget"
                      className="flex-1 px-4 py-2.5 outline-none text-xs sm:text-sm font-bold bg-transparent text-slate-900"
                      required
                    />

                  </div>
                </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            <div className="space-y-5 pt-4 border-t-2 border-slate-100">
              <div className="inline-block px-4 py-1.5 rounded-2xl bg-sky-100 border-2 border-sky-600 text-sky-950 text-xs font-black shadow-[2px_2px_0px_#0284C7]">
                2. Style & Atmosphere Preferences
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <label className="block text-xs font-bold text-slate-800">Special Requirements or Notes</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={specialReqs}
                    onChange={(e) => setSpecialReqs(e.target.value)}
                    placeholder="e.g., Vegetarian options, wheelchair accessible paths, early morning starts..."
                    className="w-full text-xs sm:text-sm bg-[#F8FAFC] border-2 border-slate-900 rounded-2xl p-3 text-slate-900 font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t-2 border-slate-100">
              <Button
                type="submit"
                fullWidth
                size="lg"
                icon={Sparkles}
                className="py-3.5 text-base shadow-[4px_4px_0px_#0F172A]"
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
