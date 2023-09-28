import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class TasksService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getList(userId) {
    return this.firebaseService.read(userId, 'tasks');
  }

  setList(userId, tasks) {
    return this.firebaseService.write(userId, 'tasks', tasks);
  }
}
