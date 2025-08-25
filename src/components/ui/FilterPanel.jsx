import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { Checkbox } from './Checkbox';
import Select from './Select';

const FilterPanel = ({ 
  isOpen = false, 
  onClose, 
  onApply, 
  onReset, 
  filters = {},
  filterOptions = {},
  activeFilterCount = 0 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    dietary: false,
    location: false,
  });

  const handleFilterChange = (category, value, checked = null) => {
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
    if (onApply) {
      onApply(localFilters);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setLocalFilters({});
    if (onReset) {
      onReset();
    }
  };

  const categoryOptions = filterOptions?.categories || [
    { value: 'hauptgerichte', label: 'Hauptgerichte' },
    { value: 'vorspeisen', label: 'Vorspeisen' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'snacks', label: 'Snacks' },
  ];

  const priceRanges = filterOptions?.priceRanges || [
    { value: '0-5', label: 'Unter 5€' },
    { value: '5-10', label: '5€ - 10€' },
    { value: '10-20', label: '10€ - 20€' },
    { value: '20+', label: 'Über 20€' },
  ];

  const dietaryOptions = filterOptions?.dietary || [
    { value: 'vegetarian', label: 'Vegetarisch' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Glutenfrei' },
    { value: 'lactosefree', label: 'Laktosefrei' },
    { value: 'lowcarb', label: 'Low Carb' },
  ];

  const distanceOptions = [
    { value: '1', label: '1 km' },
    { value: '2', label: '2 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-300 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Panel */}
      <div className={`
        fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border z-300 transform transition-transform duration-300 ease-out
        lg:relative lg:w-80 lg:border-l-0 lg:border-r lg:transform-none lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h2 className="text-lg font-semibold">Filter</h2>
            {activeFilterCount > 0 && (
              <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {activeFilterCount}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-foreground">Kategorie</h3>
              <Icon 
                name={expandedSections?.category ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            
            {expandedSections?.category && (
              <div className="mt-3 space-y-2">
                {categoryOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.categories?.includes(option?.value) || false}
                    onChange={(e) => handleFilterChange('categories', option?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-foreground">Preis</h3>
              <Icon 
                name={expandedSections?.price ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            
            {expandedSections?.price && (
              <div className="mt-3">
                <Select
                  placeholder="Preisbereich wählen"
                  options={priceRanges}
                  value={localFilters?.priceRange || ''}
                  onChange={(value) => handleFilterChange('priceRange', value)}
                />
              </div>
            )}
          </div>

          {/* Dietary Restrictions */}
          <div>
            <button
              onClick={() => toggleSection('dietary')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-foreground">Ernährung</h3>
              <Icon 
                name={expandedSections?.dietary ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            
            {expandedSections?.dietary && (
              <div className="mt-3 space-y-2">
                {dietaryOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.dietary?.includes(option?.value) || false}
                    onChange={(e) => handleFilterChange('dietary', option?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Location/Distance */}
          <div>
            <button
              onClick={() => toggleSection('location')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-foreground">Entfernung</h3>
              <Icon 
                name={expandedSections?.location ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            
            {expandedSections?.location && (
              <div className="mt-3">
                <Select
                  placeholder="Maximale Entfernung"
                  options={distanceOptions}
                  value={localFilters?.distance || ''}
                  onChange={(value) => handleFilterChange('distance', value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-3">
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

export default FilterPanel;