# portfolio-angular

Portage Angular 22 de **developerFolio** (template de portfolio React).

Le portage vise la **parite visuelle exacte** avec la version React : a viewport
identique, les deux pages sont pixel pour pixel les memes **en theme clair comme
en theme sombre**, hors animations qui tournent en continu (Lottie, emoji qui
salue, spinner de chargement) et ne peuvent pas etre saisies au meme instant.

La parite est verifiee par un comparateur Playwright (hors depot) qui confronte
captures plein page, geometrie des elements, structure DOM et console.

## Demarrage

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de production dans dist/
npm test           # tests unitaires (vitest + jsdom)
```

## Deploiement (Vercel)

`vercel.json` contient toute la configuration : Vercel n'a rien a deviner.

| Reglage | Valeur |
|---|---|
| Commande de build | `npm run build` |
| Dossier publie | `dist/portfolio-angular/browser` |
| Installation | `npm ci` |

Depuis l'interface Vercel : **Add New > Project**, importer le depot GitHub,
laisser les valeurs detectees (elles viennent de `vercel.json`) et deployer.
Chaque push sur `main` redeploie automatiquement.

En ligne de commande :

```bash
npx vercel        # previsualisation
npx vercel --prod # production
```

La configuration ajoute aussi :

- une reecriture de toutes les routes vers `index.html`, pour qu'un lien
  profond ne renvoie pas une 404 ;
- un cache d'un an sur les fichiers versionnes par empreinte (js, css, woff2)
  et d'une semaine sur `assets/` ;
- trois en-tetes de securite (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`).

## Structure

```
src/
  app/
    core/           portfolio.ts (donnees), portfolio.types.ts, theme.ts,
                    github.ts, utils.ts, emoji.ts, emoji-regex.ts
    shared/         reveal.directive.ts, headroom.directive.ts, emoji.ts
    components/     header, footer, toggle-switch, cartes reutilisables
    containers/     une section de page par dossier (main orchestre le tout)
  styles/           les .scss du projet React, en styles globaux
  styles.scss       point d'entree qui agrege styles/ + polices
public/assets/      images, polices, animations lottie, resume.pdf
```

## Personnalisation

Tout le contenu se modifie dans `src/app/core/portfolio.ts`, les couleurs dans
`src/styles/_global-color.scss` — comme dans le projet React d'origine.

## Correspondances avec la version React

| React | Angular |
|---|---|
| `StyleContext` + `useLocalStorage` | `ThemeService` (signal + localStorage) |
| `react-reveal` (`Fade`, `Slide`) | directive `appReveal` |
| `react-headroom` | directive `appHeadroom` |
| `react-easy-emoji` | composant `<app-emoji>` (images twemoji) |
| `lottie-react` | `lottie-web`, JSON charges depuis `public/assets/lottie` |
| `react-twitter-embed` | `widgets.js` officiel, dans `TwitterEmbed` |
| `colorthief` | `colorthief` (meme version 2.4.0) |
| `fetch("/profile.json")` | `HttpClient` dans `GithubService` |

## Points de fidelite a connaitre avant de modifier

Ces choix ne sont pas cosmetiques : chacun corrige un ecart visuel mesure.

- **L'ordre des `@use` dans `styles.scss` reproduit l'ordre d'evaluation des
  modules React** (index.js -> App.js -> imports de Main.js), et `main` vient
  en dernier. Plusieurs regles ont la meme specificite et ne sont departagees
  que par leur position : `.dark-mode` (Main.scss) doit passer apres
  `.project-card`, `.certificate-card` et `.blog-card`, sinon ces cartes
  restent blanches en theme sombre.

- **Les hotes de composants sont en `display: contents`**
  (`styles/_angular-hosts.scss`). La ou React place `.certificate-card`
  directement dans une grille, Angular interpose `<app-achievement-card>` qui
  devient l'item de grille a sa place, et les cartes perdent leur hauteur
  commune. Tout nouveau composant doit etre ajoute a cette liste.

- **Les styles sont globaux** (`src/styles/`, agreges par `styles.scss`), sans
  `styleUrl` par composant. C'etait deja le cas cote React, ou les classes sont
  partagees entre composants.

- **`appReveal` se pose sur l'element reel, jamais sur un wrapper.**
  `react-reveal` fusionne ses styles sur son enfant au lieu d'ajouter un div.
  Un niveau supplementaire casserait les regles CSS en `> *`
  (`.skills-main-div > *`, `.greeting-main > *`, `.contact-div-main > *`...)
  et donc la repartition flex.

- **La directive n'applique la translation que dans les keyframes.** Avant
  l'animation l'element ne porte que `opacity: 0` et reste a sa place : le
  decaler des le depart sortirait les elements `left`/`right` du viewport, et
  l'IntersectionObserver ne les verrait jamais.

- **L'animation est une vraie animation CSS et reste appliquee apres son
  terme**, comme dans react-reveal. L'element garde ainsi sa couche de
  composition, et l'anticrenelage du texte reste identique a celui de React.

- **`.headroom-wrapper` recoit une hauteur inline** egale a celle de l'en-tete,
  qui passe de `position: relative` (en haut de page) a `fixed` ensuite. Sans
  cela toute la page remonte de 100 px.

- **`colorthief` est fige en 2.4.0**, la version du projet React. La 2.3.0 et
  la 3.x donnent des couleurs de bandeau legerement differentes.

- **Le template de `<app-emoji>` tient sur une seule ligne** et porte un
  `// prettier-ignore` : un retour a la ligne entre les segments ajouterait des
  espaces parasites autour des emoji.

## Polices et emoji : aucune dependance externe

Le site ne charge **rien depuis un CDN**. Icones et emoji sont servis par le
projet lui-meme, ce qui evite qu'ils disparaissent quand le reseau est
capricieux.

| Ressource | Emplacement | Poids |
|---|---|---|
| Font Awesome 5.15.4 | `src/styles/fontawesome.css` + `public/assets/webfonts/` | 164 Ko (woff2 seul) |
| Twemoji 14.0.2 | `public/assets/twemoji/` | 31 Ko (9 fichiers) |

Deux scripts maintiennent ces copies :

```bash
npm run sync:fontawesome   # regenere le CSS et les woff2 depuis node_modules
npm run sync:twemoji       # telecharge les emoji ajoutes dans les sources
```

`sync:twemoji` relit la meme expression reguliere que l'application et ne
telecharge que les emoji reellement presents dans le code — pas les 3500 du
jeu complet. Apres avoir ajoute un emoji dans `portfolio.ts`, lancer le script.

`sync:fontawesome` reduit les sources au woff2 : la feuille officielle declare
cinq formats (eot, svg, ttf, woff, woff2) et Angular copiait 2,9 Mo dans le
bundle pour des navigateurs disparus.

## Donnees GitHub / Medium

`public/profile.json` et `public/blogs.json` sont attendus par les sections
Open Source, Profil et Blogs. Ils sont produits par le script `fetch.js` du
projet React a partir d'un `.env`. En leur absence, les sections retombent
silencieusement sur les donnees statiques de `portfolio.ts` — exactement comme
la version React.
