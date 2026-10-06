import React, { useState } from 'react';

interface ArchivalPhotoProps {
  src: string;
  alt: string;
  archiveId?: string;
  className?: string;
  aspectRatio?: string;
  stamp?: string;
  priority?: boolean;
}

export const ArchivalPhoto: React.FC<ArchivalPhotoProps> = ({
  src,
  alt,
  archiveId = 'ARCHIVE_REF',
  className = '',
  aspectRatio = '4/3',
  stamp,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden group select-none ${className}`}
      style={{
        aspectRatio,
        background: '#161210',
        border: '1px solid rgba(197, 168, 128, 0.18)',
        borderRadius: '3px',
      }}
    >
      {/* Corner crosshairs / technical marks */}
      <span className="absolute top-2 left-2 text-[10px] font-mono text-[#C5A880]/40 pointer-events-none z-10 leading-none">
        ⌜
      </span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-[#C5A880]/40 pointer-events-none z-10 leading-none">
        ⌝
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#C5A880]/40 pointer-events-none z-10 leading-none">
        ⌞
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#C5A880]/40 pointer-events-none z-10 leading-none">
        ⌟
      </span>

      {/* Main Image */}
      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.025] filter contrast-[1.03] brightness-[0.98] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Fallback archival graphic if file is missing or still loading */}
      {(error || !loaded) && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #1F1916, #120E0D)',
          }}
        >
          {/* Subtle butterfly emblem watermark */}
          <div className="mb-3 opacity-30 transform group-hover:scale-110 transition-transform duration-500">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
                fill="#C5A880"
              />
            </svg>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#C5A880]/80 uppercase mb-1">
            {archiveId}
          </span>
          <p className="font-serif italic text-[#F4EBDD]/60 text-sm max-w-xs">
            {alt}
          </p>
          <span className="mt-3 text-[10px] font-mono text-[#8C6D58] tracking-widest uppercase">
            [ ARCHIVAL SPECIMEN ]
          </span>
        </div>
      )}

      {/* Optional vintage stamp in the corner */}
      {stamp && (
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="archive-stamp">{stamp}</span>
        </div>
      )}

      {/* Subtle warm glass glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};
