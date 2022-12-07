import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";

import { getBookings } from "../../store/bookings";
import { getASpot } from "../../store/spots";


import DeleteBooking from "./DeleteBooking";
import EditBookingForm from "./EditBooking";
import './SpotBooking.css';

const Bookings = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const bookings = useSelector(state => state.bookings.spot);
  const bookingsArr = Object.values(bookings);
  const spot = useSelector(state => state.spots.singleSpot);

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

  if (currentDay.toString().length === 1) {
    currentDay = `0${currentDay}`
  }

  let today = `${currentYear}-${currentMonth + 1}-${currentDay}`


  useEffect(() => {
    dispatch(getASpot(spotId))
    dispatch(getBookings(spotId))
  }, [dispatch, spotId]);

  if (!bookings) return null;

  return (
    <div>
      {/* ====================== if user owns spot ====================== */}
      {sessionUser.id === spot.ownerId && (
        <ul className="res-container">
          {bookingsArr.map(booking => (
            <div key={booking.id}>
              <li id='res-listings'>
                <div id='res-username'>{booking.User.firstName}'s Reservation:</div>
                <div id='res-list-checkin'>
                  <div>Check-in</div>
                  {formatDate(booking.startDate)}
                </div>
                <div id='res-list-checkout'>
                  <div>Checkout</div>
                  {formatDate(booking.endDate)}
                </div>
              </li>
              <br />
            </div>
          ))}
        </ul>
      )}
      {/* ==================== if user doesn't own spot =================== */}
      {sessionUser.id !== spot.ownerId && (
        <div className="reservation">
          <div className="res-title" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backgroundImage: `url(${spot?.SpotImages[0]?.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '100%'
          }}>
            Your upcoming stay at {spot.Owner?.firstName}'s place
          </div>

          <div className="res-user-container">
            <ul>
              {bookingsArr.map(booking => (
                <div key={booking.id}>
                  {sessionUser.id === booking.userId && today < booking.endDate && (
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
                  )}
                </div>
              ))}
            </ul>
            {/* <div>
              <div>Getting there</div>
              <div>Address: {spot.address}</div>
            </div> */}
          </div>
        </div>
      )}
      {sessionUser.id !== spot.ownerId && (
        <div className="reservation">
          <div className="res-title" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backgroundImage: `url(${spot?.SpotImages[0]?.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '100%'
          }}>
            Your previous stay at {spot.Owner?.firstName}'s place
          </div>
          {/* {bookingsArr && (
            <div className="res-user-container">
            <div className="indiv-res">You haven't stayed here before.</div>
            </div>
          )} */}

          <div className="res-user-container">
            <ul>
              {bookingsArr.map(booking => (
                <div key={booking.id}>
                  {sessionUser.id === booking.userId && today > booking.startDate && (
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
                    </div>
                  )}
                </div>
              ))}
            </ul>
            {/* <div>
              <div>Getting there</div>
              <div>Address: {spot.address}</div>
            </div> */}
          </div>

        </div>
      )}
    </div>
  )
}

export default Bookings;
