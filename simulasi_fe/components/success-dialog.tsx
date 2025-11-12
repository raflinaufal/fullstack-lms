"use client";

import React from "react";

export interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function SuccessDialog({
  isOpen,
  onClose,
  title = "Nilai berhasil dibagikan!",
  message = "Selarang saatnya belajar lebih giat untuk nilai yang lebih baik lagi!",
  buttonText = "OK",
  onButtonClick,
}: SuccessDialogProps) {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* OK Button */}
        <button
          onClick={handleButtonClick}
          className="w-full px-6 py-3 bg-primary-orange text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
