// TODO: Replace with the @prisma/photon facade package
// See: https://github.com/prisma/photonjs/issues/261
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Photon } from './.generated/photon'; // eslint-disable-line import/no-unresolved

export type Context = {
  photon: Photon;
};

export default function createContext(): Context {
  return {
    photon: new Photon(),
  };
}
