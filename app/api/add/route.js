import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { db_uri } from "@/app/lib/db"; 
import { Order } from "@/app/lib/model/Order"; 
import { call } from "@/app/lib/model/callction";


export async function POST(req) {
    try {
        const payload = await req.json();
        
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(db_uri);
        }

        let order = new Order(payload);
        let result = await order.save();
        
        return NextResponse.json({ result, success: true }, { status: 201 });

    } catch (error) {
        console.error("API POST Error:", error); // কনসোলে আসল এরর দেখাবে
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(db_uri);
        }
        
        const data = await call.find();
        return NextResponse.json({ result: data, success: true }, { status: 200 });

    } catch (error) {
        console.error("API GET Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}