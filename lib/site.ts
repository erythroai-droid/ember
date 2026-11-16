// Site + scroll-film config in one place.
// The film: one master video cut into WebP frame packs. The frames sit fixed behind the page and are scrubbed by the scroll;
// the content sections scroll over them in normal flow. Each scene says which frame the film shows when that section's top
// reaches the top of the screen; between two scenes the film plays through the frames in between.

/** Frames per pack (same count in every pack). Re-extract with `npm run frames` and update this. */
// Every 2nd video frame (smooth without blending neighbours). The video's last ~3 s are a still plate with drifting
// specks — that tail is cut (frames 212–237 deleted): the film ends where the motion ends and then simply holds.
export const FRAMES = 211;

/** Landscape packs for wide screens, a centre-cropped portrait pack for phones. */
export const FRAME_DIR = '/frames/assembly';
export const PORTRAIT_DIR = '/frames/portrait/540';

/**
 * Frames are served with Cache-Control: immutable (next.config.mjs), so a re-extract under the same file names would mix old
 * cached frames with new ones in returning browsers. Bump this on every re-extract — it goes into every frame URL.
 */
export const FRAMES_VERSION = '2-211';

export const BRAND = 'EMBER';
export const MODEL = 'Steakhouse';

/** Production URL: canonical, Open Graph, sitemap. NEXT_PUBLIC_SITE_URL overrides it per Vercel environment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ember-steakhouse.erythro.ai').replace(/\/$/, '');

/** Page title / description (also the Open Graph + Twitter card text). */
export const TITLE = `${BRAND} ${MODEL} — dry-aged steaks cooked over live fire`;
export const DESCRIPTION = `${BRAND} ${MODEL}: 28-day dry-aged ribeye, a charcoal grill at 400 °C and cast-iron service. Reserve a table.`;

/**
 * Scenes in page order. id = section anchor, f = film frame at the section's top, i18n prefix = id.
 * Frame numbers in the every-2nd pack: 0–27 steak on the grill in flames · 27–75 lifts off with rosemary and garlic ·
 * 75–144 sliced over the fire · 144–210 lands on the cast-iron plate and settles.
 * The film reaches its last frame as the finale section arrives; from there it holds and only the content scrolls.
 */
export const LAST_FRAME = FRAMES - 1;
export const SCENES = [
  { id: 'top', f: 0 },
  { id: 'craft', f: 27 },
  { id: 'cuts', f: 75 },
  { id: 'feast', f: 144 },
  { id: 'experience', f: LAST_FRAME },
] as const;

/** Menu on the cuts scene: i18n cut{n}n / cut{n}d, weight in grams. */
export const CUTS = [
  { n: 1, g: 350 },
  { n: 2, g: 300 },
  { n: 3, g: 200 },
  { n: 4, g: 1200 },
] as const;

/**
 * Gallery: client photos (originals in /Foto) as WebP in /public/gallery at 1000 and 2000 px; a = width / height; i18n gal{n}.
 * Prints lie scattered on a stone table. d = desktop spot, m = phone spot: x / y = centre of the print in % of the table
 * (x from the start side, so RTL mirrors it), w = print width in vw, r = rotation in degrees. Later prints lie on top.
 */
export const GALLERY = [
  { n: 1, src: '/gallery/steak-1', a: 5189 / 2594, d: { x: 31, y: 64, w: 30, r: -7 }, m: { x: 50, y: 9, w: 82, r: -4 } },
  { n: 2, src: '/gallery/steak-2', a: 6000 / 4000, d: { x: 55, y: 38, w: 22, r: 5 }, m: { x: 42, y: 28, w: 66, r: 6 } },
  { n: 3, src: '/gallery/steak-3', a: 4930 / 2993, d: { x: 74, y: 66, w: 24, r: -4 }, m: { x: 58, y: 48, w: 68, r: -5 } },
  { n: 4, src: '/gallery/steak-4', a: 6720 / 4480, d: { x: 50, y: 78, w: 19, r: 9 }, m: { x: 44, y: 68, w: 62, r: 7 } },
  { n: 5, src: '/gallery/steak-5', a: 6000 / 4000, d: { x: 84, y: 30, w: 19, r: -10 }, m: { x: 56, y: 88, w: 66, r: -6 } },
] as const;

export const landscapePath = (size: number, i: number) =>
  `${FRAME_DIR}/${size}/frame_${String(Math.max(0, Math.min(FRAMES - 1, Math.round(i))) + 1).padStart(4, '0')}.webp?v=${FRAMES_VERSION}`;
export const portraitPath = (i: number) =>
  `${PORTRAIT_DIR}/frame_${String(Math.max(0, Math.min(FRAMES - 1, Math.round(i))) + 1).padStart(4, '0')}.webp?v=${FRAMES_VERSION}`;

export const pad = (n: number) => String(n).padStart(2, '0');
