import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteSpot } from '../../store/spots';

function DeleteSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async e => {
    e.preventDefault();

    const deletion = await dispatch(deleteSpot(spotId));
    if(deletion) {
      history.push('/');
    }
  }

  return (
    <button onClick={handleDelete}>Delete Spot</button>
  )
}

export default DeleteSpot;
