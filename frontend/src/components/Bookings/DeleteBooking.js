import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteBooking } from "../../store/bookings";

function DeleteBooking({bookingId}) {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();


  const handleDelete = () => {
    const deletion = dispatch(deleteBooking(bookingId));

    if(deletion) {
      history.replace(`/spots/${spotId}/bookings`)
    }
  }

  return (
    <button id='edit-delete-button' onClick={handleDelete}>Delete Reservation</button>
  )
}

export default DeleteBooking;
