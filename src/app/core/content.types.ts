/** Modele de contenu du portfolio. Tout le texte du site vient de content.ts. */

export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  /** Nom affiche en grand. */
  displayName: string;
  /** Nom complet, tel qu'il figure sur les diplomes et le CV. */
  legalName: string;
  role: string;
  pitch: string;
  location: string;
  /** Fin de la phrase « Je construis des … », qui defile dans le haut de page. */
  roles: string[];
  email: string;
  phone: string;
  /** Photo d'origine (fond blanc) : partage sur les reseaux, donnees structurees. */
  photo: string;
  /** Meme photo detouree (WebP transparent), affichee sur le site. */
  portrait: string;
  resume: string;
  siteUrl: string;
  github: string;
  linkedin: string;
  languages: { name: string; level: string }[];
}

export interface Screenshot {
  src: string;
  alt: string;
  /** Ratio largeur / hauteur, pour reserver la place et eviter les sauts de mise en page. */
  ratio?: number;
}

export type ProjectStatus = 'live' | 'source' | 'private';

export interface CaseStudy {
  id: string;
  name: string;
  /** Une ligne, affichee dans l'index du haut de page. */
  summary: string;
  status: ProjectStatus;
  /** Domaine affiche dans l'index (sans https://). */
  domain?: string;
  platforms: string[];
  problem: string;
  built: string[];
  decisions: string[];
  stack: string[];
  links: Link[];
  shots: Screenshot[];
}

export interface Experience {
  org: string;
  role: string;
  kind: 'Emploi' | 'Stage' | 'Formation';
  period: string;
  place: string;
  summary: string;
  highlights: string[];
}

export interface ExpertiseArea {
  name: string;
  icon: 'layout' | 'server' | 'mobile' | 'sparkles' | 'database' | 'cloud' | 'pen';
  description: string;
  tools: string[];
  /** Identifiants de CaseStudy ou chaines libres : la preuve de la competence. */
  provenIn: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  /** Duree ou volume horaire indique sur le certificat. */
  length: string;
  credentialId?: string;
  note?: string;
  pdf: string;
  thumbnail: string;
}

export interface Degree {
  title: string;
  school: string;
  period: string;
  detail?: string;
}

export interface Stat {
  value: number;
  label: string;
}
