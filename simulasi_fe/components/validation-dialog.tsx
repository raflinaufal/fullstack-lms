"use client";

import React from "react";

export interface ValidationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  emptyFields: string[];
}

export function ValidationDialog({
  isOpen,
  onClose,
  emptyFields,
}: ValidationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ada beberapa field yang belum diisi
          </h3>
          <p className="text-sm text-gray-600">
            Silakan lengkapi field berikut:
          </p>
        </div>

        {/* Empty Fields Grid */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {emptyFields.map((field, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg"
            >
              {field}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-primary-orange text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
        >
          Oke, Saya Mengerti
        </button>
      </div>
    </div>
  );
}
