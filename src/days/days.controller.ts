import { Controller, Get, Post } from '@nestjs/common';
import { DaysService } from './days.service';

const chatId = '';

let intervalId = null;

let days = [];
let today = null;
let modifyDate = null;

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Get('getList')
  getList() {
    return days;
  }

  @Post('setList')
  setList(req, res) {
    res.json({
      success: true,
    });
    clearInterval(intervalId);

    days = req.body;
    today = days[0];

    intervalId = setInterval(() => {
      const currentDate = new Date().getDate();
      const currentHours = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      for (const task of today.tasks) {
        if (
          currentHours === getHours(task.time) &&
          currentMinutes === getMinutes(task.time)
        ) {
          if (chatId) {
            // bot.sendMessage(chatId, task.value);
          }
        }
      }

      if (
        currentDate !== modifyDate &&
        currentHours === 23 &&
        currentMinutes === 59
      ) {
        modifyDate = currentDate;

        const pastDay = days.shift();
        days.push(pastDay);

        today = days[0];
      }
    }, 59999);

    function getHours(time) {
      if (!time) return null;
      return parseInt(time.split(':')[0]);
    }
    function getMinutes(time) {
      if (!time) return null;
      return parseInt(time.split(':')[1]);
    }
  }

  @Post('setTimeTask')
  setTimeTask() {
    return 'setTimeTask';
  }
  // days/setTimeTask (dayID, taskId) - устанавливать время только в режиме просмотра (в режиме редактора элемент readonly/disabled)
  @Post('setDoneTask')
  setDoneTask() {
    return 'setDoneTask';
  }
  // days/setDoneTask (dayID, taskId) - устанавливать в выполнено только в режиме просмотра
}
