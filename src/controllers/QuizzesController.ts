import { Request, Response } from 'express';
import knex from './../database/connection';

class QuizzesController {
  async store(request: Request, response: Response) {
    const {
      title,
      user,
      date,
    } = request.body;

    const data = {
      title,
      user,
      date,
    }

    const quiz = await knex('quizzes').insert(data);

    return response.json({
      id: quiz[0],
      ...data
    });
  }

  async update(request: Request, response: Response) {
    const {
      quizId,
      title,
      user,
      date,
    } = request.body;

    const data = {
      title,
      user,
      date,
    }

    const quiz = await knex('quizzes')
      .where('id', quizId)
      .update(data);

    return response.json({
      id: quiz,
      ...data
    });
  }

  async index(request: Request, response: Response) {
    const quizzes = await knex('quizzes').select('*');

    return response.json(quizzes);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const quiz = await knex('quizzes').where('id', id).first();

    if (!quiz) {
      return response.status(400).json({ message: 'Quiz not fauld.' });
    }

    const questionsTmp = await knex('questions').select('*');

    const questions = questionsTmp
      .filter(question => question.quiz_id == id)
      .map(question => {
        return {
          id: question.id,
          description: question.description,
        };
      });

    return response.json({
      ...quiz,
      questions,
    });
  }
}

export default QuizzesController;
