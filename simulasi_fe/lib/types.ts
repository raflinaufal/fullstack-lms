// Type definitions untuk aplikasi CBT

export interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
  stimulusText: string | null;
  stimulusImage: string | null;
  questionAfterImage?: string | null;
  explanation: string;
}

export interface ExamInfo {
  title: string;
  subtitle: string;
  totalQuestions: number;
  duration: number;
  subject: string;
  grade: string;
}

export interface ExamData {
  examInfo: ExamInfo;
  questions: Question[];
}

export interface TestResult {
  id: number;
  title: string;
  score: number;
  description: string;
  startTime: string;
  endTime: string;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  status: string;
  examDate: string;
  chapter: string;
}

export interface HistoryInfo {
  title: string;
  subtitle: string;
  subject: string;
  grade: string;
}

export interface Chapter {
  id: number;
  name: string;
  description: string;
}

export interface TestHistoryData {
  historyInfo: HistoryInfo;
  testResults: TestResult[];
  chapters: Chapter[];
}

export interface QuestionReview {
  questionNumber: number;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamResultData {
  examResult: {
    examInfo: ExamInfo;
    score: number;
    totalQuestions: number;
    answeredCorrect: number;
    answeredIncorrect: number;
    percentage: number;
    status: string;
    startTime: string;
    endTime: string;
    duration: number;
    timeSpent: number;
    grade: string;
    feedback: string;
  };
  questionReview: QuestionReview[];
}

export interface NavigationButton {
  id: string;
  label: string;
  route: string;
  type: string;
  description: string;
}

export interface LandingPageInfo {
  title: string;
  subtitle: string;
  subject: string;
  grade: string;
  description: string;
  icon: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
}

export interface ExamInstructions {
  totalQuestions: number;
  duration: number;
  timeLimit: string;
  questionTypes: string[];
  passingScore: number;
  instructions: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface LandingData {
  landingPage: LandingPageInfo;
  navigation: {
    buttons: NavigationButton[];
  };
  examInfo: ExamInstructions;
  achievements: {
    badges: Achievement[];
  };
}
