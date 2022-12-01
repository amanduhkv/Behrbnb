import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createBooking } from '../../store/bookings';

const CreateBookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  const history = useHistory();

  // TODAY'S DATE ======================
  let currentDate = new Date();
  // console.log("CURRENT DATE", currentDate)

  // ERROR HANDLING ====================
  useEffect(() => {
    const errors = [];

    if(startDate > endDate) errors.push('The check-in date cannot be before the checkout date.');
    if(endDate < startDate) errors.push('The checkout date cannot be before the check-in date.');

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

    const data = await dispatch(createBooking(payload, spotId));
    if(data) {
      console.log("BOOKING DATA", data)
      console.log("BOOKING DATA MESSAGE", data.message)
      setValidationErrors(data.message)
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
        <label for='start'>Check-in:</label>
        <input
          id='start'
          type="date"
          value={startDate}
          onChange={e => {setStartDate(e.target.value)}}
        />
        <label for='end'>Checkout:</label>
        <input
          id='end'
          type="date"
          value={endDate}
          onChange={e => {setEndDate(e.target.value)}}
        />
        <button type='submit'>Reserve</button>
      </form>

    </div>
  )

}


export default CreateBookingForm;
