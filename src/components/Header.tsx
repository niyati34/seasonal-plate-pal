
import React from 'react';
import { useDietPlan } from '../context/DietPlanContext';
import { Leaf, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const Header = () => {
  const { currentSeason } = useDietPlan();
  
  const seasonEmoji = {
    spring: '🌱',
    summer: '☀️',
    autumn: '🍂',
    winter: '❄️'
  };
  
  const seasonColor = {
    spring: 'bg-spring-light',
    summer: 'bg-summer-light',
    autumn: 'bg-autumn-light',
    winter: 'bg-winter-light'
  };
  
  return (
    <header className={`px-4 py-3 flex flex-col sm:flex-row items-center justify-between ${seasonColor[currentSeason]} shadow-sm`}>
      <div className="flex items-center">
        <Leaf className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-2xl font-bold">Seasonal Plate Pal</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-white bg-opacity-50 px-3 py-1 rounded-full">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="font-medium capitalize mr-1">{currentSeason}:</span>
          <span>{seasonEmoji[currentSeason]}</span>
        </div>
        
        <nav className="hidden sm:flex space-x-2">
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/plan">My Plan</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/recipes">Recipes</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/ingredients">Ingredients</Link>
          </Button>
        </nav>
        
        <Button className="sm:hidden" variant="outline" size="sm">
          Menu
        </Button>
      </div>
    </header>
  );
};
