import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LocationSetupStep = ({ onNext, onPrevious, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const validatePostalCode = (code) => {
    const germanPostalRegex = /^[0-9]{5}$/;
    return germanPostalRegex?.test(code);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRadiusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      searchRadius: parseInt(value)
    }));
  };

  const handleContinue = async () => {
    const newErrors = {};
    
    if (!formData?.postalCode) {
      newErrors.postalCode = 'Postleitzahl ist erforderlich';
    } else if (!validatePostalCode(formData?.postalCode)) {
      newErrors.postalCode = 'Bitte geben Sie eine gültige deutsche Postleitzahl ein';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      setIsValidating(true);
      
      // Simulate postal code validation
      setTimeout(() => {
        setIsValidating(false);
        onNext();
      }, 1000);
    }
  };

  const radiusOptions = [
    { value: 2, label: '2 km', description: 'Nur nahegelegene Geschäfte' },
    { value: 5, label: '5 km', description: 'Gute Auswahl an Geschäften' },
    { value: 10, label: '10 km', description: 'Maximale Auswahl' },
    { value: 15, label: '15 km', description: 'Erweiterte Suche' }
  ];

  const currentRadius = formData?.searchRadius || 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MapPin" size={32} className="text-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Standort einrichten</h1>
        <p className="text-muted-foreground">
          Finden Sie die besten Angebote in Ihrer Nähe
        </p>
      </div>
      {/* Form */}
      <div className="space-y-6">
        {/* Postal Code */}
        <Input
          label="Postleitzahl"
          type="text"
          placeholder="10115"
          value={formData?.postalCode || ''}
          onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
          error={errors?.postalCode}
          description="Wir verwenden Ihre PLZ, um lokale Angebote zu finden"
          required
          maxLength={5}
        />

        {/* Search Radius */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Suchradius: {currentRadius} km
            </label>
            <p className="text-sm text-muted-foreground mb-4">
              Wie weit möchten Sie für Einkäufe fahren?
            </p>
          </div>

          {/* Radius Slider */}
          <div className="space-y-3">
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={currentRadius}
              onChange={(e) => handleRadiusChange(e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((currentRadius - 2) / 13) * 100}%, var(--color-muted) ${((currentRadius - 2) / 13) * 100}%, var(--color-muted) 100%)`
              }}
            />
            
            {/* Radius Options */}
            <div className="grid grid-cols-2 gap-3">
              {radiusOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleRadiusChange(option?.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    currentRadius === option?.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {option?.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location Preview */}
        {formData?.postalCode && validatePostalCode(formData?.postalCode) && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-secondary" />
              <span className="font-medium text-foreground">Standort gefunden</span>
            </div>
            <p className="text-sm text-muted-foreground">
              PLZ {formData?.postalCode} • Suchradius {currentRadius} km
            </p>
            <p className="text-xs text-muted-foreground">
              Wir finden Angebote von ca. 12-18 Supermärkten in Ihrer Nähe
            </p>
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
          onClick={handleContinue}
          loading={isValidating}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={20}
          className="flex-1 h-12"
        >
          {isValidating ? 'Validiere...' : 'Weiter'}
        </Button>
      </div>
    </div>
  );
};

export default LocationSetupStep;