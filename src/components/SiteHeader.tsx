import React, { useState, useEffect } from 'react';
import { User, Menu, Search } from 'lucide-react';
import { getStoredSiteSettings, SITE_SETTINGS_UPDATED_EVENT } from '../data/siteSettingsStore';
import { SiteSettings } from '../types/siteSettings';

interface SiteHeaderProps {
  isScrolled?: boolean;
  onOpenSearch?: (query?: string) => void;
  onOpenUserAccount?: () => void;
  onOpenMenu?: () => void;
  onGoHome?: () => void;
  // Backwards compatibility
  onOpenLiveStream?: () => void;
}

/**
 * S01 — SITE HEADER
 * 
 * - Brand Logo "BatuTV" di kiri (Dikelola penuh via Master Data -> Site Settings)
 * - Desktop View (>= lg): Search Bar Pill "Cari..." + Tombol Akun Ungu + Hamburger Menu
 * - Mobile & Tablet View (< lg): Logo BatuTV di kiri + Tombol Ikon Kaca Pembesar Merah & Ikon Menu Hitam di kanan
 * - Efek shrink dinamis saat sticky scroll aktif
 */
export const SiteHeader: React.FC<SiteHeaderProps> = ({
  isScrolled = false,
  onOpenSearch,
  onOpenUserAccount,
  onOpenMenu,
  onGoHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredSiteSettings());

  useEffect(() => {
    const handleSettingsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SiteSettings>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
      } else {
        setSettings(getStoredSiteSettings());
      }
    };

    window.addEventListener(SITE_SETTINGS_UPDATED_EVENT, handleSettingsUpdate);
    return () => {
      window.removeEventListener(SITE_SETTINGS_UPDATED_EVENT, handleSettingsUpdate);
    };
  }, []);

  const handleBrandClick = (e: React.MouseEvent) => {
    if (onGoHome) {
      e.preventDefault();
      onGoHome();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch(searchQuery);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onOpenSearch) {
        onOpenSearch(searchQuery);
      }
    }
  };

  return (
    <header
      id="s01-site-header"
      className="site-header sticky top-0 md:static z-40 w-full bg-white/98 backdrop-blur-xs border-b border-slate-200/80 md:border-slate-100 py-2.5 sm:py-3 shadow-xs md:shadow-none transition-shadow"
    >
      <div className="site-header-container max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* ========================================================= */}
        {/* S01.1 — BRAND LOGO: BatuTV (Left Aligned)                 */}
        {/* ========================================================= */}
        <div className="brand-wrapper flex items-center flex-shrink-0">
          <a
            id="s01-brand-logo"
            href="/"
            onClick={handleBrandClick}
            className="brand group flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-md"
            aria-label={settings.identity.siteName || 'BATUTV'}
          >
            {settings.logos.headerDesktop &&
            settings.logos.headerDesktop !== '/brand/batutv-logo.svg' &&
            settings.logos.headerDesktop !== '/brand/batutv-logo-publisher.png' ? (
              <img
                src={settings.logos.headerDesktop}
                alt={settings.logos.headerDesktopAlt || settings.identity.siteName}
                className="max-h-9 sm:max-h-11 max-w-[220px] object-contain"
              />
            ) : (
              <div className="flex items-center tracking-tighter">
                <div className="bg-red-600 group-hover:bg-red-700 text-white font-black px-2.5 sm:px-3 rounded-l-md tracking-tighter shadow-sm text-xl sm:text-2xl py-0.5 sm:py-1 transition-colors">
                  {settings.identity.siteName ? (
                    settings.identity.siteName.toUpperCase().includes('BATUTV') ||
                    settings.identity.siteName.toUpperCase().includes('BATU TV') ? (
                      'BATU'
                    ) : (
                      settings.identity.siteName
                    )
                  ) : (
                    'BATU'
                  )}
                </div>
                {(!settings.identity.siteName ||
                  settings.identity.siteName.toUpperCase().includes('BATUTV') ||
                  settings.identity.siteName.toUpperCase().includes('BATU TV')) && (
                  <div className="bg-[#240046] group-hover:bg-[#3c096c] text-white font-black px-2.5 sm:px-3 rounded-r-md tracking-tighter border-l border-red-500/40 text-xl sm:text-2xl py-0.5 sm:py-1 transition-colors">
                    <span className="text-red-500">TV</span>
                  </div>
                )}
              </div>
            )}
          </a>
        </div>

        {/* ========================================================= */}
        {/* 1. MOBILE & TABLET RIGHT CONTROLS (< lg)                  */}
        {/*    (Red Magnifier Search Icon + Clean Black Menu Icon)     */}
        {/* ========================================================= */}
        <div className="flex lg:hidden items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* Red Search Magnifying Glass Icon */}
          <button
            id="s01-mobile-search-btn"
            type="button"
            onClick={() => onOpenSearch && onOpenSearch('')}
            aria-label="Cari Berita"
            title="Cari Berita"
            className="p-1 text-[#c8102e] hover:text-red-700 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-md"
          >
            <Search className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2.4]" />
          </button>

          {/* Clean 3-Line Black Hamburger Menu Icon */}
          <button
            id="s01-mobile-menu-btn"
            type="button"
            onClick={onOpenMenu}
            aria-label="Buka Menu"
            title="Menu"
            className="p-1 text-slate-900 hover:text-slate-700 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-md"
          >
            <Menu className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[2.4]" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. DESKTOP RIGHT GROUP (>= lg)                            */}
        {/*    (Search Bar Pill + User Profile + Menu)                */}
        {/* ========================================================= */}
        <div className="hidden lg:flex items-center justify-end gap-3.5 sm:gap-4.5 flex-1 max-w-2xl ml-auto">
          
          {/* S01.2 — SEARCH PILL INPUT */}
          <div className="search-bar-wrapper w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px]">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                id="s01-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onClick={() => onOpenSearch && onOpenSearch(searchQuery)}
                placeholder="Cari..."
                className="w-full h-[32px] pl-5 pr-4 rounded-full border border-slate-300/90 text-[13px] text-slate-800 placeholder-slate-400 bg-white shadow-2xs hover:border-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 font-sans"
              />
            </form>
          </div>

          {/* S01.3 — USER PROFILE & HAMBURGER MENU */}
          <div className="header-controls-wrapper flex items-center gap-3 sm:gap-3.5 flex-shrink-0">
            {/* Circular Purple Profile Avatar Button */}
            <button
              id="s01-btn-user-profile"
              type="button"
              onClick={onOpenUserAccount}
              aria-label="Masuk ke Akun / Login CMS"
              title="Masuk ke Akun / Login CMS BatuTV"
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#36084e] hover:bg-[#4a0e78] active:scale-95 text-white flex items-center justify-center shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 cursor-pointer"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2]" />
            </button>

            {/* Clean 3-Line Hamburger Menu Icon */}
            <button
              id="s01-btn-hamburger-menu"
              type="button"
              onClick={onOpenMenu}
              aria-label="Buka Menu"
              title="Menu"
              className="p-1 text-slate-500 hover:text-slate-800 active:scale-95 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-md"
            >
              <Menu className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2]" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
