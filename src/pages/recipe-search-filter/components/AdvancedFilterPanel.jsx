import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilterPanel = ({ 
  isOpen = false, 
  onClose, 
  onApply, 
  onReset, 
  filters = {},
  onFilterChange 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    dietary: true,
    cuisine: true,
    cooking: false,
    ingredients: false,
    nutrition: false,
    budget: false
  });

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarisch' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Glutenfrei' },
    { value: 'lactosefree', label: 'Laktosefrei' },
    { value: 'lowcarb', label: 'Low Carb' },
    { value: 'keto', label: 'Ketogen' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'diabetic', label: 'Diabetiker-geeignet' }
  ];

  const cuisineOptions = [
    { value: 'german', label: 'Deutsch' },
    { value: 'italian', label: 'Italienisch' },
    { value: 'asian', label: 'Asiatisch' },
    { value: 'mediterranean', label: 'Mediterran' },
    { value: 'mexican', label: 'Mexikanisch' },
    { value: 'indian', label: 'Indisch' },
    { value: 'french', label: 'Französisch' },
    { value: 'american', label: 'Amerikanisch' }
  ];

  const cookingMethodOptions = [
    { value: 'baking', label: 'Backen' },
    { value: 'grilling', label: 'Grillen' },
    { value: 'frying', label: 'Braten' },
    { value: 'steaming', label: 'Dämpfen' },
    { value: 'boiling', label: 'Kochen' },
    { value: 'roasting', label: 'Rösten' },
    { value: 'slowcooking', label: 'Slow Cooking' },
    { value: 'airfrying', label: 'Heißluftfrittieren' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Einfach' },
    { value: 'medium', label: 'Mittel' },
    { value: 'hard', label: 'Schwer' }
  ];

  const cookingTimeOptions = [
    { value: '0-15', label: 'Unter 15 Minuten' },
    { value: '15-30', label: '15-30 Minuten' },
    { value: '30-60', label: '30-60 Minuten' },
    { value: '60-120', label: '1-2 Stunden' },
    { value: '120+', label: 'Über 2 Stunden' }
  ];

  const servingsOptions = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 Personen' },
    { value: '4', label: '4 Personen' },
    { value: '6', label: '6 Personen' },
    { value: '8+', label: '8+ Personen' }
  ];

  const handleLocalFilterChange = (category, value, checked = null) => {
    setLocalFilters(prev => {
      const newFilters = { ...prev };
      
      if (checked !== null) {
        // Checkbox handling
        if (!newFilters?.[category]) {
          newFilters[category] = [];
        }
        if (checked) {
          newFilters[category] = [...newFilters?.[category], value];
        } else {
          newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
        }
      } else {
        // Select/input handling
        newFilters[category] = value;
      }
      
      return newFilters;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      
      {expandedSections?.[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-400"
          onClick={onClose}
        />
      )}
      {/* Panel */}
      <div className={`
        fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border z-500 transform transition-transform duration-300 ease-out overflow-hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center space-x-2">
            <Icon name="SlidersHorizontal" size={20} />
            <h2 className="text-lg font-semibold">Erweiterte Filter</h2>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Dietary Restrictions */}
          <FilterSection title="Ernährungsweise" sectionKey="dietary">
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.dietary?.includes(option?.value) || false}
                  onChange={(e) => handleLocalFilterChange('dietary', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Cuisine Type */}
          <FilterSection title="Küche" sectionKey="cuisine">
            <div className="grid grid-cols-2 gap-2">
              {cuisineOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.cuisine?.includes(option?.value) || false}
                  onChange={(e) => handleLocalFilterChange('cuisine', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Cooking Details */}
          <FilterSection title="Zubereitung" sectionKey="cooking">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Schwierigkeit
                </label>
                <Select
                  options={difficultyOptions}
                  value={localFilters?.difficulty || ''}
                  onChange={(value) => handleLocalFilterChange('difficulty', value)}
                  placeholder="Schwierigkeit wählen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Zubereitungszeit
                </label>
                <Select
                  options={cookingTimeOptions}
                  value={localFilters?.cookingTime || ''}
                  onChange={(value) => handleLocalFilterChange('cookingTime', value)}
                  placeholder="Zeit wählen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Portionen
                </label>
                <Select
                  options={servingsOptions}
                  value={localFilters?.servings || ''}
                  onChange={(value) => handleLocalFilterChange('servings', value)}
                  placeholder="Portionen wählen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Zubereitungsart
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cookingMethodOptions?.map((option) => (
                    <Checkbox
                      key={option?.value}
                      label={option?.label}
                      checked={localFilters?.cookingMethods?.includes(option?.value) || false}
                      onChange={(e) => handleLocalFilterChange('cookingMethods', option?.value, e?.target?.checked)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Ingredients */}
          <FilterSection title="Zutaten" sectionKey="ingredients">
            <div className="space-y-4">
              <div>
                <Input
                  label="Zutaten einschließen"
                  placeholder="z.B. Tomaten, Käse"
                  value={localFilters?.includeIngredients || ''}
                  onChange={(e) => handleLocalFilterChange('includeIngredients', e?.target?.value)}
                  description="Komma-getrennte Liste"
                />
              </div>

              <div>
                <Input
                  label="Zutaten ausschließen"
                  placeholder="z.B. Nüsse, Fisch"
                  value={localFilters?.excludeIngredients || ''}
                  onChange={(e) => handleLocalFilterChange('excludeIngredients', e?.target?.value)}
                  description="Komma-getrennte Liste"
                />
              </div>
            </div>
          </FilterSection>

          {/* Nutrition Goals */}
          <FilterSection title="Nährwerte" sectionKey="nutrition">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Max. Kalorien"
                  type="number"
                  placeholder="500"
                  value={localFilters?.maxCalories || ''}
                  onChange={(e) => handleLocalFilterChange('maxCalories', e?.target?.value)}
                />
                <Input
                  label="Min. Protein (g)"
                  type="number"
                  placeholder="20"
                  value={localFilters?.minProtein || ''}
                  onChange={(e) => handleLocalFilterChange('minProtein', e?.target?.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Max. Fett (g)"
                  type="number"
                  placeholder="30"
                  value={localFilters?.maxFat || ''}
                  onChange={(e) => handleLocalFilterChange('maxFat', e?.target?.value)}
                />
                <Input
                  label="Max. Kohlenhydrate (g)"
                  type="number"
                  placeholder="50"
                  value={localFilters?.maxCarbs || ''}
                  onChange={(e) => handleLocalFilterChange('maxCarbs', e?.target?.value)}
                />
              </div>
            </div>
          </FilterSection>

          {/* Budget */}
          <FilterSection title="Budget" sectionKey="budget">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min. Preis (€)"
                  type="number"
                  step="0.50"
                  placeholder="0.00"
                  value={localFilters?.minPrice || ''}
                  onChange={(e) => handleLocalFilterChange('minPrice', e?.target?.value)}
                />
                <Input
                  label="Max. Preis (€)"
                  type="number"
                  step="0.50"
                  placeholder="15.00"
                  value={localFilters?.maxPrice || ''}
                  onChange={(e) => handleLocalFilterChange('maxPrice', e?.target?.value)}
                />
              </div>

              <div>
                <Input
                  label="Min. Angebots-Abdeckung (%)"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="50"
                  value={localFilters?.minOfferCoverage || ''}
                  onChange={(e) => handleLocalFilterChange('minOfferCoverage', e?.target?.value)}
                  description="Mindestanteil der Zutaten im Angebot"
                />
              </div>
            </div>
          </FilterSection>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-card">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Zurücksetzen
            </Button>
            
            <Button
              variant="default"
              onClick={handleApply}
              className="flex-1"
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Anwenden
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilterPanel;