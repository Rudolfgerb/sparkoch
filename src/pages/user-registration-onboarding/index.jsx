import React, { useState } from 'react';
import OnboardingContainer from '../../components/ui/OnboardingContainer';
import AccountSetupStep from './components/AccountSetupStep';
import LocationSetupStep from './components/LocationSetupStep';
import DietaryPreferencesStep from './components/DietaryPreferencesStep';
import BudgetSetupStep from './components/BudgetSetupStep';
import WelcomeAnimation from './components/WelcomeAnimation';

const UserRegistrationOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState({
    // Account data
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Location data
    postalCode: '',
    searchRadius: 5,
    
    // Dietary data
    dietaryPreference: 'omnivore',
    allergens: [],
    
    // Budget data
    weeklyBudget: 75,
    householdSize: 2
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    // Navigate to dashboard with default settings
    window.location.href = '/dashboard-home';
  };

  const handleComplete = () => {
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    // Save user data to localStorage (mock implementation)
    localStorage.setItem('sparkoch_user', JSON.stringify({
      ...formData,
      registrationDate: new Date()?.toISOString(),
      isOnboarded: true
    }));
    
    // Navigate to dashboard
    window.location.href = '/dashboard-home';
  };

  // Show welcome animation after onboarding completion
  if (showWelcome) {
    return (
      <WelcomeAnimation 
        onComplete={handleWelcomeComplete}
        userData={formData}
      />
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountSetupStep
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <LocationSetupStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <DietaryPreferencesStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <BudgetSetupStep
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData?.firstName && formData?.lastName && formData?.email && 
               formData?.password && formData?.confirmPassword &&
               formData?.password === formData?.confirmPassword;
      case 2:
        return formData?.postalCode && formData?.postalCode?.length === 5;
      case 3:
        return formData?.dietaryPreference;
      case 4:
        return formData?.weeklyBudget && formData?.householdSize;
      default:
        return true;
    }
  };

  return (
    <OnboardingContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSkip={handleSkip}
      onComplete={handleComplete}
      canProceed={canProceed()}
    >
      {renderCurrentStep()}
    </OnboardingContainer>
  );
};

export default UserRegistrationOnboarding;