import React from 'react';
import { Layout, RefreshCw, Printer, Download } from 'lucide-react';
import { Button } from './FormFields';

const Header = React.memo(({ onReset, onPrint, onPdfDownload }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
            <Layout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ProCV Builder</h1>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest hidden sm:block">Professional Resume Creator</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Button variant="outline" size="sm" onClick={onReset} className="group p-2 sm:px-3">
            <RefreshCw size={16} className="sm:mr-2 text-gray-400 group-active:rotate-180 transition-transform duration-500" /> 
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onPrint} className="border-blue-200 text-blue-600 hover:bg-blue-50 p-2 sm:px-3">
            <Printer size={16} className="sm:mr-2" /> 
            <span className="hidden sm:inline">Print / Save</span>
          </Button>
          <Button variant="primary" size="sm" onClick={onPdfDownload} className="shadow-blue-500/20 shadow-lg p-2 sm:px-4">
            <Download size={16} className="sm:mr-2" /> 
            <span className="hidden sm:inline">PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
});

export default Header;
