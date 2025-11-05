import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ExamAttempt } from '@/types'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: Request,
  { params }: RouteParams
): Promise<NextResponse<ExamAttempt | { error: string }>> {
  try {
    const attempt = await prisma.examAttempt.findUnique({
      where: {
        id: params.id
      },
      include: {
        exam: {
          select: {
            title: true,
            description: true,
            duration: true
          }
        },
        answers: {
          include: {
            question: {
              select: {
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctOption: true,
                order: true
              }
            }
          },
          orderBy: {
            question: {
              order: 'asc'
            }
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json(
        { error: 'Resultado não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('Erro ao buscar resultado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}