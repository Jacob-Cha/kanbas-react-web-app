// src/Kanbas/Courses/Quizzes/QuizEditor.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import { Nav } from "react-bootstrap";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

interface Question {
  _id?: string;
  title: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  points: number;
  question: string;
  choices?: string[];
  correctAnswer: string;
  possibleAnswers?: string[];
}

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  quizType: 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
  points: number;
  assignmentGroup: 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts?: number;
  showCorrectAnswers: boolean;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  published: boolean;
  questions: Question[];
}

const QuizEditor = ({ currentCourse }: { currentCourse: any }) => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: true,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    published: false,
    questions: []
  });

  useEffect(() => {
    const loadQuiz = async () => {
      if (quizId) {
        const loadedQuiz = await client.findQuizById(quizId);
        setQuiz(loadedQuiz);
      }
    };
    loadQuiz();
  }, [quizId]);

  // Questions Management Functions
  const addQuestion = () => {
    const newQuestion: Question = {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: ["", ""],
      correctAnswer: ""
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updatedQuestions = quiz.questions.map((q, i) => 
      i === index ? { ...q, ...updates } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeQuestion = (index: number) => {
    setQuiz({ ...quiz, questions: quiz.questions.filter((_, i) => i !== index) });
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= quiz.questions.length) return;
    const updatedQuestions = [...quiz.questions];
    const [removed] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, removed);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addChoice = (questionIndex: number) => {
    const question = quiz.questions[questionIndex];
    if (!question.choices) question.choices = [];
    const updatedQuestions = quiz.questions.map((q, i) => 
      i === questionIndex ? { ...q, choices: [...(q.choices || []), ""] } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const updateChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === questionIndex && q.choices) {
        const newChoices = [...q.choices];
        newChoices[choiceIndex] = value;
        return { ...q, choices: newChoices };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSave = async (andPublish: boolean = false) => {
    try {
      const updatedQuiz = { ...quiz, published: andPublish };
      if (quizId) {
        await client.updateQuiz(quizId, updatedQuiz);
      } else {
        await client.createQuiz(currentCourse._id, updatedQuiz);
      }
      navigate(`/Kanbas/Courses/${currentCourse._id}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  // Calculate total points whenever questions change
  useEffect(() => {
    const total = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    setQuiz(prev => ({ ...prev, points: total }));
  }, [quiz.questions]);

  return (
    <div className="p-4">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'details' && (
        <div>
          {/* Keep your existing details form here */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>

          {/* ... Rest of your existing details form ... */}
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          {quiz.questions.map((question, index) => (
            <div key={index} className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>Question {index + 1}</div>
                <div>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => moveQuestion(index, index - 1)}
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => moveQuestion(index, index + 1)}
                    disabled={index === quiz.questions.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeQuestion(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Question Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={question.title}
                    onChange={(e) => updateQuestion(index, { title: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Question Type</label>
                  <select
                    className="form-select"
                    value={question.type}
                    onChange={(e) => updateQuestion(index, { 
                      type: e.target.value as Question['type'],
                      choices: e.target.value === 'MULTIPLE_CHOICE' ? ["", ""] : undefined,
                      correctAnswer: ""
                    })}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_BLANK">Fill in the Blank</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    value={question.points}
                    onChange={(e) => updateQuestion(index, { points: Number(e.target.value) })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Question Text</label>
                  <textarea
                    className="form-control"
                    value={question.question}
                    onChange={(e) => updateQuestion(index, { question: e.target.value })}
                  />
                </div>

                {question.type === 'MULTIPLE_CHOICE' && (
                  <div className="mb-3">
                    <label className="form-label">Choices</label>
                    {question.choices?.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={choice}
                          onChange={(e) => updateChoice(index, choiceIndex, e.target.value)}
                        />
                        <div className="input-group-text">
                          <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={question.correctAnswer === choice}
                            onChange={() => updateQuestion(index, { correctAnswer: choice })}
                          />
                        </div>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            const newChoices = question.choices?.filter((_, i) => i !== choiceIndex);
                            updateQuestion(index, { choices: newChoices });
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => addChoice(index)}
                    >
                      Add Choice
                    </button>
                  </div>
                )}

                {question.type === 'TRUE_FALSE' && (
                  <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`tf-${index}`}
                          checked={question.correctAnswer === 'true'}
                          onChange={() => updateQuestion(index, { correctAnswer: 'true' })}
                        />
                        <label className="form-check-label">True</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`tf-${index}`}
                          checked={question.correctAnswer === 'false'}
                          onChange={() => updateQuestion(index, { correctAnswer: 'false' })}
                        />
                        <label className="form-check-label">False</label>
                      </div>
                    </div>
                  </div>
                )}

                {question.type === 'FILL_BLANK' && (
                  <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(index, { correctAnswer: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button className="btn btn-primary" onClick={addQuestion}>
            Add Question
          </button>
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-success me-2" onClick={() => handleSave(true)}>
          Save & Publish
        </button>
        <button className="btn btn-primary me-2" onClick={() => handleSave(false)}>
          Save
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/Kanbas/Courses/${currentCourse._id}/Quizzes`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuizEditor;