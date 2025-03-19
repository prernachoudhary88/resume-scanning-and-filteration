"use client";

import { useState } from "react";
import ApplyForm from "./components/ApplyForm";
import SuccessModal from "./components/SuccessModal";
import UploadNavbar from "./components/UploadNavbar";
import Link from "next/link"; // Import Link from next/link

const jobListings = [
  { id: 1, company: "Tech Mahindra", title: "Software Engineer Intern", location: "Remote", deadline: "16 Feb 2026", salary: "20,000 monthly", shortdescription: "Work on real-world projects and gain industry experience." },
  { id: 2, company: "Tech Mahindra", title: "Senior Web Developer", location: "Remote", deadline: "27 Feb 2026", salary: "20,000 monthly", shortdescription: "Work on real-world projects and gain industry experience." },
  { id: 3, company: "Tech Mahindra", title: "Data Scientist", location: "Remote", deadline: "1 Feb 2026", salary: "20,000 monthly", shortdescription: "Work on real-world projects and gain industry experience." },
  { id: 4, company: "Tech Mahindra", title: "Specialist Programmer", location: "Remote", deadline: "23 Feb 2026", salary: "20,000 monthly", shortdescription: "Work on real-world projects and gain industry experience." },
];

export default function UploadResumePage() {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const openForm = (job: any) => {
    setSelectedJob(job);
    setShowApplyForm(true);
  };

  const closeForm = () => {
    setShowApplyForm(false);
    setSelectedJob(null);
  };

  const handleFormSubmit = () => {
    setShowApplyForm(false); // Close the ApplyForm
    setShowSuccessModal(true); // Show the SuccessModal
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false); // Close the SuccessModal
  };

  return (
    <>
      {/* Wrap the entire content (including the navbar) in the opacity div */}
      <div className={`transition-all duration-300 ${showApplyForm || showSuccessModal ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
        <UploadNavbar />

        <div className="p-10">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-4">Job Opportunities</h1>
            <p>Explore exciting opportunities tailored for students! Browse through internships and job openings, find the perfect role, and kickstart your career. Apply now and take the next step toward your future!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-red-600 mb-2">{job.title}</h2>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Company: {job.company}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Location: {job.location}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Deadline: {job.deadline}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Stipend / Salary: {job.salary}</p>
                <p className="text-gray-700 mb-2 text-sm font-semibold">Description: {job.shortdescription}</p>

                <div className="flex justify-between items-center mt-4">
                  {/* Updated "Details" button with Link */}
                  <Link
                    href={`/jobs/${job.id}`} // Link to the details page
                    className="border border-black text-black px-10 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => openForm(job)}
                    className="bg-red-500 text-white px-12 py-2 rounded-lg shadow-md hover:bg-red-600 hover:cursor-pointer transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Form (Separate Component) */}
      {showApplyForm && <ApplyForm job={selectedJob} onClose={closeForm} onSubmit={handleFormSubmit} />}

      {/* Success Modal (Separate Component) */}
      {showSuccessModal && <SuccessModal onClose={closeSuccessModal} />}
    </>
  );
}