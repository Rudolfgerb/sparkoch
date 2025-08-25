import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import OfferCard from './OfferCard';

const StoreGroupView = ({ 
  storeGroups, 
  onAddToRecipes, 
  onToggleFavorite, 
  onSetPriceAlert,
  onStoreSelect 
}) => {
  return (
    <div className="space-y-6">
      {storeGroups?.map((store) => (
        <div key={store?.id} className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Store Header */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-background">
                  <Image
                    src={store?.logo}
                    alt={store?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{store?.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{store?.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Tag" size={14} />
                      <span>{store?.offers?.length} Angebote</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onStoreSelect(store)}
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
              >
                <span className="text-sm font-medium">Alle anzeigen</span>
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>

          {/* Store Offers Grid */}
          <div className="p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {store?.offers?.slice(0, 4)?.map((offer) => (
                <OfferCard
                  key={offer?.id}
                  offer={offer}
                  onAddToRecipes={onAddToRecipes}
                  onToggleFavorite={onToggleFavorite}
                  onSetPriceAlert={onSetPriceAlert}
                />
              ))}
            </div>
            
            {store?.offers?.length > 4 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => onStoreSelect(store)}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  +{store?.offers?.length - 4} weitere Angebote anzeigen
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreGroupView;