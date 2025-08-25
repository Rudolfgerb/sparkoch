import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortOptions = ({ 
  currentSort = 'relevance', 
  onSortChange, 
  resultCount = 0 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevanz', icon: 'Target' },
    { value: 'price-low', label: 'Preis: Niedrig zu Hoch', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Preis: Hoch zu Niedrig', icon: 'TrendingDown' },
    { value: 'time-short', label: 'Zubereitungszeit: Kurz', icon: 'Clock' },
    { value: 'time-long', label: 'Zubereitungszeit: Lang', icon: 'Clock' },
    { value: 'rating', label: 'Bewertung', icon: 'Star' },
    { value: 'newest', label: 'Neueste', icon: 'Calendar' },
    { value: 'popular', label: 'Beliebteste', icon: 'Heart' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount > 0 ? (
          <span>{resultCount?.toLocaleString('de-DE')} Rezepte gefunden</span>
        ) : (
          <span>Keine Rezepte gefunden</span>
        )}
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          iconName={currentSortOption?.icon || 'ArrowUpDown'}
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          {currentSortOption?.label || 'Sortieren'}
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2" 
          />
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-popover border border-border rounded-lg shadow-elevated z-50">
            <div className="py-1">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors ${
                    currentSort === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className="mr-3" 
                  />
                  {option?.label}
                  {currentSort === option?.value && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortOptions;