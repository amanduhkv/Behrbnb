import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserBooking } from "../../store/bookings";
import { Modal } from "../../context/Modal";

import DeleteBooking from "./DeleteBooking";
import EditBookingForm from "./EditBooking";
import { NavLink } from "react-router-dom";

const CurrentUserBookings = () => {
  const sessionUser = useSelector(state => state.session.user);
  const userBookings = useSelector(state => state.bookings.user);
  const userBookingsArr = Object.values(userBookings);
  const dispatch = useDispatch();

  const [showUpdate, setShowUpdate] = useState(false);

  // helper fxn to format dates with slashes
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    const formatted = [month, day, year].join('/');
    return formatted;
  }
  // getting current date
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  let currentYear = currentDate.getFullYear();

  if (currentMonth.toString().length === 1) {
    currentMonth = `0${currentMonth}`
  }
  if (currentDay.toString().length === 1) {
    currentDay = `0${currentDay}`
  }

  let today = `${currentYear}-${currentMonth + 1}-${currentDay}`;

  useEffect(() => {
    dispatch(getCurrentUserBooking());
  }, [dispatch]);

  if (!userBookings || !userBookingsArr.length) return (<div className='card-1'>Currently not taking any trips.</div>);

  return (
    <div>
      {userBookingsArr.map(booking => (
        <>
        {sessionUser.id === booking.userId && (
          <div className="reservation">
            {today < booking.endDate && (
              <>
                <div className="res-title" style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  backgroundImage: `url(${booking?.Spot?.previewImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  maxWidth: '100%'
                }}>
                  <>
                  Your upcoming stay at {booking?.Spot?.name}
                  </>
                  <NavLink id='nav-booking' to={`/spots/${booking.spotId}`} >Details of spot</NavLink>
                </div>
                <ul className="res-user-container">
                  <div className="indiv-res">
                    <li id='res-user-listings'>
                      <div id='res-user-list-checkin'>
                        <div>Check-in</div>
                        {formatDate(booking.startDate)}
                      </div>
                      <div id='res-user-list-checkout'>
                        <div>Checkout</div>
                        {formatDate(booking.endDate)}
                      </div>
                    </li>

                    <div>
                      <button id='edit-delete-button' onClick={() => setShowUpdate(true)}>Update</button>
                      {showUpdate && (
                        <Modal id='update-booking-modal' onClose={() => setShowUpdate(false)}>
                          <EditBookingForm bookingId={booking.id} start={booking.startDate} end={booking.endDate} updateModal={setShowUpdate} />
                        </Modal>
                      )}
                    </div>
                    <div id='res-user-delete'>
                      <DeleteBooking bookingId={booking.id} />
                    </div>
                  </div>
                </ul>
              </>
            )}
          </div>
        )}
        {sessionUser.id !== booking.userId && (
          <div className='card-1'>Currently not taking any trips.</div>
        )}
        </>
      ))}
    </div>
  )
}

export default CurrentUserBookings;
