import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShoppingListHeader = ({ 
  totalCost, 
  savings, 
  viewMode, 
  onViewModeChange, 
  onBulkCheck, 
  onClearCompleted, 
  onExport 
}) => {
  const savingsPercentage = totalCost > 0 ? Math.round((savings / totalCost) * 100) : 0;

  return (
    <div className="bg-card border-b border-border">
      {/* Cost Summary */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {totalCost?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <div className="text-sm text-muted-foreground">Geschätzte Gesamtkosten</div>
          </div>
          {savings > 0 && (
            <div className="text-right">
              <div className="text-lg font-semibold text-success">
                -{savings?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
              <div className="text-sm text-success">
                {savingsPercentage}% gespart
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Toolbar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* View Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('store')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'store' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Store" size={16} className="mr-1.5" />
              Nach Geschäft
            </button>
            <button
              onClick={() => onViewModeChange('category')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'category' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} className="mr-1.5" />
              Nach Kategorie
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkCheck}
              iconName="CheckSquare"
              iconSize={16}
            >
              Alle
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCompleted}
              iconName="Trash2"
              iconSize={16}
            >
              Löschen
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              iconName="Share"
              iconSize={16}
            >
              Teilen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListHeader;