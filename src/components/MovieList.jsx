import { Box, Typography, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieList = ({ id, title, description, date_released, isReview }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" rowGap="2rem" sx={{
      border: "2px solid black",
      borderRadius: "12px",
      padding: "10px",
    }} onClick={() => !isReview && navigate(`/reviews/${id}`)}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      {
        isReview ?
          <Typography variant="body1">Rating: {date_released}</Typography> :
          <Typography variant="body1">Date of Release: {date_released}</Typography>
      }
    </Stack>
  )
}

export default MovieList
