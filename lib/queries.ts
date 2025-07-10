import { gql } from "@apollo/client";

// get seo content
export const GET_SEO_DATA = gql`
  query Global {
    global {
      siteName
      siteDescription
      defaultSeo {
        metaTitle
        metaDescription
        canonicalURL
        openGraph {
          title
          description
          url
          siteName
          type
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_DATA = gql`
  query Homepage {
    homepage {
      hero: HeroSection {
        id
        greeting
        headline
        subheadline
      }
      about: AboutMe {
        title
        description
        experiences {
          bullets
          company
          duration
          position
          side
        }
      }
      services: ServicesSection {
        title
        services {
          documentId
          mark
          title
          description
        }
        skills {
          documentId
          order
          name
          icon {
            url
          }
        }
      }
      footer: footer {
        email
        github_url
        linkedin_url
        copyright
        id
      }
    }
  }
`;
