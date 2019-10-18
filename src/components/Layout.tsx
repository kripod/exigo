import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theme } from '../utils/theme';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
      <ThemeProvider theme={theme}>
        <CSSReset />

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

        <Box as="header" mb={32}>
          {/* TODO */}
        </Box>

        <Box as="main" bg="blue.50" py={32}>
          {children}
        </Box>

        <footer>{/* TODO */}</footer>
      </ThemeProvider>
    </React.StrictMode>
  );
}
