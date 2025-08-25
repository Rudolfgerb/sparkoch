import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OfferCard = ({ offer, onAddToRecipes, onToggleFavorite, onSetPriceAlert }) => {
  const {
    id,
    productName,
    image,
    originalPrice,
    discountedPrice,
    discountPercentage,
    storeName,
    storeLogo,
    expirationDate,
    category,
    unit,
    isFavorite,
    hasAlert,
    distance
  } = offer;

  const savings = originalPrice - discountedPrice;
  const isExpiringSoon = new Date(expirationDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={image}
          alt={productName}
          className="w-full h-full object-cover"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
          -{discountPercentage}%
        </div>

        {/* Favorite & Alert Icons */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={() => onToggleFavorite(id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite 
                ? 'bg-error text-error-foreground' 
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            <Icon name="Heart" size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={() => onSetPriceAlert(id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              hasAlert 
                ? 'bg-warning text-warning-foreground' 
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            <Icon name="Bell" size={16} fill={hasAlert ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Expiring Soon Badge */}
        {isExpiringSoon && (
          <div className="absolute bottom-2 left-2 bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
            Läuft bald ab
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
          {productName}
        </h3>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(discountedPrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
          <div className="text-xs text-success font-medium">
            -{formatPrice(savings)}
          </div>
        </div>

        {/* Unit & Category */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{unit}</span>
          <span className="bg-muted px-2 py-1 rounded-full">{category}</span>
        </div>

        {/* Store Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
              <Image
                src={storeLogo}
                alt={storeName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-foreground">{storeName}</span>
          </div>
          <span className="text-xs text-muted-foreground">{distance} km</span>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center space-x-1 mb-3">
          <Icon name="Calendar" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Gültig bis {formatDate(expirationDate)}
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToRecipes(offer)}
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          className="w-full"
        >
          Zu Rezepten hinzufügen
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;