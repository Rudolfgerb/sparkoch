import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyShoppingList = ({ onAddRecipes, onAddManualItem }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
      </div>
      
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Ihre Einkaufsliste ist leer
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-sm">
        Fügen Sie Rezepte zu Ihrem Meal Plan hinzu oder erstellen Sie manuell eine Einkaufsliste.
      </p>

      <div className="space-y-3 w-full max-w-xs">
        <Button
          variant="default"
          onClick={onAddRecipes}
          iconName="ChefHat"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Rezepte hinzufügen
        </Button>
        
        <Button
          variant="outline"
          onClick={onAddManualItem}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Artikel manuell hinzufügen
        </Button>
      </div>

      {/* Tips */}
      <div className="mt-12 space-y-4 max-w-sm">
        <div className="flex items-start space-x-3 text-left">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Lightbulb" size={14} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Tipp</h4>
            <p className="text-xs text-muted-foreground">
              Wählen Sie Rezepte basierend auf aktuellen Angeboten für maximale Ersparnisse.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 text-left">
          <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Route" size={14} className="text-secondary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Route optimieren</h4>
            <p className="text-xs text-muted-foreground">
              Lassen Sie uns die beste Einkaufsroute für Sie planen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyShoppingList;