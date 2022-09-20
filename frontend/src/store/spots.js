import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const A_SPOT = 'spots/A_SPOT';
export const CREATE_SPOT = 'spots/CREATE_SPOT';

const load = (spotsList) => ({
  type: LOAD_SPOTS,
  spotsList
});

const aSpot = (spot) => ({
  type: A_SPOT,
  spot
});

const create = spot => ({
  type: CREATE_SPOT,
  spot
})

export const getSpots = () => async dispatch => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

export const getASpot = spotId => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    // console.log('spot:', spot)
    dispatch(aSpot(spot))
  }
}

export const createSpot = spot => async dispatch => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });
  // console.log('here')
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(create(newSpot));
    return newSpot;
  }
}

const initialState = {
  allSpots: {},
  singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {}
      action.spotsList.Spots.forEach(spot => {
        allSpots[spot.id] = spot
      });
      console.log('newState: ', newState)
      return {
        ...state,
        allSpots
      }
    case A_SPOT:
      return {
        ...state,
        singleSpot: action.spot.Spots[0]
      }
    case CREATE_SPOT:
      const createState = {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot
        }
      }
      // console.log('hi')
      return createState;
    default:
      return state;
  }
}

export default spotsReducer;
