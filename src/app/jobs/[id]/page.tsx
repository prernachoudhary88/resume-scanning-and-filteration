"use client";

import { useParams } from "next/navigation";
import Link from "next/link"; // For the back button
import UploadNavbar from "../../upload-resume/components/UploadNavbar"; // Import the navbar
import { FaClock, FaCalendarAlt, FaMoneyBillAlt, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa"; // Icons
import { useEffect, useState } from "react"; // For loading state and API calls

// Mock data for job details (replace with actual API call)
const jobDetails = {
  "1": {
    title: "Software Engineer Intern",
    company: {
      name: "Tech Mahindra",
      about: "Tech Mahindra is a leading provider of digital transformation, consulting, and business re-engineering services. We are a USD 5.2 billion company with 145,000+ professionals across 90 countries.",
      socialMedia: {
        linkedin: "https://linkedin.com/company/tech-mahindra",
        twitter: "https://twitter.com/tech_mahindra",
      },
    },
    location: "Remote",
    posted: "Posted 5 days ago",
    type: "Full time",
    deadline: "February 16, 2026",
    salary: "20,000 monthly",
    description:
      "We are seeking a Software Engineer Intern with expertise in different software development models and web monitoring to join Mahindra Rise dynamic software development team. The ideal candidate will have a deep understanding of software engineering principles, threat detection methodologies, and hands-on experience in managing security incidents.",
    responsibilities: [
      "Design and Development: Develop, maintain, and enhance web applications using C#, Asp .Net, MVC, Angular, Web API, SQL Server. Write clean, scalable, and maintainable code.",
      "Frontend Development: Build intuitive user interfaces and ensure responsiveness and performance using Angular, JavaScript, jQuery, HTML, CSS, Bootstrap.",
    ],
    skills: [
      "Proficiency in C#, Asp .Net, MVC, Angular, and SQL Server.",
      "Strong understanding of frontend technologies like JavaScript, jQuery, HTML, and CSS.",
      "Experience with RESTful APIs and web services.",
      "Knowledge of software development best practices and version control systems like Git.",
    ],
    contact: {
      email: "careers@techmahindra.com",
      phone: "+1 (123) 456-7890",
    },
  },
  // Add more job details as needed
};


// Define the type for job details
type JobDetails = {
  title: string;
  company: {
    name: string;
    about: string;
    socialMedia: {
      linkedin: string;
      twitter: string;
    };
  };
  location: string;
  posted: string;
  type: string;
  deadline: string;
  salary: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  contact: {
    email: string;
    phone: string;
  };
};

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching job details from an API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Replace with actual API call
        const data = jobDetails[jobId as keyof typeof jobDetails] as JobDetails | undefined;
        if (!data) {
          throw new Error("Job not found");
        }
        setJob(data);
      } catch (err) {
        // Narrow down the type of 'err'
        if (err instanceof Error) {
          setError(err.message); // Access 'err.message' safely
        } else {
          setError("An unknown error occurred"); // Handle non-Error types
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobDetails();
  }, [jobId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-5xl">{error}</p>
      </div>
    );
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <>
      {/* Navbar */}
      <UploadNavbar />

      {/* Job Details Section */}
      <div className="p-10 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Back Button */}
          <Link
            href="/upload-resume"
            className="text-gray-600 hover:text-red-500 transition mb-4 inline-block flex items-center"
          >
            ← Back to Jobs
          </Link>

          {/* Company Logo and Name */}
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{job.company.name}</h2>
          </div>

          {/* Job Title */}
          <h1 className="text-3xl font-bold text-red-500 mb-4">{job.title}</h1>

          {/* Job Metadata with Icons */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="font-semibold">Location: </span> {job.location}
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-gray-500" />
              <span className="font-semibold">Posted: </span> {job.posted}
            </div>
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span className="font-semibold">End Date: </span> {job.deadline}
            </div>
            <div className="flex items-center text-gray-700">
              <FaMoneyBillAlt className="mr-2 text-gray-500" />
              <span className="font-semibold">Salary: </span> {job.salary}
            </div>
            <div className="flex items-center text-gray-700">
              <FaBriefcase className="mr-2 text-gray-500" />
              <span className="font-semibold">Job Type: </span> {job.type}
            </div>
          </div>

          {/* Apply Button */}
          <button className="bg-red-500 text-white px-10 py-2 rounded-lg shadow-md hover:bg-red-600 transition mb-8">
            Apply
          </button>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          {/* Skills Required */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills Required</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* About the Company */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Company</h2>
            <p className="text-gray-700">{job.company.about}</p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="mr-2 text-gray-500" />
                <span>{job.contact.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="mr-2 text-gray-500" />
                <span>{job.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href={job.company.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-red-500 transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={job.company.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-red-500 transition"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}