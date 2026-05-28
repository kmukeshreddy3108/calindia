/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import { ToastProvider } from './context/ToastContext';

// Layout Container
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { EMICalculator } from './pages/calculators/EMICalculator';
import { SIPCalculator } from './pages/calculators/SIPCalculator';
import { FDCalculator } from './pages/calculators/FDCalculator';
import { GSTCalculator } from './pages/calculators/GSTCalculator';
import { CompoundInterestCalculator } from './pages/calculators/CompoundInterestCalculator';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <HistoryProvider>
          <ToastProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  {/* Landing Screen */}
                  <Route path="/" element={<Home />} />

                  {/* Calculator Routes */}
                  <Route path="/emi-calculator" element={<EMICalculator />} />
                  <Route path="/sip-calculator" element={<SIPCalculator />} />
                  <Route path="/fd-calculator" element={<FDCalculator />} />
                  <Route path="/gst-calculator" element={<GSTCalculator />} />
                  <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />

                  {/* Learning Hub / Blogs */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />

                  {/* Corporate Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

                  {/* Fallback 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </ToastProvider>
        </HistoryProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
