import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getTets')
  getTets(): any {
    console.log('getTets');

    const dbRef = admin.database().ref();
    dbRef
      .child('test')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return 'getTets';
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  @Post('setTest')
  async setTest(@Body() a) {
    // const db = admin.database();
    await admin.database().ref('test').set(a);

    console.log(a);
    return a;
  }
}
