import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.answer.deleteMany()
  await prisma.examAttempt.deleteMany()
  await prisma.question.deleteMany()
  await prisma.exam.deleteMany()

  console.log('🗑️  Dados antigos removidos')

  // Criar prova com 30 questões (mostrará apenas 10 aleatórias)
  const examData = {
    title: 'Conhecimentos Gerais - Prova Completa',
    description: 'Uma prova abrangente de conhecimentos gerais com 30 questões. A cada tentativa, 10 questões serão selecionadas aleatoriamente.',
    duration: 20, // 20 minutos
    totalQuestions: 30,
    questionsToShow: 10,
    randomizeQuestions: true
  }

  const exam = await prisma.exam.create({
    data: examData
  })

  console.log('✅ Prova criada:', exam.title)

  // 30 questões de conhecimentos gerais
  const questionsData = [
    // Geografia (1-6)
    {
      examId: exam.id,
      question: 'Qual é a capital do Brasil?',
      optionA: 'Rio de Janeiro',
      optionB: 'São Paulo',
      optionC: 'Brasília',
      optionD: 'Belo Horizonte',
      correctOption: 'C',
      order: 1
    },
    {
      examId: exam.id,
      question: 'Qual é o maior país da América do Sul?',
      optionA: 'Argentina',
      optionB: 'Brasil',
      optionC: 'Peru',
      optionD: 'Colômbia',
      correctOption: 'B',
      order: 2
    },
    {
      examId: exam.id,
      question: 'Em qual continente está localizado o Egito?',
      optionA: 'Ásia',
      optionB: 'Europa',
      optionC: 'África',
      optionD: 'América',
      correctOption: 'C',
      order: 3
    },
    {
      examId: exam.id,
      question: 'Qual é o rio mais longo do mundo?',
      optionA: 'Nilo',
      optionB: 'Amazonas',
      optionC: 'Mississippi',
      optionD: 'Yangtze',
      correctOption: 'A',
      order: 4
    },
    {
      examId: exam.id,
      question: 'Quantos continentes existem no mundo?',
      optionA: '5',
      optionB: '6',
      optionC: '7',
      optionD: '8',
      correctOption: 'C',
      order: 5
    },
    {
      examId: exam.id,
      question: 'Qual é a montanha mais alta do mundo?',
      optionA: 'K2',
      optionB: 'Monte Everest',
      optionC: 'Monte Kilimanjaro',
      optionD: 'Monte McKinley',
      correctOption: 'B',
      order: 6
    },
    
    // História (7-12)
    {
      examId: exam.id,
      question: 'Em que ano ocorreu a Independência do Brasil?',
      optionA: '1820',
      optionB: '1822',
      optionC: '1824',
      optionD: '1825',
      correctOption: 'B',
      order: 7
    },
    {
      examId: exam.id,
      question: 'Quem foi o primeiro presidente do Brasil?',
      optionA: 'Getúlio Vargas',
      optionB: 'Juscelino Kubitschek',
      optionC: 'Deodoro da Fonseca',
      optionD: 'Floriano Peixoto',
      correctOption: 'C',
      order: 8
    },
    {
      examId: exam.id,
      question: 'A Segunda Guerra Mundial terminou em qual ano?',
      optionA: '1944',
      optionB: '1945',
      optionC: '1946',
      optionD: '1947',
      correctOption: 'B',
      order: 9
    },
    {
      examId: exam.id,
      question: 'Qual civilização construiu Machu Picchu?',
      optionA: 'Asteca',
      optionB: 'Maia',
      optionC: 'Inca',
      optionD: 'Olmeca',
      correctOption: 'C',
      order: 10
    },
    {
      examId: exam.id,
      question: 'Em que século ocorreu o Renascimento?',
      optionA: 'Século XIII',
      optionB: 'Século XIV-XVI',
      optionC: 'Século XVII',
      optionD: 'Século XVIII',
      correctOption: 'B',
      order: 11
    },
    {
      examId: exam.id,
      question: 'Qual foi a primeira capital do Brasil?',
      optionA: 'Rio de Janeiro',
      optionB: 'São Paulo',
      optionC: 'Salvador',
      optionD: 'Brasília',
      correctOption: 'C',
      order: 12
    },

    // Ciências (13-18)
    {
      examId: exam.id,
      question: 'Qual é o elemento químico representado pelo símbolo "O"?',
      optionA: 'Ouro',
      optionB: 'Oxigênio',
      optionC: 'Ósmio',
      optionD: 'Outro',
      correctOption: 'B',
      order: 13
    },
    {
      examId: exam.id,
      question: 'Quantos ossos tem o corpo humano adulto?',
      optionA: '186',
      optionB: '198',
      optionC: '206',
      optionD: '214',
      correctOption: 'C',
      order: 14
    },
    {
      examId: exam.id,
      question: 'Qual planeta é conhecido como "Planeta Vermelho"?',
      optionA: 'Vênus',
      optionB: 'Marte',
      optionC: 'Júpiter',
      optionD: 'Saturno',
      correctOption: 'B',
      order: 15
    },
    {
      examId: exam.id,
      question: 'Qual é a velocidade da luz no vácuo?',
      optionA: '300.000 km/s',
      optionB: '150.000 km/s',
      optionC: '450.000 km/s',
      optionD: '600.000 km/s',
      correctOption: 'A',
      order: 16
    },
    {
      examId: exam.id,
      question: 'Qual é o maior órgão do corpo humano?',
      optionA: 'Fígado',
      optionB: 'Pulmão',
      optionC: 'Pele',
      optionD: 'Cérebro',
      correctOption: 'C',
      order: 17
    },
    {
      examId: exam.id,
      question: 'Quantos cromossomos possui uma célula humana normal?',
      optionA: '23',
      optionB: '44',
      optionC: '46',
      optionD: '48',
      correctOption: 'C',
      order: 18
    },

    // Literatura e Português (19-24)
    {
      examId: exam.id,
      question: 'Quem escreveu "Dom Casmurro"?',
      optionA: 'José de Alencar',
      optionB: 'Machado de Assis',
      optionC: 'Lima Barreto',
      optionD: 'Monteiro Lobato',
      correctOption: 'B',
      order: 19
    },
    {
      examId: exam.id,
      question: 'Qual é o plural de "cidadão"?',
      optionA: 'Cidadãos',
      optionB: 'Cidadões',
      optionC: 'Cidadãoes',
      optionD: 'Cidadans',
      correctOption: 'A',
      order: 20
    },
    {
      examId: exam.id,
      question: 'Em "O Cortiço", quem é o autor?',
      optionA: 'Aluísio Azevedo',
      optionB: 'Raul Pompéia',
      optionC: 'Adolfo Caminha',
      optionD: 'Júlio Ribeiro',
      correctOption: 'A',
      order: 21
    },
    {
      examId: exam.id,
      question: 'Qual figura de linguagem está presente em "Suas palavras são punhais"?',
      optionA: 'Metáfora',
      optionB: 'Comparação',
      optionC: 'Metonímia',
      optionD: 'Antítese',
      correctOption: 'A',
      order: 22
    },
    {
      examId: exam.id,
      question: 'Quantas sílabas tem a palavra "paralelepípedo"?',
      optionA: '6',
      optionB: '7',
      optionC: '8',
      optionD: '9',
      correctOption: 'B',
      order: 23
    },
    {
      examId: exam.id,
      question: 'O Modernismo brasileiro teve início em qual ano?',
      optionA: '1920',
      optionB: '1922',
      optionC: '1924',
      optionD: '1925',
      correctOption: 'B',
      order: 24
    },

    // Matemática (25-30)
    {
      examId: exam.id,
      question: 'Qual é o valor de π (pi) aproximadamente?',
      optionA: '3,14',
      optionB: '3,16',
      optionC: '3,12',
      optionD: '3,18',
      correctOption: 'A',
      order: 25
    },
    {
      examId: exam.id,
      question: 'Quanto é 15% de 200?',
      optionA: '25',
      optionB: '30',
      optionC: '35',
      optionD: '40',
      correctOption: 'B',
      order: 26
    },
    {
      examId: exam.id,
      question: 'Qual é a raiz quadrada de 144?',
      optionA: '11',
      optionB: '12',
      optionC: '13',
      optionD: '14',
      correctOption: 'B',
      order: 27
    },
    {
      examId: exam.id,
      question: 'Em um triângulo retângulo, qual é o teorema que relaciona os lados?',
      optionA: 'Teorema de Tales',
      optionB: 'Teorema de Pitágoras',
      optionC: 'Teorema fundamental',
      optionD: 'Teorema de Euclides',
      correctOption: 'B',
      order: 28
    },
    {
      examId: exam.id,
      question: 'Quanto é 2^8 (2 elevado a 8)?',
      optionA: '128',
      optionB: '256',
      optionC: '512',
      optionD: '64',
      correctOption: 'B',
      order: 29
    },
    {
      examId: exam.id,
      question: 'Qual é o resultado de 7 × 9?',
      optionA: '56',
      optionB: '63',
      optionC: '72',
      optionD: '81',
      correctOption: 'B',
      order: 30
    }
  ]

  // Criar todas as questões
  for (const questionData of questionsData) {
    await prisma.question.create({
      data: questionData
    })
  }

  console.log('✅ 30 questões criadas com sucesso!')

  // Atualizar contador de questões na prova
  await prisma.exam.update({
    where: { id: exam.id },
    data: { totalQuestions: 30 }
  })

  console.log('🎯 Seed concluído com sucesso!')
  console.log(`📊 Prova criada: "${exam.title}"`)
  console.log(`📝 Total de questões: 30`)
  console.log(`🎲 Questões por tentativa: 10 (aleatórias)`)
  console.log(`⏱️  Duração: 20 minutos`)
  
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })