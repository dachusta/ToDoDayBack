import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { BotService } from '../bot/bot.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [DaysController],
  providers: [DaysService, FirebaseService, BotService],
})
export class DaysModule {}
