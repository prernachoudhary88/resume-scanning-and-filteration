"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const payload = {
      name: form.name || "Student",
      email: form.email,
      password: form.password,
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess("REGISTRATION SUCCESSFUL ✅");
      setError("");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Image */}
      <div className="w-[80%] relative">
        <Image
          src="/images/login.png"
          alt="Signup Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Section for Signup */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 space-y-4 mb-10 relative">
        <div className="absolute text-center top-15 z-10">
          <Image src="/images/logo.png" alt="Mahindra Logo" width={150} height={50} />
        </div>

        <h2 className="text-2xl font-semibold mt-10">Create Account</h2>

        <div className="space-y-4 w-full max-w-sm border border-gray-300 pt-10 p-5 rounded">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleInputChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleInputChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600 font-semibold">{success}</p>}
          <button
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={handleRegister}
          >
            Create Account
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to Mahindra's{" "}
          <a href="https://www.mahindra.com/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="https://www.mahindra.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition underline">
            Privacy Policy
          </a>.
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
