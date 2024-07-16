'use client'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import DeleteBtn from './Delete';
import { Grid, TextField } from '@mui/material';

export default function Home() {
  const [postData, setPostData] = useState([])

  const getPosts = async() => {
    try{
      const res = await fetch('./api/posts',{
        method: "GET",
        cache: "no-store"
      })
      if (!res.ok) {
        throw new Error("Failed to fecth posts")
      }
      const data = await res.json()
      setPostData(data.posts)
    } catch(error){
      console.log("Error loading posts: ",error)
    }
  }
  
  useEffect(() => {
    getPosts()
  },[])

  const statusCount = postData.reduce((acc, post) => {
    const { type , money  } = post;
    console.log({ type , money  })
    if (acc["รายการ"+type]) {
        acc["รายการ"+type] ++;
        acc[type+"ทั้งหมด"] += money;
    } else {
        acc["รายการ"+type] = 1;
        acc[type+"ทั้งหมด"] = 0;
    }
    return acc;
  }, {});

  if (!postData) {
    return <div className='px-2 py-2'>Loading...</div>;
  }

  return (
    <main>
      <Container maxWidth="xl" sx = {{p:2}}>
          <Paper sx ={{p:2}}>
          <Box display={'flex'}>
              <Box sx={{flexGrow:1}}>
                  <Typography variant="h6" gutterBottom>รายการรายรับรายจ่ายประจำเดือน</Typography>
                  <p>
                  รายการรายรับ : {(statusCount["รายการรายรับ"]||0)} รายการ
                  </p>
                  <p>
                  รายการรายจ่าย : {(statusCount["รายการรายจ่าย"]||0)} รายการ
                  </p>
              </Box>
              <Link href="search">
                  <Button variant="contained" className='mx-2'>
                      SEARCH
                  </Button>
              </Link>
              <Link href="create">
                  <Button variant="contained">
                      CREATE
                  </Button>
              </Link>
          </Box>
          <div className='grid grid-cols-5 mt-3 gap-5'>
            {postData && postData.length > 0 ?
              (postData.map(val=>(
                <Paper sx= {{p:2}}>
                  <div key={val._id}>
                      <p>ประเภท  : {val.type}</p>
                      <p>ชื่อรายการใช้จ่าย : {val.name}</p>
                      <p>จำนวนเงิน : {val.money.toFixed(2)}</p>
                      <div className='py-2'>
                        <p>วันที่ใช้จ่าย : </p>
                        <p>{new Date(val.record).toLocaleString('en-US')}</p>
                      </div>
                      <div className='py-2'>
                        <p>วันเวลาที่บันทึกข้อมูล</p>
                        <p>{new Date(val.createdAt).toLocaleString('en-US')}</p>
                      </div>
                      <div className='py-2'>
                        <p>วันเวลาที่ปรับปรุงข้อมูลล่าสุด</p>
                        <p>{new Date(val.updatedAt).toLocaleString('en-US')}</p>
                      </div>
                      <div className="my-5">
                        <Link href = {`/edit/${val._id}`}>
                          <Button className='border py-1 px-1' variant="contained" color='success'>EDIT</Button>
                        </Link>
                        <DeleteBtn id={val._id} />
                      </div>
                  </div>
                </Paper>
              ))): (
                <p className="bg-gray-300 p-3 my-3">You do not have any posts yet.</p>
            )}
          </div>
          </Paper>
      </Container>
    </main>
  );
}
