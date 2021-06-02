import { Request, Response } from 'express';
import knex from './../database/connection';

class AnswersController {
  async store(request: Request, response: Response) {
    const {
      answer,
      user,
      date,
      question_id,
    } = request.body;

    const data = {
      answer,
      user,
      date,
      question_id,
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
      question_id,
    } = request.body;

    const data = {
      answer,
      user,
      date,
      question_id,
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

    const quiz = await knex('quizzes').where('id', id).first();

    const answer = await knex('answers').select('*');

    const questionsTmp = await knex('questions').select('*');

    const questions = questionsTmp
      .filter(question => question.quiz_id == id)
      .map(question => {
        const answerTmp = answer
          .filter(ans => ans.question_id == question.id)
          .map(ans => {
            return { description: ans.answer };
          });

        return {
          id: question.id,
          description: question.description,
          answer: answerTmp,
        };
      });

    return response.json({
      ...quiz,
      questions,
    });
  }
}

export default AnswersController;
