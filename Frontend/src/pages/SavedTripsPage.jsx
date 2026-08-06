import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookmarkCheck, 
  PlusCircle, 
  Search, 
  Trash2, 
  Eye, 
  Calendar, 
  DollarSign, 
  Compass,
  Edit3
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

export default function SavedTripsPage() {
  const { savedTrips, selectTrip, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTrips = savedTrips.filter((t) =>
    t.destination.toLowerCase().includes(search.toLowerCase()) ||
    t.travelStyle.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (trip) => {
    selectTrip(trip);
    navigate('/trip-result');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Travel Plans</h1>
            <p className="text-xs text-slate-500">Manage and explore all your custom AI itineraries.</p>
          </div>

          <Button
            onClick={() => navigate('/plan')}
            icon={PlusCircle}
            size="md"
          >
            Plan New Trip
          </Button>
        </div>

        {/* Search Input */}
        <div className="max-w-md">
          <Input
            icon={Search}
            placeholder="Search by destination or style (e.g. Tokyo, Luxury)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid Layout of Trips */}
        {filteredTrips.length === 0 ? (
          <EmptyState
            title="No Saved Trips Found"
            description="No itineraries match your search query or list is empty."
            actionText="Plan A New Trip"
            onAction={() => navigate('/plan')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  padding="p-0"
                  className="overflow-hidden border-slate-200/80 flex flex-col justify-between h-full hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="relative h-44">
                      <img
                        src={trip.coverImage || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80'}
                        alt={trip.destination}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {trip.days} Days
                      </span>
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        <>
                          <div className="font-bold text-white">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            }).format(trip.numericBudget)}
                          </div>

                          <div className="text-[10px] text-blue-100">
                            (
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(trip.numericBudget * 87)}
                            )
                          </div>
                        </>
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 truncate">{trip.destination}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {trip.startDate}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-emerald-600" /> {trip.travelStyle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleView(trip)}
                      className="flex-1"
                    >
                      View Trip
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit3}
                      onClick={() => {
                        selectTrip(trip);
                        navigate('/plan');
                      }}
                      className="px-2.5"
                      title="Edit Preferences"
                    />

                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
