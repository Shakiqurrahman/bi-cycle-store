"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const routes_1 = require("./routes");
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
exports.app = (0, express_1.default)();
//middlewares
exports.app.use(express_1.default.json({ limit: config_1.MAX_JSON_SIZE }));
exports.app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.get('/', (req, res) => {
    res.send('Hello world!');
});
exports.app.use('/api', routes_1.router);
exports.app.all('*', (req, res, next) => {
    const error = new Error('Resource not found');
    error.name = 'Not Found';
    next(error);
});
// Global Error handler
exports.app.use(ErrorHandler_1.default);
