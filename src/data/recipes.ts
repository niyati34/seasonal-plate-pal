
import { Recipe } from '../types';

// Initial recipes data
export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Berry Breakfast Bowl',
    ingredients: [
      { ingredientId: '3', amount: 100 }, // Strawberry
      { ingredientId: '4', amount: 50 },  // Blueberry
      { ingredientId: '2', amount: 100 }, // Banana
      { ingredientId: '17', amount: 150 } // Greek Yogurt
    ],
    instructions: [
      'Wash berries thoroughly.',
      'Slice banana into bite-sized pieces.',
      'Mix all fruits in a bowl.',
      'Top with Greek yogurt.',
      'Serve immediately.'
    ],
    prepTime: 10,
    cookTime: 0,
    mealType: 'breakfast'
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    ingredients: [
      { ingredientId: '14', amount: 150 }, // Chicken Breast
      { ingredientId: '7', amount: 100 },  // Spinach
      { ingredientId: '9', amount: 100 },  // Tomato
      { ingredientId: '8', amount: 50 }    // Carrot
    ],
    instructions: [
      'Season chicken breast with salt and pepper.',
      'Grill chicken for 5-7 minutes on each side until cooked through.',
      'Wash and chop vegetables.',
      'Slice grilled chicken into strips.',
      'Combine all ingredients in a bowl and toss with your preferred dressing.'
    ],
    prepTime: 15,
    cookTime: 15,
    mealType: 'lunch'
  },
  {
    id: '3',
    name: 'Quinoa Vegetable Bowl',
    ingredients: [
      { ingredientId: '13', amount: 100 }, // Quinoa
      { ingredientId: '10', amount: 100 }, // Broccoli
      { ingredientId: '8', amount: 70 },   // Carrot
      { ingredientId: '16', amount: 100 }  // Tofu
    ],
    instructions: [
      'Cook quinoa according to package instructions.',
      'Steam broccoli for 3-4 minutes until tender-crisp.',
      'Cut carrots into thin strips or shred them.',
      'Cube and pan-fry tofu until golden brown.',
      'Combine all ingredients in a bowl.',
      'Season with herbs and spices of choice.'
    ],
    prepTime: 15,
    cookTime: 25,
    mealType: 'dinner'
  },
  {
    id: '4',
    name: 'Apple Cinnamon Oatmeal',
    ingredients: [
      { ingredientId: '1', amount: 100 },  // Apple
      { ingredientId: '12', amount: 60 },  // Use brown rice as proxy for oats
      { ingredientId: '17', amount: 50 }   // Greek Yogurt
    ],
    instructions: [
      'Dice apple into small cubes.',
      'Cook oats with water according to package instructions.',
      'Add diced apple halfway through cooking.',
      'Top with Greek yogurt and a sprinkle of cinnamon.',
      'Enjoy while warm.'
    ],
    prepTime: 5,
    cookTime: 10,
    mealType: 'breakfast'
  },
  {
    id: '5',
    name: 'Salmon with Asparagus',
    ingredients: [
      { ingredientId: '15', amount: 150 }, // Salmon
      { ingredientId: '11', amount: 100 }  // Asparagus
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Season salmon with salt, pepper, and herbs.',
      'Trim asparagus and place on baking sheet with salmon.',
      'Drizzle everything with olive oil.',
      'Bake for 12-15 minutes until salmon is cooked through.',
      'Serve immediately.'
    ],
    prepTime: 10,
    cookTime: 15,
    mealType: 'dinner'
  }
];

// Get a recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}

// Get all recipes
export function getAllRecipes(): Recipe[] {
  return [...recipes];
}

// Add a new recipe to the collection
export function addRecipe(recipe: Recipe): void {
  recipes.unshift(recipe);
}
