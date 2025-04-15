'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing token.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Password reset successful!");
        router.push('/login'); // redirect to login after reset
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert("Error resetting password. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-[80%] relative">
        <Image
          src="/images/login.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="absolute text-center top-15 z-10">
          <Image src="/images/logo.png" alt="Mahindra Logo" width={150} height={50} />
        </div>

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
