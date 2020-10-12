import React from "react";

export default function Divider({ text }: { text: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm leading-5">
        <span className="px-2 bg-white text-gray-500">{text}</span>
      </div>
    </div>
  );
}
