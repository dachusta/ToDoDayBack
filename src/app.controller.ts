import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// ТГ --- отдельный модуль с тг ботом

// const TelegramBot = require('node-telegram-bot-api');

// const token = process.env.TOKEN

// console.log(token);

// const bot = new TelegramBot(token, {
//   polling: true
// });

// let chatId = ''  *

// bot.on('text', async msg => {
//   console.log(msg);
//   chatId = msg.chat.id
// })

// -------------------

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
