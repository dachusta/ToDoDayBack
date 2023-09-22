import { Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

let tasks = [];

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getList')
  getList(req, res) {
    res.json({
      success: true,
      data: tasks,
    });
  }

  @Post('setList')
  setList(req, res) {
    res.json({
      success: true,
    });

    tasks = req.body;
  }
}
