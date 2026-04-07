import React, { useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialData } from './lib/schema';
import { Button, AlertModal } from './components/FormFields';
import { cn } from './lib/utils';
import Header from './components/Header';
import EditorSection from './components/EditorSection';
import PreviewSection from './components/PreviewSection';
import SplashScreen from './components/SplashScreen';
import { useResumeActions } from './hooks/useResumeActions';

function App() {
  const [cvData, setCvData] = useLocalStorage('cv-builder-data', initialData);
  const [showResetModal, setShowResetModal] = React.useState(false);
  const [isAppLoading, setIsAppLoading] = React.useState(true);
  const componentRef = useRef(null);

  const {
    handlePrint,
    handleDownload,
    handleReset,
    confirmReset,
    handleDataChange
  } = useResumeActions(cvData, setCvData, componentRef, setShowResetModal);

  return (
    <>
      {isAppLoading && <SplashScreen onComplete={() => setIsAppLoading(false)} />}
      
      <div className={cn(
        "min-h-screen bg-[#F0F2F5] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 transition-opacity duration-700",
        isAppLoading ? "opacity-0" : "opacity-100"
      )}>
      <Header 
        onReset={handleReset}
        onPrint={handlePrint}
        onPdfDownload={handleDownload}
      />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_800px] gap-8 items-start">
          <EditorSection 
            data={cvData} 
            onChange={handleDataChange} 
          />
          <PreviewSection 
            data={cvData} 
            componentRef={componentRef} 
          />
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03),transparent_40%)] pointer-events-none"></div>

      <AlertModal 
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={confirmReset}
        title="Reset Configuration?"
        message="This will permanently delete all your current progress and revert the CV to the professional default template. This action cannot be undone."
        confirmText="Reset Everything"
        cancelText="Keep Editing"
      />
      </div>
    </>
  );
}

export default App;
