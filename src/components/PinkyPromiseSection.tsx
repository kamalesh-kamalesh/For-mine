import React, { useState, useEffect, useRef } from 'react';
import { archiveData } from '../config/archiveData';

export const PinkyPromiseSection: React.FC = () => {
  const { pinkyPromise } = archiveData;
  const [photoVisible, setPhotoVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Pause slightly before revealing the pinky-promise photo
          const timer = setTimeout(() => {
            setPhotoVisible(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pinky-promise"
      className="min-h-screen py-32 px-6 max-w-4xl mx-auto flex flex-col justify-center items-center relative select-none"
    >
      {/* Subtle Warm Light Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A88A62]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full text-center space-y-8 max-w-2xl relative z-10">
        
        {/* Section Header: Monospace Tag + Style 2 Strong Classic Serif */}
        <div className="space-y-2">
          <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
            {pinkyPromise.label}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#F3EBDD] tracking-heading uppercase font-bold">
            {pinkyPromise.title}
          </h2>
        </div>

        {/* Lead Quote Before Photo: Style 4 Bold Italic Serif */}
        <div className="py-2">
          <p className="font-display-italic text-2xl sm:text-3xl text-[#F3EBDD]/90 leading-relaxed">
            “{pinkyPromise.lead}”
          </p>
        </div>

        {/* The Pinky Promise Photograph with elevated visual treatment */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            photoVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-[0.97]'
          } max-w-md sm:max-w-lg mx-auto pt-4`}
        >
          <div className="physical-photo-card rotate-0 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#A88A62]/30 ring-1 ring-[#A88A62]/20">
            <div className="washi-tape-top-center" />

            <div className="overflow-hidden aspect-[3/4] bg-[#12100F] relative">
              <img
                src={pinkyPromise.photo}
                alt="Pinky Promise Photograph"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mt-3 text-center">
              <span className="font-archive text-[9px] tracking-archive text-[#A88A62] uppercase font-semibold">
                PHOTO 07 // SACRED BOND
              </span>
            </div>
          </div>
        </div>

        {/* Caption Under the Photo: Style 3 Handwritten Script */}
        {photoVisible && (
          <div className="pt-4 animate-fade-up">
            <p className="font-handwritten text-3xl sm:text-4xl text-[#C4A77D] tracking-script">
              “{pinkyPromise.caption}”
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
