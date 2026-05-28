/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'FinCalc India',
    'url': 'https://fincalc.in',
    'description': 'Free, high-fidelity Indian financial calculators for SIP, EMI, Fixed Deposits, and GST.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://fincalc.in/?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildCalculatorSchema(name: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': `${name} — FinCalc India`,
    'url': `https://fincalc.in${slug}`,
    'description': description,
    'applicationCategory': 'FinancialApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires HTML5 and Javascript support',
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(steps: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': steps.map((step, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': step.name,
      'item': `https://fincalc.in${step.url}`,
    })),
  };
}
