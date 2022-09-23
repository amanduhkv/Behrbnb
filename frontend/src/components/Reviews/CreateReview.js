import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, NavLink } from "react-router-dom";
import { createReview } from "../../store/reviews";
import '../Reviews/CreateReview.css'

const CreateReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      review,
      stars
    };

    let newReview = await dispatch(createReview(payload, spotId));
    if (newReview) {
      history.push(`/spots/${spotId}/reviews`)
    };
    reset();
  }

  const reset = () => {
    setReview('');
    setStars(0);
  }

  return (
    <div>
      <form id='create-review-form' onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <div id='review-form-content'>
          <textarea
            id='review-text'
            value={review}
            onChange={e => setReview(e.target.value)}
            required
          />
          <input
            id='review-rating'
            type='number'
            min='0'
            max='5'
            value={stars}
            onChange={e => setStars(e.target.value)}
          />
        </div>
        <div id='buttons'>
          <button id='review-button' type='submit'>Submit Review</button>
          <NavLink id='review-cancel' to={`/spots/${spotId}`}>Cancel</NavLink>
        </div>
      </form>
    </div>
  )

}

export default CreateReview;
