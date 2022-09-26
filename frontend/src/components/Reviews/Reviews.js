import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import './Reviews.css'
import bear from '../../assets/bear.svg';

const Reviews = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  // console.log('id', spotId)
  const reviews = useSelector(state => state.reviews.spot);
  const reviewsArr = Object.values(reviews);
  const spot = useSelector(state => state.spots.singleSpot);
  // console.log(reviewsArr)
  const dispatch = useDispatch();

  let sessionLinks;
  let userReviewExists;
  if(sessionUser) {
    userReviewExists = reviewsArr.find(review => review.userId === sessionUser.id)
    // console.log(userReviewExists)
  }
  if (sessionUser && sessionUser.id !== spot.ownerId && !userReviewExists) {
    sessionLinks = (
      <>
        <NavLink id='button-leave-review' to={`/spots/${spotId}/reviews`}>Leave a review</NavLink>
      </>
    )
  }

  useEffect(() => {
    dispatch(getReviews(spotId))
  }, [dispatch, spotId]);

  if (!reviews) return null;

  return (
    <div id='review-container'>

      <div id='review-title'>
        <div id='avgStarRating'>
          <i id='star-review' className="fa-sharp fa-solid fa-star"></i>
          {spot.avgStarRating}
        </div>
        <div id='dots'>•</div>
        <div id='review-number'>
          {reviewsArr.length} {reviewsArr.length === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      <div id='review-box'>
      {reviewsArr.map(review => (
        <div id='each-review' key={review.id}>

          <div id='bear-name'>
            <img id='bear' alt='bear' src={bear} />
            <div id='reviewer-name'>{review.User?.firstName}</div>
            {/* <div id='num-stars'>{(review.createdAt).toString()}</div> */}
          </div>
          <div id='reviewer-review'>{review.review}</div>
        </div>
      ))}
      </div>
      {sessionLinks}
    </div>
  )
}

export default Reviews;
