'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [activeForm, setActiveForm] = useState<"default" | "email" | "employeeId">("default");

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
        <h2 className="text-2xl font-semibold mt-10">Log in</h2>

        {activeForm === "default" && (
          <>
            <button
              className="w-3/4 border p-2 rounded-md hover:bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer hover:scale-101"
            >
              <Image src="/icons/search.png" alt="Google" width={20} height={20} />
              Continue with Google
            </button>

            <button
              className="w-3/4 border p-2 rounded-md hover:bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer hover:scale-101"
            >
              <Image src="/icons/apple.png" alt="Apple" width={20} height={20} />
              Continue with Apple
            </button>

            <p className="text-gray-500">or</p>

            <button
              onClick={() => setActiveForm("email")}
              className="w-3/4 border p-2 rounded-md hover:bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer hover:scale-101"
            >
              <Image src="/icons/mail.png" alt="Email" width={20} height={20} />
              Continue with Email
            </button>

            <p className="text-sm text-gray-500">
              If you are an employee, continue with your employee ID
            </p>

            <button
              onClick={() => setActiveForm("employeeId")}
              className="w-3/4 border p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer hover:scale-101"
            >
              Continue with Employee ID
            </button>
          </>
        )}

        {activeForm === "email" && (
          <div className="space-y-4 w-full max-w-sm border border-gray-300 pt-10 p-5 rounded">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
              Log in
            </button>
            <Link
              href="/forget-password"
              className="text-sm text-center underline cursor-pointer hover:text-blue-600 block"
            >
              Forgot password?
            </Link>
            <button
              onClick={() => setActiveForm("default")}
              className="text-sm text-gray-500 underline cursor-pointer"
            >
              Back
            </button>
          </div>
        )}

        {activeForm === "employeeId" && (
          <div className="space-y-4 w-full max-w-sm border border-gray-300 pt-10 p-5 rounded">
            <input
              type="text"
              placeholder="Employee ID"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
              Log in
            </button>
            <Link
              href="/forget-password"
              className="text-sm text-center underline cursor-pointer hover:text-blue-600 block"
            >
              Forgot password?
            </Link>
            <button
              onClick={() => setActiveForm("default")}
              className="text-sm text-gray-500 underline cursor-pointer"
            >
              Back
            </button>
          </div>
        )}

        <p className="text-xs text-gray-500">
          By continuing, you agree to Mahindra's{" "}
          <a
            href="https://www.mahindra.com/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-500 transition">
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="https://www.mahindra.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-500 transition"
          >
            Privacy Policy
          </a>
        </p>

        <p>
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-red-500 font-semibold hover:text-red-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
