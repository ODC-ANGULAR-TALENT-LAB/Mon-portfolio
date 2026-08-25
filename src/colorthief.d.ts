/**
 * colorthief 2.x ne fournit pas de types (meme version que le projet React).
 * On vise le build ESM explicitement : le champ "main" du paquet pointe vers
 * une variante CommonJS que le serveur de dev (vite) ne sait pas importer.
 */
declare module 'colorthief/dist/color-thief.mjs' {
  export default class ColorThief {
    getColor(img: HTMLImageElement, quality?: number): [number, number, number];
    getPalette(
      img: HTMLImageElement,
      colorCount?: number,
      quality?: number,
    ): [number, number, number][];
  }
}
