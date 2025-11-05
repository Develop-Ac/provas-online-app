import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { 
  PrismaExamWithStats, 
  PrismaRecentAttempt, 
  ExamStatistic,
  ScoreDistribution,
  MonthlyAttemptData,
  DashboardData,
  DashboardOverview,
  RecentAttempt
} from '@/types'

export async function GET(): Promise<NextResponse<DashboardData | { error: string }>> {
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
    const examStatsWithAvg: ExamStatistic[] = examStats.map((exam: PrismaExamWithStats) => {
      const scores: number[] = exam.attempts.map((attempt) => attempt.score || 0)
      const avgScore: number = scores.length > 0 
        ? scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length
        : 0

      return {
        id: exam.id,
        title: exam.title,
        totalAttempts: exam._count.attempts,
        totalQuestions: exam._count.questions,
        avgScore: Math.round(avgScore * 100) / 100, // Arredondar para 2 casas decimais
        createdAt: exam.createdAt
      }
    })

    // Distribuição de notas em faixas
    const scoreRanges: ScoreDistribution = {
      excellent: 0, // 90-100
      good: 0,      // 70-89
      average: 0,   // 50-69
      poor: 0       // 0-49
    }

    scoreDistribution.forEach((attempt: { score: number | null }) => {
      const score: number = attempt.score || 0
      if (score >= 90) scoreRanges.excellent++
      else if (score >= 70) scoreRanges.good++
      else if (score >= 50) scoreRanges.average++
      else scoreRanges.poor++
    })

    // Tentativas por mês nos últimos 6 meses
    const sixMonthsAgo: Date = new Date()
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
    const monthlyStats: MonthlyAttemptData[] = Array.from({ length: 6 }, (_, i: number) => {
      const date: Date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      const monthName: string = date.toLocaleDateString('pt-BR', { month: 'short' })
      
      const count: number = monthlyAttempts.filter((attempt: { completedAt: Date | null }) => {
        if (!attempt.completedAt) return false
        const attemptDate: Date = new Date(attempt.completedAt)
        return attemptDate.getMonth() === date.getMonth() && 
               attemptDate.getFullYear() === date.getFullYear()
      }).length

      return {
        month: monthName,
        attempts: count
      }
    })

    const totalStudents: number = await prisma.examAttempt.groupBy({
      by: ['studentName'],
      where: {
        completedAt: { not: null }
      }
    }).then((groups: Array<{ studentName: string }>) => groups.length)

    const overview: DashboardOverview = {
      totalExams,
      totalAttempts,
      avgScore: Math.round((avgScore._avg.score || 0) * 100) / 100,
      totalStudents
    }

    const formattedRecentAttempts: RecentAttempt[] = recentAttempts.map((attempt: PrismaRecentAttempt) => ({
      id: attempt.id,
      studentName: attempt.studentName,
      examTitle: attempt.exam.title,
      score: attempt.score,
      completedAt: attempt.completedAt
    }))

    const stats: DashboardData = {
      overview,
      recentAttempts: formattedRecentAttempts,
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