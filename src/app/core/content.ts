import {
  CaseStudy,
  Certification,
  Degree,
  Experience,
  ExpertiseArea,
  Profile,
  Stat,
} from './content.types';

/*
 * Contenu du portfolio.
 *
 * Regle d'ecriture : chaque affirmation doit pouvoir etre montree en entretien
 * (un lien, une capture, un certificat, une attestation). Pas de pourcentage
 * de maitrise ni d'annees d'experience gonflees : un recruteur technique les
 * repere immediatement, et ils font perdre la credibilite du reste.
 */

export const profile: Profile = {
  displayName: 'Christian Bitep',
  legalName: 'BITEP GWODOG Christian Bernard',
  role: 'Développeur full stack, web, mobile et cloud',
  pitch:
    'Je conçois et je mets en ligne des produits complets, de la base de données à ' +
    "l'application mobile, pour des usages concrets au Cameroun : recherche juridique " +
    'assistée par IA, assurance santé payée par mobile money, mise en relation avec ' +
    'des artisans de quartier.',
  location: 'Douala, Cameroun',
  roles: ['applications web', 'apps mobiles', 'API robustes', 'assistants IA', 'produits complets'],
  email: 'christianbitep8@gmail.com',
  phone: '+237 690 70 34 89',
  photo: 'assets/images/christian.jpg',
  portrait: 'assets/images/christian-cutout.webp',
  resume: 'assets/CV-BITEP-Christian.pdf',
  siteUrl: 'https://mon-portfolio-azurethree.vercel.app',
  github: 'https://github.com/christian08-bit',
  linkedin: 'https://www.linkedin.com/in/christian-bitep-733a22328',
  languages: [
    { name: 'Français', level: 'langue de travail' },
    { name: 'Anglais', level: 'intermédiaire, lecture technique courante' },
  ],
};

const shot = (file: string, alt: string, ratio = 1.6) => ({
  src: `assets/images/projects/${file}`,
  alt,
  ratio,
});

