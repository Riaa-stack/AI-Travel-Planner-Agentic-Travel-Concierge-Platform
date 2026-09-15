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
    <aside className="w-64 bg-[#F4F1EA] border-2 border-slate-900 rounded-3xl shadow-[4px_4px_0px_#0F172A] p-4 hidden md:flex flex-col justify-between shrink-0 my-2">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <div className="px-3 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
            Concierge Navigation
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all border-2 ${
                      isActive
                        ? 'bg-blue-600 text-white border-slate-900 shadow-[3px_3px_0px_#0F172A]'
                        : 'bg-white/80 text-slate-700 border-transparent hover:border-slate-900 hover:bg-white hover:shadow-[2px_2px_0px_#0F172A]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-400 text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-full border border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Concierge Live Box */}
        <div className="bg-[#F3E8FF] border-2 border-purple-800 p-4 rounded-2xl text-purple-950 shadow-[3px_3px_0px_#6B21A8] space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-800">
              AI Concierge Live
            </span>
          </div>
          <p className="text-xs leading-relaxed font-bold text-purple-900">
            "Monitoring weather &amp; crowds for your upcoming trips. Routes auto-optimized."
          </p>
          <button className="w-full py-1.5 bg-purple-800 hover:bg-purple-900 transition-colors rounded-xl text-xs font-extrabold text-white border border-purple-950 shadow-[2px_2px_0px_#3B0764]">
            Concierge Active
          </button>
        </div>

      </div>

      {/* Pro Account Footer */}
      <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-[2px_2px_0px_#0F172A] space-y-2">
        <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Pro Account</div>
        <div className="text-xs font-black text-slate-900">{user?.name || 'Explorer'}</div>
        <div className="w-full bg-slate-100 border border-slate-900 h-2 rounded-full overflow-hidden">
          <div className="bg-emerald-500 w-3/4 h-full rounded-full" />
        </div>
      </div>
    </aside>
  );
}
