// TODO: Remove when `web-api-hooks` includes this by default
// eslint-disable-next-line import/no-unresolved
import 'network-information-types';

// TODO: Remove when React supports `inert` attribute

declare module 'react' {
  interface DOMAttributes<T> {
    inert?: '' | undefined;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      inert?: '' | undefined;
    }
  }
}

export {};
