"use client";

import { ChevronLeft, ChevronDown, Loader2 } from "lucide-react";
import { TestScoreCard } from "@/components/test-score-card";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useGetTestHistoryQuery } from "@/lib/redux/api/resultsApi";

function HistoryPageContent() {
  const router = useRouter();
  const { data: testResults, isLoading, error } = useGetTestHistoryQuery();

  // Format date helper
  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Format: "05 Maret 2025 - 16:00:00"
      return `${day} ${month} ${year} - ${hours}:${minutes}:00`;
    } catch (error) {
      return dateString;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <ChevronLeft className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Failed to Load History
          </h2>
          <p className="mb-6 text-gray-600">
            Unable to load test history. Please try again.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
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
            {testResults.map((result) => {
              return (
                <TestScoreCard
                  key={result.id}
                  title={result.exam_title}
                  score={result.score}
                  description={`${result.subject} - ${result.grade} | Grade: ${result.exam_grade} (${result.status})`}
                  startTime={formatDateTime(result.start_time)}
                  endTime={formatDateTime(result.end_time)}
                />
              );
            })}
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
