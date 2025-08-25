import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeAnimation = ({ onComplete, userData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const animationSteps = [
    {
      icon: 'CheckCircle',
      title: 'Konto erstellt!',
      description: 'Willkommen bei SparKoch',
      color: 'text-success'
    },
    {
      icon: 'MapPin',
      title: 'Standort eingerichtet',
      description: `PLZ ${userData?.postalCode} • ${userData?.searchRadius} km Radius`,
      color: 'text-secondary'
    },
    {
      icon: 'ChefHat',
      title: 'Vorlieben gespeichert',
      description: `${userData?.dietaryPreference === 'omnivore' ? 'Alles' : userData?.dietaryPreference} • ${userData?.allergens?.length || 0} Allergien`,
      color: 'text-primary'
    },
    {
      icon: 'PiggyBank',
      title: 'Budget festgelegt',
      description: `${userData?.weeklyBudget}€/Woche für ${userData?.householdSize} Person${userData?.householdSize > 1 ? 'en' : ''}`,
      color: 'text-warning'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent && currentStep < animationSteps?.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentStep, showContent, animationSteps?.length]);

  const handleGetStarted = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Icon name="ChefHat" size={40} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SparKoch</h1>
          <p className="text-muted-foreground">Ihr persönlicher Spar-Assistent</p>
        </div>

        {/* Animation Steps */}
        <div className="space-y-4 mb-8">
          {animationSteps?.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                index <= currentStep
                  ? 'opacity-100 translate-x-0 bg-card border border-border' :'opacity-30 translate-x-4'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={step?.icon} 
                  size={20} 
                  className={index <= currentStep ? step?.color : 'text-muted-foreground'}
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{step?.title}</h3>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>

              {index <= currentStep && (
                <Icon name="Check" size={16} className="text-success" />
              )}
            </div>
          ))}
        </div>

        {/* Success Message */}
        {currentStep >= animationSteps?.length - 1 && (
          <div className={`text-center space-y-4 transition-all duration-500 delay-1000 ${
            currentStep >= animationSteps?.length - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Sparkles" size={20} className="text-success" />
                <span className="font-medium text-success">Alles bereit!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Wir generieren bereits Ihren ersten personalisierten Essensplan mit lokalen Angeboten.
              </p>
            </div>

            {/* Estimated Savings */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  ~{Math.round(userData?.weeklyBudget * 0.15)}€
                </div>
                <div className="text-sm text-muted-foreground">
                  Geschätzte wöchentliche Ersparnis
                </div>
              </div>
            </div>

            {/* Get Started Button */}
            <Button
              variant="default"
              onClick={handleGetStarted}
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              className="h-12 text-lg font-medium"
            >
              Los geht's!
            </Button>

            <p className="text-xs text-muted-foreground">
              Sie können Ihre Einstellungen jederzeit in den Profileinstellungen ändern.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeAnimation;