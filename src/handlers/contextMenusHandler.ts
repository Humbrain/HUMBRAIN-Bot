import CustomClient from "../utils/CustomClient";
import {contextMenus} from "../04-contextMenu";

const handlerContextMenu = (client: CustomClient) => {
    for (const command of contextMenus) {
        client.contextMenu.set(command.data.name, command);
    }
}

export default handlerContextMenu