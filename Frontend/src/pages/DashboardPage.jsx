import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Calendar, 
  DollarSign, 
  PlusCircle, 
  BookmarkCheck, 
  TrendingUp, 
  ArrowRight,
  Plane,
  Eye,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';

export default function DashboardPage() {
  const { user } = useAuth();
  const { savedTrips, activeTrip, selectTrip, deleteTrip } = useTrips();
  const navigate = useNavigate();

  const handleViewTrip = (trip) => {
    selectTrip(trip);
    navigate('/trip-result');
  };

  const currentDisplayTrip = activeTrip || savedTrips[0];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
      {currentDisplayTrip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row gap-6 items-stretch"
        >
          {/* Active Trip Hero Panel */}
          <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">
                  {currentDisplayTrip.destination}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentDisplayTrip.startDate} — {currentDisplayTrip.endDate || '7 Days'} • {currentDisplayTrip.travelers || '2 Travelers'}
                </p>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Optimized
              </div>
            </div>

            {/* Metric Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1 font-medium">Budget</div>
                <div className="text-base font-bold text-[#0F172A]">{currentDisplayTrip.budget}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1 font-medium">Weather</div>
                <div className="text-base font-bold text-[#0F172A]">
                  {typeof currentDisplayTrip.weather === 'object' 
                    ? currentDisplayTrip.weather.temperature 
                    : '18°C ☀️'}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1 font-medium">Pace</div>
                <div className="text-base font-bold text-[#0F172A]">Balanced</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1 font-medium">Interests</div>
                <div className="text-base font-bold text-[#0F172A] truncate">
                  {currentDisplayTrip.travelStyle || 'Cultural'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button
                onClick={() => navigate('/plan')}
                variant="primary"
                icon={PlusCircle}
                size="sm"
              >
                Plan New Trip
              </Button>
              {activeTrip && (
                <Button
                  onClick={() => handleViewTrip(activeTrip)}
                  variant="outline"
                  size="sm"
                >
                  View Itinerary
                </Button>
              )}
            </div>
          </div>

          {/* AI Concierge Live Alert Box */}
          <div className="w-full lg:w-80 bg-[#0F172A] p-5 rounded-2xl text-white shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  AI Concierge Live
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {currentDisplayTrip
                  ? `Monitoring ${currentDisplayTrip.destination} for weather, crowds and route updates.`
                  : "Create your first itinerary to activate the AI Concierge."}
              </p>
            </div>
            <button
              onClick={() => activeTrip && handleViewTrip(activeTrip)}
              className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-xs font-semibold text-white"
            >
              Review Updates
            </button>
          </div>
        </motion.div>
      )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card padding="p-4" className="border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Saved Plans</span>
              <BookmarkCheck className="w-4 h-4 text-[#2563EB]" />
            </div>
            <p className="text-xl font-extrabold text-[#0F172A]">{savedTrips.length}</p>
          </Card>

          <Card padding="p-4" className="border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Active Upcoming</span>
              <Plane className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl font-extrabold text-[#0F172A]">{savedTrips.length}</p>
          </Card>

          <Card padding="p-4" className="border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Planned Days</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xl font-extrabold text-[#0F172A]">
              {savedTrips.reduce((acc, t) => acc + (t.days || 0), 0)}
            </p>
          </Card>

          <Card padding="p-4" className="border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Budget</span>
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xl font-extrabold text-[#0F172A]">
              {savedTrips.length === 0
                ? "₹0"
                : `₹${savedTrips
                    .reduce((acc, t) => acc + (t.numericBudget || 0), 0)
                    .toLocaleString()}`}
            </p>
          </Card>
        </div>

        {/* Quick Operations */}
        <div className="space-y-3">
          <SectionHeader title="Quick Operations" subtitle="Manage your trip blueprints" icon={Compass} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
              onClick={() => navigate('/plan')}
              className="p-5 border-slate-200 hover:border-[#2563EB] flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  Create AI Itinerary
                </h4>
                <p className="text-[11px] text-slate-500">Configure destination & parameters</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <PlusCircle className="w-4 h-4" />
              </div>
            </Card>

            <Card
              onClick={() => navigate('/saved')}
              className="p-5 border-slate-200 hover:border-[#2563EB] flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  View Saved Trips
                </h4>
                <p className="text-[11px] text-slate-500">Access all saved travel blueprints</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <BookmarkCheck className="w-4 h-4" />
              </div>
            </Card>

            <Card
              onClick={() => navigate('/profile')}
              className="p-5 border-slate-200 hover:border-[#2563EB] flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  Concierge Preferences
                </h4>
                <p className="text-[11px] text-slate-500">Adjust default currency & style</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>

        {/* Recent & Upcoming Saved Trips */}
        <div className="space-y-4">
          <SectionHeader
            title="Recent Itineraries"
            subtitle="Your agentically generated travel blueprints"
            action={
              <Link to="/saved" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          {savedTrips.length === 0 ? (
            <Card className="p-8 text-center text-xs text-slate-500 border-dashed border-slate-200">
              No saved trips found. Click "Plan New Trip" to generate your first itinerary!
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTrips.slice(0, 3).map((trip) => (
                <Card
                  key={trip.id}
                  padding="p-0"
                  className="overflow-hidden border-slate-200 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="relative h-40">
                      <img
                        src={trip.coverImage || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80'}
                        alt={trip.destination}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {trip.days} Days
                      </span>
                      <span className="absolute top-3 right-3 bg-[#2563EB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {trip.budget}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-[#0F172A] truncate">{trip.destination}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#2563EB]" /> {trip.startDate}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-emerald-600" /> {trip.travelStyle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleViewTrip(trip)}
                      className="flex-1"
                    >
                      View Trip
                    </Button>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
