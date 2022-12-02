import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSpot } from '../../store/spots';

function DeleteSpot() {
  const spot = useSelector(state => state.spots.singleSpot);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async e => {
    e.preventDefault();

    const deletion = await dispatch(deleteSpot(spot.id));
    if(deletion) {
      history.push('/');
    }
  }

  return (
    <button id='edit-delete-button' onClick={handleDelete}>Delete Spot</button>
  )
}

export default DeleteSpot;
