export interface Question {
  id: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctOption: string
  order: number
}

export interface Exam {
  id: string
  title: string
  description?: string | null
  duration: number
  totalQuestions: number
  questionsToShow: number
  randomizeQuestions: boolean
  createdAt: Date
  updatedAt: Date
  questions?: Question[]
  _count?: {
    attempts: number
  }
}

export interface ExamAttempt {
  id: string
  examId: string
  studentName: string
  startedAt: Date
  completedAt?: Date | null
  score?: number | null
  answers?: Answer[]
}

export interface Answer {
  id: string
  attemptId: string
  questionId: string
  selectedOption?: string | null
  isCorrect?: boolean | null
}

export interface ExamFormData {
  title: string
  description: string
  duration: number
  questions: QuestionFormData[]
}

export interface QuestionFormData {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctOption: string
}

// Tipos para Dashboard e Estatísticas
export interface DashboardOverview {
  totalExams: number
  totalAttempts: number
  avgScore: number
  totalStudents: number
}

export interface RecentAttempt {
  id: string
  studentName: string
  examTitle: string
  score: number | null
  completedAt: Date | null
}

export interface ExamStatistic {
  id: string
  title: string
  totalAttempts: number
  totalQuestions: number
  avgScore: number
  createdAt: Date
}

export interface ScoreDistribution {
  excellent: number
  good: number
  average: number
  poor: number
}

export interface MonthlyAttemptData {
  month: string
  attempts: number
}

export interface DashboardData {
  overview: DashboardOverview
  recentAttempts: RecentAttempt[]
  examStats: ExamStatistic[]
  scoreDistribution: ScoreDistribution
  monthlyAttempts: MonthlyAttemptData[]
}

// Tipos para dados do Prisma
export interface PrismaExamAttempt {
  score: number | null
  completedAt: Date | null
}

export interface PrismaExamWithStats {
  id: string
  title: string
  createdAt: Date
  _count: {
    attempts: number
    questions: number
  }
  attempts: PrismaExamAttempt[]
}

export interface PrismaRecentAttempt {
  id: string
  studentName: string
  score: number | null
  completedAt: Date | null
  exam: {
    title: string
  }
}

// Tipos para API Requests
export interface CreateExamRequest {
  title: string
  description?: string
  duration: number
  questions: QuestionFormData[]
  questionsToShow?: number
  randomizeQuestions?: boolean
}

export interface CreateAttemptRequest {
  examId: string
  studentName: string
}

export interface SubmitAnswerRequest {
  attemptId: string
  questionId: string
  selectedOption: string
}