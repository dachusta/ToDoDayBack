import { ConfigService } from '@nestjs/config';
export declare class BotService {
    private configService;
    chatIds: any[];
    bot: any;
    constructor(configService: ConfigService);
    sendMessage(text: any): void;
}
