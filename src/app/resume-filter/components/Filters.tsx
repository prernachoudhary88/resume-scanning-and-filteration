'use client';

import { useState } from 'react';

export default function Filters({ prompt }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleUpload = async () => {
    if (!resumeFile || !prompt) {
      alert('Please provide both a resume and a job role.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('role', prompt.toLowerCase());

    try {
      const response = await fetch('http://127.0.0.1:5000/rate-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const result = await response.json();
      setRating(result.rating);
      setFeedback(result.feedback);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while rating the resume.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-red-700 mb-2">Upload Resume</h2>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setResumeFile(e.target.files[0])}
        className="mb-4 block w-full border border-red-400 rounded px-3 py-2"
      />
      <button
        onClick={handleUpload}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
      >
        Upload and Rate
      </button>

      {rating && (
        <div className="mt-4 text-red-900">
          <p className="font-semibold">Rating: {rating}/10</p>
          <p className="text-sm mt-2 whitespace-pre-line">{feedback}</p>
        </div>
      )}
    </div>
  );
}
