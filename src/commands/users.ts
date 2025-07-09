import { setUser, readConfig } from "src/config";
import { createUser, getUserByName, getAllUsers } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0];
    const existingUser = await getUserByName(userName);
    if (!existingUser) {
        throw new Error(`User ${userName} not found`);
    }

    setUser(existingUser.name);
    console.log("User switched successfully!");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length != 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0];
    const user = await createUser(userName);
    if (!user) {
        throw new Error(`User ${userName} not found`);
    }

    setUser(user.name);
    console.log("User created successfully!");

}

export async function handlerListUsers(cmdName: string, ...args: string[]) {
    if (args.length != 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    const currUser = readConfig().currentUserName;
    const users = await getAllUsers();
    if (!users) {
        throw new Error(`No users found`);
    }

    for (const user of users) {
        console.log(`* ${user.name}${user.name === currUser ? " (current)" : ""}`);
    }
}