import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onVoiceSearch, 
  onClearSearch,
  suggestions = [],
  recentSearches = [],
  showSuggestions = false,
  onSuggestionSelect,
  onRecentSearchSelect
}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    setShowDropdown(value?.length > 0 || recentSearches?.length > 0);
  };

  const handleInputFocus = () => {
    setShowDropdown(searchQuery?.length > 0 || recentSearches?.length > 0);
  };

  const handleVoiceClick = () => {
    setIsVoiceActive(true);
    if (onVoiceSearch) {
      onVoiceSearch();
    }
    // Simulate voice input duration
    setTimeout(() => {
      setIsVoiceActive(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
    setShowDropdown(false);
    inputRef?.current?.blur();
  };

  const handleRecentSearchClick = (search) => {
    onRecentSearchSelect(search);
    setShowDropdown(false);
    inputRef?.current?.blur();
  };

  const handleClear = () => {
    onClearSearch();
    setShowDropdown(false);
    inputRef?.current?.focus();
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-3 p-4 bg-card border-b border-border">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Rezepte suchen..."
              className="w-full pl-10 pr-10 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Voice Search Button */}
        <Button
          variant={isVoiceActive ? "default" : "outline"}
          size="icon"
          onClick={handleVoiceClick}
          className={`${isVoiceActive ? 'animate-pulse' : ''}`}
        >
          <Icon name="Mic" size={20} />
        </Button>
      </div>
      {/* Search Suggestions Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-lg shadow-elevated mx-4 mt-1 max-h-80 overflow-y-auto"
        >
          {/* Suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Vorschläge
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <Icon name="Search" size={16} className="mr-3 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches?.length > 0 && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Letzte Suchen
              </div>
              {recentSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <Icon name="Clock" size={16} className="mr-3 text-muted-foreground" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {suggestions?.length === 0 && recentSearches?.length === 0 && searchQuery && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Keine Vorschläge gefunden
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;