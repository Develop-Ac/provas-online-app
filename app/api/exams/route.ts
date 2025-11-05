import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Exam, CreateExamRequest, QuestionFormData } from '@/types'

// GET - Listar todas as provas
export async function GET(): Promise<NextResponse<Exam[] | { error: string }>> {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        },
        _count: {
          select: {
            attempts: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error('Erro ao buscar provas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar uma nova prova
export async function POST(request: Request): Promise<NextResponse<Exam | { error: string }>> {
  try {
    const body: CreateExamRequest = await request.json()
    const { title, description, duration, questions, questionsToShow, randomizeQuestions } = body

    // Validações básicas
    if (!title || !duration || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Calcular valores para os novos campos
    const totalQuestions: number = questions.length
    const finalQuestionsToShow: number = questionsToShow && questionsToShow > 0 
      ? Math.min(questionsToShow, totalQuestions) 
      : totalQuestions

    // Criar a prova com as questões
    const exam = await prisma.exam.create({
      data: {
        title,
        description: description || null,
        duration,
        totalQuestions,
        questionsToShow: finalQuestionsToShow,
        randomizeQuestions: randomizeQuestions || false,
        questions: {
          create: questions.map((question: QuestionFormData, index: number) => ({
            question: question.question,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctOption: question.correctOption,
            order: index + 1
          }))
        }
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    return NextResponse.json(exam, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar prova:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}