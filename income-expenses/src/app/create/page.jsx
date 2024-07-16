"use client";
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

function CreatePost() {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("Number");
    const [record, setRecord] = useState(dayjs());

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!type || !name) {
            alert('Please fill in all required fields');
            return;
        } else if (isNaN(money)||!money) {
            alert('Please enter a valid number for the money field');
            return;
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
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
                throw new Error('Failed to create a post');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const Options = [
        { label: 'รายรับ' },
        { label: 'รายจ่าย' },
    ];

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>บันทึกรายรับรายจ่ายประจำเดือน</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={Options}
                                    isOptionEqualToValue={(option, value) => option.label === value.label}
                                    onChange={(event, value) => setType(value ? value.label : '')}
                                    renderInput={(params) => <TextField {...params} label="ประเภท" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ชื่อรายการใช้จ่าย"
                                    variant="outlined"
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="จำนวนเงิน"
                                    variant="outlined"
                                    onChange={(e) => setMoney(parseFloat(e.target.value))}
                                    fullWidth
                                    required
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
                                <Button type="submit" variant="contained">Create</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default CreatePost;
