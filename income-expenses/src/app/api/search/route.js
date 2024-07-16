import { NextResponse } from 'next/server';
import { connectMongonDB } from '../../../../lib/mongodb';
import Post from '../../../../models/post';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const timestart = searchParams.get('timestart');
    const timend = searchParams.get('timend');
    console.log('Before', timestart, timend);
    
    await connectMongonDB();

    // Convert to JavaScript Date objects
    const datestart = new Date(timestart);
    const datend = new Date(timend);

    // Set the start and end hours
    datestart.setHours(0, 0, 0, 0);
    datend.setHours(23, 59, 59, 999);

    
    console.log('After-2', datestart, datend);
    const posts = await Post.find({
        record: { $gte: datestart,$lte: datend },
    });
    // console.log(posts)
    return NextResponse.json({ posts });
}
