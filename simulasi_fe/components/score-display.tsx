export interface ScoreDisplayProps {
  score: number
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-2">Nilai CBT Anda</p>
        <span className="text-4xl font-bold text-orange-500">{score.toFixed(2)}</span>
      </div>
    </div>
  )
}
