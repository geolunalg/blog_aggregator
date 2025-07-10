import { getPostsForUsers } from "../lib/db/queries/posts";
import type { User } from "../lib/db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 2;
    if (args.length === 1) {
        const userLimit = parseInt(args[0]);
        if (!userLimit) {
            throw new Error(`usage: ${cmdName} <limit>`);
        }
        limit = userLimit;
    }

    const posts = await getPostsForUsers(user.id, limit);

    console.log(`Found ${posts.length} posts for user ${user.name}`);
    for (const post of posts) {
        console.log(`${post.publishedAt} from ${post.feedName}`);
        console.log(`--- ${post.title} ---`);
        console.log(`    ${post.description}`);
        console.log(`Link: ${post.url}`);
        console.log(`=====================================`);
    }
}
