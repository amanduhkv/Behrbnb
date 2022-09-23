import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/GET_REVIEWS';
const USER_REVIEWS = 'review/USER_REVIEWS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const loadReviews = (reviews, spotId) => ({
  type: GET_REVIEWS,
  reviews,
  spotId
});

const loadUserReviews = (reviews) => ({
  type: USER_REVIEWS,
  reviews
});

const create = (review, spotId) => ({
  type: CREATE_REVIEW,
  review,
  spotId
});

const deletion = id => ({
  type: DELETE_REVIEW,
  id
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

  if(response.ok) {
    const userReview = await response.json();
    dispatch(loadUserReviews(userReview));
  };
};

export const createReview = (review, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  console.log('res', response)
  if(response.ok) {
    const newReview = await response.json();
    dispatch(create(newReview));
    return newReview;
  };
};

export const deleteReview = (id) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  });

  if(response.ok) {
    // const deleteReview = await response.json();
    dispatch(deletion(id));
    // return ('Successfully deleted');
  };
};

const initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
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
      return {user};
    case CREATE_REVIEW:
      const createState = {
        ...state,
        spot: {
          ...state.spot,
          [action.review.id]: action.review
        }
      }
      return createState;
    case DELETE_REVIEW:
      const deleteState = {
        user: { ...state.user }
      }

      delete deleteState.user[action.id]
      return deleteState;
    default:
      return state
  }
}

export default reviewsReducer;