export const caseStudies: CaseStudy[] = [
  {
    id: 'chatdocs',
    name: 'ChatDocs OHADA',
    summary: 'Assistant juridique IA qui cite ses sources',
    status: 'live',
    domain: 'chatdocs-ohada.vercel.app',
    platforms: ['Web', 'Android'],
    problem:
      'Le droit OHADA et la fiscalité camerounaise tiennent dans des milliers de pages. ' +
      "Une réponse juridique qui ne dit pas d'où elle vient ne vaut rien pour un juriste " +
      'ou un chef d’entreprise.',
    built: [
      'Un assistant de recherche fondé sur une architecture RAG : la question est confrontée au corpus officiel avant toute réponse.',
      'Chaque réponse cite l’article qui la fonde et reproduit son texte officiel, pour que l’utilisateur vérifie lui-même.',
      'Une bibliothèque des textes en libre consultation, une page de méthodologie et un journal des mises à jour du corpus.',
      'Une application Android en plus de la version web.',
    ],
    decisions: [
      'Quand le corpus ne permet pas de répondre, l’assistant le dit au lieu de produire une réponse plausible. Une IA juridique qui invente est pire qu’aucune IA.',
      'La méthodologie est publique : un utilisateur sait sur quels textes il peut compter, et lesquels ne sont pas encore couverts.',
    ],
    stack: ['RAG', 'IA générative', 'Web', 'Android'],
    links: [{ label: 'Ouvrir ChatDocs OHADA', url: 'https://chatdocs-ohada.vercel.app' }],
    shots: [
      shot('chatdocs-01-accueil.jpg', 'Page d’accueil de ChatDocs OHADA avec un exemple de réponse sourcée'),
      shot('chatdocs-02-corpus.jpg', 'Bibliothèque des textes du corpus OHADA'),
      shot('chatdocs-03-methodologie.jpg', 'Page de méthodologie expliquant le fonctionnement de l’assistant'),
      shot('chatdocs-04-journal.jpg', 'Journal des mises à jour du corpus'),
    ],
  },
  {
    id: 'menwork',
    name: 'MENWORK Cameroun',
    summary: 'Plateforme de services de proximité',
    status: 'live',
    domain: 'menworkcam.com',
    platforms: ['Web', 'Android'],
    problem:
      'À Douala, trouver un plombier, un électricien ou un infirmier disponible près de ' +
      'chez soi passe encore par le bouche-à-oreille, sans garantie sur la personne qui ' +
      'se présente à la porte.',
    built: [
      'Une carte qui géolocalise les prestataires disponibles autour de l’utilisateur, sur plus de 130 métiers.',
      'Des profils vérifiés (pièce d’identité et diplôme) et des avis clients.',
      'Un mode SOS pour les urgences, joignable 24 h/24.',
      'Une interface bilingue français et anglais, en thème clair ou sombre, et une application Android.',
    ],
    decisions: [
      'La vérification d’identité et de diplôme passe avant la publication du profil : la confiance ne repose pas seulement sur les avis.',
      'Le mode SOS est un parcours à part, plus court que la recherche classique, parce qu’une urgence ne laisse pas le temps de comparer.',
    ],
    stack: ['Web', 'Android', 'Géolocalisation', 'Bilingue FR/EN'],
    links: [{ label: 'Ouvrir menworkcam.com', url: 'https://menworkcam.com' }],
    shots: [
      shot('menwork-01-accueil.jpg', 'Page d’accueil de MENWORK et recherche de services'),
      shot('menwork-02-services.jpg', 'Catalogue des services MENWORK'),
      shot('menwork-03-metier.jpg', 'Liste des prestataires d’un métier'),
      shot('menwork-04-prestataire.jpg', 'Fiche détaillée d’un prestataire'),
      shot('menwork-05-flyer.jpg', 'Visuel de présentation de MENWORK', 715 / 997),
    ],
  },
  {
    id: 'ejs',
    name: 'E-Jarnauld Soft',
    summary: 'Site d’une société d’infogérance et de cybersécurité',
    status: 'live',
    domain: 'ejs-cm.com',
    platforms: ['Web'],
    problem:
      'Une société d’ingénierie informatique de Douala doit présenter des services ' +
      'techniques (audit de cybersécurité, infogérance, câblage, vidéosurveillance) à des ' +
      'PME comme à des institutions, et transformer ces visites en demandes de devis.',
    built: [
      'Un site multipage : accueil, à propos, catalogue de services, actualités, astuces et contact.',
      'Un catalogue de services filtrable par domaine : sécurité et audit, infrastructure et câblage, cloud et infogérance, télécoms et vidéosurveillance.',
      'Une interface bilingue français et anglais, avec bascule de langue dans l’en-tête.',
      'Un parcours de demande de devis accessible depuis chaque page.',
    ],
    decisions: [
      'Un site statique en HTML, CSS et JavaScript, sans framework : rapide à charger, simple à héberger et à maintenir pour l’entreprise.',
      'Le bouton « Demander un devis » reste dans l’en-tête de chaque page, parce que le rôle du site est de générer des contacts commerciaux.',
    ],
    stack: ['HTML5', 'CSS', 'JavaScript', 'Bilingue FR/EN'],
    links: [{ label: 'Ouvrir ejs-cm.com', url: 'https://ejs-cm.com' }],
    shots: [
      shot('ejs-01-accueil.jpg', 'Page d’accueil d’E-Jarnauld Soft'),
      shot('ejs-02-services.jpg', 'Catalogue des services filtrable par domaine'),
      shot('ejs-03-a-propos.jpg', 'Page de présentation de l’entreprise'),
      shot('ejs-04-actualites.jpg', 'Actualités et veille technologique'),
      shot('ejs-05-contact.jpg', 'Page de contact et demande de devis'),
    ],
  },
  {
    id: 'cotisante',
    name: 'CotisantéCM',
    summary: 'Assurance santé à cotisation volontaire',
    status: 'private',
    platforms: ['Web', 'PWA'],
    problem:
      'Beaucoup de familles camerounaises n’ont pas d’assurance santé et paient leurs ' +
      'soins au moment où elles en ont besoin, souvent sans l’argent nécessaire.',
    built: [
      'Une souscription avec vérification d’identité et une cotisation par mobile money.',
      'Un crédit sanitaire qui prend le relais quand le solde ne suffit pas au moment des soins.',
      'Une carte d’assuré numérique, un portail pour les structures de santé et un espace administrateur.',
      'Une application utilisable hors connexion (PWA) et disponible en plusieurs langues.',
    ],
    decisions: [
      'Architecture en couches côté .NET 10 : les règles de cotisation et de crédit sanitaire sont isolées de l’API et de la persistance, et se testent seules.',
      'Hors connexion d’abord : la carte d’assuré doit pouvoir être présentée dans un centre de santé sans réseau.',
    ],
    stack: ['Angular', '.NET 10', 'PostgreSQL', 'PWA', 'Mobile money'],
    links: [],
    shots: [
      shot('cotisante-01-accueil.jpg', 'Page d’accueil de CotisantéCM et carte d’assuré'),
      shot('cotisante-02-tableau-de-bord.jpg', 'Tableau de bord de l’assuré'),
      shot('cotisante-03-cotiser.jpg', 'Cotisation par mobile money'),
      shot('cotisante-04-carte.jpg', 'Carte d’assuré numérique'),
      shot('cotisante-05-portail-partenaire.jpg', 'Portail des structures de santé partenaires', 1200 / 390),
      shot('cotisante-06-admin.jpg', 'Espace administrateur'),
    ],
  },
  {
    id: 'dimfitness',
    name: 'DIMFitness',
    summary: 'Gestion et coaching d’une salle de sport',
    status: 'live',
    domain: 'dimfitness-app.com',
    platforms: ['Web', 'Mobile', 'PWA'],
    problem:
      'Une salle de sport gère ses adhérents, ses séances, sa paie et sa trésorerie dans ' +
      'des outils séparés, et les coachs ne peuvent pas suivre leurs sportifs à distance.',
    built: [
      'Le suivi des sportifs, le planning, une nutrition assistée et des séances en direct par visioconférence.',
      'La gestion automatique des présences aux séances.',
      'Un back-office complet : personnel et paie, facturation, comptabilité de trésorerie.',
    ],
    decisions: [
      'Monorepo Nx : l’API NestJS et le front Angular partagent leurs types, une modification de contrat casse la compilation au lieu de casser la production.',
      '601 tests automatisés, parce qu’un module de paie et de facturation ne se teste pas à la main avant chaque mise en ligne.',
    ],
    stack: ['Angular', 'NestJS', 'Prisma', 'PostgreSQL', 'Nx', 'PWA'],
    links: [{ label: 'Ouvrir dimfitness-app.com', url: 'https://dimfitness-app.com' }],
    shots: [shot('dimfitness-01-logo.jpg', 'Identité visuelle de DIMFitness', 1200 / 675)],
  },
  {
    id: 'findme',
    name: 'findMe, GeoLink Africa',
    summary: 'Adressage urbain par carte et QR code',
    status: 'source',
    domain: 'github.com/christian08-bit',
    platforms: ['Web'],
    problem:
      'Dans beaucoup de quartiers, une adresse se décrit par des repères (« après la ' +
      'pharmacie, deuxième portail ») plutôt que par une rue et un numéro.',
    built: [
      'Une carte interactive et des adresses numériques avec photo du lieu.',
      'L’export de chaque adresse en PDF et en QR code, à partager ou à imprimer.',
      'Un tableau de bord administrateur, en français et en anglais, en thème clair ou sombre.',
    ],
    decisions: [
      'Mobile d’abord et accessible WCAG AA : la cible consulte surtout sur téléphone, souvent en extérieur.',
      'Back-end simulé par un serveur Nitro, pour livrer et tester toute l’interface avant que l’API réelle n’existe.',
    ],
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind 4', 'Pinia', 'Leaflet'],
    links: [{ label: 'Lire le code', url: 'https://github.com/christian08-bit/Projet-Cabrel' }],
    shots: [
      shot('findme-01-accueil.jpg', 'Page d’accueil de findMe'),
      shot('findme-03-inscription.jpg', 'Création de compte findMe'),
      shot('findme-02-contact.jpg', 'Page de contact et support'),
    ],
  },
];

