
import React from 'react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { useDietPlan } from '../context/DietPlanContext';
import { NutritionTracker } from '../components/NutritionTracker';
import { NutritionGoalsForm } from '../components/NutritionGoalsForm';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { getRecipeById } from '../data/recipes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const MyPlan = () => {
  const { currentPlan } = useDietPlan();
  
  // If no plan exists, redirect to create one
  if (!currentPlan) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <MobileNav />
        
        <main className="flex-grow container mx-auto max-w-4xl py-8 px-4">
          <div className="mb-6">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">No Diet Plan Found</h1>
            <p className="text-muted-foreground mb-8">
              You haven't created a diet plan yet. Let's get started!
            </p>
            <Button asChild size="lg">
              <Link to="/create-plan">Create Your Diet Plan</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  // Group meals by day of the week
  const mealsByDay = currentPlan.meals.reduce((acc, meal) => {
    if (!acc[meal.dayOfWeek]) {
      acc[meal.dayOfWeek] = [];
    }
    
    const recipe = getRecipeById(meal.recipeId);
    if (recipe) {
      acc[meal.dayOfWeek].push({
        ...meal,
        recipe
      });
    }
    
    return acc;
  }, {} as Record<number, Array<{recipeId: string; servings: number; dayOfWeek: number; mealType: string; recipe: any}>>);
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MobileNav />
      
      <main className="flex-grow container mx-auto max-w-4xl py-8 px-4">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{currentPlan.name}</h1>
            <p className="text-muted-foreground">Your personalized seasonal diet plan</p>
          </div>
          
          <Button asChild className="mt-4 sm:mt-0">
            <Link to="/recipes">
              <Plus className="mr-2 h-4 w-4" /> Add Recipe
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <NutritionTracker />
          <div className="lg:col-span-2">
            <NutritionGoalsForm />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Weekly Plan</h2>
          
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="mb-6 flex overflow-x-auto pb-2">
              {days.map((day, index) => (
                <TabsTrigger key={day} value={index.toString()}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day, index) => (
              <TabsContent key={day} value={index.toString()}>
                {mealsByDay[index] && mealsByDay[index].length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mealsByDay[index].map((meal, mealIndex) => (
                      <Card key={`${meal.recipeId}-${mealIndex}`} className="h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg capitalize">{meal.mealType}</CardTitle>
                          <CardDescription>{meal.servings > 1 ? `${meal.servings} servings` : '1 serving'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <RecipeCard recipe={meal.recipe} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No meals planned for {day}</p>
                      <Button asChild>
                        <Link to="/recipes">
                          <Plus className="mr-2 h-4 w-4" /> Add Recipe
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyPlan;
