export class Env {
    public static isRunStandalone = () => {
        // return window && window.process && window.process.type;
        return true;
    }
}