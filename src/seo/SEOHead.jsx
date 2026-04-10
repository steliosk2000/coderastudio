import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Codera Studio';
const SITE_URL = 'https://coderastudio.gr';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  'Κατασκευή ιστοσελίδων, e-shop και ψηφιακού QR μενού. Εξειδικευόμαστε σε ξενοδοχεία, εστιατόρια και επιχειρήσεις σε όλη την Ελλάδα.';

/**
 * SEOHead — drop-in per-page SEO component.
 *
 * Props:
 *  title        – page title (without brand suffix)
 *  description  – meta description (≤160 chars recommended)
 *  keywords     – comma-separated keyword string
 *  canonical    – full canonical URL (defaults to SITE_URL)
 *  ogImage      – absolute URL to OG image (defaults to /og-image.png)
 *  ogType       – 'website' | 'article' (default: 'website')
 *  noIndex      – set true to block indexing (e.g. admin pages)
 */
const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = '',
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Κατασκευή Ιστοσελίδων`;
  const canonicalUrl = canonical || SITE_URL;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Geo / Local SEO */}
      <meta name="geo.region" content="GR" />
      <meta name="geo.placename" content="Ελλάδα" />
      <meta name="language" content="el" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="el_GR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;
