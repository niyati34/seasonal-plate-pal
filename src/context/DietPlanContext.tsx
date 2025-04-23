
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DietPlan, Recipe, NutritionGoals, Ingredient, Season } from '../types';
import { getIngredientById } from '../data/ingredients';
import { getCurrentSeason } from '../data/ingredients';
import { toast } from "../components/ui/use-toast";

interface DietPlanContextType {
  currentPlan: DietPlan | null;
  currentSeason: Season;
  nutritionGoals: NutritionGoals;
  planRecipes: Recipe[];
  createPlan: (name: string, nutritionGoals: NutritionGoals) => void;
  addRecipeToPlan: (recipe: Recipe, servings: number, dayOfWeek: number, mealType: Recipe['mealType']) => void;
  removeRecipeFromPlan: (index: number) => void;
  updateNutritionGoals: (goals: NutritionGoals) => void;
  checkIfIngredientInSeason: (ingredientId: string) => boolean;
}

const defaultNutritionGoals: NutritionGoals = {
  calories: 2000,
  protein: 100,
  carbs: 250,
  fiber: 30,
  fat: 65
};

const DietPlanContext = createContext<DietPlanContextType>({
  currentPlan: null,
  currentSeason: 'spring',
  nutritionGoals: defaultNutritionGoals,
  planRecipes: [],
  createPlan: () => {},
  addRecipeToPlan: () => {},
  removeRecipeFromPlan: () => {},
  updateNutritionGoals: () => {},
  checkIfIngredientInSeason: () => false
});

export const DietPlanProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlan, setCurrentPlan] = useState<DietPlan | null>(null);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>(defaultNutritionGoals);
  const [planRecipes, setPlanRecipes] = useState<Recipe[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());

  // Initialize or load saved plan
  useEffect(() => {
    const savedPlan = localStorage.getItem('currentDietPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        setCurrentPlan(plan);
      } catch (error) {
        console.error('Error loading saved diet plan:', error);
      }
    }
    
    // Set current season
    setCurrentSeason(getCurrentSeason());
  }, []);

  // Save plan to local storage when it changes
  useEffect(() => {
    if (currentPlan) {
      localStorage.setItem('currentDietPlan', JSON.stringify(currentPlan));
    }
  }, [currentPlan]);

  const createPlan = (name: string, goals: NutritionGoals) => {
    const newPlan: DietPlan = {
      id: Date.now().toString(),
      name,
      meals: [],
      targetNutrition: goals
    };
    
    setCurrentPlan(newPlan);
    setNutritionGoals(goals);
    setPlanRecipes([]);
    
    toast({
      title: "Diet Plan Created",
      description: `Your new plan "${name}" has been created.`,
    });
  };

  const addRecipeToPlan = (recipe: Recipe, servings: number, dayOfWeek: number, mealType: Recipe['mealType']) => {
    if (!currentPlan) return;
    
    const updatedPlan = { ...currentPlan };
    updatedPlan.meals.push({
      recipeId: recipe.id,
      servings,
      dayOfWeek,
      mealType
    });
    
    setCurrentPlan(updatedPlan);
    setPlanRecipes([...planRecipes, recipe]);
    
    // Check for out-of-season ingredients
    const outOfSeasonIngredients = recipe.ingredients
      .map(ing => getIngredientById(ing.ingredientId))
      .filter(ing => ing && !ing.seasons.includes(currentSeason))
      .map(ing => ing?.name);
    
    if (outOfSeasonIngredients.length > 0) {
      toast({
        title: "Out of Season Ingredients",
        description: `Recipe contains out-of-season ingredients: ${outOfSeasonIngredients.join(', ')}`,
        variant: "destructive"
      });
    }
  };

  const removeRecipeFromPlan = (index: number) => {
    if (!currentPlan) return;
    
    const updatedPlan = { ...currentPlan };
    updatedPlan.meals.splice(index, 1);
    
    setCurrentPlan(updatedPlan);
    
    const updatedRecipes = [...planRecipes];
    updatedRecipes.splice(index, 1);
    setPlanRecipes(updatedRecipes);
    
    toast({
      title: "Recipe Removed",
      description: "Recipe has been removed from your plan."
    });
  };

  const updateNutritionGoals = (goals: NutritionGoals) => {
    if (!currentPlan) return;
    
    const updatedPlan = { ...currentPlan, targetNutrition: goals };
    setCurrentPlan(updatedPlan);
    setNutritionGoals(goals);
    
    toast({
      title: "Nutrition Goals Updated",
      description: "Your nutrition goals have been updated."
    });
  };

  const checkIfIngredientInSeason = (ingredientId: string): boolean => {
    const ingredient = getIngredientById(ingredientId);
    return ingredient ? ingredient.seasons.includes(currentSeason) : false;
  };

  const value = {
    currentPlan,
    currentSeason,
    nutritionGoals,
    planRecipes,
    createPlan,
    addRecipeToPlan,
    removeRecipeFromPlan,
    updateNutritionGoals,
    checkIfIngredientInSeason
  };

  return (
    <DietPlanContext.Provider value={value}>
      {children}
    </DietPlanContext.Provider>
  );
};

export const useDietPlan = () => useContext(DietPlanContext);
