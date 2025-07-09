import { fetchFeed } from "src/lib/db/rss";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    if (args.length != 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    const feedURL = "https://www.wagslane.dev/index.xml";
    const fetchData = await fetchFeed(feedURL);
    const dataString = JSON.stringify(fetchData, null, 2);
    console.log(dataString);
}