import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Heart, Shield, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">VoyageAI</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Next-generation AI Travel Concierge. Seamlessly generating custom itineraries, weather forecasts, crowd insights, and real-time navigation.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-400" /> SSL Secured</span>
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-400" /> #1 AI Travel App</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/plan" className="hover:text-blue-400 transition-colors">AI Itinerary Generator</Link></li>
              <li><Link to="/saved" className="hover:text-blue-400 transition-colors">Saved Travel Plans</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Live Concierge Dashboard</Link></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Leaflet Interactive Maps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Inspiration</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Tokyo Cherry Blossom Tour</span></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Romantic Paris & Amalfi</span></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Swiss Alpine Escape</span></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Bali Culinary Retreat</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Support & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ & Guide</a></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-blue-400 transition-colors">Contact Support</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} VoyageAI Platform. Built for global travelers with precision.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> English (US)</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> AI Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
