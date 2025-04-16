
import React from 'react';
import { Progress } from './ui/progress';
import { useDietPlan } from '../context/DietPlanContext';
import { calculateDailyNutrition } from '../utils/nutritionCalculator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

export const NutritionTracker = () => {
  const { planRecipes, nutritionGoals } = useDietPlan();
  
  // Calculate current nutrition from plan recipes
  const currentNutrition = calculateDailyNutrition(planRecipes);
  
  // Calculate percentages
  const caloriesPercent = Math.min(100, (currentNutrition.calories / nutritionGoals.calories) * 100);
  const proteinPercent = Math.min(100, (currentNutrition.protein / nutritionGoals.protein) * 100);
  const carbsPercent = Math.min(100, (currentNutrition.carbs / nutritionGoals.carbs) * 100);
  const fiberPercent = Math.min(100, (currentNutrition.fiber / nutritionGoals.fiber) * 100);
  const fatPercent = Math.min(100, (currentNutrition.fat / nutritionGoals.fat) * 100);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nutrition Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Calories</span>
            <span>{currentNutrition.calories} / {nutritionGoals.calories} kcal</span>
          </div>
          <Progress value={caloriesPercent} className="h-2" />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Protein</span>
            <span>{currentNutrition.protein} / {nutritionGoals.protein}g</span>
          </div>
          <Progress value={proteinPercent} className={cn("h-2", "bg-muted")} />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Carbs</span>
            <span>{currentNutrition.carbs} / {nutritionGoals.carbs}g</span>
          </div>
          <Progress value={carbsPercent} className={cn("h-2", "bg-muted")} />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Fiber</span>
            <span>{currentNutrition.fiber} / {nutritionGoals.fiber}g</span>
          </div>
          <Progress value={fiberPercent} className={cn("h-2", "bg-muted")} />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Fat</span>
            <span>{currentNutrition.fat} / {nutritionGoals.fat}g</span>
          </div>
          <Progress value={fatPercent} className={cn("h-2", "bg-muted")} />
        </div>
      </CardContent>
    </Card>
  );
};
