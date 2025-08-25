import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DietaryPreferencesStep = ({ onNext, onPrevious, formData, setFormData }) => {
  const [showAllergens, setShowAllergens] = useState(false);

  const dietaryOptions = [
    {
      id: 'omnivore',
      label: 'Alles',
      description: 'Keine Einschränkungen',
      icon: 'Utensils'
    },
    {
      id: 'vegetarian',
      label: 'Vegetarisch',
      description: 'Kein Fleisch oder Fisch',
      icon: 'Leaf'
    },
    {
      id: 'vegan',
      label: 'Vegan',
      description: 'Keine tierischen Produkte',
      icon: 'Sprout'
    },
    {
      id: 'pescatarian',
      label: 'Pescetarisch',
      description: 'Kein Fleisch, aber Fisch',
      icon: 'Fish'
    }
  ];

  const allergenOptions = [
    { id: 'gluten', label: 'Gluten', icon: 'Wheat' },
    { id: 'lactose', label: 'Laktose', icon: 'Milk' },
    { id: 'nuts', label: 'Nüsse', icon: 'Nut' },
    { id: 'eggs', label: 'Eier', icon: 'Egg' },
    { id: 'soy', label: 'Soja', icon: 'Bean' },
    { id: 'shellfish', label: 'Meeresfrüchte', icon: 'Shell' },
    { id: 'sesame', label: 'Sesam', icon: 'Seed' },
    { id: 'mustard', label: 'Senf', icon: 'Droplet' }
  ];

  const handleDietaryChange = (dietId) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreference: dietId
    }));
  };

  const handleAllergenChange = (allergenId, checked) => {
    setFormData(prev => {
      const currentAllergens = prev?.allergens || [];
      if (checked) {
        return {
          ...prev,
          allergens: [...currentAllergens, allergenId]
        };
      } else {
        return {
          ...prev,
          allergens: currentAllergens?.filter(id => id !== allergenId)
        };
      }
    });
  };

  const selectedDietary = formData?.dietaryPreference || 'omnivore';
  const selectedAllergens = formData?.allergens || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ChefHat" size={32} className="text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Ernährungsvorlieben</h1>
        <p className="text-muted-foreground">
          Personalisieren Sie Ihre Rezeptvorschläge
        </p>
      </div>
      {/* Dietary Preferences */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Ernährungsweise</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dietaryOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => handleDietaryChange(option?.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedDietary === option?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedDietary === option?.id ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={selectedDietary === option?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {option?.description}
                  </div>
                </div>
                {selectedDietary === option?.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Allergens Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Allergien & Unverträglichkeiten</h3>
          <button
            onClick={() => setShowAllergens(!showAllergens)}
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1"
          >
            <span>{showAllergens ? 'Weniger' : 'Mehr'}</span>
            <Icon name={showAllergens ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        </div>

        {showAllergens && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allergenOptions?.map((allergen) => (
              <div
                key={allergen?.id}
                className={`p-3 rounded-lg border transition-all ${
                  selectedAllergens?.includes(allergen?.id)
                    ? 'border-warning bg-warning/5' :'border-border'
                }`}
              >
                <Checkbox
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={allergen?.icon} 
                        size={16} 
                        className={selectedAllergens?.includes(allergen?.id) ? 'text-warning' : 'text-muted-foreground'}
                      />
                      <span className="text-sm">{allergen?.label}</span>
                    </div>
                  }
                  checked={selectedAllergens?.includes(allergen?.id)}
                  onChange={(e) => handleAllergenChange(allergen?.id, e?.target?.checked)}
                />
              </div>
            ))}
          </div>
        )}

        {selectedAllergens?.length > 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warning">Allergien ausgewählt</p>
                <p className="text-muted-foreground mt-1">
                  Wir werden Rezepte mit {selectedAllergens?.length} Allergen{selectedAllergens?.length > 1 ? 'en' : ''} ausschließen
                </p>
              </div>
            </div>
          </div>
        )}
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
          onClick={onNext}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={20}
          className="flex-1 h-12"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default DietaryPreferencesStep;