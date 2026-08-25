import {
  AchievementSection,
  BigProjects,
  BlogSection,
  ContactInfo,
  EducationInfo,
  GreetingInfo,
  Illustration,
  OpenSource,
  PodcastSection,
  ProjectShot,
  ResumeSection,
  SkillsSection,
  SocialMediaLinks,
  SplashScreenConfig,
  TalkSection,
  TechStack,
  TwitterDetails,
  WorkExperiences,
} from './portfolio.types';

/* Contenu du portfolio. Pour les couleurs : src/styles/_global-color.scss */

// Ecran de demarrage

export const splashScreen: SplashScreenConfig = {
  enabled: true,
  animationPath: 'assets/lottie/splashAnimation.json',
  duration: 2000,
};

// Illustrations animees (Lottie) ou SVG statiques

export const illustration: Illustration = {
  animated: true,
};

// Accroche

export const greeting: GreetingInfo = {
  username: 'BITEP Christian',
  title: "Bonjour, moi c'est Christian",
  subTitle:
    'Développeur full stack 🚀 basé à Douala. Fraîchement diplômé en génie logiciel, ' +
    'je conçois des applications web et mobiles — de la maquette au déploiement.',
  photo: 'assets/images/christian.jpg',
  resumeLink: '',
  displayGreeting: true,
};

// Reseaux sociaux

export const socialMediaLinks: SocialMediaLinks = {
  github: 'https://github.com/christian08-bit',
  linkedin: 'https://www.linkedin.com/in/christian-bitep-733a22328',
  gmail: 'christianbitep8@gmail.com',
  display: true,
};

// Competences

export const skillsSection: SkillsSection = {
  title: 'Ce que je fais',
  subTitle: 'DU DESIGN SYSTEM AU DÉPLOIEMENT, SUR LE WEB COMME SUR MOBILE',
  skills: [
    '⚡ Applications web modernes avec Angular, React, Vue 3 / Nuxt',
    '⚡ Applications mobiles avec React Native, Flutter et Java',
    '⚡ APIs et back-end en Python et Java (Spring Boot), bases PostgreSQL et MongoDB',
    '⚡ Interfaces accessibles et responsive, maquettées sur Figma',
  ],

  /* Icones Font Awesome 5 : https://fontawesome.com/v5/search?m=free */
  softwareSkills: [
    { skillName: 'html-5', fontAwesomeClassname: 'fab fa-html5', color: '#e34f26' },
    { skillName: 'css3', fontAwesomeClassname: 'fab fa-css3-alt', color: '#1572b6' },
    { skillName: 'JavaScript', fontAwesomeClassname: 'fab fa-js', color: '#f7df1e' },
    { skillName: 'Angular', fontAwesomeClassname: 'fab fa-angular', color: '#dd0031' },
    { skillName: 'React', fontAwesomeClassname: 'fab fa-react', color: '#61dafb' },
    { skillName: 'Vue.js', fontAwesomeClassname: 'fab fa-vuejs', color: '#42b883' },
    { skillName: 'Node.js', fontAwesomeClassname: 'fab fa-node', color: '#539e43' },
    { skillName: 'Python', fontAwesomeClassname: 'fab fa-python', color: '#3776ab' },
    { skillName: 'Java', fontAwesomeClassname: 'fab fa-java', color: '#f89820' },
    { skillName: 'Bases de données', fontAwesomeClassname: 'fas fa-database', color: '#00758f' },
    { skillName: 'Docker', fontAwesomeClassname: 'fab fa-docker', color: '#2496ed' },
    { skillName: 'Git', fontAwesomeClassname: 'fab fa-git-alt', color: '#f1502f' },
    { skillName: 'Mobile', fontAwesomeClassname: 'fas fa-mobile-alt', color: '#8b5cf6' },
    { skillName: 'Figma', fontAwesomeClassname: 'fab fa-figma', color: '#f24e1e' },
  ],
  display: true,
};

// Formations
// Source : attestations de reussite de l'IUT de Douala.

export const educationInfo: EducationInfo = {
  display: true,
  schools: [
    {
      schoolName: 'Institut Universitaire de Technologie — Université de Douala',
      subHeader: 'Licence de Technologie, spécialité Génie logiciel',
      duration: 'Année académique 2025 – 2026',
      desc: 'Conception et développement logiciel : architecture applicative, développement web et bases de données.',
      descBullets: ['Mention Bien', '60 crédits'],
    },
    {
      schoolName: 'Institut Universitaire de Technologie — Université de Douala',
      subHeader: 'Diplôme Universitaire de Technologie, spécialité Génie informatique',
      duration: 'Année académique 2024 – 2025',
      desc: "Fondamentaux de l'informatique : programmation, réseaux, systèmes et bases de données.",
      descBullets: ['Mention Assez bien', '120 crédits'],
    },
    {
      schoolName: 'Lycée de la Cité des Palmiers, Douala',
      subHeader: 'Baccalauréat série D',
      duration: '2022 – 2023',
      desc: 'Série scientifique à dominante sciences de la vie et de la terre.',
    },
  ],
};

