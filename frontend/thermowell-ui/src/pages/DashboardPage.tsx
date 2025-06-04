import React, { useState, useEffect, lazy, Suspense } from "react";
import TemperatureGauge from "../components/TemperatureGauge";
import HeatIndexVisualizer from "../components/HeatIndexVisualizer";
import { DashboardService } from "../services/DashboardService";
import NotificationService from '../services/NotificationService';
import type { Notification } from '../services/NotificationService';
import ResourcesService from '../services/ResourcesService';
import type { Resource } from '../services/ResourcesService';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

// Define interface that matches what we're actually using in the component
interface VulnerableGroupDisplay {
	icon: string;
	label: string;
	title: string;
	getAdvice: (region: string) => string;
}

const HeatwaveMap = lazy(() => import("../components/HeatwaveMap"));

const groupImages: Record<string, string> = {
  'children': '/images/hydration-tips.jpg',
  'infants & children': '/images/hydration-tips.jpg',
  'infants': '/images/hydration-tips.jpg',
  'elderly': '/images/heat-protection-tips.jpg',
  'senior citizens': '/images/heat-protection-tips.jpg',
  'seniors': '/images/heat-protection-tips.jpg',
  'outdoor workers': '/images/heatwave-alert.jpg',
  'workers': '/images/heatwave-alert.jpg',
  'default': '/images/community-support.jpg',
};

const DashboardPage: React.FC = () => {
	const [selectedRegion, setSelectedRegion] = useState("Manila");
	const [vulnerableGroups, setVulnerableGroups] = useState<VulnerableGroupDisplay[]>([]);
	const [alerts, setAlerts] = useState<Notification[]>([]);
	const [resources, setResources] = useState<Resource[]>([]);
	const navigate = useNavigate();
	
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
		
		// Load alerts (2 most recent unread)
		NotificationService.getUnreadNotifications().then(n => setAlerts(n.slice(0, 2)));
		// Load resources (first 3)
		ResourcesService.fetchResources().then(r => setResources(r.slice(0, 3)));
		
		loadVulnerableGroups();
	}, []);

	// Static content matching the wireframe (no sidebar)
	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			{/* Hero Banner */}
			<div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
				<img 
					src="/images/heatwave-alert.jpg" 
					alt="ThermoWell Heatwave Dashboard Banner" 
					className="w-full h-56 md:h-72 object-cover object-center" 
				/>
			</div>
			<h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
				Current Heatwave Status
			</h1>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Monitor real-time heatwave conditions, urgent alerts, and resources for your area. Take action quickly to stay safe.
      </p>
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
						{alerts.length > 0 ? `${alerts.length} New Alert${alerts.length > 1 ? 's' : ''}` : 'No New Alerts'}
					</div>
					<div className="text-neutral-500 text-sm mb-4">
						{alerts.length > 0 ? alerts[0].message : 'No urgent health advisories.'}
					</div>
					<div className="w-full mb-4">
						{alerts.map(alert => (
							<div key={alert.id} className={`flex items-center justify-between mb-2 bg-neutral-50 p-2 rounded-lg border-l-4 ${alert.severity === 'critical' ? 'border-danger' : 'border-warning'}`}> 
								<div>
									<div className="font-medium text-sm">{alert.title}</div>
									<div className="text-xs text-neutral-500">{NotificationService.formatTimestamp(alert.timestamp)}</div>
								</div>
								<div className={`badge ${alert.severity === 'critical' ? 'bg-danger' : 'bg-warning'} bg-opacity-10 text-xs px-2 py-1 rounded-full`}>
									{alert.severity === 'critical' ? 'Urgent' : 'Important'}
								</div>
							</div>
						))}
					</div>
					<Button 
						variant="primary"
						className="w-full flex items-center justify-center text-sm py-2"
						onClick={() => navigate('/alerts')}
					>
						View All Alerts
					</Button>
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
					<h2 className="heading text-center">
						Vulnerable Groups
					</h2>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{vulnerableGroups.map((group) => {
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
									<div className="subheading font-heading">
										{group.label}
									</div>
								</div>
								<div className="heading mb-2">
									{group.title}
								</div>
								<div className="text-primary text-sm mb-6 flex-grow">
									{group.getAdvice(selectedRegion)}
								</div>
								<Button 
									variant="primary"
									className="btn w-full text-sm py-2"
									onClick={() => navigate(`/tips?group=${group.label.toLowerCase()}`)}
								>
									<span className="mr-1">View Advice</span>
								</Button>
							</div>
						);
					})}
				</div>
				
				<div className="flex justify-center">
					<Button 
						variant="secondary"
						className="text-sm flex items-center gap-2"
						onClick={() => navigate('/resources')}
					>
						View All Resources
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</Button>
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
						
						<Button
							variant="primary"
							className="text-sm flex items-center gap-1 whitespace-nowrap"
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
						</Button>
						
						<Button
							variant="secondary"
							className="text-sm flex items-center gap-1"
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
						</Button>
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
					<h2 className="heading text-center">
						Educational Resources
					</h2>
				</div>
				{/* Resource cards with navigation handlers */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{resources.map((resource) => (
						<div key={resource.title} className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
							<div className="p-6">
								<div className="flex items-center mb-3">
									<span className="font-medium font-heading text-primary-600">{resource.type}</span>
								</div>
								<div className="text-xl font-semibold font-heading text-neutral-900 mb-2">
									{resource.title}
								</div>
								<div className="text-neutral-600 text-sm mb-6 flex-grow">
									{resource.description}
								</div>
								<Button className="btn-primary text-sm w-full" onClick={() => navigate('/resources')}>
									{resource.action}
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default DashboardPage;
