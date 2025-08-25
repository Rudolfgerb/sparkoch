import React from 'react';
import RecipeCard from './RecipeCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeGrid = ({ 
  recipes = [], 
  loading = false, 
  onAddToList, 
  onViewDetails, 
  onToggleFavorite,
  onLoadMore,
  hasMore = false,
  searchQuery = '',
  isCompact = false 
}) => {
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className={`bg-muted ${isCompact ? 'h-32' : 'h-48'}`} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
        <div className="flex space-x-2">
          <div className="h-3 bg-muted rounded w-12" />
          <div className="h-3 bg-muted rounded w-8" />
          <div className="h-3 bg-muted rounded w-10" />
        </div>
        <div className="h-8 bg-muted rounded" />
      </div>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ChefHat" size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {searchQuery ? 'Keine Rezepte gefunden' : 'Entdecke leckere Rezepte'}
      </h3>
      
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
        {searchQuery 
          ? `Keine Rezepte für "${searchQuery}" gefunden. Versuche andere Suchbegriffe oder Filter.`
          : 'Verwende die Suche oder Filter, um passende Rezepte für deine Bedürfnisse zu finden.'
        }
      </p>

      {searchQuery && (
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/recipe-search-filter'}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Filter zurücksetzen
          </Button>
        </div>
      )}

      {/* Trending Suggestions */}
      {!searchQuery && (
        <div className="mt-8 w-full max-w-md">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Beliebte Suchbegriffe:
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Pasta', 'Vegetarisch', 'Schnell', 'Günstig', 'Gesund']?.map((term) => (
              <button
                key={term}
                onClick={() => window.location.href = `/recipe-search-filter?q=${term}`}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading && recipes?.length === 0) {
    return (
      <div className={`grid gap-4 p-4 ${
        isCompact 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {Array.from({ length: 8 }, (_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (recipes?.length === 0 && !loading) {
    return <EmptyState />;
  }

  return (
    <div className="p-4">
      {/* Recipe Grid */}
      <div className={`grid gap-4 ${
        isCompact 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe?.id}
            recipe={recipe}
            onAddToList={onAddToList}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            isCompact={isCompact}
          />
        ))}
        
        {/* Loading more items */}
        {loading && recipes?.length > 0 && (
          Array.from({ length: 4 }, (_, index) => (
            <LoadingSkeleton key={`loading-${index}`} />
          ))
        )}
      </div>
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            Mehr Rezepte laden
          </Button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && recipes?.length > 0 && (
        <div className="text-center mt-8 py-4">
          <p className="text-sm text-muted-foreground">
            Alle Rezepte angezeigt ({recipes?.length} Ergebnisse)
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;