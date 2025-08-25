import React from 'react';
import Icon from '../../../components/AppIcon';

const SavingsSummary = ({ savingsData }) => {
  const progressPercentage = Math.min((savingsData?.currentSpent / savingsData?.weeklyBudget) * 100, 100);
  const remainingBudget = Math.max(savingsData?.weeklyBudget - savingsData?.currentSpent, 0);
  const isOverBudget = savingsData?.currentSpent > savingsData?.weeklyBudget;

  return (
    <div className="bg-card rounded-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Wöchentliche Ersparnis</h3>
        <div className="flex items-center space-x-1 text-success">
          <Icon name="TrendingDown" size={16} />
          <span className="text-sm font-medium">-{savingsData?.totalSavings}€</span>
        </div>
      </div>
      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Budget verbraucht</span>
          <span className="text-sm font-medium text-foreground">
            {savingsData?.currentSpent}€ / {savingsData?.weeklyBudget}€
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              isOverBudget 
                ? 'bg-error' 
                : progressPercentage > 80 
                ? 'bg-warning' :'bg-primary'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className={`text-sm font-medium ${
            isOverBudget ? 'text-error' : 'text-success'
          }`}>
            {isOverBudget ? 'Budget überschritten' : `${remainingBudget?.toFixed(2)}€ übrig`}
          </span>
          <span className="text-xs text-muted-foreground">
            {progressPercentage?.toFixed(0)}%
          </span>
        </div>
      </div>
      {/* Savings Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Percent" size={14} className="text-success" />
            <span className="text-xs text-muted-foreground">Durchschn. Ersparnis</span>
          </div>
          <div className="text-lg font-bold text-success">{savingsData?.avgSavingsPercent}%</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="ShoppingCart" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Mahlzeiten diese Woche</span>
          </div>
          <div className="text-lg font-bold text-foreground">{savingsData?.mealsThisWeek}</div>
        </div>
      </div>
      {/* Weekly Comparison */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">vs. letzte Woche</span>
          </div>
          <div className={`flex items-center space-x-1 ${
            savingsData?.weeklyComparison > 0 ? 'text-success' : 'text-error'
          }`}>
            <Icon 
              name={savingsData?.weeklyComparison > 0 ? "TrendingDown" : "TrendingUp"} 
              size={14} 
            />
            <span className="text-sm font-medium">
              {Math.abs(savingsData?.weeklyComparison)}€
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsSummary;