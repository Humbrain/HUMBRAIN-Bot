import * as colors from 'colors';
import * as console from "console";
export default class Loggers {
    static prefix = '[HUMBOT]';
    static log(message: any): void {
        console.log(colors.grey(this.prefix + " [LOGS] " + message));
    }

    static info(message: any): void {
        console.info(colors.blue(this.prefix + " [INFO] " +message));
    }


    static sucess(message: any): void {
        console.info(colors.green(this.prefix + " [SUCCESS] " +message));
    }

    static error(message: any): void {
        console.error(colors.red(this.prefix + " [ERROR] " +message));
    }

    static warn(message: any): void {
        console.warn(colors.yellow(this.prefix + " [WARN] " +message));
    }

    static debug(message: any): void {
        console.log(colors.magenta(this.prefix + " [DEBUG] : \n"));
        console.debug(message);
    }
}