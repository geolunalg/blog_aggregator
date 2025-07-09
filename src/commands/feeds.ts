import { readConfig } from "src/config";
import { createFeed, getAllFeeds } from "src/lib/db/queries/feeds";
import { getUserById, getUserByName } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";



export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length != 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const currUser = readConfig().currentUserName;
    const user = await getUserByName(currUser);
    if (!user) {
        throw new Error(`User ${currUser} not found`);
    }

    const feedName = args[0];
    const url = args[1];

    const feed = await createFeed(feedName, url, user.id);
    if (!feed) {
        throw new Error("Failed to create feed");
    }

    console.log("Feed created successfully:");
    printFeed(feed, user);
}

export async function handlerListFeeds(cmdName: string, ...args: string[]) {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    const feeds = await getAllFeeds();
    if (!feeds) {
        throw new Error(`No feeds found`);
    }

    for (const feed of feeds) {
        const user = await getUserById(feed.userId);
        if (!user) {
            throw new Error(`User with id ${feed.userId} does not exits`);
        }
        printFeed(feed, user);
    }
}

function printFeed(feed: Feed, user: User) {
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}
