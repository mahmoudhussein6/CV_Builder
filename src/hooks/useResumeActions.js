import { useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { initialData } from '../lib/schema';

export const useResumeActions = (cvData, setCvData, componentRef, setShowResetModal) => {
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV`,
  });

  const handleDownload = useCallback(async () => {
    const element = componentRef.current;
    if (!element) return;

    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: [10, 0, 10, 0],
      filename: `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV.pdf`,
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const cvRoot = clonedDoc.querySelector('.printable-cv');
          if (cvRoot) cvRoot.classList.add('pdf-export-mode');
          
          clonedDoc.querySelectorAll('.printable-cv, .printable-cv *').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.color && style.color.includes('oklch')) el.style.color = 'rgb(31, 41, 55)';
            if (style.borderColor && style.borderColor.includes('oklch')) el.style.borderColor = 'rgb(209, 213, 219)';
            if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
              el.style.backgroundColor = el.classList.contains('bg-white') ? 'white' : 'transparent';
            }
          });
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }, [cvData, componentRef]);


  const handleReset = useCallback(() => setShowResetModal(true), [setShowResetModal]);
  
  const confirmReset = useCallback(() => {
    setCvData(initialData);
    setShowResetModal(false);
  }, [setCvData, setShowResetModal]);

  const handleDataChange = useCallback((newData) => {
    setCvData((prev) => ({ ...prev, ...newData }));
  }, [setCvData]);

  return {
    handlePrint,
    handleDownload,
    handleReset,
    confirmReset,
    handleDataChange
  };
};
