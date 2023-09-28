import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getList')
  async getList(@Req() req) {
    return this.tasksService.getList(req.query.userId);
  }

  @Post('setList')
  setList(@Req() req, @Body() tasks) {
    return this.tasksService.setList(req.query.userId, tasks);
  }
}
