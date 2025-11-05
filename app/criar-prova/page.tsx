'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Save, BookOpen, PlusCircle, Shuffle } from 'lucide-react'

interface Question {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctOption: string
}

interface ExamForm {
  title: string
  description: string
  duration: number
  questionsToShow: number
  randomizeQuestions: boolean
  questions: Question[]
}

export default function CriarProvaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [exam, setExam] = useState<ExamForm>({
    title: '',
    description: '',
    duration: 60,
    questionsToShow: 0,
    randomizeQuestions: false,
    questions: [
      {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: 'A'
      }
    ]
  })

  const addQuestion = (): void => {
    setExam(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctOption: 'A'
        }
      ]
    }))
  }

  const removeQuestion = (index: number): void => {
    if (exam.questions.length > 1) {
      setExam(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }))
    }
  }

  const updateQuestion = (index: number, field: keyof Question, value: string): void => {
    setExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response: Response = await fetch('/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exam),
      })

      if (response.ok) {
        alert('Prova criada com sucesso!')
        router.push('/provas')
      } else {
        throw new Error('Erro ao criar prova')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao criar prova. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">Nova Avaliação</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Criar Prova</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Monte sua avaliação personalizada com nossa interface intuitiva e recursos avançados
            </p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
          {/* Informações da Prova */}
          <div className="question-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Informações da Prova
                </h2>
                <p className="text-slate-600">Configure os detalhes básicos da sua avaliação</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Título da Prova *
                </label>
                <input
                  type="text"
                  required
                  value={exam.title}
                  onChange={(e) => setExam(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="Ex: Avaliação de Matemática - 1º Bimestre"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Duração (minutos) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={exam.duration}
                  onChange={(e) => setExam(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="60"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Descrição da Prova
              </label>
              <textarea
                rows={4}
                value={exam.description}
                onChange={(e) => setExam(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                placeholder="Descreva o conteúdo e objetivos da prova (opcional)"
              />
            </div>

            {/* Configurações de Randomização */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Shuffle className="w-5 h-5 text-amber-600 mr-2" />
                Seleção Aleatória de Questões
              </h3>
              <p className="text-sm text-slate-600 mb-6">Configure para mostrar apenas uma parte das questões de forma aleatória</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Questões a mostrar por prova
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={exam.questions.length}
                    value={exam.questionsToShow}
                    onChange={(e) => setExam(prev => ({ ...prev, questionsToShow: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white"
                    placeholder="0 = mostrar todas"
                  />
                  <p className="text-xs text-slate-500">Digite 0 para mostrar todas as {exam.questions.length} questões</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="randomize"
                      checked={exam.randomizeQuestions}
                      onChange={(e) => setExam(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                      className="w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="randomize" className="text-sm font-medium text-slate-700">
                      Sortear questões aleatoriamente
                    </label>
                  </div>
                  
                  {exam.randomizeQuestions && (
                    <div className="text-sm text-amber-700 bg-amber-100 p-3 rounded-lg">
                      <strong>💡 Dica:</strong> Cada estudante receberá uma combinação diferente de questões, 
                      tornando cada prova única e reduzindo a possibilidade de cola.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Questões */}
          <div className="question-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{exam.questions.length}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Questões da Prova
                  </h2>
                  <p className="text-slate-600">Adicione e configure suas perguntas</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={addQuestion}
                className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Nova Questão</span>
              </button>
            </div>

            <div className="space-y-6">
              {exam.questions.map((question, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Questão {index + 1}
                      </h3>
                    </div>
                    {exam.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="w-10 h-10 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center justify-center group"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Pergunta */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Enunciado da Questão *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={question.question}
                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                        placeholder="Digite o enunciado da questão de forma clara e objetiva..."
                      />
                    </div>

                    {/* Opções */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-4">
                        Alternativas *
                      </label>
                      <div className="grid grid-cols-1 gap-4">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => (
                          <div key={option} className="relative">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-slate-700 font-bold text-sm">{option}</span>
                              </div>
                              <input
                                type="text"
                                required
                                value={question[`option${option}` as keyof Question]}
                                onChange={(e) => updateQuestion(index, `option${option}` as keyof Question, e.target.value)}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                                placeholder={`Digite a alternativa ${option}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resposta Correta */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Gabarito *
                      </label>
                      <div className="flex space-x-3">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateQuestion(index, 'correctOption', option)}
                            className={`
                              px-4 py-2 rounded-xl font-semibold transition-all duration-300 border-2
                              ${question.correctOption === option
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                              }
                            `}
                          >
                            Alternativa {option}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Selecione a alternativa correta para esta questão
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Salvar */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`
                flex items-center space-x-3 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                ${isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }
                text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              `}
            >
              <Save className={`w-6 h-6 ${isLoading ? '' : 'group-hover:scale-110 transition-transform duration-300'}`} />
              <span>
                {isLoading ? (
                  <>
                    <span className="loading-dots">Salvando</span>
                  </>
                ) : 'Criar Prova'}
              </span>
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}