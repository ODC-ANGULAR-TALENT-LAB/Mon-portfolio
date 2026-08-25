/** Types des donnees de portfolio.ts (equivalent typé de l'ancien portfolio.js). */

export interface SplashScreenConfig {
  enabled: boolean;
  animationPath: string;
  duration: number;
}

export interface Illustration {
  animated: boolean;
}

export interface GreetingInfo {
  username: string;
  title: string;
  subTitle: string;
  /** Photo de profil : remplace l'illustration animee quand elle est fournie. */
  photo?: string;
  resumeLink: string;
  displayGreeting: boolean;
}

export interface SocialMediaLinks {
  [key: string]: string | boolean | undefined;
  display: boolean;
}

export interface SoftwareSkillItem {
  skillName: string;
  fontAwesomeClassname: string;
  /** Couleur de marque de la techno. Sans elle, l'icone reste grise. */
  color?: string;
}

export interface SkillsSection {
  title: string;
  subTitle: string;
  skills: string[];
  softwareSkills: SoftwareSkillItem[];
  display: boolean;
}

export interface School {
  schoolName: string;
  logo?: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

export interface EducationInfo {
  display: boolean;
  schools: School[];
}

export interface TechStack {
  viewSkillBars: boolean;
  experience: { Stack: string; progressPercentage: string }[];
  displayCodersrank: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  /** Optionnel : sans logo, la carte affiche juste le bandeau et le nom. */
  companylogo?: string;
  date: string;
  desc: string;
  descBullets?: string[];
}

export interface WorkExperiences {
  display: boolean;
  experience: ExperienceItem[];
}

export interface OpenSource {
  showGithubProfile: string;
  display: boolean;
}

export interface FooterLink {
  name: string;
  url: string;
}

export interface ProjectShot {
  src: string;
  alt: string;
}

export interface BigProject {
  /** Image unique (compatibilite avec le template d'origine). */
  image?: string;
  /** Captures d'ecran : la premiere sert de visuel principal. */
  screenshots?: ProjectShot[];
  projectName: string;
  projectDesc: string;
  footerLink?: FooterLink[];
}

export interface BigProjects {
  title: string;
  subtitle: string;
  projects: BigProject[];
  display: boolean;
}

export interface AchievementCardData {
  title: string;
  subtitle: string;
  image: string;
  imageAlt?: string;
  footerLink: FooterLink[];
}

export interface AchievementSection {
  title: string;
  subtitle: string;
  achievementsCards: AchievementCardData[];
  display: boolean;
}

export interface BlogEntry {
  url: string;
  title: string;
  description: string;
  image?: string;
}

export interface BlogSection {
  title: string;
  subtitle: string;
  displayMediumBlogs: string;
  blogs: BlogEntry[];
  display: boolean;
}

export interface Talk {
  title: string;
  subtitle: string;
  slides_url: string;
  event_url: string;
  image?: string;
}

export interface TalkSection {
  title: string;
  subtitle: string;
  talks: Talk[];
  display: boolean;
}

export interface PodcastSection {
  title: string;
  subtitle: string;
  podcast: string[];
  display: boolean;
}

export interface ResumeSection {
  title: string;
  subtitle: string;
  display: boolean;
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  number?: string;
  email_address: string;
}

export interface TwitterDetails {
  userName: string;
  display: boolean;
}
