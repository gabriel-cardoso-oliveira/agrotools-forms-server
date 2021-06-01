"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./../database/connection"));
class AnswersController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { answer, user, date, question_id, } = request.body;
            const data = {
                answer,
                user,
                date,
                question_id,
            };
            const answerTmp = yield connection_1.default('answers').insert(data);
            return response.json(Object.assign({ id: answerTmp[0] }, data));
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { answerId, answer, user, date, question_id, } = request.body;
            const data = {
                answer,
                user,
                date,
                question_id,
            };
            const answerTmp = yield connection_1.default('answers')
                .where('id', answerId)
                .update(data);
            return response.json(Object.assign({ id: answerTmp }, data));
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = yield connection_1.default('answers').select('*');
            return response.json(answers);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const answer = yield connection_1.default('answers').where('id', id).first();
            if (!answer) {
                return response.status(400).json({ message: 'Answer not fauld.' });
            }
            return response.json(answer);
        });
    }
}
exports.default = AnswersController;
