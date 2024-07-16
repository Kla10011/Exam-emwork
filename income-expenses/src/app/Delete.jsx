'use client'

import React from 'react'
import { Button } from '@mui/material'

function DeleteBtn({id}) {
    const hadleDelete = async() => {
        const confirmed =  confirm('Are you sure?')
        if (confirmed) {
            const res = await fetch(`/api/posts?id=${id}`, {
                method: 'DElETE'
            })
            if (res.ok) {
                window.location.reload()
            }
        }
    }
  return (
    <a onClick={hadleDelete}>
        <Button className='border py-1 px-1' variant="contained" color='error'>DELETE</Button>
    </a>
  )
}

export default DeleteBtn