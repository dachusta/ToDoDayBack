import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaysModule } from './days/days.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DaysModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
