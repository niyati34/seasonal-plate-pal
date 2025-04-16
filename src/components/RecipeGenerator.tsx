
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react';
import { addRecipe } from '../data/recipes';

interface RecipeGeneratorProps {
  onRecipeGenerated: () => void;
}

export const RecipeGenerator = ({ onRecipeGenerated }: RecipeGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    mealType: 'dinner',
    cuisineType: 'mediterranean',
    dietaryRestriction: 'none',
    mainIngredient: '',
    seasonalOnly: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate recipe generation (in a real app, this would call an API)
    setTimeout(() => {
      // Generate a mock recipe
      const newRecipe = generateMockRecipe(preferences);
      
      // Add the generated recipe to the collection
      addRecipe(newRecipe);
      
      // Notify parent component
      onRecipeGenerated();
      setLoading(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mealType">Meal Type</Label>
          <Select 
            value={preferences.mealType}
            onValueChange={(value) => handleSelectChange('mealType', value)}
          >
            <SelectTrigger id="mealType">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cuisineType">Cuisine Type</Label>
          <Select 
            value={preferences.cuisineType}
            onValueChange={(value) => handleSelectChange('cuisineType', value)}
          >
            <SelectTrigger id="cuisineType">
              <SelectValue placeholder="Select cuisine type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="american">American</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dietaryRestriction">Dietary Restriction</Label>
          <Select 
            value={preferences.dietaryRestriction}
            onValueChange={(value) => handleSelectChange('dietaryRestriction', value)}
          >
            <SelectTrigger id="dietaryRestriction">
              <SelectValue placeholder="Select restriction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="dairy-free">Dairy-Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mainIngredient">Main Ingredient (Optional)</Label>
          <Input 
            id="mainIngredient"
            name="mainIngredient"
            value={preferences.mainIngredient}
            onChange={handleInputChange}
            placeholder="e.g. chicken, beans, tofu"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="seasonalOnly"
          checked={preferences.seasonalOnly}
          onChange={() => setPreferences(prev => ({ ...prev, seasonalOnly: !prev.seasonalOnly }))}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="seasonalOnly" className="text-sm font-medium">
          Use seasonal ingredients only
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Recipe'
        )}
      </Button>
    </form>
  );
};

// Generate mock recipe based on user preferences
function generateMockRecipe(preferences: any) {
  const id = `generated-${Date.now()}`;
  const { mealType, cuisineType, dietaryRestriction, mainIngredient } = preferences;
  
  let name = '';
  let ingredients = [];
  
  // Generate name based on preferences
  switch (cuisineType) {
    case 'mediterranean':
      name = mainIngredient 
        ? `Mediterranean ${capitalizeFirst(mainIngredient)} Bowl` 
        : `Greek Veggie Bowl`;
      ingredients = [
        { ingredientId: '7', amount: 100 }, // Spinach
        { ingredientId: '9', amount: 100 }, // Tomato
        { ingredientId: '13', amount: 100 }, // Quinoa
      ];
      break;
    case 'asian':
      name = mainIngredient 
        ? `${capitalizeFirst(mainIngredient)} Stir Fry` 
        : `Veggie Stir Fry`;
      ingredients = [
        { ingredientId: '10', amount: 100 }, // Broccoli
        { ingredientId: '8', amount: 70 },   // Carrot
        { ingredientId: '12', amount: 100 }, // Rice
      ];
      break;
    case 'italian':
      name = mainIngredient 
        ? `Italian ${capitalizeFirst(mainIngredient)} Pasta` 
        : `Seasonal Pasta Primavera`;
      ingredients = [
        { ingredientId: '9', amount: 100 }, // Tomato
        { ingredientId: '10', amount: 100 }, // Broccoli
        { ingredientId: '12', amount: 100 }, // Use rice as proxy for pasta
      ];
      break;
    default:
      name = `Seasonal ${capitalizeFirst(cuisineType)} ${capitalizeFirst(mealType)}`;
      ingredients = [
        { ingredientId: '7', amount: 80 }, // Spinach
        { ingredientId: '8', amount: 60 }, // Carrot
      ];
  }
  
  // Add protein based on dietary restrictions
  if (dietaryRestriction === 'none' || dietaryRestriction === 'gluten-free' || dietaryRestriction === 'dairy-free') {
    ingredients.push({ ingredientId: '14', amount: 150 }); // Chicken
  } else {
    ingredients.push({ ingredientId: '16', amount: 150 }); // Tofu
  }
  
  return {
    id,
    name,
    ingredients,
    instructions: [
      "Prepare all ingredients.",
      "Follow cooking instructions for the main component.",
      "Combine all ingredients in a bowl.",
      "Season to taste with herbs and spices.",
      "Serve immediately or store in refrigerator."
    ],
    prepTime: 15,
    cookTime: 20,
    mealType
  };
}

function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
