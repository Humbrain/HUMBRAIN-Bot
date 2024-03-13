import { Command } from "./command";
import { Emmit } from './admin/Emmit';
import {Warn} from "./moderation/Warn";
import {Sanctions} from "./moderation/Sanction";
import {Mute} from "./moderation/Mute";
import {UnMute} from "./moderation/UnMute";

export const Commands: Command[] = [Emmit, Warn, Sanctions, Mute, UnMute];