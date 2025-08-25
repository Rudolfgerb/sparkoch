import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ categories, activeCategory, onCategoryChange, resultCounts }) => {
  const handleChipClick = (categoryId) => {
    onCategoryChange(categoryId === activeCategory ? null : categoryId);
  };

  return (
    <div className="px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
        {categories?.map((category) => {
          const isActive = activeCategory === category?.id;
          const count = resultCounts?.[category?.id] || 0;
          
          return (
            <button
              key={category?.id}
              onClick={() => handleChipClick(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-foreground/10 text-foreground'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;