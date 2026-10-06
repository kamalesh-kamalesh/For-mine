import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, drawFn) {
  const rowSize = width * 4;
  const rawData = Buffer.alloc((rowSize + 1) * height);
  
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (rowSize + 1);
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a !== undefined ? a : 255;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const imagesDir = path.resolve('public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Exactly 8 photos as requested
const list = [
  { name: 'first-meet.jpg', w: 800, h: 560, type: 'first_meet' },
  { name: 'memory-01.jpg', w: 750, h: 520, type: 'memory_large' },
  { name: 'memory-02.jpg', w: 560, h: 560, type: 'memory_offset' },
  { name: 'memory-03.jpg', w: 750, h: 520, type: 'memory_large2' },
  { name: 'handholding-01.jpg', w: 700, h: 500, type: 'hands_close' },
  { name: 'handholding-02.jpg', w: 700, h: 500, type: 'hands_walk' },
  { name: 'pinky-promise.jpg', w: 800, h: 540, type: 'pinky_sunset' },
  { name: 'special-photo.jpg', w: 800, h: 560, type: 'special_secret' },
];

list.forEach(item => {
  const buf = createPng(item.w, item.h, (x, y, w, h) => {
    const ny = y / h;
    const nx = x / w;

    // Dusky warm sunset tone
    let r, g, b;
    if (ny < 0.62) {
      const t = ny / 0.62;
      r = Math.floor(45 + t * 135);
      g = Math.floor(32 + t * 75);
      b = Math.floor(42 + t * 45);
    } else {
      const t = (ny - 0.62) / 0.38;
      r = Math.floor(180 * (1 - t) + 20 * t);
      g = Math.floor(107 * (1 - t) + 16 * t);
      b = Math.floor(67 * (1 - t) + 14 * t);
    }

    // Silhouette handholding or figures
    if (item.type.includes('hands')) {
      const distToCenter = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.6) ** 2);
      if (distToCenter < 0.22) {
        r = Math.floor(r * 0.2 + 10);
        g = Math.floor(g * 0.2 + 8);
        b = Math.floor(b * 0.2 + 8);
      }
    } else if (item.type === 'first_meet' || item.type === 'special_secret') {
      const d1 = Math.sqrt((nx - 0.44) ** 2 + ((ny - 0.62) * (w / h)) ** 2);
      const d2 = Math.sqrt((nx - 0.53) ** 2 + ((ny - 0.64) * (w / h)) ** 2);
      if (d1 < 0.09 || d2 < 0.08 || (ny >= 0.65 && nx > 0.36 && nx < 0.62)) {
        r = Math.floor(r * 0.15 + 10);
        g = Math.floor(g * 0.15 + 8);
        b = Math.floor(b * 0.15 + 8);
      }
    }

    // Film grain
    const grain = ((x * 37 + y * 73) % 19) - 9;
    r = Math.min(255, Math.max(0, r + grain));
    g = Math.min(255, Math.max(0, g + grain));
    b = Math.min(255, Math.max(0, b + grain));

    // Outer photo border
    const border = 5;
    if (x < border || x >= w - border || y < border || y >= h - border) {
      return [18, 15, 13, 255];
    }

    return [r, g, b, 255];
  });

  const outPath = path.join(imagesDir, item.name);
  fs.writeFileSync(outPath, buf);
  console.log(`Generated: ${item.name} (${item.w}x${item.h})`);
});

const readmeContent = `=====================================================
THE PATTU ARCHIVE — EXACT 8 PHOTOGRAPHS REPLACEMENT GUIDE
=====================================================

The website is crafted specifically around EXACTLY 8 real photographs:

1. first-meet.jpg       -> PHOTO 01: The First Meeting
2. memory-01.jpg        -> PHOTO 02: Unforgettable Memory 1 (Large)
3. memory-02.jpg        -> PHOTO 03: Unforgettable Memory 2 (Offset)
4. memory-03.jpg        -> PHOTO 04: Unforgettable Memory 3 (Large)
5. handholding-01.jpg    -> PHOTO 05: Handholding Moment 1
6. handholding-02.jpg    -> PHOTO 06: Handholding Moment 2
7. pinky-promise.jpg    -> PHOTO 07: The Pinky Promise
8. special-photo.jpg    -> PHOTO 08: The Surprise Special Photo (Revealed ONLY after lifelong YES)

To use your real photos:
Simply copy your photos into this folder (/public/images/)
using these exact filenames.

Captions and text can be edited in: /src/config/archiveData.ts
=====================================================`;

fs.writeFileSync(path.join(imagesDir, 'README.txt'), readmeContent);
console.log('Updated README.txt for exact 8 photos inventory.');
