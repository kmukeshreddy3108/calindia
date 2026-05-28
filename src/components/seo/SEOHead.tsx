/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  schema,
}) => {
  const fullTitle = `${title} | FinCalc India`;
  const siteUrl = 'https://fincalc.in';
  const fullCanonicalUrl = `${siteUrl}${canonical}`;
  const fullOgImageUrl = OgImageUrlHelper(ogImage, siteUrl);

  useEffect(() => {
    // Dynamic fallback tags inside client-side for immediate index.html updates (and crawler compliance)
    document.title = fullTitle;
    
    UpdateMetaTag('description', description);
    UpdateMetaTag('og:title', fullTitle, 'property');
    UpdateMetaTag('og:description', description, 'property');
    UpdateMetaTag('og:url', fullCanonicalUrl, 'property');
    UpdateMetaTag('og:image', fullOgImageUrl, 'property');
    UpdateMetaTag('twitter:title', fullTitle);
    UpdateMetaTag('twitter:description', description);
    UpdateMetaTag('twitter:image', fullOgImageUrl);

    // Update canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // Dynamic injection of structured JSON-LD schema
    let schemaScript = document.getElementById('fincalc-jsonld-schema') as HTMLScriptElement;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'fincalc-jsonld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.text = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Cleanup schema on unmount if appropriate
      const scriptElement = document.getElementById('fincalc-jsonld-schema');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [fullTitle, description, fullCanonicalUrl, fullOgImageUrl, schema]);

  return null; // Side-effect component, returns null but manages viewport meta tags
};

// Pure state helper functions to target HTML tags safely inside iFrame
function UpdateMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  const selector = attr === 'property' ? `meta[property='${name}']` : `meta[name='${name}']`;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function OgImageUrlHelper(img: string, base: string) {
  if (img.startsWith('http')) return img;
  return `${base}${img.startsWith('/') ? '' : '/'}${img}`;
}

export default SEOHead;
