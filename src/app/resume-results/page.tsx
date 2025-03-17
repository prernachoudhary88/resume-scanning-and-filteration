"use client";

import { useSearchParams, useRouter } from "next/navigation";
import EmployeeNavbar from "../resume-filter/components/EmployeeNavbar";

const mockResumes = [
  {
    name: "John Doe",
    email: "john@example.com",
    position: "Developer",
    experience: "2 years",
    skills: ["React", "JavaScript"],
    location: "Mumbai",
    downloadLink: "#",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    position: "Designer",
    experience: "3+ years",
    skills: ["Node.js", "JavaScript"],
    location: "Chandigarh",
    downloadLink: "#",
  },
];

export default function ResumeResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    position: searchParams.get("position")?.split(",") || [],
    skills: searchParams.get("skills")?.split(",") || [],
    experience: searchParams.get("experience")?.split(",") || [],
    location: searchParams.get("location")?.split(",") || [],
  };

  const filteredResumes = mockResumes.filter((resume) => {
    return (
      (!filters.position.length || filters.position.includes(resume.position)) &&
      (!filters.skills.length || resume.skills.some((skill) => filters.skills.includes(skill))) &&
      (!filters.experience.length || filters.experience.includes(resume.experience)) &&
      (!filters.location.length || filters.location.includes(resume.location))
    );
  });

  return (
    <>
    <div className="shadow fixed top-0 z-50 right-0 left-0">
        <EmployeeNavbar/>
    </div>
    <div className="max-w-4xl mx-auto py-22 px-15 bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-gray-500 underline hover:cursor-pointer hover:text-gray-600 transition"
      >
        ← Back to Filters
      </button>

      <h2 className="text-2xl font-bold mb-2 text-gray-800">Resumes Matching Your Criteria</h2>
      <p className="mb-4 text-gray-600">
      Below is the list of resumes that match your specified conditions. You can review the details and download the resumes as needed.
      </p>
      <p className="font-semibold mb-6 text-gray-700">
        Total Resumes Found: <span className="text-blue-600">{filteredResumes.length}</span>
      </p>

      {filteredResumes.map((resume, index) => (
        <div key={index} className="mb-5 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
          <p><strong>Name:</strong> {resume.name}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Position Applied:</strong> {resume.position}</p>
          <p><strong>Experience:</strong> {resume.experience}</p>
          <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
          <p>
            <strong>Download Resume:</strong>{" "}
            <a
              href={resume.downloadLink}
              className="text-blue-500 underline hover:text-blue-600 transition"
            >
              Download Link
            </a>
          </p>
        </div>
      ))}

      <p>If you need more details or want to refine your search, please adjust the filters and try again.</p>

      {filteredResumes.length === 0 && (
        <p className="text-red-500 text-center mt-6">
          No resumes found. Please adjust the filters and try again.
        </p>
      )}
    </div>
    </>
  );
}
