"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { QuestionGridDialog } from "@/components/question-grid-dialog";
import { SubmitConfirmationDialog } from "@/components/submit-confirmation-dialog";
import { SuccessDialog } from "@/components/success-dialog";
import { ExamNavigation } from "@/components/exam-navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useGetExamQuestionsQuery } from "@/lib/redux/api/examsApi";
import { useSubmitExamResultMutation } from "@/lib/redux/api/resultsApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { FileText, Grid, Loader2 } from "lucide-react";
import { toast } from "sonner";

function ExamPageContent() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  // Fetch exam questions (exam ID 1)
  const { data: examData, isLoading, error } = useGetExamQuestionsQuery(1);
  const [submitExam, { isLoading: isSubmitting }] =
    useSubmitExamResultMutation();

  // Get current question by index (currentQuestion is 1-based, array is 0-based)
  const currentQuestionData = examData?.questions[currentQuestion - 1];

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestionData) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionData.id]: answer,
    });
  };

  const handleNext = () => {
    if (examData && currentQuestion < examData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    if (!examData || !user) return;

    setShowSubmitConfirm(false);

    try {
      // Build answers array in order
      const answers = examData.questions.map(
        (q) => selectedAnswers[q.id] || ""
      );

      const payload = {
        exam_id: examData.exam.id,
        user_id: user.id,
        answers,
        start_time: startTime,
        end_time: new Date().toISOString(),
      };

      console.log("=== SUBMIT EXAM DEBUG ===");
      console.log("Payload being sent to API:", payload);
      console.log("Total questions:", examData.questions.length);
      console.log("Answers count:", answers.length);
      console.log("Selected answers:", selectedAnswers);
      console.log("Answers array:", answers);
      console.log("========================");

      const result = await submitExam(payload).unwrap();

      console.log("=== SUBMIT SUCCESS ===");
      console.log("API Response:", result);
      console.log("Result ID:", result.result.id);
      console.log("=====================");

      // Store result ID for review page
      sessionStorage.setItem("lastExamResultId", result.result.id.toString());

      setShowSuccess(true);
    } catch (error: any) {
      console.error("=== SUBMIT ERROR ===");
      console.error("Full error object:", error);
      console.error("Error status:", error.status);
      console.error("Error data:", error.data);
      console.error("Error message:", error.data?.message);
      console.error("===================");

      toast.error("Failed to submit exam", {
        description: error.data?.message || "Please try again",
      });
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    const resultId = sessionStorage.getItem("lastExamResultId");
    if (resultId) {
      router.push(`/result?id=${resultId}`);
    } else {
      router.push("/result");
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
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !examData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Failed to Load Exam
          </h2>
          <p className="mb-6 text-gray-600">
            Unable to load exam questions. Please try again.
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

  // Calculate answered questions and unanswered count
  const answeredQuestions = Object.keys(selectedAnswers).map(Number);
  const unansweredCount = examData.questions.length - answeredQuestions.length;

  // Additional safety check - should not reach here if examData is null
  if (!examData?.exam || !examData?.questions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Invalid Exam Data
          </h2>
          <p className="mb-6 text-gray-600">
            The exam data is incomplete. Please try again.
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
      <div className="container p-4 mx-auto ">
        <div className="p-3 mb-4 bg-background-light md:p-4 rounded-2xl">
          {/* Card dalam */}
          <div className="flex flex-col gap-4 p-4 transition-all border border-blue-400 md:flex-row md:items-center md:justify-between md:p-5 bg-background-light rounded-2xl hover:shadow-md">
            {/* Kiri: Icon + teks */}
            <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:text-left">
              <div className="flex items-center justify-center p-3 text-white bg-[#FFEADE] rounded-full">
                <FileText className="w-6 h-6 text-primary-orange " />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
                  {examData.exam.title}
                </h1>
                <p className="text-sm text-gray-700">
                  {examData.exam.class?.subject} - {examData.exam.class?.grade}
                </p>
              </div>
            </div>

            {/* Kanan: Tombol */}
            <button
              onClick={() => setShowQuestionGrid(true)}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-orange-600 transition-colors bg-orange-100 rounded-full hover:bg-orange-200 md:w-auto"
            >
              Daftar Soal <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Grid Dialog */}
        <QuestionGridDialog
          isOpen={showQuestionGrid}
          totalQuestions={examData.questions.length}
          currentQuestion={currentQuestion}
          onSelectQuestion={(q) => {
            setCurrentQuestion(q);
            setShowQuestionGrid(false);
          }}
          answeredQuestions={answeredQuestions}
          onClose={() => setShowQuestionGrid(false)}
        />

        {/* Submit Confirmation Dialog */}
        <SubmitConfirmationDialog
          isOpen={showSubmitConfirm}
          unansweredCount={unansweredCount}
          totalQuestions={examData.questions.length}
          onConfirm={handleConfirmSubmit}
          onClose={() => setShowSubmitConfirm(false)}
        />

        {/* Success Dialog */}
        <SuccessDialog
          isOpen={showSuccess}
          title="Jawaban berhasil dikumpulkan!"
          message="Selamat! Jawaban kamu sudah berhasil dikumpulkan. Silakan lihat hasil ujianmu."
          buttonText="Lihat Hasil"
          onButtonClick={handleSuccessClose}
          onClose={handleSuccessClose}
        />

        {/* Current Question */}
        {currentQuestionData && (
          <QuestionCard
            questionNumber={currentQuestion}
            title={currentQuestionData.question_text}
            stimulusTitle={null}
            stimulusText={currentQuestionData.stimulus_text || null}
            questionAfterImage={undefined}
            options={
              currentQuestionData.options?.map(
                (opt) => `${opt.option_label}. ${opt.option_text}`
              ) || []
            }
            stimulusImage={currentQuestionData.stimulus_image || undefined}
            selectedAnswer={selectedAnswers[currentQuestionData.id]}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {/* Navigation */}
        <ExamNavigation
          currentQuestion={currentQuestion}
          totalQuestions={examData.questions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isLastQuestion={currentQuestion === examData.questions.length}
        />
      </div>
    </main>
  );
}

export default function ExamPage() {
  return (
    <ProtectedRoute>
      <ExamPageContent />
    </ProtectedRoute>
  );
}
