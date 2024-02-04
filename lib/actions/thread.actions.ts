"use server"

import { connectToDb } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({ text , author , communityId , path }: Params){
   try { 
    connectToDb();
    const createdThread = await Thread.create({ text , author , community: null });
    await User.findByIdAndUpdate(author , {$push: { threads: createdThread._id}})
    revalidatePath(path);
    } catch(error : any ) {
        throw new Error(`Error Creating Thread: ${error.message}`)
    } 
}

export async function fetchThreads(pageNumber = 1 , pageSize = 20) {
    connectToDb();
    const skipAmount = (pageNumber - 1) * pageSize;
    const threadQuery = Thread.find({ parentId: { $in: [null , undefined ]}})
    .sort({ createdAt: 'desc' }).skip(skipAmount).limit(pageSize)
    .populate({ path: 'author' , model: User })
    .populate({ path: 'children' , populate: { path: 'author' , model: User , select: "_id name parentId image" }})
    const totalThreadsCount = await Thread.countDocuments({ parentId: { $in: [ null , undefined ]}})
    const threads = await threadQuery.exec();
    const isNext = totalThreadsCount > skipAmount + threads.length;
    return { threads , isNext}
}

export async function fetchThreadById( id: string ) {
    
}