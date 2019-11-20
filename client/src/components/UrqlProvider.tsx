import React from 'react';
import { Client, createClient, Provider } from 'urql';

const client = createClient({
  url:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000/graphql'
      : '/.netlify/functions/graphql',
});

// TODO: Create a Gatsby plugin out of this with SSR support
export default function UrqlProvider({
  value = client,
  ...restProps
}: Partial<React.ProviderProps<Client>>) {
  return <Provider value={value} {...restProps} />;
}
