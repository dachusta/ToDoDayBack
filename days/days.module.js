"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysModule = void 0;
const common_1 = require("@nestjs/common");
const days_service_1 = require("./days.service");
const days_controller_1 = require("./days.controller");
const bot_service_1 = require("../bot/bot.service");
const firebase_service_1 = require("../firebase/firebase.service");
let DaysModule = class DaysModule {
};
exports.DaysModule = DaysModule;
exports.DaysModule = DaysModule = __decorate([
    (0, common_1.Module)({
        controllers: [days_controller_1.DaysController],
        providers: [days_service_1.DaysService, firebase_service_1.FirebaseService, bot_service_1.BotService],
    })
], DaysModule);
//# sourceMappingURL=days.module.js.map