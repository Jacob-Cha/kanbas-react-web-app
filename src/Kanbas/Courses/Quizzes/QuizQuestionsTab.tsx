// src/Kanbas/Courses/Quizzes/QuizQuestionsTab.tsx
import React from "react";
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

interface QuizQuestionsTabProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

const QuizQuestionsTab = ({ questions, onQuestionsChange }: QuizQuestionsTabProps) => {
  const addQuestion = () => {
    const newQuestion: Question = {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: ["", ""],
      correctAnswer: ""
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updatedQuestions = questions.map((q, i) => 
      i === index ? { ...q, ...updates } : q
    );
    onQuestionsChange(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    onQuestionsChange(questions.filter((_, i) => i !== index));
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= questions.length) return;
    const updatedQuestions = [...questions];
    const [removed] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, removed);
    onQuestionsChange(updatedQuestions);
  };

  const addChoice = (questionIndex: number) => {
    const question = questions[questionIndex];
    if (!question.choices) question.choices = [];
    updateQuestion(questionIndex, {
      choices: [...question.choices, ""]
    });
  };

  const updateChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    const question = questions[questionIndex];
    const newChoices = [...(question.choices || [])];
    newChoices[choiceIndex] = value;
    updateQuestion(questionIndex, { choices: newChoices });
  };

  const removeChoice = (questionIndex: number, choiceIndex: number) => {
    const question = questions[questionIndex];
    const newChoices = question.choices?.filter((_, i) => i !== choiceIndex);
    updateQuestion(questionIndex, { choices: newChoices });
  };

  return (
    <div>
      {questions.map((question, index) => (
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
                disabled={index === questions.length - 1}
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
                      onClick={() => removeChoice(index, choiceIndex)}
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
  );
};

export default QuizQuestionsTab;