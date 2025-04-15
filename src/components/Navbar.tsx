"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white">
      <Link href="/">
        <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
      </Link>

      <div className="space-x-10 text-gray-900 font-bold">
        <a
          href="https://www.mahindra.com/about-us"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          About Us
        </a>
        <a
          href="https://www.mahindra.com/careers"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          Careers
        </a>
        <a
          href="https://www.mahindra.com/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          Contact
        </a>
      </div>

      <div>
        {userEmail ? (
          <span className="text-red-500 font-semibold">{userEmail}</span>
        ) : (
          <Link href="/login" className="text-red-500 font-semibold hover:underline">
            Login / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}
