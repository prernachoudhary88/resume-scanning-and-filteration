import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative w-full h-[85vh] flex flex-wrap sm:flex-nowrap">
            <Image
                src="/images/hero-bg.jpg"
                alt="Hero Background"
                layout="fill"
                objectFit="fill"
            />
            {/* Floating Div 1 */}
            <div className="absolute flex overflow-auto top-10 left-10 md:top-18 md:left-15 bg-red-500 text-white p-4 box-border rounded-lg shadow-lg w-1/3 md:w-[45%]">
                <div className="pr-4"><img src="/icons/infowhite.png" alt="Info" width={40} /></div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">Kickstart Your Career with Mahindra Rise!</h2>
                    <p className="mt-3 text-sm opacity-80">
                        Upload your resume and let our AI optimize it for better visibility. Get noticed for exciting career opportunities at Mahindra.
                    </p>
                    
                        <button className="mt-5 bg-white text-gray-800 font-semibold px-5 py-2 rounded-lg shadow self-start hover:scale-105 transition-transform duration-300">
                        <a href="#">Upload Resume</a> 
                    </button>
                    
                </div>
            </div>

            {/* Floating Div 2 */}
            <div className="absolute overflow-auto top-10 right-10 md:top-18 md:right-15 bg-black/60 text-white p-7 mt-5 box-border rounded-lg shadow-lg w-1/3 max-h-100 md:w-[40%]">
                <h2 className="text-4xl mt-10 mb-10">
                    Join Mahindra Rise: <br /> Where Innovation Meets Talent!
                </h2>
                <p className="mt-2 text-lg mb-10">
                    Students, upload your resume. Hiring team, find the best talent. Powered by AI, built for the future.
                </p>
            </div>

            {/* Floating Div 3 */}
            <div className="absolute flex overflow-auto bottom-10 left-10 md:bottom-18 md:left-15 bg-white text-black p-4 box-border rounded-lg shadow-lg w-1/3 md:w-[45%]">
            
            <div className="pr-4"><img src="/icons/info.png" alt="Info" width={40} /></div>
            <div className="flex flex-col">
                <h2 className="text-lg font-bold">Find the Best Talent for Mahindra!</h2>
                <p className="mt-3 text-sm opacity-50">
                    Access AI-filtered resumes and streamline hiring. Discover top talent that aligns with Mahindra’s vision and growth.
                </p>
                <button className="mt-5 bg-gray-800 text-white px-5 py-2 rounded-lg self-start hover:scale-105 transition-transform duration-300">
                   <a href="#">Browse Resumes</a> 
                </button>
            </div>
            </div>
        </div>
    );
}
