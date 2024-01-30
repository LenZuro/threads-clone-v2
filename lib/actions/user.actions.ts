"use server"

import { connectToDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";


export async function updateUSer(
    userID: string ,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
    ): Promise<void> {
    connectToDb();
        try {
            await User.findOneAndUpdate(
                { id: userID },
                { username: username.toLowerCase(),
                    name ,
                    bio ,
                    image ,
                    onboarded: true ,
                },
                { upsert: true }
            );
            if(path === '/profile/edit'){
                revalidatePath(path);
            }
        } catch (error: any) {
            throw new Error(`Failed to create/update user : ${error.message}`)
        }
}