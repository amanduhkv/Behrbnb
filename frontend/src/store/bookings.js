import { csrfFetch } from "./csrf";

export const LOAD_BOOKING = 'bookings/LOAD_BOOKING';
export const A_BOOKING = 'bookings/A_BOOKING';
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
export const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING';
export const ADD_IMAGE = 'bookings/ADD_IMAGE';

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

const addImage = img => ({
  type: ADD_IMAGE,
  img
})

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
export const createBooking = (booking, img) => async dispatch => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });
  // console.log('here')
  if (response.ok) {
    const newSpot = await response.json();

    const res = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: img,
        preview: true
      })
    });

    if(res.ok) {
      const spotWImage = await res.json();
      dispatch(create(newSpot));
      return newSpot;
    };
  };
};
