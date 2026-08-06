import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  CloudSun, 
  Users, 
  ShieldCheck, 
  RefreshCw, 
  BookmarkCheck, 
  Map as MapIcon, 
  Hotel, 
  DollarSign, 
  Compass, 
  Luggage, 
  PhoneCall, 
  Utensils, 
  Info,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import TripSummary from '../components/TripSummary';
import BudgetCard from '../components/BudgetCard';
import WeatherCard from '../components/WeatherCard';
import HotelCard from '../components/HotelCard';
import Accordion from '../components/Accordion';
import Timeline from '../components/Timeline';
import Map from '../components/Map';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import EmptyState from '../components/EmptyState';

export default function TripResultPage() {
  const { activeTrip, replanTrip, savedTrips } = useTrips();
  const navigate = useNavigate();

  const [replanModalOpen, setReplanModalOpen] = useState(false);
  const [replanReason, setReplanReason] = useState('Budget Changed');
  const [customReason, setCustomReason] = useState('');
  const [copied, setCopied] = useState(false);

  if (!activeTrip) {
    return (
      <DashboardLayout>
        <EmptyState
          title="No Active Trip Found"
          description="You haven't generated a trip yet. Create a custom AI itinerary now."
          actionText="Plan A Trip"
          onAction={() => navigate('/plan')}
        />
      </DashboardLayout>
    );
  }

  const handleReplanSubmit = (e) => {
    e.preventDefault();
    const finalReason = replanReason === 'Custom' ? customReason : replanReason;
    replanTrip(activeTrip.id, finalReason);
    setReplanModalOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleShowOnMap = (hotel) => {
    if (!hotel) return;

    if (hotel.latitude && hotel.longitude) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`,
        "_blank"
      );
    } else if (hotel.address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`,
        "_blank"
      );
    }
  };

  const handleGetDirections = (hotel) => {
    if (!hotel) return;

    if (hotel.latitude && hotel.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`,
        "_blank"
      );
    } else if (hotel.address) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.address)}`,
        "_blank"
      );
    }
  };
  

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={handleShare}
            >
              {copied ? 'Link Copied!' : 'Share Itinerary'}
            </Button>

            <Button
              variant="accent"
              size="sm"
              icon={RefreshCw}
              onClick={() => setReplanModalOpen(true)}
            >
              Replan Trip
            </Button>
          </div>
        </div>

        {/* 1. Trip Summary Header */}
        <TripSummary summary={activeTrip.tripSummary} days={activeTrip.days} />

        {/* 2. Interactive Leaflet Map Section */}
        <div className="space-y-3">
          <SectionHeader
            title="Interactive Route & Marker Map"
            subtitle="Leaflet Map with color-coded pins: Blue (Activities), Green (Hotels), Orange (Tourist Places)"
            icon={MapIcon}
          />
          <Map
            destination={activeTrip.destination}
            itinerary={activeTrip.itinerary || []}
            hotels={activeTrip.hotels || []}
            attractions={activeTrip.attractions || []}
            className="h-[480px]"
          />
        </div>

        {/* 3. Budget & Weather & Crowd Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BudgetCard budgets={activeTrip.budgets} totalBudget={activeTrip.budget} />
          
          <WeatherCard weather={activeTrip.weather} />

          {/* Crowd Insights Card */}
          <Card className="p-5 border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Crowd Density Radar</h3>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Crowd Level</p>
                <p className="text-sm font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg inline-block mt-0.5">
                  {activeTrip.crowdInfo?.level || 'Moderate'}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Best Visit Window</p>
                <p className="text-xs font-bold text-slate-800">{activeTrip.crowdInfo?.bestVisitTime || '8:00 AM - 10:30 AM'}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Congestion Risk</p>
                <p className="text-xs text-slate-600">{activeTrip.crowdInfo?.congestionRisk || 'Low congestion during morning'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 4. Day-Wise Itinerary Accordion */}
        <div className="space-y-3">
          <SectionHeader
            title="Day-Wise Agentic Itinerary"
            subtitle="Hour-by-hour planned schedule with locations, costs, and travel tips"
            icon={Compass}
          />
          <Accordion
            items={activeTrip.itinerary || []}
            renderContent={(dayItem) => (
              <Timeline activities={dayItem.activities || []} />
            )}
          />
        </div>

        {/* 5. Recommended Hotels Section */}
        {activeTrip.hotels && activeTrip.hotels.length > 0 && (
          <div className="space-y-3">
            <SectionHeader
              title="Recommended Hotels & Stays"
              subtitle="Curated based on your travel style and budget preferences"
              icon={Hotel}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTrip.hotels.map((hotel, idx) => (
                <HotelCard
                  key={idx}
                  hotel={hotel}
                  onShowOnMap={handleShowOnMap}
                  onGetDirections={handleGetDirections}
                />
              ))}
            </div>
          </div>
        )}

        {/* 6. Travel Companion & Local Insights Section */}
        {activeTrip.companionTips && (
          <div className="space-y-4">
            <SectionHeader
              title="Travel Companion & Local Insights"
              subtitle="Essential packing lists, safety advisories, and local etiquette"
              icon={ShieldCheck}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Packing */}
              <Card className="p-4 space-y-2 border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Luggage className="w-4 h-4 text-blue-600" />
                  <span>Packing Essentials</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {activeTrip.companionTips.packing?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* Safety & Emergency */}
              <Card className="p-4 space-y-2 border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <PhoneCall className="w-4 h-4 text-red-500" />
                  <span>Safety & Emergency</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {activeTrip.companionTips.emergency?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* Food Recommendations */}
              <Card className="p-4 space-y-2 border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <span>Local Gastronomy</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {activeTrip.companionTips.food?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* Etiquette */}
              <Card className="p-4 space-y-2 border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Info className="w-4 h-4 text-purple-600" />
                  <span>Cultural Etiquette</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {activeTrip.companionTips.etiquette?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}

        {/* Replan Trip Popup Modal */}
        <Modal
          isOpen={replanModalOpen}
          onClose={() => setReplanModalOpen(false)}
          title="Replan Trip with AI Concierge"
        >
          <form onSubmit={handleReplanSubmit} className="space-y-4">
            <p className="text-xs text-slate-500">
              Select a reason for re-planning. Our AI will automatically re-calculate routes, budgets, or activity schedules.
            </p>

            <Dropdown
              label="Primary Reason for Replanning"
              value={replanReason}
              onChange={(e) => setReplanReason(e.target.value)}
              options={[
                'Budget Changed',
                'Weather Conditions Changed',
                'Crowded / Queue Mitigation',
                'Custom Adjustment'
              ]}
            />

            {replanReason === 'Custom Adjustment' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Custom Request</label>
                <textarea
                  rows={3}
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="e.g., Add more relaxed morning activities and child-friendly stops..."
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-blue-600"
                />
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setReplanModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" icon={RefreshCw}>
                Submit & Replan
              </Button>
            </div>
          </form>
        </Modal>

      </div>
    </DashboardLayout>
  );
}
