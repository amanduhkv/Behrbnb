import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { EditModal } from '../../context/Modal';
import { getASpot, updateSpot } from '../../store/spots';
import './EditSpotForm.css';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector(state => state.spots.singleSpot)


  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  // const [url, setUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    const errors = [];
    if (!address.length) errors.push("Please enter an address");
    if (!city.length) errors.push("Please enter a city");
    if (!state.length) errors.push("Please enter a state");
    if (!country.length) errors.push("Please enter a country");
    if (!lat) errors.push("Please enter a valid latitude");
    if (!lng) errors.push("Please enter a valid longitude");
    if (!name) errors.push("Please enter a name for the spot");
    if (!description) errors.push('Please enter a description for the spot');
    if (!price) errors.push("Please enter a price");
    setValidationErrors(errors);
  }, [address, city, state, country, lat, lng, name, description, price]);

  const updateAddress = e => setAddress(e.target.value);
  const updateCity = e => setCity(e.target.value);
  const updateState = e => setState(e.target.value);
  const updateCountry = e => setCountry(e.target.value);
  const updateLat = e => setLat(e.target.value);
  const updateLng = e => setLng(e.target.value);
  const updateName = e => setName(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updatePrice = e => setPrice(e.target.value);
  // const updateUrl = e => setUrl(e.target.value);

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmit(true);

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      // url
    };
    if (!validationErrors.length) {
      let updatedSpot = await dispatch(updateSpot(newSpot, spot.id));
      if (updatedSpot) {
        history.push(`/spots/${spot.id}`)
      }
    }
    // reset();
  };

  // const reset = () => {
  //   setAddress(spot.address);
  //   setCity(spot.city);
  //   setState(spot.state);
  //   setCountry(spot.country);
  //   setLat(spot.lat);
  //   setLng(spot.lng);
  //   setName(spot.name);
  //   setDescription(spot.description);
  //   setPrice(spot.price);
  //   // setUrl('');
  // };

  return (
    <div className='form-for-update'>
      <form id='update-form' onSubmit={handleSubmit}>
        <h2>Update a Spot</h2>
        <div className='create-content'>
          <input
            id='spot-input-address'
            type='text'
            placeholder='address'
            value={address}
            onChange={updateAddress}
          />
          <input
            id='spot-input-mid'
            type='text'
            placeholder='city'
            value={city}
            onChange={updateCity}
          />
          <input
            id='spot-input-mid'
            type='state'
            placeholder='state'
            value={state}
            onChange={updateState}
          />
          <input
            id='spot-input-mid'
            type='country'
            placeholder='country'
            value={country}
            onChange={updateCountry}
          />
          <input
            id='spot-input-mid'
            type='number'
            placeholder='latitude'
            value={lat}
            onChange={updateLat}
          />
          <input
            id='spot-input-mid'
            type='number'
            placeholder='longitude'
            value={lng}
            onChange={updateLng}
          />
          <input
            id='spot-input-mid'
            type='name'
            placeholder='name'
            value={name}
            onChange={updateName}
          />
          <textarea
            id='spot-input-textarea'
            placeholder='description'
            value={description}
            onChange={updateDescription}
          />
          <input
            id='spot-input-url'
            placeholder='$'
            type='number'
            min="0"
            value={price}
            onChange={updatePrice}
          />
          {/* <input
              id='spot-input-url'
              placeholder='url'
              type='text'
              value={url}
              onChange={updateUrl}
              required
            /> */}
          {hasSubmit && validationErrors.length > 0 && (
            <div id='error-div'>
              The following errors were found:
              <ul id='error-list'>
                {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
              </ul>
            </div>
          )}

          <div id='buttons-submit'>
            <button id='update-button' type='submit'>Update</button>
            <NavLink id='cancel-button' to={`/spots/${spotId}`}>Cancel</NavLink>
          </div>
        </div>
      </form>
    </div>
  )

};

export default EditSpotForm;
