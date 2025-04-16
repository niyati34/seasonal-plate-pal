
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useDietPlan } from '../context/DietPlanContext';
import { calculateDailyGoals } from '../utils/nutritionCalculator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const CreatePlanForm = () => {
  const { createPlan } = useDietPlan();
  const [name, setName] = useState('My Seasonal Diet Plan');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>('moderate');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate nutrition goals based on user data
    const goals = calculateDailyGoals(
      weight,
      height,
      age,
      gender,
      activity
    );
    
    // Create the new diet plan
    createPlan(name, goals);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your Seasonal Diet Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min={30}
                max={200}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min={100}
                max={250}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={18}
                max={100}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={gender} 
                onValueChange={(value) => setGender(value as 'male' | 'female')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select 
              value={activity}
              onValueChange={(value) => setActivity(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                <SelectItem value="very_active">Very Active (physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">Create Plan</Button>
        </form>
      </CardContent>
    </Card>
  );
};
