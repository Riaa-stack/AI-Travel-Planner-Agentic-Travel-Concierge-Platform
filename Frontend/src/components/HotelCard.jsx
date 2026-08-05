import React from 'react';
import { Hotel, MapPin, Star, Navigation, Map } from 'lucide-react';

export default function HotelCard({ hotel, onShowOnMap, onGetDirections }) {
  if (!hotel) return null;

  return (
    <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Hotel className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{hotel.name}</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate max-w-[180px]">{hotel.address}</span>
              </p>
            </div>
          </div>
          {hotel.rating && (
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-[11px] px-2 py-0.5 rounded-lg border border-amber-200/60 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {hotel.rating}
            </span>
          )}
        </div>

        {hotel.price && (
          <p className="text-xs font-bold text-slate-800">
            Est. Price: <span className="text-blue-600">{hotel.price}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onShowOnMap && onShowOnMap(hotel)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
        >
          <Map className="w-3.5 h-3.5 text-blue-600" />
          Location on Map
        </button>

        <button
          onClick={() => onGetDirections && onGetDirections(hotel)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          Directions
        </button>
      </div>
    </div>
  );
}
