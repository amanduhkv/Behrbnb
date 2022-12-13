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
  const [style, setStyle] = useState(false);

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

  const toggleStlye = () => {
    setStyle(!style)
  }

  const starsShape = Array(5).fill(0);

  useEffect(() => {
    const errors = [];
    if (!review.length) errors.push('Review field left blank');
    if (review.length > 255) errors.push('Review too long (255 characters or less)');
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
    // reset();
  }

  // const reset = () => {
  //   setReview('');
  //   setStars('');
  // }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => {
              <RatingIcon
                index={index}
                rating={rating}
                hoverRating={hoverRating}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onSaveRating={onSaveRating} />

            })}
      <form id='create-review-form' onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <div id='review-form-content'>
          <textarea
            id='review-text'
            placeholder="review"
            value={review}
            onChange={e => setReview(e.target.value)}
          // required
          />
          <div>
            {/* <svg version="1.1" id="Layer_1" x="0px" y="0px"
              viewBox="0 0 512 512" style={{height: '32px'}} >
              <polygon
                id="star1"
                // onMouseOver={() => setStyle({fill:'rgb(220,30,87)'})}
                onClick={() => toggleStlye()}
                // onMouseLeave={() => setStyle({fill:'white'})}
                style={style ? {fill:'rgb(220,30,87)'} : {fill:'white'}}
                points="493.427,204.588 374.685,320.221 402.787,483.65 255.942,406.484 109.213,483.65 137.315,320.221 18.573,204.588 182.578,180.747 255.942,32.06 329.422,180.747 "
              />
              <path fill='rgb(220,30,87)' d="M97.732,499.448l30.299-176.21L0,198.56l176.84-25.706l79.097-160.301l79.219,160.301L512,198.56L383.969,323.237 l30.298,176.203l-158.324-83.197L97.732,499.448z M255.941,396.726l135.365,71.134l-25.905-150.656l109.453-106.587l-151.167-21.975 L255.947,51.569l-67.634,137.073L37.144,210.617l109.453,106.587l-25.903,150.649L255.941,396.726z"/>
            </svg>
            <svg version="1.1" id="Layer_1" x="0px" y="0px"
              viewBox="0 0 512 512" style={{height: '32px'}} >
              <polygon
                id="star1"
                points="493.427,204.588 374.685,320.221 402.787,483.65 255.942,406.484 109.213,483.65 137.315,320.221 18.573,204.588 182.578,180.747 255.942,32.06 329.422,180.747 "
              />
              <path fill='rgb(220,30,87)' d="M97.732,499.448l30.299-176.21L0,198.56l176.84-25.706l79.097-160.301l79.219,160.301L512,198.56L383.969,323.237 l30.298,176.203l-158.324-83.197L97.732,499.448z M255.941,396.726l135.365,71.134l-25.905-150.656l109.453-106.587l-151.167-21.975 L255.947,51.569l-67.634,137.073L37.144,210.617l109.453,106.587l-25.903,150.649L255.941,396.726z"/>
            </svg> */}


          </div>
          <input
            id='review-rating'
            type='number'
            placeholder="1-5 stars"
            min='1'
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
