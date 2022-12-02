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
      <ul>
        {bookingsArr.map(booking => (
          <>
            <li key={booking.id}>
              <div>Name's Reservation:</div>
              Check-in date: {booking.startDate}
              <br/>
              Checkout date: {booking.endDate}
            </li>
            <br />
          </>
        ))}
      </ul>
    </div>
  )
}

export default Bookings;
