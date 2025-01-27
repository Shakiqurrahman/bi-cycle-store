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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// pre-save hook to hash the password before saving
userModel.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password') || this.isNew) {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                this.password = yield bcrypt_1.default.hash(this.password, salt);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                next(error);
            }
        }
        next();
    });
});
// method to compare the password
userModel.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return yield bcrypt_1.default.compare(password, user.password);
    });
};
exports.User = (0, mongoose_1.model)('User', userModel);
