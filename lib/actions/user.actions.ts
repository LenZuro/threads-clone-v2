"use server"

import { connectToDb } from "../mongoose"


export async function updateUSer(): Promise<void> {
    connectToDb();

    
}