// server/Kanbas/Quizzes/dao.js
import model from "./model.js";

export const createQuiz = (quiz) => {
  return model.create(quiz);
};

export const findQuizzesForCourse = (courseId) => {
  return model.find({ courseId });
};

export const findQuizById = (quizId) => {
  return model.findById(quizId);
};

export const updateQuiz = (quizId, quiz) => {
  return model.findByIdAndUpdate(quizId, { $set: quiz }, { new: true });
};

export const deleteQuiz = (quizId) => {
  return model.findByIdAndDelete(quizId);
};

export const addQuestionToQuiz = (quizId, question) => {
  return model.findByIdAndUpdate(
    quizId,
    { $push: { questions: question } },
    { new: true }
  );
};

export const updateQuestion = (quizId, questionId, question) => {
  return model.findOneAndUpdate(
    { _id: quizId, "questions._id": questionId },
    { $set: { "questions.$": question } },
    { new: true }
  );
};

export const deleteQuestion = (quizId, questionId) => {
  return model.findByIdAndUpdate(
    quizId,
    { $pull: { questions: { _id: questionId } } },
    { new: true }
  );
};

export const recordAttempt = (quizId, attempt) => {
  return model.findByIdAndUpdate(
    quizId,
    { $push: { attempts: attempt } },
    { new: true }
  );
};