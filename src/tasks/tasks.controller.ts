import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as admin from 'firebase-admin';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getList')
  async getList(@Req() req) {
    // ========================
    // const dataSnapshot = await admin.database().ref(`${req.query.userId}/tasks`).get();
    // const tasks = dataSnapshot.val()
    // ========================
    console.log(req.query.userId);

    try {
      const dbRef = admin.database().ref();
      const snapshot = await dbRef.child(`${req.query.userId}/tasks`).get();

      if (snapshot.exists()) {
        const tasks = snapshot.val();

        console.log(tasks);
        return tasks;
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
  setList(@Body() tasks, @Req() req, @Res() res) {
    admin.database().ref(`${req.query.userId}/tasks`).set(tasks);
    console.log(tasks);
    // res.status(HttpStatus.CREATED).send();
    return tasks;
  }
}
