import React from 'react';
import { Radio, Flame, ChevronRight } from 'lucide-react';
import { CategoryItem } from '../types/news';

interface NavbarProps {
  categories: CategoryItem[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  onOpenLiveStream: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  onOpenLiveStream,
}) => {
  return (
    <nav id="category-navbar" className="bg-[#b91c1c] text-white shadow-md sticky top-0 z-20">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-0.5">
          <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              if (cat.slug === 'live') {
                return (
                  <li key={cat.id}>
                    <button
                      id={`nav-item-${cat.slug}`}
                      onClick={onOpenLiveStream}
                      className="flex items-center gap-1.5 px-3 py-2.5 my-1 rounded bg-red-950/70 text-amber-300 hover:bg-black/40 hover:text-white transition font-bold border border-red-500/50 shadow-inner animate-pulse"
                    >
                      <Radio className="w-3.5 h-3.5 text-amber-400" />
                      <span>{cat.name}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={cat.id}>
                  <button
                    id={`nav-item-${cat.slug}`}
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`px-3 py-2.5 my-1 rounded transition text-center ${
                      isActive
                        ? 'bg-black/30 text-white font-black shadow-inner border-b-2 border-amber-300'
                        : 'text-red-100 hover:bg-red-800 hover:text-white font-medium'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick indicator link on right */}
          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-red-600/60 text-xs font-semibold text-amber-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            <span>Update 24 Jam</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
