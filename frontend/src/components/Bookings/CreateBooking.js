import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createBooking } from '../../store/bookings';

import './CreateBooking.css';

const CreateBookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
  let newYear = nextDay.getFullYear();

  let today = `${currentMonth + 1}-${currentDay}-${currentYear}`
  // console.log("Today is ", today)
  let tomorrow = `${newMonth + 1}-${newDay}-${newYear}`
  // console.log("Tomorrow is ", tomorrow)
  console.log("MIN", `${newYear}-${newMonth + 1}-${newDay}`)


  // ERROR HANDLING ====================
  useEffect(() => {
    const errors = [];

    if (startDate <= today) errors.push('The first available check-in date is tomorrow.')
    if (startDate < tomorrow) errors.push('The first available check-in date is tomorrow.')

    setValidationErrors(errors);
  }, [startDate, endDate]);

  // SUBMIT FXN ========================
  const handleSubmit = async e => {
    console.log('HITTING THE SUBMIT')
    e.preventDefault();

    setHasSubmit(true);
    setValidationErrors([]);

    const payload = {
      startDate,
      endDate
    };


    return dispatch(createBooking(payload, spotId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) {
          console.log('DATA', data)
          setValidationErrors([data.message])
        }
      }
    )


    // if (!validationErrors.length) {
    //   let newBooking = await dispatch(createBooking(payload));

    //   if (newBooking) {
    //     history.push(`/bookings/${newBooking.id}`);
    //   };
    // };
  };

  return (
    <div className="form-for-booking">
      <form className="booking-form" onSubmit={handleSubmit}>
        <div id='dates'>
          <div id='date-checkin'>
            <label for='start'>CHECK-IN</label>
            <input
              id='start'
              type="date"
              min={`${newYear}-${newMonth + 1}-${newDay}`}
              max={endDate}
              value={startDate}
              onChange={e => { setStartDate(e.target.value) }}
            />
          </div>
          <div id='date-checkout'>
            <label for='end'>CHECKOUT</label>
            <input
              id='end'
              type="date"
              value={endDate}
              onChange={e => { setEndDate(e.target.value) }}
            />
          </div>
        </div>
        <button type='submit'>Reserve</button>


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


export default CreateBookingForm;