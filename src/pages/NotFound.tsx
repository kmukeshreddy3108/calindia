/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="404 — Screen Not Found — FinCalc"
        description="The calculator route you are looking for has been nested or does not exist. Return home to try again."
        canonical="/404"
      />

      <div className="max-w-md mx-auto px-4 py-20 sm:py-32 select-none text-center font-sans">
        
        <Card className="p-8 border border-slate-200/50 dark:border-slate-805 flex flex-col items-center shadow-md bg-white dark:bg-slate-800">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-full mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <h1 className="text-3xl font-extrabold font-display leading-none text-slate-850 dark:text-white">
            404 Error
          </h1>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Component or Page Not Found
          </h2>

          <p className="text-xs text-slate-500 hover:text-slate-550 dark:text-slate-450 mt-4 leading-relaxed font-semibold">
            The resource you attempted to open does not exist or has been relocated.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 uppercase font-extrabold text-xs tracking-wider gap-1.5 justify-center py-2 cursor-pointer border-slate-205"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1 uppercase font-extrabold text-xs tracking-wider gap-1.5 justify-center py-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Home className="w-3.5 h-3.5" />
              Return Home
            </Button>
          </div>
        </Card>

      </div>
    </>
  );
};
export default NotFound;
