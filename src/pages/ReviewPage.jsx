import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList';

const ReviewPage = () => {

  const [reviews, setReviews] = useState();

  let positive = 0;
  let negative = 0;

  let { id } = useParams();

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`/movies/${id}/reviews/`)
        setReviews(data)
      }
    )()
  }, [])

  useEffect(() => {
    if (!reviews) return;
    reviews?.map(el => {
      if (el.sentiment_pred === "Positive") {
        positive += 1;
      } else {
        negative += 1;
      }
    })
  }, [reviews])

  return (
    <Box sx={{
      padding: "10px"
    }}>
      <Typography variant="h3">Sentiment Pred: {positive > negative ? "POSITIVE" : "NEGATIVE"}</Typography>
      <Stack direction="column" rowGap="2rem">
        {
          reviews?.map((el, key) => {
            return <MovieList isReview={true} key={key} id={el.id} title={el.critic_name} description={el.content} date_released={el.rating} />
          })
        }
      </Stack>
    </Box>
  )
}

export default ReviewPage
