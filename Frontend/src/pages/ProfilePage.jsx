import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut, CheckCircle, Save, Sparkles, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@example.com');
  const [currency, setCurrency] = useState(user?.preferences?.currency || 'USD');
  const [travelStyle, setTravelStyle] = useState(user?.preferences?.travelStyle || 'Luxury Explorer');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      preferences: {
        currency,
        travelStyle
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Profile & Settings</h1>
            <p className="text-xs text-slate-500">Manage your credentials, preferred currency, and AI Concierge defaults.</p>
          </div>
          <Button
            variant="danger"
            size="sm"
            icon={LogOut}
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Logout
          </Button>
        </div>

        {/* Profile Card Header */}
        <Card className="p-6 bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-lg space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-bold">{user?.name}</h2>
              <p className="text-xs text-sky-100">{user?.email}</p>
              <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Member Since 2024
              </span>
            </div>
          </div>
        </Card>

        {/* Edit Profile Form */}
        <Card className="p-6 sm:p-8 shadow-sm border-slate-200/80 space-y-6 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" /> General Preferences
            </h3>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Settings Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                icon={User}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Dropdown
                label="Preferred Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)', 'AUD ($)']}
              />

              <Dropdown
                label="Default Travel Style"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                options={['Luxury Explorer', 'Relaxed & Scenic', 'Cultural', 'Budget Backpacker']}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button type="submit" icon={Save} size="md">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </DashboardLayout>
  );
}
