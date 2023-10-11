import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService {
  // const chatId = '';
  chatIds = []; // chatIds является массивом только для теста
  bot = null;

  constructor(private configService: ConfigService) {
    const token = configService.get<string>('TELEGRAM_TOKEN');

    this.bot = new TelegramBot(token, {
      polling: true,
    });

    this.bot.on('text', async (msg) => {
      // chatId = msg.chat.id;
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
}
