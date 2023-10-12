"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const TelegramBot = require("node-telegram-bot-api");
let BotService = class BotService {
    constructor(configService) {
        this.configService = configService;
        this.chatIds = [];
        this.bot = null;
        const token = configService.get('TELEGRAM_TOKEN');
        if (!token)
            return;
        this.bot = new TelegramBot(token, {
            polling: true,
        });
        this.bot.on('text', async (msg) => {
            if (!this.chatIds.includes(msg.chat.id)) {
                this.chatIds.push(msg.chat.id);
            }
        });
    }
    sendMessage(text) {
        if (this.chatIds.length) {
            for (const chatId of this.chatIds) {
                this.bot.sendMessage(chatId, text);
            }
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BotService);
//# sourceMappingURL=bot.service.js.map