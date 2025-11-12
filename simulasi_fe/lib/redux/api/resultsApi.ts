import { baseApi } from "./baseApi";
import type { Question } from "./examsApi";

export interface SubmitExamRequest {
  exam_id: number;
  user_id: number;
  answers: string[];
  start_time: string;
  end_time: string;
}

export interface ExamResult {
  id: number;
  exam_id: number;
  user_id: number;
  score: number;
  percentage: number;
  status: "good" | "average" | "poor";
  grade: string;
  feedback: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export interface SubmitExamResponse {
  message: string;
  result: ExamResult;
}

export interface QuestionReview {
  id: number;
  exam_result_id: number;
  question_id: number;
  user_answer: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
  question?: Question;
}

export interface ExamReviewResponse {
  result: ExamResult;
  reviews: QuestionReview[];
}

export interface TestHistory {
  id: number;
  exam_id: number;
  user_id: number;
  exam_result_id: number;
  exam_title: string;
  subject: string;
  grade: string;
  score: number;
  percentage: number;
  status: "good" | "average" | "poor";
  exam_grade: string;
  completed_at: string;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface TestHistoryResponse {
  historyInfo: {
    title: string;
    subtitle: string;
    subject: string;
    grade: string;
  };
  testResults: TestHistory[];
}

export const resultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit exam result
    submitExamResult: builder.mutation<SubmitExamResponse, SubmitExamRequest>({
      query: (data) => {
        console.log("[RTK Query] Submitting exam result:", data);
        return {
          url: "/exam-results",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: SubmitExamResponse) => {
        console.log("[RTK Query] Submit exam response:", response);
        return response;
      },
      transformErrorResponse: (error: any) => {
        console.error("[RTK Query] Submit exam error:", error);
        return error;
      },
      invalidatesTags: ["Results", "History"],
    }),

    // Get exam result by ID
    getExamResultById: builder.query<ExamResult, number>({
      query: (id) => `/exam-results/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Results", id }],
    }),

    // Get exam review (result with questions)
    getExamReview: builder.query<ExamReviewResponse, number>({
      query: (resultId) => `/exam-results/${resultId}/review`,
      providesTags: (_result, _error, resultId) => [
        { type: "Results", id: resultId },
      ],
    }),

    // Get test history
    getTestHistory: builder.query<TestHistory[], void>({
      query: () => "/test-history",
      transformResponse: (response: TestHistoryResponse) =>
        response.testResults,
      providesTags: ["History"],
    }),

    // Get test history by ID
    getTestHistoryById: builder.query<TestHistory, number>({
      query: (id) => `/test-history/${id}`,
      providesTags: (_result, _error, id) => [{ type: "History", id }],
    }),
  }),
});

export const {
  useSubmitExamResultMutation,
  useGetExamResultByIdQuery,
  useGetExamReviewQuery,
  useGetTestHistoryQuery,
  useGetTestHistoryByIdQuery,
} = resultsApi;
