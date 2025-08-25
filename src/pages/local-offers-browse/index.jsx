import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FilterPanel from '../../components/ui/FilterPanel';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import OfferGrid from './components/OfferGrid';
import StoreGroupView from './components/StoreGroupView';
import PriceAlertModal from './components/PriceAlertModal';


const LocalOffersBrowse = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'store'
  const [showMap, setShowMap] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  // Mock data
  const mockOffers = [
    {
      id: 1,
      productName: "Bio Äpfel Elstar",
      image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
      originalPrice: 3.49,
      discountedPrice: 2.49,
      discountPercentage: 29,
      storeName: "REWE",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-01-28",
      category: "Obst & Gemüse",
      unit: "1 kg",
      isFavorite: false,
      hasAlert: false,
      distance: 0.8
    },
    {
      id: 2,
      productName: "Hackfleisch gemischt",
      image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg",
      originalPrice: 6.99,
      discountedPrice: 4.99,
      discountPercentage: 29,
      storeName: "Edeka",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-01-26",
      category: "Fleisch & Wurst",
      unit: "500g",
      isFavorite: true,
      hasAlert: false,
      distance: 1.2
    },
    {
      id: 3,
      productName: "Vollmilch 3,5%",
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
      originalPrice: 1.29,
      discountedPrice: 0.99,
      discountPercentage: 23,
      storeName: "Aldi",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-01-30",
      category: "Milchprodukte",
      unit: "1L",
      isFavorite: false,
      hasAlert: true,
      distance: 0.5
    },
    {
      id: 4,
      productName: "Pasta Penne",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
      originalPrice: 1.99,
      discountedPrice: 1.29,
      discountPercentage: 35,
      storeName: "Lidl",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-02-15",
      category: "Grundnahrungsmittel",
      unit: "500g",
      isFavorite: false,
      hasAlert: false,
      distance: 1.8
    },
    {
      id: 5,
      productName: "Bananen",
      image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
      originalPrice: 2.49,
      discountedPrice: 1.99,
      discountPercentage: 20,
      storeName: "REWE",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-01-27",
      category: "Obst & Gemüse",
      unit: "1 kg",
      isFavorite: false,
      hasAlert: false,
      distance: 0.8
    },
    {
      id: 6,
      productName: "Joghurt Natur",
      image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg",
      originalPrice: 2.99,
      discountedPrice: 2.29,
      discountPercentage: 23,
      storeName: "Edeka",
      storeLogo: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      expirationDate: "2025-02-01",
      category: "Milchprodukte",
      unit: "500g",
      isFavorite: true,
      hasAlert: false,
      distance: 1.2
    }
  ];

  const categories = [
    { id: 'produce', name: 'Obst & Gemüse', icon: 'Apple' },
    { id: 'meat', name: 'Fleisch & Wurst', icon: 'Beef' },
    { id: 'dairy', name: 'Milchprodukte', icon: 'Milk' },
    { id: 'pantry', name: 'Grundnahrungsmittel', icon: 'Package' },
    { id: 'frozen', name: 'Tiefkühl', icon: 'Snowflake' },
    { id: 'beverages', name: 'Getränke', icon: 'Coffee' }
  ];

  const [offers, setOffers] = useState(mockOffers);
  const [filteredOffers, setFilteredOffers] = useState(mockOffers);

  // Filter and search logic
  const applyFilters = useCallback(() => {
    let filtered = [...offers];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(offer =>
        offer?.productName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        offer?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        offer?.storeName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Category filter
    if (activeCategory) {
      const categoryMap = {
        'produce': 'Obst & Gemüse',
        'meat': 'Fleisch & Wurst',
        'dairy': 'Milchprodukte',
        'pantry': 'Grundnahrungsmittel'
      };
      filtered = filtered?.filter(offer => offer?.category === categoryMap?.[activeCategory]);
    }

    // Additional filters
    if (filters?.priceRange) {
      const [min, max] = filters?.priceRange?.split('-')?.map(Number);
      filtered = filtered?.filter(offer => {
        if (max) {
          return offer?.discountedPrice >= min && offer?.discountedPrice <= max;
        } else {
          return offer?.discountedPrice >= min;
        }
      });
    }

    if (filters?.distance) {
      const maxDistance = parseFloat(filters?.distance);
      filtered = filtered?.filter(offer => offer?.distance <= maxDistance);
    }

    setFilteredOffers(filtered);
  }, [offers, searchQuery, activeCategory, filters]);

  // Group offers by store
  const groupOffersByStore = useCallback(() => {
    const grouped = filteredOffers?.reduce((acc, offer) => {
      const storeId = offer?.storeName;
      if (!acc?.[storeId]) {
        acc[storeId] = {
          id: storeId,
          name: offer?.storeName,
          logo: offer?.storeLogo,
          distance: offer?.distance,
          offers: []
        };
      }
      acc?.[storeId]?.offers?.push(offer);
      return acc;
    }, {});

    return Object.values(grouped)?.sort((a, b) => a?.distance - b?.distance);
  }, [filteredOffers]);

  // Calculate result counts for filter chips
  const getResultCounts = useCallback(() => {
    const counts = {};
    categories?.forEach(category => {
      const categoryMap = {
        'produce': 'Obst & Gemüse',
        'meat': 'Fleisch & Wurst',
        'dairy': 'Milchprodukte',
        'pantry': 'Grundnahrungsmittel'
      };
      counts[category.id] = offers?.filter(offer => 
        offer?.category === categoryMap?.[category?.id]
      )?.length;
    });
    return counts;
  }, [offers]);

  // Effects
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Event handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleAddToRecipes = (offer) => {
    console.log('Adding to recipes:', offer);
    // Navigate to recipe suggestions or show modal
  };

  const handleToggleFavorite = (offerId) => {
    setOffers(prev => prev?.map(offer =>
      offer?.id === offerId
        ? { ...offer, isFavorite: !offer?.isFavorite }
        : offer
    ));
  };

  const handleSetPriceAlert = (offerId) => {
    const offer = offers?.find(o => o?.id === offerId);
    setSelectedOffer(offer);
    setShowPriceAlert(true);
  };

  const handleCreatePriceAlert = (alertData) => {
    setOffers(prev => prev?.map(offer =>
      offer?.id === alertData?.offerId
        ? { ...offer, hasAlert: true }
        : offer
    ));
    console.log('Price alert created:', alertData);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({});
    setActiveCategory(null);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeCategory) count++;
    if (filters?.priceRange) count++;
    if (filters?.distance) count++;
    if (filters?.categories?.length) count += filters?.categories?.length;
    if (filters?.dietary?.length) count += filters?.dietary?.length;
    return count;
  };

  const storeGroups = groupOffersByStore();
  const resultCounts = getResultCounts();
  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      <Helmet>
        <title>Lokale Angebote - SparKoch</title>
        <meta name="description" content="Entdecken Sie aktuelle Supermarkt-Angebote in Ihrer Nähe und sparen Sie beim Einkaufen mit SparKoch." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 pb-20">
          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterToggle={() => setShowFilter(true)}
            onViewModeToggle={setViewMode}
            onMapToggle={() => setShowMap(!showMap)}
            viewMode={viewMode}
            showMap={showMap}
            filterCount={activeFilterCount}
          />

          {/* Filter Chips */}
          <FilterChips
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            resultCounts={resultCounts}
          />

          {/* Pull to Refresh */}
          <div className="relative">
            {refreshing && (
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-center py-4">
                <div className="flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 shadow-elevated">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-foreground">Aktualisiere...</span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="relative">
              {viewMode === 'grid' ? (
                <OfferGrid
                  offers={filteredOffers}
                  loading={loading}
                  onAddToRecipes={handleAddToRecipes}
                  onToggleFavorite={handleToggleFavorite}
                  onSetPriceAlert={handleSetPriceAlert}
                />
              ) : (
                <div className="p-4">
                  <StoreGroupView
                    storeGroups={storeGroups}
                    onAddToRecipes={handleAddToRecipes}
                    onToggleFavorite={handleToggleFavorite}
                    onSetPriceAlert={handleSetPriceAlert}
                    onStoreSelect={(store) => console.log('Store selected:', store)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Summary */}
          {!loading && (
            <div className="px-4 py-2 border-t border-border bg-muted/30">
              <p className="text-sm text-muted-foreground text-center">
                {filteredOffers?.length} von {offers?.length} Angeboten
                {searchQuery && ` für "${searchQuery}"`}
              </p>
            </div>
          )}
        </main>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          filters={filters}
          activeFilterCount={activeFilterCount}
        />

        {/* Price Alert Modal */}
        <PriceAlertModal
          isOpen={showPriceAlert}
          onClose={() => setShowPriceAlert(false)}
          offer={selectedOffer}
          onSetAlert={handleCreatePriceAlert}
        />

        <BottomNavigation />
      </div>
    </>
  );
};

export default LocalOffersBrowse;