/** Chiffres cles du haut de page : uniquement des faits verifiables. */
export const stats: Stat[] = [
  { value: caseStudies.length, label: 'produits conçus et livrés' },
  { value: caseStudies.filter((p) => p.status === 'live').length, label: 'en ligne aujourd’hui' },
  { value: 601, label: 'tests automatisés sur DIMFitness' },
  { value: 5, label: 'certifications obtenues' },
];

/** Realisations plus courtes, sans etude de cas. */
export const otherWork: string[] = [
  'Carré d’As, gestion de restaurant livrée à un client d’E-Jarnauld Soft',
  'Boutique EJS, boutique en ligne d’E-Jarnauld Soft',
  'Analyse de données hospitalières et prédictions par machine learning (Python)',
  'Gestion de clinique médicale',
  'Gestion d’établissement scolaire',
  'Sites e-commerce responsive',
];

export const experiences: Experience[] = [
  {
    org: 'E-Jarnauld Soft',
    role: 'Développeur web et mobile',
    kind: 'Stage',
    period: 'Depuis sept. 2026',
    place: 'Douala',
    summary:
      'Conception de logiciels pour les clients de la société et pour ses besoins internes.',
    highlights: [
      'Carré d’As : application de gestion de restaurant réalisée pour un client.',
      'Boutique EJS : boutique en ligne de l’entreprise.',
      'Site web de l’entreprise, ejs-cm.com : catalogue de services bilingue et demandes de devis.',
    ],
  },
  {
    org: 'Orange Digital Center',
    role: 'Angular Talent Lab',
    kind: 'Formation',
    period: '3 mois, terminé en oct. 2026',
    place: 'Douala',
    summary:
      'Parcours intensif de développement d’applications web avec Angular, validé par une évaluation de l’ensemble des acquis.',
    highlights: ['Ce portfolio, écrit en Angular 22 avec signaux et composants autonomes, en est issu.'],
  },
  {
    org: 'SOCAVER, Société Camerounaise de Verrerie',
    role: 'Maintenance informatique',
    kind: 'Stage',
    period: 'Mai à juin 2025',
    place: 'Douala',
    summary: 'Stage au service maintenance d’un site industriel.',
    highlights: [
      'Diagnostic et résolution de pannes matérielles et logicielles sur le parc informatique et électronique.',
      'Maintenance préventive et corrective des équipements et des infrastructures.',
    ],
  },
  {
    org: 'Boutique d’appareils électroniques',
    role: 'Technicien de maintenance',
    kind: 'Emploi',
    period: '2022 à 2024',
    place: 'Douala',
    summary:
      'Diagnostic, réparation et maintenance de matériel informatique et d’appareils électroniques, en contact direct avec la clientèle.',
    highlights: [],
  },
];

