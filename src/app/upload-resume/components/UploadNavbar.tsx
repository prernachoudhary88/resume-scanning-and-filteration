"use client"; // Required for using hooks like usePathname and useState

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { usePathname } from "next/navigation"; // For Next.js routing
import { useState, useRef, useEffect } from "react"; // For managing dropdown state and click outside logic

export default function UploadNavbar() {
  const pathname = usePathname(); // Get the current route
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navbar links with their paths
  const navLinks = [
    { name: "Dashboard", path: "/upload-resume" },
    { name: "Already Applied", path: "/already-applied" },
    { name: "Contact Us", path: "https://www.mahindra.com/contact-us" }, // Updated to external URL
  ];

  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white relative">
      {/* Left: Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
      </Link>

      {/* Center: Navigation Links */}
      <div className="space-x-10 text-gray-900 font-bold">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`hover:text-red-500 transition-colors ${
              pathname === link.path ? "text-red-500" : "text-gray-900"
            }`}
            target={link.path.startsWith("http") ? "_blank" : "_self"} // Open external links in a new tab
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right: Profile Icon with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none"
        >
          <FaUserCircle size={28} className="text-gray-700 cursor-pointer hover:text-red-500" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              View Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                // Handle logout logic here
                console.log("User logged out");
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}