import {Command} from "./command";
import {Emmit} from './admin/Emmit';
import {Warn} from "./moderation/Warn";
import {Sanctions} from "./moderation/Sanction";
import {Mute} from "./moderation/Mute";
import {UnMute} from "./moderation/UnMute";
import {Clear} from "./moderation/Clear";
import {Ban} from "./moderation/Ban";
import {UnBan} from "./moderation/UnBan";
import {Level} from "./user/Level";
import {Rank} from "./user/Rank";
import {Settings} from "./admin/settings";
import {Voice} from "./user/Voice";
import {Mp} from "./user/Mp";
import {Lol} from "./user/Lol";

export const Commands: Command[] = [Emmit, Warn, Sanctions, Mute, UnMute, Clear, Ban, UnBan, Level, Rank, Settings, Voice, Mp, Lol];