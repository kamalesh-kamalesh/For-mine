import React from 'react';
import { archiveData } from '../config/archiveData';

export const HandholdingSection: React.FC = () => {
  const { handholding } = archiveData;
  const photos = handholding.photos;

  return (
    <section
      id="handholding"
      className="min-h-screen py-32 px-6 max-w-5xl mx-auto relative select-none"
    >
      {/* Section Header: Monospace Label + Style 2 Strong Classic Serif */}
      <div className="text-center space-y-2 mb-24">
        <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
          {handholding.label}
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F3EBDD] tracking-heading uppercase font-bold">
          {handholding.title}
        </h2>
      </div>

      {/* Intimate Storytelling Layout with Plenty of Negative Space */}
      <div className="space-y-36 max-w-3xl mx-auto">
        
        {/* Photo 05 — First Handholding Photograph */}
        <div className="max-w-sm mx-auto sm:ml-12 sm:mr-auto">
          <div className="physical-photo-card -rotate-2 shadow-2xl">
            <div className="washi-tape-tl" />
            <div className="aspect-[3/4] bg-[#12100F] overflow-hidden">
              <img
                src={photos[0]?.photo}
                alt="Two hands holding"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95"
              />
            </div>
            <div className="mt-2.5 text-center">
              <span className="font-archive text-[9px] tracking-archive text-[#8A7463] uppercase font-semibold">
                PHOTO 05 // TOUCH & TIME
              </span>
            </div>
          </div>
        </div>

        {/* Generous Empty Breathing Space */}

        {/* Photo 06 — Second Handholding Photograph (Offset Right) */}
        <div className="max-w-sm mx-auto sm:mr-12 sm:ml-auto">
          <div className="physical-photo-card rotate-2 shadow-2xl">
            <div className="washi-tape-tr" />
            <div className="aspect-[3/4] bg-[#12100F] overflow-hidden">
              <img
                src={photos[1]?.photo}
                alt="Quiet grip of hands"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95"
              />
            </div>
            <div className="mt-2.5 text-center">
              <span className="font-archive text-[9px] tracking-archive text-[#8A7463] uppercase font-semibold">
                PHOTO 06 // UNREVILED WARMTH
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Understated Emotional Statement: Style 4 Bold Italic Serif & Handwritten */}
      <div className="text-center mt-28 space-y-4">
        <p className="font-display-italic text-2xl sm:text-3xl text-[#F3EBDD]/90 max-w-xl mx-auto">
          “{handholding.statement}”
        </p>
        <span className="block font-archive text-[10px] tracking-archive text-[#A88A62]/60 uppercase">
          SILENCE / UNDERSTOOD
        </span>
      </div>

    </section>
  );
};
