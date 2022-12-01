import { csrfFetch } from "./csrf";

export const LOAD_BOOKING = 'bookings/LOAD_BOOKING';
export const A_BOOKING = 'bookings/A_BOOKING';
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
export const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const load = (bookingList) => ({
  type: LOAD_BOOKING,
  bookingList
});

const singleBooking = (booking) => ({
  type: A_BOOKING,
  booking
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


// GET ALL BOOKINGS
export const getBookings = () => async dispatch => {
  const response = await fetch('/api/bookings');

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
    dispatch(load(currentUserBookings));
  };
};

// GET SINGLE BOOKING
export const getABooking = bookingId => async dispatch => {
  const response = await fetch(`/api/bookings/${bookingId}`);

  if (response.ok) {
    const booking = await response.json();
    dispatch(singleBooking(booking))
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
  const response = await csrfFetch(`/api/${id}/bookings`, {
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
    case LOAD_BOOKING:
      const bookings = {}
      action.bookings.Bookings.forEach(booking => {
        bookings[booking.id] = booking
      });
      return {
        ...state,
        user: {},
        spot: { ...bookings }
      };
    default:
      return state;
  }
}


export default bookingsReducer;
