import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Estatísticas gerais
    const [
      totalExams,
      totalAttempts,
      avgScore,
      recentAttempts,
      examStats,
      scoreDistribution
    ] = await Promise.all([
      // Total de provas
      prisma.exam.count(),
      
      // Total de tentativas
      prisma.examAttempt.count({
        where: {
          completedAt: { not: null }
        }
      }),
      
      // Pontuação média
      prisma.examAttempt.aggregate({
        _avg: {
          score: true
        },
        where: {
          completedAt: { not: null }
        }
      }),
      
      // Tentativas recentes
      prisma.examAttempt.findMany({
        where: {
          completedAt: { not: null }
        },
        include: {
          exam: {
            select: {
              title: true
            }
          }
        },
        orderBy: {
          completedAt: 'desc'
        },
        take: 10
      }),
      
      // Estatísticas por prova
      prisma.exam.findMany({
        include: {
          _count: {
            select: {
              attempts: {
                where: {
                  completedAt: { not: null }
                }
              },
              questions: true
            }
          },
          attempts: {
            where: {
              completedAt: { not: null }
            },
            select: {
              score: true,
              completedAt: true
            }
          }
        }
      }),
      
      // Distribuição de pontuações
      prisma.examAttempt.findMany({
        where: {
          completedAt: { not: null }
        },
        select: {
          score: true
        }
      })
    ])

    // Calcular estatísticas das provas
    const examStatsWithAvg = examStats.map((exam: any) => {
      interface ExamAttempt {
        score: number | null;
        completedAt: Date | null;
      }

      interface ExamWithStats {
        id: string;
        title: string;
        createdAt: Date;
        _count: {
          attempts: number;
          questions: number;
        };
        attempts: ExamAttempt[];
      }

      const scores: number[] = exam.attempts.map((attempt: ExamAttempt) => attempt.score || 0)
      const avgScore = scores.length > 0 
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0

      return {
        id: exam.id,
        title: exam.title,
        totalAttempts: exam._count.attempts,
        totalQuestions: exam._count.questions,
        avgScore: avgScore,
        createdAt: exam.createdAt
      }
    })

    // Distribuição de notas em faixas
    const scoreRanges = {
      excellent: 0, // 90-100
      good: 0,      // 70-89
      average: 0,   // 50-69
      poor: 0       // 0-49
    }

    scoreDistribution.forEach(attempt => {
      const score = attempt.score || 0
      if (score >= 90) scoreRanges.excellent++
      else if (score >= 70) scoreRanges.good++
      else if (score >= 50) scoreRanges.average++
      else scoreRanges.poor++
    })

    // Tentativas por mês nos últimos 6 meses
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyAttempts = await prisma.examAttempt.findMany({
      where: {
        completedAt: {
          gte: sixMonthsAgo,
          not: null
        }
      },
      select: {
        completedAt: true
      }
    })

    // Agrupar por mês
    const monthlyStats = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      const monthName = date.toLocaleDateString('pt-BR', { month: 'short' })
      
      const count = monthlyAttempts.filter(attempt => {
        const attemptDate = new Date(attempt.completedAt!)
        return attemptDate.getMonth() === date.getMonth() && 
               attemptDate.getFullYear() === date.getFullYear()
      }).length

      return {
        month: monthName,
        attempts: count
      }
    })

    const stats = {
      overview: {
        totalExams,
        totalAttempts,
        avgScore: avgScore._avg.score || 0,
        totalStudents: await prisma.examAttempt.groupBy({
          by: ['studentName'],
          where: {
            completedAt: { not: null }
          }
        }).then(groups => groups.length)
      },
      recentAttempts: recentAttempts.map(attempt => ({
        id: attempt.id,
        studentName: attempt.studentName,
        examTitle: attempt.exam.title,
        score: attempt.score,
        completedAt: attempt.completedAt
      })),
      examStats: examStatsWithAvg,
      scoreDistribution: scoreRanges,
      monthlyAttempts: monthlyStats
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}