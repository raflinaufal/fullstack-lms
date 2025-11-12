"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useGetExamReviewQuery,
  useShareExamResultMutation,
} from "@/lib/redux/api/resultsApi";
import { useGetClassesQuery } from "@/lib/redux/api/examsApi";
import { SuccessDialog } from "@/components/popups";
import { FileText, Loader2 } from "lucide-react";

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultIdParam = searchParams.get("id");

  // Get result ID from URL or sessionStorage
  const [resultId, setResultId] = useState<number | null>(null);

  useEffect(() => {
    if (resultIdParam) {
      setResultId(Number(resultIdParam));
    } else {
      const storedId = sessionStorage.getItem("lastExamResultId");
      if (storedId) {
        setResultId(Number(storedId));
      }
    }
  }, [resultIdParam]);

  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetExamReviewQuery(resultId!, { skip: !resultId });

  const { data: classesData } = useGetClassesQuery();
  const [shareExamResult] = useShareExamResultMutation();
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);

  // Get first class for title and subtitle
  const classes = Array.isArray(classesData) ? classesData : [];
  const firstClass = classes[0];

  // State for share form
  const [shareForm, setShareForm] = useState({
    schoolName: "",
    grade: "",
    email: "",
  });
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleShareFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShareForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!shareForm.schoolName.trim()) {
      newErrors.schoolName = "Nama sekolah harus diisi";
    }

    if (!shareForm.grade.trim()) {
      newErrors.grade = "Kelas harus diisi";
    }

    if (!shareForm.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(shareForm.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!resultId) {
      setErrors({ email: "Result ID tidak ditemukan" });
      return;
    }

    setIsSharing(true);
    setErrors({}); // Clear all errors

    try {
      await shareExamResult({
        result_id: resultId,
        school_name: shareForm.schoolName,
        grade: shareForm.grade,
        email: shareForm.email,
      }).unwrap();

      // Show success dialog
      setShowSuccessDialog(true);

      // Reset form
      setShareForm({ schoolName: "", grade: "", email: "" });
    } catch (error: any) {
      console.error("Share result error:", error);

      // Show error message below email field
      setErrors({
        email:
          error?.data?.message || "Gagal membagikan nilai. Silakan coba lagi.",
      });
    } finally {
      setIsSharing(false);
    }
  };

  // Loading state
  if (isLoading || !resultId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <Loader2 className="w-full h-full text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Loading exam results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !reviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Failed to Load Results
          </h2>
          <p className="mb-6 text-gray-600">
            Unable to load exam results. Please try again.
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

  const { result, reviews } = reviewData;
  const totalQuestions = reviews.length;
  const answeredCorrect = reviews.filter((r) => r.is_correct).length;

  // Default passing score is 70
  const passingScore = 70;
  const isPassed = result.score >= passingScore;

  return (
    <main className="flex flex-col items-center min-h-screen px-3 py-6 bg-gray-100 sm:px-4 sm:py-10">
      {/* Header */}
      <section className="container w-full p-6 mb-6 bg-background-light sm:p-8 sm:mb-8 rounded-2xl">
        {/* Inner highlight card */}
        <div className="flex flex-col items-center gap-4 p-4 transition-all border border-blue-300 md:flex-row md:items-center md:justify-center md:p-5 bg-blue-50 rounded-2xl">
          {/* Left: Icon + text */}
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:justify-center">
            <div className="flex items-center justify-center p-3 text-white bg-[#FFEADE] rounded-full">
              <FileText className="w-6 h-6 text-primary-orange" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                {firstClass?.title || "Hasil Ujian"}
              </h1>
              <p className="text-xs text-gray-600 sm:text-sm">
                {firstClass?.subtitle || "Computer Based Test"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai + Bagikan Nilai (Improved UI) */}
      <section className="container relative w-full p-6 mb-8 bg-white border border-blue-200 shadow-md sm:p-8 sm:mb-10 rounded-2xl">
        {/* Vertical divider for large screens */}
        <div
          className="absolute inset-y-0 hidden w-px bg-gray-200 lg:block left-1/2"
          aria-hidden
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Nilai CBT */}
          <div className="flex flex-col items-center justify-center p-4 text-center sm:p-6">
            <span className="px-4 py-1 mb-2 text-[10px] sm:text-xs font-semibold tracking-wide text-gray-700 bg-blue-100 rounded-md">
              Nilai CBT
            </span>
            <span className="text-xs text-gray-600 sm:text-sm">
              Total nilai kamu adalah
            </span>
            <span className="mt-1 text-4xl font-bold text-orange-500 sm:text-5xl md:text-6xl">
              {result.score.toFixed(2)}
            </span>
            <p className="max-w-sm mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {isPassed
                ? "Selamat kamu mendapatkan nilai yang bagus! Tingkatkan terus belajar kamu agar mendapatkan hasil yang maksimal"
                : "Jangan menyerah! Terus belajar dan kerjakan latihan lebih banyak agar nilaimu meningkat. Kamu pasti bisa!"}
            </p>

            <div className="flex flex-col w-full gap-2 mt-6 sm:gap-3 sm:flex-row">
              <Link href="/exam" className="flex-1">
                <Button className="py-2 text-sm font-medium text-orange-600 border border-orange-200 rounded-full w-fit bg-orange-50 sm:text-base hover:bg-orange-100">
                  Kerjakan Ulang
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="py-2 text-sm text-white bg-orange-500 rounded-full w-fit sm:text-base hover:bg-orange-600">
                  Kembali ke Kelas
                </Button>
              </Link>
            </div>
          </div>

          {/* Bagikan Nilai */}
          <div className="flex flex-col p-4 sm:p-6">
            <div className="flex flex-col w-full mb-4">
              <div className="px-5 py-2 text-center bg-blue-100 rounded-lg sm:py-2.5 md:text-left">
                <h2 className="text-sm font-semibold text-center text-gray-800 sm:text-base">
                  Bagikan Nilai
                </h2>
              </div>
            </div>
            <form
              className="flex flex-col flex-1 gap-3"
              onSubmit={handleShareSubmit}
            >
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-600 sm:text-xs">
                  Nama sekolah
                </label>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="Masukkan nama sekolah"
                  value={shareForm.schoolName}
                  onChange={handleShareFormChange}
                  disabled={isSharing}
                  className={`px-3 py-2 text-xs transition bg-gray-100 border rounded-lg sm:text-sm focus:outline-none focus:bg-white disabled:opacity-50 ${
                    errors.schoolName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-400"
                  }`}
                />
                {errors.schoolName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.schoolName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-600 sm:text-xs">
                  Kelas
                </label>
                <input
                  type="text"
                  name="grade"
                  placeholder="Masukkan kelas"
                  value={shareForm.grade}
                  onChange={handleShareFormChange}
                  disabled={isSharing}
                  className={`px-3 py-2 text-xs transition bg-gray-100 border rounded-lg sm:text-sm focus:outline-none focus:bg-white disabled:opacity-50 ${
                    errors.grade
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-400"
                  }`}
                />
                {errors.grade && (
                  <p className="mt-1 text-xs text-red-500">{errors.grade}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-600 sm:text-xs">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan alamat email"
                  value={shareForm.email}
                  onChange={handleShareFormChange}
                  disabled={isSharing}
                  className={`px-3 py-2 text-xs transition bg-gray-100 border rounded-lg sm:text-sm focus:outline-none focus:bg-white disabled:opacity-50 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isSharing}
                  className="px-6 py-2 text-xs text-white bg-orange-500 rounded-full shadow-sm sm:text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  {isSharing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Bagikan"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Pembahasan Soal - Section Header */}
      <section className="container w-full p-6 mb-6 bg-background-light sm:p-8 sm:mb-8 rounded-2xl">
        <div className="flex items-center justify-center p-4 transition-all border border-blue-300 md:p-5 bg-blue-50 rounded-2xl">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
            Pembahasan Soal
          </h2>
        </div>
      </section>
      {/*Daftar soal */}
      <section className="container w-full p-6 mx-auto bg-white border border-blue-200 shadow-md sm:p-8 rounded-2xl">
        <div className="flex flex-col gap-6 lg:gap-8 lg:flex-row">
          {/* Daftar Soal */}
          <div className="p-3 border-r rounded-lg sm:p-4 bg-gray-50 lg:w-1/4 lg:sticky lg:top-6 lg:h-fit">
            <h3 className="mb-2 text-xs font-semibold text-gray-900 sm:mb-3 sm:text-sm">
              Daftar Soal
            </h3>
            <div className="grid grid-cols-5 gap-1 sm:gap-2 lg:grid-cols-4 xl:grid-cols-5">
              {reviews.map((review, i) => {
                const questionNumber = i + 1;

                // Tentukan warna berdasarkan status jawaban
                let bgColor = "bg-gray-300"; // Default: Tidak dijawab (abu-abu)

                // Cek apakah user menjawab
                if (review.user_answer && review.user_answer.trim() !== "") {
                  // Jika dijawab, cek benar atau salah
                  if (review.is_correct) {
                    bgColor = "bg-green-500"; // Benar (hijau)
                  } else {
                    bgColor = "bg-red-500"; // Salah (merah)
                  }
                }
                // Jika tidak dijawab, tetap abu-abu

                const isSelected = selectedQuestion === questionNumber;
                const borderClass = isSelected
                  ? "ring-2 ring-blue-400 ring-opacity-60 shadow-sm"
                  : "";

                return (
                  <button
                    key={review.id}
                    onClick={() => setSelectedQuestion(questionNumber)}
                    className={`${bgColor} ${borderClass} text-white font-semibold rounded-md text-xs sm:text-sm hover:opacity-90 transition-all duration-150 min-h-[34px] sm:min-h-[38px] aspect-square flex items-center justify-center`}
                    aria-selected={isSelected}
                  >
                    {questionNumber}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-1 mt-3 text-xs text-gray-600 sm:flex-row sm:gap-3 sm:mt-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full sm:w-3 sm:h-3"></span>{" "}
                Benar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full sm:w-3 sm:h-3"></span>{" "}
                Salah
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full sm:w-3 sm:h-3"></span>{" "}
                Tidak Menjawab
              </span>
            </div>
          </div>

          {/* Pembahasan Detail */}
          <div className="flex-1">
            {(() => {
              const selectedReview = reviews.find(
                (review, i) => i + 1 === selectedQuestion
              );

              if (!selectedReview) {
                return (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <p className="text-sm">
                      Pilih nomor soal untuk melihat pembahasan
                    </p>
                  </div>
                );
              }

              const question = selectedReview.question;
              if (!question) {
                return (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <p className="text-sm">Data soal tidak tersedia</p>
                  </div>
                );
              }

              const options = question.options || [];

              return (
                <div className="space-y-4">
                  <div className="p-4 border shadow-sm rounded-xl bg-gray-50">
                    <h3 className="mb-3 text-base font-semibold text-gray-900 sm:text-lg">
                      Soal No. {selectedQuestion}
                    </h3>
                    {/* Teks stimulus (opsional, untuk soal dengan bacaan) */}
                    {question.stimulus_text && (
                      <div className="p-3 mb-4 bg-white border sm:p-4 rounded-xl">
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line sm:text-base">
                          {question.stimulus_text}
                        </p>
                      </div>
                    )}

                    <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                      {question.question_text}
                    </p>

                    {/* Gambar Soal (opsional) */}
                    {question.stimulus_image && (
                      <div className="flex justify-start mb-6">
                        <div className="w-full max-w-md p-2 overflow-hidden border-2 border-blue-200 bg-blue-50 rounded-xl">
                          <img
                            src={question.stimulus_image}
                            alt={`Soal ${selectedQuestion}`}
                            className="object-contain w-full h-auto rounded-lg max-h-64 sm:max-h-72"
                            onError={(e) => {
                              console.error(
                                "Image failed to load:",
                                question.stimulus_image
                              );
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Pilihan Jawaban */}
                    {options.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-gray-600 sm:text-sm">
                          Pilihan Jawaban:
                        </p>
                        <div className="space-y-2">
                          {options.map((option: any, index: number) => {
                            const optionLabel = `${option.option_label}. ${option.option_text}`;
                            const isCorrect =
                              option.option_label === question.correct_answer;
                            const isUserAnswer =
                              option.option_label ===
                              selectedReview.user_answer;

                            return (
                              <div
                                key={index}
                                className={`p-2 rounded-lg border text-xs sm:text-sm ${
                                  isCorrect
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : isUserAnswer && !selectedReview.is_correct
                                    ? "bg-red-100 border-red-300 text-red-800"
                                    : "bg-white border-gray-200 text-gray-700"
                                }`}
                              >
                                {optionLabel}
                                {isCorrect && (
                                  <span className="ml-2 text-xs font-semibold text-green-600">
                                    ✓ Jawaban Benar
                                  </span>
                                )}
                                {isUserAnswer && !selectedReview.is_correct && (
                                  <span className="ml-2 text-xs font-semibold text-red-600">
                                    ✗ Pilihan Anda
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Jawaban User */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs text-gray-600 sm:text-sm">
                        Jawaban kamu:
                      </p>
                      <div
                        className={`flex items-center justify-between rounded-lg border p-2 sm:p-3 ${
                          selectedReview.is_correct
                            ? "bg-green-50 border-green-300"
                            : "bg-red-50 border-red-300"
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            selectedReview.is_correct
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {selectedReview.user_answer || "Tidak Dijawab"}
                        </span>
                        <span
                          className={`text-[11px] sm:text-xs font-semibold ${
                            selectedReview.is_correct
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {selectedReview.is_correct
                            ? "✓ Jawaban kamu benar"
                            : "✗ Jawaban kamu salah"}
                        </span>
                      </div>
                    </div>

                    {/* Kunci Jawaban */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 sm:text-sm">
                        Kunci Jawaban:{" "}
                        <span className="font-semibold text-orange-500">
                          {question.correct_answer}
                        </span>
                      </p>
                    </div>

                    {/* Pembahasan */}
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="mb-1 text-xs font-medium text-blue-800 sm:text-sm">
                        Pembahasan:
                      </p>
                      <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                        {question.explanation || "Pembahasan tidak tersedia"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Nilai berhasil dibagikan!"
        message="Sekarang saatnya belajar lebih giat untuk nilai yang lebih tinggi!"
      />
    </main>
  );
}

export default ResultPageContent;
