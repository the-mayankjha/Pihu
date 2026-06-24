import * as React from 'react';

export function LiquidGlassSVGProvider() {
  const feImageRef = React.useRef<SVGFEImageElement>(null);

  React.useEffect(() => {
    if (!feImageRef.current) return;
    
    fetch("https://essykings.github.io/JavaScript/map.png")
      .then((response) => response.blob())
      .then((blob) => {
        const objURL = URL.createObjectURL(blob);
        if (feImageRef.current) {
          feImageRef.current.setAttribute("href", objURL);
        }
      })
      .catch(err => console.error("Failed to load displacement map", err));
  }, []);

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <filter
        id="liquid-glass-filter"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        primitiveUnits="objectBoundingBox"
      >
        <feImage
          ref={feImageRef}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          result="map"
          preserveAspectRatio="none"
        />
        <feDisplacementMap
          id="disp"
          in="SourceGraphic"
          in2="map"
          scale="0.03"
          xChannelSelector="R"
          yChannelSelector="G"
        ></feDisplacementMap>
      </filter>
    </svg>
  );
}
