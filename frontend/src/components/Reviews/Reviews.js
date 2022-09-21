import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";


const Reviews = () => {
  const { spotId } = useParams();
  // console.log('id', spotId)
  const reviews = useSelector(state => state.reviews);
  const reviewsArr = Object.values(reviews);
  // console.log(reviewsArr)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(spotId))
  }, [dispatch, spotId]);

  if(!reviews) return null;

  return (
    <div>
      hello
      {reviewsArr.map(review => (
        <div key={review.id}>
          <div>{review.review}</div>
          <div>{review.stars}</div>
        </div>
      ))}
    </div>
  )
}

export default Reviews;
