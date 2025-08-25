import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  activeFilters = {}, 
  onRemoveFilter, 
  onClearAll, 
  onOpenFilters 
}) => {
  const filterLabels = {
    dietary: {
      vegetarian: 'Vegetarisch',
      vegan: 'Vegan',
      glutenfree: 'Glutenfrei',
      lactosefree: 'Laktosefrei',
      lowcarb: 'Low Carb'
    },
    cuisine: {
      italian: 'Italienisch',
      asian: 'Asiatisch',
      german: 'Deutsch',
      mediterranean: 'Mediterran',
      mexican: 'Mexikanisch'
    },
    difficulty: {
      easy: 'Einfach',
      medium: 'Mittel',
      hard: 'Schwer'
    },
    cookingTime: {
      '0-15': 'Unter 15 Min',
      '15-30': '15-30 Min',
      '30-60': '30-60 Min',
      '60+': 'Über 60 Min'
    },
    priceRange: {
      '0-5': 'Unter 5€',
      '5-10': '5€-10€',
      '10-15': '10€-15€',
      '15+': 'Über 15€'
    }
  };

  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters)?.forEach(([category, values]) => {
      if (Array.isArray(values)) {
        values?.forEach(value => {
          const label = filterLabels?.[category]?.[value] || value;
          chips?.push({
            category,
            value,
            label,
            key: `${category}-${value}`
          });
        });
      } else if (values) {
        const label = filterLabels?.[category]?.[values] || values;
        chips?.push({
          category,
          value: values,
          label,
          key: `${category}-${values}`
        });
      }
    });
    
    return chips;
  };

  const filterChips = getFilterChips();
  const hasActiveFilters = filterChips?.length > 0;

  if (!hasActiveFilters) {
    return (
      <div className="px-4 py-2">
        <Button
          variant="outline"
          onClick={onOpenFilters}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Filter hinzufügen
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Aktive Filter ({filterChips?.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Alle entfernen
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterChips?.map((chip) => (
          <div
            key={chip?.key}
            className="inline-flex items-center bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-medium"
          >
            <span>{chip?.label}</span>
            <button
              onClick={() => onRemoveFilter(chip?.category, chip?.value)}
              className="ml-2 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilters}
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          className="text-xs"
        >
          Weitere Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterChips;