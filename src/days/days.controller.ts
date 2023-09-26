import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { DaysService } from './days.service';
import * as admin from 'firebase-admin';

const chatId = '';
const intervals = {};

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Get('getList')
  async getList(@Req() req) {
    console.log(req.query.userId);

    try {
      const dbRef = admin.database().ref();
      const snapshot = await dbRef.child(`${req.query.userId}/days`).get();

      if (snapshot.exists()) {
        const days = snapshot.val();

        console.log(days);
        return days;
      } else {
        console.log('No data available');
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Post('setList')
  setList(@Body() days, @Req() req, @Res() res) {
    console.log(1);
    admin.database().ref(`${req.query.userId}/days`).set(days);

    let lastMovedDate = null;
    let today = days[0];

    clearInterval(intervals[req.query.userId]);

    intervals[req.query.userId] = setInterval(() => {
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

        admin.database().ref(`${req.query.userId}/days`).set(days);
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
    console.log(2);

    return days;
  }

  @Post('setTimeTask')
  async setTimeTask(@Body() { dayId, taskId, time }, @Req() req) {
    let days = null;

    // 1. GET DAYS
    try {
      const dbRef = admin.database().ref();
      const snapshot = await dbRef.child(`${req.query.userId}/days`).get();

      if (snapshot.exists()) {
        days = snapshot.val();

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
        admin.database().ref(`${req.query.userId}/days`).set(days);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    // --------

    return 'setTimeTask';
  }

  @Post('setDoneTask')
  async setDoneTask(@Body() { dayId, taskId, checked }, @Req() req) {
    let days = null;

    // 1. GET DAYS
    try {
      const dbRef = admin.database().ref();
      const snapshot = await dbRef.child(`${req.query.userId}/days`).get();

      if (snapshot.exists()) {
        days = snapshot.val();

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
        admin.database().ref(`${req.query.userId}/days`).set(days);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    // --------
    return 'setDoneTask';
  }
}
