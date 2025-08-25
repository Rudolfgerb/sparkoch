import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapFilterChips = ({ 
  filters = {}, 
  onFilterChange, 
  storeChains = [],
  totalStores = 0,
  visibleStores = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const radiusOptions = [
    { value: '1', label: '1 km' },
    { value: '2', label: '2 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '', label: 'Alle' }
  ];

  const offerCategories = [
    { value: 'food', label: 'Lebensmittel', icon: 'Apple' },
    { value: 'drinks', label: 'Getränke', icon: 'Coffee' },
    { value: 'household', label: 'Haushalt', icon: 'Home' },
    { value: 'personal', label: 'Körperpflege', icon: 'Heart' }
  ];

  const handleChainToggle = (chainId) => {
    const currentChains = filters?.chains || [];
    const newChains = currentChains?.includes(chainId)
      ? currentChains?.filter(id => id !== chainId)
      : [...currentChains, chainId];
    
    onFilterChange({ ...filters, chains: newChains });
  };

  const handleRadiusChange = (radius) => {
    onFilterChange({ ...filters, radius });
  };

  const handleCategoryToggle = (category) => {
    const currentCategories = filters?.categories || [];
    const newCategories = currentCategories?.includes(category)
      ? currentCategories?.filter(cat => cat !== category)
      : [...currentCategories, category];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.chains?.length > 0) count += filters?.chains?.length;
    if (filters?.radius) count += 1;
    if (filters?.categories?.length > 0) count += filters?.categories?.length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="absolute top-4 left-4 right-16 z-30">
      {/* Main Filter Bar */}
      <div className="bg-card rounded-lg shadow-lg p-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filter</span>
            {activeFilterCount > 0 && (
              <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {activeFilterCount}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {visibleStores} von {totalStores} Geschäften
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
            </Button>
          </div>
        </div>

        {/* Quick Filters - Always Visible */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {/* Radius Filter */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {radiusOptions?.slice(0, 3)?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleRadiusChange(option?.value)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                  filters?.radius === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {option?.label}
              </button>
            ))}
          </div>

          {/* Popular Chains */}
          {storeChains?.slice(0, 3)?.map((chain) => (
            <button
              key={chain?.id}
              onClick={() => handleChainToggle(chain?.id)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                filters?.chains?.includes(chain?.id)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {chain?.name}
            </button>
          ))}

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconSize={12}
              className="text-xs px-2 py-1 h-auto flex-shrink-0"
            >
              Löschen
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="bg-card rounded-lg shadow-lg p-4 space-y-4 max-h-80 overflow-y-auto">
          {/* All Radius Options */}
          <div>
            <h4 className="text-sm font-medium mb-2">Umkreis</h4>
            <div className="flex flex-wrap gap-2">
              {radiusOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleRadiusChange(option?.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters?.radius === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          {/* All Store Chains */}
          <div>
            <h4 className="text-sm font-medium mb-2">Geschäftsketten</h4>
            <div className="grid grid-cols-2 gap-2">
              {storeChains?.map((chain) => (
                <button
                  key={chain?.id}
                  onClick={() => handleChainToggle(chain?.id)}
                  className={`flex items-center space-x-2 p-2 rounded-lg text-left transition-colors ${
                    filters?.chains?.includes(chain?.id)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted hover:bg-accent'
                  }`}
                >
                  <div className="w-6 h-6 bg-background rounded overflow-hidden flex-shrink-0">
                    <img
                      src={chain?.logo}
                      alt={chain?.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{chain?.name}</p>
                    <p className="text-xs opacity-75">{chain?.storeCount} Filialen</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Offer Categories */}
          <div>
            <h4 className="text-sm font-medium mb-2">Angebotskategorien</h4>
            <div className="grid grid-cols-2 gap-2">
              {offerCategories?.map((category) => (
                <button
                  key={category?.value}
                  onClick={() => handleCategoryToggle(category?.value)}
                  className={`flex items-center space-x-2 p-2 rounded-lg text-left transition-colors ${
                    filters?.categories?.includes(category?.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-accent'
                  }`}
                >
                  <Icon name={category?.icon} size={16} />
                  <span className="text-xs font-medium">{category?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilterChips;