'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, FileText, Users, Calendar, Play, BookOpen, PlusCircle, Shuffle } from 'lucide-react'

interface Exam {
  id: string
  title: string
  description?: string
  duration: number
  totalQuestions: number
  questionsToShow: number
  randomizeQuestions: boolean
  createdAt: string
  questions: { id: string }[]
  _count: {
    attempts: number
  }
}

export default function ProvasPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const response = await fetch('/api/exams')
      if (response.ok) {
        const data = await response.json()
        setExams(data)
      }
    } catch (error) {
      console.error('Erro ao carregar provas:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Biblioteca de Avaliações</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Provas Disponíveis</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              {exams.length} {exams.length === 1 ? 'avaliação disponível' : 'avaliações disponíveis'} para você explorar
            </p>
            
            <Link
              href="/criar-prova"
              className="btn-primary px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 mx-auto w-fit group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Nova Avaliação</span>
            </Link>
          </div>

        {/* Lista de Provas */}
        {exams.length === 0 ? (
          <div className="text-center py-20 animate-fade-up">
            <div className="glass-effect p-12 rounded-3xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Nenhuma prova criada
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Que tal começar criando sua primeira avaliação? É rápido e fácil!
              </p>
              <Link
                href="/criar-prova"
                className="btn-primary px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2 mx-auto w-fit"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Criar Primeira Prova</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up" style={{animationDelay: '0.3s'}}>
            {exams.map((exam, index) => (
              <div key={exam.id} className="question-card card-hover group" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {formatDate(exam.createdAt).split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        ID: {exam.id.slice(-8)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {exam.title}
                    </h3>
                    
                    {exam.description && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {exam.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-sm font-semibold text-slate-800">{exam.duration}min</div>
                      <div className="text-xs text-slate-500">Duração</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        {exam.randomizeQuestions && exam.questionsToShow > 0 && exam.questionsToShow < exam.totalQuestions
                          ? `${exam.questionsToShow}/${exam.totalQuestions}`
                          : exam.totalQuestions
                        }
                      </div>
                      <div className="text-xs text-slate-500">Questões</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-sm font-semibold text-slate-800">{exam._count.attempts}</div>
                      <div className="text-xs text-slate-500">Tentativas</div>
                    </div>
                  </div>

                  {/* Badge de Randomização */}
                  {exam.randomizeQuestions && exam.questionsToShow > 0 && exam.questionsToShow < exam.totalQuestions && (
                    <div className="mb-4">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-lg px-3 py-2">
                        <Shuffle className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-medium text-amber-800">
                          Questões Aleatórias • Cada tentativa é única
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link
                      href={`/prova/${exam.id}`}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Iniciar Avaliação
                    </Link>
                    
                    <Link
                      href={`/prova/${exam.id}/detalhes`}
                      className="w-full flex items-center justify-center px-6 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 font-medium"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}