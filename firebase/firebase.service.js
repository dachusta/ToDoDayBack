"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let FirebaseService = class FirebaseService {
    async read(userId, path) {
        try {
            const dataSnapshot = await admin
                .database()
                .ref(`${userId}/${path}`)
                .get();
            if (dataSnapshot.exists()) {
                const data = dataSnapshot.val();
                console.log(data);
                return data;
            }
            else {
                console.log('No data available');
                return [];
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async write(userId, path, data) {
        return await admin.database().ref(`${userId}/${path}`).set(data);
    }
    async getUsers() {
        try {
            const dataSnapshot = await admin.database().ref('users').get();
            if (dataSnapshot.exists()) {
                const data = dataSnapshot.val();
                console.log(data);
                return data;
            }
            else {
                console.log('No data available');
                return [];
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async setUser(userId) {
        let users = [];
        try {
            const dataSnapshot = await admin.database().ref('users').get();
            if (dataSnapshot.exists()) {
                const data = dataSnapshot.val();
                console.log(data);
                users = data;
            }
            else {
                console.log('No data available');
                users = [];
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
        if (!users.includes(userId)) {
            users.push(userId);
            return await admin.database().ref('users').set(users);
        }
        else {
            return 'Already exists';
        }
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)()
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map