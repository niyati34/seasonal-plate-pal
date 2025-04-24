
import { Ingredient, Recipe, Season } from '../types';
import { getIngredientById } from '../data/ingredients';

export function calculateRecipeNutrition(recipe: Recipe) {
  const nutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    fat: 0
  };
  
  recipe.ingredients.forEach(({ ingredientId, amount }) => {
    const ingredient = getIngredientById(ingredientId);
    
    if (ingredient) {
      // Convert from per 100g to the actual amount
      const ratio = amount / 100;
      
      nutrition.calories += ingredient.nutritionPer100g.calories * ratio;
      nutrition.protein += ingredient.nutritionPer100g.protein * ratio;
      nutrition.carbs += ingredient.nutritionPer100g.carbs * ratio;
      nutrition.fiber += ingredient.nutritionPer100g.fiber * ratio;
      nutrition.fat += ingredient.nutritionPer100g.fat * ratio;
    }
  });
  
  // Round values to 1 decimal place
  return {
    calories: Math.round(nutrition.calories),
    protein: Math.round(nutrition.protein * 10) / 10,
    carbs: Math.round(nutrition.carbs * 10) / 10,
    fiber: Math.round(nutrition.fiber * 10) / 10,
    fat: Math.round(nutrition.fat * 10) / 10
  };
}

export function calculateDailyNutrition(recipes: Recipe[], servings: number[] = []) {
  const nutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    fat: 0
  };
  
  recipes.forEach((recipe, index) => {
    const recipeNutrition = calculateRecipeNutrition(recipe);
    const servingMultiplier = servings[index] || 1;
    
    nutrition.calories += recipeNutrition.calories * servingMultiplier;
    nutrition.protein += recipeNutrition.protein * servingMultiplier;
    nutrition.carbs += recipeNutrition.carbs * servingMultiplier;
    nutrition.fiber += recipeNutrition.fiber * servingMultiplier;
    nutrition.fat += recipeNutrition.fat * servingMultiplier;
  });
  
  return nutrition;
}

export function calculateDailyGoals(
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
) {
  // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Apply activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    very_active: 1.9     // Very hard daily exercise or physical job
  };
  
  const calories = Math.round(bmr * activityMultipliers[activityLevel]);
  
  // Calculate macronutrient goals
  // Default macro split: 30% protein, 40% carbs, 30% fat
  const protein = Math.round((calories * 0.3) / 4); // 4 calories per gram of protein
  const carbs = Math.round((calories * 0.4) / 4);   // 4 calories per gram of carbs
  const fat = Math.round((calories * 0.3) / 9);     // 9 calories per gram of fat
  const fiber = Math.round(carbs * 0.1);            // Approximately 10% of carbs as fiber
  
  return {
    calories,
    protein,
    carbs,
    fiber,
    fat
  };
}

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  
  // 0-indexed, January = 0
  if (month >= 2 && month <= 4) {
    return 'spring'; // March, April, May
  } else if (month >= 5 && month <= 7) {
    return 'summer'; // June, July, August
  } else if (month >= 8 && month <= 10) {
    return 'autumn'; // September, October, November
  } else {
    return 'winter'; // December, January, February
  }
}
