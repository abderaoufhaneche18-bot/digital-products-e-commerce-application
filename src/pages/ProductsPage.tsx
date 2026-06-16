import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import { FilterIcon, XIcon, ChevronDownIcon } from '../components/Icons';
import { Category } from '../types';

interface ProductsPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const categoryOptions: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'ebooks', label: 'eBooks' },
  { value: 'templates', label: 'Design Templates' },
  { value: 'courses', label: 'Online Courses' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
] as const;

const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    minRating,
    setMinRating,
    priceRange,
    setPriceRange,
    getFilteredProducts,
    searchQuery,
  } = useStore();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const products = getFilteredProducts();

  const clearFilters = () => {
    setSelectedCategory('all');
    setMinRating(0);
    setPriceRange([0, 200]);
    setSortBy('newest');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p className="text-surface-500 dark:text-surface-400">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Category Pills */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none pl-4 pr-9 py-2 bg-surface-100 dark:bg-surface-800 rounded-xl text-sm text-surface-700 dark:text-surface-300 border border-transparent focus:border-primary-400 outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-surface-400" />
        </div>

        {/* Filter Toggle (mobile) */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`sm:hidden flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filtersOpen || hasActiveFilters
              ? 'bg-primary-600 text-white'
              : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
          }`}
        >
          <FilterIcon size={14} />
          Filters
          {hasActiveFilters && (
            <span className="w-4 h-4 bg-white/20 rounded-full text-[10px] flex items-center justify-center">!</span>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minRating={minRating}
              setMinRating={setMinRating}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Mobile Filters Drawer */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-surface-900 rounded-t-2xl max-h-[70vh] overflow-y-auto p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1 text-surface-400">
                  <XIcon size={20} />
                </button>
              </div>
              <div className="sm:hidden mb-6">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minRating={minRating}
                setMinRating={setMinRating}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                hideCategoryOnMobile
              />
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full mt-4 py-3 bg-primary-600 text-white rounded-xl font-medium"
              >
                Show {products.length} Results
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  hideCategoryOnMobile?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  minRating,
  setMinRating,
  priceRange,
  setPriceRange,
  hasActiveFilters,
  clearFilters,
}) => {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-200 mb-3">
          Price Range
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-surface-500 mb-1 block">Min</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-900 dark:text-surface-100 outline-none border border-transparent focus:border-primary-400"
              min={0}
            />
          </div>
          <span className="text-surface-400 mt-5">—</span>
          <div className="flex-1">
            <label className="text-xs text-surface-500 mb-1 block">Max</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-900 dark:text-surface-100 outline-none border border-transparent focus:border-primary-400"
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-200 mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                minRating === r
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              {r > 0 ? (
                <>
                  <StarRating rating={r} size={14} />
                  <span>& up</span>
                </>
              ) : (
                <span>All ratings</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default ProductsPage;
