"use client";

import React from "react";

export interface SubmitConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unansweredCount?: number;
  totalQuestions?: number;
  unansweredQuestions?: number[];
}

export function SubmitConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  unansweredCount = 0,
  totalQuestions = 0,
  unansweredQuestions = [],
}: SubmitConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Apakah kamu yakin akan mengumpulkan jawaban?
          </h3>

          {unansweredCount > 0 && (
            <p className="text-sm text-gray-600 mb-4">
              Ada beberapa soal belum kamu kerjakan. <br />
              Kerjakan dulu yuk
            </p>
          )}
        </div>

        {/* Question Status Grid - Only show unanswered questions */}
        {unansweredCount > 0 && unansweredQuestions.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mb-6">
            {unansweredQuestions.map((questionNumber) => (
              <div
                key={questionNumber}
                className="w-8 h-8 rounded text-xs font-medium flex items-center justify-center bg-gray-300 text-gray-600"
              >
                {questionNumber}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-primary-orange text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Kumpulkan
          </button>
        </div>
      </div>
    </div>
  );
}
