import React from 'react';
import { RotateCcw } from 'lucide-react';
import { archiveData } from '../config/archiveData';

interface BirthdayEndingSectionProps {
  onRevisitArchive?: () => void;
}

export const BirthdayEndingSection: React.FC<BirthdayEndingSectionProps> = ({
  onRevisitArchive,
}) => {
  const { finalBirthday } = archiveData;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0908] flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none">
      
      {/* Background Cinematic Warm Sunset Silhouette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 100%, rgba(168, 95, 60, 0.45) 0%, rgba(168, 138, 98, 0.18) 40%, transparent 75%)',
          }}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E4A96E]/50 blur-xs" />

        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-36 opacity-85 text-[#070504] fill-current"
        >
          <path d="M0,180 L0,110 Q40,90 80,105 Q120,60 160,95 Q200,75 250,110 Q300,50 350,90 Q400,65 460,115 Q520,70 580,100 Q620,80 680,110 Q740,45 800,90 Q850,70 910,115 Q970,55 1040,100 Q1110,65 1160,110 L1200,105 L1200,180 Z" />
          <path d="M50,180 Q80,120 120,130 Q160,85 210,125 Q270,100 320,135 Q380,80 430,120 Q500,95 560,135 Q640,90 700,125 Q770,75 830,120 Q900,100 960,135 Q1020,85 1080,130 L1200,120 L1200,180 Z" opacity="0.6" fill="#040302" />
        </svg>

        {/* Gentle Golden Butterfly in Top Corner */}
        <div className="absolute top-16 right-12 sm:right-24 opacity-60">
          <svg width="26" height="26" viewBox="0 0 48 48" fill="none" className="flutter-gentle">
            <path
              d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
              fill="#A88A62"
            />
          </svg>
        </div>
      </div>

      {/* Main Birthday Content */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center justify-center my-auto py-12 space-y-8 animate-fade-up">
        
        {/* Monospace Badge: ARCHIVE COMPLETE */}
        <div>
          <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
            {finalBirthday.badge}
          </span>
        </div>

        {/* Style 1 / Style 3: Decorative Calligraphy for "Happy Birthday" */}
        <div className="space-y-2">
          <h2 className="font-decorative text-5xl sm:text-7xl text-[#F3EBDD] tracking-decorative leading-tight">
            Happy Birthday
          </h2>

          {/* Style 2 Serif + Style 3 Handwritten Treatment for "Pattu 🤎🦋" */}
          <h1 className="text-4xl sm:text-6xl text-[#C4A77D] tracking-heading font-bold">
            <span className="font-display">Pattu</span>
            <span className="ml-2 text-3xl sm:text-4xl inline-block align-middle">🤎🦋</span>
          </h1>
        </div>

        {/* Style 4: Bold Italic Serif Closing Lines */}
        <div className="space-y-2.5 max-w-md mx-auto py-2">
          {finalBirthday.closingLines.map((line, idx) => (
            <p
              key={idx}
              className={`font-display-italic text-2xl sm:text-3xl text-[#F3EBDD]/90 leading-relaxed ${
                idx === finalBirthday.closingLines.length - 1
                  ? 'text-[#A88A62] pt-1'
                  : ''
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Quiet Revisit Option */}
        {onRevisitArchive && (
          <div className="pt-6">
            <button
              type="button"
              id="btn-revisit-story"
              onClick={onRevisitArchive}
              className="btn-storyboard-secondary text-xs py-2 px-5 flex items-center gap-2 mx-auto font-sans opacity-70 hover:opacity-100 transition-opacity"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#A88A62]" />
              <span>REVISIT MEMORIES</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
