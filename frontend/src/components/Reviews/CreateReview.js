import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, NavLink } from "react-router-dom";
import { createReview } from "../../store/reviews";
import RatingIcon from "./RatingIcon";
import '../Reviews/CreateReview.css'

import starwoutline from '../../assets/starwoutline.svg';

const CreateReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
  };

  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!review.length) errors.push('Review field left blank');
    if (review.length > 255) errors.push('Review too long (255 characters or less)');
    if (!rating) errors.push('Number of stars invalid');
    setValidationErrors(errors);
  }, [review, rating]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmit(true);

    // if (validationErrors.length) {
    //   setReview('');
    //   setStars('');
    // }
    console.log('RATING', rating)

    const payload = {
      review,
      stars: rating
    };

    if (!validationErrors.length) {
      let newReview = await dispatch(createReview(payload, spotId));
      if (newReview) {
        history.push(`/spots/${spotId}`)
      };
    }
    // reset();
  }

  // const reset = () => {
  //   setReview('');
  //   setStars('');
  // }

  return (
    <div>
      <form id='create-review-form' onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <div className="stars">
        {[1, 2, 3, 4, 5].map((index) =>
          <RatingIcon
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating} />
        )}
        </div>
        <div id='review-form-content'>
          <textarea
            id='review-text'
            placeholder="review"
            value={review}
            onChange={e => setReview(e.target.value)}
          // required
          />
          {/* <input
            id='review-rating'
            type='number'
            placeholder="1-5 stars"
            min='1'
            max='5'
            value={stars}
            onChange={e => setStars(e.target.value)}
          /> */}
        </div>

        {hasSubmit && validationErrors.length > 0 && (
          <div id='error-div'>
            The following errors were found:
            <ul id='error-list'>
              {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
            </ul>
          </div>
        )}

        <div id='buttons'>
          <button id='review-button' type='submit'>Submit Review</button>
          <NavLink id='review-cancel' to={`/spots/${spotId}`}>Cancel</NavLink>
        </div>
      </form>
    </div>
  )

}

export default CreateReview;
