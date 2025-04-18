'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data.message);

      alert('If the email exists, a password reset link has been sent.');
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Something went wrong. Please try again later.');
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
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
