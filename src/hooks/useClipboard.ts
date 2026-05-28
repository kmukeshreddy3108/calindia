/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copy = async (text: string, successMessage: string = 'Copied to clipboard!') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(successMessage, 'success');
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy', 'error');
      return false;
    }
  };

  return { copied, copy };
}
