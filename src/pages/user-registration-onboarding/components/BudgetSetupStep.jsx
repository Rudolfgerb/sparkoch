import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BudgetSetupStep = ({ onComplete, onPrevious, formData, setFormData }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleBudgetChange = (value) => {
    setFormData(prev => ({
      ...prev,
      weeklyBudget: parseInt(value)
    }));
  };

  const handleHouseholdSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      householdSize: size
    }));
  };

  const handleComplete = async () => {
    if (!acceptedTerms) {
      return;
    }

    setIsCompleting(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsCompleting(false);
      onComplete();
    }, 2000);
  };

  const currentBudget = formData?.weeklyBudget || 75;
  const currentHouseholdSize = formData?.householdSize || 2;

  const budgetRanges = [
    { min: 25, max: 50, label: 'Sparsam', description: 'Grundausstattung' },
    { min: 50, max: 100, label: 'Ausgewogen', description: 'Gute Vielfalt' },
    { min: 100, max: 150, label: 'Komfortabel', description: 'Premium Produkte' },
    { min: 150, max: 200, label: 'Großzügig', description: 'Keine Einschränkungen' }
  ];

  const householdOptions = [
    { size: 1, label: '1 Person', icon: 'User' },
    { size: 2, label: '2 Personen', icon: 'Users' },
    { size: 3, label: '3 Personen', icon: 'Users' },
    { size: 4, label: '4+ Personen', icon: 'Users' }
  ];

  const getCurrentBudgetRange = () => {
    return budgetRanges?.find(range => currentBudget >= range?.min && currentBudget <= range?.max) || budgetRanges?.[1];
  };

  const estimatedSavings = Math.round(currentBudget * 0.15); // 15% estimated savings

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="PiggyBank" size={32} className="text-warning" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Budget festlegen</h1>
        <p className="text-muted-foreground">
          Optimieren Sie Ihre Ausgaben für maximale Ersparnisse
        </p>
      </div>
      {/* Form */}
      <div className="space-y-6">
        {/* Household Size */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Haushaltsgröße</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {householdOptions?.map((option) => (
              <button
                key={option?.size}
                onClick={() => handleHouseholdSizeChange(option?.size)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  currentHouseholdSize === option?.size
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <Icon 
                  name={option?.icon} 
                  size={20} 
                  className={`mx-auto mb-2 ${
                    currentHouseholdSize === option?.size ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="text-sm font-medium">{option?.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Budget */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">
              Wöchentliches Budget: {currentBudget}€
            </h3>
            <p className="text-sm text-muted-foreground">
              {getCurrentBudgetRange()?.label} • {getCurrentBudgetRange()?.description}
            </p>
          </div>

          {/* Budget Slider */}
          <div className="space-y-4">
            <input
              type="range"
              min="25"
              max="200"
              step="5"
              value={currentBudget}
              onChange={(e) => handleBudgetChange(e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-warning) 0%, var(--color-warning) ${((currentBudget - 25) / 175) * 100}%, var(--color-muted) ${((currentBudget - 25) / 175) * 100}%, var(--color-muted) 100%)`
              }}
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>25€</span>
              <span>100€</span>
              <span>200€</span>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wöchentliches Budget</span>
              <span className="font-medium">{currentBudget}€</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pro Person/Woche</span>
              <span className="font-medium">{Math.round(currentBudget / currentHouseholdSize)}€</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="text-sm text-success font-medium">Geschätzte Ersparnis</span>
              <span className="font-medium text-success">~{estimatedSavings}€/Woche</span>
            </div>
          </div>
        </div>

        {/* Savings Preview */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-success">Ihr Sparpotential</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Mit SparKoch können Sie bis zu {estimatedSavings}€ pro Woche sparen. 
                Das sind über {estimatedSavings * 52}€ im Jahr!
              </p>
            </div>
          </div>
        </div>

        {/* Terms Acceptance */}
        <div className="space-y-4">
          <Checkbox
            label={
              <span className="text-sm">
                Ich akzeptiere die{' '}
                <button className="text-primary hover:underline">
                  Nutzungsbedingungen
                </button>
                {' '}und{' '}
                <button className="text-primary hover:underline">
                  Datenschutzerklärung
                </button>
              </span>
            }
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e?.target?.checked)}
            required
          />
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          iconSize={20}
          className="flex-1 h-12"
        >
          Zurück
        </Button>
        
        <Button
          variant="default"
          onClick={handleComplete}
          loading={isCompleting}
          disabled={!acceptedTerms}
          iconName="Check"
          iconPosition="right"
          iconSize={20}
          className="flex-1 h-12"
        >
          {isCompleting ? 'Konto wird erstellt...' : 'Konto erstellen'}
        </Button>
      </div>
    </div>
  );
};

export default BudgetSetupStep;