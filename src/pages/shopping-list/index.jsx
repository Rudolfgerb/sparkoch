import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ShoppingListHeader from './components/ShoppingListHeader';
import StoreOptimizationBanner from './components/StoreOptimizationBanner';
import ShoppingListSection from './components/ShoppingListSection';
import AddItemModal from './components/AddItemModal';
import EmptyShoppingList from './components/EmptyShoppingList';

const ShoppingListPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('store'); // 'store' or 'category'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);

  // Mock shopping list data
  const mockShoppingItems = [
    {
      id: 1,
      name: 'Vollmilch 3,5%',
      brand: 'Weihenstephan',
      quantity: 2,
      unit: 'l',
      price: 1.29,
      originalPrice: 1.49,
      category: 'milchprodukte',
      store: 'REWE',
      hasOffer: true,
      completed: false,
      note: null
    },
    {
      id: 2,
      name: 'Bananen',
      brand: null,
      quantity: 1,
      unit: 'kg',
      price: 1.99,
      originalPrice: 1.99,
      category: 'obst-gemuese',
      store: 'REWE',
      hasOffer: false,
      completed: false,
      note: 'Reif aber nicht überreif'
    },
    {
      id: 3,
      name: 'Hähnchenbrust',
      brand: 'Wiesenhof',
      quantity: 500,
      unit: 'g',
      price: 4.99,
      originalPrice: 5.99,
      category: 'fleisch-fisch',
      store: 'EDEKA',
      hasOffer: true,
      completed: true,
      note: null
    },
    {
      id: 4,
      name: 'Vollkornbrot',
      brand: 'Mestemacher',
      quantity: 1,
      unit: 'Stück',
      price: 2.49,
      originalPrice: 2.49,
      category: 'backwaren',
      store: 'REWE',
      hasOffer: false,
      completed: false,
      note: null
    },
    {
      id: 5,
      name: 'Joghurt Natur',
      brand: 'Danone',
      quantity: 4,
      unit: 'Stück',
      price: 0.59,
      originalPrice: 0.69,
      category: 'milchprodukte',
      store: 'ALDI',
      hasOffer: true,
      completed: false,
      note: null
    },
    {
      id: 6,
      name: 'Tomaten',
      brand: null,
      quantity: 500,
      unit: 'g',
      price: 2.99,
      originalPrice: 2.99,
      category: 'obst-gemuese',
      store: 'EDEKA',
      hasOffer: false,
      completed: true,
      note: 'Cherry-Tomaten'
    }
  ];

  useEffect(() => {
    setShoppingItems(mockShoppingItems);
  }, []);

  // Calculate totals
  const totalCost = shoppingItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const originalTotalCost = shoppingItems?.reduce((sum, item) => sum + (item?.originalPrice * item?.quantity), 0);
  const totalSavings = originalTotalCost - totalCost;

  // Store optimization data
  const singleStoreOption = {
    store: 'REWE',
    cost: totalCost + 3.50, // Slightly higher for single store
  };

  const multiStoreOption = {
    cost: totalCost,
    stores: ['REWE', 'EDEKA', 'ALDI']
  };

  // Group items by store or category
  const groupedItems = viewMode === 'store' 
    ? groupItemsByStore(shoppingItems)
    : groupItemsByCategory(shoppingItems);

  function groupItemsByStore(items) {
    const grouped = items?.reduce((acc, item) => {
      if (!acc?.[item?.store]) {
        acc[item.store] = [];
      }
      acc?.[item?.store]?.push(item);
      return acc;
    }, {});

    return Object.entries(grouped)?.map(([store, items]) => ({
      title: store,
      subtitle: `${items?.length} Artikel`,
      items,
      totalCost: items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)
    }));
  }

  function groupItemsByCategory(items) {
    const categoryNames = {
      'milchprodukte': 'Milchprodukte',
      'obst-gemuese': 'Obst & Gemüse',
      'fleisch-fisch': 'Fleisch & Fisch',
      'backwaren': 'Backwaren',
      'sonstiges': 'Sonstiges'
    };

    const grouped = items?.reduce((acc, item) => {
      const category = item?.category || 'sonstiges';
      if (!acc?.[category]) {
        acc[category] = [];
      }
      acc?.[category]?.push(item);
      return acc;
    }, {});

    return Object.entries(grouped)?.map(([category, items]) => ({
      title: categoryNames?.[category] || 'Sonstiges',
      subtitle: `${items?.length} Artikel`,
      items,
      totalCost: items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)
    }));
  }

  const handleToggleComplete = (itemId) => {
    setShoppingItems(prev => 
      prev?.map(item => 
        item?.id === itemId 
          ? { ...item, completed: !item?.completed }
          : item
      )
    );
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setShoppingItems(prev => 
      prev?.map(item => 
        item?.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setShoppingItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleBulkCheck = () => {
    const allCompleted = shoppingItems?.every(item => item?.completed);
    setShoppingItems(prev => 
      prev?.map(item => ({ ...item, completed: !allCompleted }))
    );
  };

  const handleClearCompleted = () => {
    setShoppingItems(prev => prev?.filter(item => !item?.completed));
  };

  const handleExport = () => {
    // Mock export functionality
    const listText = shoppingItems?.map(item => `${item?.quantity} ${item?.unit} ${item?.name}${item?.brand ? ` (${item?.brand})` : ''}`)?.join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'Meine Einkaufsliste - SparKoch',
        text: listText,
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard?.writeText(listText);
      // Show toast notification (would be implemented with a toast system)
      alert('Einkaufsliste in Zwischenablage kopiert!');
    }
  };

  const handleOptimizeRoute = () => {
    // Mock route optimization
    alert('Route wird optimiert... Diese Funktion wird Sie zur Karten-Ansicht weiterleiten.');
    navigate('/store-map-locator');
  };

  const handleViewRoute = () => {
    navigate('/store-map-locator');
  };

  const handleAddItem = (newItem) => {
    setShoppingItems(prev => [...prev, newItem]);
  };

  const handleAddRecipes = () => {
    navigate('/recipe-search-filter');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Mock refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Separate completed and active items
  const activeItems = shoppingItems?.filter(item => !item?.completed);
  const completedItems = shoppingItems?.filter(item => item?.completed);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        {shoppingItems?.length === 0 ? (
          <EmptyShoppingList
            onAddRecipes={handleAddRecipes}
            onAddManualItem={() => setIsAddModalOpen(true)}
          />
        ) : (
          <>
            <ShoppingListHeader
              totalCost={totalCost}
              savings={totalSavings}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onBulkCheck={handleBulkCheck}
              onClearCompleted={handleClearCompleted}
              onExport={handleExport}
            />

            {/* Store Optimization Banner */}
            {activeItems?.length > 0 && (
              <StoreOptimizationBanner
                singleStoreOption={singleStoreOption}
                multiStoreOption={multiStoreOption}
                onOptimize={handleOptimizeRoute}
                onViewRoute={handleViewRoute}
              />
            )}

            {/* Pull to refresh indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center py-4">
                <Icon name="RotateCw" size={20} className="animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Preise werden aktualisiert...
                </span>
              </div>
            )}

            {/* Shopping List Content */}
            <div className="px-4 py-4 space-y-4">
              {/* Active Items */}
              {groupedItems?.filter(group => group?.items?.some(item => !item?.completed))?.map((group, index) => (
                  <ShoppingListSection
                    key={`active-${index}`}
                    title={group?.title}
                    subtitle={group?.subtitle}
                    items={group?.items?.filter(item => !item?.completed)}
                    totalCost={group?.items?.filter(item => !item?.completed)?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)
                    }
                    onToggleComplete={handleToggleComplete}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}

              {/* Completed Items */}
              {completedItems?.length > 0 && (
                <ShoppingListSection
                  title="Erledigt"
                  subtitle={`${completedItems?.length} Artikel`}
                  items={completedItems}
                  totalCost={completedItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)}
                  onToggleComplete={handleToggleComplete}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  isCompleted={true}
                />
              )}
            </div>
          </>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated flex items-center justify-center hover:bg-primary/90 transition-colors z-50"
          aria-label="Artikel hinzufügen"
        >
          <Icon name="Plus" size={24} />
        </button>
      </main>
      <BottomNavigation />
      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
};

export default ShoppingListPage;