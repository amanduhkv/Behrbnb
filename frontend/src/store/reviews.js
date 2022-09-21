import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/GET_REVIEWS';
const USER_REVIEWS = 'review/USER_REVIEWS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';


const loadReviews = (reviews, spotId) => ({
  type: GET_REVIEWS,
  reviews,
  spotId
});

const loadUserReviews = (reviews) => ({
  type: USER_REVIEWS,
  reviews
});

const create = review => ({
  type: CREATE_REVIEW,
  review
});

export const getReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if(response.ok) {
    const review = await response.json();
    dispatch(loadReviews(review))
  };
};

export const getUserReviews = () => async dispatch => {
  const response = await csrfFetch(`/api/reviews/current`);
  console.log('res', response)
  if(response.ok) {
    const userReview = await response.json();
    dispatch(loadUserReviews(userReview));
  };
};

export 

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
    case USER_REVIEWS:
      const user = {}
      action.reviews.Reviews.forEach(review => {
        user[review.id] = review
      });
      return {...state, user};
    default:
      return state
  }
}

export default reviewsReducer;
