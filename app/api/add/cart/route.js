import { db_uri } from "@/app/lib/db"
import { call } from "@/app/lib/model/callction"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const {ids} = await req.json()
        await mongoose.connect(db_uri)
        const cartProducts = await call.find({
            _id: {$in: ids}
        })
        return NextResponse.json(cartProducts)
    } catch (error) {
        return NextResponse.json(
            {message: 'Data Not Fetch', error: error},
            {status: 500}
        )
        
    }
}