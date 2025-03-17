// app/page.js
import Filters from "./components/Filters";
import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Filters Section (Left Sidebar) */}
      <div className="fixed top-0 left-0 h-screen w-1/4 bg-gray-100 overflow-y-auto">
        <Filters />
      </div>

      {/* Chatbot Section (Right Side) */}
      <div className="flex-1 ml-[25%]">
        <Chatbot />
      </div>
    </div>
  );
}