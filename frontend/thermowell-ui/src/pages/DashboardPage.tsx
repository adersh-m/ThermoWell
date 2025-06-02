import React, { useState, useEffect } from "react";
import HeatwaveMap from "../components/HeatwaveMap";
import { DashboardService } from "../services/DashboardService";

const DashboardPage: React.FC = () => {
	const [selectedRegion, setSelectedRegion] = useState("Manila");
	const [vulnerableGroups, setVulnerableGroups] = useState<any[]>([]);

	useEffect(() => {
		const loadVulnerableGroups = async () => {
			try {
				const groups = await DashboardService.fetchVulnerableGroups();
				setVulnerableGroups(groups);
			} catch (error) {
				console.error('Failed to load vulnerable groups:', error);
				setVulnerableGroups([]);
			}
		};
		
		loadVulnerableGroups();
	}, []);

	// Helper for navigation
	const navigateTo = (path: string) => {
		window.location.href = path;
	};

	// Static content matching the wireframe (no sidebar)
	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
				Current Heatwave Status
			</h1>
			{/* Status Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<div className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start">
					<div className="flex items-center mb-3">
						<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
							i
						</div>
						<span className="text-gray-600 text-sm font-medium">
							Heat Level
						</span>
					</div>
					<div className="text-xl font-semibold text-gray-900 mb-1">
						Extreme
					</div>
					<div className="text-gray-500 text-sm mb-4 whitespace-pre-line">
						Temperature: 41°C
						<br />
						Feels like: 44°C
					</div>
					<button className="btn-primary text-sm"
						onClick={() => navigateTo('/resources?section=heat-level')}
					>
						Learn More
					</button>
				</div>
				<div className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start">
					<div className="flex items-center mb-3">
						<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
							⚠
						</div>
						<span className="text-gray-600 text-sm font-medium">
							Advisory
						</span>
					</div>
					<div className="text-xl font-semibold text-gray-900 mb-1">
						Stay Indoors
					</div>
					<div className="text-gray-500 text-sm mb-4">
						High risk of heatstroke. Limit outdoor activity.
					</div>
					<button className="btn-primary text-sm"
						onClick={() => navigateTo('/advisories')}
					>
						View Details
					</button>
				</div>
				<div className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start">
					<div className="flex items-center mb-3">
						<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
							🔔
						</div>
						<span className="text-gray-600 text-sm font-medium">Alerts</span>
					</div>
					<div className="text-xl font-semibold text-gray-900 mb-1">
						2 New Alerts
					</div>
					<div className="text-gray-500 text-sm mb-4">
						Urgent health advisories issued for your area.
					</div>
					<button className="btn-primary text-sm"
						onClick={() => navigateTo('/advisories')}
					>
						See Alerts
					</button>
				</div>
			</div>
			{/* Vulnerable Groups */}
			<section>
				<h2 className="text-2xl font-semibold mb-6 text-center">
					Vulnerable Groups
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{vulnerableGroups.map((group) => (
						<div
							key={group.label}
							className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start"
						>
							<div className="flex items-center mb-3">
								<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
									{group.icon}
								</div>
								<span className="text-gray-600 text-sm font-medium">
									{group.label}
								</span>
							</div>
							<div className="text-lg font-semibold text-gray-900 mb-1">
								{group.title}
							</div>
							<div className="text-gray-500 text-sm mb-4">
								{group.getAdvice(selectedRegion)}
							</div>
							<button className="btn-primary text-xs"
								onClick={() => navigateTo(`/tips?group=${group.label.toLowerCase()}`)}
							>
								Advice
							</button>
						</div>
					))}
				</div>
			</section>
			{/* Heatwave Map & Alerts */}
			<section>
				<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<h2 className="text-2xl font-semibold text-center md:text-left mb-0">
						Heatwave Map
					</h2>
					<div className="flex flex-col md:flex-row md:items-center gap-2">
						<div className="bg-red-50 border border-red-200 rounded px-4 py-2 text-red-800 text-sm font-medium flex items-center gap-2 mb-2 md:mb-0">
							<span className="text-lg">⚠️</span>
							<span>
								Extreme Heat Advisory: Stay indoors 11am–4pm. Hydrate
								frequently.
							</span>
						</div>
						<button
							className="btn-primary text-sm"
							onClick={() => {
								const csv = `Region,Status\n${selectedRegion},Extreme Heat`;
								const blob = new Blob([csv], { type: "text/csv" });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = `heatwave-status-${selectedRegion}.csv`;
								a.click();
								URL.revokeObjectURL(url);
							}}
						>
							Download Data
						</button>
						<button
							className="btn-secondary text-sm"
							onClick={() => {
								navigator.clipboard.writeText(
									window.location.href + `?region=${selectedRegion}`
								);
								alert("Dashboard link copied to clipboard!");
							}}
						>
							Share
						</button>
					</div>
				</div>
				<HeatwaveMap onRegionChange={setSelectedRegion} />
			</section>
			{/* Educational Resources */}
			<section>
				<h2 className="text-2xl font-semibold mb-6 text-center">
					Educational Resources
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					<div className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start">
						<div className="flex items-center mb-3">
							<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
								?
							</div>
							<span className="text-blue-600 text-sm font-medium">
								What is a Heatwave?
							</span>
						</div>
						<div className="text-lg font-semibold text-gray-900 mb-1">
							Understanding Risks
						</div>
						<div className="text-gray-500 text-sm mb-4">
							Learn how heatwaves impact health and safety.
						</div>
						<button className="btn-primary text-sm"
							onClick={() => navigateTo('/resources/heatwave')}
						>
							Read More
						</button>
					</div>
					<div className="bg-white rounded-xl border border-gray-100 shadow p-8 flex flex-col items-start">
						<div className="flex items-center mb-3">
							<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
								🛡️
							</div>
							<span className="text-blue-600 text-sm font-medium">
								Prevention
							</span>
						</div>
						<div className="text-lg font-semibold text-gray-900 mb-1">
							Stay Safe Tips
						</div>
						<div className="text-gray-500 text-sm mb-4">
							Simple steps to reduce heat-related risks.
						</div>
						<button className="btn-primary text-sm"
							onClick={() => navigateTo('/tips')}
						>
							View Tips
						</button>
					</div>
				</div>
			</section>
			{/* Footer */}
			<footer className="mt-12 pt-8 border-t border-gray-200 flex items-center">
				<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
					AM
				</div>
				<div>
					<div className="font-semibold text-gray-900">Alex Morgan</div>
					<div className="text-gray-600 text-sm">Health Advisor</div>
				</div>
			</footer>
		</div>
	);
};

export default DashboardPage;
