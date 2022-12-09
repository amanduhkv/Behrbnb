import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createBooking } from '../../store/bookings';

import './CreateBooking.css';

const CreateBookingForm = ({ singleSpot }) => {
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
  if (newDay.toString().length === 1) {
    newDay = `0${newDay}`
  }
  let newYear = nextDay.getFullYear();

  let today = `${currentMonth + 1}-${currentDay}-${currentYear}`

  let tomorrow = `${newMonth + 1}-${newDay}-${newYear}`


  // CALCULATING PRICE =================
  let s = Date.parse(startDate)
  let e = Date.parse(endDate)
  let difference = (e - s) / 86400000

  // ERROR HANDLING ====================
  useEffect(() => {
    const errors = [];

    if (startDate <= today) errors.push('The first available check-in date is tomorrow.')

    setValidationErrors(errors);
  }, [startDate, endDate]);

  // SUBMIT FXN ========================
  const handleSubmit = async e => {
    console.log('HITTING THE SUBMIT')
    e.preventDefault();

    setHasSubmit(true);

    const payload = {
      startDate,
      endDate
    };


    try {
      let newBooking = await dispatch(createBooking(payload, spotId));

      if (newBooking) {
        setValidationErrors([]);
        history.push(`/spots/${spotId}/bookings`)
      }
    } catch (res) {
      const data = await res.json();
      if (data && data.message) {
        console.log('DATA', data)
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

        <div className="price-breakdown">
          <div>
            <span>
              ${singleSpot.price} x {difference ? difference : 5} {difference === 1 ? 'night' : 'nights'}
            </span>
            <span>
              ${difference ? (singleSpot.price * difference) : (singleSpot.price * 5)}
            </span>
          </div>
          <div>
            <span>
              Cleaning fee
            </span>
            <span>
              ${Math.ceil(singleSpot.price * 0.12)}
            </span>
          </div>
          <div>
            <span>
            Service fee
            </span>
            <span>
              ${Math.ceil(singleSpot.price * 0.08)}
            </span>
          </div>
          <div>
            <span id='price-bd-last'>
            Total before taxes
            </span>
            <span id='price-bd-last'>
            ${difference ? ((singleSpot.price * difference) + Math.ceil(singleSpot.price * 0.12) + Math.ceil(singleSpot.price * 0.08)) : Math.ceil((singleSpot.price * 5) + Math.ceil(singleSpot.price * 0.12) + (singleSpot.price * 0.08))}
            </span>
          </div>
        </div>

      </form>

    </div>
  )

}


export default CreateBookingForm;
