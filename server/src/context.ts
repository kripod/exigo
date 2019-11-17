// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from '@generated/photon';

export type Context = {
  photon: Photon;
};

export default function createContext(): Context {
  return {
    photon: new Photon(),
  };
}
