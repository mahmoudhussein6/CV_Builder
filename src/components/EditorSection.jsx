import React from 'react';
import { Spinner } from './FormFields';
import { ChevronRight } from 'lucide-react';
const CVForm = React.lazy(() => import('./CVForm'));

const EditorSection = React.memo(({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 font-medium px-2 sm:px-0">
        <span className="hidden sm:inline">Editor</span>
        <ChevronRight size={14} className="hidden sm:inline text-gray-300" />
        <span className="text-blue-600">Resume Configuration</span>
      </div>

      <div className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        <React.Suspense fallback={<Spinner size={32} />}>
          <CVForm data={data} onChange={onChange} />
        </React.Suspense>
      </div>
    </div>
  );
});

export default EditorSection;
