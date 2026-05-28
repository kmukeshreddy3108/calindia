/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { ArrowLeft, Clock, Calendar, Bookmark, Tag, List, ChevronRight } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }, [slug]);

  // Read headings to generate dynamic Table of Contents
  const headings = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split('\n');
    return lines
      .filter((line) => line.trim().startsWith('###'))
      .map((line) => line.replace('###', '').trim());
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center select-none">
        <h2 className="text-xl font-bold dark:text-white">Article not found</h2>
        <Link to="/blog" className="text-brand-primary hover:underline mt-4 inline-block text-xs font-bold uppercase">&larr; Back to Learning Hub</Link>
      </div>
    );
  }

  // Quick custom parser to convert simple Markdown headings and lists to TSX elements
  const parsedContent = useMemo(() => {
    const lines = post.content.split('\n');
    let insideList = false;
    let listItems: string[] = [];
    const elements: React.ReactNode[] = [];
    let keyIdx = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${keyIdx++}`} className="list-disc pl-5 my-4 flex flex-col gap-2 font-medium text-slate-650 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        listItems = [];
        insideList = false;
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Table parsing (simple structural support)
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        
        // Skip separator line (| :--- |)
        if (trimmed.includes(':---') || trimmed.includes('---:')) {
          return;
        }

        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        const isHeader = elements.length > 0 && (elements[elements.length - 1] as any)?.type !== 'table';
        
        if (isHeader) {
          elements.push(
            <div key={`table-wrap-${keyIdx++}`} className="overflow-x-auto w-full my-6 border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left bg-white dark:bg-slate-900/60 text-xs md:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 text-[10px] md:text-xs tracking-wider uppercase">
                  <tr>
                    {cells.map((cell, idx) => (
                      <th key={idx} className="px-4.5 py-3 border-r border-slate-100 last:border-none dark:border-slate-800">
                        {cell.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                  {/* Rows will be added inline sequentially inside layout */}
                </tbody>
              </table>
            </div>
          );
        } else {
          // If already a table wrapper, inject inside body
          const prevTableWrap = elements[elements.length - 1] as React.ReactElement;
          const tableNode = prevTableWrap.props.children;
          const tbodyNode = tableNode.props.children[1];
          
          const newRow = (
            <tr key={`row-${keyIdx++}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
              {cells.map((cell, idx) => (
                <td key={idx} className="px-4.5 py-3 border-r border-slate-100 last:border-none dark:border-slate-800 font-medium" dangerouslySetInnerHTML={{
                  __html: cell.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                }} />
              ))}
            </tr>
          );

          // Workaround React element cloning to dynamically expand table body
          const updatedTableWrap = React.cloneElement(prevTableWrap, {}, 
            React.cloneElement(tableNode, {}, 
              tableNode.props.children[0], // thead
              React.createElement('tbody', { className: tbodyNode.props.className }, 
                [...(tbodyNode.props.children || []), newRow]
              )
            )
          );
          elements[elements.length - 1] = updatedTableWrap;
        }
        return;
      }

      // Headers (H3)
      if (trimmed.startsWith('###')) {
        flushList();
        const headerText = trimmed.replace('###', '').trim();
        elements.push(
          <h3
            key={`h3-${keyIdx++}`}
            id={headerText.toLowerCase().replace(/[^\w]/g, '-')}
            className="text-lg md:text-xl font-bold font-display text-slate-850 dark:text-white mt-8 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 scroll-mt-20 select-text"
          >
            {headerText}
          </h3>
        );
        return;
      }

      // Lists
      if (trimmed.startsWith('*')) {
        insideList = true;
        const itemText = trimmed.replace('*', '').trim();
        // Simple bold parser
        const formatted = itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        listItems.push(formatted);
        return;
      }

      // Paragraphs
      if (trimmed !== '') {
        flushList();
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p
            key={`p-${keyIdx++}`}
            className="text-slate-650 dark:text-slate-400 text-sm md:text-base leading-relaxed md:leading-loose font-medium select-text my-4.5"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      }
    });

    flushList();
    return elements;
  }, [post]);

  return (
    <>
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none select-text">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary uppercase tracking-wider select-none mb-6 group focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Hub Directory
        </Link>

        {/* Double-Column Post Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main post body (Left Column - 70% bounds) */}
          <article className="col-span-1 lg:col-span-8 flex flex-col gap-6 select-text pr-0 sm:pr-4">
            
            {/* Header elements */}
            <div className="flex flex-col gap-3 select-text">
              <span className="text-[10px] font-extrabold px-3 py-1.5 bg-blue-500/10 text-brand-primary rounded-lg max-w-max uppercase tracking-wider leading-none">
                {post.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display leading-tight text-slate-900 dark:text-white-900 text-slate-905 dark:text-white">
                {post.title}
              </h1>
              
              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800 pb-5 mt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} to read
                </span>
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-brand-accent animate-pulse" />
                  Authored Editorial
                </span>
              </div>
            </div>

            {/* Parsed Body */}
            <div className="select-text prose dark:prose-invert">
              {parsedContent}
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800 pt-6 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>

          </article>

          {/* Sidebar drawer (Right Column - 30% bounds) */}
          <aside className="col-span-1 lg:col-span-4 sticky top-24 flex flex-col gap-6 select-none pl-0 lg:pl-4">
            
            {/* Dynamic TOC box */}
            {headings.length > 0 && (
              <Card className="p-5.5 border-slate-100 dark:border-slate-800/80 bg-slate-50/20">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <List className="w-4.5 h-4.5 text-brand-primary" />
                  Inside this Guide
                </h3>
                <nav className="flex flex-col gap-3 text-xs md:text-sm font-semibold select-text">
                  {headings.map((heading) => {
                    const anchor = heading.toLowerCase().replace(/[^\w]/g, '-');
                    return (
                      <a
                        key={anchor}
                        href={`#${anchor}`}
                        className="text-slate-650 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 flex items-center group gap-1 outline-none transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        <span className="line-clamp-1 select-text">{heading}</span>
                      </a>
                    );
                  })}
                </nav>
              </Card>
            )}

            {/* Advisory disclaimer panel */}
            <Card className="p-5.5 border-l-4 border-l-brand-warning">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-405 uppercase">
                Regulatory compliance Note
              </span>
              <p className="text-[10.5px] text-slate-500 leading-normal mt-2">
                All investment models or tax plans specified inside this article are simulations for general educational guidance only. Verify tax and asset liabilities with bank advisors or certified chartered accountants.
              </p>
            </Card>

          </aside>

        </div>
      </div>
    </>
  );
};
export default BlogPost;
