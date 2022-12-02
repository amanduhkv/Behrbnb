import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import { getBookings } from "../../store/bookings";
import { getASpot } from "../../store/spots";

import './SpotBooking.css';

const Bookings = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const bookings = useSelector(state => state.bookings.spot);
  const bookingsArr = Object.values(bookings);
  const spot = useSelector(state => state.spots.singleSpot);

  const dispatch = useDispatch();


  // helper fxn to format dates with slashes
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    const formatted = [month, day, year].join('/');
    return formatted;
  }


  useEffect(() => {
    dispatch(getASpot(spotId))
    dispatch(getBookings(spotId))
  }, [dispatch, spotId]);

  if (!bookings) return null;

  return (
    <div>
      {sessionUser.id === spot.ownerId && (
        <ul className="res-container">
          {bookingsArr.map(booking => (
            <div key={booking.id}>
              <li id='res-listings'>
                <div id='res-username'>{booking.User.firstName}'s Reservation:</div>
                <div id='res-list-checkin'>
                  <div>CHECK-IN</div>
                  {formatDate(booking.startDate)}
                </div>
                <div id='res-list-checkout'>
                  <div>CHECKOUT</div>
                  {formatDate(booking.endDate)}
                </div>
              </li>
              <br />
            </div>
          ))}
        </ul>
      )}
      {sessionUser.id !== spot.ownerId && (
        <div>Your stay at {spot.Owner?.firstName}'s place
          <ul>
            {bookingsArr.map(booking => (
              <div>
                {sessionUser.id === booking.userId && (
                  <li id='res-listings'>
                    <div id='res-list-checkin'>
                      <div>CHECK-IN</div>
                      {formatDate(booking.startDate)}
                    </div>
                    <div id='res-list-checkout'>
                      <div>CHECKOUT</div>
                      {formatDate(booking.endDate)}
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Bookings;
