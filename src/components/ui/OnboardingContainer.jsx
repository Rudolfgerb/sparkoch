import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const OnboardingContainer = ({ children, currentStep = 1, totalSteps = 4, onNext, onPrevious, onSkip, onComplete, canProceed = true }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onSkip) {
        onSkip();
      }
    }, 200);
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 200);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={`fixed inset-0 z-400 bg-background transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <div className="safe-area-top">
        <div className="flex items-center justify-between p-4 border-b border-border">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ChefHat" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">SparKoch</span>
          </div>

          {/* Skip Button */}
          {!isLastStep && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Überspringen
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Schritt {currentStep} von {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col">
          <div className="flex-1 px-4 py-6">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card safe-area-bottom">
        <div className="flex items-center justify-between p-4 space-x-3">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
            className="flex-1 max-w-32"
          >
            Zurück
          </Button>

          {/* Step Indicators */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index + 1 <= currentStep
                    ? 'bg-primary' :'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Next/Complete Button */}
          <Button
            variant="default"
            onClick={isLastStep ? handleComplete : handleNext}
            disabled={!canProceed}
            iconName={isLastStep ? "Check" : "ChevronRight"}
            iconPosition="right"
            iconSize={16}
            className="flex-1 max-w-32"
          >
            {isLastStep ? 'Fertig' : 'Weiter'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;