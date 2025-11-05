'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ScoreDistribution {
  excellent: number
  good: number
  average: number
  poor: number
}

interface MonthlyAttempt {
  month: string
  attempts: number
}

interface ExamStat {
  title: string
  avgScore: number
  totalAttempts: number
}

interface ChartsProps {
  scoreDistribution: ScoreDistribution
  monthlyAttempts: MonthlyAttempt[]
  examStats: ExamStat[]
}

export default function Charts({ scoreDistribution, monthlyAttempts, examStats }: ChartsProps) {
  // Gráfico de Distribuição de Notas (Doughnut)
  const scoreData = {
    labels: ['Excelente (90-100%)', 'Bom (70-89%)', 'Regular (50-69%)', 'Ruim (0-49%)'],
    datasets: [
      {
        data: [
          scoreDistribution.excellent,
          scoreDistribution.good,
          scoreDistribution.average,
          scoreDistribution.poor
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // emerald-500 with transparency
          'rgba(59, 130, 246, 0.8)', // blue-500 with transparency
          'rgba(245, 158, 11, 0.8)', // amber-500 with transparency
          'rgba(239, 68, 68, 0.8)'  // red-500 with transparency
        ],
        borderColor: [
          '#10b981', // emerald-500
          '#3b82f6', // blue-500
          '#f59e0b', // amber-500
          '#ef4444'  // red-500
        ],
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 8
      }
    ]
  }

  const scoreOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 25,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: 'Inter'
          },
          color: '#475569' // slate-600
        }
      }
    },
    cutout: '60%',
    elements: {
      arc: {
        borderRadius: 8
      }
    }
  }

  // Gráfico de Tentativas por Mês (Line)
  const monthlyData = {
    labels: monthlyAttempts.map(item => item.month),
    datasets: [
      {
        label: 'Tentativas',
        data: monthlyAttempts.map(item => item.attempts),
        borderColor: 'rgb(79, 70, 229)', // indigo-600
        backgroundColor: 'rgba(79, 70, 229, 0.1)', // indigo-600 with transparency
        borderWidth: 3,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 7,
        pointHoverRadius: 9,
        tension: 0.4,
        fill: true,
        shadowColor: 'rgba(79, 70, 229, 0.3)',
        shadowBlur: 10
      }
    ]
  }

  const monthlyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#64748b' // slate-500
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with transparency
          drawBorder: false
        },
        border: {
          display: false
        },
        ticks: {
          stepSize: 1,
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#64748b' // slate-500
        }
      }
    }
  }

  // Gráfico de Performance por Prova (Bar)
  const examData = {
    labels: examStats.slice(0, 8).map(exam => 
      exam.title.length > 15 ? exam.title.substring(0, 15) + '...' : exam.title
    ),
    datasets: [
      {
        label: 'Nota Média (%)',
        data: examStats.slice(0, 8).map(exam => exam.avgScore),
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.4)');
          return gradient;
        },
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  }

  const examOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#64748b' // slate-500
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with transparency
          drawBorder: false
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#64748b', // slate-500
          callback: function(value: any) {
            return value + '%'
          }
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Distribuição de Notas */}
      <div className="question-card p-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Distribuição de Notas</h3>
            <p className="text-slate-600">Performance dos estudantes</p>
          </div>
        </div>
        <div className="h-80 glass-surface rounded-xl p-4 flex items-center justify-center">
          <Doughnut data={scoreData} options={scoreOptions} />
        </div>
      </div>

      {/* Tentativas por Mês */}
      <div className="question-card p-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Atividade Mensal</h3>
            <p className="text-slate-600">Tentativas dos últimos meses</p>
          </div>
        </div>
        <div className="h-80 glass-surface rounded-xl p-4">
          <Line data={monthlyData} options={monthlyOptions} />
        </div>
      </div>

      {/* Performance por Prova */}
      <div className="question-card p-8 xl:col-span-2">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Performance por Prova</h3>
            <p className="text-slate-600">Nota média das avaliações</p>
          </div>
        </div>
        <div className="h-96 glass-surface rounded-xl p-4">
          <Bar data={examData} options={examOptions} />
        </div>
      </div>
    </div>
  )
}