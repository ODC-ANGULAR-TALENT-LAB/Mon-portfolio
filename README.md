# Portfolio de Christian Bitep

Portfolio de **BITEP GWODOG Christian Bernard**, développeur full stack web, mobile et cloud basé à Douala.

En ligne : https://mon-portfolio-azurethree.vercel.app

Angular 22 (composants autonomes, signaux, `OnPush`), sans dépendance d'interface : environ 74 Ko transférés au premier chargement, polices hébergées par le site, aucun CDN.

## Démarrage

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de production dans dist/portfolio-angular/browser
npm test           # tests unitaires (Vitest + jsdom)
```

## Modifier le contenu

Tout le texte du site est dans **`src/app/core/content.ts`**, typé par `content.types.ts` :

| Export | Section |
|---|---|
| `profile` | Haut de page, contact, liens, langues |
| `caseStudies` | Index des produits et études de cas (problème, réalisation, choix techniques, captures) |
| `otherWork` | Autres réalisations |
| `experiences` | Parcours |
| `expertise` | Expertise ; `provenIn` relie chaque domaine aux études de cas qui le prouvent |
| `certifications`, `degrees` | Certifications et diplômes |
| `contactForm.endpoint` | URL Formspree / Web3Forms ; vide, le formulaire ouvre la messagerie du visiteur |

Logos des technologies : **`src/app/core/tech.ts`** associe chaque nom (utilisé dans `stack` et `tools`) à son logo [simple-icons](https://simpleicons.org) et à sa couleur de marque ; on y règle aussi le bandeau défilant (`MARQUEE_ROWS`) et l'orbite du haut de page (`ORBIT`). Un nom absent du registre s'affiche en monogramme.

Polices : Sora (titres), Geist (texte), Geist Mono (code), hébergées par le site via Fontsource.

Fichiers associés : captures dans `public/assets/images/projects/`, certificats (PDF et miniature JPG) dans `public/assets/certificates/`, CV dans `public/assets/CV-BITEP-Christian.pdf`.

## Structure

```
src/
  app/
    core/         content.ts (données), content.types.ts, theme.ts
    components/   site-header, site-footer, gallery (avec agrandissement), contact-form, icon
    sections/     hero, case-studies, journey, expertise, credentials, contact
  styles/         _tokens (couleurs, typographie), _base, _header, _hero, _case, _sections
```

## Choix de conception

- **Thème** : les couleurs sont des variables CSS redéfinies sous `[data-theme='dark']`. Un script en ligne dans `index.html` applique le thème avant le premier rendu (pas de flash clair en mode sombre).
- **Styles globaux préfixés** (`.hero-*`, `.case-*`, `.cert-*`…) : aucune règle n'en écrase une autre, l'ordre des `@use` est sans effet.
- **Agrandissement des captures** dans un `<dialog>` natif : focus piégé, Échap et fond modal fournis par le navigateur ; flèches gauche/droite pour naviguer.
- **Accessibilité** : lien d'évitement, focus visible, `prefers-reduced-motion` respecté, textes alternatifs sur chaque capture.
- **SEO** : balises Open Graph et données structurées `schema.org/Person` dans `index.html`.

## Déploiement (Vercel)

`vercel.json` contient la configuration (build `npm run build`, dossier `dist/portfolio-angular/browser`, réécriture vers `index.html`, en-têtes de cache et de sécurité). Chaque push sur `main` redéploie.
