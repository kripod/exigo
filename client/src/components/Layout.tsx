import { Box, BoxProps } from '@chakra-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import Header from './Header';
import UrqlProvider from './UrqlProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LayoutProps extends BoxProps {}

export default function Layout({ children, ...restProps }: LayoutProps) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          languageCode
          countryCode
        }
      }
    }
  `);

  return (
    <React.StrictMode>
      <UrqlProvider>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        >
          <html lang={data.site.siteMetadata.languageCode} />
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />

          <meta
            property="og:locale"
            content={`${data.site.siteMetadata.languageCode}_${data.site.siteMetadata.countryCode}`}
          />
        </Helmet>

        <Box {...restProps}>
          <Header mb={6} />

          <main>{children}</main>
        </Box>
      </UrqlProvider>
    </React.StrictMode>
  );
}
