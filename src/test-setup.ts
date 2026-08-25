/**
 * jsdom n'implemente pas <canvas>.getContext(), or lottie-web l'appelle des
 * son chargement. On renvoie un contexte factice qui accepte n'importe quel
 * appel ou propriete (equivalent de jest-canvas-mock cote React).
 */
const fakeContext = new Proxy(
  {},
  {
    get: (target: Record<string, unknown>, prop: string) => {
      if (prop in target) {
        return target[prop];
      }
      return () => undefined;
    },
    set: (target: Record<string, unknown>, prop: string, value: unknown) => {
      target[prop] = value;
      return true;
    },
  },
);

HTMLCanvasElement.prototype.getContext = (() =>
  fakeContext) as unknown as HTMLCanvasElement['getContext'];
