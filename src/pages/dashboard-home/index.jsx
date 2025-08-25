import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MealPlanHero from './components/MealPlanHero';
import SavingsSummary from './components/SavingsSummary';
import QuickActions from './components/QuickActions';
import NotificationBanner from './components/NotificationBanner';
import RecipeCard from './components/RecipeCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);

  // Mock data
  const mockMealPlan = {
    id: 'plan-001',
    date: new Date()?.toISOString()?.split('T')?.[0],
    totalCost: 12.45,
    avgOfferCoverage: 78,
    totalPrepTime: 85,
    recipes: [
      {
        id: 'recipe-001',
        name: 'Mediterrane Gemüsepfanne mit Feta',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
        costPerServing: 3.20,
        offerCoverage: 85,
        prepTime: 25,
        servings: 4,
        difficulty: 'Einfach',
        rating: 4.7,
        tags: ['Vegetarisch', 'Mediterran'],
        isFavorited: false
      },
      {
        id: 'recipe-002',
        name: 'Hähnchen-Curry mit Basmatireis',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
        costPerServing: 4.15,
        offerCoverage: 72,
        prepTime: 35,
        servings: 4,
        difficulty: 'Mittel',
        rating: 4.5,
        tags: ['Asiatisch', 'Scharf'],
        isFavorited: true
      },
      {
        id: 'recipe-003',
        name: 'Spaghetti Carbonara klassisch',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop',
        costPerServing: 2.80,
        offerCoverage: 90,
        prepTime: 20,
        servings: 4,
        difficulty: 'Einfach',
        rating: 4.8,
        tags: ['Italienisch', 'Klassisch'],
        isFavorited: false
      },
      {
        id: 'recipe-004',
        name: 'Quinoa-Salat mit geröstetem Gemüse',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
        costPerServing: 3.90,
        offerCoverage: 65,
        prepTime: 30,
        servings: 3,
        difficulty: 'Einfach',
        rating: 4.3,
        tags: ['Vegan', 'Gesund'],
        isFavorited: false
      }
    ]
  };

  const mockSavingsData = {
    weeklyBudget: 80.00,
    currentSpent: 52.30,
    totalSavings: 18.50,
    avgSavingsPercent: 23,
    mealsThisWeek: 14,
    weeklyComparison: 5.20
  };

  const mockNotifications = [
    {
      id: 'notif-001',
      type: 'warning',
      title: 'Angebote laufen ab!',
      message: '3 Angebote aus deinem Speiseplan laufen heute ab. Jetzt einkaufen gehen?',
      actionText: 'Einkaufsliste öffnen',
      actionRoute: '/shopping-list',
      expiresIn: '6 Stunden',
      timeProgress: 75
    },
    {
      id: 'notif-002',
      type: 'success',
      title: 'Neue Angebote verfügbar',
      message: 'REWE hat neue Angebote für deine Lieblingsprodukte. Speiseplan aktualisieren?',
      actionText: 'Angebote ansehen',
      actionRoute: '/local-offers-browse'
    }
  ];

  const mockRecentRecipes = [
    {
      id: 'recent-001',
      name: 'Tomaten-Mozzarella-Salat',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      costPerServing: 2.50,
      prepTime: 10,
      isFavorited: true
    },
    {
      id: 'recent-002',
      name: 'Lachs mit Brokkoli',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      costPerServing: 6.20,
      prepTime: 25,
      isFavorited: false
    },
    {
      id: 'recent-003',
      name: 'Vegetarische Bolognese',
      image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
      costPerServing: 3.10,
      prepTime: 40,
      isFavorited: true
    }
  ];

  useEffect(() => {
    // Simulate initial data loading
    setIsLoading(true);
    setTimeout(() => {
      setMealPlan(mockMealPlan);
      setSavingsData(mockSavingsData);
      setNotifications(mockNotifications);
      setRecentRecipes(mockRecentRecipes);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleGenerateNewPlan = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Shuffle recipes for demo
      const shuffledRecipes = [...mockMealPlan?.recipes]?.sort(() => Math.random() - 0.5);
      setMealPlan({
        ...mockMealPlan,
        recipes: shuffledRecipes,
        totalCost: (Math.random() * 5 + 10)?.toFixed(2),
        avgOfferCoverage: Math.floor(Math.random() * 30 + 60)
      });
      setIsLoading(false);
    }, 1500);
  };

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // Update data slightly
      setSavingsData(prev => ({
        ...prev,
        currentSpent: prev?.currentSpent + Math.random() * 2 - 1
      }));
    }, 1000);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleNotificationAction = (notification) => {
    console.log('Notification action clicked:', notification);
  };

  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action);
  };

  const handleRecipeFavorite = (recipeId, isFavorited) => {
    setMealPlan(prev => ({
      ...prev,
      recipes: prev?.recipes?.map(recipe => 
        recipe?.id === recipeId 
          ? { ...recipe, isFavorited }
          : recipe
      )
    }));
    
    setRecentRecipes(prev => 
      prev?.map(recipe => 
        recipe?.id === recipeId 
          ? { ...recipe, isFavorited }
          : recipe
      )
    );
  };

  const handleRecipeDetails = (recipe) => {
    window.location.href = `/recipe-search-filter?id=${recipe?.id}`;
  };

  if (isLoading && !mealPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Loading Skeleton */}
            <div className="animate-pulse space-y-6">
              <div className="bg-card rounded-xl p-6">
                <div className="h-6 bg-muted rounded w-48 mb-4"></div>
                <div className="h-48 bg-muted rounded-lg mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6">
                <div className="h-6 bg-muted rounded w-40 mb-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-card rounded-xl"></div>
                <div className="h-24 bg-card rounded-xl"></div>
                <div className="h-24 bg-card rounded-xl"></div>
                <div className="h-24 bg-card rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="fixed top-16 left-0 right-0 z-50 bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="RefreshCw" size={16} className="animate-spin" />
              <span>Aktualisiere Daten...</span>
            </div>
          </div>
        )}

        <div className="px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Guten Tag! 👋
              </h1>
              <p className="text-muted-foreground">
                Hier ist dein personalisierter Speiseplan für heute
              </p>
            </div>

            {/* Notifications */}
            <NotificationBanner
              notifications={notifications}
              onDismiss={handleNotificationDismiss}
              onActionClick={handleNotificationAction}
            />

            {/* Meal Plan Hero */}
            <MealPlanHero
              mealPlan={mealPlan}
              onGenerateNew={handleGenerateNewPlan}
              isLoading={isLoading}
            />

            {/* Savings Summary */}
            <SavingsSummary savingsData={savingsData} />

            {/* Quick Actions */}
            <QuickActions onActionClick={handleQuickAction} />

            {/* Recent Recipes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Kürzlich angesehen</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/recipe-search-filter'}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Alle ansehen
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentRecipes?.map((recipe) => (
                  <RecipeCard
                    key={recipe?.id}
                    recipe={recipe}
                    compact={true}
                    onFavorite={handleRecipeFavorite}
                    onViewDetails={handleRecipeDetails}
                  />
                ))}
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Wochenübersicht</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">14</div>
                  <div className="text-sm text-muted-foreground">Mahlzeiten geplant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">18,50€</div>
                  <div className="text-sm text-muted-foreground">Gespart</div>
                </div>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={() => window.location.href = '/meal-history'}
                iconName="Calendar"
                iconPosition="left"
                iconSize={16}
              >
                Wochenplan ansehen
              </Button>
            </div>
          </div>
        </div>

        {/* Pull to Refresh Handler */}
        <div
          className="absolute top-16 left-0 right-0 h-20 pointer-events-none"
          onTouchStart={(e) => {
            const startY = e?.touches?.[0]?.clientY;
            const handleTouchMove = (e) => {
              const currentY = e?.touches?.[0]?.clientY;
              const diff = currentY - startY;
              if (diff > 100 && window.scrollY === 0) {
                handlePullToRefresh();
                document.removeEventListener('touchmove', handleTouchMove);
              }
            };
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', () => {
              document.removeEventListener('touchmove', handleTouchMove);
            }, { once: true });
          }}
        />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default DashboardHome;