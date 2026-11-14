import fs from 'node:fs';
import path from 'node:path';
// Normalize an image path for <Pic>: legacy "/img/x" (no extension, .webp+.jpg exist) stays as is;
// "/img/x.jpg" with a sibling .webp becomes "/img/x" so Pic serves WebP; anything else keeps its extension.
export function normImage(p?: string | null): string | undefined {
  if (!p) return undefined;
  const m = p.match(/^(.*)\.(jpe?g)$/i);
  if (m && m[2].toLowerCase() === 'jpg' && fs.existsSync(path.join(process.cwd(), 'public', `${m[1]}.webp`))) return m[1];
  return p;
}
