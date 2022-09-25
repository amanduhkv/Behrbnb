import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import reviewsReducer, { getUserReviews } from "../../store/reviews";
import bear from '../../assets/bear.svg'
import { deleteReview } from "../../store/reviews";
import './UserReviews.css';

const UserReviews = () => {
  const reviews = useSelector(state => state.reviews.user);
  const reviewsArr = Object.values(reviews);
  console.log('Pooh reviews: ', reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReviews())
  }, [dispatch]);

  if (!reviews) return null;

  return (
    <div id='review-container-curr'>
      <div id='review-title'>

        <i id='star' className="fa-sharp fa-solid fa-star"></i>
        {/* <div id='dots'>•</div> */}
        <h2 id='review-title'>{reviewsArr.length} {reviewsArr.length === 1 ? 'review' : 'reviews'}</h2>
      </div>
      <div id='review-box'>
        {reviewsArr.map(review => (
          <div id='each-review' key={review.id}>
            {/* <div>Current review: {review.userId}</div> */}
            {/* <div>{review.stars}</div> */}
            <div id='bear-name'>
              <img id='bear' src={bear} />
              <div id='reviewer-name'>
                <div>{review.User?.firstName}</div>
                <div id='star-num'>{review.stars} stars</div>
              </div>
              <button id='delete-review-button' onClick={() => dispatch(deleteReview(review.id))}>Delete review</button>
            </div>
            <div id='reviewer-review'>{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  )

}

export default UserReviews;
