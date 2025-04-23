
import React, { useState } from 'react';
import { Header } from '../src/components/Header';
import { MobileNav } from '../src/components/MobileNav';
import { Link } from 'react-router-dom';
import { 
  Button 
} from '../src/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../src/components/ui/form';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../src/components/ui/select';
import { Separator } from '../src/components/ui/separator';
import { Textarea } from '../src/components/ui/textarea';
import { ArrowLeft, ChefHat, Heart, Plus, Scale, Trash, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../src/components/ui/use-toast';

// Define schema for the recipe form
const recipeSchema = z.object({
  name: z.string().min(3, { message: "Recipe name must be at least 3 characters" }),
  servesCount: z.coerce.number().int().positive().min(1),
  ingredients: z.string().min(10, { message: "Please provide detailed ingredients" }),
  instructions: z.string().min(10, { message: "Please provide detailed instructions" }),
  notes: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

// Define the structure for a saved recipe
interface MothersRecipe {
  id: string;
  name: string;
  servesCount: number;
  ingredients: string;
  instructions: string;
  notes?: string;
  createdAt: Date;
}

const MothersSpecial = () => {
  const [savedRecipes, setSavedRecipes] = useState<MothersRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<MothersRecipe | null>(null);
  const [scaledServings, setScaledServings] = useState<number>(0);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      servesCount: 2,
      ingredients: '',
      instructions: '',
      notes: '',
    },
  });

  const onSubmit = (values: RecipeFormValues) => {
    const newRecipe: MothersRecipe = {
      id: Date.now().toString(),
      name: values.name,
      servesCount: values.servesCount,
      ingredients: values.ingredients,
      instructions: values.instructions,
      notes: values.notes,
      createdAt: new Date(),
    };
    
    setSavedRecipes([newRecipe, ...savedRecipes]);
    form.reset();
    
    toast({
      title: "Recipe Saved!",
      description: "Your mother's special recipe has been saved.",
    });
  };

  const deleteRecipe = (id: string) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
      setScaledServings(0);
    }
    
    toast({
      title: "Recipe Deleted",
      description: "The recipe has been removed from your collection.",
      variant: "destructive",
    });
  };

  const selectRecipeForScaling = (recipe: MothersRecipe) => {
    setSelectedRecipe(recipe);
    setScaledServings(recipe.servesCount);
  };

  const scaleIngredients = (originalText: string, originalServings: number, newServings: number): string => {
    if (originalServings === newServings) return originalText;
    
    // Split the ingredients by newline to process each line
    const lines = originalText.split('\n');
    
    const scaledLines = lines.map(line => {
      // Try to find amount patterns like "2 cups" or "1/2 teaspoon"
      const amountPattern = /(\d+\/\d+|\d+\.?\d*)\s*([a-zA-Z]+)/g;
      return line.replace(amountPattern, (match, amount, unit) => {
        let numericAmount: number;
        
        // Handle fractions like 1/2
        if (amount.includes('/')) {
          const [numerator, denominator] = amount.split('/');
          numericAmount = parseInt(numerator) / parseInt(denominator);
        } else {
          numericAmount = parseFloat(amount);
        }
        
        // Calculate scaled amount
        const scaledAmount = (numericAmount * newServings) / originalServings;
        
        // Format result based on whether it's a whole number or decimal
        let formattedAmount: string;
        if (Number.isInteger(scaledAmount)) {
          formattedAmount = scaledAmount.toString();
        } else {
          // Round to 2 decimal places for fractions
          formattedAmount = scaledAmount.toFixed(2).replace(/\.0+$/, '');
        }
        
        return `${formattedAmount} ${unit}`;
      });
    });
    
    return scaledLines.join('\n');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-50">
      <Header />
      <MobileNav />
      
      <main className="flex-grow container mx-auto max-w-6xl py-8 px-4">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="hover:bg-green-50">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-green-800">
            <Heart className="mr-3 h-7 w-7 text-red-500" /> Mother's Special Recipes
          </h1>
          <p className="text-muted-foreground mt-2">
            Save your mother's treasured recipes and easily scale them for any number of people
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left side: Recipe Entry Form */}
          <div className="md:col-span-6">
            <Card className="border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <CardTitle className="flex items-center text-green-800">
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Recipe
                </CardTitle>
                <CardDescription>
                  Enter the details of your mother's special recipe
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipe Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Mom's Famous Pasta" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="servesCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serves</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              placeholder="2" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ingredients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingredients</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="2 cups flour&#10;1 teaspoon salt&#10;3 eggs&#10;..."
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cooking Instructions</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="1. Mix the flour and salt...&#10;2. Add eggs and mix well...&#10;..."
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Mom always said to use cold butter..."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <ChefHat className="mr-2 h-4 w-4" />
                      Save Mother's Recipe
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side: Recipe List and Scaling Tool */}
          <div className="md:col-span-6 space-y-6">
            {/* Scaling Tool */}
            {selectedRecipe && (
              <Card className="border-green-100 shadow-lg animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
                  <CardTitle className="flex items-center">
                    <Scale className="mr-2 h-5 w-5 text-blue-600" />
                    Recipe Scaling Tool
                  </CardTitle>
                  <CardDescription>
                    Adjust the recipe for different serving sizes
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">{selectedRecipe.name}</h3>
                      <p className="text-sm text-muted-foreground">Original recipe serves: {selectedRecipe.servesCount}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-full">
                        <Label htmlFor="scaledServings">Scale to serve:</Label>
                        <Input
                          id="scaledServings"
                          type="number"
                          min={1}
                          value={scaledServings}
                          onChange={(e) => setScaledServings(parseInt(e.target.value) || selectedRecipe.servesCount)}
                          className="mt-1"
                        />
                      </div>
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="font-medium mb-2">Scaled Ingredients:</h4>
                      <pre className="bg-green-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {scaleIngredients(selectedRecipe.ingredients, selectedRecipe.servesCount, scaledServings)}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Cooking Instructions:</h4>
                      <pre className="bg-green-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {selectedRecipe.instructions}
                      </pre>
                    </div>
                    
                    {selectedRecipe.notes && (
                      <div>
                        <h4 className="font-medium mb-2">Special Notes:</h4>
                        <pre className="bg-green-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                          {selectedRecipe.notes}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Recipe List */}
            <div className="bg-white rounded-lg border border-green-100 shadow">
              <div className="p-4 border-b border-green-100">
                <h3 className="font-medium">Saved Recipes</h3>
              </div>
              
              <div className="max-h-[500px] overflow-y-auto">
                {savedRecipes.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <ChefHat className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                    <p>No recipes saved yet</p>
                    <p className="text-sm">Add your mother's special recipe using the form</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-green-100">
                    {savedRecipes.map(recipe => (
                      <li key={recipe.id} className="p-4 hover:bg-green-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium hover:text-green-600 cursor-pointer" onClick={() => selectRecipeForScaling(recipe)}>
                              {recipe.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">Serves {recipe.servesCount}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => selectRecipeForScaling(recipe)}
                            >
                              <Scale className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => deleteRecipe(recipe.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MothersSpecial;
