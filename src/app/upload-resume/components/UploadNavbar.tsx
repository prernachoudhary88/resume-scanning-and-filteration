"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadNavbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-red-500 text-white shadow-md">
      <Link href="/" className="text-xl font-bold">Mahindra Careers</Link>
      <div className="flex items-center space-x-6">
        {userEmail && <span className="font-semibold">{userEmail}</span>}
        <button onClick={handleLogout} className="bg-white text-red-500 px-4 py-1 rounded hover:bg-red-100">
          Logout
        </button>
      </div>
    </nav>
  );
}