export const expertise: ExpertiseArea[] = [
  {
    name: 'Front-end',
    description: 'Interfaces accessibles et responsive, rapides sur un réseau mobile moyen.',
    icon: 'layout',
    tools: ['Angular', 'React', 'Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS'],
    provenIn: ['cotisante', 'dimfitness', 'findme', 'ejs'],
  },
  {
    name: 'Back-end et API',
    description: 'API structurées en couches, règles métier isolées et testées.',
    icon: 'server',
    tools: ['Node.js', 'NestJS', '.NET', 'Spring Boot', 'Java', 'Python', 'Prisma'],
    provenIn: ['cotisante', 'dimfitness', 'chatdocs'],
  },
  {
    name: 'Mobile',
    description: 'Applications Android et PWA utilisables hors connexion.',
    icon: 'mobile',
    tools: ['React Native', 'Flutter', 'Android', 'PWA'],
    provenIn: ['menwork', 'chatdocs', 'cotisante'],
  },
  {
    name: 'IA et données',
    description: 'IA générative ancrée dans un corpus, analyse et prédiction.',
    icon: 'sparkles',
    tools: ['RAG', 'IA générative', 'Python', 'Machine learning', 'Excel'],
    provenIn: ['chatdocs', 'Analyse de données hospitalières'],
  },
  {
    name: 'Bases de données',
    description: 'Modélisation relationnelle et documentaire.',
    icon: 'database',
    tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
    provenIn: ['cotisante', 'dimfitness'],
  },
  {
    name: 'Cloud et livraison',
    description: 'Du dépôt Git à la mise en ligne, avec des tests qui protègent chaque version.',
    icon: 'cloud',
    tools: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Vercel'],
    provenIn: ['dimfitness', 'chatdocs'],
  },
  {
    name: 'Design d’interface',
    description: 'Maquettes et identités visuelles avant le code.',
    icon: 'pen',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    provenIn: ['menwork', 'dimfitness'],
  },
];

