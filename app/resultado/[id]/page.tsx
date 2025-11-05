'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock, User, FileText, TrendingUp } from 'lucide-react'

interface Answer {
  id: string
  selectedOption: string
  isCorrect: boolean
  question: {
    question: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    correctOption: string
    order: number
  }
}

interface AttemptResult {
  id: string
  studentName: string
  score: number
  startedAt: string
  completedAt: string
  exam: {
    title: string
    description?: string
    duration: number
  }
  answers: Answer[]
}

export default function ResultadoPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<AttemptResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResult()
  }, [])

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/attempts/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      }
    } catch (error) {
      console.error('Erro ao carregar resultado:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excelente!'
    if (score >= 60) return 'Bom resultado!'
    return 'Precisa melhorar'
  }

  const formatDuration = (startedAt: string, completedAt: string) => {
    const start = new Date(startedAt)
    const end = new Date(completedAt)
    const diffMs = end.getTime() - start.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)
    
    return `${diffMins}m ${diffSecs}s`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="question-card p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Calculando Resultado</h2>
              <p className="text-slate-600">Analisando suas respostas...</p>
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="question-card p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Resultado não encontrado</h2>
              <p className="text-slate-600">O resultado que você está tentando acessar não existe ou foi removido.</p>
              <Link href="/provas" className="mt-6 btn-primary inline-block">
                Voltar às Provas
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const correctAnswers = result.answers.filter(answer => answer.isCorrect).length
  const totalQuestions = result.answers.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header com Resultado */}
          <div className="question-card p-10 mb-8 animate-fade-up">
            <div className="text-center">
              {/* Score Circle */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 144 144">
                  <circle cx="72" cy="72" r="66" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="66" 
                    fill="none" 
                    stroke={result.score >= 70 ? '#10b981' : result.score >= 50 ? '#f59e0b' : '#ef4444'} 
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 66 * (result.score / 100)} ${2 * Math.PI * 66}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-5xl font-bold ${result.score >= 70 ? 'text-emerald-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {result.score.toFixed(0)}%
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                {getScoreMessage(result.score)}
              </h1>
              <p className="text-xl text-slate-600 mb-8">{result.exam.title}</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-surface p-6 rounded-2xl text-center group hover:bg-white/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Estudante</p>
                  <p className="font-bold text-slate-800">{result.studentName}</p>
                </div>
                
                <div className="glass-surface p-6 rounded-2xl text-center group hover:bg-white/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Acertos</p>
                  <p className="font-bold text-slate-800">{correctAnswers}/{totalQuestions}</p>
                </div>
                
                <div className="glass-surface p-6 rounded-2xl text-center group hover:bg-white/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Tempo Gasto</p>
                  <p className="font-bold text-slate-800">
                    {formatDuration(result.startedAt, result.completedAt)}
                  </p>
                </div>
                
                <div className="glass-surface p-6 rounded-2xl text-center group hover:bg-white/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Performance</p>
                  <p className={`font-bold ${result.score >= 70 ? 'text-emerald-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {result.score.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revisão das Questões */}
          <div className="question-card p-8 mb-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Revisão das Questões</h2>
                <p className="text-slate-600">Análise detalhada das respostas</p>
              </div>
            </div>

            <div className="space-y-6">
              {result.answers.map((answer, index) => (
                <div key={answer.id} className={`glass-surface rounded-2xl p-6 border-l-4 ${
                  answer.isCorrect ? 'border-emerald-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                        answer.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {answer.question.order}
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        Questão {answer.question.order}
                      </span>
                    </div>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800 mb-4 leading-relaxed">{answer.question.question}</h3>

                  <div className="space-y-3">
                    {(['A', 'B', 'C', 'D'] as const).map((option) => {
                      const optionText = answer.question[`option${option}`]
                      const isSelected = answer.selectedOption === option
                      const isCorrect = answer.question.correctOption === option
                      
                      return (
                        <div key={option} className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          isCorrect 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                            : isSelected && !isCorrect
                            ? 'bg-red-50 border-red-300 text-red-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm ${
                                isCorrect 
                                  ? 'bg-emerald-500 text-white' 
                                  : isSelected && !isCorrect
                                  ? 'bg-red-500 text-white'
                                  : 'bg-slate-300 text-slate-600'
                              }`}>
                                {option}
                              </span>
                              <span className="font-medium">{optionText}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {isSelected && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  Sua resposta
                                </span>
                              )}
                              {isCorrect && (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {!answer.isCorrect && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="text-sm text-amber-800">
                        <strong>💡 Resposta correta:</strong> Opção {answer.question.correctOption}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{animationDelay: '0.4s'}}>
            <Link
              href="/provas"
              className="btn-primary px-8 py-3 text-center"
            >
              Ver Outras Provas
            </Link>
            
            <Link
              href="/dashboard"
              className="btn-secondary px-8 py-3 text-center"
            >
              Ver Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}