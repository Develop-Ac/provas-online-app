'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react'
import type { Question, Exam } from '@/types'

interface ExamPageParams {
  params: {
    id: string
  }
}

export default function FazerProvaPage({ params }: ExamPageParams) {
  const router = useRouter()
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [studentName, setStudentName] = useState<string>('')
  const [started, setStarted] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    fetchExam()
  }, [])

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [started, timeLeft])

  const fetchExam = async (): Promise<void> => {
    try {
      const response: Response = await fetch(`/api/exams/${params.id}`)
      if (response.ok) {
        const data: Exam = await response.json()
        setExam(data)
        setTimeLeft(data.duration * 60) // converter para segundos
      } else {
        router.push('/provas')
      }
    } catch (error) {
      console.error('Erro ao carregar prova:', error)
      router.push('/provas')
    } finally {
      setLoading(false)
    }
  }

  const startExam = (): void => {
    if (!studentName.trim()) {
      alert('Por favor, informe seu nome')
      return
    }
    setStarted(true)
  }

  const selectAnswer = (questionId: string, option: string): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
  }

  const submitExam = async (): Promise<void> => {
    if (submitting || !exam?.questions) return
    setSubmitting(true)

    try {
      const examAnswers = exam.questions.map((question: Question) => ({
        questionId: question.id,
        selectedOption: answers[question.id] || null
      }))

      const response = await fetch('/api/attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: params.id,
          studentName,
          answers: examAnswers
        }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/resultado/${result.id}`)
      } else {
        throw new Error('Erro ao submeter prova')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao submeter prova. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60)
    const secs: number = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getAnsweredCount = (): number => {
    return Object.keys(answers).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="question-card p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Carregando Prova</h2>
              <p className="text-slate-600">Preparando sua avaliação...</p>
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="question-card p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Prova não encontrada</h2>
              <p className="text-slate-600">A prova que você está tentando acessar não existe ou foi removida.</p>
              <button 
                onClick={() => router.push('/provas')}
                className="mt-6 btn-primary"
              >
                Voltar às Provas
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-3xl mx-auto">
            <div className="question-card p-10 animate-fade-up">
              <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">Pronto para começar?</span>
                </div>

                <h1 className="text-4xl font-bold text-slate-800 mb-4">{exam.title}</h1>
                {exam.description && (
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">{exam.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto mb-10">
                  <div className="glass-effect p-6 rounded-2xl text-center">
                    <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">{exam.duration}</div>
                    <div className="text-sm text-slate-600">minutos</div>
                  </div>
                  
                  <div className="glass-effect p-6 rounded-2xl text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">{exam.questions?.length || 0}</div>
                    <div className="text-sm text-slate-600">questões</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-slate-700">
                    Identifique-se para começar *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                </div>

                <button
                  onClick={startExam}
                  className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Iniciar Avaliação</span>
                  <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  Ao iniciar, o cronômetro começará automaticamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!exam.questions || exam.questions.length === 0) {
    return <div>Prova sem questões disponíveis</div>
  }

  const question: Question = exam.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header da Prova */}
          <div className="question-card p-6 mb-6 animate-fade-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{exam.title}</h1>
                  <p className="text-slate-600 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{studentName}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-indigo-600'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Tempo restante
                  </div>
                </div>
                
                <div className="w-px h-12 bg-slate-200"></div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {getAnsweredCount()}/{exam.questions?.length || 0}
                  </div>
                  <div className="text-xs text-slate-500">Respondidas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 animate-fade-up" style={{animationDelay: '0.1s'}}>
            <div className="flex justify-between text-sm text-slate-600 mb-3">
              <span className="font-medium">Questão {currentQuestion + 1} de {exam.questions?.length || 0}</span>
              <span className="font-medium">{Math.round(((currentQuestion + 1) / (exam.questions?.length || 1)) * 100)}% concluído</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="progress-bar h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((currentQuestion + 1) / (exam.questions?.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Questão */}
          <div className="question-card p-10 mb-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">
                  {question.question}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {(['A', 'B', 'C', 'D'] as const).map((option) => {
                const optionText = question[`option${option}` as keyof Question]
                const isSelected = answers[question.id] === option
                
                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(question.id, option)}
                    className={`
                      w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group
                      ${isSelected 
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg transform scale-[1.02]' 
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-8 h-8 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-300
                        ${isSelected 
                          ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg' 
                          : 'border-slate-300 text-slate-600 group-hover:border-indigo-400 group-hover:text-indigo-600'
                        }
                      `}>
                        {option}
                      </div>
                      <span className="text-slate-800 font-medium text-lg leading-relaxed flex-1">
                        {optionText}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 pt-8 animate-fade-up" style={{animationDelay: '0.3s'}}>
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>

            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {exam.questions?.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`
                    w-12 h-12 rounded-xl font-bold text-sm transition-all duration-300
                    ${index === currentQuestion
                      ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg scale-110'
                      : answers[question.id]
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md hover:scale-105'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:scale-105'
                    }
                  `}
                >
                  {index + 1}
                </button>
              )) || []}
            </div>

            {currentQuestion === (exam.questions?.length || 1) - 1 ? (
              <button
                onClick={submitExam}
                disabled={submitting}
                className={`
                  px-8 py-3 rounded-xl font-semibold transition-all duration-300
                  ${submitting 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  }
                  text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                `}
              >
                {submitting ? 'Enviando...' : 'Finalizar Prova ✓'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min((exam.questions?.length || 1) - 1, currentQuestion + 1))}
                className="btn-primary px-6 py-3 rounded-xl font-medium"
              >
                Próxima →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}