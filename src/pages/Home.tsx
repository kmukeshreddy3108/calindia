/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CalculatorGrid } from '../components/home/CalculatorGrid';
import { FeatureSection } from '../components/home/FeatureSection';
import { SEOHead } from '../components/seo/SEOHead';
import { buildWebsiteSchema } from '../utils/seo/schemaTemplates';

export const Home: React.FC = () => {
  const schema = buildWebsiteSchema();

  return (
    <>
      <SEOHead
        title="India's Premium Financial Calculators"
        description="Free, high-fidelity Indian financial calculators for SIP, EMI, Fixed Deposit interest, and GST calculations. Instant charts, schedules, and PDF reports."
        canonical="/"
        schema={schema}
      />
      
      {/* Search landing hero */}
      <HeroSection />

      {/* Bento grid containing individual tiles */}
      <CalculatorGrid />

      {/* Visual advantages review panel */}
      <FeatureSection />
    </>
  );
};
export default Home;
