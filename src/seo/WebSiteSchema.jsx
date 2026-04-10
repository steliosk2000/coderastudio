/**
 * WebSiteSchema
 * Renders JSON-LD WebSite structured data.
 * Place on the Home page only. Enables future Sitelinks Search Box in Google.
 */
const WebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Codera Studio',
    alternateName: 'CoderaStudio',
    url: 'https://coderastudio.gr',
    description:
      'Κατασκευή ιστοσελίδων, e-shop και ψηφιακού QR μενού.',
    inLanguage: 'el',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://coderastudio.gr/services?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Codera Studio',
      url: 'https://coderastudio.gr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://coderastudio.gr/favicon.svg',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+306971826704',
        contactType: 'customer service',
        email: 'info@coderastudio.gr',
        areaServed: 'GR',
        availableLanguage: ['Greek', 'English'],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

export default WebSiteSchema;
