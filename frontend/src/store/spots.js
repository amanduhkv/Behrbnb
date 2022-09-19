export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const A_SPOT = 'spots/A_SPOT';

const load = (spotsList) => ({
  type: LOAD_SPOTS,
  spotsList
});

const aSpot = (spot) => ({
  type: A_SPOT,
  spot
});

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
    console.log('spot:', spot)
    dispatch(aSpot(spot))
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
      // if(!state[action.spot.Spots.id]) {
      //   const newState = {
      //     ...state,
      //     [action.spot.Spots.id]: action.spot.Spots
      //   };
      //   return newState
      // }
      // console.log('action.spot:', action.spot.Spots[0])
      return {
        ...state,
        singleSpot: action.spot.Spots[0]
      }
    default:
      return state;
  }
}

export default spotsReducer;
