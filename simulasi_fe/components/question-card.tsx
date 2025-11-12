"use client";

export interface QuestionCardProps {
  questionNumber: number;
  title: string;
  options: string[];
  stimulusTitle?: string | null;
  stimulusImage?: string | null;
  stimulusText?: string | null;
  questionAfterImage?: string;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
}

export function QuestionCard({
  questionNumber,
  title,
  options,
  stimulusTitle,
  stimulusImage,
  stimulusText,
  questionAfterImage,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="mb-8">
      {/* Nomor Soal */}
      <div className="inline-block px-3 py-2 mb-4 text-sm font-semibold text-gray-900 bg-blue-100 rounded-lg">
        Soal No. {questionNumber}
      </div>

      {/* Pertanyaan sebelum gambar */}
      <p className="mb-4 text-gray-800">{title}</p>

      {/* Teks stimulus (untuk soal cerita) */}
      {stimulusText && (
        <div className="p-4 mb-6 border-2 border-blue-200 rounded-2xl bg-blue-50/30">
          {stimulusTitle && (
            <h4 className="mb-2 text-base font-semibold text-center text-gray-900">
              {stimulusTitle}
            </h4>
          )}
          <p className="leading-relaxed text-gray-800 whitespace-pre-line">
            {stimulusText}
          </p>
        </div>
      )}

      {/* Gambar */}
      {stimulusImage && (
        <div className="flex mb-6 md:justify-start">
          <div className="w-full overflow-hidden border-2 border-blue-200 sm:w-3/4 lg:w-2/3 xl:w-1/2 rounded-2xl">
            <img
              src={stimulusImage || "/placeholder.svg"}
              alt="Stimulus gambar"
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Pertanyaan setelah gambar */}
      {questionAfterImage && (
        <p className="mb-6 text-gray-800">{questionAfterImage}</p>
      )}

      {/* Pilihan Jawaban */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(option)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              selectedAnswer === option
                ? "border-primary-orange bg-btn-light hover:border-btn-light-hover"
                : "border-blue-200 bg-white hover:border-gray-300"
            }`}
          >
            <span className="font-medium text-gray-800">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
