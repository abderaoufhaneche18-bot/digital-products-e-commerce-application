import React from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { BookIcon, LayoutIcon, PlayCircleIcon, ChevronRightIcon, SparklesIcon, ShoppingBagIcon } from '../components/Icons';

interface HomePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const categories = [
  { key: 'ebooks', label: 'eBooks', icon: <BookIcon size={24} />, color: 'from-blue-500 to-blue-600', desc: 'Digital books on tech, business & more' },
  { key: 'templates', label: 'Design Templates', icon: <LayoutIcon size={24} />, color: 'from-emerald-500 to-emerald-600', desc: 'Ready-to-use professional designs' },
  { key: 'courses', label: 'Online Courses', icon: <PlayCircleIcon size={24} />, color: 'from-purple-500 to-purple-600', desc: 'Self-paced learning programs' },
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products, setSelectedCategory } = useStore();
  const featuredProducts = products
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat as 'ebooks' | 'templates' | 'courses');
    onNavigate('products');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-900 dark:via-surface-900 dark:to-surface-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 mb-6">
              <SparklesIcon size={14} />
              Premium Digital Products
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Level Up Your Skills with{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Digital Products
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
              Discover premium eBooks, design templates, and online courses crafted by industry experts. Instant access after purchase.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 rounded-xl font-semibold hover:bg-surface-50 shadow-xl shadow-black/10 hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <ShoppingBagIcon size={18} />
                Browse Products
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
              >
                Explore Categories
                <ChevronRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V20C240 0 480 0 720 20C960 40 1200 40 1440 20V60H0Z" className="fill-white dark:fill-surface-950" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            Browse Categories
          </h2>
          <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
            Find the perfect digital product across our curated categories
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`group relative overflow-hidden p-6 sm:p-8 rounded-2xl text-left transition-all hover:-translate-y-1 hover:shadow-xl animate-fade-in stagger-${i + 1}`}
              style={{ opacity: 0 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{cat.label}</h3>
                <p className="text-white/70 text-sm">{cat.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-white/80 text-sm font-medium group-hover:gap-2 transition-all">
                  Explore <ChevronRightIcon size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
              Top Rated Products
            </h2>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Our highest-rated digital products
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="hidden sm:flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:gap-2 transition-all"
          >
            View All <ChevronRightIcon size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              index={i}
            />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium"
          >
            View All Products <ChevronRightIcon size={16} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-50 dark:bg-surface-900/50 border-y border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Digital Products' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '4.8', label: 'Average Rating' },
              { value: '24/7', label: 'Instant Access' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-500 dark:text-surface-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