// Barres de progression
// Masque : un niveau chiffre par techno ne peut venir que de toi.

export const techStack: TechStack = {
  viewSkillBars: false,
  experience: [],
  displayCodersrank: false,
};

// Experiences professionnelles
// Source : attestation de stage SOCAVER.

export const workExperiences: WorkExperiences = {
  display: true,
  experience: [
    {
      role: 'Stagiaire — Division Maintenance',
      company: 'SOCAVER — Société Camerounaise de Verrerie',
      companylogo: 'assets/images/socaver.png',
      date: 'Mai 2025 – Juin 2025',
      desc:
        'Stage académique à Douala : suivi du bon fonctionnement et entretien des ' +
        'équipements de production.',
    },
    {
      role: 'Maintenancier',
      company: "Boutique d'appareils électroniques",
      date: '2022 – 2024',
      desc:
        'Diagnostic, réparation et maintenance de matériel informatique et ' +
        "d'appareils électroniques, en contact direct avec la clientèle.",
    },
  ],
};

// Projets open source recuperes depuis GitHub
// Masque : les depots publics de christian08-bit sont vides pour l'instant,
// la section afficherait des cartes sans contenu.

export const openSource: OpenSource = {
  showGithubProfile: 'false',
  display: false,
};

// Projets

export const bigProjects: BigProjects = {
  title: 'Projets',
  subtitle: 'CE QUE JE CONSTRUIS',
  projects: [
    {
      projectName: 'MENWORK Cameroun',
      projectDesc:
        'Marketplace des services de proximité : une carte géolocalise les prestataires ' +
        'disponibles autour de vous — plomberie, électricité, santé, informatique et plus ' +
        'de 130 métiers. Profils vérifiés (identité et diplôme), mode SOS pour les urgences ' +
        '24h/24, avis clients, interface bilingue FR/EN, thème clair/sombre et application ' +
        'mobile Android.',
      screenshots: [
        {
          src: 'assets/images/projects/menwork-01-accueil.jpg',
          alt: "MENWORK — page d'accueil et recherche de services",
        },
        {
          src: 'assets/images/projects/menwork-02-services.jpg',
          alt: 'MENWORK — catalogue des services',
        },
        {
          src: 'assets/images/projects/menwork-03-metier.jpg',
          alt: 'MENWORK — prestataires par métier',
        },
        {
          src: 'assets/images/projects/menwork-04-prestataire.jpg',
          alt: "MENWORK — fiche d'un prestataire",
        },
        {
          src: 'assets/images/projects/menwork-05-flyer.jpg',
          alt: 'MENWORK — visuel de présentation',
        },
      ],
      footerLink: [{ name: 'Voir le site', url: 'https://menworkcam.com' }],
    },
    {
      projectName: 'ChatDocs OHADA',
      projectDesc:
        'Assistant de recherche juridique sur le droit OHADA et la fiscalité camerounaise. ' +
        "Chaque réponse cite l'article qui la fonde et reproduit son texte officiel, pour que " +
        "l'utilisateur puisse vérifier ; quand le corpus ne permet pas de répondre, l'assistant " +
        'le dit. Bibliothèque des textes consultable librement et application Android.',
      screenshots: [
        {
          src: 'assets/images/projects/chatdocs-01-accueil.jpg',
          alt: "ChatDocs OHADA — page d'accueil et exemple de réponse sourcée",
        },
        {
          src: 'assets/images/projects/chatdocs-02-corpus.jpg',
          alt: 'ChatDocs OHADA — bibliothèque du corpus',
        },
        {
          src: 'assets/images/projects/chatdocs-03-methodologie.jpg',
          alt: 'ChatDocs OHADA — méthodologie',
        },
        {
          src: 'assets/images/projects/chatdocs-04-journal.jpg',
          alt: 'ChatDocs OHADA — journal des mises à jour',
        },
      ],
      footerLink: [{ name: 'Voir le site', url: 'https://chatdocs-web.onrender.com' }],
    },
    {
      projectName: 'findMe — GeoLink Africa',
      projectDesc:
        "Portail grand public d'adressage urbain et périurbain (Nuxt 4 / Vue 3, TypeScript, " +
        'Tailwind 4, Pinia). Carte interactive Leaflet, adresses numériques avec photo, ' +
        'export PDF et QR code, dashboard administrateur, multilingue FR/EN, thème ' +
        'clair/sombre, mobile-first et accessible WCAG AA. Back-end simulé par un serveur Nitro.',
      screenshots: [
        { src: 'assets/images/projects/findme-01-accueil.jpg', alt: "findMe — page d'accueil" },
        {
          src: 'assets/images/projects/findme-03-inscription.jpg',
          alt: 'findMe — création de compte',
        },
        { src: 'assets/images/projects/findme-02-contact.jpg', alt: 'findMe — contact et support' },
      ],
      footerLink: [
        { name: 'Voir le code', url: 'https://github.com/christian08-bit/Projet-Cabrel' },
      ],
    },
    {
      projectName: 'CotisantéCM',
      projectDesc:
        "Plateforme d'assurance maladie à cotisation volontaire pour le Cameroun " +
        '(Angular, .NET 10, PostgreSQL, architecture en couches). Souscription avec ' +
        "vérification d'identité, cotisation par mobile money, crédit sanitaire quand le " +
        "solde est insuffisant au moment des soins, carte d'assuré numérique, portail pour " +
        'les structures de santé et espace administrateur. Fonctionne hors connexion (PWA) ' +
        'et gère plusieurs langues.',
      screenshots: [
        {
          src: 'assets/images/projects/cotisante-01-accueil.jpg',
          alt: "CotisantéCM — page d'accueil et carte d'assuré",
        },
        {
          src: 'assets/images/projects/cotisante-02-tableau-de-bord.jpg',
          alt: "CotisantéCM — tableau de bord de l'assuré",
        },
        {
          src: 'assets/images/projects/cotisante-03-cotiser.jpg',
          alt: 'CotisantéCM — cotisation par mobile money',
        },
        {
          src: 'assets/images/projects/cotisante-04-carte.jpg',
          alt: "CotisantéCM — carte d'assuré numérique",
        },
        {
          src: 'assets/images/projects/cotisante-05-portail-partenaire.jpg',
          alt: 'CotisantéCM — portail des structures de santé',
        },
        {
          src: 'assets/images/projects/cotisante-06-admin.jpg',
          alt: 'CotisantéCM — espace administrateur',
        },
      ],
    },
    {
      projectName: 'DIMFitness',
      projectDesc:
        "Plateforme de gestion d'une salle de sport, en monorepo Nx : API NestJS avec " +
        'Prisma et PostgreSQL, front Angular en PWA. Suivi des sportifs, planning, ' +
        'nutrition assistée, séances en direct, facturation, gestion du personnel et de la ' +
        'paie, comptabilité de trésorerie. 601 tests automatisés.',
      screenshots: [
        {
          src: 'assets/images/projects/dimfitness-01-logo.jpg',
          alt: 'DIMFitness — identité visuelle',
        },
      ],
    },
  ],
  display: true,
};

