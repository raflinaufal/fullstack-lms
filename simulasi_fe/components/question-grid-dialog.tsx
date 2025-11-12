"use client";

import { X } from "lucide-react";

export interface QuestionGridDialogProps {
  totalQuestions: number;
  currentQuestion: number;
  onSelectQuestion: (questionNumber: number) => void;
  answeredQuestions: number[];
  onClose: () => void;
  isOpen?: boolean;
}

export function QuestionGridDialog({
  totalQuestions,
  currentQuestion,
  onSelectQuestion,
  answeredQuestions,
  onClose,
  isOpen = true,
}: QuestionGridDialogProps) {
  if (!isOpen) return null;

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-sm p-6 bg-white shadow-xl rounded-xl animate-in fade-in-0 zoom-in-95">
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
          aria-label="Tutup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Judul */}
        <h2 className="mb-6 text-lg font-semibold text-center text-gray-900">
          Daftar Soal
        </h2>

        {/* Grid Nomor Soal */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {questions.map((num) => (
            <button
              key={num}
              onClick={() => onSelectQuestion(num)}
              className={`w-12 h-12 rounded-lg font-semibold text-sm transition-colors ${
                currentQuestion === num
                  ? "bg-primary-orange text-white ring-2 ring-orange-300"
                  : answeredQuestions.includes(num)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Keterangan Warna */}
        <div className="flex justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>Belum dikerjakan</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-primary-orange"></div>
            <span>Sedang dikerjakan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
