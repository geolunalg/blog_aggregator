import { getFeedByURL } from "src/lib/db/queries/feeds";
import { createFeedFollow, getFeedFollowsForUser, deleteFeedFollow } from "../lib/db/queries/feed-follows";
import { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if (!feed) {
        throw new Error(`Feed not found: ${feedURL}`);
    }

    const ffRow = await createFeedFollow(user.id, feed.id);

    console.log(`Feed follow created:`);
    printFeedFollow(ffRow.userName, ffRow.feedName);
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if (!feed) {
        throw new Error(`Feed not found for url: ${feedURL}`);
    }

    const result = await deleteFeedFollow(feed.id, user.id);
    if (!result) {
        throw new Error(`Failed to unfollow feed: ${feedURL}`);
    }

    console.log(`${feed.name} unfollowed successfully!`);
}

export async function handlerListFeedFollows(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    const feedFollows = await getFeedFollowsForUser(user.id);
    if (feedFollows.length === 0) {
        console.log(`No feed follows found for this user.`);
        return;
    }

    console.log(`Feed follows for user ${user.name}:`);
    for (const ff of feedFollows) {
        console.log(`* ${ff.feedname}`);
    }
}

export function printFeedFollow(username: string, feedname: string) {
    console.log(`* User:          ${username}`);
    console.log(`* Feed:          ${feedname}`);
}
