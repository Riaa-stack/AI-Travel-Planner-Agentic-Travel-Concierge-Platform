import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AutoScrollGallery from '../components/AutoScrollGallery_NoKey';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CloudSun, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Globe2, 
  MessageSquare
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Card from '../components/Card';

function HeroAnimatedCard() {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setPhase(p => (p + 1) % 4), 3400);
    return () => clearInterval(timer);
  }, []);
  const phaseLabels = ['Input', 'Processing', 'Map View', 'Result'];
  const phaseColors = ['#7C3AED', '#0EA5E9', '#10B981', '#F59E0B'];

  return (
    <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
      {/* Glow aura */}
      <div style={{
        position: 'absolute', inset: '-14px', borderRadius: '2rem', opacity: 0.22,
        background: `radial-gradient(ellipse, ${phaseColors[phase]}, transparent 70%)`,
        filter: 'blur(22px)', transition: 'background 1.4s ease',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      <div style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.90)',
        border: '1px solid rgba(255,255,255,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
        borderRadius: 24,
        overflow: 'hidden',
      }}>
        {/* Progress bar */}
        <div style={{ height: 5, background: '#F1F5F9' }}>
          <div style={{
            height: '100%',
            width: `${(phase + 1) * 25}%`,
            background: `linear-gradient(90deg,${phaseColors[0]},${phaseColors[phase]})`,
            transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1)',
            borderRadius: '0 4px 4px 0',
          }} />
        </div>

        {/* Phase tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '10px 14px 10px', borderBottom: '1px solid #F1F5F9', overflowX: 'auto' }}>
          {phaseLabels.map((label, i) => (
            <div key={i} style={{
              padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
              background: i === phase ? phaseColors[i] : '#F1F5F9',
              color: i === phase ? 'white' : '#94A3B8',
              transition: 'all 0.4s ease', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {i < phase ? '✓ ' : ''}{label}
            </div>
          ))}
        </div>

        {/* Panels container */}
        <div style={{ position: 'relative', height: 348, overflow: 'hidden' }}>

          {/* Panel 0: Input */}
          <div style={{
            position: 'absolute', inset: 0, padding: 20,
            opacity: phase === 0 ? 1 : 0,
            transform: phase === 0 ? 'translateY(0)' : phase < 1 ? 'translateY(-14px)' : 'translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            pointerEvents: phase === 0 ? 'auto' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg,#7C3AED,#2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles style={{ width: 16, height: 16, color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Plan Your Journey</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>Fill in your preferences</div>
              </div>
            </div>
            {[
              { label: 'DESTINATION', value: 'Tokyo, Japan \uD83D\uDDFE', color: '#7C3AED', bg: '#F5F3FF' },
              { label: 'DURATION', value: '7 Days', color: '#2563EB', bg: '#EFF6FF' },
              { label: 'BUDGET', value: '$2,800 USD', color: '#059669', bg: '#F0FDF4' },
              { label: 'TRAVEL STYLE', value: '\u2728 Luxury', color: '#D97706', bg: '#FFFBEB' },
            ].map((field, i) => (
              <div key={i} style={{ marginBottom: 9 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: 4 }}>{field.label}</div>
                <div style={{ padding: '7px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: `1.5px solid ${field.color}25`, background: field.bg, color: field.color }}>{field.value}</div>
              </div>
            ))}
            <button style={{
              width: '100%', marginTop: 6, padding: '10px 0', borderRadius: 12, border: 'none',
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: 'linear-gradient(135deg,#7C3AED,#2563EB)',
              boxShadow: '0 4px 14px rgba(124,58,237,0.32)',
            }}>Generate My Blueprint \u2192</button>
          </div>

          {/* Panel 1: Processing */}
          <div style={{
            position: 'absolute', inset: 0, padding: 20,
            opacity: phase === 1 ? 1 : 0,
            transform: phase === 1 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            pointerEvents: phase === 1 ? 'auto' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg,#0EA5E9,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 2s linear infinite' }}>
                <Zap style={{ width: 16, height: 16, color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>AI Processing...</div>
                <div style={{ fontSize: 10, color: '#0EA5E9', fontWeight: 600, animation: 'pulse 1.5s ease-in-out infinite' }}>Generating your blueprint</div>
              </div>
            </div>
            {[
              { text: 'Weather patterns analyzed', state: 'done' },
              { text: 'Hotel zones clustered', state: 'done' },
              { text: 'Route optimization running', state: 'active' },
              { text: 'Budget allocation', state: 'pending' },
              { text: 'Activity scoring', state: 'pending' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px',
                borderRadius: 10, marginBottom: 4,
                background: item.state === 'done' ? '#F0FDF4' : item.state === 'active' ? '#F0F9FF' : '#F8FAFC',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.state === 'done' ? '#D1FAE5' : item.state === 'active' ? '#BAE6FD' : '#E2E8F0' }}>
                  {item.state === 'done' ? <CheckCircle2 style={{ width: 13, height: 13, color: '#10B981' }} /> : item.state === 'active' ? <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0EA5E9', animation: 'pulse 1s ease-in-out infinite' }} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CBD5E1' }} />}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: item.state === 'done' ? '#065F46' : item.state === 'active' ? '#0C4A6E' : '#94A3B8' }}>{item.text}</span>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8', marginBottom: 6, fontWeight: 600 }}><span>Generating blueprint...</span><span>68%</span></div>
              <div style={{ height: 6, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '68%', borderRadius: 999, background: 'linear-gradient(90deg,#7C3AED,#0EA5E9)', animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
            </div>
          </div>

          {/* Panel 2: Map */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: phase === 2 ? 1 : 0,
            transform: phase === 2 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            pointerEvents: phase === 2 ? 'auto' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 16px 10px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg,#10B981,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin style={{ width: 16, height: 16, color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>8 Stops Mapped</div>
                <div style={{ fontSize: 10, color: '#10B981', fontWeight: 700 }}>● Live Interactive Map</div>
              </div>
            </div>
            <div style={{ margin: '0 14px', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', height: 214, position: 'relative', background: 'linear-gradient(135deg,#DBEAFE 0%,#D1FAE5 55%,#FEF9C3 100%)' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <line x1="0" y1="0%" x2="100%" y2="0%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="0%" y1="0" x2="0%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="#94A3B840" strokeWidth="0.5" />
                <path d="M40 185 Q100 130 155 150 Q195 165 240 115 Q270 80 310 118" stroke="#2563EB" strokeWidth="2" fill="none" strokeDasharray="6,3" opacity="0.55" />
              </svg>
              {[
                { x: '12%', y: '78%', color: '#2563EB', label: 'Senso-ji', dur: '1.3s' },
                { x: '36%', y: '60%', color: '#2563EB', label: 'Shinjuku', dur: '1.5s' },
                { x: '50%', y: '67%', color: '#10B981', label: 'Hotel', dur: '1.7s' },
                { x: '63%', y: '49%', color: '#2563EB', label: 'Shibuya', dur: '1.9s' },
                { x: '80%', y: '53%', color: '#F59E0B', label: 'Harajuku', dur: '2.1s' },
              ].map((pin, i) => (
                <div key={i} style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: `lp-bounce ${pin.dur} ease-in-out infinite alternate` }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', border: '2.5px solid white', background: pin.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.22)' }}>
                      <MapPin style={{ width: 12, height: 12, color: 'white' }} />
                    </div>
                    <div style={{ marginTop: 2, padding: '2px 5px', background: 'white', borderRadius: 5, boxShadow: '0 1px 4px rgba(0,0,0,0.12)', fontSize: 8, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>{pin.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, padding: '8px 14px' }}>
              {[['#2563EB', 'Activities'], ['#10B981', 'Hotels'], ['#F59E0B', 'Highlights']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 600, color: '#475569' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Result */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: phase === 3 ? 1 : 0,
            transform: phase === 3 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            pointerEvents: phase === 3 ? 'auto' : 'none',
          }}>
            <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80" alt="Tokyo" style={{ width: '100%', height: 196, objectFit: 'cover', display: 'block' }} referrerPolicy="no-referrer" />
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>\u2728 AI Generated</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#0F172A' }}>$2,800</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>7-Day Tokyo &amp; Kyoto Cherry Blossom</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin style={{ width: 12, height: 12, color: '#EF4444' }} />Japan</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CloudSun style={{ width: 12, height: 12, color: '#F59E0B' }} />18\xB0C</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star style={{ width: 12, height: 12, color: '#FBBF24', fill: '#FBBF24' }} />4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Agentic Route Optimization',
      description: 'Generates non-stop, cluster-based route paths that reduce transit time and eliminate backtrack fatigue.',
      icon: Compass,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Dynamic Budget Allocator',
      description: 'Smartly splits your funds across luxury stays, fine dining, flights, and hidden local activities.',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Predictive Weather Radar',
      description: 'Aligns indoor and outdoor activities with live micro-climate forecasts and UV advisories.',
      icon: CloudSun,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Interactive Leaflet Canvas',
      description: 'Color-coded activity markers with coordinates, route lines, zoom, and live navigation links.',
      icon: Layers,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Crowd Density Radar',
      description: 'Recommends ideal visit times to beat long museum queues and tourist bottlenecks.',
      icon: Globe2,
      color: 'bg-sky-50 text-sky-600'
    },
    {
      title: '24/7 Agentic Concierge',
      description: 'Re-plan itineraries instantly if weather changes, flights adjust, or budget limits shift.',
      icon: Zap,
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Set Destination & Preferences',
      description: 'Input your target city, budget, travel style, duration, and group category.'
    },
    {
      number: '02',
      title: 'Agentic AI Processing',
      description: 'Our engine computes weather patterns, hotel availabilities, and landmark clusters.'
    },
    {
      number: '03',
      title: 'Receive Custom Travel Blueprint',
      description: 'Explore day-wise activities, budget charts, Leaflet routes, and local etiquette tips.'
    }
  ];

  const testimonials = [
    {
      name: 'Sophia Chen',
      role: 'Luxury Travel Journalist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      comment: 'JetSetAI planned our 10-day Kyoto & Tokyo expedition flawlessly. The crowd radar saved us hours at Senso-ji!',
      rating: 5
    },
    {
      name: 'Marcus Vance',
      role: 'Tech Founder & Solo Explorer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      comment: 'The budget breakdown and interactive Leaflet map made exploring the Swiss Alps seamless. Unmatched AI precision.',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'Food & Wine Curator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      comment: 'Re-planning our Paris trip during a sudden rainstorm took 1 click. Truly feels like having a personal concierge.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How does the AI Travel Planner generate itineraries?',
      a: 'Our Agentic Concierge leverages multimodal spatial models, real-time weather feeds, and historical crowd statistics to generate tailored, hour-by-hour travel blueprints.'
    },
    {
      q: 'Can I customize or re-plan a generated trip?',
      a: 'Yes! Simply use the "Replan Trip" button to adjust for budget changes, weather shifts, or custom preferences anytime.'
    },
    {
      q: 'Are the Leaflet maps interactive with directions?',
      a: 'Absolutely. Leaflet maps feature color-coded markers (Blue for activities, Green for hotels, Orange for attractions) with direct navigation buttons.'
    },
    {
      q: 'Is my data secure when saving trips?',
      a: 'We use JWT token encryption and secure local storage to keep your trips, preferences, and personal details completely private.'
    }
  ];

  return (
    <MainLayout>
      {/* ── FIXED SCROLLING PHOTO BACKGROUND ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <AutoScrollGallery />
        <style>{`
          .asg-container {
            height: 100vh !important; min-height: 100vh !important;
            padding: 18px 0 !important; gap: 0 !important;
            justify-content: space-around !important;
            background: #DDE2EA !important;
          }
          .asg-card { border-radius: 10px !important; opacity: 0.95; }
          .asg-row-track-wrapper:hover .asg-row-track { animation-play-state: running !important; }
        `}</style>
      </div>

      {/* Global tokens */}
      <style>{`
        .lp-card {
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(226,232,240,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .lp-text-block {
          background: rgba(255,255,255,0.92);
          padding: 32px;
          border-radius: 24px;
          border: 1px solid rgba(226,232,240,0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .lp-section { position: relative; z-index: 1; }
        @keyframes lp-bounce {
          from { transform: translateY(0) translate(-50%,-50%); }
          to   { transform: translateY(-7px) translate(-50%,-50%); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="lp-section" style={{ paddingTop: 60, paddingBottom: 96 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
              className="lp-text-block" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.04em', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', boxShadow: '0 4px 20px rgba(124,58,237,0.40)' }}>
                  <Sparkles style={{ width: 14, height: 14, color: '#FCD34D' }} />
                  Agentic Concierge 2.0
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(44px,7vw,78px)', fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.03em', color: '#0F172A', margin: 0 }}>
                Plan Your<br />
                <span style={{ background: 'linear-gradient(135deg,#7C3AED 0%,#2563EB 45%,#0EA5E9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Perfect Trip</span><br />
                <span style={{ fontSize: '0.68em', fontWeight: 800, color: '#334155' }}>in seconds.</span>
              </h1>
              <p style={{ fontSize: 16, color: '#1E293B', lineHeight: 1.7, maxWidth: 480, margin: 0, fontWeight: 500 }}>
                Hyper-personalized itineraries, Leaflet route maps, smart budget allocation, and live weather &amp; crowd forecasts — powered by Agentic AI.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/plan')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', borderRadius: 16, border: 'none', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', boxShadow: '0 8px 28px rgba(124,58,237,0.42)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(124,58,237,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(124,58,237,0.42)'; }}>
                  <Sparkles style={{ width: 16, height: 16, color: '#FCD34D' }} />
                  Plan Your Trip Now
                </button>
                <a href="#features" className="lp-card"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 16, textDecoration: 'none', color: '#1E293B', fontSize: 14, fontWeight: 700, transition: 'transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; }}>
                  Explore Features <ArrowRight style={{ width: 16, height: 16 }} />
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { label: 'No Credit Card', color: '#059669' },
                  { label: 'Instant Map Sync', color: '#2563EB' },
                  { label: '24/7 AI Re-Planning', color: '#7C3AED' },
                ].map((b, i) => (
                  <div key={i} className="lp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#334155' }}>
                    <CheckCircle2 style={{ width: 13, height: 13, color: b.color }} />{b.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Animated Card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.15 }}>
              <HeroAnimatedCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="lp-section" style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-text-block flex flex-col lg:flex-row lg:items-center justify-between gap-8" style={{ marginBottom: 52 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', padding: '6px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', boxShadow: '0 4px 18px rgba(99,102,241,0.40)' }}>
                <Zap style={{ width: 14, height: 14, color: '#FDE68A' }} />
                Powered By Intelligence
              </span>
              <h2 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: '#0F172A' }}>
                Features Built For{' '}
                <span style={{ background: 'linear-gradient(135deg,#6366F1,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Modern Explorers</span>
              </h2>
            </div>
            <p style={{ maxWidth: 300, fontSize: 15, color: '#334155', lineHeight: 1.7, fontWeight: 500 }}>
              Every detail intelligently mapped — from arrival to departure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              const palettes = [
                { accent: '#2563EB', bg: '#EFF6FF', glow: 'rgba(37,99,235,0.10)' },
                { accent: '#059669', bg: '#F0FDF4', glow: 'rgba(5,150,105,0.10)' },
                { accent: '#D97706', bg: '#FFFBEB', glow: 'rgba(217,119,6,0.10)' },
                { accent: '#7C3AED', bg: '#F5F3FF', glow: 'rgba(124,58,237,0.10)' },
                { accent: '#0EA5E9', bg: '#F0F9FF', glow: 'rgba(14,165,233,0.10)' },
                { accent: '#E11D48', bg: '#FFF1F2', glow: 'rgba(225,29,72,0.10)' },
              ];
              const p = palettes[idx % 6];
              return (
                <motion.div key={idx} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  className="lp-card" style={{ borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, borderTop: `3px solid ${p.accent}` }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 24px ${p.glow}` }}>
                    <Icon style={{ width: 22, height: 22, color: p.accent }} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>{feat.title}</h3>
                  <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65, margin: 0 }}>{feat.description}</p>
                  <div style={{ height: 2, width: 40, borderRadius: 999, background: `linear-gradient(90deg,${p.accent},transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-section" style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-text-block" style={{ textAlign: 'center', marginBottom: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#0EA5E9,#10B981)', boxShadow: '0 4px 16px rgba(14,165,233,0.35)' }}>3 Steps To Liftoff</span>
            <h2 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: '#0F172A' }}>
              How JetSetAI{' '}
              <span style={{ background: 'linear-gradient(135deg,#0EA5E9,#10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Crafts Your Blueprint</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => {
              const sp = [
                { accent: '#7C3AED', bg: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)' },
                { accent: '#0EA5E9', bg: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)' },
                { accent: '#10B981', bg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)' },
              ][idx];
              return (
                <motion.div key={idx} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280 }}
                  className="lp-card" style={{ borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -24, right: -24, width: 80, height: 80, borderRadius: '50%', background: sp.accent, opacity: 0.07 }} />
                  <div style={{ width: 60, height: 60, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, fontFamily: 'monospace', background: sp.bg, color: sp.accent, border: `2px solid ${sp.accent}28` }}>{step.number}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65, margin: 0 }}>{step.description}</p>
                  </div>
                  <div style={{ height: 3, width: 52, borderRadius: 999, background: `linear-gradient(90deg,${sp.accent},transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section" style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-text-block flex flex-wrap items-center justify-between gap-6" style={{ marginBottom: 52 }}>
            <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', padding: '6px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#10B981,#0EA5E9)', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
                <Star style={{ width: 13, height: 13, color: '#FDE68A', fill: '#FDE68A' }} />
                Loved Globally
              </span>
              <h2 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: '#0F172A' }}>
                Trusted By{' '}
                <span style={{ background: 'linear-gradient(135deg,#10B981,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Thousands</span>
              </h2>
            </div>
            <div style={{ padding: '16px 28px', borderRadius: 20, textAlign: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>4.9 ★</div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginTop: 4 }}>Average Rating</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280 }}
                className="lp-card" style={{ borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} style={{ width: 15, height: 15, fill: '#FBBF24', color: '#FBBF24' }} />)}
                </div>
                <p style={{ fontSize: 13, color: '#334155', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>&#8220;{t.comment}&#8221;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} referrerPolicy="no-referrer" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="lp-section" style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-text-block" style={{ marginBottom: 52, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', padding: '6px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#F59E0B,#EF4444)', boxShadow: '0 4px 16px rgba(245,158,11,0.35)' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: '#0F172A' }}>
              Everything You{' '}
              <span style={{ background: 'linear-gradient(135deg,#F59E0B,#EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Need To Know</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((faq, idx) => (
              <motion.div key={idx} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}
                className="lp-card" style={{ borderRadius: 18, padding: 22, display: 'flex', flexDirection: 'column', gap: 10, borderLeft: '3px solid #F59E0B' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare style={{ width: 13, height: 13, color: 'white' }} />
                  </span>
                  {faq.q}
                </h3>
                <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, margin: 0, paddingLeft: 34 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-section" style={{ padding: '80px 0 110px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-text-block" style={{ borderRadius: 32, padding: '72px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.14),transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,0.14),transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
              <h2 style={{ fontSize: 'clamp(30px,6vw,68px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.0, margin: 0, color: '#0F172A' }}>
                Ready To Experience<br />
                <span style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>The Future Of Travel?</span>
              </h2>
              <p style={{ fontSize: 15, color: '#475569', maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
                Generate your personalized, fully interactive travel blueprint with Leaflet maps and budget tracking in under 10 seconds.
              </p>
              <button onClick={() => navigate('/plan')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '15px 40px', borderRadius: 18, border: 'none', color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', boxShadow: '0 12px 40px rgba(124,58,237,0.45)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 16px 50px rgba(124,58,237,0.58)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(124,58,237,0.45)'; }}>
                <Sparkles style={{ width: 18, height: 18, color: '#FCD34D' }} />
                Start Planning Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
