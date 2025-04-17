import { Ingredient, Season } from '../types';

export const ingredients: Ingredient[] = [
  // Fruits
  {
    id: '1',
    name: 'Apple',
    seasons: ['autumn', 'winter'],
    nutritionPer100g: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fiber: 2.4,
      fat: 0.2
    },
    category: 'fruit'
  },
  {
    id: '2',
    name: 'Banana',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fiber: 2.6,
      fat: 0.3
    },
    category: 'fruit'
  },
  {
    id: '3',
    name: 'Strawberry',
    seasons: ['spring', 'summer'],
    nutritionPer100g: {
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fiber: 2.0,
      fat: 0.3
    },
    category: 'fruit'
  },
  {
    id: '4',
    name: 'Blueberry',
    seasons: ['summer'],
    nutritionPer100g: {
      calories: 57,
      protein: 0.7,
      carbs: 14.5,
      fiber: 2.4,
      fat: 0.3
    },
    category: 'fruit'
  },
  {
    id: '5',
    name: 'Peach',
    seasons: ['summer'],
    nutritionPer100g: {
      calories: 39,
      protein: 0.9,
      carbs: 9.5,
      fiber: 1.5,
      fat: 0.3
    },
    category: 'fruit'
  },
  {
    id: '6',
    name: 'Pumpkin',
    seasons: ['autumn', 'winter'],
    nutritionPer100g: {
      calories: 26,
      protein: 1.0,
      carbs: 6.5,
      fiber: 0.5,
      fat: 0.1
    },
    category: 'vegetable'
  },

  // Vegetables
  {
    id: '7',
    name: 'Spinach',
    seasons: ['spring', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      fat: 0.4
    },
    category: 'vegetable'
  },
  {
    id: '8',
    name: 'Carrot',
    seasons: ['autumn', 'winter'],
    nutritionPer100g: {
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fiber: 2.8,
      fat: 0.2
    },
    category: 'vegetable'
  },
  {
    id: '9',
    name: 'Tomato',
    seasons: ['summer', 'autumn'],
    nutritionPer100g: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fiber: 1.2,
      fat: 0.2
    },
    category: 'vegetable'
  },
  {
    id: '10',
    name: 'Broccoli',
    seasons: ['autumn', 'winter'],
    nutritionPer100g: {
      calories: 34,
      protein: 2.8,
      carbs: 6.6,
      fiber: 2.6,
      fat: 0.4
    },
    category: 'vegetable'
  },
  {
    id: '11',
    name: 'Asparagus',
    seasons: ['spring'],
    nutritionPer100g: {
      calories: 20,
      protein: 2.2,
      carbs: 3.9,
      fiber: 2.1,
      fat: 0.1
    },
    category: 'vegetable'
  },

  // Grains
  {
    id: '12',
    name: 'Brown Rice',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 112,
      protein: 2.6,
      carbs: 23.5,
      fiber: 1.8,
      fat: 0.9
    },
    category: 'grain'
  },
  {
    id: '13',
    name: 'Quinoa',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fiber: 2.8,
      fat: 1.9
    },
    category: 'grain'
  },

  // Proteins
  {
    id: '14',
    name: 'Chicken Breast',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fiber: 0,
      fat: 3.6
    },
    category: 'protein'
  },
  {
    id: '15',
    name: 'Salmon',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 206,
      protein: 22,
      carbs: 0,
      fiber: 0,
      fat: 13
    },
    category: 'protein'
  },
  {
    id: '16',
    name: 'Tofu',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fiber: 0.3,
      fat: 4.8
    },
    category: 'protein'
  },

  // Dairy
  {
    id: '17',
    name: 'Greek Yogurt',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fiber: 0,
      fat: 0.4
    },
    category: 'dairy'
  },
  {
    id: '18',
    name: 'Cheddar Cheese',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    nutritionPer100g: {
      calories: 402,
      protein: 25,
      carbs: 1.3,
      fiber: 0,
      fat: 33
    },
    category: 'dairy'
  }
];

export function isIngredientInSeason(ingredient: Ingredient, season: Season): boolean {
  return ingredient.seasons.includes(season);
}

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredients.find(ing => ing.id === id);
}

export function getIngredientsByCategory(category: Ingredient['category']): Ingredient[] {
  return ingredients.filter(ing => ing.category === category);
}

export function getAllIngredients(): Ingredient[] {
  return ingredients;
}

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  
  // 0-indexed months: 0 = January, 11 = December
  if (month >= 2 && month <= 4) return 'spring';      // March, April, May
  if (month >= 5 && month <= 7) return 'summer';      // June, July, August
  if (month >= 8 && month <= 10) return 'autumn';     // September, October, November
  return 'winter';                                    // December, January, February
}

export function getIngredientsInSeason(season: Season): Ingredient[] {
  return ingredients.filter(ingredient => isIngredientInSeason(ingredient, season));
}
