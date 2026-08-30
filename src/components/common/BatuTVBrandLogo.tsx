import React from 'react';

export interface BatuTVBrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'symbol';
  theme?: 'light' | 'dark' | 'auto';
  height?: number | string;
  showSlogan?: boolean;
  customLogoUrl?: string;
  altText?: string;
}

/**
 * Official BatuTV Brand Logo Component
 * High-fidelity, ultra-crisp vector rendering with 3D gradients, specular highlights,
 * and slogan "INSPIRASI UNTUK NEGERI" matching the official brand identity.
 * Also supports dynamic custom logo image URLs with seamless SVG fallback.
 */
export const BatuTVBrandLogo: React.FC<BatuTVBrandLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'auto',
  height = 42,
  showSlogan = true,
  customLogoUrl,
  altText = 'BatuTV - Inspirasi Untuk Negeri',
}) => {
  const [imageError, setImageError] = React.useState(false);

  // If custom logo image is provided and valid (not an internal vector placeholder and hasn't errored)
  if (
    customLogoUrl &&
    !imageError &&
    customLogoUrl !== '/brand/batutv-logo.svg' &&
    customLogoUrl !== '/brand/batutv-logo-publisher.png'
  ) {
    return (
      <img
        src={customLogoUrl}
        alt={altText}
        className={`shrink-0 select-none object-contain max-w-full ${className}`}
        style={{ height }}
        onError={() => setImageError(true)}
      />
    );
  }

  // If only symbol is requested
  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 160 170"
        className={`shrink-0 select-none ${className}`}
        style={{ height }}
        aria-label="BatuTV Logo Symbol"
      >
        <defs>
          {/* Main 3D Red Glossy Gradients */}
          <linearGradient id="btv-red-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a3b" />
            <stop offset="35%" stopColor="#e50914" />
            <stop offset="85%" stopColor="#99000a" />
            <stop offset="100%" stopColor="#5e0005" />
          </linearGradient>

          <linearGradient id="btv-red-bevel-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff8590" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#ff3344" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#660006" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="btv-red-inner-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cc000e" />
            <stop offset="100%" stopColor="#400003" />
          </linearGradient>

          <filter id="btv-shadow-3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter="url(#btv-shadow-3d)">
          {/* Outer 3D B / Play Curve Base */}
          <path
            d="M 28 12 
               C 55 12, 105 32, 125 58
               C 142 80, 140 102, 115 122
               C 92 140, 48 156, 28 156
               C 18 156, 12 148, 12 136
               L 12 32
               C 12 18, 18 12, 28 12 Z"
            fill="url(#btv-red-grad-main)"
          />

          {/* 3D Inner Volume & Depth Faces */}
          <path
            d="M 16 28 
               L 48 28 
               C 80 28, 126 50, 126 84 
               C 126 112, 85 140, 46 140 
               L 16 140 Z"
            fill="url(#btv-red-inner-dark)"
            opacity="0.85"
          />

          {/* Upper Inner Play Arrow / Triangle Cut */}
          <path
            d="M 40 40 L 78 68 L 40 86 Z"
            fill="url(#btv-red-grad-main)"
            stroke="#ff5c6a"
            strokeWidth="1.5"
          />

          {/* Lower Inner Play Arrow / Triangle Cut */}
          <path
            d="M 40 88 L 78 106 L 40 134 Z"
            fill="url(#btv-red-grad-main)"
            stroke="#ff5c6a"
            strokeWidth="1.5"
          />

          {/* Glossy Specular Highlight Curve */}
          <path
            d="M 28 14 
               C 52 14, 98 34, 118 58 
               C 124 66, 118 70, 108 65 
               C 88 45, 50 30, 26 30 
               C 18 30, 14 24, 28 14 Z"
            fill="#ffffff"
            opacity="0.55"
          />
        </g>
      </svg>
    );
  }

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <svg
        viewBox="0 0 540 160"
        className="h-full w-auto max-w-full drop-shadow-xs"
        aria-label="BatuTV Inspirasi Untuk Negeri"
      >
        <defs>
          {/* 3D Red Emblem Gradient */}
          <linearGradient id="btv-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2e3f" />
            <stop offset="35%" stopColor="#e50914" />
            <stop offset="75%" stopColor="#9e0008" />
            <stop offset="100%" stopColor="#540004" />
          </linearGradient>

          {/* 3D Red Bevel Highlight */}
          <linearGradient id="btv-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#ff6b78" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#400003" stopOpacity="0.9" />
          </linearGradient>

          {/* 3D Metallic Silver Text Gradient for 'Batu' */}
          <linearGradient id="btv-silver-face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f3f4f8" />
            <stop offset="55%" stopColor="#dfe3ec" />
            <stop offset="90%" stopColor="#b6bcc9" />
            <stop offset="100%" stopColor="#959cae" />
          </linearGradient>

          {/* Dark Metallic Shadow for 'Batu' */}
          <linearGradient id="btv-silver-depth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#606674" />
            <stop offset="100%" stopColor="#22252a" />
          </linearGradient>

          {/* 3D Red Gradient for 'tv' */}
          <linearGradient id="btv-red-tv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3344" />
            <stop offset="50%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#8a0006" />
          </linearGradient>

          {/* Red Slogan Bar Gradient */}
          <linearGradient id="btv-slogan-bar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#ff3b4b" />
          </linearGradient>

          {/* Specular Drop Shadow */}
          <filter id="btv-3d-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.32" />
          </filter>

          <filter id="btv-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#btv-3d-shadow)">
          {/* ========================================================= */}
          {/* 1. 3D RED EMBLEM (LEFT ICON)                              */}
          {/* ========================================================= */}
          <g transform="translate(4, 2)">
            {/* Outer 3D Dimensional Curve */}
            <path
              d="M 32 10 
                 C 62 10, 115 32, 134 60 
                 C 152 84, 150 108, 124 130 
                 C 98 150, 52 152, 32 152 
                 C 18 152, 12 142, 12 128 
                 L 12 34 
                 C 12 18, 20 10, 32 10 Z"
              fill="url(#btv-red-grad)"
            />

            {/* Inner Recessed Bevel Shadow */}
            <path
              d="M 22 24 
                 L 44 24 
                 C 74 24, 122 46, 122 80 
                 C 122 108, 82 136, 44 136 
                 L 22 136 Z"
              fill="#420004"
              opacity="0.8"
            />

            {/* 3D Upper Play Arrow */}
            <path
              d="M 44 38 L 84 68 L 44 86 Z"
              fill="url(#btv-red-grad)"
              stroke="#ff7582"
              strokeWidth="1.5"
            />

            {/* 3D Lower Play Arrow */}
            <path
              d="M 44 88 L 84 106 L 44 130 Z"
              fill="url(#btv-red-grad)"
              stroke="#ff7582"
              strokeWidth="1.5"
            />

            {/* Top Glossy Highlight Curve */}
            <path
              d="M 32 12 
                 C 58 12, 108 34, 126 58 
                 C 132 66, 122 70, 112 65 
                 C 94 48, 56 30, 30 30 
                 C 20 30, 16 22, 32 12 Z"
              fill="#ffffff"
              opacity="0.65"
            />
          </g>

          {/* ========================================================= */}
          {/* 2. 3D METALLIC TEXT 'Batu'                                 */}
          {/* ========================================================= */}
          <g transform="translate(160, 116)" filter="url(#btv-glow)">
            {/* 3D Extrusion Shadow Layer */}
            <text
              x="2"
              y="3"
              fontFamily="system-ui, -apple-system, 'Arial Black', sans-serif"
              fontSize="96"
              fontWeight="900"
              letterSpacing="-2"
              fill="url(#btv-silver-depth)"
            >
              Batu
            </text>

            {/* Metallic Silver Face */}
            <text
              x="0"
              y="0"
              fontFamily="system-ui, -apple-system, 'Arial Black', sans-serif"
              fontSize="96"
              fontWeight="900"
              letterSpacing="-2"
              fill="url(#btv-silver-face)"
              stroke="#ffffff"
              strokeWidth="1.8"
              paintOrder="stroke fill"
            >
              Batu
            </text>
          </g>

          {/* ========================================================= */}
          {/* 3. 3D RED TEXT 'tv'                                        */}
          {/* ========================================================= */}
          <g transform="translate(426, 116)">
            {/* 3D Extrusion Shadow Layer */}
            <text
              x="2"
              y="3"
              fontFamily="system-ui, -apple-system, 'Arial Black', sans-serif"
              fontSize="82"
              fontWeight="900"
              letterSpacing="-1"
              fill="#420004"
            >
              tv
            </text>

            {/* Red Glossy Face */}
            <text
              x="0"
              y="0"
              fontFamily="system-ui, -apple-system, 'Arial Black', sans-serif"
              fontSize="82"
              fontWeight="900"
              letterSpacing="-1"
              fill="url(#btv-red-tv)"
              stroke="#ff6b78"
              strokeWidth="1.5"
              paintOrder="stroke fill"
            >
              tv
            </text>
          </g>

          {/* ========================================================= */}
          {/* 4. SLOGAN: "— INSPIRASI UNTUK NEGERI —"                    */}
          {/* ========================================================= */}
          {showSlogan && (
            <g transform="translate(126, 142)">
              {/* Left Red Accent Line */}
              <rect
                x="0"
                y="-6"
                width="42"
                height="4.5"
                rx="2.25"
                fill="url(#btv-slogan-bar)"
              />

              {/* Slogan Text */}
              <text
                x="50"
                y="-1"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                fontSize="15"
                fontWeight="800"
                letterSpacing="4"
                fill={theme === 'dark' ? '#f1f5f9' : '#334155'}
                filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.15))"
              >
                INSPIRASI UNTUK NEGERI
              </text>

              {/* Right Red Accent Line */}
              <rect
                x="328"
                y="-6"
                width="42"
                height="4.5"
                rx="2.25"
                fill="url(#btv-slogan-bar)"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
