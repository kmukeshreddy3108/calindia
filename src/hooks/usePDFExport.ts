/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '../context/ToastContext';

export function usePDFExport() {
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const exportPDF = async (elementId: string, filename: string = 'fincalc-export') => {
    const element = document.getElementById(elementId);
    if (!element) {
      showToast('Could not find report content', 'error');
      return;
    }

    setIsExporting(true);
    showToast('Preparing your PDF report...', 'info', 2000);

    try {
      // Create high resolution canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 standard width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF, supporting multiple pages if calculation tables are long
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}-${Date.now()}.pdf`);
      showToast('PDF downloaded successfully!', 'success');
    } catch (e) {
      console.error('PDF Export Error', e);
      showToast('Failed to export PDF report', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return { exportPDF, isExporting };
}
