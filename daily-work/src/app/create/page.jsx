"use client"
import React from 'react'
import { useState,useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function page() {
    const [work, setWork] = React.useState('');
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setWork(event.target.value);
        setStatus(event.target.value);
    };
  
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="sm" sx={{p:2}}>
          <Paper sx ={{p:2}}>
            <Typography variant="h6" gutterBottom>บันทึกผลการปฎิบัติงานประจำวัน</Typography>
            <form >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ประเภทงาน</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={work}
                    label="work"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Development </MenuItem>
                    <MenuItem value={20}>Test</MenuItem> 
                    <MenuItem value={30}>Document</MenuItem> 
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="avatar" label="ชื่องานที่ดำเนินการ" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="status"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>ดำเนินการ</MenuItem>
                    <MenuItem value={20}>เสร็จสิ้น</MenuItem> 
                    <MenuItem value={30}>ยกเลิก</MenuItem> 
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={[
                        'DatePicker',
                        'TimePicker',
                        'DateTimePicker',
                        'DateRangePicker',
                    ]}
                    >
                        <DemoItem>
                        <Typography variant="body2" gutterBottom>เวลาที่เริ่มดำเนินการ</Typography>
                        <TimePicker />
                        </DemoItem>
                        <DemoItem>
                        <Typography variant="body2" gutterBottom>เวลาที่เสร็จสิ้น</Typography>
                        <TimePicker />
                        </DemoItem>
                        <DemoItem>
                        <Typography variant="body2" gutterBottom>วันเวลาที่บันทึกข้อมูล</Typography>
                        <DateTimePicker />
                        </DemoItem>
                        <DemoItem>
                        <Typography variant="body2" gutterBottom>วันเวลาที่ปรับปรุงข้อมูลล่าสุด</Typography>
                        <DateTimePicker />
                        </DemoItem>
                    </DemoContainer>
                    </LocalizationProvider>
                </Grid>
            
                <Grid item xs={12} sm={6} >
                    <Button type="submit" variant='contained'>
                    Create
                </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
    </React.Fragment>
  )
}

export default page
