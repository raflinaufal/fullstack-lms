"use client"

export interface QuestionGridProps {
  totalQuestions: number
  currentQuestion: number
  onSelectQuestion: (questionNumber: number) => void
  answeredQuestions: number[]
}

export function QuestionGrid({
  totalQuestions,
  currentQuestion,
  onSelectQuestion,
  answeredQuestions,
}: QuestionGridProps) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1)

  return (
    <div className="grid grid-cols-5 gap-2">
      {questions.map((num) => (
        <button
          key={num}
          onClick={() => onSelectQuestion(num)}
          className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
            currentQuestion === num
              ? "bg-orange-500 text-white"
              : answeredQuestions.includes(num)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  )
}
