import CustomClient from "../utils/CustomClient";
import * as fs from "node:fs";
import Loggers from "../utils/Loggers";

const handlerContextMenu = async (client: CustomClient) => {
    const contextMenuFiles = fs.readdirSync('./src/04-contextMenu').filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    const contextMenuLoad = []
    for (const file of contextMenuFiles) {
        try {
            const contextMenu = (await import(`../04-contextMenu/${file}`)).default;
            client.contextMenu.set(contextMenu.data.name, contextMenu);
            contextMenuLoad.push({name: contextMenu.data.name, status: '🟩'})
        } catch (error) {
            contextMenuLoad.push({name: file, status: '🟥'})
        }
    }
    Loggers.table('Context Menu', contextMenuLoad, ['name', 'status'])
}

export default handlerContextMenu