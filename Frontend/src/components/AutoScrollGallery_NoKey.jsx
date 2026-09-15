/**
 * AutoScrollGallery_NoKey.jsx
 * -----------------------------------------------------------------------
 * Enterprise-style multi-row auto-scrolling image marquee for a travel
 * landing page. Light-themed. NO API KEY REQUIRED.
 *
 * DATA SOURCE: Picsum Photos (https://picsum.photos)
 * - Free, unauthenticated, real licensed photography CDN.
 * - No signup, no key, no rate-limit setup.
 * - Trade-off: images are random high-quality photography, not
 *   keyword-searchable by category (no "mountains"/"temple" query).
 *   Every image is real and different, just not guaranteed on-theme.
 *
 * Rows alternate scroll direction:
 * row 1: right→left, row 2: left→right, row 3: right→left, row 4: left→right
 * -----------------------------------------------------------------------
 */

import { useMemo } from "react";

const IMAGES_PER_ROW = 10;
const ROW_COUNT = 4;
const CARD_WIDTH = 260;
const CARD_HEIGHT = 160;

// Deterministic seeds so the same "different" images load every time
// (no flash of blank rows, no network round-trip needed before paint)
function buildRowImages(rowIndex) {
  return Array.from({ length: IMAGES_PER_ROW }, (_, i) => {
    const seed = `travelrow${rowIndex}-${i}`;
    return `https://picsum.photos/seed/${seed}/${CARD_WIDTH * 2}/${CARD_HEIGHT * 2}`;
  });
}

function ScrollRow({ images, reverse, speedSeconds }) {
  const looped = [...images, ...images]; // seamless loop, no jump

  return (
    <div className="asg-row-track-wrapper">
      <div
        className={`asg-row-track ${reverse ? "asg-reverse" : ""}`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {looped.map((src, i) => (
          <div className="asg-card" key={i}>
            <img src={src} alt="" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AutoScrollGallery() {
  // useMemo so image URLs don't regenerate (and re-fetch) on re-renders
  const rows = useMemo(
    () => Array.from({ length: ROW_COUNT }, (_, r) => buildRowImages(r)),
    []
  );

  return (
    <div className="asg-container">
      {rows.map((imgs, idx) => (
        <ScrollRow
          key={idx}
          images={imgs}
          reverse={idx % 2 === 1}
          speedSeconds={55}
        />
      ))}

      <style>{`
        .asg-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          overflow: hidden;
          background: #F7F6F3;
          padding: 24px 0;
        }

        .asg-row-track-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .asg-row-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation-name: asg-scroll-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .asg-row-track.asg-reverse {
          animation-name: asg-scroll-right;
        }

        @keyframes asg-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes asg-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .asg-card {
          flex: 0 0 auto;
          width: 260px;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          background: #EFEDE7;
        }

        .asg-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .asg-row-track {
            animation: none;
          }
        }

        .asg-row-track-wrapper:hover .asg-row-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
