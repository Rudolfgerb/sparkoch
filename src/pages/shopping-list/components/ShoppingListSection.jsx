import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ShoppingListItem from './ShoppingListItem';

const ShoppingListSection = ({ 
  title, 
  items, 
  subtitle, 
  totalCost, 
  onToggleComplete, 
  onQuantityChange, 
  onRemove,
  isCompleted = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(!isCompleted);

  const completedCount = items?.filter(item => item?.completed)?.length;
  const totalItems = items?.length;

  return (
    <div className="mb-4">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-2 hover:bg-muted transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon 
            name={isExpanded ? "ChevronDown" : "ChevronRight"} 
            size={20} 
            className="text-muted-foreground" 
          />
          
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="font-semibold text-foreground">
            {totalCost?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount}/{totalItems} Artikel
          </div>
        </div>
      </button>
      {/* Section Items */}
      {isExpanded && (
        <div className="space-y-2">
          {items?.map((item) => (
            <ShoppingListItem
              key={item?.id}
              item={item}
              onToggleComplete={onToggleComplete}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingListSection;