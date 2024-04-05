import CustomClient from "../utils/CustomClient";
import {modals} from "../03-modals";
import Loggers from "../utils/Loggers";

const handlerModals = (client: CustomClient) => {
    for (const command of modals) {
        client.modals.set(command.data.build().data.custom_id, command);
    }
}

export default handlerModals