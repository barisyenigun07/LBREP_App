import { Button, Typography } from '@mui/material'
import React from 'react'

const CustomCard = () => {
  return (
    <div>
        <Typography>
          This is the title
        </Typography>
        <Typography>
            This is the first paragraph of our text. In this paragraph we are going to talk about widely about problems that we got.
        </Typography>
        <Button variant='contained' size='medium'>
            Go
        </Button>
    </div>
  )
}

export default CustomCard