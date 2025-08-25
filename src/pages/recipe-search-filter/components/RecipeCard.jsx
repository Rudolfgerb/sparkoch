import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecipeCard = ({ 
  recipe, 
  onAddToList, 
  onViewDetails, 
  onToggleFavorite,
  isCompact = false 
}) => {
  const {
    id,
    title,
    image,
    costPerServing,
    offerCoverage,
    rating,
    reviewCount,
    cookingTime,
    difficulty,
    servings,
    dietary = [],
    isFavorite = false,
    isNew = false,
    savings = 0
  } = recipe;

  const difficultyLabels = {
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer'
  };

  const dietaryIcons = {
    vegetarian: 'Leaf',
    vegan: 'Sprout',
    glutenfree: 'Wheat',
    lactosefree: 'Milk'
  };

  const handleAddToList = (e) => {
    e?.stopPropagation();
    onAddToList(recipe);
  };

  const handleToggleFavorite = (e) => {
    e?.stopPropagation();
    onToggleFavorite(recipe?.id);
  };

  const handleCardClick = () => {
    onViewDetails(recipe);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-200 cursor-pointer group ${
        isCompact ? 'h-auto' : 'h-full'
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className={`${isCompact ? 'h-32' : 'h-48'} overflow-hidden`}>
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isNew && (
            <div className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
              Neu
            </div>
          )}
          {savings > 0 && (
            <div className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
              -{savings}%
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
        >
          <Icon 
            name={isFavorite ? "Heart" : "Heart"} 
            size={16} 
            className={isFavorite ? 'fill-current text-red-500' : ''} 
          />
        </button>

        {/* Offer Coverage */}
        {offerCoverage > 0 && (
          <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {offerCoverage}% Angebote
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className={`font-semibold text-foreground mb-2 line-clamp-2 ${
          isCompact ? 'text-sm' : 'text-base'
        }`}>
          {title}
        </h3>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-primary">
              {costPerServing?.toFixed(2)}€
            </span>
            <span className="text-xs text-muted-foreground">
              /Portion
            </span>
          </div>
          
          {rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-foreground">
                {rating?.toFixed(1)}
              </span>
              {reviewCount && (
                <span className="text-xs text-muted-foreground">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Recipe Details */}
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{cookingTime} Min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{servings}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ChefHat" size={12} />
              <span>{difficultyLabels?.[difficulty]}</span>
            </div>
          </div>
        </div>

        {/* Dietary Icons */}
        {dietary?.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            {dietary?.slice(0, 4)?.map((diet) => (
              <div
                key={diet}
                className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center"
                title={diet}
              >
                <Icon name={dietaryIcons?.[diet] || 'Circle'} size={12} />
              </div>
            ))}
            {dietary?.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{dietary?.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToList}
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          className="w-full text-sm"
        >
          Zur Liste hinzufügen
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;