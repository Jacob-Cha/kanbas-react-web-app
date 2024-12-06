// server/Kanbas/Quizzes/routes.js
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const createQuiz = async (req, res) => {
    const quiz = await dao.createQuiz({ ...req.body, courseId: req.params.courseId });
    res.json(quiz);
  };

  const findQuizzesForCourse = async (req, res) => {
    const quizzes = await dao.findQuizzesForCourse(req.params.courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const status = await dao.updateQuiz(req.params.quizId, req.body);
    res.json(status);
  };

  const deleteQuiz = async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.json(status);
  };

  const addQuestion = async (req, res) => {
    const status = await dao.addQuestionToQuiz(req.params.quizId, req.body);
    res.json(status);
  };

  const updateQuestion = async (req, res) => {
    const status = await dao.updateQuestion(
      req.params.quizId,
      req.params.questionId,
      req.body
    );
    res.json(status);
  };

  const deleteQuestion = async (req, res) => {
    const status = await dao.deleteQuestion(req.params.quizId, req.params.questionId);
    res.json(status);
  };

  const recordAttempt = async (req, res) => {
    const status = await dao.recordAttempt(req.params.quizId, req.body);
    res.json(status);
  };

  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/questions", addQuestion);
  app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
  app.post("/api/quizzes/:quizId/attempts", recordAttempt);
}