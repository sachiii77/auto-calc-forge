import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
  structuredData?: object;
}

export const SEO = ({
  title = "Everything Calculator - AI-Powered Calculator Generator",
  description = "Describe any calculator you need and get it instantly. AI-powered calculator generator for BMI, mortgage, compound interest, tips, calories, GPA and more.",
  keywords = "calculator generator, AI calculator, BMI calculator, mortgage calculator, compound interest, tip calculator, calorie calculator, GPA calculator, custom calculator",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  canonical,
  type = "website",
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes("Everything Calculator") ? title : `${title} | Everything Calculator`;
  const siteUrl =  window.location.origin;
  const currentUrl =  window.location.href;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Everything Calculator",
    "applicationCategory": "BusinessApplication",
    "description": description,
    "url": siteUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Everything Calculator" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Everything Calculator" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};
