import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white">
      <Image src="/images/logo.png" alt="Logo" width={150} height={50} />

      <div className="space-x-10 text-gray-900 font-bold">
        <a href="#" className="hover:text-red-500">About Us</a>
        <a href="#" className="hover:text-red-500">Careers</a>
        <a href="#" className="hover:text-red-500">Contact Us</a>
      </div>

      <div>
        <a href="#" className="text-red-500 font-semibold hover:underline">Login / Sign Up</a>
      </div>
    </nav>
  );
}
