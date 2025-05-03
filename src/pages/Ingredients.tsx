
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Search, Carrot } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getAllIngredients, getCurrentSeason } from '../data/ingredients';
import { useDietPlan } from '../context/DietPlanContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Ingredient, Season } from '../types';
import { IngredientBadge } from '../components/IngredientBadge';

const Ingredients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentSeason } = useDietPlan();
  
  const ingredients = getAllIngredients();
  
  // Filter ingredients based on search query
  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group ingredients by category
  const groupedIngredients = filteredIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);
  
  // Group ingredients by season
  const bySeason: Record<Season, Ingredient[]> = {
    spring: [],
    summer: [],
    autumn: [],
    winter: []
  };
  
  filteredIngredients.forEach(ingredient => {
    ingredient.seasons.forEach(season => {
      bySeason[season].push(ingredient);
    });
  });
  
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Carrot className="mr-3 h-7 w-7" /> Seasonal Ingredients
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover what's in season now and throughout the year
          </p>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="current">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Season</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="allSeasons">All Seasons</TabsTrigger>
          </TabsList>
          
          {/* Current Season Tab */}
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{currentSeason} Ingredients</CardTitle>
                <CardDescription>
                  Ingredients that are currently in season
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bySeason[currentSeason].length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {bySeason[currentSeason].map(ingredient => (
                      <Card key={ingredient.id} className="border-primary/20">
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-base">{ingredient.name}</CardTitle>
                          <Badge variant="outline" className="capitalize w-fit">{ingredient.category}</Badge>
                        </CardHeader>
                        <CardContent className="py-3 px-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Protein:</span> 
                              <span>{ingredient.nutritionPer100g.protein}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Carbs:</span> 
                              <span>{ingredient.nutritionPer100g.carbs}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fiber:</span> 
                              <span>{ingredient.nutritionPer100g.fiber}g</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No ingredients found matching your search criteria.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* By Category Tab */}
          <TabsContent value="category">
            {Object.entries(groupedIngredients).map(([category, items]) => (
              <Card key={category} className="mb-6">
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                  <CardDescription>
                    {items.length} ingredients available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map(ingredient => (
                      <IngredientBadge 
                        key={ingredient.id} 
                        ingredientId={ingredient.id}
                        showAmount={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {Object.keys(groupedIngredients).length === 0 && (
              <p className="text-center py-12 text-muted-foreground">No ingredients found matching your search criteria.</p>
            )}
          </TabsContent>
          
          {/* All Seasons Tab */}
          <TabsContent value="allSeasons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map(season => (
                <Card key={season} className={`border-${season}`}>
                  <CardHeader className={`bg-${season}-light bg-opacity-30`}>
                    <CardTitle className="capitalize">{season}</CardTitle>
                    <CardDescription>
                      {bySeason[season].length} ingredients in season
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="flex flex-wrap gap-2">
                      {bySeason[season].map(ingredient => (
                        <Badge key={ingredient.id} variant="outline">
                          {ingredient.name}
                        </Badge>
                      ))}
                    </div>
                    
                    {bySeason[season].length === 0 && (
                      <p className="text-center py-4 text-muted-foreground">No ingredients found matching your search criteria.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Ingredients;
