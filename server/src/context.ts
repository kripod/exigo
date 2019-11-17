// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from '@generated/photon';

export type Context = {
  photon: Photon;
};

// eslint-disable-next-line import/prefer-default-export
export const createContext = (): Context => ({
  photon: new Photon(),
});
