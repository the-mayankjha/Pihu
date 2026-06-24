const width = 336;
const height = 96;
const actualBorder = Math.min(width, height) * 0.035;
const svgStr = `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blurFilter">
            <feGaussianBlur stdDeviation="11" />
          </filter>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
        <rect x="0" y="0" width="${width}" height="${height}" rx="32" fill="url(#red)" />
        <rect x="0" y="0" width="${width}" height="${height}" rx="32" fill="url(#blue)" style="mix-blend-mode: difference" />
        <rect x="${actualBorder}" y="${actualBorder}" width="${Math.max(0, width - actualBorder * 2)}" height="${Math.max(0, height - actualBorder * 2)}" rx="28" fill="#808080" fill-opacity="0.93" filter="url(#blurFilter)" />
      </svg>
    `.replace(/\s+/g, ' ').trim();

console.log(`data:image/svg+xml,${encodeURIComponent(svgStr)}`);
