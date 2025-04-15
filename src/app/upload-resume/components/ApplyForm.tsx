"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

interface Job {
  id: number;
  title: string;
}

interface ApplyFormProps {
  job: Job;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ApplyForm({ job, onClose, onSubmit }: ApplyFormProps) {
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      setError("Resume file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", job.id.toString());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Application failed.");
        return;
      }

      onSubmit(); // Success callback
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl relative z-10 border border-gray-400">
        <h2 className="text-red-600 font-bold text-lg mb-2">
          Apply for {job?.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload your resume in PDF format to apply for this position.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-gray-800 text-sm">Upload Resume (.pdf)</label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm flex items-center gap-2 hover:bg-gray-200">
                Upload <FiUpload />
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500">
              {resume ? resume.name : "No file chosen"}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