export const certifications: Certification[] = [
  {
    title: 'Angular Talent Lab',
    issuer: 'Orange Digital Center, Douala',
    date: 'Oct. 2026',
    length: 'Parcours de 3 mois',
    note: 'Ensemble des acquis évalués validé',
    pdf: 'assets/certificates/angular-talent-lab-odc.pdf',
    thumbnail: 'assets/certificates/angular-talent-lab-odc.jpg',
  },
  {
    title: 'AWS Concepts',
    issuer: 'DataCamp',
    date: 'Nov. 2026',
    length: '2 h',
    credentialId: '50788182',
    pdf: 'assets/certificates/aws-concepts.pdf',
    thumbnail: 'assets/certificates/aws-concepts.jpg',
  },
  {
    title: 'Understanding Cloud Computing',
    issuer: 'DataCamp',
    date: 'Nov. 2026',
    length: '2 h',
    credentialId: '49836488',
    pdf: 'assets/certificates/understanding-cloud-computing.pdf',
    thumbnail: 'assets/certificates/understanding-cloud-computing.jpg',
  },
  {
    title: 'Introduction to Python for Developers',
    issuer: 'DataCamp',
    date: 'Nov. 2026',
    length: '3 h',
    credentialId: '49669360',
    pdf: 'assets/certificates/python-for-developers.pdf',
    thumbnail: 'assets/certificates/python-for-developers.jpg',
  },
  {
    title: 'Introduction to Git',
    issuer: 'DataCamp',
    date: 'Nov. 2026',
    length: '2 h',
    credentialId: '50172006',
    pdf: 'assets/certificates/introduction-to-git.pdf',
    thumbnail: 'assets/certificates/introduction-to-git.jpg',
  },
];

export const degrees: Degree[] = [
  { title: 'Master 1 Génie logiciel', school: 'En cours', period: '2026 – 2027' },
  {
    title: 'Licence de technologie, Génie logiciel',
    school: 'IUT de Douala',
    period: '2025 – 2026',
    detail: 'Mention bien',
  },
  {
    title: 'DUT Génie informatique',
    school: 'IUT de Douala',
    period: '2024 – 2025',
    detail: 'Mention assez bien',
  },
  {
    title: 'Baccalauréat série D',
    school: 'Lycée de la Cité des Palmiers, Douala',
    period: '2022 – 2023',
  },
];

/**
 * Formulaire de contact. Un site statique ne peut pas envoyer d'e-mail seul :
 * FormSubmit recoit le message et le relaie vers la boite mail ci-dessous.
 *
 * Activation (une seule fois) : au premier message envoye depuis le site,
 * FormSubmit envoie un e-mail « Activate Form » a cette adresse ; cliquer sur
 * le lien. Les messages suivants arrivent directement dans la boite.
 * Ensuite, on peut remplacer l'adresse par l'alias aleatoire fourni dans ce
 * meme e-mail, pour ne plus l'exposer dans le code du site.
 *
 * Vide, le formulaire ouvre la messagerie du visiteur (repli mailto:).
 */
export const contactForm = {
  endpoint: 'https://formsubmit.co/ajax/christianbitep8@gmail.com',
};
