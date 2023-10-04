import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { BotService } from '../bot/bot.service';

const intervals = {};

@Injectable()
export class DaysService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly botService: BotService,
  ) {}

  async getList(userId) {
    return await this.firebaseService.read(userId, 'days');
  }

  async setList(userId, days) {
    await this.firebaseService.write(userId, 'days', days);

    this.scheduler(userId);
    // return days;
    // res.status(HttpStatus.CREATED).send();
  }

  async setTaskTime(userId, dayId, taskUniqId, time) {
    let days = null;

    try {
      // 1. GET DAYS
      days = await this.firebaseService.read(userId, 'days');
      if (!days.length) return;

      // 2. SET TIME TO TASK
      days.forEach((day) => {
        if (day._id === dayId) {
          day.tasks.forEach((task) => {
            if (task._uniqId === taskUniqId) {
              task.time = time;
            }
          });
        }
      });

      // 3. SET DAYS
      await this.firebaseService.write(userId, 'days', days);

      this.scheduler(userId);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async setTaskDone(userId, dayId, taskUniqId, checked) {
    let days = null;

    try {
      // 1. GET DAYS
      days = await this.firebaseService.read(userId, 'days');
      if (!days.length) return;

      // 2. SET CHECKED TO TASK
      days.forEach((day) => {
        if (day._id === dayId) {
          day.tasks.forEach((task) => {
            if (task._uniqId === taskUniqId) {
              task.checked = checked;
            }
          });
        }
      });

      // 3. SET DAYS
      this.firebaseService.write(userId, 'days', days);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async scheduler(userId) {
    let lastMovedDate = null;
    const days = await this.firebaseService.read(userId, 'days');
    const today = days[0];

    clearInterval(intervals[userId]);

    intervals[userId] = setInterval(() => {
      const currentDate = new Date().getDate();
      const currentHours = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      // Уведомление о запланированной задаче
      if (today?.tasks?.length) {
        for (const task of today.tasks) {
          if (
            currentHours === getHours(task.time) &&
            currentMinutes === getMinutes(task.time)
          ) {
            // bot.sendMessage(chatId, task.value);
            this.botService.sendMessage(task.value); // сделать проверку что сообщение уже было отправлено
          }
        }
      }

      // Перенос прошедшего дня в конец
      if (
        days.length > 1 &&
        currentDate !== lastMovedDate &&
        currentHours === 23 &&
        currentMinutes === 59
      ) {
        lastMovedDate = currentDate;

        const pastDay = days.shift();
        days.push(pastDay);

        this.firebaseService.write(userId, 'days', days);
      }
    }, 10000); // 59999

    function getHours(time) {
      if (!time) return null;
      return parseInt(time.split(':')[0]);
    }
    function getMinutes(time) {
      if (!time) return null;
      return parseInt(time.split(':')[1]);
    }
  }
}
