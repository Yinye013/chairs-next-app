'use client';

/**
 * SVG displacement filter that powers the navbar's liquid-glass refraction.
 *
 * `backdrop-filter: url(#liquid-glass)` runs this over whatever is painted
 * behind the bar, so page content genuinely bends as it scrolls underneath —
 * a blur alone only softens the backdrop, it never displaces it.
 *
 * The turbulence supplies a smooth, organic displacement field; the vertical
 * gradient in `feImage` masks it so the warp is strongest at the bottom rim
 * (where a real lens is thickest) and fades out across the face of the pane.
 */
const GlassFilter = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{
      position: 'absolute',
      width: 0,
      height: 0,
      pointerEvents: 'none',
    }}
  >
    <defs>
      <filter
        id="liquid-glass"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        colorInterpolationFilters="sRGB"
      >
        {/* Displacement field. A low baseFrequency with a single octave
            gives broad, gentle lobes: content bends along a smooth curve
            like a real lens, instead of rippling like disturbed water. */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.004 0.007"
          numOctaves={1}
          seed={12}
          result="noise"
        />
        {/* Heavy smoothing keeps the remaining variation gradual */}
        <feGaussianBlur in="noise" stdDeviation="3.5" result="softNoise" />

        {/* Push contrast in the field so the peaks displace hard instead of
            hovering around the neutral mid-grey (which means "no shift"). */}
        <feComponentTransfer in="softNoise" result="strongNoise">
          <feFuncR type="linear" slope="1.7" intercept="-0.35" />
          <feFuncG type="linear" slope="1.7" intercept="-0.35" />
        </feComponentTransfer>

        {/* Ramp: mid-grey (no displacement) at the top, full strength at the
            bottom rim where a real lens is thickest. */}
        <feImage
          href="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='96'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23808080'/%3E%3Cstop offset='0.35' stop-color='%23a0a0a0'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3Crect width='1' height='96' fill='url(%23g)'/%3E%3C/svg%3E"
          preserveAspectRatio="none"
          result="ramp"
        />

        {/* Blend the ramp into the noise so displacement grows toward the rim
            while the whole pane still bends. */}
        <feBlend
          in="strongNoise"
          in2="ramp"
          mode="multiply"
          result="edgeNoise"
        />

        {/* Bend the backdrop along that field */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="edgeNoise"
          scale="34"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

export default GlassFilter;
