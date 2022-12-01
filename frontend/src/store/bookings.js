import { csrfFetch } from "./csrf";

export const SPOT_BOOKINGS = 'bookings/SPOT_BOOKINGS';
export const USER_BOOKINGS = 'bookings/USER_BOOKINGS';
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
export const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const load = (bookingList, spotId) => ({
  type: SPOT_BOOKINGS,
  bookingList,
  spotId
});

const userBookings = (bookings) => ({
  type: USER_BOOKINGS,
  bookings
});

const create = booking => ({
  type: CREATE_BOOKING,
  booking
});

const update = (booking, id) => ({
  type: UPDATE_BOOKING,
  booking,
  id
});

const deletion = (id) => ({
  type: DELETE_BOOKING,
  id
});


// GET ALL BOOKINGS BASED ON SPOT ID
export const getBookings = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

// GET CURRENT USER BOOKINGS
export const getCurrentUserBooking = () => async dispatch => {
  const response = await csrfFetch('/api/bookings/current');

  if(response.ok) {
    const currentUserBookings = await response.json();
    dispatch(userBookings(currentUserBookings));
  };
};

// CREATE A BOOKING
export const createBooking = (booking, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  console.log('here')
  if (response.ok) {
    const newBooking = await response.json();

    dispatch(create(newBooking));
    return newBooking;
  };
};

// UPDATE A BOOKING
export const updateBooking = (booking, id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });

  if(response.ok) {
    const updateBooking = await response.json();

    dispatch(update(updateBooking));
    return updateBooking;
  }
}

// DELETE A BOOKING
export const deleteBooking = id => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'DELETE'
  });

  if(response.ok) {
    dispatch(deletion(id));
  }
}


const initialState = {
  user: {},
  spot: {}
}

const bookingsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SPOT_BOOKINGS:
      const bookings = {}
      action.bookings.Bookings.forEach(booking => {
        bookings[booking.id] = booking
      });
      return {
        ...state,
        user: { ...state.user },
        spot: { ...bookings }
      };
    case USER_BOOKINGS:
      const newReview = { ...state, user: { ...state.user }}
      action.reviews.Reviews.forEach(review => {
        newReview.user[review.id] = review
      });
      return newReview;
    case CREATE_BOOKING:
      const createState = {
        ...state,
        spot: {
          ...state.spot,
          [action.review.id]: action.review
        }
      }
      return createState;
    case DELETE_BOOKING:
      const deleteState = {
        ...state,
        spot: {},
        user: { ...state.user }
      }

      delete deleteState.user[action.id]
      return deleteState;
    default:
      return state;
  }
}


export default bookingsReducer;
