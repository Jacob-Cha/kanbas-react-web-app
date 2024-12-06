// src/Kanbas/Courses/Quizzes/QuizList.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";  // Make sure to import useSelector
import * as client from "./client";
import { FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";

interface Quiz {
  _id?: string;
  courseId: string;
  title: string;
  description?: string;
  published: boolean;
  points: number;
  dueDate?: Date;
  availableFrom?: Date;
  availableUntil?: Date;
  questions: any[];
}

interface QuizListProps {
  currentCourse: any;
}

const QuizList = ({ currentCourse }: QuizListProps) => {
  const { cid } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      if (cid) {
        const fetchedQuizzes = await client.findQuizzesForCourse(cid);
        setQuizzes(fetchedQuizzes);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleAddQuiz = async () => {
    try {
      if (cid) {
        const newQuiz = {
          title: "New Quiz",
          description: "New Quiz Description",
          published: false,
          courseId: cid,
          points: 0,
          questions: []
        };
        const created = await client.createQuiz(cid, newQuiz);
        setQuizzes([...quizzes, created]);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await client.deleteQuiz(quizId);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    if (!quiz.availableFrom || !quiz.availableUntil) return "Not Available";
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);
    
    if (now < availableFrom) {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    } else if (now > availableUntil) {
      return "Closed";
    }
    return "Available";
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="p-4">
      {currentUser?.role === "FACULTY" && (
        <button
          className="btn btn-danger float-end"
          onClick={handleAddQuiz}
        >
          + Quiz
        </button>
      )}
      
      <h2>Quizzes</h2>
      
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul className="list-group mt-4">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {currentUser?.role === "FACULTY" ? (
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}>
                      <h4>{quiz.title}</h4>
                    </Link>
                  ) : (
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`}>
                      <h4>{quiz.title}</h4>
                    </Link>
                  )}
                  <div className="text-muted">
                    <div>Status: {getAvailabilityStatus(quiz)}</div>
                    <div>Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'No due date'}</div>
                    <div>Points: {quiz.points}</div>
                    <div>Questions: {quiz.questions?.length || 0}</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  {quiz.published ? (
                    <FaCheckCircle className="text-success me-2" />
                  ) : (
                    <FaBan className="text-danger me-2" />
                  )}
                  
                  {currentUser?.role === "FACULTY" && (
                    <div className="dropdown">
                      <button className="btn btn-light" data-bs-toggle="dropdown">
                        <FaEllipsisV />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link 
                            className="dropdown-item"
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => quiz._id && handleDeleteQuiz(quiz._id)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;