import React, { useState, useEffect, lazy, Suspense } from "react";
import TemperatureGauge from "../components/TemperatureGauge";
import HeatIndexVisualizer from "../components/HeatIndexVisualizer";
import { DashboardService } from "../services/DashboardService";

// Define interface that matches what we're actually using in the component
interface VulnerableGroupDisplay {
	icon: string;
	label: string;
	title: string;
	getAdvice: (region: string) => string;
}

const HeatwaveMap = lazy(() => import("../components/HeatwaveMap"));

const groupImages: Record<string, string> = {
  'children': '/images/stay-hydrated.svg',
  'infants & children': '/images/stay-hydrated.svg',
  'infants': '/images/stay-hydrated.svg',
  'elderly': '/images/heat-protection.svg',
  'senior citizens': '/images/heat-protection.svg',
  'seniors': '/images/heat-protection.svg',
  'outdoor workers': '/images/heat-warning.svg',
  'workers': '/images/heat-warning.svg',
  'default': '/images/community.svg',
};

const DashboardPage: React.FC = () => {
	const [selectedRegion, setSelectedRegion] = useState("Manila");
	const [vulnerableGroups, setVulnerableGroups] = useState<VulnerableGroupDisplay[]>([]);
	
	// Helper function to map group names to corresponding emoji icons
	const mapGroupToIcon = (groupName: string): string => {
		switch (groupName.toLowerCase()) {
			case "infants & children":
			case "children":
			case "infants":
				return "👶";
			case "elderly":
			case "senior citizens":
			case "seniors":
				return "👴";
			case "outdoor workers":
			case "workers":
				return "👷";
			default:
				return "👥"; // Default icon for other groups
		}
	};

	useEffect(() => {
		const loadVulnerableGroups = async () => {
			try {
				const groups = await DashboardService.fetchVulnerableGroups();
				
				// Map VulnerableGroup to VulnerableGroupDisplay
				const displayGroups: VulnerableGroupDisplay[] = groups.map(group => {
					const label = group.label || '';
					return {
						icon: mapGroupToIcon(label),
						label,
						title: group.description,
						getAdvice: group.getAdvice
					};
				});
				
				setVulnerableGroups(displayGroups);
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
			{/* Hero Banner */}
			<div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
				<img 
					src="/images/hero-banner.jpg" 
					alt="ThermoWell Heatwave Dashboard Banner" 
					className="w-full h-56 md:h-72 object-cover object-center" 
				/>
			</div>
			<h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
				Current Heatwave Status
			</h1>
			{/* Status Cards and Visualizations */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
				{/* Temperature Gauge - 5 columns on medium+ screens */}
				<div className="md:col-span-5">
					<TemperatureGauge 
						temperature={41} 
						feelsLike={44} 
					/>
				</div>

				{/* Heat Index Visualizer - 4 columns on medium+ screens */}
				<div className="md:col-span-4">
					<HeatIndexVisualizer 
						heatIndex={44} 
						showAdvice={true}
					/>
				</div>

				{/* Alerts Card - 3 columns on medium+ screens */}
				<div className="md:col-span-3 bg-white rounded-xl border border-neutral-200 shadow p-6 flex flex-col items-start">
					<div className="flex items-center mb-3">
						<div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
								<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
							</svg>
						</div>
						<span className="text-neutral-600 text-sm font-medium font-heading">Alerts</span>
					</div>
					<div className="text-xl font-semibold text-neutral-900 mb-1 font-heading">
						2 New Alerts
					</div>
					<div className="text-neutral-500 text-sm mb-4">
						Urgent health advisories issued for your area.
					</div>
					
					<div className="w-full mb-4">
						<div className="flex items-center justify-between mb-2 bg-neutral-50 p-2 rounded-lg border-l-4 border-danger">
							<div>
								<div className="font-medium text-sm">Heat Emergency</div>
								<div className="text-xs text-neutral-500">Today, 9:45 AM</div>
							</div>
							<div className="badge bg-danger bg-opacity-10 text-danger text-xs px-2 py-1 rounded-full">
								Urgent
							</div>
						</div>
						<div className="flex items-center justify-between bg-neutral-50 p-2 rounded-lg border-l-4 border-warning">
							<div>
								<div className="font-medium text-sm">School Closures</div>
								<div className="text-xs text-neutral-500">Today, 8:30 AM</div>
							</div>
							<div className="badge bg-warning bg-opacity-10 text-warning text-xs px-2 py-1 rounded-full">
								Important
							</div>
						</div>
					</div>
					
					<button 
						className="w-full flex items-center justify-center btn-primary text-sm py-2"
						onClick={() => navigateTo('/advisories')}
					>
						View All Alerts
					</button>
				</div>
			</div>
			{/* Vulnerable Groups */}
			<section className="mb-12">
				<div className="flex items-center justify-center mb-6">
					<div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-info rounded-lg flex items-center justify-center text-white mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<h2 className="text-2xl font-semibold font-heading text-neutral-800 text-center">
						Vulnerable Groups
					</h2>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{vulnerableGroups.map((group) => {
						// Map icons to SVG for consistent look
						const iconSvg = () => {
							switch(group.icon) {
								case "👶": 
									return (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
										</svg>
									);
								case "👴": 
									return (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
										</svg>
									);
								case "👷": 
									return (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
											<path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
										</svg>
									);
								default: 
									return (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
										</svg>
									);
							}
						};
						// Pick image for group
						const groupImg = groupImages[group.label.toLowerCase()] || groupImages['default'];
						
						return (
							<div
								key={group.label}
								className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col h-full"
							>
								<div className="flex items-center mb-4">
									<img
										src={groupImg}
										alt={`${group.label} illustration`}
										className="w-12 h-12 rounded-lg object-contain bg-gray-50 mr-3 border"
										loading="lazy"
									/>
									<span className="text-neutral-700 font-medium font-heading">
										{group.label}
									</span>
								</div>
								<div className="text-xl font-semibold font-heading text-neutral-900 mb-2">
									{group.title}
								</div>
								<div className="text-neutral-600 text-sm mb-6 flex-grow">
									{group.getAdvice(selectedRegion)}
								</div>
								<button 
									className="w-full flex items-center justify-center btn-primary text-sm py-2"
									onClick={() => navigateTo(`/tips?group=${group.label.toLowerCase()}`)}
								>
									<span className="mr-1">View Advice</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</button>
							</div>
						);
					})}
				</div>
				
				<div className="flex justify-center">
					<button 
						className="btn-secondary text-sm flex items-center gap-2"
						onClick={() => navigateTo('/resources/vulnerable-groups')}
					>
						View All Resources
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</button>
				</div>
			</section>
			{/* Heatwave Map & Alerts */}
			<section className="mb-12">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
					<div className="flex items-center">
						<div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
							</svg>
						</div>
						<h2 className="text-2xl font-semibold font-heading text-neutral-800">
							Heatwave Impact Map
						</h2>
					</div>
					
					<div className="flex items-center gap-3">
						<div className="bg-danger-light border border-danger rounded-lg px-4 py-2 text-danger text-sm font-medium flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
							<span>Extreme Heat Advisory: Stay indoors 11am–4pm</span>
						</div>
						
						<button
							className="btn-primary text-sm flex items-center gap-1 whitespace-nowrap"
							onClick={() => {
								const csv = `Region,Status,Temperature,FeelsLike\n${selectedRegion},Extreme Heat,41,44`;
								const blob = new Blob([csv], { type: "text/csv" });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = `heatwave-status-${selectedRegion}.csv`;
								a.click();
								URL.revokeObjectURL(url);
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Download
						</button>
						
						<button
							className="btn-secondary text-sm flex items-center gap-1"
							onClick={() => {
								navigator.clipboard.writeText(
									window.location.href + `?region=${selectedRegion}`
								);
								alert("Dashboard link copied to clipboard!");
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
							</svg>
							Share
						</button>
					</div>
				</div>
				
				<Suspense fallback={<div className="flex justify-center items-center h-64">Loading map...</div>}>
					<HeatwaveMap onRegionChange={setSelectedRegion} />
				</Suspense>
			</section>
			{/* Educational Resources */}
			<section className="mb-12">
				<div className="flex items-center justify-center mb-6">
					<div className="w-10 h-10 bg-gradient-to-r from-info to-success rounded-lg flex items-center justify-center text-white mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path d="M12 14l9-5-9-5-9 5 9 5z" />
							<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
						</svg>
					</div>
					<h2 className="text-2xl font-semibold font-heading text-neutral-800 text-center">
						Educational Resources
					</h2>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
						<img src="/images/heat-warning.svg" alt="Heat Warning" className="h-40 w-full object-contain bg-gray-50" loading="lazy" />
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-danger font-medium font-heading">Heatwave</span>
							</div>
							<div className="text-xl font-semibold font-heading text-neutral-900 mb-2">
								What is a Heatwave?
							</div>
							<div className="text-neutral-600 text-sm mb-6 flex-grow">
								Learn about heatwaves, their causes, and how they impact health and daily life.
							</div>
							<button className="btn-primary text-sm w-full">Learn More</button>
						</div>
					</div>
					<div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
						<img src="/images/stay-hydrated.svg" alt="Stay Hydrated" className="h-40 w-full object-contain bg-gray-50" loading="lazy" />
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary-600 font-medium font-heading">Hydration</span>
							</div>
							<div className="text-xl font-semibold font-heading text-neutral-900 mb-2">
								Stay Hydrated
							</div>
							<div className="text-neutral-600 text-sm mb-6 flex-grow">
								Tips and best practices to keep yourself and your family hydrated during extreme heat.
							</div>
							<button className="btn-primary text-sm w-full">Hydration Tips</button>
						</div>
					</div>
					<div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
						<img src="/images/community.svg" alt="Community Support" className="h-40 w-full object-contain bg-gray-50" loading="lazy" />
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-success font-medium font-heading">Community</span>
							</div>
							<div className="text-xl font-semibold font-heading text-neutral-900 mb-2">
								Community Support
							</div>
							<div className="text-neutral-600 text-sm mb-6 flex-grow">
								Find local cooling centers, support groups, and resources to stay safe together.
							</div>
							<button className="btn-primary text-sm w-full">Find Support</button>
						</div>
					</div>
				</div>
			</section>
			
			{/* Health Advisor Footer */}
			<footer className="mt-12 pt-6 border-t border-neutral-200">
				<div className="bg-neutral-50 rounded-xl p-6 flex flex-col md:flex-row items-center md:justify-between">
					<div className="flex items-center mb-4 md:mb-0">
						<div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
							AM
						</div>
						<div>
							<div className="font-semibold font-heading text-neutral-900 text-lg">Alex Morgan</div>
							<div className="text-neutral-600">Health Advisor</div>
							<div className="flex items-center mt-1">
								<span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full mr-2">Certified</span>
								<span className="text-xs text-neutral-500">Available 24/7 for emergencies</span>
							</div>
						</div>
					</div>
					
					<div className="flex flex-col md:flex-row items-center gap-3">
						<button 
							className="btn-primary text-sm flex items-center gap-1 w-full md:w-auto"
							onClick={() => navigateTo('/contact')}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
							</svg>
							Contact Advisor
						</button>
						<button 
							className="btn-secondary text-sm flex items-center gap-1 w-full md:w-auto"
							onClick={() => navigateTo('/health-assessment')}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
							</svg>
							Health Assessment
						</button>
					</div>
				</div>
				
				<div className="mt-6 text-center text-neutral-500 text-sm">
					© 2025 ThermoWell - Heatwave Advisory System. Last updated: June 2, 2025
				</div>
			</footer>
		</div>
	);
};

export default DashboardPage;
