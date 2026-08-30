import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronDown, Search, Radio } from 'lucide-react';
import { NavItemWithChildren } from '../types/navigation';
import { getPublicNavigationTree, isNavItemActive } from '../data/navigationStore';
import { getStoredSiteSettings, SITE_SETTINGS_UPDATED_EVENT } from '../data/siteSettingsStore';
import { SiteSettings } from '../types/siteSettings';

export interface PrimaryNavItem {
  id: string;
  label: string;
  href: string;
  slug: string;
  children?: PrimaryNavItem[];
}

interface PrimaryNavigationProps {
  isScrolled?: boolean;
  activeSlug?: string;
  currentPath?: string;
  onSelectNav?: (slug: string, url?: string) => void;
  onNavigate?: (url: string) => void;
  onGoHome?: () => void;
  // Backwards compatibility optional props
  items?: any[];
  onOpenLiveStream?: () => void;
  onOpenUserAccount?: () => void;
  onOpenSearch?: () => void;
}

/**
 * S02 — PRIMARY NAVIGATION (Kompas.tv Style Sticky Bar)
 * 
 * - Pinned sticky at top of viewport (top-0 z-40)
 * - When scrolled down, displays compact "BATU TV" logo on the left
 * - Multi-level dropdown submenus
 * - Search & Live TV quick buttons on the right
 */
