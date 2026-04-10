/**
 * ServiceSchema
 * Renders JSON-LD Service structured data dynamically per service page.
 * Place on /services/:id pages.
 *
 * Props:
 *  service – the service object from the API { id, title, shortDescription, description, pricing }
 */
const ServiceSchema = ({ service }) => {
  if (!service) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description || service.shortDescription,
    url: `https://coderastudio.gr/services/${service.id}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Codera Studio',
      url: 'https://coderastudio.gr',
      telephone: '+306971826704',
      email: 'info@coderastudio.gr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Χανιά',
        addressRegion: 'Κρήτη',
        addressCountry: 'GR',
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'Ελλάδα' },
    ],
    offers: service.pricing
      ? {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: service.pricing.toString(),
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: service.pricing.toString(),
            priceCurrency: 'EUR',
            description: 'Τιμή εκκίνησης — το τελικό κόστος εξαρτάται από τις προδιαγραφές',
          },
          seller: {
            '@type': 'Organization',
            name: 'Codera Studio',
          },
        }
      : undefined,
    serviceType: service.title,
    category: 'Web Design & Development',
    inLanguage: 'el',
  };

  // Remove undefined fields
  const cleaned = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleaned, null, 2) }}
    />
  );
};

export default ServiceSchema;
