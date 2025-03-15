"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

interface ApplyFormProps {
    job: any;
    onClose: () => void;
    onSubmit: () => void;
}

export default function ApplyForm({ job, onClose, onSubmit }: ApplyFormProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [resume, setResume] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., API call)
        console.log("Form submitted:", { fullName, email, resume });
        onSubmit(); // Trigger the success modal
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl relative z-10 border-1 border-gray-400">
                <h2 className="text-red-600 font-bold text-lg mb-2">Apply for {job?.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Please fill in the details correctly to apply for this position.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="text-gray-800 text-sm">Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />

                    <label className="text-gray-800 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />

                    <label className="text-gray-800 text-sm">Upload Resume (only .pdf format allowed)</label>
                    <div className="flex items-center gap-2">
                        {/* Upload Button */}
                        <label className="cursor-pointer">
                            <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm flex items-center gap-2 hover:bg-gray-200">
                                Upload <FiUpload />
                            </span>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                                required
                            />
                        </label>

                        {/* File Name or "No file chosen" Message */}
                        <span className="text-sm text-gray-500">
                            {resume ? resume.name : "No file chosen"}
                        </span>
                    </div>

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
                            className="px-10 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}