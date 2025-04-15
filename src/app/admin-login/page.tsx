'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("adminEmail", email); // Store session for admin
      router.push("/admin-add-job");
    } else {
      setError(data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Image */}
      <div className="w-[80%] relative">
        <Image
          src="/images/login.png"
          alt="Login Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 space-y-4 mb-10 relative">
        <div className='absolute text-center top-15 z-10'>
          <Image src="/images/logo.png" alt="Mahindra Logo" width={150} height={50} />
        </div>

        <h2 className="text-2xl font-semibold mt-10">Admin Login</h2>

        <div className="space-y-4 w-full max-w-sm border border-gray-300 pt-10 p-5 rounded">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Log in
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
