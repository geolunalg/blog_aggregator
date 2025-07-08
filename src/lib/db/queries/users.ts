import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUser(name: string) {
    const result = await db.select().from(users).where(eq(users.name, name));
    return firstOrUndefined(result);
}

export async function resetUsers() {
    await db.delete(users);
}

export async function getAllUsers() {
    const result = await db.select().from(users);
    return result;
}