// Certifications et distinctions
// Masque tant que je n'ai pas les intitules et les justificatifs.

export const achievementSection: AchievementSection = {
  title: 'Certifications 🏆',
  subtitle: '',
  achievementsCards: [],
  display: false,
};

// Articles de blog

export const blogSection: BlogSection = {
  title: 'Articles',
  subtitle: '',
  displayMediumBlogs: 'false',
  blogs: [],
  display: false,
};

// Conferences

export const talkSection: TalkSection = {
  title: 'CONFÉRENCES',
  subtitle: '',
  talks: [],
  display: false,
};

// Podcasts

export const podcastSection: PodcastSection = {
  title: 'Podcast 🎙️',
  subtitle: '',
  podcast: [],
  display: false,
};

// CV

export const resumeSection: ResumeSection = {
  title: 'CV',
  subtitle: 'Télécharger mon CV',
  display: false,
};

// Contact

export const contactInfo: ContactInfo = {
  title: 'Me contacter ☎️',
  subtitle: 'Un projet à discuter, ou juste envie de dire bonjour ? Ma boîte est ouverte.',
  number: '+237 690 70 34 89',
  email_address: 'christianbitep8@gmail.com',
};

// Formulaire de contact
//
// Un site statique ne peut pas envoyer d'e-mail tout seul : il lui faut un
// service qui recoive le formulaire. Colle ici l'URL fournie par Formspree,
// Web3Forms, Brevo ou equivalent — le message partira alors directement,
// sans que le visiteur quitte la page.
//
// Tant que ce champ est vide, le formulaire ouvre le logiciel de messagerie
// du visiteur avec le message pre-rempli : il fonctionne, sans inscription.

export const contactForm = {
  endpoint: '',
};

// Twitter

export const twitterDetails: TwitterDetails = {
  userName: '',
  display: false,
};

// « Ouvert aux opportunites : Oui/Non » sur la carte de profil GitHub
export const isHireable = true;
