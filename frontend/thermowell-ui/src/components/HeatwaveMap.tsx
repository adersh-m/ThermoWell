import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const REGIONS = [
	{ name: "Manila", coords: [14.5995, 120.9842] as LatLngExpression, tip: "Stay hydrated and avoid outdoor activities from 11am to 4pm." },
	{ name: "Bangkok", coords: [13.7563, 100.5018] as LatLngExpression, tip: "Wear light clothing and check local advisories for heat alerts." },
	{ name: "Jakarta", coords: [-6.2088, 106.8456] as LatLngExpression, tip: "Use fans indoors and drink water every hour." },
	{ name: "Kuala Lumpur", coords: [3.139, 101.6869] as LatLngExpression, tip: "Limit strenuous activity and seek shade when outdoors." },
	{ name: "Singapore", coords: [1.3521, 103.8198] as LatLngExpression, tip: "Monitor the heat index and visit cooling centers if needed." },
];

type HeatwaveMapProps = {
  onRegionChange?: (region: string) => void;
};

const HeatwaveMap: React.FC<HeatwaveMapProps> = ({ onRegionChange }) => {
	const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  useEffect(() => {
    if (onRegionChange) onRegionChange(selectedRegion.name);
    // eslint-disable-next-line
  }, [selectedRegion]);

	return (
		<div className="bg-white rounded-xl border border-gray-100 shadow p-0 flex flex-col items-center justify-center mb-12 w-full overflow-hidden" style={{ height: 390 }}>
			<div className="w-full flex justify-end px-4 py-2 bg-gray-50 border-b border-gray-100">
				<label className="mr-2 font-medium text-gray-700" htmlFor="region-select">Region:</label>
				<select
					id="region-select"
					className="border rounded px-2 py-1 text-sm"
					style={{ minWidth: `${Math.max(...REGIONS.map(r => r.name.length)) + 2}ch` }}
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
			<MapContainer center={selectedRegion.coords} zoom={5} style={{ height: 300, width: "100%" }} scrollWheelZoom={false}>
				<TileLayer
					attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={selectedRegion.coords}>
					<Popup>
						Example Cooling Center<br /> {selectedRegion.name}
					</Popup>
				</Marker>
			</MapContainer>
			<div className="w-full px-4 py-3 bg-blue-50 border-t border-blue-100 text-blue-900 text-sm text-center font-medium">
				<span className="font-semibold">Safety Tip for {selectedRegion.name}:</span> {selectedRegion.tip}
			</div>
		</div>
	);
};

export default HeatwaveMap;
