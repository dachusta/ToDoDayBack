import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

const chatId = '';
const intervals = {};
@Injectable()
export class DaysService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getList(userId) {
    return this.firebaseService.read(userId, 'days');
  }

  setList(userId, days) {
    let lastMovedDate = null;
    let today = days[0];

    clearInterval(intervals[userId]);

    intervals[userId] = setInterval(() => {
      const currentDate = new Date().getDate();
      const currentHours = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      // Уведомление о запланированной задаче
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

      // Перенос прошедшего дня в конец
      if (
        currentDate !== lastMovedDate &&
        currentHours === 23 &&
        currentMinutes === 59
      ) {
        lastMovedDate = currentDate;

        const pastDay = days.shift();
        days.push(pastDay);

        today = days[0];

        this.firebaseService.write(userId, 'days', days);
      }
    }, 59999);

    return this.firebaseService.write(userId, 'days', days);

    function getHours(time) {
      if (!time) return null;
      return parseInt(time.split(':')[0]);
    }
    function getMinutes(time) {
      if (!time) return null;
      return parseInt(time.split(':')[1]);
    }

    // return days;
    // res.status(HttpStatus.CREATED).send();
  }

  async setTaskTime(userId, dayId, taskId, time) {
    let days = null;

    try {
      // 1. GET DAYS
      days = this.firebaseService.read(userId, 'days');

      // 2. SET TIME TO TASK
      days.forEach((day) => {
        if (dayId === day._id) {
          day.tasks.forEach((task) => {
            if (task._id === taskId) {
              task.time = time;
            }
          });
        }
      });
      // -------

      // 3. SET DAYS
      this.firebaseService.write(userId, 'days', days);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    // --------

    return 'setTaskTime';
  }

  async setTaskDone(userId, dayId, taskId, checked) {
    let days = null;

    try {
      // 1. GET DAYS
      days = this.firebaseService.read(userId, 'days');

      // 2. SET CHECKED TO TASK
      days.forEach((day) => {
        if (dayId === day._id) {
          day.tasks.forEach((task) => {
            if (task._id === taskId) {
              task.checked = checked;
            }
          });
        }
      });
      // -------

      // 3. SET DAYS
      this.firebaseService.write(userId, 'days', days);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    // --------
    return 'setTaskDone';
  }
}
