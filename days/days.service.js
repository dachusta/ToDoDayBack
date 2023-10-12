"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const bot_service_1 = require("../bot/bot.service");
const intervals = {};
let DaysService = class DaysService {
    constructor(firebaseService, botService) {
        this.firebaseService = firebaseService;
        this.botService = botService;
    }
    async getList(userId) {
        return await this.firebaseService.read(userId, 'days');
    }
    async setList(userId, days) {
        await this.firebaseService.write(userId, 'days', days);
        this.scheduler(userId);
    }
    async setTaskTime(userId, dayId, taskUniqId, time) {
        let days = null;
        try {
            days = await this.firebaseService.read(userId, 'days');
            if (!days.length)
                return;
            days.forEach((day) => {
                if (day._id === dayId) {
                    day.tasks.forEach((task) => {
                        if (task._uniqId === taskUniqId) {
                            task.time = time;
                        }
                    });
                }
            });
            await this.firebaseService.write(userId, 'days', days);
            this.scheduler(userId);
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async setTaskDone(userId, dayId, taskUniqId, checked) {
        let days = null;
        try {
            days = await this.firebaseService.read(userId, 'days');
            if (!days.length)
                return;
            days.forEach((day) => {
                if (day._id === dayId) {
                    day.tasks.forEach((task) => {
                        if (task._uniqId === taskUniqId) {
                            task.checked = checked;
                        }
                    });
                }
            });
            this.firebaseService.write(userId, 'days', days);
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async scheduler(userId) {
        let lastMovedDate = null;
        let timeLastMessage = null;
        const days = await this.firebaseService.read(userId, 'days');
        const today = days[0];
        clearInterval(intervals[userId]);
        intervals[userId] = setInterval(() => {
            const currentDate = new Date().getDate();
            const currentHours = new Date().getHours();
            const currentMinutes = new Date().getMinutes();
            if (today?.tasks?.length &&
                !(currentHours === getHours(timeLastMessage) &&
                    currentMinutes === getMinutes(timeLastMessage))) {
                for (const task of today.tasks) {
                    if (currentHours === getHours(task.time) &&
                        currentMinutes === getMinutes(task.time)) {
                        timeLastMessage = task.time;
                        this.botService.sendMessage(task.value);
                    }
                }
            }
            if (days.length > 1 &&
                currentDate !== lastMovedDate &&
                currentHours === 23 &&
                currentMinutes === 59) {
                lastMovedDate = currentDate;
                const pastDay = days.shift();
                pastDay.tasks.forEach((task) => {
                    task.checked = false;
                });
                days.push(pastDay);
                this.firebaseService.write(userId, 'days', days);
            }
        }, 10000);
        function getHours(time) {
            if (!time)
                return null;
            return parseInt(time.split(':')[0]);
        }
        function getMinutes(time) {
            if (!time)
                return null;
            return parseInt(time.split(':')[1]);
        }
    }
    async onApplicationBootstrap() {
        const users = await this.firebaseService.getUsers();
        for (const userId of users) {
            this.scheduler(userId);
        }
    }
};
exports.DaysService = DaysService;
exports.DaysService = DaysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        bot_service_1.BotService])
], DaysService);
//# sourceMappingURL=days.service.js.map