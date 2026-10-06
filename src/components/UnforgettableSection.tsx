import React from 'react';
import { archiveData } from '../config/archiveData';

export const UnforgettableSection: React.FC = () => {
  const { unforgettable } = archiveData;
  const memories = unforgettable.memories;

  return (
    <section
      id="unforgettable"
      className="min-h-screen py-28 px-6 max-w-5xl mx-auto relative select-none"
    >
      {/* Section Header: Style 2 Strong Classic Serif + Monospace */}
      <div className="text-center space-y-2 mb-20">
        <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
          {unforgettable.label}
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F3EBDD] tracking-heading uppercase font-bold">
          {unforgettable.title}
        </h2>
      </div>

      {/* Editorial Cinematic Composition (1st Large -> 2nd Offset -> 3rd Large) */}
      <div className="space-y-24 max-w-4xl mx-auto">
        
        {/* Photo 02 — First Memory: Large Photograph */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="physical-photo-card rotate-0 shadow-2xl">
            <div className="washi-tape-top-center" />
            <div className="aspect-[16/10] bg-[#12100F] overflow-hidden">
              <img
                src={memories[0]?.photo}
                alt={memories[0]?.caption}
                className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="font-archive text-[10px] tracking-archive text-[#5A4B41] font-semibold">
                {memories[0]?.id}
              </span>
              <p className="font-handwritten text-2xl text-[#3D322B] tracking-script">
                “{memories[0]?.caption}”
              </p>
            </div>
          </div>
        </div>

        {/* Photo 03 — Second Memory: Smaller Offset Photograph */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 md:col-start-4">
            <div className="physical-photo-card rotate-2 max-w-md mx-auto shadow-2xl">
              <div className="washi-tape-tr" />
              <div className="aspect-[4/5] bg-[#12100F] overflow-hidden">
                <img
                  src={memories[1]?.photo}
                  alt={memories[1]?.caption}
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-95"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="font-archive text-[9px] tracking-archive text-[#8A7463] uppercase block font-semibold">
                  {memories[1]?.id}
                </span>
                <p className="font-handwritten text-2xl text-[#3D322B] mt-1 tracking-script">
                  “{memories[1]?.caption}”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo 04 — Third Memory: Large Photograph */}
        <div className="max-w-lg mx-auto w-full">
          <div className="physical-photo-card -rotate-1 shadow-2xl">
            <div className="washi-tape-tl" />
            <div className="washi-tape-tr" />
            <div className="aspect-[4/5] bg-[#12100F] overflow-hidden">
              <img
                src={memories[2]?.photo}
                alt={memories[2]?.caption}
                className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-95"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="font-archive text-[10px] tracking-archive text-[#5A4B41] font-semibold">
                {memories[2]?.id}
              </span>
              <p className="font-handwritten text-2xl text-[#3D322B] tracking-script">
                “{memories[2]?.caption}”
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
