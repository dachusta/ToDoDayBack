import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, FirebaseService],
})
export class TasksModule {}
