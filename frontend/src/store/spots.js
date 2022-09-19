export const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const load = (spotsList) => ({
  type: LOAD_SPOTS,
  spotsList
});

export const getSpots = () => async dispatch => {
  const response = await fetch('/api/spots');

  if(response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      action.spotsList.Spots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState
    default:
      return state;
  }
}

export default spotsReducer;
