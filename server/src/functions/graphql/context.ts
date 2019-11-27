import { Photon } from '@prisma/photon';

export type Context = {
  photon: Photon;
};

export default function createContext(): Context {
  return {
    photon: new Photon(),
  };
}
