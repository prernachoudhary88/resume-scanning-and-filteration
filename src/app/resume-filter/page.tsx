'use client';

import { useState } from 'react';
import Filters from './components/Filters';
import JobDropdown from './components/Chatbot';

export default function ResumeFilterPage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Filters + Resume Upload */}
      <div className="fixed top-0 left-0 h-screen w-1/4 bg-red-100 p-4 overflow-y-auto border-r-4 border-red-500">
        <h1 className="text-2xl font-bold text-red-800 mb-6">Mahindra Resume Filter</h1>
        <Filters prompt={prompt} />
      </div>

      {/* Right Panel - Dropdown for job role selection */}
      <div className="flex-1 ml-[25%] p-6">
        <JobDropdown onPromptChange={setPrompt} />
      </div>
    </div>
  );
}
