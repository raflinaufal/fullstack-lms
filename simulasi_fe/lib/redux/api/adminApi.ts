import { baseApi } from "./baseApi";

// Types
export interface Class {
  id: number;
  title: string;
  subtitle?: string;
  subject?: string;
  grade?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: number;
  class_id: number;
  title?: string;
  subtitle?: string;
  subject?: string;
  grade?: string;
  total_questions?: number;
  duration?: number;
  passing_score?: number;
  time_limit?: string;
  created_at: string;
  updated_at: string;
  class?: Class;
}

export interface QuestionOption {
  id?: number;
  question_id?: number;
  option_label: string;
  option_text: string;
}

export interface Question {
  id: number;
  exam_id: number;
  question_text: string;
  stimulus_text?: string;
  stimulus_image?: string;
  question_after_image?: string;
  correct_answer: string;
  explanation?: string;
  created_at: string;
  updated_at: string;
  options: QuestionOption[];
  exam?: Exam;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateClassRequest {
  title: string;
  subtitle?: string;
  subject?: string;
  grade?: string;
  description?: string;
}

export interface CreateExamRequest {
  class_id: number;
  title?: string;
  subtitle?: string;
  subject?: string;
  grade?: string;
  total_questions?: number;
  duration?: number;
  passing_score?: number;
  time_limit?: string;
}

export interface CreateQuestionRequest {
  exam_id: number;
  question_text: string;
  stimulus_text?: string;
  stimulus_image?: string;
  question_after_image?: string;
  correct_answer: string;
  explanation?: string;
  options: QuestionOption[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  password?: string;
  is_admin?: boolean;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Classes
    getClasses: builder.query<{ data: Class[] }, void>({
      query: () => "/classes",
    }),
    createClass: builder.mutation<
      { message: string; data: Class },
      CreateClassRequest
    >({
      query: (body) => ({
        url: "/admin/classes",
        method: "POST",
        body,
      }),
    }),
    updateClass: builder.mutation<
      { message: string; data: Class },
      { id: number; data: CreateClassRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/classes/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/classes/${id}`,
        method: "DELETE",
      }),
    }),

    // Exams
    getExams: builder.query<{ data: Exam[] }, void>({
      query: () => "/exams",
    }),
    createExam: builder.mutation<
      { message: string; data: Exam },
      CreateExamRequest
    >({
      query: (body) => ({
        url: "/admin/exams",
        method: "POST",
        body,
      }),
    }),
    updateExam: builder.mutation<
      { message: string; data: Exam },
      { id: number; data: CreateExamRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/exams/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteExam: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/exams/${id}`,
        method: "DELETE",
      }),
    }),

    // Questions
    getQuestions: builder.query<{ data: Question[] }, { exam_id?: number }>({
      query: (params) => ({
        url: "/admin/questions",
        params,
      }),
    }),
    createQuestion: builder.mutation<
      { message: string; data: Question },
      FormData
    >({
      query: (body) => ({
        url: "/admin/questions",
        method: "POST",
        body,
      }),
    }),
    updateQuestion: builder.mutation<
      { message: string; data: Question },
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/questions/${id}`,
        method: "POST", // Use POST for multipart form data with _method=PUT
        body: data,
      }),
    }),
    deleteQuestion: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/questions/${id}`,
        method: "DELETE",
      }),
    }),

    // Users
    getUsers: builder.query<{ data: User[] }, void>({
      query: () => "/admin/users",
    }),
    createUser: builder.mutation<
      { message: string; data: User },
      CreateUserRequest
    >({
      query: (body) => ({
        url: "/admin/users",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<
      { message: string; data: User },
      { id: number; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useGetExamsQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
