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
class QuizzesController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, user, date, } = request.body;
            const data = {
                title,
                user,
                date,
            };
            const quiz = yield connection_1.default('quizzes').insert(data);
            return response.json(Object.assign({ id: quiz[0] }, data));
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quizId, title, user, date, } = request.body;
            const data = {
                title,
                user,
                date,
            };
            const quiz = yield connection_1.default('quizzes')
                .where('id', quizId)
                .update(data);
            return response.json(Object.assign({ id: quiz }, data));
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizzes = yield connection_1.default('quizzes').select('*');
            return response.json(quizzes);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const quiz = yield connection_1.default('quizzes').where('id', id).first();
            if (!quiz) {
                return response.status(400).json({ message: 'Quiz not fauld.' });
            }
            return response.json(quiz);
        });
    }
}
exports.default = QuizzesController;
