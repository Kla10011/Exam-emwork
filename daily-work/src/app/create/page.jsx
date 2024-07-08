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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function Page() {
    const [formData, setFormData] = useState({
        work: '',
        status: '',
        name: '',
        timestart: '',
        timend: '',
        dtrecord: '',
        dtlatest: ''
    });

    const workOptions = [
        { label: 'Development' },
        { label: 'Test' },
        { label: 'Document' },
    ];
    const statusOptions = [
        { label: 'ดำเนินการ' },
        { label: 'เสร็จสิ้น' },
        { label: 'ยกเลิก' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAutocompleteChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('D:/Exam-emwork/daily-work/src/app/pages/api/save-data.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>บันทึกผลการปฎิบัติงานประจำวัน</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={workOptions}
                                    onChange={(event, value) => handleAutocompleteChange('work', value ? value.label : '')}
                                    renderInput={(params) => <TextField {...params} label="ประเภทงาน" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="ชื่องานที่ดำเนินการ"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    options={statusOptions}
                                    onChange={(event, value) => handleAutocompleteChange('status', value ? value.label : '')}
                                    renderInput={(params) => <TextField {...params} label="สถานะ" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" gutterBottom>เวลาที่เริ่มดำเนินการ</Typography>
                                            <TimePicker
                                                onChange={(newValue) => handleAutocompleteChange('timestart', newValue)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" gutterBottom>เวลาที่เสร็จสิ้น</Typography>
                                            <TimePicker
                                                onChange={(newValue) => handleAutocompleteChange('timend', newValue)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" gutterBottom>วันเวลาที่บันทึกข้อมูล</Typography>
                                            <DateTimePicker
                                                onChange={(newValue) => handleAutocompleteChange('dtrecord', newValue)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" gutterBottom>วันเวลาที่ปรับปรุงข้อมูลล่าสุด</Typography>
                                            <DateTimePicker
                                                onChange={(newValue) => handleAutocompleteChange('dtlatest', newValue)}
                                                renderInput={(params) => <TextField {...params} />}
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

export default Page;