export const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  isScrolled = false,
  activeSlug = 'home',
  currentPath = '/',
  onSelectNav,
  onNavigate,
  onGoHome,
  onOpenLiveStream,
  onOpenSearch,
}) => {
  const [navTree, setNavTree] = useState<NavItemWithChildren[]>(() => getPublicNavigationTree());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStoredSiteSettings());
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Sync navigation data and listen for live updates from Dashboard
  useEffect(() => {
    const syncData = () => {
      setNavTree(getPublicNavigationTree());
    };

    const syncSettings = (e?: Event) => {
      const customEvent = e as CustomEvent<SiteSettings>;
      if (customEvent?.detail) {
        setSiteSettings(customEvent.detail);
      } else {
        setSiteSettings(getStoredSiteSettings());
      }
    };

    syncData();
    syncSettings();

    window.addEventListener('batutv_navigation_updated', syncData);
    window.addEventListener(SITE_SETTINGS_UPDATED_EVENT, syncSettings);
    window.addEventListener('storage', syncData);

    return () => {
      window.removeEventListener('batutv_navigation_updated', syncData);
      window.removeEventListener(SITE_SETTINGS_UPDATED_EVENT, syncSettings);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItemWithChildren,
    slug: string,
    url: string
  ) => {
    // Allow external links or open in new tab to function natively
    if (item.type === 'external' || item.openNewTab || url.startsWith('http://') || url.startsWith('https://')) {
      setOpenDropdownId(null);
      return;
    }

    // Allow new tab/window shortcuts (Ctrl+Click, Cmd+Click, Shift+Click, Middle Click)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    setOpenDropdownId(null);

    if (onSelectNav) {
      onSelectNav(slug, url);
    } else if (onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <nav
      ref={navRef}
      id="s02-primary-navigation"
      aria-label="Navigasi Utama"
      className={`primary-navigation hidden md:block sticky top-0 z-40 w-full bg-gradient-to-r from-[#c00028] via-[#850831] to-[#450950] text-white select-none transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      <div className="primary-navigation-container max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start h-[38px] sm:h-[40px]">
        {/* Left Compact Logo Badge (Reveals smoothly when scrolled into sticky mode) */}
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
            isScrolled
              ? 'max-w-[140px] opacity-100 mr-2 sm:mr-3 translate-x-0'
              : 'max-w-0 opacity-0 mr-0 -translate-x-2 pointer-events-none'
          }`}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onGoHome) onGoHome();
              else if (onNavigate) onNavigate('/');
            }}
            className="flex items-center tracking-tighter text-xs sm:text-[13px] font-black group focus:outline-none select-none rounded overflow-hidden shadow-xs hover:opacity-95 transition-opacity"
            aria-label={siteSettings.identity.siteName || 'BatuTV Home'}
          >
            {siteSettings.logos.navbarCompact ? (
              <img
                src={siteSettings.logos.navbarCompact}
                alt={siteSettings.logos.navbarCompactAlt || siteSettings.identity.siteName || 'BATUTV'}
                className="max-h-[26px] sm:max-h-[28px] max-w-[120px] object-contain"
              />
            ) : (
              <div className="flex items-center tracking-tighter text-xs sm:text-[12.5px] font-black rounded overflow-hidden shadow-2xs">
                <div className="bg-white text-red-600 px-2 py-0.5 font-black tracking-tight leading-tight">
                  {siteSettings.identity.siteName?.toUpperCase().includes('BATU') ? 'BATU' : siteSettings.identity.siteName || 'BATU'}
                </div>
                <div className="bg-[#240046] text-white px-1.5 py-0.5 font-black tracking-tight border-l border-red-500/30 leading-tight">
                  <span className="text-white">{siteSettings.identity.siteName?.toUpperCase().includes('BATU') ? 'TV' : 'NEWS'}</span>
                </div>
              </div>
            )}
          </a>
        </div>

        {/* Center Navigation List */}
        <div className="navigation-list-wrapper flex items-center overflow-x-auto md:overflow-visible no-scrollbar h-full">
          <ul className="navigation-list flex items-center justify-start text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-black tracking-wide whitespace-nowrap h-full">
            {navTree.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isActive = isNavItemActive(item, currentPath, activeSlug);
              const isDropdownOpen = openDropdownId === item.id;
              const isHomeIcon = item.slug === 'home' || item.icon === 'home';

              return (
                <li
                  key={item.id}
                  className="navigation-item relative group flex-shrink-0 h-full flex items-center"
                  onMouseEnter={() => hasChildren && setOpenDropdownId(item.id)}
                  onMouseLeave={() => hasChildren && setOpenDropdownId(null)}
                >
                  {/* LEVEL 1: PARENT MENU LINK */}
                  <a
                    id={`s02-nav-${item.slug}`}
                    href={item.url}
                    target={item.openNewTab ? '_blank' : undefined}
                    rel={item.openNewTab ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleLinkClick(e, item, item.slug, item.url)}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                    aria-expanded={hasChildren ? (isDropdownOpen ? 'true' : 'false') : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link h-full inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-black uppercase tracking-wide transition-all duration-150 relative focus:outline-none focus-visible:ring-1 focus-visible:ring-white/80 ${
                      isHomeIcon
                        ? isDropdownOpen || isActive
                          ? 'bg-[#520215] text-amber-300 shadow-inner'
                          : 'bg-[#5c0318] text-amber-300 hover:bg-[#720420]'
                        : isDropdownOpen
                        ? 'bg-black/35 text-white shadow-2xs'
                        : isActive
                        ? 'bg-black/30 text-amber-300 shadow-2xs'
                        : 'text-white hover:bg-black/20 hover:text-white'
                    }`}
                  >
                    {isHomeIcon ? (
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Home className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{item.label}</span>
                      </span>
                    ) : (
                      <span>{item.label}</span>
                    )}

                    {/* Dropdown indicator */}
                    {hasChildren && (
                      <ChevronDown
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform duration-200 shrink-0 opacity-80 group-hover:opacity-100 group-hover:rotate-180 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}

                    {/* Subtle active indicator bar */}
                    {isActive && !isHomeIcon && (
                      <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-amber-300 rounded-full opacity-90" />
                    )}
                  </a>

                  {/* LEVEL 2: SUBMENU / DROPDOWN CONTAINER */}
                  {hasChildren && (
                    <div
                      className={`absolute top-full left-0 pt-0.5 z-50 w-[170px] sm:w-[185px] transition-all duration-150 ease-out ${
                        isDropdownOpen
                          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                          : 'opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto'
                      }`}
                    >
                      <ul
                        role="menu"
                        aria-label={`Submenu ${item.label}`}
                        className="bg-[#850831] border border-red-950/40 rounded-lg shadow-xl overflow-hidden divide-y divide-black/15 py-1"
                      >
                        {item.children!.map((child) => {
                          const isChildActive = isNavItemActive(child, currentPath, activeSlug);

                          return (
                            <li key={child.id} role="none">
                              <a
                                id={`s02-subnav-${child.slug}`}
                                href={child.url}
                                role="menuitem"
                                target={child.openNewTab ? '_blank' : undefined}
                                rel={child.openNewTab ? 'noopener noreferrer' : undefined}
                                aria-current={isChildActive ? 'page' : undefined}
                                onClick={(e) => handleLinkClick(e, child, child.slug, child.url)}
                                className={`block px-3.5 py-2 text-[11.5px] sm:text-[12px] font-black text-white uppercase tracking-wider text-left transition-colors duration-150 focus:outline-none ${
                                  isChildActive
                                    ? 'bg-black/30 text-amber-300'
                                    : 'hover:bg-black/20 hover:text-white'
                                }`}
                              >
                                {child.label}
                              </a>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

        {/* Right Action Icons: Quick Live TV & Search (Shifted left alongside nav items) */}
        <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 ml-3 sm:ml-4">
          {onOpenLiveStream && (
            <button
              onClick={onOpenLiveStream}
              title="Tonton Live Streaming BatuTV"
              aria-label="Tonton Live Streaming"
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10.5px] sm:text-[11px] font-black px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <Radio className="w-3 h-3 text-white animate-pulse" />
              <span>Live</span>
            </button>
          )}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Pencarian Berita"
              aria-label="Buka Pencarian"
              className="p-1 sm:p-1.5 rounded-full hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
