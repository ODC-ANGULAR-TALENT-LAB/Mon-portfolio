import {
  siAndroid,
  siAngular,
  siCss,
  siDatacamp,
  siDocker,
  siDotnet,
  siFigma,
  siFlutter,
  siGit,
  siGithubactions,
  siHtml5,
  siJavascript,
  siKubernetes,
  siLeaflet,
  siMongodb,
  siMysql,
  siNestjs,
  siNodedotjs,
  siNuxt,
  siNx,
  siOpenjdk,
  siOrange,
  siPinia,
  siPostgresql,
  siPrisma,
  siPwa,
  siPython,
  siReact,
  siScikitlearn,
  siSpringboot,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Registre des technologies : nom affiche -> logo + couleur de marque.
 *
 * Les logos viennent de simple-icons, importes un par un : seuls ceux listes
 * ici finissent dans le bundle (quelques Ko, pas les 3000 du paquet).
 * Les marques absentes de simple-icons (AWS, Adobe, Excel...) recoivent un
 * pictogramme generique ou un monogramme dans leur couleur.
 */
export interface Tech {
  label: string;
  hex: string;
  /** Trace SVG (viewBox 0 0 24 24), ou absent si monogramme. */
  path?: string;
  /** Une ou deux lettres quand il n'existe pas de logo. */
  mono?: string;
}

const brand = (icon: SimpleIcon, label = icon.title): Tech => ({
  label,
  hex: `#${icon.hex}`,
  path: icon.path,
});

/* Pictogrammes maison (viewBox 24) pour les notions qui ne sont pas des marques. */
const GLYPH = {
  sparkles:
    'M10 2l1.9 5.6L17.5 9.5l-5.6 1.9L10 17l-1.9-5.6L2.5 9.5l5.6-1.9L10 2Zm8 10 1 2.9 2.9 1-2.9 1L18 20l-1-2.9-2.9-1 2.9-1L18 12Z',
  cloud: 'M6.5 19A4.5 4.5 0 0 1 6 10.03 6 6 0 0 1 17.65 8.5 5.25 5.25 0 0 1 17.25 19H6.5Z',
  pin: 'M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  globe:
    'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm2.93 11H9.07c.17 2.6.98 4.83 2.93 6.82 1.95-1.99 2.76-4.22 2.93-6.82Zm5.02 0h-3.01a13.3 13.3 0 0 1-2.03 6.57A8 8 0 0 0 19.95 13ZM7.06 13H4.05a8 8 0 0 0 5.04 6.57A13.3 13.3 0 0 1 7.06 13Zm7.87-2C14.76 8.4 13.95 6.17 12 4.18 10.05 6.17 9.24 8.4 9.07 11h5.86Zm-5.84-6.57A8 8 0 0 0 4.05 11h3.01a13.3 13.3 0 0 1 2.03-6.57Zm5.82 0A13.3 13.3 0 0 1 16.94 11h3.01a8 8 0 0 0-5.04-6.57Z',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v13h10V5H7Zm5 14.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  chart: 'M3 3h2v16h16v2H3V3Zm4 10h3v4H7v-4Zm5-5h3v9h-3V8Zm5-3h3v12h-3V5Z',
} as const;

const glyph = (label: string, path: string, hex: string): Tech => ({ label, path, hex });
const mono = (label: string, letters: string, hex: string): Tech => ({ label, mono: letters, hex });

export const TECH: Record<string, Tech> = {
  // Front-end
  Angular: brand(siAngular),
  React: brand(siReact),
  'Vue.js': brand(siVuedotjs),
  Nuxt: brand(siNuxt),
  'Nuxt 4': brand(siNuxt, 'Nuxt 4'),
  'Vue 3': brand(siVuedotjs, 'Vue 3'),
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript),
  'Tailwind CSS': brand(siTailwindcss),
  'Tailwind 4': brand(siTailwindcss, 'Tailwind 4'),
  HTML5: brand(siHtml5),
  CSS: brand(siCss),
  Pinia: brand(siPinia),
  Leaflet: brand(siLeaflet),
  PWA: brand(siPwa),

  // Back-end
  'Node.js': brand(siNodedotjs),
  NestJS: brand(siNestjs),
  '.NET': brand(siDotnet),
  '.NET 10': brand(siDotnet, '.NET 10'),
  'Spring Boot': brand(siSpringboot),
  Java: brand(siOpenjdk, 'Java'),
  Python: brand(siPython),
  Prisma: brand(siPrisma),

  // Mobile
  'React Native': brand(siReact, 'React Native'),
  Flutter: brand(siFlutter),
  Android: brand(siAndroid),

  // Donnees
  PostgreSQL: brand(siPostgresql),
  MySQL: brand(siMysql),
  MongoDB: brand(siMongodb),
  SQLite: brand(siSqlite),

  // IA et data
  RAG: glyph('RAG', GLYPH.sparkles, '#8b5cf6'),
  'IA générative': glyph('IA générative', GLYPH.sparkles, '#d946ef'),
  'Machine learning': brand(siScikitlearn, 'Machine learning'),
  Excel: mono('Excel et Power Query', 'X', '#217346'),

  // Cloud et livraison
  Git: brand(siGit),
  Docker: brand(siDocker),
  Kubernetes: brand(siKubernetes),
  'CI/CD': brand(siGithubactions, 'CI/CD'),
  AWS: glyph('AWS (fondamentaux)', GLYPH.cloud, '#ff9900'),
  Vercel: brand(siVercel),
  Nx: brand(siNx),

  // Design
  Figma: brand(siFigma),
  Photoshop: mono('Photoshop', 'Ps', '#31a8ff'),
  Illustrator: mono('Illustrator', 'Ai', '#ff9a00'),

  // Notions produit
  Web: glyph('Web', GLYPH.globe, '#0e7a5c'),
  'Mobile money': glyph('Mobile money', GLYPH.phone, '#f59e0b'),
  Géolocalisation: glyph('Géolocalisation', GLYPH.pin, '#ef4444'),
  'Bilingue FR/EN': glyph('Bilingue FR/EN', GLYPH.globe, '#3b82f6'),
  Mobile: glyph('Mobile', GLYPH.phone, '#8b5cf6'),
  Analyse: glyph('Analyse de données', GLYPH.chart, '#0ea5e9'),

  // Emetteurs de certificats
  DataCamp: brand(siDatacamp),
  Orange: brand(siOrange, 'Orange Digital Center'),
};

/** Technologie connue, ou monogramme neutre construit a partir du nom. */
export function tech(name: string): Tech {
  return TECH[name] ?? mono(name, name.slice(0, 2), '#64748b');
}

/** Bandeau defilant : les technologies du quotidien, dans l'ordre d'affichage. */
export const MARQUEE_ROWS: string[][] = [
  ['Angular', 'TypeScript', 'React', 'Vue.js', 'Nuxt', 'Tailwind CSS', 'HTML5', 'CSS', 'PWA', 'Flutter', 'Android', 'Figma'],
  ['Node.js', 'NestJS', '.NET', 'Spring Boot', 'Python', 'Prisma', 'PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'Kubernetes', 'Git', 'Vercel', 'Nx'],
];

/** Logos en orbite autour du portrait. */
export const ORBIT = ['Angular', 'React', 'NestJS', 'PostgreSQL', 'Docker', 'Python', 'Flutter', 'TypeScript', '.NET', 'Figma'];
