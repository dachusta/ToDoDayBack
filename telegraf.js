const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const token = '5898941434:AAH9YwrSrbadYPMcm6JVdSECV_v3lVOBL8I'
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
