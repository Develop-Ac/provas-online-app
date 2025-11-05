# Sistema de Provas Online

Um sistema completo para criação, aplicação e análise de provas online desenvolvido com Next.js, TypeScript, Tailwind CSS, Prisma e SQLite.

## 🚀 Funcionalidades

### 1. **Criação de Provas** (`/criar-prova`)
- Interface intuitiva para criar provas
- Adição de múltiplas questões com 4 opções (A, B, C, D)
- Definição de tempo limite
- Seleção da resposta correta
- Validação completa dos dados

### 2. **Listagem de Provas** (`/provas`)
- Visualização de todas as provas disponíveis
- Informações sobre duração, número de questões e tentativas
- Botões para fazer a prova ou ver detalhes
- Layout responsivo com cards informativos

### 3. **Realizar Prova** (`/prova/[id]`)
- Interface interativa para realizar provas
- Timer em tempo real com alerta quando restam 5 minutos
- Navegação entre questões
- Indicador de progresso
- Seleção de respostas com interface amigável
- Submissão automática quando o tempo acaba

### 4. **Dashboard de Resultados** (`/dashboard`)
- **Estatísticas Gerais:**
  - Total de provas, tentativas, estudantes únicos
  - Nota média geral
- **Gráficos Interativos:**
  - Distribuição de notas (Doughnut Chart)
  - Tentativas por mês (Line Chart)
  - Performance por prova (Bar Chart)
- **Tabelas Detalhadas:**
  - Tentativas recentes
  - Ranking de provas por popularidade

### 5. **Resultado Individual** (`/resultado/[id]`)
- Nota final e classificação
- Revisão detalhada de todas as questões
- Comparação entre resposta do aluno e resposta correta
- Estatísticas de tempo gasto

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14 com App Router
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** SQLite
- **ORM:** Prisma
- **Gráficos:** Chart.js + react-chartjs-2
- **Ícones:** Lucide React

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos para rodar o projeto:

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd provas-online
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados:**
```bash
# Gerar o cliente Prisma
npx prisma generate

# Criar e sincronizar o banco
npx prisma db push
```

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🗄️ Estrutura do Banco de Dados

### Modelos Principais:

- **Exam:** Representa uma prova
  - `id`, `title`, `description`, `duration`, `createdAt`, `updatedAt`

- **Question:** Questões da prova
  - `id`, `examId`, `question`, `optionA`, `optionB`, `optionC`, `optionD`, `correctOption`, `order`

- **ExamAttempt:** Tentativas de realização
  - `id`, `examId`, `studentName`, `startedAt`, `completedAt`, `score`

- **Answer:** Respostas individuais
  - `id`, `attemptId`, `questionId`, `selectedOption`, `isCorrect`

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar versão de produção
npm run start

# Executar linter
npm run lint

# Sincronizar banco de dados
npm run db:push

# Gerar cliente Prisma
npm run db:generate

# Abrir Prisma Studio (interface visual do banco)
npm run db:studio
```

## 📁 Estrutura do Projeto

```
provas-online/
├── app/                          # Páginas Next.js (App Router)
│   ├── api/                      # API Routes
│   │   ├── exams/               # CRUD de provas
│   │   ├── attempts/            # Tentativas e resultados
│   │   └── stats/               # Estatísticas
│   ├── criar-prova/             # Página de criação
│   ├── provas/                  # Listagem de provas
│   ├── prova/[id]/              # Realizar prova
│   ├── resultado/[id]/          # Ver resultado
│   └── dashboard/               # Dashboard
├── components/                   # Componentes reutilizáveis
├── lib/                         # Utilitários (prisma client)
├── prisma/                      # Schema do banco
├── types/                       # Definições TypeScript
└── public/                      # Arquivos estáticos
```

## 🎯 Como Usar

### Para Criar uma Prova:
1. Acesse `/criar-prova`
2. Preencha título, descrição e duração
3. Adicione questões com 4 opções cada
4. Marque a resposta correta
5. Salve a prova

### Para Fazer uma Prova:
1. Acesse `/provas` e escolha uma prova
2. Clique em "Fazer Prova"
3. Insira seu nome
4. Responda as questões dentro do tempo
5. Finalize para ver o resultado

### Para Ver Estatísticas:
1. Acesse `/dashboard`
2. Visualize gráficos e métricas
3. Analise performance por prova
4. Acompanhe tentativas recentes

## 🔧 Configurações Avançadas

### Personalizar Tempo Limite:
- Modifique o campo `duration` no modelo `Exam`
- Tempo é armazenado em minutos

### Adicionar Mais Opções por Questão:
- Modifique o schema Prisma em `prisma/schema.prisma`
- Atualize interfaces TypeScript em `types/index.ts`
- Ajuste componentes de formulário

### Personalizar Gráficos:
- Modifique `components/Charts.tsx`
- Configure cores e tipos de gráfico
- Adicione novos gráficos conforme necessário

## 📊 Recursos de Análise

- **Métricas em tempo real**
- **Gráficos interativos com Chart.js**
- **Exportação de dados via API**
- **Histórico completo de tentativas**
- **Rankings e comparações**

## 🛡️ Validações Implementadas

- Verificação de campos obrigatórios
- Validação de tempo limite
- Prevenção de respostas duplicadas
- Sanitização de dados de entrada
- Tratamento de erros de API

## 🎨 Interface do Usuário

- **Design responsivo** para todos os dispositivos
- **Navegação intuitiva** com indicadores visuais
- **Feedback visual** para ações do usuário
- **Loading states** e tratamento de erros
- **Acessibilidade** com boas práticas

## 📈 Performance

- **Build otimizado** com Next.js
- **Imagens otimizadas** automaticamente
- **Code splitting** automático
- **Caching** inteligente
- **Bundle size** otimizado

---

## 🤝 Contribuição

Este é um projeto educacional. Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novas funcionalidades
- Otimizar performance

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**