/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Percent,
  TrendingUp,
  PiggyBank,
  Calculator,
  PercentSquare,
  Menu,
  X,
  History,
  Search,
  ChevronDown,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { CALCULATORS } from '../../data/calculators';
import { HistoryDrawer } from './HistoryDrawer';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered calculators for live search
  const filteredCalculators = searchQuery.trim() === ''
    ? []
    : CALCULATORS.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleSearchNavigate = (slug: string) => {
    navigate(slug);
    setSearchQuery('');
    showSearch && setShowSearch(false);
  };

  const iconMap = {
    Percent,
    TrendingUp,
    PiggyBank,
    Calculator,
    PercentSquare,
  };

  const renderIcon = (name: keyof typeof iconMap, className: string) => {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 w-full border-b ${
          scrolled
            ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-slate-200/45 dark:border-slate-800/45 py-2.5'
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 focus:outline-none">
            <div className="p-2 rounded-xl bg-brand-primary text-white shadow-md shadow-blue-500/15">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              FinCalc <span className="text-brand-accent">India</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors focus:outline-none ${
                  isActive
                    ? 'text-brand-primary dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Home
            </NavLink>

            {/* Dropdown for Calculators */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white focus:outline-none cursor-pointer"
              >
                Calculators
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-slate-850 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/60 p-2 animate-scaleIn">
                  {CALCULATORS.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => {
                        navigate(calc.slug);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/65 flex items-start gap-3.5 transition-colors cursor-pointer group"
                    >
                      <div className={`p-2 rounded-lg ${calc.bgClass} ${calc.colorClass}`}>
                        {renderIcon(calc.iconName, 'w-4.5 h-4.5')}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-150 group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors">
                          {calc.name}
                        </h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 max-w-[200px] leading-relaxed">
                          {calc.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors focus:outline-none ${
                  isActive
                    ? 'text-brand-primary dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Blog & Learning
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors focus:outline-none ${
                  isActive
                    ? 'text-brand-primary dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Right Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Live Search Trigger & Dropdown */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none"
                title="Search Calculators"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {showSearch && (
                <div className="absolute right-0 top-full mt-3 w-76 sm:w-85 bg-white dark:bg-slate-850 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4.5 animate-scaleIn select-text">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl pl-9.5 pr-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary dark:text-slate-100"
                      placeholder="Type e.g. sip, emi, fd..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  
                  {searchQuery.trim().length > 0 && (
                    <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-700/50 max-h-56 overflow-y-auto">
                      {filteredCalculators.length > 0 ? (
                        filteredCalculators.map((calc) => (
                          <button
                            key={calc.id}
                            onClick={() => handleSearchNavigate(calc.slug)}
                            className="w-full text-left py-2 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer group"
                          >
                            <div className={`p-1.5 rounded-lg ${calc.bgClass} ${calc.colorClass}`}>
                              {renderIcon(calc.iconName, 'w-3.5 h-3.5')}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-blue-400">
                                {calc.name}
                              </span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-5 text-xs text-slate-400 font-medium">
                          No calculators found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* History Trigger */}
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none"
              title="Recent calculations logs"
              aria-label="View history logs"
            >
              <History className="w-5 h-5" />
            </button>

            {/* Ambient Dark Mode Slider Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger menu */}
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none"
              aria-label="Open Navigation Directory"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Audit History Drawer Panel */}
      <HistoryDrawer
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onRestore={() => showHistory && setShowHistory(false)}
      />
    </>
  );
};
export default Navbar;
