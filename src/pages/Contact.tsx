/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';
import { Mail, Phone, MapPin, CheckCircle, FileText, Send, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(' Please populate name, email, and message inputs before dispatch.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1250);
  };

  return (
    <>
      <SEOHead
        title="Contact Us — Feedback & Inquiries"
        description="Connect with the FinCalc India technical advisory board. Provide suggestions, request custom metrics calculators, or report calculations bugs."
        canonical="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 select-none font-sans">
        
        {/* Header Block */}
        <div className="max-w-3xl flex flex-col gap-2.5 mb-12 select-text">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-905 dark:text-white">
            We Value Your <span className="text-brand-primary font-display">Feedback</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Have a suggestion for a new financial calculator layout? Spotted a calculation bug relative to your local credit schedules? Send a message directly to our advisory board.
          </p>
        </div>

        {/* Double-Column Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-text">
          
          {/* Email/Form Sheet (Left Column - 60% bounds) */}
          <Card className="col-span-1 lg:col-span-7 p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800 shadow-sm relative overflow-hidden bg-white dark:bg-slate-800">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 select-none animate-fadeIn">
                <div className="p-3 bg-emerald-500/10 text-brand-accent dark:bg-emerald-500/20 dark:text-emerald-450 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-2">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed font-semibold">
                  Thank you for your valuable feedback. Our compliance and engineering board will review your calculation references and reach out within 2 business days.
                </p>
                <div className="flex justify-center mt-6">
                  <Button
                    variant="primary"
                    size="sm"
                    className="px-4.5 py-1.5 leading-none shrink-0 cursor-pointer"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-5">
                    <Send className="w-4 h-4 text-brand-primary" />
                    Submit Feedback Form
                  </h3>

                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border-l-4 border-l-red-500 text-red-500 text-xs font-bold rounded-r-lg mb-4 leading-normal">
                      {errorMsg}
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <Input
                      label="Your Full Name"
                      value={name}
                      onChange={setName}
                      id="contact-name"
                      placeholder="e.g. Amit Sharma"
                    />

                    <Input
                      label="Your Email Address"
                      value={email}
                      type="email"
                      onChange={setEmail}
                      id="contact-email"
                      placeholder="e.g. amit@sharma.in"
                    />

                    <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent opacity-100">
                      <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Inquiry Subject</span>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-705 bg-white dark:bg-slate-805 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-primary font-semibold"
                      >
                        <option value="Feedback">Generals Feedback & Suggestions</option>
                        <option value="Bug Report">Spotted Calcs Bug</option>
                        <option value="Custom Request">Request New Calculator Slabs</option>
                        <option value="Partnership">Advisor Board Inquiries</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 bg-transparent">
                      <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Your Message Content</span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Detail your request, calculation formula references, or error details..."
                        className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-202 dark:border-slate-705 bg-white dark:bg-slate-805 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-primary min-h-[100px] leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5.5 py-1.5 leading-none shrink-0"
                  >
                    {isSubmitting ? 'Dispatching...' : 'Dispatch Message'}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* supportive contact info (Right Column - 40% bounds) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 select-text select-none">
            
            {/* Quick vectors info */}
            <Card className="p-5.5 border border-slate-200/50 dark:border-slate-800 shadow-sm bg-slate-50/20">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                Office Information
              </h3>
              <div className="flex flex-col gap-4 select-text">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-brand-primary/10 text-brand-primary dark:bg-blue-500/25 rounded-xl border border-blue-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider">HQ Address</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mt-1 font-semibold">
                      FinCalc India Research Wing,<br />
                      Level 4, Maker Chambers VI, Nariman Point,<br />
                      Mumbai, Maharashtra — 400021
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <div className="p-2.5 bg-brand-accent/10 text-brand-accent dark:bg-emerald-500/25 rounded-xl border border-emerald-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider">Email Channels</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-453 leading-relaxed mt-1 font-semibold">
                      support@fincalc.org.in<br />
                      compliance@fincalc.org.in
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Micro map vector mockup */}
            <div className="w-full h-44 rounded-2xl border border-slate-205 dark:border-slate-850 bg-slate-100 dark:bg-slate-900 border-dashed flex flex-col justify-center items-center gap-2 p-6 text-center select-none relative overflow-hidden">
              {/* background vector rings */}
              <div className="absolute w-48 h-48 rounded-full border border-slate-200/50 dark:border-slate-800/30 -right-10 -bottom-10 pointer-events-none" />
              <div className="absolute w-64 h-64 rounded-full border border-slate-150/40 dark:border-slate-800/20 -right-20 -bottom-20 pointer-events-none" />

              <MapPin className="w-6 h-6 text-slate-400 dark:text-slate-550 animate-bounce" />
              <h4 className="text-xs font-bold text-slate-605 dark:text-slate-400">
                Mumbai Financial District
              </h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-650 max-w-xs mt-1.5 leading-relaxed font-semibold">
                Our quant advisors hold weekly compliance loops in Nariman Point, ensuring financial models mirror direct SBI floating benchmark curves.
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
export default Contact;
