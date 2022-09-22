import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import './Reviews.css'
import bear from '../../assets/bear.svg';

const Reviews = () => {
  const { spotId } = useParams();
  // console.log('id', spotId)
  const reviews = useSelector(state => state.reviews);
  const reviewsArr = Object.values(reviews);
  const spotAvgRating = useSelector(state => state.spots.singleSpot.avgStarRating);
  // console.log(reviewsArr)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(spotId))
  }, [dispatch, spotId]);

  if (!reviews) return null;

  return (
    <div id='review-container'>

      <div id='review-title'>
        <div id='avgStarRating'>
          <i id='star-review' className="fa-sharp fa-solid fa-star"></i>
          {spotAvgRating}
        </div>
        <div id='dots'>•</div>
        <div id='review-number'>
          {reviewsArr.length} {reviewsArr.length === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      {reviewsArr.map(review => (
        <div id='each-review' key={review.id}>

          <div id='bear-name'>
            <img id='bear' src={bear} />
            <div id='reviewer-name'>{review.User?.firstName}</div>
            {/* <div id='num-stars'>{review.stars}</div> */}
          </div>
          <div id='reviewer-review'>{review.review}</div>
        </div>
      ))}
      <NavLink id='button-leave-review' to={`/spots/${spotId}/reviews`}>Leave a review</NavLink>

    </div>
  )
}

export default Reviews;
