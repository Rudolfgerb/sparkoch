import React from 'react';
import OfferCard from './OfferCard';
import Icon from '../../../components/AppIcon';


const OfferGrid = ({ 
  offers, 
  loading, 
  onAddToRecipes, 
  onToggleFavorite, 
  onSetPriceAlert,
  viewMode = 'grid' 
}) => {
  if (loading) {
    return (
      <div className="p-4">
        <div className={`grid gap-4 ${
          viewMode === 'grid' ?'grid-cols-2 lg:grid-cols-4' :'grid-cols-1'
        }`}>
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-6 bg-muted rounded w-16 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                </div>
                <div className="h-8 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (offers?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Keine Angebote gefunden
        </h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Versuchen Sie andere Filter oder erweitern Sie Ihren Suchradius, um mehr Angebote zu finden.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className={`grid gap-4 ${
        viewMode === 'grid' ?'grid-cols-2 lg:grid-cols-4' :'grid-cols-1'
      }`}>
        {offers?.map((offer) => (
          <OfferCard
            key={offer?.id}
            offer={offer}
            onAddToRecipes={onAddToRecipes}
            onToggleFavorite={onToggleFavorite}
            onSetPriceAlert={onSetPriceAlert}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferGrid;