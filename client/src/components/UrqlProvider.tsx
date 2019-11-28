import fetch from 'node-fetch';
import React from 'react';
import { Client, createClient, Provider } from 'urql';

// Polyfill fetch only in Node environments
if (typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).fetch = fetch;
}

const client = createClient({
  url: '/.netlify/functions/graphql',
});

// TODO: Create a Gatsby plugin out of this with SSR support
export default function UrqlProvider({
  value = client,
  ...restProps
}: Partial<React.ProviderProps<Client>>) {
  return <Provider value={value} {...restProps} />;
}
