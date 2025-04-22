
import React from 'react';
import { Header } from '../src/components/Header';
import { MobileNav } from '../src/components/MobileNav';
import { Button } from '../src/components/ui/button';
import { Card, CardContent } from '../src/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, HeartHandshake, Heart, Utensils, Leaf, BookOpen } from 'lucide-react';
import { getIngredientsInSeason } from '../src/data/ingredients';
import { getCurrentSeason } from '../src/utils/nutritionCalculator';

const Index = () => {
  const currentSeason = getCurrentSeason();
  const seasonalIngredients = getIngredientsInSeason(currentSeason);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MobileNav />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <section className="my-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Seasonal Diet Planner</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create personalized diet plans using seasonal ingredients for healthier, more sustainable meals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <Link to="/create-plan">
                Create Your Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-200 hover:bg-green-50">
              <Link to="/recipes">
                Browse Recipes <ChefHat className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-md border-green-100 transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-4 bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seasonal Ingredients</h3>
              <p className="text-gray-600 mb-4">
                Access a comprehensive database of seasonal ingredients to make sustainable food choices
              </p>
              <Button asChild variant="link" className="text-green-600 p-0 h-auto font-medium">
                <Link to="/ingredients">
                  Explore Ingredients <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-green-100 transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-4 bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nutritious Recipes</h3>
              <p className="text-gray-600 mb-4">
                Discover and create recipes that maximize the nutritional benefits of in-season produce
              </p>
              <Button asChild variant="link" className="text-green-600 p-0 h-auto font-medium">
                <Link to="/recipes">
                  View Recipes <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-green-100 transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-4 bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Plans</h3>
              <p className="text-gray-600 mb-4">
                Create customized diet plans based on your nutrition goals and seasonal availability
              </p>
              <Button asChild variant="link" className="text-green-600 p-0 h-auto font-medium">
                <Link to="/create-plan">
                  Create Plan <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-green-100 transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-4 bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mother's Special</h3>
              <p className="text-gray-600 mb-4">
                Save and scale your mother's treasured recipes for any number of people
              </p>
              <Button asChild variant="link" className="text-green-600 p-0 h-auto font-medium">
                <Link to="/mothers-special">
                  Family Recipes <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Seasonal Ingredients Section */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Currently In Season</h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium py-1 px-3 rounded-full capitalize">
              {currentSeason}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {seasonalIngredients.slice(0, 8).map(ingredient => (
              <span 
                key={ingredient.id} 
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-100"
              >
                {ingredient.name}
              </span>
            ))}
            <Button asChild variant="link" className="text-green-600 h-8">
              <Link to="/ingredients">See all</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
