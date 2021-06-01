"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const QuizzesController_1 = __importDefault(require("./controllers/QuizzesController"));
const QuestionsController_1 = __importDefault(require("./controllers/QuestionsController"));
const AnswersController_1 = __importDefault(require("./controllers/AnswersController"));
const routes = express_1.default.Router();
const quizzesController = new QuizzesController_1.default();
const questionsController = new QuestionsController_1.default();
const answersController = new AnswersController_1.default();
routes.get('/quizzes', quizzesController.index);
routes.get('/quizzes/:id', quizzesController.show);
routes.post('/quizzes', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        title: celebrate_1.Joi.string().required(),
        user: celebrate_1.Joi.string().required(),
        date: celebrate_1.Joi.string().required(),
    })
}), quizzesController.store);
routes.put('/quizzes', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        quizId: celebrate_1.Joi.number().required(),
        title: celebrate_1.Joi.string().required(),
        user: celebrate_1.Joi.string().required(),
        date: celebrate_1.Joi.string().required(),
    })
}), quizzesController.update);
routes.get('/questions', questionsController.index);
routes.get('/questions/:id', questionsController.show);
routes.post('/questions', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        description: celebrate_1.Joi.string().required(),
        quiz_id: celebrate_1.Joi.number().required(),
    })
}), questionsController.store);
routes.put('/questions', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        questionId: celebrate_1.Joi.number().required(),
        description: celebrate_1.Joi.string().required(),
        quiz_id: celebrate_1.Joi.number().required(),
    })
}), questionsController.update);
routes.get('/answers', answersController.index);
routes.get('/answers/:id', answersController.show);
routes.post('/answers', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        answer: celebrate_1.Joi.string().required(),
        user: celebrate_1.Joi.string().required(),
        date: celebrate_1.Joi.date().required(),
    })
}), answersController.store);
routes.put('/answers', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        answerId: celebrate_1.Joi.number().required(),
        answer: celebrate_1.Joi.string().required(),
        user: celebrate_1.Joi.string().required(),
        date: celebrate_1.Joi.date().required(),
    })
}), answersController.update);
exports.default = routes;
