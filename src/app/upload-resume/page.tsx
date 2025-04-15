"use client";

import { useEffect, useState } from "react";
import ApplyForm from "./components/ApplyForm";
import SuccessModal from "./components/SuccessModal";
import UploadNavbar from "./components/UploadNavbar";
import { useRouter } from "next/navigation";

export default function UploadResumePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        router.replace("/login");
      }
    }
  }, [isClient, router]);

  useEffect(() => {
    if (!isClient) return;

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      router.replace("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();

    const stored = localStorage.getItem(`appliedJobs_${userEmail}`);
    if (stored) {
      setAppliedJobs(JSON.parse(stored));
    }
  }, [isClient, router]);

  const openForm = (job: any) => {
    setSelectedJob(job);
    setShowApplyForm(true);
  };

  const closeForm = () => {
    setShowApplyForm(false);
    setSelectedJob(null);
  };

  const handleFormSubmit = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (selectedJob && userEmail) {
      const updated = [...appliedJobs, selectedJob.id];
      setAppliedJobs(updated);
      localStorage.setItem(`appliedJobs_${userEmail}`, JSON.stringify(updated));
    }
    setShowApplyForm(false);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (!isClient) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          showApplyForm || showSuccessModal ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
      >
        <UploadNavbar />

        <div className="p-10">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-4">Job Opportunities</h1>
            <p>
              Explore exciting opportunities tailored for students! Browse through internships and job openings, find
              the perfect role, and kickstart your career. Apply now and take the next step toward your future!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-red-600 mb-2">{job.title}</h2>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Company: {job.company}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Location: {job.location}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Deadline: {job.deadline}</p>
                <p className="text-gray-700 mb-1 text-sm font-semibold">Stipend / Salary: {job.salary}</p>
                <p className="text-gray-700 mb-2 text-sm font-semibold">Description: {job.shortdescription}</p>

                <div className="flex justify-end items-center mt-4">
                  <button
                    onClick={() => openForm(job)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`px-12 py-2 rounded-lg shadow-md transition ${
                      appliedJobs.includes(job.id)
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showApplyForm && <ApplyForm job={selectedJob} onClose={closeForm} onSubmit={handleFormSubmit} />}
      {showSuccessModal && <SuccessModal onClose={closeSuccessModal} />}
    </>
  );
}
