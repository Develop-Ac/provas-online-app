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
  description?: string
  duration: number
  totalQuestions: number
  questionsToShow: number
  randomizeQuestions: boolean
  createdAt: Date
  updatedAt: Date
  questions?: Question[]
}

export interface ExamAttempt {
  id: string
  examId: string
  studentName: string
  startedAt: Date
  completedAt?: Date
  score?: number
  answers?: Answer[]
}

export interface Answer {
  id: string
  attemptId: string
  questionId: string
  selectedOption?: string
  isCorrect?: boolean
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