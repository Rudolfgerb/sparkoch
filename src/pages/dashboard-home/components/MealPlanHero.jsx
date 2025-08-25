import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MealPlanHero = ({ mealPlan, onGenerateNew, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = (recipeId) => {
    // Mock favorite functionality
    console.log('Added to favorites:', recipeId);
  };

  const handleRecipeClick = (recipe) => {
    window.location.href = `/recipe-search-filter?id=${recipe?.id}`;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mealPlan?.recipes?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mealPlan?.recipes?.length) % mealPlan?.recipes?.length);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-48 bg-muted rounded-lg mb-4"></div>
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Heutiger Speiseplan</h2>
          <p className="text-sm text-muted-foreground">
            {new Date()?.toLocaleDateString('de-DE', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerateNew}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          disabled={isLoading}
        >
          Neu generieren
        </Button>
      </div>
      {/* Recipe Carousel */}
      <div className="relative mb-4">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {mealPlan?.recipes?.map((recipe) => (
              <div key={recipe?.id} className="w-full flex-shrink-0">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={recipe?.image}
                      alt={recipe?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Recipe Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                    <h3 className="text-white font-semibold text-lg mb-1">{recipe?.name}</h3>
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {recipe?.prepTime} Min
                        </span>
                        <span className="flex items-center">
                          <Icon name="Users" size={14} className="mr-1" />
                          {recipe?.servings} Portionen
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{recipe?.costPerServing}€</div>
                        <div className="text-xs">{recipe?.offerCoverage}% Angebote</div>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recipe?.difficulty === 'Einfach' ?'bg-success text-success-foreground'
                        : recipe?.difficulty === 'Mittel' ?'bg-warning text-warning-foreground' :'bg-error text-error-foreground'
                    }`}>
                      {recipe?.difficulty}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleSwipeLeft(recipe?.id);
                    }}
                  >
                    <Icon name="Heart" size={16} color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {mealPlan?.recipes?.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {mealPlan?.recipes?.length > 1 && (
          <div className="flex justify-center space-x-2 mt-3">
            {mealPlan?.recipes?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Recipe Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-primary">{mealPlan?.totalCost}€</div>
          <div className="text-xs text-muted-foreground">Gesamtkosten</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-secondary">{mealPlan?.avgOfferCoverage}%</div>
          <div className="text-xs text-muted-foreground">Ø Angebote</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{mealPlan?.totalPrepTime}</div>
          <div className="text-xs text-muted-foreground">Min gesamt</div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanHero;