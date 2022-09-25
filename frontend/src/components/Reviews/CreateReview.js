import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, NavLink } from "react-router-dom";
import { createReview } from "../../store/reviews";
import '../Reviews/CreateReview.css'

const CreateReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!review) errors.push('Review field left blank');
    if (!stars) errors.push('Number of stars invalid');
    setValidationErrors(errors);
  }, [review, stars]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmit(true);

    // if (validationErrors.length) {
    //   setReview('');
    //   setStars('');
    // }

    const payload = {
      review,
      stars
    };

    if (!validationErrors.length) {
      let newReview = await dispatch(createReview(payload, spotId));
      if (newReview) {
        history.push(`/spots/${spotId}`)
      };
    }
    reset();
  }

  const reset = () => {
    setReview('');
    setStars('');
  }

  return (
    <div>
      <form id='create-review-form' onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <div id='review-form-content'>
          <textarea
            id='review-text'
            placeholder="review"
            value={review}
            onChange={e => setReview(e.target.value)}
            required
          />
          <input
            id='review-rating'
            type='number'
            placeholder="0 stars"
            min='0'
            max='5'
            value={stars}
            onChange={e => setStars(e.target.value)}
          />
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
