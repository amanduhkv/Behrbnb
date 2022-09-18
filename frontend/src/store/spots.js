export const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const load = (spots, spotId) => ({
  type: LOAD_SPOTS,
  spots,
  spotId
});

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const newSpots = {};
      action.spots.forEach(item => {
        newSpots[item.id] = item
      });
      return {
        ...state,
        ...newSpots
      }
    default:
      return state;
  }
}

export default spotsReducer;
