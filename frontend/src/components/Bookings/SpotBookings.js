import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import { getBookings } from "../../store/bookings";

const Bookings = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const bookings = useSelector(state => state.bookings.spot);
  const bookingsArr = Object.values(bookings);
  const spot = useSelector(state => state.spots.singleSpot);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getBookings(spotId))
  }, [dispatch, spotId]);

  if(!bookings) return null;

  return (
    <div>
      {bookingsArr.map(booking => (booking.startDate))}
    </div>
  )
}

export default Bookings;
