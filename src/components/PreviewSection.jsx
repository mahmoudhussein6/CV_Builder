import React from 'react';
import { Spinner } from './FormFields';
const CVPreview = React.lazy(() => import('./CVPreview'));

const PreviewSection = React.memo(({ data, componentRef }) => {
  return (
    <div className="relative group max-w-full overflow-hidden xl:overflow-visible text-slate-900 border-slate-900 bg-white">
      {/* Live Indicator */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Live Preview
        </div>
      </div>

      {/* Scaleable Preview Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto xl:overflow-visible no-scrollbar">
        <div className="min-w-[800px] xl:min-w-0 origin-top p-4 sm:p-0">
          <React.Suspense fallback={<div className="h-[1123px] w-full flex items-center justify-center bg-slate-50/50 rounded-2xl"><Spinner size={40} /></div>}>
            <style dangerouslySetInnerHTML={{
              __html: `
              @media (max-width: 840px) {
                .preview-scaler { transform: scale(calc(100vw / 860)); transform-origin: top left; }
              }
            `}} />
            <div className="preview-scaler">
              <CVPreview ref={componentRef} data={data} />
            </div>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
});

export default PreviewSection;
