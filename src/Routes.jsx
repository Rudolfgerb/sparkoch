import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingListPage from './pages/shopping-list';
import RecipeSearchFilter from './pages/recipe-search-filter';
import UserRegistrationOnboarding from './pages/user-registration-onboarding';
import LocalOffersBrowse from './pages/local-offers-browse';
import StoreMapLocator from './pages/store-map-locator';
import DashboardHome from './pages/dashboard-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/shopping-list" element={<ShoppingListPage />} />
        <Route path="/recipe-search-filter" element={<RecipeSearchFilter />} />
        <Route path="/user-registration-onboarding" element={<UserRegistrationOnboarding />} />
        <Route path="/local-offers-browse" element={<LocalOffersBrowse />} />
        <Route path="/store-map-locator" element={<StoreMapLocator />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
