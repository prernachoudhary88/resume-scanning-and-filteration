import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image - full height */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Floating Div 1 */}
      <div className="absolute flex top-[17%] left-[5%] bg-red-500 text-white p-4 rounded-lg shadow-lg w-[90%] sm:w-[40%] md:w-[35%] lg:w-[80%] max-w-[600px]">
        <div className="pr-4"><img src="/icons/infowhite.png" alt="Info" width={40} /></div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Kickstart Your Career with Mahindra Rise!</h2>
          <p className="mt-3 text-sm opacity-80">
            Upload your resume and let our AI optimize it for better visibility. Get noticed for exciting career opportunities at Mahindra.
          </p>
          <button className="mt-5 bg-white text-gray-800 font-semibold px-5 py-2 rounded-lg shadow self-start hover:scale-105 transition-transform duration-300">
            <a href="/upload-resume">Upload Resume</a>
          </button>
        </div>
      </div>

      {/* Floating Div 2 */}
      <div className="absolute top-[18%] right-[5%] bg-black/60 text-white p-15 rounded-lg shadow-lg w-[90%] sm:w-[40%] md:w-[35%] lg:w-[50%] max-w-[500px]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2 mb-8">
          Join Mahindra Rise: <br /> Where Innovation Meets Talent!
        </h2>
        <p className="text-base sm:text-lg mb-5">
          Students, upload your resume. Hiring team, find the best talent. Powered by AI, built for the future.
        </p>
      </div>
    </div>
  );
}
