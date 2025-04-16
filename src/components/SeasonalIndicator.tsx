
import React from 'react';
import { useDietPlan } from '../context/DietPlanContext';

interface SeasonalIndicatorProps {
  className?: string;
}

export const SeasonalIndicator = ({ className = '' }: SeasonalIndicatorProps) => {
  const { currentSeason } = useDietPlan();
  
  const seasonInfo = {
    spring: {
      emoji: '🌱',
      color: 'bg-spring text-white',
      message: 'It\'s Spring! Look for fresh asparagus, peas, and strawberries.'
    },
    summer: {
      emoji: '☀️',
      color: 'bg-summer text-white',
      message: 'It\'s Summer! Enjoy tomatoes, berries, and stone fruits.'
    },
    autumn: {
      emoji: '🍂',
      color: 'bg-autumn text-white',
      message: 'It\'s Autumn! Try apples, pumpkins, and root vegetables.'
    },
    winter: {
      emoji: '❄️',
      color: 'bg-winter text-white',
      message: 'It\'s Winter! Citrus fruits, winter squash, and hearty greens are in season.'
    }
  };
  
  return (
    <div className={`p-4 rounded-lg ${seasonInfo[currentSeason].color} ${className}`}>
      <div className="flex items-center">
        <span className="text-3xl mr-4">{seasonInfo[currentSeason].emoji}</span>
        <div>
          <h3 className="font-medium capitalize text-lg">{currentSeason} Season</h3>
          <p className="text-sm opacity-90">{seasonInfo[currentSeason].message}</p>
        </div>
      </div>
    </div>
  );
};
