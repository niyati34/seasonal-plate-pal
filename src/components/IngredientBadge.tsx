
import React from 'react';
import { Badge } from './ui/badge';
import { useDietPlan } from '../context/DietPlanContext';
import { getIngredientById } from '../data/ingredients';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface IngredientBadgeProps {
  ingredientId: string;
  amount?: number;
  showAmount?: boolean;
}

export const IngredientBadge = ({ ingredientId, amount = 0, showAmount = true }: IngredientBadgeProps) => {
  const { checkIfIngredientInSeason, currentSeason } = useDietPlan();
  const ingredient = getIngredientById(ingredientId);
  
  if (!ingredient) return null;
  
  const isInSeason = checkIfIngredientInSeason(ingredientId);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="outline" className={`flex items-center gap-1 ${!isInSeason ? 'out-of-season' : ''}`}>
            {!isInSeason && <AlertTriangle className="h-3 w-3 text-destructive" />}
            {ingredient.name}
            {showAmount && amount > 0 && ` (${amount}g)`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {isInSeason 
            ? <p>In season during {currentSeason}</p>
            : <p>Out of season! Available in: {ingredient.seasons.join(', ')}</p>
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
