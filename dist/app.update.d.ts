import { ContextOf } from 'necord';
import { Client } from 'discord.js';
export declare class AppUpdate {
    private readonly client;
    private readonly logger;
    constructor(client: Client);
    onReady([client]: ContextOf<'ready'>): void;
    onWarn([message]: ContextOf<'warn'>): void;
}
