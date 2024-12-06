// src/Kanbas/Courses/Quizzes/QuizTaker.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useSelector } from "react-redux";

const QuizTaker = ({ currentCourse }: { currentCourse: any }) => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [needsAccessCode, setNeedsAccessCode] = useState(false);
  const [attemptStarted, setAttemptStarted] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        const fetchedQuiz = await client.findQuizById(quizId);
        setQuiz(fetchedQuiz);
        if (fetchedQuiz.accessCode) {
          setNeedsAccessCode(true);
        }
        // Set initial time if quiz has a time limit
        if (fetchedQuiz.timeLimit) {
          setTimeRemaining(fetchedQuiz.timeLimit * 60);
        }
        
        // Fetch previous attempts
        const attempts = await client.findAttemptsByUser(quizId, currentUser._id);
        setPreviousAttempts(attempts);
      }
    };
    fetchQuiz();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizId]);

  useEffect(() => {
    if (attemptStarted && timeRemaining !== null) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [attemptStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const verifyAccessCode = () => {
    if (quiz.accessCode === accessCode) {
      setNeedsAccessCode(false);
      setAttemptStarted(true);
    } else {
      alert("Incorrect access code");
    }
  };

  const startAttempt = async () => {
    if (quiz.webcamRequired) {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        alert("Webcam access is required for this quiz");
        return;
      }
    }
    setAttemptStarted(true);
  };

  const canStartNewAttempt = () => {
    if (!quiz.multipleAttempts) return previousAttempts.length === 0;
    return previousAttempts.length < (quiz.maxAttempts || 1);
  };

  const handleSubmit = async () => {
    const attempt = {
      userId: currentUser._id,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
        correct: quiz.questions.find((q: any) => q._id === questionId)?.correctAnswer === answer
      })),
      startTime: new Date(Date.now() - ((quiz.timeLimit * 60) - (timeRemaining || 0)) * 1000),
      endTime: new Date()
    };

    try {
      await client.recordAttempt(quizId!, attempt);
      navigate(`/Kanbas/Courses/${currentCourse._id}/Quizzes`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;
  
  if (!canStartNewAttempt()) {
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <div className="alert alert-warning">
          You have reached the maximum number of attempts for this quiz.
        </div>
        <div className="mt-4">
          <h3>Previous Attempts</h3>
          {previousAttempts.map((attempt, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <h5>Attempt {index + 1}</h5>
                <p>Score: {attempt.score}</p>
                <p>Date: {new Date(attempt.endTime).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (needsAccessCode) {
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <div className="mb-3">
          <label className="form-label">Enter Access Code</label>
          <input
            type="text"
            className="form-control"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={verifyAccessCode}>
          Begin Quiz
        </button>
      </div>
    );
  }

  if (!attemptStarted) {
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <p className="text-muted">{quiz.description}</p>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Quiz Information</h5>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
            <p><strong>Attempts Allowed:</strong> {quiz.multipleAttempts ? quiz.maxAttempts : 1}</p>
            <p><strong>Questions:</strong> {quiz.questions?.length}</p>
            {quiz.webcamRequired && (
              <p className="text-danger">This quiz requires webcam access</p>
            )}
          </div>
        </div>
        <button className="btn btn-primary" onClick={startAttempt}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {timeRemaining !== null && (
        <div className="alert alert-info">
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      )}

      {quiz.oneQuestionAtATime ? (
        <div>
          <h4>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h4>
          <div className="card">
            <div className="card-body">
              <h5>{quiz.questions[currentQuestionIndex].question}</h5>
              {/* Question rendering logic */}
            </div>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-secondary me-2"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (currentQuestionIndex === quiz.questions.length - 1) {
                  handleSubmit();
                } else {
                  setCurrentQuestionIndex(prev => prev + 1);
                }
              }}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Original all-questions view */}
        </div>
      )}
    </div>
  );
};

export default QuizTaker;