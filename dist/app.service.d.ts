import { Client } from "discord.js";
import { ContextOf } from "necord";
export declare class AppService {
    private readonly client;
    private readonly logger;
    constructor(client: Client);
    onReady([client]: ContextOf<'ready'>): void;
    onWarn([message]: ContextOf<'warn'>): void;
}
