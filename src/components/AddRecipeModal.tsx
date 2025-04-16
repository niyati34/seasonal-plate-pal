
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDietPlan } from "../context/DietPlanContext";
import { Recipe } from "../types";

interface AddRecipeModalProps {
  recipe: Recipe;
  children: React.ReactNode;
}

export const AddRecipeModal = ({ recipe, children }: AddRecipeModalProps) => {
  const { addRecipeToPlan } = useDietPlan();
  const [servings, setServings] = useState(1);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleAddToPlan = () => {
    addRecipeToPlan(recipe, servings, dayOfWeek, recipe.mealType);
    setOpen(false);
  };
  
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Plan</DialogTitle>
          <DialogDescription>
            Add {recipe.name} to your meal plan
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servings" className="col-span-1">
              Servings
            </Label>
            <Input
              id="servings"
              type="number"
              min={1}
              max={10}
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="day" className="col-span-1">
              Day
            </Label>
            <Select
              value={dayOfWeek.toString()}
              onValueChange={(value) => setDayOfWeek(Number(value))}
            >
              <SelectTrigger id="day" className="col-span-3">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day, index) => (
                  <SelectItem key={day} value={index.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddToPlan}>
            Add to Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
