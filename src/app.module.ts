import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaysModule } from './days/days.module';
import { TasksModule } from './tasks/tasks.module';
import { FirebaseService } from './firebase/firebase.service';
import { BotService } from './bot/bot.service';

@Module({
  imports: [
    DaysModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService, BotService],
})
export class AppModule {}
