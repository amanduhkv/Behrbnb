const GET_REVIEWS = 'reviews/GET_REVIEWS';

const loadReviews = (reviews, spotId) => ({
  type: GET_REVIEWS,
  reviews,
  spotId
});

export const getReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if(response.ok) {
    const review = await response.json();
    dispatch(loadReviews(review))
  }
}

const initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_REVIEWS:
      const reviews = {}
      action.reviews.Reviews.forEach(review => {
        reviews[review.id] = review
      });
      return reviews;

    default:
      return state
  }
}

export default reviewsReducer;
