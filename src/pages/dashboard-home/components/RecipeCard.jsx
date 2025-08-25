import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecipeCard = ({ recipe, onFavorite, onViewDetails, compact = false }) => {
  const [isFavorited, setIsFavorited] = useState(recipe?.isFavorited || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    
    if (onFavorite) {
      onFavorite(recipe?.id, newFavoriteState);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(recipe);
    } else {
      window.location.href = `/recipe-search-filter?id=${recipe?.id}`;
    }
  };

  if (compact) {
    return (
      <div 
        className="bg-card rounded-lg p-3 cursor-pointer hover:shadow-soft transition-all duration-200 border border-border"
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={recipe?.image}
              alt={recipe?.name}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm truncate">{recipe?.name}</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <span>{recipe?.prepTime} Min</span>
              <span>•</span>
              <span className="text-primary font-medium">{recipe?.costPerServing}€</span>
            </div>
          </div>
          
          <button
            onClick={handleFavoriteClick}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isFavorited ? 'text-error fill-current' : 'text-muted-foreground'} 
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-elevated transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <Image
          src={recipe?.image}
          alt={recipe?.name}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            recipe?.difficulty === 'Einfach' ?'bg-success/90 text-success-foreground'
              : recipe?.difficulty === 'Mittel' ?'bg-warning/90 text-warning-foreground' :'bg-error/90 text-error-foreground'
          }`}>
            {recipe?.difficulty}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorited ? 'text-error fill-current' : 'text-white'} 
          />
        </button>

        {/* Offer Coverage Badge */}
        {recipe?.offerCoverage > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="bg-secondary/90 text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {recipe?.offerCoverage}% Angebote
            </div>
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{recipe?.name}</h3>
          
          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Icon name="Clock" size={14} className="mr-1" />
                {recipe?.prepTime} Min
              </span>
              <span className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {recipe?.servings} Port.
              </span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{recipe?.costPerServing}€</div>
              <div className="text-xs opacity-80">pro Portion</div>
            </div>
          </div>
        </div>
      </div>
      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex items-center space-x-2">
            {recipe?.tags?.slice(0, 2)?.map((tag, index) => (
              <span 
                key={index}
                className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          {recipe?.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{recipe?.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;