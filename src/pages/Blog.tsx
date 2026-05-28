/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { FileText, Clock, Search, BookOpen, User } from 'lucide-react';
import Layout from '../components/layout/Layout';

export const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Loans' | 'Investments' | 'Tax'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Loans', 'Investments', 'Tax'] as const;

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Financial Learning Hub — Legal Rules, Tax & Investments Guides"
        description="Expand your knowledge of Indian tax reliefs, Section 80C ELSS mutual funds, floating interest home loan amortization sheets, and GST Input credits."
        canonical="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 select-none">
        
        {/* Hub Header */}
        <div className="max-w-3xl flex flex-col gap-2 mb-10 select-text">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
            Personal Finance <span className="text-brand-primary">Learning Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-normal font-medium">
            Explore comprehensive guides and checklists on loans, tax rules (ELSS, Section 80C), fixed deposits compounding, and MSME GST compliance.
          </p>
        </div>

        {/* Toolbar: Category tabs + live search */}
        <div className="flex flex-col sm:flex-row gap-5.5 justify-between items-center bg-transparent border-b border-slate-200/50 dark:border-slate-800 pb-5 mb-8">
          <div className="flex flex-wrap bg-slate-100 dark:bg-slate-805 p-1 rounded-xl gap-0.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat === 'All' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          <div className="relative flex items-center bg-slate-50 dark:bg-slate-805 rounded-xl border border-slate-200/60 dark:border-slate-705 p-1 w-full sm:w-80 select-text">
            <Search className="absolute left-3 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              className="w-full bg-transparent border-0 pl-9 pr-3.5 py-1.5 text-xs font-semibold focus:outline-none dark:text-slate-100"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Post List Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text select-none">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card
                  hoverEffect
                  className="flex flex-col justify-between items-start gap-4 h-92 border-slate-100 dark:border-slate-800 overflow-hidden relative group p-5 sm:p-5.5 bg-white dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-3">
                    {/* Top row */}
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-blue-500/10 text-brand-primary dark:bg-blue-500/20 dark:text-blue-400 uppercase tracking-widest leading-none">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-100 font-display group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-2 mt-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-755/50 pt-3.5 w-full flex justify-between items-center mt-2.5">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Published: {post.publishDate}
                    </span>
                    <span className="text-xs font-bold text-brand-primary dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Read Guide &rarr;
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 dark:text-slate-500 select-none">
            <div className="p-3 bg-slate-50 dark:bg-slate-805 rounded-full mb-3.5 border border-slate-200/50">
              <BookOpen className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-750 dark:text-slate-350">
              No Articles Found
            </h4>
            <p className="text-xs max-w-sm mt-1 leading-normal font-medium">
              We couldn't find any learning resources matching "{searchQuery}". Try searching other keywords like "tax", "sip" or "repo".
            </p>
          </div>
        )}

      </div>
    </>
  );
};
export default Blog;
