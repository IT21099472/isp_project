

import { auth } from "@clerk/nextjs";


export async function dbHandle(){
    const {userId} = auth();

    console.log(userId)
}