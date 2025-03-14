"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [signupType, setSignupType] = useState<"default" | "email" | "employeeId">("default");

  return (
    <div className="flex h-screen">
      {/* Left Section with Image */}
      <div className="w-[80%] relative">
        <Image
          src="/images/login.png"
          alt="Signup Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Section for Signup */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 space-y-4 mb-10">
        <Image src="/images/logo.png" alt="Mahindra Logo" width={150} height={50} />

        <h2 className="text-2xl font-semibold mt-10">Create Account</h2>

        {/* Default Selection */}
        {signupType === "default" && (
          <>
            <button
              onClick={() => setSignupType("email")}
              className="w-3/4 bg-red-500 p-2 rounded-md text-white hover:bg-red-600 hover:cursor-pointer hover:scale-101"
            >
              Sign up as Student
            </button>

            <button
              onClick={() => setSignupType("employeeId")}
              className="w-3/4 border p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer hover:scale-101"
            >
              Sign up as Employee
            </button>
          </>
        )}

        {/* Email Signup Form */}
        {signupType === "email" && (
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
              Create Account
            </button>
            <button
              onClick={() => setSignupType("default")}
              className="text-sm text-gray-500 underline cursor-pointer"
            >
              Back
            </button>
          </div>
        )}

        {/* Employee ID Signup Form */}
        {signupType === "employeeId" && (
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
              Create Account
            </button>
            <button
              onClick={() => setSignupType("default")}
              className="text-sm text-gray-500 underline cursor-pointer"
            >
              Back
            </button>
          </div>
        )}

        <p className="text-xs text-gray-500">
          By signing up, you agree to Mahindra's{" "}
          <Link href="/terms" className="underline">Terms of Use</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>

        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-semibold hover:text-red-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
