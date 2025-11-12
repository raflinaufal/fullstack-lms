import Link from "next/link"
import { Button } from "@/components/ui/button"

export interface ResultModalProps {
  score: number
  totalQuestions: number
}

export function ResultModal({ score, totalQuestions }: ResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Ujian Selesai!</h2>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Nilai Anda</p>
          <span className="text-5xl font-bold text-orange-500">{score.toFixed(2)}</span>
          <p className="text-gray-600 mt-2">dari 100</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/result" className="w-full">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Lihat Hasil</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full bg-transparent">
              Kembali ke Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
