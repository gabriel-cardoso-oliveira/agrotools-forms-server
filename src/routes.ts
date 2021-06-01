import express from 'express';
import { celebrate, Joi } from 'celebrate';

import QuizzesController from './controllers/QuizzesController';
import QuestionsController from './controllers/QuestionsController';
import AnswersController from './controllers/AnswersController';

const routes = express.Router();

const quizzesController = new QuizzesController();
const questionsController = new QuestionsController();
const answersController = new AnswersController();

routes.get('/quizzes', quizzesController.index);
routes.get('/quizzes/:id', quizzesController.show);
routes.post('/quizzes', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    user: Joi.string().required(),
    date: Joi.string().required(),
  })
}), quizzesController.store);
routes.put('/quizzes', celebrate({
  body: Joi.object().keys({
    quizId: Joi.number().required(),
    title: Joi.string().required(),
    user: Joi.string().required(),
    date: Joi.string().required(),
  })
}), quizzesController.update);

routes.get('/questions', questionsController.index);
routes.get('/questions/:id', questionsController.show);
routes.post('/questions', celebrate({
  body: Joi.object().keys({
    description: Joi.string().required(),
    quiz_id: Joi.number().required(),
  })
}), questionsController.store);
routes.put('/questions', celebrate({
  body: Joi.object().keys({
    questionId: Joi.number().required(),
    description: Joi.string().required(),
    quiz_id: Joi.number().required(),
  })
}), questionsController.update);

routes.get('/answers', answersController.index);
routes.get('/answers/:id', answersController.show);
routes.post('/answers', celebrate({
  body: Joi.object().keys({
    answer: Joi.string().required(),
    user: Joi.string().required(),
    date: Joi.date().required(),
  })
}), answersController.store);
routes.put('/answers', celebrate({
  body: Joi.object().keys({
    answerId: Joi.number().required(),
    answer: Joi.string().required(),
    user: Joi.string().required(),
    date: Joi.date().required(),
  })
}), answersController.update);

export default routes;
