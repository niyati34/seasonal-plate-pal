
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, ChefHat, Lightbulb, Search, Utensils } from 'lucide-react';
import { Input } from '../components/ui/input';
import { RecipeCard } from '../components/RecipeCard';
import { AddRecipeModal } from '../components/AddRecipeModal';
import { getAllRecipes } from '../data/recipes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Recipe } from '../types';
import { RecipeDetailsModal } from '../components/RecipeDetailsModal';
import { RecipeGenerator } from '../components/RecipeGenerator';
import { Separator } from '../components/ui/separator';
import { useToast } from '../components/ui/use-toast';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mealTypeFilter, setMealTypeFilter] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const { toast } = useToast();
  
  const recipes = getAllRecipes();
  
  // Filter recipes based on search query and meal type
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMealType = mealTypeFilter ? recipe.mealType === mealTypeFilter : true;
    return matchesSearch && matchesMealType;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-50">
      <Header />
      <MobileNav />
      
      <main className="flex-grow container mx-auto max-w-5xl py-8 px-4">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="hover:bg-green-50">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-green-800">
            <ChefHat className="mr-3 h-7 w-7 text-green-600" /> Recipes
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse and add seasonal recipes to your diet plan
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-10 border-green-200 focus-visible:ring-green-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Select
              value={mealTypeFilter || "all"}
              onValueChange={(value) => setMealTypeFilter(value === "all" ? null : value)}
            >
              <SelectTrigger className="border-green-200 focus:ring-green-400">
                <SelectValue placeholder="Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={() => setShowGenerator(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Generate Recipe
          </Button>
        </div>

        {showGenerator && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-800">Generate New Recipe</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowGenerator(false)}
                className="hover:bg-red-50 hover:text-red-500"
              >
                Close
              </Button>
            </div>
            <RecipeGenerator 
              onRecipeGenerated={() => {
                setShowGenerator(false);
                toast({
                  title: "Recipe generated successfully",
                  description: "Your new recipe has been added to the list",
                })
              }} 
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <div key={recipe.id} className="h-full transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                <RecipeDetailsModal recipe={recipe}>
                  <div className="cursor-pointer h-full">
                    <RecipeCard recipe={recipe} />
                  </div>
                </RecipeDetailsModal>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground mb-4">No recipes found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="border-green-200 hover:bg-green-50"
                onClick={() => {
                  setSearchQuery('');
                  setMealTypeFilter(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Recipes;
