'use client';

const jobRoles = [
  'software developer',
  'data scientist',
  'data analyst',
  'ui/ux designer',
  'frontend developer',
  'backend developer',
  'devops engineer',
  'machine learning engineer',
  'network engineer',
  'cloud engineer',
  'mobile app developer',
  'qa engineer',
  'business analyst',
  'product manager',
  'ai engineer',
  'cybersecurity analyst',
  'blockchain developer',
  'full stack developer',
  'game developer',
  'content writer',
  'digital marketer',
  'graphic designer',
  'hr manager',
  'sales executive',
  'technical support specialist'
];

export default function JobDropdown({ onPromptChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-red-700">Select Job Role</h2>
      <select
        onChange={(e) => onPromptChange(e.target.value)}
        className="w-full border border-red-400 bg-red-50 text-red-800 rounded px-4 py-2"
      >
        <option value="">-- Choose a Role --</option>
        {jobRoles.map((role, index) => (
          <option key={index} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
