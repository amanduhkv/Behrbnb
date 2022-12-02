import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import { getBookings } from "../../store/bookings";
import { getASpot } from "../../store/spots";

const Bookings = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const bookings = useSelector(state => state.bookings.spot);
  const bookingsArr = Object.values(bookings);
  const spot = useSelector(state => state.spots.singleSpot);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getASpot(spotId))
    dispatch(getBookings(spotId))
  }, [dispatch, spotId]);

  if (!bookings) return null;

  return (
    <div>
      {sessionUser.id === spot.ownerId && (
        <ul>
          {bookingsArr.map(booking => (
            <>
              <li key={booking.id}>
                <div>{booking.User.firstName}'s Reservation:</div>
                Check-in date: {booking.startDate}
                <br />
                Checkout date: {booking.endDate}
              </li>
              <br />
            </>
          ))}
        </ul>
      )}
      {sessionUser.id !== spot.ownerId && (
        <div>Your stay at {spot.Owner?.firstName}'s place
          <div>
            {bookingsArr.map(booking => (
              <div>
                {sessionUser.id === booking.userId && (
                  <div>{booking.startDate}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings;
