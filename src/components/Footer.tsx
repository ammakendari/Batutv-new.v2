import React, { useState, useEffect } from 'react';
import { CategoryItem } from '../types/news';
import { FooterConfig, getStoredFooterConfig, FOOTER_UPDATED_EVENT, generateOrganizationSchema } from '../data/footerAdminStore';

interface FooterProps {
  categories?: CategoryItem[];
  onSelectCategory?: (slug: string) => void;
  onOpenLiveStream?: () => void;
  onOpenPrivacyModal?: () => void;
  onNavigateAdmin?: () => void;
  onNavigate?: (path: string) => void;
}

/**
 * S08 — SITE FOOTER (BATUTV)
 * 
 * Terintegrasi penuh secara dinamis dengan MASTER DATA → FOOTER MANAGEMENT:
 * - Layout, styling (#222222), tipografi, dan responsive design 100% dipertahankan.
 * - Konten (Media Info, Link Perusahaan, Link Legal, Sosial Media, Copyright, & Logo)
 *   bersumber langsung dari Footer Management CMS dan sinkron secara real-time.
 */
export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin, onNavigate }) => {
  const [config, setConfig] = useState<FooterConfig>(() => getStoredFooterConfig());

  // Listen to live updates from CMS without requiring full page reload
  useEffect(() => {
    const handleFooterUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<FooterConfig>;
      if (customEvent.detail) {
        setConfig(customEvent.detail);
      } else {
        setConfig(getStoredFooterConfig());
      }
    };

    window.addEventListener(FOOTER_UPDATED_EVENT, handleFooterUpdate);
    return () => {
      window.removeEventListener(FOOTER_UPDATED_EVENT, handleFooterUpdate);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!path) return;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      // External link - let default navigation proceed
      return;
    }
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(path);
      }
    }
  };

  const orgSchema = generateOrganizationSchema(config);

  return (
    <footer id="s08-site-footer" className="w-full bg-[#222222] text-white pt-8 pb-10 select-none relative">
      {/* Organization SEO Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* ========================================================= */}
        {/* 1. SOCIAL MEDIA SECTION                                    */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <span className="text-xs sm:text-[13px] font-normal text-slate-300">
            Ikuti kami di:
          </span>

          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Facebook (Blue Circle) */}
            {config.socialMedia.facebookUrl && (
              <a
                href={config.socialMedia.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${config.mediaInfo.mediaName}`}
                title="Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}

            {/* X / Twitter (White rounded square with black X) */}
            {config.socialMedia.xTwitterUrl && (
              <a
                href={config.socialMedia.xTwitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`X / Twitter ${config.mediaInfo.mediaName}`}
                title="X"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white flex items-center justify-center text-black hover:opacity-90 active:scale-95 transition-transform shadow-xs p-1"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            {/* Google News (Google News colorful tile) */}
            <a
              href="https://news.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Google News ${config.mediaInfo.mediaName}`}
              title="Google News"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#ffffff] flex items-center justify-center hover:opacity-90 active:scale-95 transition-transform shadow-xs overflow-hidden"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="4" fill="#ffffff" />
                <path fill="#4285F4" d="M4 5h16v14H4z" rx="2" />
                <path fill="#EA4335" d="M15 8h4v8h-4z" />
                <path fill="#FBBC05" d="M5 8h8v2H5z" />
                <path fill="#34A853" d="M5 12h8v2H5z" />
                <path fill="#ffffff" d="M5 15h8v1H5z" />
              </svg>
            </a>

            {/* TikTok (Black rounded square with colored logo) */}
            {config.socialMedia.tiktokUrl && (
              <a
                href={config.socialMedia.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${config.mediaInfo.mediaName}`}
                title="TikTok"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-black flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.78 1.53-.05 2.87-1.16 3.15-2.66.07-.37.09-.76.09-1.14V.02z" />
                </svg>
              </a>
            )}

            {/* Instagram (Instagram gradient tile) */}
            {config.socialMedia.instagramUrl && (
              <a
                href={config.socialMedia.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${config.mediaInfo.mediaName}`}
                title="Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}

            {/* YouTube (Red Rounded Rectangle) */}
            {config.socialMedia.youtubeUrl && (
              <a
                href={config.socialMedia.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`YouTube ${config.mediaInfo.mediaName}`}
                title="YouTube"
                className="w-8 h-7 sm:w-9 sm:h-8 rounded-md bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}

            {/* Telegram (if configured) */}
            {config.socialMedia.telegramUrl && (
              <a
                href={config.socialMedia.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Telegram ${config.mediaInfo.mediaName}`}
                title="Telegram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#24A1DE] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.937z"/>
                </svg>
              </a>
            )}

            {/* LinkedIn (if configured) */}
            {config.socialMedia.linkedInUrl && (
              <a
                href={config.socialMedia.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn ${config.mediaInfo.mediaName}`}
                title="LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#0077B5] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SUBTLE HORIZONTAL DIVIDER                              */}
        {/* ========================================================= */}
        <div className="w-full border-t border-slate-700/60 my-4 sm:my-5" />

        {/* ========================================================= */}
        {/* 3. SITE NAVIGATION LINKS (Bold White Centered Row)        */}
        {/* ========================================================= */}
        <nav
          aria-label="Navigasi Footer Portal"
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-2.5 my-3 text-xs sm:text-sm font-bold text-white tracking-normal"
        >
          {config.companyLinks.tentangKamiUrl && (
            <a
              href={config.companyLinks.tentangKamiUrl}
              onClick={(e) => handleLinkClick(e, config.companyLinks.tentangKamiUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Tentang Kami
            </a>
          )}
          {config.companyLinks.redaksiUrl && (
            <a
              href={config.companyLinks.redaksiUrl}
              onClick={(e) => handleLinkClick(e, config.companyLinks.redaksiUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Redaksi
            </a>
          )}
          {config.companyLinks.kontakUrl && (
            <a
              href={config.companyLinks.kontakUrl}
              onClick={(e) => handleLinkClick(e, config.companyLinks.kontakUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Kontak
            </a>
          )}
          {config.companyLinks.karirUrl && (
            <a
              href={config.companyLinks.karirUrl}
              onClick={(e) => handleLinkClick(e, config.companyLinks.karirUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Karir
            </a>
          )}
          {config.legalLinks.pedomanMediaSiberUrl && (
            <a
              href={config.legalLinks.pedomanMediaSiberUrl}
              onClick={(e) => handleLinkClick(e, config.legalLinks.pedomanMediaSiberUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Pedoman Media Siber
            </a>
          )}
          {config.legalLinks.kodeEtikJurnalistikUrl && (
            <a
              href={config.legalLinks.kodeEtikJurnalistikUrl}
              onClick={(e) => handleLinkClick(e, config.legalLinks.kodeEtikJurnalistikUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Kode Etik
            </a>
          )}
          {config.legalLinks.disclaimerUrl && (
            <a
              href={config.legalLinks.disclaimerUrl}
              onClick={(e) => handleLinkClick(e, config.legalLinks.disclaimerUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Disclaimer
            </a>
          )}
          {config.legalLinks.privacyPolicyUrl && (
            <a
              href={config.legalLinks.privacyPolicyUrl}
              onClick={(e) => handleLinkClick(e, config.legalLinks.privacyPolicyUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </a>
          )}
          {config.legalLinks.termsOfServiceUrl && (
            <a
              href={config.legalLinks.termsOfServiceUrl}
              onClick={(e) => handleLinkClick(e, config.legalLinks.termsOfServiceUrl)}
              className="hover:text-red-500 transition-colors"
            >
              Terms of Service
            </a>
          )}
        </nav>

        {/* ========================================================= */}
        {/* 4. COPYRIGHT & NETWORK SUBTITLE                            */}
        {/* ========================================================= */}
        <div className="mt-5 mb-4 space-y-1 text-center">
          <p className="text-xs sm:text-[13px] text-slate-300 font-normal">
            {config.copyright.copyrightText || 'BatuTV ©2026 | All Rights Reserved'}
          </p>
          {config.copyright.networkSubtitle && (
            <p className="text-xs sm:text-[13px] text-slate-400 font-normal">
              {config.copyright.networkSubtitle}
            </p>
          )}
        </div>

        {/* ========================================================= */}
        {/* 5. MEDIA NETWORK BRANDS LOGO ROW (Dynamic from CMS)       */}
        {/* ========================================================= */}
        {config.mediaNetworks && config.mediaNetworks.length > 0 && (
          <div className="flex items-center justify-center gap-4 sm:gap-7 flex-wrap pt-2 opacity-95">
            {config.mediaNetworks
              .filter((item) => item.isActive !== false)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item) => {
                const renderLogoContent = () => {
                  if (item.logoUrl) {
                    return (
                      <img
                        src={item.logoUrl}
                        alt={item.altText || item.name}
                        className="h-5 sm:h-6 max-w-[120px] object-contain"
                      />
                    );
                  }

                  switch (item.presetStyle) {
                    case 'viva':
                      return (
                        <div className="flex items-center gap-1.5 text-white">
                          <span className="font-black text-lg sm:text-xl tracking-tighter">VIVA</span>
                          <div className="text-[8px] sm:text-[9px] font-semibold leading-tight text-left text-slate-300">
                            News &<br />Insights
                          </div>
                        </div>
                      );
                    case 'vlix':
                      return (
                        <div className="flex items-center tracking-tighter font-black text-lg sm:text-xl">
                          <span className="text-[#00c2ff]">V</span>
                          <span className="text-[#ff2d55]">L</span>
                          <span className="text-[#00c2ff]">I</span>
                          <span className="text-[#ff2d55]">X</span>
                        </div>
                      );
                    case 'tvonenews':
                      return (
                        <div className="flex items-center font-bold text-white text-base sm:text-lg tracking-tight">
                          <span className="text-white">tv</span>
                          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#b91c1c] text-white text-[10px] sm:text-xs font-black inline-flex items-center justify-center mx-0.5">
                            O
                          </span>
                          <span className="text-white">nenews.com</span>
                        </div>
                      );
                    case 'antvklik':
                      return (
                        <div className="flex items-center font-bold text-sm sm:text-base">
                          <span className="text-white text-xs sm:text-sm font-semibold">antv</span>
                          <span className="text-[#e11d48] font-black text-sm sm:text-base italic">klik</span>
                          <span className="text-[8px] text-slate-400">.com</span>
                        </div>
                      );
                    case 'intipseleb':
                      return (
                        <div className="flex items-center gap-1 text-xs sm:text-sm font-black tracking-tight text-[#f43f5e]">
                          <span>★</span>
                          <span className="text-white font-extrabold">INTIP</span>
                          <span className="text-[#f43f5e]">SELEB</span>
                        </div>
                      );
                    case 'jagodangdut':
                      return (
                        <div className="flex items-center text-xs sm:text-sm font-bold text-white">
                          <span>jago</span>
                          <span className="text-[#f97316] font-extrabold mx-0.5">♪</span>
                          <span className="text-[#f97316]">dangdut</span>
                        </div>
                      );
                    default:
                      return (
                        <span className="font-bold text-xs sm:text-sm text-slate-200 hover:text-white transition-colors">
                          {item.name}
                        </span>
                      );
                  }
                };

                if (item.url) {
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      aria-label={item.name}
                      className="hover:opacity-85 active:scale-95 transition-all inline-flex items-center"
                    >
                      {renderLogoContent()}
                    </a>
                  );
                }

                return (
                  <div key={item.id} className="inline-flex items-center" title={item.name}>
                    {renderLogoContent()}
                  </div>
                );
              })}
          </div>
        )}

      </div>
    </footer>
  );
};


