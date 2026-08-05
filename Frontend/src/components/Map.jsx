import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { Layers, Maximize2, Minimize2, Navigation, Compass } from 'lucide-react';

// Custom Marker DivIcons with standard custom SVG pin styling and distinct colors
function createCustomIcon(colorClass, symbol) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${colorClass};
        width: 28px;
        height: 28px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 11px;
          line-height: 1;
        ">${symbol}</span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
}

const blueIcon = createCustomIcon('#2563EB', 'A');  // Activity (Blue)
const greenIcon = createCustomIcon('#22C55E', 'H'); // Hotel (Green)
const orangeIcon = createCustomIcon('#F97316', 'T'); // Tourist Place (Orange)

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function Map({
  destination,
  itinerary = [],
  hotels = [],
  attractions = [],
  className = 'h-[450px]'
}) {
  const [layer, setLayer] = useState('standard'); // 'standard', 'satellite', 'dark'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeRoute, setActiveRoute] = useState([]);

  // Extract all activity coordinates to construct route lines
  const routePoints = [];
  itinerary.forEach((day) => {
    day.activities?.forEach((act) => {
      if (
        Array.isArray(act.coordinates) &&
        act.coordinates.length === 2 &&
        act.coordinates[0] != null &&
        act.coordinates[1] != null
      ) {
        routePoints.push(act.coordinates);
      }
    });
  });

  // Default center if no coordinates
  const defaultCenter =
  routePoints.length > 0
    ? routePoints[0]
    : Array.isArray(hotels[0]?.coordinates)
      ? hotels[0].coordinates
      : [35.6762, 139.6503];

  const tileUrls = {
    standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  const handleNavigate = (coords, name) => {
    if (!coords) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
    window.open(url, '_blank');
  };

  const handleDrawRoute = (coords) => {
    if (!coords) return;
    setActiveRoute([defaultCenter, coords]);
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none h-full' : className
    }`}>
      {/* Map Control Bar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/80 shadow-md">
        <button
          onClick={() => setLayer(layer === 'standard' ? 'satellite' : layer === 'satellite' ? 'dark' : 'standard')}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
          title="Switch Map Layer"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span className="capitalize">{layer}</span>
        </button>

        <div className="w-px h-4 bg-slate-200" />

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 text-slate-600 hover:text-slate-900 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-md p-2 px-3 rounded-xl border border-slate-200/80 shadow-md text-[10px] font-semibold flex items-center gap-3">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Activities</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Hotels</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Tourist Attractions</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={defaultCenter} zoom={12} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={tileUrls[layer] || tileUrls.standard}
        />

        {/* Polylines for day activities */}
        {routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            color="#2563EB"
            weight={3.5}
            opacity={0.8}
            dashArray="6, 8"
          />
        )}

        {/* Dynamic single route line */}
        {activeRoute.length > 1 && (
          <Polyline
            positions={activeRoute}
            color="#EA580C"
            weight={4}
            opacity={0.9}
          />
        )}

        {/* Render Day Activities Markers (Blue) */}
        {itinerary.map((day) =>
          day.activities?.map((act, idx) => {
            if (
              !Array.isArray(act.coordinates) ||
              act.coordinates.length !== 2
            ) {
              return null;
            }
            return (
              <Marker
                key={`act_${day.day}_${idx}`}
                position={act.coordinates}
                icon={blueIcon}
              >
                <Popup>
                  <MarkerPopup
                    name={act.name}
                    address={act.location}
                    coordinates={act.coordinates}
                    type="activity"
                    onNavigate={handleNavigate}
                    onDrawRoute={handleDrawRoute}
                  />
                </Popup>
              </Marker>
            );
          })
        )}

        {/* Render Hotels Markers (Green) */}
        {hotels.map((hotel, idx) => {
          if (
            !Array.isArray(hotel.coordinates) ||
            hotel.coordinates.length !== 2
          ) {
            return null;
          }
          return (
            <Marker key={`hotel_${idx}`} position={hotel.coordinates} icon={greenIcon}>
              <Popup>
                <MarkerPopup
                  name={hotel.name}
                  address={hotel.address}
                  coordinates={hotel.coordinates}
                  type="hotel"
                  onNavigate={handleNavigate}
                  onDrawRoute={handleDrawRoute}
                />
              </Popup>
            </Marker>
          );
        })}

        {/* Render Attractions Markers (Orange) */}
        {attractions.map((att, idx) => {
          if (
            !Array.isArray(att.coordinates) ||
            att.coordinates.length !== 2
          ) {
            return null;
          }
          return (
            <Marker key={`att_${idx}`} position={att.coordinates} icon={orangeIcon}>
              <Popup>
                <MarkerPopup
                  name={att.name}
                  address={att.address}
                  coordinates={att.coordinates}
                  type="tourist"
                  onNavigate={handleNavigate}
                  onDrawRoute={handleDrawRoute}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
