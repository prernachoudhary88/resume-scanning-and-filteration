"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the type for filter categories
type FilterCategory = "position" | "skills" | "experience" | "location";

// Define the type for the selected filters state
type SelectedFilters = {
  position: string[];
  skills: string[];
  experience: string[];
  location: string[];
};

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    position: [],
    skills: [],
    experience: [],
    location: [],
  });

  const router = useRouter();

  // Handle selecting/unselecting filters
  const handleFilterClick = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Handle Search button click
  const handleSearch = () => {
    const query = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        query.append(key, values.join(","));
      }
    });
    router.push(`/resume-results?${query.toString()}`);
  };

  return (
    <div className="sticky left-0 h-screen p-5 bg-gray-50 overflow-y-auto border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Apply Filters</h2>
      <hr className="mb-4 border-gray-300" />
      <div className="space-y-6">
        <FilterSection
          title="Position Applied"
          category="position"
          options={["Developer", "Designer", "Manager"]}
          selectedFilters={selectedFilters}
          handleFilterClick={handleFilterClick}
        />

        <FilterSection
          title="Skills"
          category="skills"
          options={["React", "JavaScript", "Node.js"]}
          selectedFilters={selectedFilters}
          handleFilterClick={handleFilterClick}
        />

        <FilterSection
          title="Experience"
          category="experience"
          options={["1 year", "2 years", "3+ years"]}
          selectedFilters={selectedFilters}
          handleFilterClick={handleFilterClick}
        />

        <FilterSection
          title="Location"
          category="location"
          options={["Mumbai", "Chandigarh", "Remote"]}
          selectedFilters={selectedFilters}
          handleFilterClick={handleFilterClick}
        />

        <div className="text-center mt-6">
          <button
            className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
            onClick={handleSearch}
          >
            Search Resume
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Filter Section Component
type FilterSectionProps = {
  title: string;
  category: FilterCategory;
  options: string[];
  selectedFilters: SelectedFilters;
  handleFilterClick: (category: FilterCategory, value: string) => void;
};

const FilterSection = ({
  title,
  category,
  options,
  selectedFilters,
  handleFilterClick,
}: FilterSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterClick(category, option)}
            className={`flex items-center px-2.5 py-1 text-sm ${
              selectedFilters[category].includes(option)
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-700"
            } border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm`}
          >
            <span className="mr-1">
              {selectedFilters[category].includes(option) ? "✓" : "+"}
            </span>{" "}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
