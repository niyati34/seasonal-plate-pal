
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Recipe } from "../types";
import { Clock, Utensils, AlertTriangle } from 'lucide-react';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useDietPlan } from "../context/DietPlanContext";
import { IngredientBadge } from "./IngredientBadge";
import { calculateRecipeNutrition } from "../utils/nutritionCalculator";
import { AddRecipeModal } from "./AddRecipeModal";

interface RecipeDetailsModalProps {
  recipe: Recipe;
  children: React.ReactNode;
}

export const RecipeDetailsModal = ({ recipe, children }: RecipeDetailsModalProps) => {
  const { checkIfIngredientInSeason } = useDietPlan();
  
  const outOfSeasonIngredients = recipe.ingredients.filter(
    ing => !checkIfIngredientInSeason(ing.ingredientId)
  );
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  const nutrition = calculateRecipeNutrition(recipe);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">{recipe.mealType}</Badge>
            <span className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {totalTime} mins
            </span>
          </DialogDescription>
        </DialogHeader>
        
        {outOfSeasonIngredients.length > 0 && (
          <div className="bg-red-50 p-3 rounded-md mb-4">
            <div className="flex items-center text-red-600 font-medium mb-1">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Out of season ingredients
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {outOfSeasonIngredients.map(({ ingredientId }) => (
                <IngredientBadge 
                  key={ingredientId}
                  ingredientId={ingredientId}
                  amount={0}
                  showAmount={false}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 mb-4 bg-green-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">{nutrition.calories}</p>
            <p className="text-xs text-green-600">Calories</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">{nutrition.protein}g</p>
            <p className="text-xs text-green-600">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">{nutrition.carbs}g</p>
            <p className="text-xs text-green-600">Carbs</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">{nutrition.fiber}g</p>
            <p className="text-xs text-green-600">Fiber</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">{nutrition.fat}g</p>
            <p className="text-xs text-green-600">Fat</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Ingredients:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map(({ ingredientId, amount }) => (
                <li key={ingredientId} className="flex items-center">
                  <IngredientBadge 
                    ingredientId={ingredientId}
                    amount={amount}
                    showAmount={true}
                  />
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <AddRecipeModal recipe={recipe}>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <Utensils className="mr-2 h-4 w-4" />
              Add to Plan
            </Button>
          </AddRecipeModal>
        </div>
      </DialogContent>
    </Dialog>
  );
};
