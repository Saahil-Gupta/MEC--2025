// src/components/Card.jsx
import React from "react";

export default function Card({ title, content, onClick, flipped = false }) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-5 transition-all duration-500 transform ${
        onClick ? "cursor-pointer active:scale-95" : ""
      } ${flipped ? "rotate-y-180" : ""}`}
      style={{
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      <div className="flex flex-col justify-center items-center text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
