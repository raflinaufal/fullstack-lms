"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ExamNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isLastQuestion?: boolean;
}

export function ExamNavigation({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
}: ExamNavigationProps) {
  return (
    <div className="flex items-center justify-between w-full gap-3 pb-6 mt-8">
      {/* Tombol Sebelumnya */}
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 1}
        className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-full transition-transform duration-150 w-full sm:w-auto 
          ${
            currentQuestion === 1
              ? "bg-gray-400 disabled:cursor-not-allowed"
              : "bg-orange-500 hover:scale-105"
          }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Sebelumnya
      </button>

      {/* Tombol Selanjutnya / Kumpulkan */}
      <button
        onClick={isLastQuestion ? onSubmit : onNext}
        className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white rounded-full transition-transform duration-150 w-full sm:w-auto 
          ${
            isLastQuestion
              ? "bg-green-600 hover:scale-105"
              : "bg-orange-500 hover:scale-105"
          }`}
      >
        {isLastQuestion ? "Kumpulkan" : "Selanjutnya"}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
