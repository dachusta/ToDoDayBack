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

  @Post('setTaskTime')
  async setTaskTime(@Req() req, @Body() { dayId, taskUniqId, time }) {
    return this.daysService.setTaskTime(
      req.query.userId,
      dayId,
      taskUniqId,
      time,
    );
  }

  @Post('setTaskDone')
  async setTaskDone(@Req() req, @Body() { dayId, taskUniqId, checked }) {
    return this.daysService.setTaskDone(
      req.query.userId,
      dayId,
      taskUniqId,
      checked,
    );
  }
}
