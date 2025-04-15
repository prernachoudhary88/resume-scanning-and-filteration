"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAddJob() {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    deadline: "",
    salary: "",
    shortdescription: "",
  });

  const [jobs, setJobs] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/jobs", formData);
      setSuccess(true);
      setFormData({
        company: "",
        title: "",
        location: "",
        deadline: "",
        salary: "",
        shortdescription: "",
      });
      fetchJobs();
      setTimeout(() => setSuccess(false), 3000); // hide success after 3 sec
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/jobs?id=${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-4">
        Admin - Job Management
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Add, view, and delete job listings. Use the panel below to manage jobs and filter resumes.
      </p>

      {/* Browse Resumes */}
      <div className="flex justify-center mb-10">
        <a
          href="/resume-filter"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:scale-105 hover:bg-gray-900 transition-transform duration-300"
        >
          Browse Resumes
        </a>
      </div>

      {/* Job Form */}
      <div className="max-w-2xl mx-auto bg-red-50 p-8 rounded-xl shadow-md border border-red-200">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Add New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "company",
            "title",
            "location",
            "deadline",
            "salary",
            "shortdescription",
          ].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace("shortdescription", "Short Description")}
              value={(formData as any)[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          ))}

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          >
            Add Job
          </button>

          {success && (
            <p className="text-green-600 text-center font-medium">
              ✅ Job added successfully!
            </p>
          )}
        </form>
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center">
          All Posted Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-5 bg-white border border-red-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-red-500">{job.title}</h3>
                <p className="text-sm text-gray-700">Company: {job.company}</p>
                <p className="text-sm text-gray-700">Location: {job.location}</p>
                <p className="text-sm text-gray-700">Deadline: {job.deadline}</p>
                <p className="text-sm text-gray-700">Salary: {job.salary}</p>
                <p className="text-sm text-gray-700 mb-3">
                  Description: {job.shortdescription}
                </p>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
