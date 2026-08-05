import React, { useState } from 'react';
import { ChevronDown, Calendar, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ items = [], renderContent }) {
  const [openIndexes, setOpenIndexes] = useState([0]); // First item expanded by default

  const toggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  D{item.day || idx + 1}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Day {item.day || idx + 1}: {item.theme || 'Exploration'}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {item.activities?.length || 0} Scheduled Agentic Activities
                  </p>
                </div>
              </div>
              <div className={`p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-5 pt-2 sm:px-6 border-t border-slate-100"
                >
                  {item.travelTip && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Travel Tip: </span>
                        <span>{item.travelTip}</span>
                      </div>
                    </div>
                  )}

                  {renderContent ? renderContent(item, idx) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
