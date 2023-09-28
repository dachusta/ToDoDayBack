import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  // Res,
  // HttpStatus,
  // HttpCode,
} from '@nestjs/common';
import { DaysService } from './days.service';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Get('getList')
  async getList(@Req() req) {
    return this.daysService.getList(req.query.userId);
  }

  @Post('setList')
  setList(@Req() req, @Body() days) {
    return this.daysService.setList(req.query.userId, days);
  }

  @Post('setTimeTask')
  async setTimeTask(@Req() req, @Body() { dayId, taskId, time }) {
    return this.daysService.setTimeTask(req.query.userId, dayId, taskId, time);
  }

  @Post('setDoneTask')
  async setDoneTask(@Req() req, @Body() { dayId, taskId, checked }) {
    return this.daysService.setDoneTask(
      req.query.userId,
      dayId,
      taskId,
      checked,
    );
  }
}
