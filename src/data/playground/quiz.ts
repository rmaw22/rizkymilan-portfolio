export interface QuizQuestion {
  question: string
  options: string[]
  answer: number // index of correct option
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  durationSeconds: number // total timer for the quiz
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    id: 'js-basics',
    title: 'JavaScript Basics',
    description: 'Test your knowledge of core JavaScript concepts.',
    difficulty: 'easy',
    durationSeconds: 60,
    questions: [
      {
        question: 'What does `typeof null` return in JavaScript?',
        options: ['null', 'object', 'undefined', 'string'],
        answer: 1,
        explanation: 'A historical bug in JS — null is typed as "object" since the language\'s first version.',
      },
      {
        question: 'Which method removes the last element of an array?',
        options: ['shift()', 'pop()', 'splice()', 'slice()'],
        answer: 1,
        explanation: '`pop()` removes and returns the last element. `shift()` removes the first.',
      },
      {
        question: 'What is the output of `0.1 + 0.2 === 0.3`?',
        options: ['true', 'false', 'NaN', 'undefined'],
        answer: 1,
        explanation: 'Floating point precision — 0.1 + 0.2 = 0.30000000000000004, not exactly 0.3.',
      },
    ],
  },
]
