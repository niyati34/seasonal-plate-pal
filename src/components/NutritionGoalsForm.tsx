
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDietPlan } from '../context/DietPlanContext';
import { Slider } from './ui/slider';

export const NutritionGoalsForm = () => {
  const { nutritionGoals, updateNutritionGoals } = useDietPlan();
  const [goals, setGoals] = useState({ ...nutritionGoals });
  
  const handleSliderChange = (value: number[], field: keyof typeof goals) => {
    setGoals(prev => ({ ...prev, [field]: value[0] }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNutritionGoals(goals);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Nutrition Goals</CardTitle>
        <CardDescription>
          Customize your daily nutrition targets based on your dietary needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calories">Calories: {goals.calories}</Label>
            <Slider
              id="calories"
              min={1200}
              max={4000}
              step={50}
              value={[goals.calories]}
              onValueChange={(value) => handleSliderChange(value, 'calories')}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="protein">Protein (g): {goals.protein}</Label>
            <Slider
              id="protein"
              min={30}
              max={250}
              step={5}
              value={[goals.protein]}
              onValueChange={(value) => handleSliderChange(value, 'protein')}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carbs">Carbs (g): {goals.carbs}</Label>
            <Slider
              id="carbs"
              min={50}
              max={500}
              step={5}
              value={[goals.carbs]}
              onValueChange={(value) => handleSliderChange(value, 'carbs')}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fiber">Fiber (g): {goals.fiber}</Label>
            <Slider
              id="fiber"
              min={10}
              max={50}
              step={1}
              value={[goals.fiber]}
              onValueChange={(value) => handleSliderChange(value, 'fiber')}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fat">Fat (g): {goals.fat}</Label>
            <Slider
              id="fat"
              min={20}
              max={150}
              step={5}
              value={[goals.fat]}
              onValueChange={(value) => handleSliderChange(value, 'fat')}
              className="py-2"
            />
          </div>
          
          <Button type="submit" className="w-full">Save Nutrition Goals</Button>
        </form>
      </CardContent>
    </Card>
  );
};
