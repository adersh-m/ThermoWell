import React from 'react';

interface TemperatureGaugeProps {
  temperature: number;
  feelsLike?: number;
  minTemp?: number;
  maxTemp?: number;
  unit?: string;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  temperature,
  feelsLike,
  minTemp = 20,
  maxTemp = 50,
  unit = '°C'
}) => {
  // Calculate the percentage position on the gauge
  const calculatePercentage = (temp: number): number => {
    const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const temperaturePercentage = calculatePercentage(temperature);
  const feelsLikePercentage = feelsLike ? calculatePercentage(feelsLike) : null;

  // Determine color based on temperature
  const getColor = (temp: number): string => {
    if (temp <= 25) return 'var(--heat-safe)';
    if (temp <= 32) return 'var(--heat-caution)';
    if (temp <= 38) return 'var(--heat-warning)';
    if (temp <= 44) return 'var(--heat-danger)';
    return 'var(--heat-extreme)';
  };

  const tempColor = getColor(temperature);
  const feelsLikeColor = feelsLike ? getColor(feelsLike) : 'transparent';

  // Calculate gradient stops for the background
  const gradientStops = [
    { color: 'var(--heat-safe)', position: 0 },
    { color: 'var(--heat-caution)', position: 20 },
    { color: 'var(--heat-warning)', position: 40 },
    { color: 'var(--heat-danger)', position: 60 },
    { color: 'var(--heat-extreme)', position: 80 }
  ];

  const gradientBackground = `linear-gradient(90deg, ${gradientStops.map(
    stop => `${stop.color} ${stop.position}%`
  ).join(', ')})`;

  return (
    <div className="temperature-gauge p-4 bg-white rounded-xl border border-neutral-200 shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="text-lg font-semibold font-heading">Temperature</div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: tempColor }}></div>
            <span className="text-sm">Current</span>
          </div>
          {feelsLike && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: feelsLikeColor }}></div>
              <span className="text-sm">Feels Like</span>
            </div>
          )}
        </div>
      </div>

      {/* Gauge track */}
      <div 
        className="h-6 rounded-full overflow-hidden relative mb-1"
        style={{ background: gradientBackground }}
      >
        {/* Current temperature marker */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-md border border-gray-400"
          style={{ left: `${temperaturePercentage}%`, transform: 'translateX(-50%)' }}
        />

        {/* Feels like marker (if provided) */}
        {feelsLikePercentage !== null && (
          <div 
            className="absolute top-0 bottom-0 w-1 bg-black opacity-50 shadow-md"
            style={{ left: `${feelsLikePercentage}%`, transform: 'translateX(-50%)' }}
          />
        )}
      </div>

      {/* Temperature labels */}
      <div className="flex justify-between text-xs text-neutral-500 mt-2">
        <span>{minTemp}{unit}</span>
        <span>{Math.round((minTemp + maxTemp) / 2)}{unit}</span>
        <span>{maxTemp}{unit}</span>
      </div>

      {/* Current readings */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold" style={{ color: tempColor }}>
            {temperature}{unit}
          </div>
          <div className="text-xs text-neutral-500">Current</div>
        </div>
        {feelsLike && (
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: feelsLikeColor }}>
              {feelsLike}{unit}
            </div>
            <div className="text-xs text-neutral-500">Feels like</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureGauge;
