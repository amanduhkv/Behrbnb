import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserReviews } from "../../store/reviews";
import bear from '../../assets/bear.svg'

const UserReviews = () => {
  const reviews = useSelector(state => state.reviews.user);
  const reviewsArr = Object.values(reviews);
  console.log('Pooh reviews: ', reviewsArr)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReviews())
  }, [dispatch]);

  if(!reviews) return null;

  return (
    <div id='review-container'>

        <div id='review-title'>
          <i id='star' className="fa-sharp fa-solid fa-star"></i>
          <h2>{reviewsArr.length} {reviewsArr.length === 1 ? 'review' : 'reviews'}</h2>
        </div>
        {reviewsArr.map(review => (
          <div id='each-review' key={review.id}>
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

export default UserReviews;
