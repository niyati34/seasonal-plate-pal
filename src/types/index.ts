
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Ingredient {
  id: string;
  name: string;
  seasons: Season[];
  nutritionPer100g: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
  };
  category: 'fruit' | 'vegetable' | 'grain' | 'protein' | 'dairy' | 'other';
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: {
    ingredientId: string;
    amount: number; // in grams
  }[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DietPlan {
  id: string;
  name: string;
  meals: {
    recipeId: string;
    servings: number;
    dayOfWeek: number; // 0-6, where 0 is Sunday
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  }[];
  targetNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
  };
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
}
