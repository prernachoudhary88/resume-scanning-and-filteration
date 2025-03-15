"use client";
import Image from "next/image";

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 w-[500px] h-[400px] shadow-xl relative z-10 border-1 border-gray-400">
        <div className="text-green-500 text-4xl"><Image src="/icons/check.png" alt="Success" width={50} height={50} /></div>
        <p className="text-gray-700 font-semibold mt-4">
          You have successfully applied for this position.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>
      </div>
    </div>
  );
}