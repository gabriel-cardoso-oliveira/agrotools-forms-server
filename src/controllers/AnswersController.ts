import { Request, Response } from 'express';
import knex from './../database/connection';

class AnswersController {
  async store(request: Request, response: Response) {
    const {
      answer,
      user,
      date,
    } = request.body;

    const data = {
      answer,
      user,
      date,
    }

    const answerTmp = await knex('answers').insert(data);

    return response.json({
      id: answerTmp[0],
      ...data
    });
  }

  async update(request: Request, response: Response) {
    const {
      answerId,
      answer,
      user,
      date,
    } = request.body;

    const data = {
      answer,
      user,
      date,
    }

    const answerTmp = await knex('answers')
      .where('id', answerId)
      .update(data);

    return response.json({
      id: answerTmp,
      ...data
    });
  }

  async index(request: Request, response: Response) {
    const answers = await knex('answers').select('*');

    return response.json(answers);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const answer = await knex('answers').where('id', id).first();

    if (!answer) {
      return response.status(400).json({ message: 'Answer not fauld.' });
    }

    return response.json(answer);
  }
}

export default AnswersController;
