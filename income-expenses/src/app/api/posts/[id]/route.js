import { connectMongonDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    const { id } = params;
    // console.log(id)
    await connectMongonDB()
    const posts = await Post.findOne({_id:id})
    return NextResponse.json({posts},{status:200})
}

export async function PUT(req, { params }){
    const { id } = params;
    const {type,name,money,record} =await req.json()
    await connectMongonDB();
    await Post.findByIdAndUpdate(id,{type,name,money,record})
    return NextResponse.json({message:'post updated'},{status : 200})
}