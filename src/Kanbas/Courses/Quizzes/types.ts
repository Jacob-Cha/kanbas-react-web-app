// src/Kanbas/Quizzes/types.ts
export interface QuizQuestion {
    _id?: string;
    title: string;
    type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
    points: number;
    question: string;
    choices?: string[];
    correctAnswer: string;
    possibleAnswers?: string[];
  }
  
  export interface QuizAttempt {
    userId: string;
    score: number;
    answers: {
      questionId: string;
      answer: string;
      correct: boolean;
    }[];
    startTime: Date;
    endTime: Date;
  }
  
  export interface Quiz {
    _id?: string;
    courseId: string;
    title: string;
    description?: string;
    published: boolean;
    quizType: 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
    points: number;
    assignmentGroup: 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    maxAttempts: number;
    showCorrectAnswers: boolean;
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: Date;
    availableFrom?: Date;
    availableUntil?: Date;
    questions: QuizQuestion[];
    attempts: QuizAttempt[];
  }