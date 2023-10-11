import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async read(userId: string, path: string) {
    try {
      const dataSnapshot = await admin
        .database()
        .ref(`${userId}/${path}`)
        .get();

      if (dataSnapshot.exists()) {
        const data = dataSnapshot.val();

        console.log(data);
        return data;
      } else {
        console.log('No data available');
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async write(userId: string, path: string, data) {
    return await admin.database().ref(`${userId}/${path}`).set(data);
  }

  async getUsers() {
    try {
      const dataSnapshot = await admin.database().ref('users').get();

      if (dataSnapshot.exists()) {
        const data = dataSnapshot.val();

        console.log(data);
        return data;
      } else {
        console.log('No data available');
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async setUser(userId: string) {
    let users = [];

    try {
      const dataSnapshot = await admin.database().ref('users').get();

      if (dataSnapshot.exists()) {
        const data = dataSnapshot.val();

        console.log(data);
        users = data;
      } else {
        console.log('No data available');
        users = [];
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

    if (!users.includes(userId)) {
      users.push(userId);
      return await admin.database().ref('users').set(users);
    } else {
      return 'Already exists';
    }
  }

  // async deleteUser(userId: string) {}
}
