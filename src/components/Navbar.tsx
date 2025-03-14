import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white">
      <Link href="/">
      <Image src="/images/logo.png" alt="Logo" width={150} height={50} />      
      </Link>
      

      <div className="space-x-10 text-gray-900 font-bold">
        <Link href="#" className="hover:text-red-500">About Us</Link>
        <Link href="#" className="hover:text-red-500">Careers</Link>
        <Link href="#" className="hover:text-red-500">Contact Us</Link>
      </div>

      <div>
        <Link href="/login" className="text-red-500 font-semibold hover:underline">Login / Sign Up</Link>
      </div>
    </nav>
  );
}
