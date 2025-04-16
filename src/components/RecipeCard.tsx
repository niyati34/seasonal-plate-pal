
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, AlertTriangle } from 'lucide-react';
import { Recipe } from '../types';
import { useDietPlan } from '../context/DietPlanContext';
import { IngredientBadge } from './IngredientBadge';
import { calculateRecipeNutrition } from '../utils/nutritionCalculator';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToPlan?: () => void;
}

export const RecipeCard = ({ recipe, onAddToPlan }: RecipeCardProps) => {
  const { checkIfIngredientInSeason } = useDietPlan();
  
  const outOfSeasonCount = recipe.ingredients.filter(
    ing => !checkIfIngredientInSeason(ing.ingredientId)
  ).length;
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  const nutrition = calculateRecipeNutrition(recipe);
  
  // Create a gradient color based on meal type
  const getGradient = () => {
    switch(recipe.mealType) {
      case 'breakfast':
        return 'from-amber-50 to-orange-100';
      case 'lunch':
        return 'from-blue-50 to-cyan-100';
      case 'dinner':
        return 'from-violet-50 to-purple-100';
      case 'snack':
        return 'from-green-50 to-emerald-100';
      default:
        return 'from-gray-50 to-slate-100';
    }
  };
  
  return (
    <Card className={`h-full flex flex-col shadow-md bg-gradient-to-br ${getGradient()} hover:shadow-lg transition-shadow border-t-4`} style={{ borderTopColor: outOfSeasonCount > 0 ? '#f87171' : '#10b981' }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-gray-800">{recipe.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {totalTime} mins
              <Badge variant="outline" className="ml-2 capitalize">{recipe.mealType}</Badge>
            </CardDescription>
          </div>
          
          {outOfSeasonCount > 0 && (
            <Badge variant="destructive" className="flex items-center bg-red-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {outOfSeasonCount} out of season
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.map(({ ingredientId }) => (
              <IngredientBadge 
                key={ingredientId} 
                ingredientId={ingredientId} 
                amount={0} 
                showAmount={false}
              />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Nutrition per serving:</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-1 rounded bg-white bg-opacity-60">
              <p className="text-sm font-medium">{nutrition.calories}</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div className="p-1 rounded bg-white bg-opacity-60">
              <p className="text-sm font-medium">{nutrition.protein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div className="p-1 rounded bg-white bg-opacity-60">
              <p className="text-sm font-medium">{nutrition.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
          </div>
        </div>
      </CardContent>
      {onAddToPlan && (
        <CardFooter>
          <Button onClick={onAddToPlan} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            Add to Plan
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
