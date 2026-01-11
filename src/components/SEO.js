import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://boroappliancepros.com/og-image.jpg',
  schema
}) => {
  const defaultTitle = 'Appliance Repair Murfreesboro TN | Book in 60 Seconds | Boro Appliance Pros';
  const defaultDescription = 'Appliance repair in Murfreesboro, Smyrna, La Vergne & Rutherford County, TN. Book online in 60 seconds. Same-day service. $79 diagnostic (waived with repair). Licensed & insured.';
  const defaultKeywords = 'appliance repair murfreesboro, appliance repair murfreesboro tn, murfreesboro appliance repair, appliance repair smyrna, appliance repair la vergne, refrigerator repair murfreesboro, dishwasher repair murfreesboro, same day appliance repair';

  const siteUrl = 'https://boroappliancepros.com';
  const fullTitle = title || defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Boro Appliance Pros" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Local Business Verification */}
      <meta name="geo.region" content="US-TN" />
      <meta name="geo.placename" content="Murfreesboro" />

      {/* Structured Data / JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
