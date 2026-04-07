import React, { useRef, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialData } from './lib/schema';
import { Download, RefreshCw, Layers, Layout, ChevronRight, Menu, Printer, FileText } from 'lucide-react';
import { Button } from './components/FormFields';
import { useReactToPrint } from 'react-to-print';

// Performance: Code Splitting
const CVForm = React.lazy(() => import('./components/CVForm'));
const CVPreview = React.lazy(() => import('./components/CVPreview'));

function App() {
  const [cvData, setCvData] = useLocalStorage('cv-builder-data', initialData);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV`,
  });

  const handleDownload = useCallback(async () => {
    const element = componentRef.current;
    if (!element) return;

    // Dynamic Import for performance
    const html2pdf = (await import('html2pdf.js')).default;
    
    const opt = {
      margin: [10, 0, 10, 0], // Top, Left, Bottom, Right margin in mm
      filename: `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV.pdf`,
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }, // Robust page breaking
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          // Robust fix for Tailwind v4 oklch colors which html2canvas cannot parse
          const elements = clonedDoc.querySelectorAll('.printable-cv, .printable-cv *');
          const cvRoot = clonedDoc.querySelector('.printable-cv');
          if (cvRoot) cvRoot.classList.add('pdf-export-mode'); 

          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            
            // 1. Manually replace key UI colors with RGB equivalents
            if (style.color && style.color.includes('oklch')) el.style.color = 'rgb(31, 41, 55)';
            if (style.borderColor && style.borderColor.includes('oklch')) el.style.borderColor = 'rgb(209, 213, 219)';
            if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
              el.style.backgroundColor = el.classList.contains('bg-white') ? 'white' : 'transparent';
            }

            // 2. Remove all Tailwind v4 custom properties which often use oklch
            // and are the main cause of html2canvas failure
            if (typeof el.className === 'string') {
              el.className.split(' ').forEach(cls => {
                if (cls.startsWith('text-') || cls.startsWith('bg-') || cls.startsWith('border-')) {
                  el.style.setProperty('color-scheme', 'light');
                }
              });
            }
            
            // Scan for any computed style that contains oklch and unset it
            // or use standard RGB fallbacks from our index.css
          });
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }, [cvData]);

  const handleWordDownload = useCallback(async () => {
    const element = componentRef.current;
    if (!element) return;

    // Dynamic Import for performance
    const { asBlob } = await import('html-docx-js-typescript');
    const { saveAs } = await import('file-saver');

    // We need to inject some basic styling for Word to understand
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1 { color: #1f2937; }
            h2 { border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; color: #1f2937; }
            .section { margin-bottom: 20px; }
            ul { margin-left: 20px; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `;

    const blob = await asBlob(content);
    saveAs(blob, `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV.docx`);
  }, [cvData.personalInfo.fullName]);

  const handleReset = useCallback(() => {
    if (confirm("This will reset all data to the default template. Are you sure?")) {
      setCvData(initialData);
    }
  }, [setCvData]);

  const handleDataChange = useCallback((newData) => {
    setCvData((prev) => ({ ...prev, ...newData }));
  }, [setCvData]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
              <Layout size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ProCV Builder</h1>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest hidden sm:block">Professional Resume Creator</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={handleReset} className="hidden lg:flex group">
              <RefreshCw size={16} className="mr-2 text-gray-400 group-active:rotate-180 transition-transform duration-500" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint} className="hidden sm:flex border-blue-200 text-blue-600 hover:bg-blue-50">
              <Printer size={16} className="mr-2" /> Print/Save High Quality
            </Button>
            <Button variant="outline" size="sm" onClick={handleWordDownload} className="hidden lg:flex border-green-200 text-green-600 hover:bg-green-50">
              <FileText size={16} className="mr-2" /> Word
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownload} className="shadow-blue-500/20 shadow-xl">
              <Download size={16} className="mr-2" /> Direct PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_800px] gap-8 lg:gap-12">
          
          {/* Left Side: Editor Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 font-medium px-2 sm:px-0">
              <span className="hidden sm:inline">Editor</span>
              <ChevronRight size={14} className="hidden sm:inline text-gray-300" />
              <span className="text-blue-600">Resume Configuration</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
              <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center text-gray-400">Loading editor...</div>}>
                <CVForm data={cvData} onChange={handleDataChange} />
              </React.Suspense>
            </div>
          </div>

          {/* Right Side: Visual Preview */}
          <div className="relative group max-w-full overflow-hidden xl:overflow-visible text-slate-900 border-slate-900 bg-white">
            {/* Live Indicator */}
            <div className="flex items-center justify-between mb-4 px-2 xl:px-0">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                 Live Preview
               </div>
            </div>

            {/* Scaleable Preview Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto xl:overflow-visible no-scrollbar">
              <div className="min-w-[800px] xl:min-w-0 origin-top p-4 sm:p-0">
                <React.Suspense fallback={<div className="h-[1123px] w-[800px] bg-slate-50 animate-pulse flex items-center justify-center">Loading preview...</div>}>
                  <style dangerouslySetInnerHTML={{ __html: `
                    @media (max-width: 840px) {
                      .preview-scaler { transform: scale(calc(100vw / 860)); transform-origin: top left; }
                    }
                  `}} />
                  <div className="preview-scaler">
                    <CVPreview ref={componentRef} data={cvData} />
                  </div>
                </React.Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03),transparent_40%)] pointer-events-none"></div>
    </div>
  );
}

export default App;
