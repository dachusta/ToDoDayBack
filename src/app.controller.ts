import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// const TelegramBot = require('node-telegram-bot-api');

// const token = process.env.TOKEN

// console.log(token);

// const bot = new TelegramBot(token, {
//   polling: true
// });

// let chatId = ''

// bot.on('text', async msg => {
//   console.log(msg);
//   chatId = msg.chat.id
// })

// let intervalId = null

// let days = []
// let today = null
// let modifyDate = null

// let tasks = []

// Добавить кнопку отмены (сохранять промежуточное состояние в локалСторе/индексДБ и отчищать после нажатия сохранить/отменить)
// Изменять цвет такса и приоритет на фронте, после нажатия кнопки сохранить откравлять отфармотированные задачи и дни на бэк (days/setLis и tasks/setList)
//
// выписать все возможные эндпоинты (set, get, ...), которые нужно будет вынести на бэкенд
// Добавить свойство taskId (так как в одном дне может быть несколько тасков с одинаковым task.value) и переписать методы с учетом taskId
// days/setTimeTask (dayID, taskId) - устанавливать время только в режиме просмотра (в режиме редактора элемент readonly/disabled)
// days/setDoneTask (dayID, taskId) - устанавливать в выполнено только в режиме просмотра
// days/getList (getDays)
// days/setList (setDays)
//
// tasks/getList (getTasks)
// tasks/setList (setTasks) - отправлять на бэк, после нажатия кнопки сохранить
//

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('days')
  // getDays('/getDays', function(req, res) {
  //   res.json({
  //     "success" : true,
  //     "data": days
  //   });
  // })

  // app.post('/setDays', async function(req, res) {
  //   res.json({
  //     "success" : true
  //   });
  //   clearInterval(intervalId)

  //   days = req.body
  //   today = days[0]

  //   intervalId = setInterval(() => {
  //     const currentDate = new Date().getDate()
  //     const currentHours = new Date().getHours()
  //     const currentMinutes = new Date().getMinutes()

  //     for (const task of today.tasks) {
  //       if (currentHours === getHours(task.time) && currentMinutes === getMinutes(task.time)) {

  //         if (chatId) {
  //           bot.sendMessage(chatId, task.value);
  //         }
  //       }
  //     }

  //     if (currentDate !== modifyDate && currentHours === 23 && currentMinutes === 59) {
  //       modifyDate = currentDate

  //       const pastDay = days.shift()
  //       days.push(pastDay)

  //       today = days[0]
  //     }
  //   }, 59999);

  //   function getHours(time) {
  //     if (!time) return null
  //     return parseInt(time.split(':')[0])
  //   }
  //   function getMinutes(time) {
  //     if (!time) return null
  //     return parseInt(time.split(':')[1])
  //   }
  // })

  // app.post('/setTasks', async function(req, res) {
  //   res.json({
  //     "success" : true
  //   });

  //   tasks = req.body
  // })

  // app.get('/getTasks', async function(req, res) {
  //   res.json({
  //     "success" : true,
  //     "data": tasks
  //   });
  // })
}
