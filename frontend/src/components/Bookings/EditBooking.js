import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import { updateBooking } from "../../store/bookings";

const EditBookingForm = ({bookingId, start, end, updateModal}) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  const history = useHistory();

  // DATE LOGIC ======================
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  let currentYear = currentDate.getFullYear();

  let nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);
  let newMonth = nextDay.getMonth();
  let newDay = nextDay.getDate();
  if (newDay.toString().length === 1) {
    newDay = `0${newDay}`
  }
  let newYear = nextDay.getFullYear();

  let today = `${currentMonth + 1}-${currentDay}-${currentYear}`



  // ERROR HANDLING ====================
  useEffect(() => {
    const errors = [];

    if (startDate <= today) errors.push('The first available check-in date is tomorrow.')

    setValidationErrors(errors);
  }, [startDate, endDate]);

  // SUBMIT FXN ========================
  const handleUpdate = async e => {
    // console.log('HITTING THE SUBMIT')
    e.preventDefault();

    setHasSubmit(true);

    const payload = {
      startDate,
      endDate
    };


    try {
      // console.log('INSIDE THE TRY BLOCK')
      let updatedBooking = await dispatch(updateBooking(payload, bookingId));
      if(updatedBooking) {
        // console.log('UPDATE WORKING')
        setValidationErrors([]);
        updateModal(false)
        history.push(`/spots/${spotId}/bookings`)
      }
    } catch (res) {
        const data = await res.json();
        if (data && data.message) {
          // console.log('DATA', data)
          setValidationErrors([data.message])
        }
    }



    // if (!validationErrors.length) {
    //   let newBooking = await dispatch(createBooking(payload));

    //   if (newBooking) {
    //     history.push(`/bookings/${newBooking.id}`);
    //   };
    // };
  };

  return (
    <div className="form-for-booking" id='edit'>
      <form className="booking-form" onSubmit={handleUpdate}>

        <div id='dates'>
          <div id='date-checkin'>
            <label for='start'>Check-in</label>
            <input
              id='start'
              type="date"
              value={startDate}
              onChange={e => { setStartDate(e.target.value) }}
            />
          </div>
          <div id='date-checkout'>
            <label for='end'>Checkout</label>
            <input
              id='end'
              type="date"
              value={endDate}
              onChange={e => { setEndDate(e.target.value) }}
            />
          </div>
        </div>
        <br/>
        <button id='edit-delete-button' type='submit'>Update</button>
        <button id='edit-delete-button' onClick={() => updateModal(false)}>Cancel</button>


        {validationErrors.length > 0 && (
          <div id='error-div'>
            The following errors were found:
            <ul id='error-list'>
              {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
            </ul>
          </div>
        )}

      </form>

    </div>
  )

}


export default EditBookingForm;
