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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysController = void 0;
const common_1 = require("@nestjs/common");
const days_service_1 = require("./days.service");
let DaysController = class DaysController {
    constructor(daysService) {
        this.daysService = daysService;
    }
    async getList(req) {
        return this.daysService.getList(req.query.userId);
    }
    setList(req, days) {
        return this.daysService.setList(req.query.userId, days);
    }
    async setTaskTime(req, { dayId, taskUniqId, time }) {
        return this.daysService.setTaskTime(req.query.userId, dayId, taskUniqId, time);
    }
    async setTaskDone(req, { dayId, taskUniqId, checked }) {
        return this.daysService.setTaskDone(req.query.userId, dayId, taskUniqId, checked);
    }
};
exports.DaysController = DaysController;
__decorate([
    (0, common_1.Get)('getList'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "getList", null);
__decorate([
    (0, common_1.Post)('setList'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "setList", null);
__decorate([
    (0, common_1.Post)('setTaskTime'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "setTaskTime", null);
__decorate([
    (0, common_1.Post)('setTaskDone'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "setTaskDone", null);
exports.DaysController = DaysController = __decorate([
    (0, common_1.Controller)('days'),
    __metadata("design:paramtypes", [days_service_1.DaysService])
], DaysController);
//# sourceMappingURL=days.controller.js.map