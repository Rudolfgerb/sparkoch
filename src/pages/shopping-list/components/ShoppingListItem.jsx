import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShoppingListItem = ({ 
  item, 
  onToggleComplete, 
  onQuantityChange, 
  onRemove 
}) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange(item?.id, newQuantity);
  };

  const handleSwipeCheck = () => {
    setIsSwipeActive(true);
    setTimeout(() => {
      onToggleComplete(item?.id);
      setIsSwipeActive(false);
    }, 200);
  };

  const totalPrice = item?.price * quantity;
  const originalPrice = item?.originalPrice * quantity;
  const savings = originalPrice - totalPrice;

  return (
    <div 
      className={`group relative bg-card border border-border rounded-lg transition-all duration-200 ${
        item?.completed ? 'opacity-60' : ''
      } ${isSwipeActive ? 'scale-95' : ''}`}
    >
      {/* Swipe to check overlay */}
      <div 
        className="absolute inset-0 bg-success/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={handleSwipeCheck}
      >
        <Icon name="Check" size={24} className="text-success" />
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(item?.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              item?.completed
                ? 'bg-success border-success text-success-foreground'
                : 'border-border hover:border-primary'
            }`}
          >
            {item?.completed && <Icon name="Check" size={14} />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${
                  item?.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {item?.name}
                </h4>
                
                {item?.brand && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item?.brand}
                  </p>
                )}

                {item?.note && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item?.note}
                  </p>
                )}

                {/* Store and offer info */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Store" size={12} />
                    <span>{item?.store}</span>
                  </div>
                  
                  {item?.hasOffer && (
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <Icon name="Tag" size={12} />
                      <span>Angebot</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and quantity */}
              <div className="text-right ml-3">
                <div className="flex items-center space-x-2 mb-2">
                  {/* Quantity controls */}
                  <div className="flex items-center bg-muted rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {totalPrice?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </div>
                  
                  {savings > 0 && (
                    <div className="text-xs text-muted-foreground line-through">
                      {originalPrice?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    {item?.price?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / {item?.unit}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item?.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListItem;