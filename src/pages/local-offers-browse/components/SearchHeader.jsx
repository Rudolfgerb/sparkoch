import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterToggle, 
  onViewModeToggle,
  onMapToggle,
  viewMode = 'grid',
  showMap = false,
  filterCount = 0,
  location = "Berlin, Mitte"
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-card border-b border-border">
      {/* Location Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{location}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Letzte Aktualisierung: {new Date()?.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {/* Search & Controls */}
      <div className="p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Produkte, Marken oder Kategorien suchen..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 pr-4"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterToggle}
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
              className="relative"
            >
              Filter
              {filterCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {filterCount}
                </div>
              )}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => onViewModeToggle('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => onViewModeToggle('store')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'store' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Building2" size={16} />
              </button>
            </div>
          </div>

          {/* Map Toggle */}
          <Button
            variant={showMap ? "default" : "outline"}
            size="sm"
            onClick={onMapToggle}
            iconName="Map"
            iconPosition="left"
            iconSize={16}
          >
            Karte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;