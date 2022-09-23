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


  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  // const [url, setUrl] = useState('');

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

    let updatedSpot = await dispatch(updateSpot(newSpot, spot.id));
    if (updatedSpot) {
      history.push(`/spots/${spot.id}`)
    }
    reset();
  };

  const reset = () => {
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setLat('');
    setLng('');
    setName('');
    setDescription('');
    setPrice('');
    // setUrl('');
  };

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
              required
            />
            <input
              id='spot-input-mid'
              type='text'
              placeholder='city'
              value={city}
              onChange={updateCity}
              required
            />
            <input
              id='spot-input-mid'
              type='state'
              placeholder='state'
              value={state}
              onChange={updateState}
              required
            />
            <input
              id='spot-input-mid'
              type='country'
              placeholder='country'
              value={country}
              onChange={updateCountry}
              required
            />
            <input
              id='spot-input-mid'
              type='number'
              placeholder='latitude'
              value={lat}
              onChange={updateLat}
              required
            />
            <input
              id='spot-input-mid'
              type='number'
              placeholder='longitude'
              value={lng}
              onChange={updateLng}
              required
            />
            <input
              id='spot-input-mid'
              type='name'
              placeholder='name'
              value={name}
              onChange={updateName}
              required
            />
            <textarea
              id='spot-input-textarea'
              placeholder='description'
              value={description}
              onChange={updateDescription}
              required
            />
            <input
              id='spot-input-url'
              placeholder='$'
              type='number'
              min="0"
              value={price}
              onChange={updatePrice}
              required
            />
            {/* <input
              id='spot-input-url'
              placeholder='url'
              type='text'
              value={url}
              onChange={updateUrl}
              required
            /> */}
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
