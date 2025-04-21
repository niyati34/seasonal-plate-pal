
import React from 'react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { CreatePlanForm } from '../components/CreatePlanForm';
import { Link } from 'react-router-dom';
import { useDietPlan } from '../context/DietPlanContext';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CreatePlan = () => {
  const { currentPlan } = useDietPlan();
  
  // If user already has a plan, redirect them
  if (currentPlan) {
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
            <h1 className="text-3xl font-bold mb-4">You Already Have a Plan</h1>
            <p className="text-muted-foreground mb-8">
              You've already created a diet plan. Would you like to view or edit it?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/plan">View Your Plan</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/plan/edit">Edit Plan</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
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
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Diet Plan</h1>
          <p className="text-muted-foreground mt-2">
            Enter your information to calculate personalized nutrition goals
          </p>
        </div>
        
        <CreatePlanForm />
      </main>
    </div>
  );
};

export default CreatePlan;
