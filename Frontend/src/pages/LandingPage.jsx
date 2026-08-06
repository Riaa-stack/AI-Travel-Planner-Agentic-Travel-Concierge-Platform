import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Next-Gen Agentic Concierge 2.0</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Plan Your Perfect <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">AI Travel Journey</span> In Seconds
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience luxury, hyper-personalized trip planning powered by Agentic AI. Get custom day-wise itineraries, Leaflet interactive route maps, budget breakdowns, and real-time weather & crowd forecasts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Button
                  onClick={() => navigate('/plan')}
                  size="lg"
                  icon={Sparkles}
                  className="w-full sm:w-auto shadow-md shadow-blue-500/20"
                >
                  Plan Your Trip Now
                </Button>
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-white transition-all"
                >
                  Explore Features <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-slate-200/80 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Instant Leaflet Map Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>24/7 AI Re-Planning</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-3xl blur-lg opacity-30 animate-pulse" />

                <Card className="relative overflow-hidden p-0 border-2 border-white bg-white/90 backdrop-blur-md shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80"
                    alt="Tokyo Travel"
                    className="w-full h-64 sm:h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        AI Generated Trip
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">$2,800 Target</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">7 Days Tokyo & Kyoto Cherry Blossom Tour</h3>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-500" /> Japan</span>
                      <span className="flex items-center gap-1"><CloudSun className="w-3.5 h-3.5 text-amber-500" /> 18°C Pleasant</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9 Rating</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Engineered For Modern Explorers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Powerful Features Driven By Agentic Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Every detail of your journey is intelligently mapped out from arrival to departure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card key={idx} className="space-y-3 border-slate-200/70 hover:border-blue-300 transition-all">
                  <div className={`w-10 h-10 rounded-xl ${feat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              3 Simple Steps
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How JetSetAI Crafts Your Dream Trip
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <Card key={idx} className="relative p-6 space-y-3 bg-white border-slate-200/80">
                <span className="text-3xl font-extrabold text-blue-600/30 block font-mono">{step.number}</span>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Global Reviews
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted By Thousands Of Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="space-y-4 border-slate-200/80">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="space-y-2 border-slate-200/80">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready To Experience The Future Of AI Travel?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto leading-relaxed">
            Generate your personalized, fully interactive travel blueprint with Leaflet maps and budget tracking in under 10 seconds.
          </p>
          <Button
            onClick={() => navigate('/plan')}
            variant="accent"
            size="lg"
            icon={Sparkles}
            className="shadow-lg hover:scale-105"
          >
            Start Planning Free
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
