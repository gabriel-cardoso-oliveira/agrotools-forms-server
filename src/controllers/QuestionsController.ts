import { Request, Response } from 'express';
import knex from './../database/connection';

class QuestionsController {
  async store(request: Request, response: Response) {
    const {
      description,
      quiz_id,
    } = request.body;

    const data = {
      description,
      quiz_id,
    }

    const question = await knex('questions').insert(data);

    return response.json({
      id: question[0],
      ...data
    });
  }

  async update(request: Request, response: Response) {
    const {
      questionId,
      description,
      quiz_id,
    } = request.body;

    const data = {
      description,
      quiz_id,
    }

    const question = await knex('questions')
      .where('id', questionId)
      .update(data);

    return response.json({
      id: question,
      ...data
    });
  }

  async index(request: Request, response: Response) {
    const questions = await knex('questions').select('*');

    return response.json(questions);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const question = await knex('questions').where('id', id).first();

    if (!question) {
      return response.status(400).json({ message: 'Question not fauld.' });
    }

    return response.json(question);
  }
}

export default QuestionsController;
