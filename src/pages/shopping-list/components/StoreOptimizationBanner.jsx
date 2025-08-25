import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoreOptimizationBanner = ({ 
  singleStoreOption, 
  multiStoreOption, 
  onOptimize, 
  onViewRoute 
}) => {
  const savings = multiStoreOption?.cost - singleStoreOption?.cost;
  const savingsPercentage = Math.round((savings / multiStoreOption?.cost) * 100);

  return (
    <div className="mx-4 my-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Route" size={20} className="text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-2">
            Einkaufsroute optimieren
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Single Store Option */}
            <div className="bg-white/60 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Store" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Ein Geschäft</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {singleStoreOption?.cost?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
              <div className="text-xs text-muted-foreground">
                {singleStoreOption?.store}
              </div>
            </div>

            {/* Multi Store Option */}
            <div className="bg-white/60 rounded-lg p-3 border border-green-100">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Mehrere Geschäfte</span>
              </div>
              <div className="text-lg font-bold text-success">
                {multiStoreOption?.cost?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
              <div className="text-xs text-success">
                -{savings?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} ({savingsPercentage}%)
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOptimize}
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Optimieren
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onViewRoute}
              iconName="Navigation"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Route anzeigen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOptimizationBanner;