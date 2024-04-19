import CustomClient from "../utils/CustomClient";
import * as fs from "node:fs";
import Loggers from "../utils/Loggers";


const handlerModals = async (client: CustomClient) => {
    const modal = fs.readdirSync('./src/03-modals').filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    const modalLoaded = [];
    for (const file of modal) {
        try {
            const {default: modal} = await import(`../03-modals/${file}`);
            client.modals.set(modal.data.build().data.custom_id, modal);
            modalLoaded.push({name: modal.data.build().data.custom_id, status: '🟩'});
        } catch (error) {
            modalLoaded.push({name: file, status: '🟥'});
        }
    }
    Loggers.table('Modals', modalLoaded, ['name', 'status']);
}

export default handlerModals