import { baseApi } from "./baseApi";

export interface Class {
  id: number;
  title: string;
  subtitle: string;
  subject: string;
  grade: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: number;
  class_id: number;
  title: string;
  description: string | null;
  total_questions: number;
  duration: number;
  passing_score: number;
  created_at: string;
  updated_at: string;
  class?: Class;
}

export interface ExamInstruction {
  id: number;
  exam_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionOption {
  id: number;
  question_id: number;
  option_label: string;
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  exam_id: number;
  question_text: string;
  stimulus_text: string | null;
  stimulus_image: string | null;
  correct_answer: string;
  explanation: string | null;
  created_at: string;
  updated_at: string;
  options?: QuestionOption[];
}

export interface ExamQuestionsResponse {
  exam: Exam;
  questions: Question[];
}

export const examsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all classes
    getClasses: builder.query<Class[], void>({
      query: () => "/classes",
      providesTags: ["Classes"],
    }),

    // Get class by ID
    getClassById: builder.query<Class, number>({
      query: (id) => `/classes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Classes", id }],
    }),

    // Get all exams
    getExams: builder.query<Exam[], void>({
      query: () => "/exams",
      providesTags: ["Exams"],
    }),

    // Get exam by ID
    getExamById: builder.query<Exam, number>({
      query: (id) => `/exams/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Exams", id }],
    }),

    // Get exam instructions
    getExamInstructions: builder.query<ExamInstruction, number>({
      query: (examId) => `/exams/${examId}/instructions`,
      providesTags: (_result, _error, examId) => [
        { type: "Exams", id: examId },
      ],
    }),

    // Get exam questions
    getExamQuestions: builder.query<ExamQuestionsResponse, number>({
      query: (examId) => `/exams/${examId}/questions`,
      providesTags: (_result, _error, examId) => [
        { type: "Questions", id: examId },
      ],
    }),

    // Get question by ID
    getQuestionById: builder.query<Question, number>({
      query: (id) => `/questions/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Questions", id }],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useGetExamsQuery,
  useGetExamByIdQuery,
  useGetExamInstructionsQuery,
  useGetExamQuestionsQuery,
  useGetQuestionByIdQuery,
} = examsApi;
