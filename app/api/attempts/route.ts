import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ExamAttempt } from '@/types'

interface SubmitAttemptRequest {
  examId: string
  studentName: string
  answers: Array<{
    questionId: string
    selectedOption: string
  }>
}

interface ProcessedAnswer {
  questionId: string
  selectedOption: string
  isCorrect: boolean
}

interface ExamQuestion {
  id: string
  correctOption: string
}

export async function POST(request: Request): Promise<NextResponse<ExamAttempt | { error: string }>> {
  try {
    const body: SubmitAttemptRequest = await request.json()
    const { examId, studentName, answers } = body

    // Validações básicas
    if (!examId || !studentName || !answers) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Buscar a prova e suas questões com as respostas corretas
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          select: {
            id: true,
            correctOption: true
          }
        }
      }
    })

    if (!exam) {
      return NextResponse.json(
        { error: 'Prova não encontrada' },
        { status: 404 }
      )
    }

    // Calcular pontuação
    let correctAnswers: number = 0
    const processedAnswers: ProcessedAnswer[] = answers.map((answer) => {
      const question: ExamQuestion | undefined = exam.questions.find((q) => q.id === answer.questionId)
      const isCorrect: boolean = question ? question.correctOption === answer.selectedOption : false
      if (isCorrect) correctAnswers++
      
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect
      }
    })

    const score: number = Math.round((correctAnswers / exam.questions.length) * 100)

    // Criar tentativa com respostas
    const attempt = await prisma.examAttempt.create({
      data: {
        examId,
        studentName,
        completedAt: new Date(),
        score,
        answers: {
          create: processedAnswers
        }
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctOption: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(attempt, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar tentativa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}