# Sistema de Provas Online - Instruções de Desenvolvimento

Este projeto é um sistema completo de provas online desenvolvido com Next.js, TypeScript, Tailwind CSS, Prisma e SQLite.

## Funcionalidades Principais
1. Criação de provas com múltiplas questões
2. Listagem de provas disponíveis 
3. Interface para realizar provas
4. Dashboard com gráficos e estatísticas dos resultados

## Stack Tecnológica
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS para estilização
- Prisma ORM com SQLite
- Chart.js para gráficos
- Lucide React para ícones

## Estrutura do Projeto
- `/app` - Páginas e componentes Next.js
- `/components` - Componentes reutilizáveis
- `/lib` - Utilitários e configurações
- `/prisma` - Schema do banco de dados
- `/types` - Definições de tipos TypeScript

## Modelo de Dados
- **Exam**: Representa uma prova (título, descrição, duração)
- **Question**: Questões da prova (pergunta, opções, resposta correta)
- **ExamAttempt**: Tentativas de realização de prova
- **Answer**: Respostas individuais dos usuários