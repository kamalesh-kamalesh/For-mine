/**
 * THE PATTU ARCHIVE — FINAL APPROVED CONFIGURATION
 * Revolves strictly around the EXACT 8 REAL PHOTOGRAPHS.
 */

export interface ArchiveConfig {
  recipient: {
    name: string;
    nickname: string;
  };
  entry: {
    code: string;
    title: string;
    lead: string[];
    question: string;
    yesText: string;
    noText: string;
  };
  firstMeet: {
    tag: string;
    title: string;
    photo: string;
    quote1: string;
    quote2: string;
  };
  unforgettable: {
    title: string;
    label: string;
    memories: {
      photo: string;
      caption: string;
      layout: 'large' | 'offset' | 'large2';
      id: string;
    }[];
  };
  handholding: {
    title: string;
    label: string;
    photos: {
      photo: string;
      id: string;
    }[];
    statement: string;
  };
  pinkyPromise: {
    title: string;
    label: string;
    photo: string;
    lead: string;
    caption: string;
  };
  personalLetter: {
    tag: string;
    title: string;
    subtitle: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postscript: string;
    envelopePrompt: string;
  };
  finalQuestion: {
    lead: string;
    lines: string[];
    yesText: string;
    noText: string;
  };
  specialPhoto: {
    badge: string;
    photo: string;
    recreateQuestion: string;
    yesText: string;
    noText: string;
  };
  promiseConfirmation: {
    statement: string;
  };
  finalBirthday: {
    badge: string;
    prefix: string;
    name: string;
    closingLines: string[];
  };
}

export const archiveData: ArchiveConfig = {
  recipient: {
    name: "Pattu",
    nickname: "Pattu 🤎🦋",
  },

  entry: {
    code: "ARCHIVE // 001",
    title: "for mine 🦋🤎",
    lead: [
      "A few moments.",
      "A few memories.",
      "And something I wanted you to see.",
    ],
    question: "Do you want to go inside?",
    yesText: "YES 🤎",
    noText: "NO",
  },

  firstMeet: {
    tag: "01 / THE BEGINNING",
    title: "THE FIRST MEET",
    photo: "/images/first-meet.jpg",
    quote1: "Every story has a first moment.",
    quote2: "This was ours.",
  },

  unforgettable: {
    title: "UNFORGETTABLE",
    label: "03 MOMENTS / NEVER FORGOTTEN",
    memories: [
      {
        id: "MEMORY_001",
        photo: "/images/memory-01.jpg",
        caption: "The little things that meant everything.",
        layout: "large",
      },
      {
        id: "MEMORY_002",
        photo: "/images/memory-02.jpg",
        caption: "Our kind of quiet laughter.",
        layout: "offset",
      },
      {
        id: "MEMORY_003",
        photo: "/images/memory-03.jpg",
        caption: "A day etched into time.",
        layout: "large2",
      },
    ],
  },

  handholding: {
    title: "BETWEEN US",
    label: "TWO HANDS / ONE FEELING",
    photos: [
      {
        id: "HANDS_001",
        photo: "/images/handholding-01.jpg",
      },
      {
        id: "HANDS_002",
        photo: "/images/handholding-02.jpg",
      },
    ],
    statement: "Some things don't need words.",
  },

  pinkyPromise: {
    title: "THE PROMISE",
    label: "PROMISE / PRESERVED",
    photo: "/images/pinky-promise.jpg",
    lead: "Some promises don't need a thousand words.",
    caption: "Just a little promise worth remembering.",
  },

  personalLetter: {
    tag: "05 / CONFIDENTIAL & PRECIOUS",
    title: "A PERSONAL LETTER",
    subtitle: "A few words kept close to the heart",
    date: "October // ARCHIVED WITH CARE",
    salutation: "Pattu 🤎🦋... En chello 😘... En thanga pulla 🦋🤎🫶🏻... En thangooo 🎀...",
    paragraphs: [
      "Ena paakura? Iniku unaku special day-aa nu therila... because unakku epdi irukunu unakku dhaan theriyum. But enakku iniku romba romba romba special day... because en chello porandha naal 🤎🦋🎂",
      "Nee porandhadhu yaarukku luck-o enakku theriyadhu... but naa romba lucky because nee enakkaga porandha oruthi 🫶🏻🤎",
      "Nee en life-la vandhadhukku approm dhaan, en life-la neraya changes nadandhuchu. Naa romba romba happy-aa feel panna start pannadhuvum unakku theriyum. Idhellam mostly phone-la dhaan nadandhirundhaalum, namakku neraya aasai irukku... onna irukkanum, disturb illama neraya moments share pannanum nu. Adhu eppo nadakkum nu theriyala... aana oru naal kandippa nadakkum. 🦋",
      "Aana namakku kidaicha andha sila unexpected moments... ice cream shop, Karur to KKI travel, andha unexpected bus stand moment, mazhaila vanthuchu lea andhu laa sema moment... ivlo naal aagiyum en mind-la appadiye irukku. 🌧️🤎",
      "Especially un kai pudicha andha naal... adha enala marakkavea mudiyadhu. Still enakku andha feel irukku. Marubadiyum un kai pudikkanum, un shoulder-la saanjitu konja neram thoonganum, un kannatha pudikkanum, oru thadava tight-aa hug 🫂 pannanum nu aasai irukku... neraya solla mudiyadha aasaiyum irukku. 😭🤎",
      "But distance... 😣\nSometimes romba kashtama irukku.",
      "Innum enakku puriyave illa... nee epdi enna ivlo nambura nu. But one thing I promise you — un nambikkaiya naa eppovume break panna maaten. 🫳🏻🤎",
      "And... 🤔\nLife long nee enkooda irukkanum nu dhaan en biggest wish. Unkooda en life-la nadakkura ellathayum share pannanum...ellame.",
      "So... enkooda irundhuru maa 👉🏻😽👈🏻🤎🦋\n\nLove you so much maa 🫶🏻🤎\nEn last breath varaikkum, unakkaga naa iruppen Unakkaga mattu 🦋🤎",
      "I think... ippo dhaan finally solla poren 😭\n\nHappy Birthday dii Pattu 🦋🤎🎂",
      "Be happy forever.\nSmile pannitu iru.\nUn dreams ellam achieve pannu.\nAnd no matter what happens...\n\nI am always there for you. 🤎🦋",
      "Ur only mine 🤎🦋\nPurinju kooo... 😽🫶🏻"
    ],
    closing: "Once again...",
    signature: "HAPPY BIRTHDAY EN CHELLAKUTTY 🦋🤎🎂✨",
    postscript: "P.S. There is one little question I've been waiting to ask you just below… 🦋",
    envelopePrompt: "A letter written only for your eyes",
  },

  finalQuestion: {
    lead: "So, Pattu…",
    lines: [
      "Will you let me travel—",
      "through this life,",
      "with you,",
      "forever? 🤎🦋",
    ],
    yesText: "YES 🤎",
    noText: "NO 👀",
  },

  specialPhoto: {
    badge: "ONE LAST MEMORY",
    photo: "/images/special-photo.jpg",
    recreateQuestion: "Appo… indha moment-a namma once again recreate pannalama? 🥹🤎",
    yesText: "YES 🫶",
    noText: "NO 👀",
  },

  promiseConfirmation: {
    statement: "Then it's a promise.",
  },

  finalBirthday: {
    badge: "ARCHIVE COMPLETE",
    prefix: "Happy Birthday,",
    name: "Pattu",
    closingLines: [
      "One promise.",
      "One memory.",
      "And hopefully…",
      "many more to come.",
    ],
  },
};
