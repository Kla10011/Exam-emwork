import { connectMongonDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {type,name,money,record} = await req.json()
    console.log(type,name,money,record)
    await connectMongonDB();
    await Post.create({type,name,money,record})
    return NextResponse.json({message: "Post created"}, {status:201})
}

export async function GET() {
    await connectMongonDB()
    const posts = await Post.find()
    return NextResponse.json({posts})
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongonDB()
    await Post.findByIdAndDelete(id)
    return NextResponse.json({messaage : "Post deleted"}, {status:200})
}