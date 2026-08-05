import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookmarkCheck, 
  User, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Plan New Trip', path: '/plan', icon: Sparkles, badge: 'AI' },
    { label: 'My Itineraries', path: '/saved', icon: BookmarkCheck },
    { label: 'Settings & Profile', path: '/profile', icon: User }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 hidden md:flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-100 text-[#2563EB] shadow-xs'
                        : 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#2563EB]/10 text-[#2563EB] font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Concierge Live Box */}
        <div className="bg-[#0F172A] p-4 rounded-2xl text-white shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">
              AI Concierge Live
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            "Monitoring weather & crowds for your upcoming trips. Routes auto-optimized."
          </p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-xs font-semibold text-white">
            Concierge Active
          </button>
        </div>

      </div>

      {/* Pro Account Footer */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pro Account</div>
        <div className="text-xs font-bold text-[#0F172A]">{user?.name || 'Explorer'}</div>
        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
          <div className="bg-[#2563EB] w-3/4 h-1 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
