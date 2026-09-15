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
      <div className="space-y-8">
        
      {currentDisplayTrip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Active Trip Hero Panel */}
          <div className="bg-[#FEF3C7] p-6 sm:p-8 rounded-3xl border-2 border-amber-800 shadow-[4px_4px_0px_#B45309] space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Primary Active Trip</span>
                <h1 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
                  {currentDisplayTrip.destination}
                </h1>
                <p className="text-xs font-bold text-amber-800 mt-1">
                  {currentDisplayTrip.startDate} — {currentDisplayTrip.endDate || '7 Days'} • {currentDisplayTrip.travelers || '2 Travelers'}
                </p>
              </div>
              <div className="bg-amber-800 text-white px-3.5 py-1 rounded-2xl text-xs font-black uppercase tracking-wider border border-amber-950 shadow-[2px_2px_0px_#B45309]">
                AI Optimized
              </div>
            </div>

            {/* Metric Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-800 shadow-[2px_2px_0px_#B45309]">
                <div className="text-[10px] text-amber-800 font-black uppercase">Target Budget</div>
                <div className="text-base font-black text-slate-900">{currentDisplayTrip.budget}</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-amber-800 shadow-[2px_2px_0px_#B45309]">
                <div className="text-[10px] text-amber-800 font-black uppercase">Weather</div>
                <div className="text-base font-black text-slate-900">
                  {typeof currentDisplayTrip.weather === 'object' 
                    ? currentDisplayTrip.weather.temperature 
                    : '18°C ☀️'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-amber-800 shadow-[2px_2px_0px_#B45309]">
                <div className="text-[10px] text-amber-800 font-black uppercase">Pace</div>
                <div className="text-base font-black text-slate-900">Balanced</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-amber-800 shadow-[2px_2px_0px_#B45309]">
                <div className="text-[10px] text-amber-800 font-black uppercase">Travel Style</div>
                <div className="text-base font-black text-slate-900 truncate">
                  {currentDisplayTrip.travelStyle || 'Cultural'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={() => navigate('/plan')}
                variant="primary"
                icon={PlusCircle}
                size="md"
              >
                Plan New Trip
              </Button>
              {activeTrip && (
                <Button
                  onClick={() => handleViewTrip(activeTrip)}
                  variant="outline"
                  size="md"
                >
                  View Itinerary
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Saved Plans</span>
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{savedTrips.length}</p>
          </div>

          <div className="bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Active Upcoming</span>
              <Plane className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{savedTrips.length}</p>
          </div>

          <div className="bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Planned Days</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {savedTrips.reduce((acc, t) => acc + (t.days || 0), 0)}
            </p>
          </div>

          <div className="bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Total Budget</span>
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {savedTrips.length === 0
                ? "₹0"
                : `₹${savedTrips
                    .reduce((acc, t) => acc + (t.numericBudget || 0), 0)
                    .toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="space-y-3">
          <SectionHeader title="Quick Operations" subtitle="Manage your trip blueprints" icon={Compass} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
              onClick={() => navigate('/plan')}
              className="p-5 bg-indigo-50 border-2 border-indigo-800 flex items-center justify-between cursor-pointer group shadow-[3px_3px_0px_#3730A3]"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-black text-indigo-950 group-hover:text-indigo-700 transition-colors">
                  Create AI Itinerary
                </h4>
                <p className="text-[11px] font-bold text-indigo-800">Configure destination &amp; parameters</p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-indigo-700 text-white flex items-center justify-center border-2 border-indigo-950 shadow-[2px_2px_0px_#1E1B4B]">
                <PlusCircle className="w-5 h-5" />
              </div>
            </Card>

            <Card
              onClick={() => navigate('/saved')}
              className="p-5 bg-emerald-50 border-2 border-emerald-800 flex items-center justify-between cursor-pointer group shadow-[3px_3px_0px_#065F46]"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-black text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  View Saved Trips
                </h4>
                <p className="text-[11px] font-bold text-emerald-800">Access all saved travel blueprints</p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center border-2 border-emerald-950 shadow-[2px_2px_0px_#064E3B]">
                <BookmarkCheck className="w-5 h-5" />
              </div>
            </Card>

            <Card
              onClick={() => navigate('/profile')}
              className="p-5 bg-purple-50 border-2 border-purple-800 flex items-center justify-between cursor-pointer group shadow-[3px_3px_0px_#5B21B6]"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-black text-purple-950 group-hover:text-purple-700 transition-colors">
                  Concierge Preferences
                </h4>
                <p className="text-[11px] font-bold text-purple-800">Adjust default currency &amp; style</p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-purple-700 text-white flex items-center justify-center border-2 border-purple-950 shadow-[2px_2px_0px_#3B0764]">
                <Sparkles className="w-5 h-5" />
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
              <Link to="/saved" className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          {savedTrips.length === 0 ? (
            <Card className="p-8 text-center text-xs font-bold text-slate-500 border-2 border-dashed border-slate-900 bg-white">
              No saved trips found. Click "Plan New Trip" to generate your first itinerary!
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTrips.slice(0, 3).map((trip) => (
                <Card
                  key={trip.id}
                  padding="p-0"
                  className="overflow-hidden border-2 border-slate-900 flex flex-col justify-between hover:-translate-y-1 transition-all rounded-3xl shadow-[4px_4px_0px_#0F172A]"
                >
                  <div>
                    <div className="relative h-40">
                      <img
                        src={trip.coverImage || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80'}
                        alt={trip.destination}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                        {trip.days} Days
                      </span>
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                        {trip.budget}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-black text-slate-900 truncate">{trip.destination}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-bold">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {trip.startDate}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-emerald-600" /> {trip.travelStyle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t-2 border-slate-100 flex items-center justify-between gap-2 mt-2">
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
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border-2 border-transparent hover:border-rose-600 transition-colors"
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
