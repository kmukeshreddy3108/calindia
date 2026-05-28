/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Sticky top navigation panel */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Floating mobile catalog drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Primary responsive grid body */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Regulatory advisory information footer */}
      <Footer />
    </div>
  );
};
export default Layout;
