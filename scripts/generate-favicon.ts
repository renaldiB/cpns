import fs from 'node:fs';
import path from 'node:path';

function createIco(size: number = 32): Buffer {
  const width = size;
  const height = size;
  const xorSize = width * height * 4;
  const andRowBytes = Math.ceil(width / 32) * 4;
  const andSize = andRowBytes * height;
  const bmpHeaderSize = 40;
  const imageSize = bmpHeaderSize + xorSize + andSize;

  const buffer = Buffer.alloc(6 + 16 + imageSize);

  // ICONDIR
  buffer.writeUInt16LE(0, 0); // Reserved
  buffer.writeUInt16LE(1, 2); // ICO type (1)
  buffer.writeUInt16LE(1, 4); // 1 image

  // ICONDIRENTRY
  buffer.writeUInt8(width === 256 ? 0 : width, 6);
  buffer.writeUInt8(height === 256 ? 0 : height, 7);
  buffer.writeUInt8(0, 8); // Color palette
  buffer.writeUInt8(0, 9); // Reserved
  buffer.writeUInt16LE(1, 10); // Color planes
  buffer.writeUInt16LE(32, 12); // Bits per pixel
  buffer.writeUInt32LE(imageSize, 14); // Image size in bytes
  buffer.writeUInt32LE(22, 18); // Offset to image data (6 + 16)

  // BITMAPINFOHEADER
  let offset = 22;
  buffer.writeUInt32LE(bmpHeaderSize, offset); // biSize
  buffer.writeInt32LE(width, offset + 4); // biWidth
  buffer.writeInt32LE(height * 2, offset + 8); // biHeight (doubled for ICO XOR+AND)
  buffer.writeUInt16LE(1, offset + 12); // biPlanes
  buffer.writeUInt16LE(32, offset + 14); // biBitCount
  buffer.writeUInt32LE(0, offset + 16); // biCompression (BI_RGB)
  buffer.writeUInt32LE(xorSize + andSize, offset + 20); // biSizeImage
  buffer.writeInt32LE(0, offset + 24); // biXPelsPerMeter
  buffer.writeInt32LE(0, offset + 28); // biYPelsPerMeter
  buffer.writeUInt32LE(0, offset + 32); // biClrUsed
  buffer.writeUInt32LE(0, offset + 36); // biClrImportant
  offset += bmpHeaderSize;

  // Render 32x32 CAT Icon (Bottom-up BMP)
  // Base: Deep Navy/Blue (#1D4ED8 -> R:29, G:78, B:216)
  // Text: White (#FFFFFF)
  // Accent dot: Gold (#F59E0B -> R:245, G:158, B:11)
  const pixels = Buffer.alloc(xorSize);

  // Simple 5x7 font for "CAT"
  // C: 3 cols, A: 3 cols, T: 3 cols
  const glyphC = [
    [0,1,1],
    [1,0,0],
    [1,0,0],
    [1,0,0],
    [0,1,1]
  ];
  const glyphA = [
    [0,1,0],
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,0,1]
  ];
  const glyphT = [
    [1,1,1],
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [0,1,0]
  ];

  // We scale glyphs 2x: each pixel becomes 2x2.
  // Glyph height = 5 * 2 = 10px. Width = 3 * 2 = 6px.
  // Total text width = 6 (C) + 2 (space) + 6 (A) + 2 (space) + 6 (T) = 22px.
  // Center in 32x32: startX = Math.floor((32 - 22) / 2) = 5.
  // startY = Math.floor((32 - 10) / 2) = 11.

  const textMask: boolean[][] = Array.from({ length: 32 }, () => Array(32).fill(false));

  const drawGlyph = (glyph: number[][], startX: number, startY: number) => {
    for (let r = 0; r < glyph.length; r++) {
      for (let c = 0; c < glyph[r].length; c++) {
        if (glyph[r][c]) {
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const y = startY + r * 2 + dy;
              const x = startX + c * 2 + dx;
              if (y >= 0 && y < 32 && x >= 0 && x < 32) {
                textMask[y][x] = true;
              }
            }
          }
        }
      }
    }
  };

  drawGlyph(glyphC, 5, 11);
  drawGlyph(glyphA, 13, 11);
  drawGlyph(glyphT, 21, 11);

  // BMP is bottom-up: row 0 in BMP is Y = 31 (bottom of visual image)
  for (let visualY = 0; visualY < height; visualY++) {
    const bmpRow = height - 1 - visualY;
    for (let visualX = 0; visualX < width; visualX++) {
      const idx = (bmpRow * width + visualX) * 4;

      // Rounded corner check (radius = 6)
      let inside = true;
      const cornerR = 6;
      if (visualX < cornerR && visualY < cornerR) {
        const dx = cornerR - visualX;
        const dy = cornerR - visualY;
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX >= width - cornerR && visualY < cornerR) {
        const dx = visualX - (width - cornerR - 1);
        const dy = cornerR - visualY;
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX < cornerR && visualY >= height - cornerR) {
        const dx = cornerR - visualX;
        const dy = visualY - (height - cornerR - 1);
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX >= width - cornerR && visualY >= height - cornerR) {
        const dx = visualX - (width - cornerR - 1);
        const dy = visualY - (height - cornerR - 1);
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      }

      if (!inside) {
        // Transparent
        pixels[idx] = 0;
        pixels[idx + 1] = 0;
        pixels[idx + 2] = 0;
        pixels[idx + 3] = 0;
        continue;
      }

      // Amber dot at (25, 6) with radius 2.5
      const dotDx = visualX - 25;
      const dotDy = visualY - 6;
      const isDot = dotDx * dotDx + dotDy * dotDy <= 6;

      // Text pixel?
      const isText = textMask[visualY][visualX];

      if (isDot) {
        // Gold: #F59E0B (B: 11, G: 158, R: 245, A: 255)
        pixels[idx] = 11;
        pixels[idx + 1] = 158;
        pixels[idx + 2] = 245;
        pixels[idx + 3] = 255;
      } else if (isText) {
        // White: #FFFFFF
        pixels[idx] = 255;
        pixels[idx + 1] = 255;
        pixels[idx + 2] = 255;
        pixels[idx + 3] = 255;
      } else {
        // Gradient Blue #2563EB -> #1D4ED8
        // VisualY 0 (top) to 31 (bottom)
        const t = visualY / 31;
        const r = Math.round(37 + (29 - 37) * t);
        const g = Math.round(99 + (78 - 99) * t);
        const b = Math.round(235 + (216 - 235) * t);
        pixels[idx] = b;
        pixels[idx + 1] = g;
        pixels[idx + 2] = r;
        pixels[idx + 3] = 255;
      }
    }
  }

  pixels.copy(buffer, offset);
  offset += xorSize;

  // AND mask: 0 = opaque, 1 = transparent
  // For transparent pixels (corners), bit = 1, otherwise 0
  const andMask = Buffer.alloc(andSize);
  for (let visualY = 0; visualY < height; visualY++) {
    const bmpRow = height - 1 - visualY;
    const rowOffset = bmpRow * andRowBytes;
    for (let visualX = 0; visualX < width; visualX++) {
      const byteIdx = rowOffset + Math.floor(visualX / 8);
      const bitIdx = 7 - (visualX % 8);

      const cornerR = 6;
      let inside = true;
      if (visualX < cornerR && visualY < cornerR) {
        const dx = cornerR - visualX;
        const dy = cornerR - visualY;
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX >= width - cornerR && visualY < cornerR) {
        const dx = visualX - (width - cornerR - 1);
        const dy = cornerR - visualY;
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX < cornerR && visualY >= height - cornerR) {
        const dx = cornerR - visualX;
        const dy = visualY - (height - cornerR - 1);
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      } else if (visualX >= width - cornerR && visualY >= height - cornerR) {
        const dx = visualX - (width - cornerR - 1);
        const dy = visualY - (height - cornerR - 1);
        if (dx * dx + dy * dy > cornerR * cornerR) inside = false;
      }

      if (!inside) {
        andMask[byteIdx] |= (1 << bitIdx);
      }
    }
  }

  andMask.copy(buffer, offset);

  return buffer;
}

const icoBuffer = createIco(32);

// Write to public/favicon.ico and app/favicon.ico
fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(process.cwd(), 'app', 'favicon.ico'), icoBuffer);

// Also copy icon.svg to public/icon.svg
const svgPath = path.join(process.cwd(), 'app', 'icon.svg');
if (fs.existsSync(svgPath)) {
  const svgContent = fs.readFileSync(svgPath);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), svgContent);
}

console.log('Successfully generated public/favicon.ico, app/favicon.ico, public/icon.svg, and public/favicon.svg');
