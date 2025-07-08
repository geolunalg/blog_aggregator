import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <username>`);
    };

    const user = args[0];
    setUser(user);
    console.log(`the user has been set: ${user}`);
}