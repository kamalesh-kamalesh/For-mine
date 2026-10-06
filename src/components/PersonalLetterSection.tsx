import React, { useState, useEffect, useRef } from 'react';
import { Mail, MailOpen, Feather, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { archiveData } from '../config/archiveData';

export const PersonalLetterSection: React.FC = () => {
  const { personalLetter } = archiveData;
  const [revealed, setRevealed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [fontMode, setFontMode] = useState<'script' | 'serif'>('script');
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      id="personal-letter"
      className="min-h-screen py-28 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center items-center relative select-none"
    >
      {/* Gentle Floating Golden Butterfly in Top Corner */}
      <div className="absolute top-12 right-6 sm:right-12 opacity-60 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="flutter-gentle">
          <path
            d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
            fill="#A88A62"
          />
        </svg>
      </div>

      {/* Warm Ambient Glow behind Letter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#A88A62]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full text-center space-y-6 max-w-2xl relative z-10">
        
        {/* Section Header: Monospace Tag + Style 2 Strong Classic Serif */}
        <div className="space-y-2">
          <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
            {personalLetter.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F3EBDD] tracking-heading uppercase font-bold">
            {personalLetter.title}
          </h2>
          <p className="font-handwritten text-2xl sm:text-3xl text-[#C4A77D] tracking-script">
            {personalLetter.subtitle}
          </p>
        </div>

        {/* Envelope Controls / Font Switcher */}
        <div className="flex items-center justify-between gap-4 max-w-xl mx-auto px-2 pt-2 text-xs font-sans">
          <button
            type="button"
            id="btn-toggle-letter"
            onClick={handleToggleOpen}
            className="flex items-center gap-2 text-[#A88A62] hover:text-[#F3EBDD] transition-colors py-1 px-3 rounded-full bg-[#191513]/70 border border-[#A88A62]/20"
          >
            {isOpen ? (
              <>
                <Mail className="w-3.5 h-3.5 text-[#A88A62]" />
                <span>Fold Envelope</span>
              </>
            ) : (
              <>
                <MailOpen className="w-3.5 h-3.5 text-[#A88A62]" />
                <span>Open Letter</span>
              </>
            )}
          </button>

          {isOpen && (
            <button
              type="button"
              id="btn-toggle-font"
              onClick={() => setFontMode((f) => (f === 'script' ? 'serif' : 'script'))}
              className="flex items-center gap-1.5 text-[#B9ADA0] hover:text-[#A88A62] transition-colors py-1 px-3 rounded-full bg-[#191513]/70 border border-[#A88A62]/20"
              title="Change reading style"
            >
              <Feather className="w-3.5 h-3.5 text-[#A88A62]" />
              <span>{fontMode === 'script' ? 'Style: Handwritten' : 'Style: Editorial Serif'}</span>
            </button>
          )}
        </div>

        {/* The Sealed Envelope State (When Folded) */}
        {!isOpen && (
          <div
            onClick={handleToggleOpen}
            className="envelope-card max-w-xl mx-auto p-8 sm:p-12 cursor-pointer group transition-all duration-500 hover:scale-[1.01] animate-fade-up text-left"
          >
            <div className="flex justify-between items-start border-b border-[#A88A62]/20 pb-4 mb-6">
              <div>
                <span className="font-archive text-[10px] tracking-archive text-[#A88A62] block">
                  PRIVATE AIRMAIL
                </span>
                <span className="font-display text-lg text-[#F3EBDD]">
                  To: Pattu 🤎🦋
                </span>
              </div>
              <div className="postal-cancellation">
                <Sparkles className="w-3 h-3 text-[#A88A62]" />
                <span>CONFIDENTIAL</span>
              </div>
            </div>

            <div className="my-8 flex flex-col items-center justify-center text-center space-y-4">
              {/* Embossed Wax Seal */}
              <div className="wax-seal group-hover:scale-110 transition-transform">
                <span className="text-xl">🤎</span>
              </div>
              <p className="font-handwritten text-2xl text-[#C4A77D]">
                “{personalLetter.envelopePrompt}”
              </p>
              <span className="font-archive text-[10px] tracking-archive text-[#A88A62]/70 uppercase">
                Tap to break seal and read
              </span>
            </div>

            <div className="pt-4 border-t border-[#A88A62]/15 flex justify-between items-center text-[11px] font-archive text-[#B9ADA0]/60">
              <span>SPECIAL DELIVERY</span>
              <span>FROM: KAMALESH</span>
            </div>
          </div>
        )}

        {/* The Unfolded Parchment Letter Card */}
        {isOpen && (
          <div
            className={`transition-all duration-700 ease-out transform ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } max-w-xl mx-auto`}
          >
            <div className="vintage-letter-card">
              {/* Corner Washi Tapes */}
              <div className="washi-tape-tl" />
              <div className="washi-tape-tr" />

              <div className="vintage-letter-inner-border text-left stationery-ruled-lines">
                
                {/* Header: Date & Postal Stamp */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#A88A62]/20 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A88A62] animate-pulse" />
                    <span className="font-archive text-[10px] tracking-archive text-[#A88A62] uppercase font-semibold">
                      {personalLetter.date}
                    </span>
                  </div>

                  <div className="postal-cancellation">
                    <Heart className="w-3 h-3 text-[#A88A62] fill-current" />
                    <span>FOR PATTU ONLY</span>
                  </div>
                </div>

                {/* Salutation */}
                <div className="mb-6">
                  <h3 className="font-decorative text-2xl sm:text-3xl text-[#F3EBDD] tracking-wide leading-relaxed">
                    {personalLetter.salutation}
                  </h3>
                </div>

                {/* Letter Body Paragraphs */}
                <div
                  className={`space-y-6 ${
                    fontMode === 'script'
                      ? 'font-handwritten text-xl sm:text-2xl leading-[1.7] text-[#F3EBDD]/95'
                      : 'font-serif text-base sm:text-lg leading-relaxed text-[#F3EBDD]/90'
                  }`}
                >
                  {personalLetter.paragraphs.map((paragraph, index) => (
                    <p key={index} className="transition-all whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Closing and Signature */}
                <div className="mt-8 pt-6 border-t border-[#A88A62]/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-display-italic text-lg sm:text-xl text-[#B9ADA0]">
                      {personalLetter.closing}
                    </p>
                    <p className="font-handwritten text-3xl sm:text-4xl text-[#C4A77D] tracking-script font-bold">
                      {personalLetter.signature}
                    </p>
                  </div>

                  {/* Wax Seal Stamp Motif */}
                  <div className="wax-seal self-end shrink-0" title="Sealed with love">
                    <span className="text-xl">🤎</span>
                  </div>
                </div>

                {/* Postscript (P.S.) */}
                {personalLetter.postscript && (
                  <div className="mt-6 pt-4 border-t border-dashed border-[#A88A62]/20">
                    <p className="font-handwritten text-xl sm:text-2xl text-[#A88A62] tracking-script italic">
                      {personalLetter.postscript}
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Subtle Guide to Final Question */}
            <div className="pt-8 text-center animate-fade-up">
              <a
                href="#final-question"
                className="inline-flex flex-col items-center gap-1.5 text-xs font-archive text-[#A88A62]/70 hover:text-[#A88A62] transition-colors"
              >
                <span className="tracking-archive uppercase text-[10px]">Turn to the Next Chapter</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#A88A62]" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
