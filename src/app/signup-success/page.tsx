"use client";

import Link from "next/link";
import Image from "next/image";

export default function SignupSuccessPage() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md space-y-4 flex flex-col items-center">
        {/* Success Icon */}
        <Image src="/icons/check.png" alt="Success" width={50} height={50} />

        {/* Success Message */}
        <h2 className="text-2xl font-semibold text-green-600">Registration Successful!</h2>
        <p className="text-gray-600">
          Your account has been created successfully. Please log in to continue.
        </p>

        {/* Go to Login Button */}
        <Link href="/login">
          <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mb-5">
            Go to Login
          </button>
        </Link>

        {/* Optional Link to Home */}
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
