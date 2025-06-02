import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create the marker icon using our styles
// Default icon URLs don't work in production builds, so we need to redefine them
// This fixes the "missing marker icon" issue in Leaflet
const defaultIcon = new L.Icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Define a type for our region data
interface HeatRegion {
  name: string;
  coords: LatLngExpression;
  tip: string;
  temperature: number;
  feelsLike: number;
  heatIndexLevel: string;
  coolingSites: number;
  alerts: string[];
}

const REGIONS: HeatRegion[] = [
  { 
    name: "Manila", 
    coords: [14.5995, 120.9842] as LatLngExpression, 
    tip: "Stay hydrated and avoid outdoor activities from 11am to 4pm.",
    temperature: 41,
    feelsLike: 44,
    heatIndexLevel: "Extreme",
    coolingSites: 8,
    alerts: ["Heat Emergency in effect", "School closures announced"]
  },
  { 
    name: "Bangkok", 
    coords: [13.7563, 100.5018] as LatLngExpression, 
    tip: "Wear light clothing and check local advisories for heat alerts.",
    temperature: 39,
    feelsLike: 42,
    heatIndexLevel: "Danger",
    coolingSites: 12,
    alerts: ["Excessive heat warning"]
  },
  { 
    name: "Jakarta", 
    coords: [-6.2088, 106.8456] as LatLngExpression, 
    tip: "Use fans indoors and drink water every hour.",
    temperature: 36,
    feelsLike: 38,
    heatIndexLevel: "Warning",
    coolingSites: 5,
    alerts: []
  },
  { 
    name: "Kuala Lumpur", 
    coords: [3.139, 101.6869] as LatLngExpression, 
    tip: "Limit strenuous activity and seek shade when outdoors.",
    temperature: 34,
    feelsLike: 36,
    heatIndexLevel: "Warning",
    coolingSites: 6,
    alerts: ["Heat advisory in effect"]
  },
  { 
    name: "Singapore", 
    coords: [1.3521, 103.8198] as LatLngExpression, 
    tip: "Monitor the heat index and visit cooling centers if needed.",
    temperature: 32,
    feelsLike: 34,
    heatIndexLevel: "Caution",
    coolingSites: 10,
    alerts: []
  },
];

// Get heat level color
const getHeatColor = (level: string): string => {
  switch(level) {
    case "Extreme": return 'var(--heat-extreme)';
    case "Danger": return 'var(--heat-danger)';
    case "Warning": return 'var(--heat-warning)';
    case "Caution": return 'var(--heat-caution)';
    default: return 'var(--heat-safe)';
  }
};

interface HeatwaveMapProps {
  onRegionChange?: (region: string) => void;
}

const HeatwaveMap: React.FC<HeatwaveMapProps> = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  useEffect(() => {
    if (onRegionChange) onRegionChange(selectedRegion.name);
    // eslint-disable-next-line
  }, [selectedRegion]);

  return (
    <div className="heatwave-map bg-white rounded-xl border border-neutral-200 shadow p-0 flex flex-col items-center justify-center mb-12 w-full overflow-hidden" style={{ height: 450 }}>
      <div className="w-full flex items-center justify-between px-6 py-3 bg-neutral-50 border-b border-neutral-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-heading font-medium">Heatwave Impact Map</span>
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-medium text-neutral-700" htmlFor="region-select">Region:</label>
          <select
            id="region-select"
            className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            value={selectedRegion.name}
            onChange={e => {
              const region = REGIONS.find(r => r.name === e.target.value);
              if (region) setSelectedRegion(region);
            }}
          >
            {REGIONS.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Map container */}
      <div className="relative w-full" style={{ height: 350 }}>
        <MapContainer 
          center={selectedRegion.coords} 
          zoom={5} 
          style={{ height: "100%", width: "100%" }} 
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Render all regions as circle markers */}
          {REGIONS.map(region => {
            const isSelected = region.name === selectedRegion.name;
            const heatColor = getHeatColor(region.heatIndexLevel);
            
            return (
              <React.Fragment key={region.name}>
                {/* Heat intensity circle */}
                <CircleMarker 
                  center={region.coords}
                  radius={isSelected ? 25 : 20}
                  pathOptions={{ 
                    fillColor: heatColor,
                    fillOpacity: 0.6,
                    color: isSelected ? '#ffffff' : heatColor,
                    weight: isSelected ? 2 : 1
                  }}
                  eventHandlers={{
                    click: () => setSelectedRegion(region)
                  }}
                >
                  <Popup>
                    <div className="font-medium">{region.name}</div>
                    <div>Temperature: {region.temperature}°C</div>
                    <div>Feels Like: {region.feelsLike}°C</div>
                    <div>Heat Level: {region.heatIndexLevel}</div>
                    <div>Cooling Centers: {region.coolingSites}</div>
                  </Popup>
                </CircleMarker>
                
                {/* City marker */}
                <Marker position={region.coords} icon={defaultIcon}>
                  <Popup>
                    <div className="text-center">
                      <div className="font-bold">{region.name}</div>
                      <div className="font-medium mt-1" style={{color: heatColor}}>{region.heatIndexLevel} Heat</div>
                      <div className="text-sm text-neutral-600 mt-1">{region.temperature}°C / Feels like {region.feelsLike}°C</div>
                      
                      {region.alerts.length > 0 && (
                        <div className="mt-2 mb-2">
                          <div className="text-xs font-medium text-red-600">ALERTS:</div>
                          <ul className="text-xs text-left list-disc pl-3">
                            {region.alerts.map((alert, i) => (
                              <li key={i}>{alert}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-sm font-medium mt-2">
                        {region.coolingSites} cooling centers available
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Map legend overlay */}
        <div className="absolute bottom-3 left-3 bg-white p-2 rounded-md shadow-md z-[1000] border border-neutral-200 text-xs">
          <div className="font-medium mb-1">Heat Index Levels:</div>
          <div className="grid grid-cols-1 gap-1">
            {["Extreme", "Danger", "Warning", "Caution", "Safe"].map(level => (
              <div key={level} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: getHeatColor(level) }}
                ></div>
                <span>{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety tip footer */}
      <div 
        className="w-full px-5 py-4 border-t text-sm font-medium flex items-center"
        style={{ 
          backgroundColor: `${getHeatColor(selectedRegion.heatIndexLevel)}15`,
          color: getHeatColor(selectedRegion.heatIndexLevel) 
        }}
      >
        <div className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <span className="font-semibold">Safety Tip for {selectedRegion.name}:</span> {selectedRegion.tip}
        </div>
      </div>
    </div>
  );
};

export default HeatwaveMap;
