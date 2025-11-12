"use client";

import { ChevronLeft, ChevronDown, Loader2 } from "lucide-react";
import { TestScoreCard } from "@/components/test-score-card";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useGetTestHistoryQuery } from "@/lib/redux/api/resultsApi";

function HistoryPageContent() {
  const router = useRouter();
  const { data: testResults, isLoading, error } = useGetTestHistoryQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <Loader2 className="w-full h-full text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Loading test history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChevronLeft className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load History
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load test history. Please try again.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-screen-xl px-4 pt-8 pb-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative p-5 sm:p-8 rounded-3xl bg-blue-50">
          <div className="p-6 bg-blue-100 border-2 border-blue-300 rounded-2xl sm:p-8">
            <h1 className="text-base font-bold leading-snug text-center text-gray-900 sm:text-2xl lg:text-xl">
              Riwayat Nilai Tes
            </h1>
          </div>
        </div>
      </header>

      {/* Navigation & Filter */}
      <nav className="flex flex-col max-w-screen-xl gap-3 px-4 mx-auto mb-6 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-gray-900 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 w-fit"
          aria-haspopup="listbox"
          aria-label="Pilih bab"
        >
          <span>Pilihan bab</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </nav>

      {/* Test Results */}
      <section className="max-w-screen-xl px-4 pb-12 mx-auto sm:px-6 lg:px-8">
        {!testResults || testResults.length === 0 ? (
          <div className="p-6 text-center border rounded-xl bg-gray-50">
            <p className="text-sm text-gray-600">Belum ada histori nilai.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {testResults.map((result) => (
              <TestScoreCard
                key={result.id}
                title={result.exam_title}
                score={result.score}
                description={`${result.subject} - ${result.grade} | Grade: ${result.exam_grade} (${result.status})`}
                startTime={result.completed_at}
                endTime={result.completed_at}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryPageContent />
    </ProtectedRoute>
  );
}
