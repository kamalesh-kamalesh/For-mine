import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { EntryScreen } from './components/EntryScreen';
import { ArchiveNav } from './components/ArchiveNav';
import { FirstMeetSection } from './components/FirstMeetSection';
import { UnforgettableSection } from './components/UnforgettableSection';
import { HandholdingSection } from './components/HandholdingSection';
import { PinkyPromiseSection } from './components/PinkyPromiseSection';
import { PersonalLetterSection } from './components/PersonalLetterSection';
import { FinalQuestionSection } from './components/FinalQuestionSection';
import { SpecialPhotoSection } from './components/SpecialPhotoSection';
import { BirthdayEndingSection } from './components/BirthdayEndingSection';

export const App: React.FC = () => {
  // Stages:
  // 'entry': Screen 01 - The Entry Gate
  // 'story': Screens 02 through 06 - Continuous Cinematic Story
  const [stage, setStage] = useState<'entry' | 'story'>('entry');
  const [currentSection, setCurrentSection] = useState<number>(1);

  // Screen 07 & 08 Modals / Overlays
  const [showSpecialPhoto, setShowSpecialPhoto] = useState<boolean>(false);
  const [showBirthdayEnding, setShowBirthdayEnding] = useState<boolean>(false);

  // Track active section on scroll
  useEffect(() => {
    if (stage !== 'story') return;

    const sections = [
      { id: 'first-meet', num: 1 },
      { id: 'unforgettable', num: 2 },
      { id: 'handholding', num: 3 },
      { id: 'pinky-promise', num: 4 },
      { id: 'personal-letter', num: 5 },
      { id: 'final-question', num: 6 },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sections[i].num);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stage]);

  const handleJumpToSection = (num: number) => {
    setCurrentSection(num);
    const idMap: Record<number, string> = {
      1: 'first-meet',
      2: 'unforgettable',
      3: 'handholding',
      4: 'pinky-promise',
      5: 'personal-letter',
      6: 'final-question',
    };
    const el = document.getElementById(idMap[num]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterArchive = () => {
    setStage('story');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleFinalQuestionYes = () => {
    setShowSpecialPhoto(true);
  };

  const handleSecondYes = () => {
    setShowSpecialPhoto(false);
    setShowBirthdayEnding(true);
  };

  const handleRevisitArchive = () => {
    setShowBirthdayEnding(false);
    setShowSpecialPhoto(false);
    setStage('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0B0908] text-[#F3EBDD] selection:bg-[#A88A62]/30">
      {/* Background Ambience (Film grain & subtle floating dust motes) */}
      <BackgroundEffects />

      {/* Screen 01: Entry Screen */}
      {stage === 'entry' && (
        <EntryScreen onEnter={handleEnterArchive} />
      )}

      {/* Cinematic Story Scroll (Screens 02 to 06) */}
      {stage === 'story' && (
        <main className="relative z-10 pt-12 pb-24">
          <ArchiveNav
            currentSection={currentSection}
            onJumpToSection={handleJumpToSection}
          />

          {/* Screen 02: First Meet (Photo 01) */}
          <FirstMeetSection />

          {/* Screen 03: Unforgettable Memories (Photos 02, 03, 04) */}
          <UnforgettableSection />

          {/* Screen 04: Handholding Moments (Photos 05, 06) */}
          <HandholdingSection />

          {/* Screen 05: Pinky Promise (Photo 07) */}
          <PinkyPromiseSection />

          {/* Screen 05.5: Personal Letter */}
          <PersonalLetterSection />

          {/* Screen 06: Final Question (Line-by-line reveal, NO Photo 08) */}
          <FinalQuestionSection onYesClicked={handleFinalQuestionYes} />
        </main>
      )}

      {/* Screen 07: Special Photo Reveal & Recreate The Moment (Photo 08 strictly isolated) */}
      {showSpecialPhoto && (
        <SpecialPhotoSection onSecondYes={handleSecondYes} />
      )}

      {/* Screen 08: Birthday Ending */}
      {showBirthdayEnding && (
        <BirthdayEndingSection onRevisitArchive={handleRevisitArchive} />
      )}
    </div>
  );
};

export default App;
