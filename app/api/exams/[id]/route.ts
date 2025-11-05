import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        id: params.id
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          },
          select: {
            id: true,
            question: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
            order: true
            // Não incluir correctOption para não dar spoiler
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

    // Aplicar seleção aleatória se configurado
    let finalQuestions = exam.questions

    if (exam.randomizeQuestions && exam.questionsToShow > 0 && exam.questionsToShow < exam.questions.length) {
      // Embaralhar questões aleatoriamente
      const shuffled = [...exam.questions].sort(() => Math.random() - 0.5)
      // Pegar apenas o número especificado
      finalQuestions = shuffled.slice(0, exam.questionsToShow)
      // Reordenar para apresentação
      finalQuestions = finalQuestions.map((q: any, index) => ({ ...q, order: index + 1 }))
    } else if (exam.questionsToShow > 0 && exam.questionsToShow < exam.questions.length) {
      // Se não é aleatório, pegar as primeiras N questões
      finalQuestions = exam.questions.slice(0, exam.questionsToShow)
    }

    const examWithSelectedQuestions = {
      ...exam,
      questions: finalQuestions
    }

    return NextResponse.json(examWithSelectedQuestions)
  } catch (error) {
    console.error('Erro ao buscar prova:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}