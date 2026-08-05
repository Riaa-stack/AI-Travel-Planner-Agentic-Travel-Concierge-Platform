import React from 'react';
import { Sparkles, Globe2, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Loader({ text = 'Agentic AI Processing...', currentStep = '', stepIndex = 0 }) {
  const steps = [
    'Analyzing Preferences',
    'Calculating Budget',
    'Planning Route',
    'Checking Weather',
    'Finding Hotels',
    'Building Itinerary',
    'Almost Ready'
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-600 border-r-sky-400 flex items-center justify-center shadow-lg"
        >
          <Compass className="w-10 h-10 text-blue-600 opacity-20" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-slate-900">{text}</h3>
        <p className="text-xs text-slate-500 font-medium">
          Synthesizing optimal routes, weather patterns, and luxury accommodations.
        </p>
      </div>

      {currentStep && (
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-600">
            <span>{currentStep}</span>
            <span>{Math.round(((stepIndex + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
