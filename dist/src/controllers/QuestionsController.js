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
class QuestionsController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, quiz_id, } = request.body;
            const data = {
                description,
                quiz_id,
            };
            const question = yield connection_1.default('questions').insert(data);
            return response.json(Object.assign({ id: question[0] }, data));
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionId, description, quiz_id, } = request.body;
            const data = {
                description,
                quiz_id,
            };
            const question = yield connection_1.default('questions')
                .where('id', questionId)
                .update(data);
            return response.json(Object.assign({ id: question }, data));
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield connection_1.default('questions').select('*');
            return response.json(questions);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const question = yield connection_1.default('questions').where('id', id).first();
            if (!question) {
                return response.status(400).json({ message: 'Question not fauld.' });
            }
            return response.json(question);
        });
    }
}
exports.default = QuestionsController;
