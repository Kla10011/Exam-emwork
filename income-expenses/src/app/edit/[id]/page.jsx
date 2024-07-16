"use client";
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

function EditPostPage({ params }) {
    const { id } = params;

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("");
    const [record, setRecord] = useState(dayjs());

    const [postData, setPostData] = useState(null);
    
    const router = useRouter();
    
    const getPostById = async (id) => {
        try {
            const res = await fetch(`../api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            });
            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }
            const data = await res.json();
            console.log("edit post: ", data);
            setPostData(data.posts);
            setType(data.posts.type)
            setName(data.posts.name)
            setMoney(data.posts.money);
            setRecord(dayjs(data.posts.record));

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`../api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    name,
                    money,
                    record,
                }),
            });
            if (res.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to update the post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostById(id);
    }, [id]);
    
    const Options = [
        { label: 'รายรับ' },
        { label: 'รายจ่าย' },
    ];

    if (!postData) {
        return <div className='px-2 py-2'>Loading...</div>;
    }

    return (
        <main>
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>แก้ไขบันทึกผลการปฎิบัติงานประจำวัน</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={Options}
                                    defaultValue={Options.find(option => option.label === postData.type)}
                                    isOptionEqualToValue={(option, value) => option.label === value.label}
                                    onChange={(event, value) => setType(value ? value.label : '')}
                                    renderInput={(params) => <TextField {...params} label='ประเภท' />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="ชื่อรายการใช้จ่าย"
                                    defaultValue={postData.name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="จำนวนเงิน"
                                    defaultValue={postData.money}
                                    onChange={(e) => setMoney(parseFloat(e.target.value))}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" gutterBottom>วันที่ใช้จ่าย</Typography>
                                            <DateTimePicker
                                                value={record}
                                                onChange={(newValue) => setRecord(newValue)}
                                                slotProps={{ textField: { fullWidth: true } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button color="success" type="submit" variant="contained">Edit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </main>
    );
}

export default EditPostPage;
