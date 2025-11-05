import Link from 'next/link'
import { BookOpen, Users, BarChart3, PlusCircle, Sparkles, Target, Trophy, Clock } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Plataforma Educacional Moderna</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">EduProva</span>
            <br />
            <span className="text-slate-800">Sistema Inteligente</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Transforme a educação com nossa plataforma completa para criação, aplicação e análise de avaliações online. 
            <strong className="text-indigo-600">Simples, moderno e eficiente.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link
              href="/criar-prova"
              className="btn-primary px-8 py-4 rounded-2xl text-lg font-semibold flex items-center space-x-2 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Criar Primeira Prova</span>
            </Link>
            <Link
              href="/provas"
              className="btn-secondary px-8 py-4 rounded-2xl text-lg font-semibold flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explorar Provas</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Fácil de Usar</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Relatórios Detalhados</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Criar Prova */}
          <Link href="/criar-prova" className="group animate-fade-up" style={{animationDelay: '0.1s'}}>
            <div className="question-card card-hover p-8 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Criar Prova
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Interface intuitiva para criar avaliações com questões personalizadas e configurações flexíveis
                </p>
                <div className="mt-4 text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                  Começar agora →
                </div>
              </div>
            </div>
          </Link>

          {/* Ver Provas */}
          <Link href="/provas" className="group animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="question-card card-hover p-8 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Biblioteca de Provas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Acesse e gerencie todas as avaliações disponíveis com filtros e organização inteligente
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  Explorar →
                </div>
              </div>
            </div>
          </Link>

          {/* Fazer Prova */}
          <Link href="/provas" className="group animate-fade-up" style={{animationDelay: '0.3s'}}>
            <div className="question-card card-hover p-8 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Fazer Avaliação
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Interface moderna para realizar provas com timer, progresso e experiência otimizada
                </p>
                <div className="mt-4 text-purple-600 text-sm font-medium group-hover:text-purple-700">
                  Iniciar →
                </div>
              </div>
            </div>
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="group animate-fade-up" style={{animationDelay: '0.4s'}}>
            <div className="question-card card-hover p-8 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Analytics
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dashboards inteligentes com gráficos interativos e relatórios detalhados de performance
                </p>
                <div className="mt-4 text-orange-600 text-sm font-medium group-hover:text-orange-700">
                  Visualizar →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="text-center mb-20 animate-fade-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Por que escolher o <span className="gradient-text">EduProva?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Desenvolvido especialmente para educadores modernos que buscam eficiência e qualidade
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-effect p-8 rounded-3xl text-center group hover:bg-white/40 transition-colors duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Interface Intuitiva
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Design limpo e moderno que facilita a criação de provas sem complicações técnicas
              </p>
            </div>
            
            <div className="glass-effect p-8 rounded-3xl text-center group hover:bg-white/40 transition-colors duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Economia de Tempo
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Automatização completa da correção e geração instantânea de relatórios detalhados
              </p>
            </div>
            
            <div className="glass-effect p-8 rounded-3xl text-center group hover:bg-white/40 transition-colors duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Análise Avançada
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Gráficos interativos e métricas educacionais para acompanhar o progresso dos alunos
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-up" style={{animationDelay: '0.6s'}}>
          <div className="glass-effect p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Pronto para revolucionar suas avaliações?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de educadores que já descobriram uma forma mais inteligente de avaliar
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/criar-prova"
                className="btn-primary px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Criar Minha Primeira Prova</span>
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Ver Demonstração</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}