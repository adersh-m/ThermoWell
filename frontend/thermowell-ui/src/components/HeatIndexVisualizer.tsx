import React from 'react';

export interface HeatIndexLevel {
  name: string;
  threshold: number;
  color: string;
  riskLevel: string;
  advice: string;
}

interface HeatIndexVisualizerProps {
  heatIndex: number;
  unit?: string;
  showLegend?: boolean;
  showAdvice?: boolean;
}

const HEAT_INDEX_LEVELS: HeatIndexLevel[] = [
  {
    name: 'Normal',
    threshold: 27,
    color: 'var(--heat-safe)',
    riskLevel: 'Low Risk',
    advice: 'Stay hydrated and take normal precautions.'
  },
  {
    name: 'Caution',
    threshold: 32,
    color: 'var(--heat-caution)',
    riskLevel: 'Moderate Risk',
    advice: 'Take breaks in the shade and drink water regularly.'
  },
  {
    name: 'Warning',
    threshold: 39,
    color: 'var(--heat-warning)',
    riskLevel: 'High Risk',
    advice: 'Limit outdoor activities, especially during peak hours.'
  },
  {
    name: 'Danger',
    threshold: 51,
    color: 'var(--heat-danger)',
    riskLevel: 'Very High Risk',
    advice: 'Avoid outdoor activities. Stay in cool environments.'
  },
  {
    name: 'Extreme',
    threshold: Infinity,
    color: 'var(--heat-extreme)',
    riskLevel: 'Extreme Risk',
    advice: 'Medical emergency risk. Stay indoors in air conditioning.'
  }
];

const HeatIndexVisualizer: React.FC<HeatIndexVisualizerProps> = ({
  heatIndex,
  unit = '°C',
  showLegend = true,
  showAdvice = true
}) => {
  // Find the current level based on the heat index
  const currentLevel = HEAT_INDEX_LEVELS.find(
    level => heatIndex < level.threshold
  ) || HEAT_INDEX_LEVELS[HEAT_INDEX_LEVELS.length - 1];

  return (
    <div className="heat-index-visualizer p-4 bg-white rounded-xl border border-neutral-200 shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="text-lg font-semibold font-heading">Heat Index</div>
        <div className="px-2 py-1 rounded-full text-xs font-medium" 
          style={{ 
            backgroundColor: `${currentLevel.color}20`, // 20% opacity version of the color
            color: currentLevel.color 
          }}>
          {currentLevel.name}
        </div>
      </div>

      {/* Current Heat Index */}
      <div className="flex items-center justify-center mb-4">
        <div className="text-4xl font-bold mr-2" style={{ color: currentLevel.color }}>
          {heatIndex}
        </div>
        <div className="text-lg font-medium text-neutral-400">{unit}</div>
      </div>

      {/* Risk Level */}
      <div className="text-center mb-4">
        <span className="text-sm text-neutral-500">Risk Level:</span>
        <span className="ml-2 font-medium" style={{ color: currentLevel.color }}>
          {currentLevel.riskLevel}
        </span>
      </div>

      {/* Advice */}
      {showAdvice && (
        <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: `${currentLevel.color}15` }}>
          <div className="font-medium mb-1" style={{ color: currentLevel.color }}>Recommendation:</div>
          <div className="text-neutral-700">{currentLevel.advice}</div>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="text-xs font-medium text-neutral-500 mb-2">Heat Index Levels</div>
          <div className="flex w-full justify-between">
            {HEAT_INDEX_LEVELS.slice(0, -1).map((level, index) => (
              <div key={level.name} className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: level.color }}></div>
                <span className="text-xs">{index > 0 ? `${HEAT_INDEX_LEVELS[index-1].threshold}+` : '< 27'}</span>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: HEAT_INDEX_LEVELS[HEAT_INDEX_LEVELS.length-1].color }}></div>
              <span className="text-xs">{HEAT_INDEX_LEVELS[HEAT_INDEX_LEVELS.length-2].threshold}+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatIndexVisualizer;
