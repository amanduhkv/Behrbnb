import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import './Reviews.css'
import bear from '../../assets/bear.svg';

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

  if (!reviews) return null;

  return (
    <div id='review-container'>

        <div id='review-title'>
          <i className="fa-sharp fa-solid fa-star"></i>

          <h2>{reviewsArr.length} reviews</h2>
        </div>
        {reviewsArr.map(review => (
          <div key={review.id}>
            {/* <div>{review.stars}</div> */}
            <div id='bear-name'>
              <img id='bear' src={bear} />
              <div id='reviewer-name'>{review.User?.firstName}</div>
            </div>
            <div id='reviewer-review'>{review.review}</div>

          </div>
        ))}
      
    </div>
  )
}

export default Reviews;
