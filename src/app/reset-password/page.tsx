'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password reset logic here (API call)
    console.log('Password successfully reset:', password);
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-3/4 relative">
        <Image
          src="/images/login.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <Image src="/images/logo.png" alt="Mahindra Logo" width={150} height={50} />

        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-sm border border-gray-300 p-6 rounded mt-10"
        >
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <div className="flex justify-between">
            <Link href="/login" className="px-4 py-2 border rounded hover:bg-gray-100">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
