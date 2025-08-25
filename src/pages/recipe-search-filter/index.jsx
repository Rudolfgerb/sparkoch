import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import SortOptions from './components/SortOptions';
import RecipeGrid from './components/RecipeGrid';
import AdvancedFilterPanel from './components/AdvancedFilterPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const RecipeSearchFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentSort, setCurrentSort] = useState('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Data state
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  // Search suggestions and history
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Pasta Carbonara',
    'Vegetarische Lasagne',
    'Schnelle Pfannengerichte',
    'Gesunde Salate'
  ]);

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      costPerServing: 3.45,
      offerCoverage: 75,
      rating: 4.8,
      reviewCount: 234,
      cookingTime: 25,
      difficulty: 'easy',
      servings: 4,
      dietary: ['vegetarian'],
      isFavorite: false,
      isNew: false,
      savings: 15
    },
    {
      id: 2,
      title: 'Vegane Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      costPerServing: 4.20,
      offerCoverage: 60,
      rating: 4.6,
      reviewCount: 189,
      cookingTime: 35,
      difficulty: 'medium',
      servings: 2,
      dietary: ['vegan', 'glutenfree'],
      isFavorite: true,
      isNew: true,
      savings: 0
    },
    {
      id: 3,
      title: 'Hähnchen-Curry mit Reis',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      costPerServing: 5.80,
      offerCoverage: 85,
      rating: 4.7,
      reviewCount: 156,
      cookingTime: 45,
      difficulty: 'medium',
      servings: 4,
      dietary: ['lactosefree'],
      isFavorite: false,
      isNew: false,
      savings: 25
    },
    {
      id: 4,
      title: 'Mediterrane Gemüsepfanne',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      costPerServing: 2.95,
      offerCoverage: 90,
      rating: 4.5,
      reviewCount: 98,
      cookingTime: 20,
      difficulty: 'easy',
      servings: 3,
      dietary: ['vegetarian', 'vegan'],
      isFavorite: false,
      isNew: false,
      savings: 30
    },
    {
      id: 5,
      title: 'Lachs mit Quinoa-Salat',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      costPerServing: 8.50,
      offerCoverage: 45,
      rating: 4.9,
      reviewCount: 67,
      cookingTime: 30,
      difficulty: 'medium',
      servings: 2,
      dietary: ['glutenfree', 'lowcarb'],
      isFavorite: true,
      isNew: true,
      savings: 0
    },
    {
      id: 6,
      title: 'Klassische Bolognese',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
      costPerServing: 4.75,
      offerCoverage: 70,
      rating: 4.4,
      reviewCount: 203,
      cookingTime: 90,
      difficulty: 'hard',
      servings: 6,
      dietary: [],
      isFavorite: false,
      isNew: false,
      savings: 20
    }
  ];

  // Initialize from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q') || '';
    const filters = urlParams?.get('filters');
    
    setSearchQuery(query);
    if (filters) {
      try {
        setActiveFilters(JSON.parse(decodeURIComponent(filters)));
      } catch (e) {
        console.error('Invalid filters in URL:', e);
      }
    }
    
    // Load initial recipes
    loadRecipes(true);
  }, [location?.search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        generateSuggestions(searchQuery);
        loadRecipes(true);
      } else {
        setSuggestions([]);
        loadRecipes(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters, currentSort]);

  const generateSuggestions = (query) => {
    const allSuggestions = [
      'Pasta Gerichte',
      'Vegetarische Rezepte',
      'Schnelle Küche',
      'Gesunde Salate',
      'Italienische Küche',
      'Asiatische Gerichte',
      'Low Carb Rezepte',
      'Glutenfreie Optionen',
      'Vegane Küche',
      'Mediterrane Rezepte'
    ];
    
    const filtered = allSuggestions?.filter(suggestion =>
      suggestion?.toLowerCase()?.includes(query?.toLowerCase())
    )?.slice(0, 5);
    
    setSuggestions(filtered);
  };

  const loadRecipes = useCallback(async (reset = false) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredRecipes = [...mockRecipes];
    
    // Apply search filter
    if (searchQuery) {
      filteredRecipes = filteredRecipes?.filter(recipe =>
        recipe?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        recipe?.dietary?.some(diet => diet?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }
    
    // Apply active filters
    if (activeFilters?.dietary?.length > 0) {
      filteredRecipes = filteredRecipes?.filter(recipe =>
        activeFilters?.dietary?.some(diet => recipe?.dietary?.includes(diet))
      );
    }
    
    if (activeFilters?.difficulty) {
      filteredRecipes = filteredRecipes?.filter(recipe =>
        recipe?.difficulty === activeFilters?.difficulty
      );
    }
    
    if (activeFilters?.cookingTime) {
      const [min, max] = activeFilters?.cookingTime?.split('-')?.map(Number);
      filteredRecipes = filteredRecipes?.filter(recipe => {
        if (max) {
          return recipe?.cookingTime >= min && recipe?.cookingTime <= max;
        } else {
          return recipe?.cookingTime >= min;
        }
      });
    }
    
    if (activeFilters?.maxPrice) {
      filteredRecipes = filteredRecipes?.filter(recipe =>
        recipe?.costPerServing <= parseFloat(activeFilters?.maxPrice)
      );
    }
    
    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        filteredRecipes?.sort((a, b) => a?.costPerServing - b?.costPerServing);
        break;
      case 'price-high':
        filteredRecipes?.sort((a, b) => b?.costPerServing - a?.costPerServing);
        break;
      case 'time-short':
        filteredRecipes?.sort((a, b) => a?.cookingTime - b?.cookingTime);
        break;
      case 'time-long':
        filteredRecipes?.sort((a, b) => b?.cookingTime - a?.cookingTime);
        break;
      case 'rating':
        filteredRecipes?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filteredRecipes?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'popular':
        filteredRecipes?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    if (reset) {
      setRecipes(filteredRecipes);
      setPage(1);
      setHasMore(filteredRecipes?.length > 6);
    } else {
      setRecipes(prev => [...prev, ...filteredRecipes?.slice(page * 6, (page + 1) * 6)]);
      setHasMore(filteredRecipes?.length > (page + 1) * 6);
    }
    
    setLoading(false);
  }, [searchQuery, activeFilters, currentSort, page]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateURL(query, activeFilters);
  };

  const handleVoiceSearch = () => {
    // Simulate voice input
    const voiceQueries = ['Pasta', 'Vegetarisch', 'Schnell', 'Gesund'];
    const randomQuery = voiceQueries?.[Math.floor(Math.random() * voiceQueries?.length)];
    setTimeout(() => {
      setSearchQuery(randomQuery);
      updateURL(randomQuery, activeFilters);
    }, 2000);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL('', activeFilters);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    updateURL(suggestion, activeFilters);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev?.filter(item => item !== suggestion);
      return [suggestion, ...filtered]?.slice(0, 5);
    });
  };

  const handleRecentSearchSelect = (search) => {
    setSearchQuery(search);
    updateURL(search, activeFilters);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    updateURL(searchQuery, filters);
  };

  const handleRemoveFilter = (category, value) => {
    const newFilters = { ...activeFilters };
    
    if (Array.isArray(newFilters?.[category])) {
      newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
      if (newFilters?.[category]?.length === 0) {
        delete newFilters?.[category];
      }
    } else {
      delete newFilters?.[category];
    }
    
    setActiveFilters(newFilters);
    updateURL(searchQuery, newFilters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
    updateURL(searchQuery, {});
  };

  const handleSortChange = (sort) => {
    setCurrentSort(sort);
  };

  const handleAddToList = (recipe) => {
    // Simulate adding to shopping list
    console.log('Adding to list:', recipe?.title);
    // In real app, would navigate to shopping list or show confirmation
  };

  const handleViewDetails = (recipe) => {
    // Navigate to recipe details (not implemented in this scope)
    console.log('View details:', recipe?.title);
  };

  const handleToggleFavorite = (recipeId) => {
    setRecipes(prev => prev?.map(recipe => 
      recipe?.id === recipeId 
        ? { ...recipe, isFavorite: !recipe?.isFavorite }
        : recipe
    ));
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    loadRecipes(false);
  };

  const updateURL = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params?.set('q', query);
    if (Object.keys(filters)?.length > 0) {
      params?.set('filters', encodeURIComponent(JSON.stringify(filters)));
    }
    
    const newURL = `/recipe-search-filter${params?.toString() ? '?' + params?.toString() : ''}`;
    navigate(newURL, { replace: true });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value?.length;
      }
      return value ? count + 1 : count;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onVoiceSearch={handleVoiceSearch}
          onClearSearch={handleClearSearch}
          suggestions={suggestions}
          recentSearches={recentSearches}
          showSuggestions={showSuggestions}
          onSuggestionSelect={handleSuggestionSelect}
          onRecentSearchSelect={handleRecentSearchSelect}
        />

        {/* Filter Chips */}
        <FilterChips
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
          onOpenFilters={() => setShowAdvancedFilters(true)}
          categories={[]}
          activeCategory=""
          onCategoryChange={() => {}}
          resultCounts={{}}
        />

        {/* Sort Options */}
        <SortOptions
          currentSort={currentSort}
          onSortChange={handleSortChange}
          resultCount={recipes?.length}
        />

        {/* Recipe Grid */}
        <RecipeGrid
          recipes={recipes}
          loading={loading}
          onAddToList={handleAddToList}
          onViewDetails={handleViewDetails}
          onToggleFavorite={handleToggleFavorite}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          searchQuery={searchQuery}
        />

        {/* Quick Action Button */}
        <div className="fixed bottom-24 right-4 z-50">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowAdvancedFilters(true)}
            className="w-14 h-14 rounded-full shadow-elevated"
          >
            <Icon name="SlidersHorizontal" size={24} />
          </Button>
        </div>
      </main>
      {/* Advanced Filter Panel */}
      <AdvancedFilterPanel
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApply={handleFilterChange}
        onReset={handleClearAllFilters}
        filters={activeFilters}
        onFilterChange={handleFilterChange}
      />
      <BottomNavigation />
    </div>
  );
};

export default RecipeSearchFilter;