import CustomClient from "../utils/CustomClient";
import {buttons} from "../02-buttons";
import Loggers from "../utils/Loggers";

const handlerButton = (client: CustomClient) => {
    const button = buttons;
    for (const command of button) {
        client.buttons.set(command.data.data.custom_id, command);
    }
}

export default handlerButton