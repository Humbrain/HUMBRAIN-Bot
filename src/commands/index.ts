import { Command } from "./command";
import { Emmit } from './Emmit';
import {Warn} from "./moderation/Warn";
import {Sanctions} from "./moderation/Sanction";

export const Commands: Command[] = [Emmit, Warn, Sanctions];