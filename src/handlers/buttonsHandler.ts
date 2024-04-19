import CustomClient from "../utils/CustomClient";
import * as fs from "node:fs";
import Loggers from "../utils/Loggers";

const handlerButton = async (client: CustomClient) => {
    const buttons = fs.readdirSync('./src/02-buttons').filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    const buttonLoaded = [];
    for (const button of buttons) {
        const Button = (await import (`../02-buttons/${button}`)).default;
        try {
            client.buttons.set(Button.data.data.custom_id, Button);
            buttonLoaded.push({name: Button.data.data.custom_id, loaded: '🟩'});
        } catch (e) {
            buttonLoaded.push({name: button, loaded: '🟥'});
        }
    }

    Loggers.table("Button loaded", buttonLoaded, ['name', 'loaded']);
}

export default handlerButton