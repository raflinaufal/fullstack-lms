import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Import RootState type from store
type RootState = {
  auth: {
    token: string | null;
    user: any;
    isAuthenticated: boolean;
  };
  api: any;
};

// Base API configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;

      // If we have a token, include it in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
    credentials: "include", // Include cookies for CORS
  }),
  tagTypes: ["Auth", "Exams", "Questions", "Results", "History", "Classes"],
  endpoints: () => ({}),
});
