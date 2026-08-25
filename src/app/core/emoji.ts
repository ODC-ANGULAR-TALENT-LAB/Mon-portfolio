import { EMOJI_RE } from './emoji-regex';

export interface EmojiTextPart {
  kind: 'text';
  value: string;
}

export interface EmojiImagePart {
  kind: 'emoji';
  /** Point(s) de code au format twemoji, ex. "1f44b". */
  icon: string;
  /** Caracteres d'origine, utilises comme texte alternatif. */
  match: string;
  src: string;
}

export type EmojiPart = EmojiTextPart | EmojiImagePart;

// Images twemoji 14.0.2, hebergees dans le projet (public/assets/twemoji).
// Seuls les emoji reellement utilises sont embarques : 9 fichiers, 31 Ko au
// total. Voir scripts/sync-twemoji.mjs pour en ajouter.
const BASE_URL = 'assets/twemoji/';
const EXT = '.png';

/** toCodePoint() de react-easy-emoji. */
function toCodePoint(unicodeSurrogates: string, sep = '-'): string {
  const r: string[] = [];
  let c = 0;
  let p = 0;
  let i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
      p = 0;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(sep);
}

const UFE0Fg = /️/g;
const U200D = String.fromCharCode(0x200d);

/** grabTheRightIcon() de react-easy-emoji : on retire le selecteur de variante sauf si ZWJ. */
function grabTheRightIcon(rawText: string): string {
  return toCodePoint(rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, '') : rawText);
}

/**
 * Decoupe une chaine en segments de texte et d'emoji, avec les memes URL
 * twemoji que react-easy-emoji. Le rendu est fait par le composant Emoji.
 */
export function splitEmoji(input: string): EmojiPart[] {
  const parts: EmojiPart[] = [];
  const re = new RegExp(EMOJI_RE.source, 'g');
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(input)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', value: input.slice(lastIndex, match.index) });
    }
    const icon = grabTheRightIcon(match[0]);
    parts.push({
      kind: 'emoji',
      icon,
      match: match[0],
      src: `${BASE_URL}${icon}${EXT}`,
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    parts.push({ kind: 'text', value: input.slice(lastIndex) });
  }
  return parts;
}
